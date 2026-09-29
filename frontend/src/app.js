import { $, $$, toast, setUiLanguage, uiText, displayLanguageName, errorMessage } from './utils/dom.js';
import { extractVariables, renderTemplate, richTextValue } from './utils/text.js';
import { nativeInvoke, writeTextToClipboard, writeImageToClipboard } from './utils/clipboard.js';
import { store, state, persist, markEdited } from './state/store.js';
import { updateColorScheme, updateTheme, updateDensity, updateContentTextSize, updateSidebarState, setSidebarCollapsed } from './state/theme.js';
import { checkAiKey, requestSingleTranslation, TranslationBatchController } from './services/aiService.js';
import { getImage } from './services/storageService.js';
import { renderSidebarCategories, toggleCategoryCollapse } from './components/sidebarComponent.js';
import { renderStepper, getScenarioSteps, goToStep } from './components/stepperComponent.js';
import { renderCards, handleCardAction, setupTextFormattingToolbar } from './components/cardsComponent.js';
import { openEditor, closeEditor, setupEditorEventListeners, filesToImages, positionEditor } from './components/editorComponent.js';
import { openBulkEditor, setupBulkEditorEventListeners } from './components/bulkEditorComponent.js';
import { createCategory, askInput, renameCategory, openCategoryMove, openCategoryRemove, openCategoryDelete, openIconPicker, closeIconPicker, openImagePreview, promptTemplateValues, setupDialogEventListeners } from './components/dialogsComponent.js';
import { openSettings, closeSettings, isSettingsOpen, renderSettingsPage, setupSettingsEventListeners } from './components/settingsComponent.js';
import { renderToolbar, toggleSelectionMode, toggleExpandAll, toggleItemSelection, setupToolbarEventListeners } from './components/toolbarComponent.js';

let isAiConfigured = false;
let pendingImageTargetItemId = '';
let translationBatch = null;
let translationBatchDismissed = false;
let contextImage = null;
let imagePasteTargetId = '';
let categoryReorder = null;
let itemCategoryDrag = null;
let ignoreCategoryClick = false;

// Re-render entire interface
export function renderAppView() {
  if (isSettingsOpen()) { renderSettingsPage(); return; }
  setUiLanguage(state.preferences.uiLanguage);
  updateDensity(state.preferences.density);
  updateContentTextSize(state.preferences.contentTextSize);
  updateTheme(state.preferences.theme);
  updateSidebarState();
  updateColorScheme();

  renderSidebarCategories((categoryName) => {
    store.view = 'category'; store.category = categoryName;
    store.scenarioFlow = null; state.lastCategory = categoryName;
    persist(); renderAppView();
  });

  renderStepper();
  const visibleItems = store.getVisibleItems();
  const currentTitle = store.view === 'category' ? store.category : uiText(store.view === 'favorites' ? '常用收藏' : store.view === 'recent' ? '最近复制' : '全部素材');
  const titleEl = $('#current-title');
  if (titleEl) titleEl.textContent = currentTitle;
  const pageTitleEl = $('#page-title');
  if (pageTitleEl) pageTitleEl.textContent = currentTitle;
  const categoryTitleIcon = $('#category-title-icon');
  if (categoryTitleIcon) {
    categoryTitleIcon.hidden = store.view !== 'category';
    categoryTitleIcon.dataset.setCategoryIcon = store.view === 'category' ? store.category : '';
    categoryTitleIcon.textContent = state.categoryIcons[store.category] || '▱';
  }
  const resultsEl = $('#results');
  if (resultsEl) resultsEl.textContent = `${visibleItems.length} ${uiText('条素材')}`;

  const missingCountEl = $('#missing-language-count');
  const missingNameEl = $('#missing-language-name');
  if (missingNameEl) missingNameEl.textContent = displayLanguageName(state.languages[1]);
  if (missingCountEl) {
    missingCountEl.textContent = state.items.filter(i => (i.type || 'script') === 'script' && !i.hasSecondLanguage).length;
  }

  renderToolbar(visibleItems);
  renderCards(visibleItems, isAiConfigured);
  positionEditor();

  const descendantsBtn = $('#include-descendants');
  if (descendantsBtn) {
    const hasChildren = store.view === 'category' && state.categories.some(name => state.categoryParents[name] === store.category);
    descendantsBtn.hidden = !hasChildren;
    descendantsBtn.setAttribute('aria-pressed', String(store.includeDescendants));
  }

  $$('[data-language]').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.language === store.language);
    if (btn.dataset.language === '0') btn.textContent = displayLanguageName(state.languages[0]);
    else if (btn.dataset.language === '1') btn.textContent = displayLanguageName(state.languages[1]);
  });

  const draftTranslateBtn = $('#translate-add-language');
  if (draftTranslateBtn) {
    draftTranslateBtn.textContent = `${uiText('AI 翻译为')} ${displayLanguageName(state.languages[1])}`;
    draftTranslateBtn.hidden = !isAiConfigured || $('#item-type-input')?.value !== 'script' || !$('#second-language-field')?.hidden;
  }

  const translateBtn = $('#batch-translate');
  const translatable = visibleItems.filter(item => (item.type || 'script') === 'script' && !item.hasSecondLanguage && item.translations[0]?.trim());
  if (translateBtn) {
    translateBtn.hidden = !isAiConfigured || !translatable.length;
    translateBtn.textContent = `${uiText('批量翻译')} ${translatable.length} ${uiText('条')}`;
  }
}

// Perform copy action on an item translation with variable templating
async function handleCopyItemAction(item, translationIndex) {
  if ((item.type || 'script') !== 'script') return;
  let content = item.translations[translationIndex] || '';
  const variables = extractVariables(content);

  if (variables.length > 0) {
    if (store.scenarioFlow) {
      const missingVars = variables.filter(v => !Object.hasOwn(store.scenarioFlow.values, v));
      if (missingVars.length > 0) {
        const filledValues = await promptTemplateValues(missingVars, {}, false, content);
        if (!filledValues) return;
        Object.assign(store.scenarioFlow.values, filledValues);
      }
      content = renderTemplate(content, store.scenarioFlow.values);
    } else {
      const filledValues = await promptTemplateValues(variables, {}, false, content);
      if (!filledValues) return;
      content = renderTemplate(content, filledValues);
    }
  }

  const success = await writeTextToClipboard(content);
  if (!success) return;

  item.copied = (item.copied || 0) + 1;
  item.recent = Date.now();
  persist();
  toast(`${uiText('✓ 已复制')} ${displayLanguageName(state.languages[translationIndex])}`);
  const currentCard = [...document.querySelectorAll('.content-card')].find(card => card.dataset.id === item.id);
  const copyCount = currentCard?.querySelector('[data-copy-count]');
  if (copyCount) copyCount.textContent = ` · ${uiText('已复制')} ${item.copied} ${uiText('次')}`;

  if ((store.view === 'recent' && store.sortMode === 'manual') || store.sortMode === 'popular') {
    const cards = $('#cards');
    const order = new Map(store.getVisibleItems().map((entry, index) => [entry.id, index]));
    [...(cards?.children || [])]
      .sort((a, b) => (order.get(a.dataset.id) ?? Infinity) - (order.get(b.dataset.id) ?? Infinity))
      .forEach(card => cards.append(card));
  }

  // Auto proceed in stepper pipeline
  const autoNextCheckbox = $('#flow-auto-next');
  if (store.scenarioFlow && autoNextCheckbox?.checked) {
    const steps = getScenarioSteps(store.scenarioFlow.parent);
    const curIdx = steps.indexOf(store.category);
    if (curIdx >= 0 && curIdx < steps.length - 1) {
      setTimeout(() => {
        store.category = steps[curIdx + 1];
        persist(); renderAppView();
        toast(`${uiText('✓ 已自动推进至步骤')} ${curIdx + 2}`);
      }, 350);
    }
  }
}

async function translateItem(item, targetIndex) {
  const sourceIndex = 1 - targetIndex;
  const source = item.translations[sourceIndex]?.trim();
  if (!source) return toast(uiText('请先填写要翻译的语言'));
  try {
    const translated = await requestSingleTranslation(source, state.languages[sourceIndex], state.languages[targetIndex]);
    item.translations[targetIndex] = translated;
    item.hasSecondLanguage = true;
    markEdited(item); persist(); renderAppView();
    toast(`${uiText('✓ 已翻译为')} ${displayLanguageName(state.languages[targetIndex])}`);
  } catch (err) { toast(errorMessage(err, '翻译失败，请检查 AI 设置')); }
}

async function translateDraft(targetIndex) {
  const sourceIndex = 1 - targetIndex;
  const source = richTextValue($(`#language-input-${sourceIndex}`)).trim();
  if (!source) return toast(uiText('请先填写要翻译的语言'));
  try {
    const translated = await requestSingleTranslation(source, state.languages[sourceIndex], state.languages[targetIndex]);
    $(`#language-input-${targetIndex}`).textContent = translated;
    if (targetIndex === 1) {
      $('#second-language-field').hidden = false;
      $('#second-language-field').dataset.enabled = 'true';
      $('#add-second-language').hidden = true;
      $('#translate-add-language').hidden = true;
      $('#content-form').classList.add('has-second-language');
    }
    $('#content-form').dispatchEvent(new Event('input', { bubbles: true }));
  } catch (err) { toast(errorMessage(err, '翻译失败，请检查 AI 设置')); }
}

async function startCategoryFlow() {
  const steps = getScenarioSteps(store.category);
  if (!steps.length) return;
  const variables = [...new Set(steps.flatMap(name => state.items
    .filter(item => item.category === name)
    .flatMap(item => item.translations.flatMap(extractVariables))))];
  const values = variables.length ? await promptTemplateValues(variables, {}, true) : {};
  if (!values) return;
  store.scenarioFlow = { parent: store.category, values };
  store.view = 'category'; store.category = steps[0]; store.includeDescendants = false;
  state.lastCategory = store.category; persist(); renderAppView();
}

function renderTranslationBatch(batch = translationBatch) {
  const status = $('#translation-batch-status');
  if (!status || !batch) return;
  if (translationBatchDismissed) {
    if (batch.status !== 'running') $('#batch-translate').disabled = false;
    return;
  }
  status.hidden = false;
  $('#translation-batch-title').textContent = uiText(batch.status === 'done' ? '批量翻译完成' : batch.status === 'paused' ? '批量翻译已暂停' : '正在批量翻译');
  $('#translation-batch-detail').textContent = `${batch.translated} ${uiText('条已完成')} · ${batch.failed.length} ${uiText('条失败')}${batch.currentTitle ? ` · ${batch.currentTitle}` : ''}`;
  $('#translation-batch-progress').value = batch.ids.length ? batch.cursor / batch.ids.length : 1;
  $('#retry-translation-failures').hidden = !batch.failed.length;
  $('#continue-translation-batch').hidden = batch.status !== 'paused' || batch.cursor >= batch.ids.length;
  $('#stop-translation-batch').hidden = batch.status !== 'running';
  $('#batch-translate').disabled = batch.status === 'running';
}

function startTranslationBatch(ids) {
  translationBatchDismissed = false;
  translationBatch = new TranslationBatchController(ids, renderTranslationBatch, renderTranslationBatch);
  renderTranslationBatch(translationBatch);
  translationBatch.run();
}

// Global click event dispatcher
function handleGlobalClick(event) {
  if (ignoreCategoryClick) { ignoreCategoryClick = false; event.preventDefault(); return; }
  const pasteTargetCard = event.target.closest('.content-card');
  imagePasteTargetId = pasteTargetCard?.dataset.id || '';
  document.querySelectorAll('.content-card.image-paste-target').forEach(card => card.classList.toggle('image-paste-target', card === pasteTargetCard));
  if (event.target.closest('#sidebar-toggle')) { setSidebarCollapsed(); return; }
  if (document.body.dataset.sidebarCollapsed === 'true') {
    if (event.target.closest('.brand')) { event.preventDefault(); setSidebarCollapsed(false); return; }
    if (event.target.closest('.search')) { setSidebarCollapsed(false); $('#search')?.focus(); return; }
  }
  if (event.target.closest('#text-size-smaller, #text-size-larger')) {
    const delta = event.target.closest('#text-size-larger') ? 10 : -10;
    state.preferences.contentTextSize = Math.min(160, Math.max(80, (Number(state.preferences.contentTextSize) || 100) + delta));
    persist();
    updateContentTextSize(state.preferences.contentTextSize);
    return;
  }
  if (event.target.closest('#theme-toggle')) {
    const isDark = document.body.dataset.colorScheme === 'dark';
    state.preferences.colorScheme = isDark ? 'light' : 'dark';
    persist(); updateColorScheme(state.preferences.colorScheme);
    toast(uiText(state.preferences.colorScheme === 'dark' ? '已开启深色模式' : '已切换浅色模式'));
    return;
  }
  if (event.target.closest('#settings-button')) { openSettings('general'); return; }
  if (event.target.closest('#empty-show-all')) {
    store.view = 'all'; store.category = ''; store.filter = 'all'; store.tagFilter = ''; store.searchQuery = ''; store.includeDescendants = false; store.scenarioFlow = null;
    if ($('#search')) $('#search').value = '';
    if ($('#tag-filter')) $('#tag-filter').value = '';
    $$('.filter').forEach(button => button.classList.toggle('selected', button.dataset.filter === 'all'));
    renderAppView(); return;
  }
  if (event.target.closest('#new-content, #empty-new')) { openEditor(); return; }
  if (event.target.closest('#bulk-content')) { openBulkEditor(); return; }

  const navViewBtn = event.target.closest('[data-view]');
  if (navViewBtn) {
    closeSettings(); store.scenarioFlow = null;
    store.view = navViewBtn.dataset.view; store.category = '';
    renderAppView(); return;
  }

  const categoryIcon = event.target.closest('[data-set-category-icon]');
  if (categoryIcon?.dataset.setCategoryIcon) {
    openIconPicker(categoryIcon, 'category', categoryIcon.dataset.setCategoryIcon);
    return;
  }

  const categoryBtn = event.target.closest('[data-category]');
  if (categoryBtn) {
    closeSettings(); store.scenarioFlow = null;
    store.view = 'category'; store.category = categoryBtn.dataset.category;
    state.lastCategory = store.category; persist();
    renderAppView(); return;
  }

  const toggleCategoryBtn = event.target.closest('[data-toggle-category]');
  if (toggleCategoryBtn) {
    toggleCategoryCollapse(toggleCategoryBtn.dataset.toggleCategory);
    renderAppView(); return;
  }

  const languageBtn = event.target.closest('[data-language]');
  if (languageBtn) {
    store.language = languageBtn.dataset.language;
    state.languageMode = store.language;
    $$('[data-language]').forEach(btn => btn.classList.toggle('selected', btn === languageBtn));
    persist(); renderAppView(); return;
  }

  const filterTabBtn = event.target.closest('[data-filter]');
  if (filterTabBtn) {
    store.filter = filterTabBtn.dataset.filter;
    $$('.filter').forEach(btn => btn.classList.toggle('selected', btn === filterTabBtn));
    renderAppView(); return;
  }

  if (event.target.closest('#selection-mode')) { toggleSelectionMode(); return; }
  if (event.target.closest('#expand-all')) { toggleExpandAll(); return; }

  const selectItemBtn = event.target.closest('[data-select-item]');
  if (selectItemBtn) { toggleItemSelection(selectItemBtn.dataset.selectItem); return; }

  if (store.selectionModeActive) {
    const cardEl = event.target.closest('.content-card');
    const interactiveControl = event.target.closest('button, details, summary, input, select, textarea, [contenteditable="true"]');
    if (cardEl && !interactiveControl) {
      toggleItemSelection(cardEl.dataset.id);
      return;
    }
  }

  if (event.target.closest('#add-category, #empty-category')) { createCategory(); return; }
  const childCategoryBtn = event.target.closest('[data-create-child]');
  if (childCategoryBtn) { createCategory(childCategoryBtn.dataset.createChild); return; }

  const categoryMenuBtn = event.target.closest('[data-category-menu]');
  if (categoryMenuBtn) {
    const name = categoryMenuBtn.dataset.categoryName;
    categoryMenuBtn.closest('.category-more-wrap')?.removeAttribute('open');
    if (categoryMenuBtn.dataset.categoryMenu === 'rename') {
      askInput(uiText('重命名分类'), name, uiText('分类名称')).then(requested => {
        if (requested !== null) renameCategory(name, requested);
      });
    } else if (categoryMenuBtn.dataset.categoryMenu === 'move') openCategoryMove(name);
    else if (categoryMenuBtn.dataset.categoryMenu === 'remove') openCategoryRemove(name);
    else if (categoryMenuBtn.dataset.categoryMenu === 'delete') openCategoryDelete(name);
    else if (categoryMenuBtn.dataset.categoryMenu === 'icon') openIconPicker(categoryMenuBtn, 'category', name);
    return;
  }

  const actionBtn = event.target.closest('[data-action]');
  const card = actionBtn?.closest('.content-card');
  const item = card && state.items.find(entry => entry.id === card.dataset.id);
  if (item && actionBtn) {
    const action = actionBtn.dataset.action;
    if (action === 'add-language') {
      item.hasSecondLanguage = true;
      item.translations[1] ||= '';
      markEdited(item); persist(); renderAppView(); return;
    }
    if (action === 'configure-ai') { openSettings('ai'); return; }
    if (action.startsWith('translate-')) {
      translateItem(item, Number(action.slice(10))); return;
    }
    if (action === 'add-image') {
      pendingImageTargetItemId = item.id; $('#image-input')?.click(); return;
    }
    if (action === 'remove-image') {
      const imageId = actionBtn.dataset.imageId;
      // ponytail: keep blobs referenced by restore points; prune on history cleanup if storage grows.
      item.images = item.images.filter(id => id !== imageId);
      markEdited(item); persist();
      renderAppView(); return;
    }
    if (action === 'remove-language') {
      $('#remove-language-dialog').dataset.itemId = item.id;
      $('#remove-language-dialog').showModal(); return;
    }
  }

  if (event.target.closest('#cancel-content')) { closeEditor(); return; }
  if (event.target.closest('#add-second-language')) {
    $('#second-language-field').hidden = false;
    $('#second-language-field').dataset.enabled = 'true';
    $('#add-second-language').hidden = true;
    $('#translate-add-language').hidden = true;
    $('#content-form').classList.add('has-second-language');
    $('#content-form').dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  if (event.target.closest('#remove-draft-language')) {
    $('#language-input-1').textContent = '';
    $('#second-language-field').hidden = true;
    $('#second-language-field').dataset.enabled = 'false';
    $('#add-second-language').hidden = false;
    $('#translate-add-language').hidden = !isAiConfigured;
    $('#content-form').classList.remove('has-second-language');
    $('#content-form').dispatchEvent(new Event('input', { bubbles: true }));
    return;
  }
  if (event.target.closest('#image-picker')) { $('#image-input')?.click(); return; }
  if (event.target.closest('#translate-add-language')) { translateDraft(1); return; }
  const draftTranslationBtn = event.target.closest('[data-translate-draft]');
  if (draftTranslationBtn) { translateDraft(Number(draftTranslationBtn.dataset.translateDraft)); return; }

  if (event.target.closest('#include-descendants')) {
    store.includeDescendants = !store.includeDescendants;
    event.target.closest('#include-descendants').setAttribute('aria-pressed', String(store.includeDescendants));
    renderAppView(); return;
  }
  if (event.target.closest('#start-category-flow')) { startCategoryFlow(); return; }
  if (event.target.closest('#category-flow-prev')) { goToStep(getScenarioSteps(store.scenarioFlow.parent).indexOf(store.category) - 1, renderAppView); return; }
  if (event.target.closest('#category-flow-next')) {
    const steps = getScenarioSteps(store.scenarioFlow.parent);
    const next = steps.indexOf(store.category) + 1;
    if (next >= steps.length) store.scenarioFlow = null;
    else goToStep(next, renderAppView);
    renderAppView(); return;
  }
  if (event.target.closest('#category-flow-exit')) { store.scenarioFlow = null; renderAppView(); return; }
  const flowStep = event.target.closest('[data-flow-step-index]');
  if (flowStep) { goToStep(Number(flowStep.dataset.flowStepIndex), renderAppView); return; }
  if (event.target.closest('#batch-translate')) {
    const ids = store.getVisibleItems().filter(item => (item.type || 'script') === 'script' && !item.hasSecondLanguage && item.translations[0]?.trim()).map(item => item.id);
    if (ids.length) {
      const dialog = $('#batch-translate-dialog');
      $('#batch-translate-note').textContent = uiText('将为 {count} 条素材发送文本进行 AI 翻译，可能产生服务费用。').replace('{count}', ids.length);
      dialog.dataset.itemIds = JSON.stringify(ids);
      dialog.showModal();
    }
    return;
  }
  if (event.target.closest('#stop-translation-batch')) { translationBatch?.stop(); return; }
  if (event.target.closest('#continue-translation-batch')) { translationBatch?.run(); return; }
  if (event.target.closest('#retry-translation-failures')) {
    const ids = translationBatch?.failed.map(item => item.id) || [];
    if (ids.length) startTranslationBatch(ids);
    return;
  }
  if (event.target.closest('#dismiss-translation-batch')) {
    translationBatchDismissed = true; $('#translation-batch-status').hidden = true; return;
  }
  if (event.target.closest('#bulk-add-tags')) {
    askInput(uiText('批量添加标签'), '', uiText('用逗号分隔多个标签')).then(value => {
      const tags = (value || '').split(',').map(tag => tag.trim()).filter(Boolean);
      if (!tags.length) return;
      state.items.filter(entry => store.selectedItemIds.has(entry.id)).forEach(entry => {
        entry.tags = [...new Set([...entry.tags, ...tags])]; markEdited(entry);
      });
      persist(); renderAppView(); toast(uiText('✓ 已为所选素材添加标签'));
    });
    return;
  }
  const imageMenuAction = event.target.closest('[data-image-menu-action]');
  if (imageMenuAction && contextImage) {
    const { id, itemId } = contextImage;
    const menu = $('#image-context-menu');
    menu.hidePopover();
    if (imageMenuAction.dataset.imageMenuAction === 'preview') openImagePreview(id, itemId);
    else if (imageMenuAction.dataset.imageMenuAction === 'copy') getImage(id).then(writeImageToClipboard).then(() => toast(uiText('✓ 已复制图片'))).catch(err => toast(errorMessage(err, '复制图片失败')));
    else if (imageMenuAction.dataset.imageMenuAction === 'download') getImage(id).then(blob => {
      if (!blob) throw new Error(uiText('无法读取图片'));
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = `clipnest-image.${blob.type.split('/')[1] || 'png'}`; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }).catch(err => toast(errorMessage(err, '下载图片失败')));
    else if (imageMenuAction.dataset.imageMenuAction === 'remove') {
      const item = state.items.find(entry => entry.id === itemId);
      if (item) {
        item.images = item.images.filter(imageId => imageId !== id);
        markEdited(item); persist();
        renderAppView();
      }
    }
    contextImage = null;
    return;
  }

  const menuActionBtn = event.target.closest('.card-more-menu button, .category-menu button');
  if (menuActionBtn) {
    closeAllDropdownMenus();
  }

  if (actionBtn) {
    handleCardAction(actionBtn, {
      onCopy: (item, idx) => handleCopyItemAction(item, idx),
      onIcon: (element, item) => openIconPicker(element, 'item', item.id),
      onEdit: (item) => openEditor(item),
      onInsertAfter: (itemId) => openEditor(null, itemId),
      onPreviewImage: (imgId) => openImagePreview(imgId),
      onRefresh: () => renderAppView()
    });
  }

  const tagBtn = event.target.closest('[data-tag-filter]');
  if (tagBtn) {
    store.tagFilter = tagBtn.dataset.tagFilter;
    const select = $('#tag-filter');
    if (select) select.value = store.tagFilter;
    renderAppView();
  }
}

// Close any open details dropdown menus (cards & categories)
export function closeAllDropdownMenus(excludeDetails = null) {
  document.querySelectorAll('details.card-more-wrap[open], details.category-more-wrap[open]').forEach(menu => {
    if (menu !== excludeDetails) {
      menu.removeAttribute('open');
      menu.closest('.category-row')?.classList.remove('menu-open');
    }
  });
}

function setupCategoryReorderListeners() {
  const clearStyles = () => document.querySelectorAll('.category-row').forEach(row => {
    row.classList.remove('category-dragging', 'category-drop-before', 'category-drop-after');
  });

  document.addEventListener('pointerdown', event => {
    const label = event.target.closest('.category-name');
    const row = label?.closest('[data-category-row]');
    if (!row || event.button !== 0) return;
    categoryReorder = { name: row.dataset.categoryRow, pointerId: event.pointerId, x: event.clientX, y: event.clientY, active: false };
  });

  document.addEventListener('pointermove', event => {
    if (!categoryReorder || event.pointerId !== categoryReorder.pointerId) return;
    if (!categoryReorder.active && Math.hypot(event.clientX - categoryReorder.x, event.clientY - categoryReorder.y) < 5) return;
    categoryReorder.active = true;
    event.preventDefault();
    clearStyles();
    [...document.querySelectorAll('[data-category-row]')]
      .find(row => row.dataset.categoryRow === categoryReorder.name)
      ?.classList.add('category-dragging');
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-category-row]');
    if (!target || target.dataset.categoryRow === categoryReorder.name ||
        (state.categoryParents[target.dataset.categoryRow] || '') !== (state.categoryParents[categoryReorder.name] || '')) return;
    const after = event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
    target.classList.add(after ? 'category-drop-after' : 'category-drop-before');
  }, { passive: false });

  document.addEventListener('pointerup', event => {
    if (!categoryReorder || event.pointerId !== categoryReorder.pointerId) return;
    const drag = categoryReorder;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-category-row]');
    categoryReorder = null;
    clearStyles();
    if (!drag.active) return;
    ignoreCategoryClick = true;
    setTimeout(() => { ignoreCategoryClick = false; }, 0);
    if (!target || target.dataset.categoryRow === drag.name ||
        (state.categoryParents[target.dataset.categoryRow] || '') !== (state.categoryParents[drag.name] || '')) return;

    const parent = state.categoryParents[drag.name] || '';
    const siblings = state.categories.filter(name => (state.categoryParents[name] || '') === parent);
    const from = siblings.indexOf(drag.name);
    const to = siblings.indexOf(target.dataset.categoryRow);
    if (from < 0 || to < 0) return;
    siblings.splice(from, 1);
    const after = event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
    siblings.splice(to + (after ? 1 : 0) - (from < to ? 1 : 0), 0, drag.name);
    let index = 0;
    state.categories = state.categories.map(name => (state.categoryParents[name] || '') === parent ? siblings[index++] : name);
    persist();
    renderAppView();
  });

  document.addEventListener('pointercancel', event => {
    if (!categoryReorder || event.pointerId !== categoryReorder.pointerId) return;
    categoryReorder = null;
    clearStyles();
  });
}

function setupItemCategoryDropListeners() {
  const clearTargets = () => {
    document.querySelectorAll('.item-drop-target').forEach(row => row.classList.remove('item-drop-target'));
    document.querySelectorAll('.content-card.drop-before, .content-card.drop-after').forEach(card => card.classList.remove('drop-before', 'drop-after'));
  };
  document.addEventListener('pointerdown', event => {
    const handle = event.target.closest('.drag-handle');
    const card = handle?.closest('.content-card');
    if (!card || event.button !== 0) return;
    itemCategoryDrag = { id: card.dataset.id, pointerId: event.pointerId, x: event.clientX, y: event.clientY, active: false };
  });
  document.addEventListener('pointermove', event => {
    if (!itemCategoryDrag || event.pointerId !== itemCategoryDrag.pointerId) return;
    if (!itemCategoryDrag.active && Math.hypot(event.clientX - itemCategoryDrag.x, event.clientY - itemCategoryDrag.y) < 6) return;
    itemCategoryDrag.active = true;
    event.preventDefault();
    clearTargets();
    const card = document.querySelector(`.content-card[data-id="${CSS.escape(itemCategoryDrag.id)}"]`);
    card?.classList.add('dragging');
    const target = document.elementFromPoint(event.clientX, event.clientY);
    const targetCategory = target?.closest('[data-category-row]');
    if (targetCategory) targetCategory.classList.add('item-drop-target');
    else {
      const targetCard = target?.closest('.content-card');
      if (targetCard && targetCard !== card && store.sortMode === 'manual' && store.view !== 'recent') {
        const after = event.clientY > targetCard.getBoundingClientRect().top + targetCard.offsetHeight / 2;
        targetCard.classList.add(after ? 'drop-after' : 'drop-before');
      }
    }
  }, { passive: false });
  document.addEventListener('pointerup', event => {
    if (!itemCategoryDrag || event.pointerId !== itemCategoryDrag.pointerId) return;
    const drag = itemCategoryDrag;
    const dropTarget = drag.active ? document.elementFromPoint(event.clientX, event.clientY) : null;
    const targetCategory = dropTarget?.closest('[data-category-row]');
    const targetCard = dropTarget?.closest('.content-card');
    itemCategoryDrag = null;
    clearTargets();
    document.querySelector(`.content-card[data-id="${CSS.escape(drag.id)}"]`)?.classList.remove('dragging');
    if (!drag.active) return;
    event.preventDefault();
    event.stopPropagation();
    const item = state.items.find(entry => entry.id === drag.id);
    if (!item) return;
    const category = targetCategory?.dataset.categoryRow;
    if (category && state.categories.includes(category) && item.category !== category) {
      item.category = category;
      markEdited(item);
      persist();
      renderAppView();
      toast(uiText('✓ 已移动到“{name}”').replace('{name}', category));
      return;
    }
    if (targetCard && targetCard.dataset.id !== drag.id) {
      if (store.sortMode !== 'manual' || store.view === 'recent') return toast(uiText('切换到手动排序后才能拖动排序'));
      const movedIndex = state.items.findIndex(entry => entry.id === drag.id);
      if (movedIndex < 0) return;
      const [movedItem] = state.items.splice(movedIndex, 1);
      const targetIndex = state.items.findIndex(entry => entry.id === targetCard.dataset.id);
      if (targetIndex < 0) return;
      const after = event.clientY > targetCard.getBoundingClientRect().top + targetCard.offsetHeight / 2;
      state.items.splice(targetIndex + (after ? 1 : 0), 0, movedItem);
      persist();
      renderAppView();
      toast(uiText('✓ 已调整素材顺序'));
    }
  });
  document.addEventListener('pointercancel', event => {
    if (!itemCategoryDrag || event.pointerId !== itemCategoryDrag.pointerId) return;
    document.querySelector(`.content-card[data-id="${CSS.escape(itemCategoryDrag.id)}"]`)?.classList.remove('dragging');
    itemCategoryDrag = null;
    clearTargets();
  });
}

// Setup outside pointerdown listener to dismiss dropdowns and prevent viewport clipping
function setupDropdownDismissListeners() {
  document.addEventListener('pointerdown', event => {
    const summaryBtn = event.target.closest('details.card-more-wrap > summary, details.category-more-wrap > summary');
    if (summaryBtn) {
      const detailsEl = summaryBtn.parentElement;
      closeAllDropdownMenus(detailsEl);
      const rect = detailsEl.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      detailsEl.classList.toggle('drop-up', spaceBelow < 195 && rect.top > 195);
      return;
    }
    if (!event.target.closest('details.card-more-wrap, details.category-more-wrap')) {
      closeAllDropdownMenus();
    }
    const imageMenu = $('#image-context-menu');
    if (imageMenu?.matches(':popover-open') && !imageMenu.contains(event.target)) {
      imageMenu.hidePopover(); contextImage = null;
    }
  });

  document.addEventListener('contextmenu', event => {
    const image = event.target.closest('.card-image[data-image-id]');
    if (!image) return;
    event.preventDefault();
    contextImage = { id: image.dataset.imageId, itemId: image.closest('.content-card')?.dataset.id };
    const menu = $('#image-context-menu');
    menu.style.left = `${Math.min(event.clientX, window.innerWidth - 205)}px`;
    menu.style.top = `${Math.min(event.clientY, window.innerHeight - 165)}px`;
    menu.showPopover();
  });
}

// Global keyboard shortcuts
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault(); $('#search')?.focus();
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') {
      event.preventDefault(); openEditor();
    } else if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      if (!$('#editor').hidden) { event.preventDefault(); closeEditor(); }
    } else if (event.key === 'Escape') {
      if (!$('#editor').hidden) closeEditor();
      closeIconPicker();
      closeAllDropdownMenus();
    }
  });
}

// Initialize application
export async function initApp() {
  store.subscribe(() => renderAppView());
  try { isAiConfigured = await checkAiKey(); } catch { isAiConfigured = false; }

  $('#search')?.addEventListener('input', e => { store.searchQuery = e.target.value; renderAppView(); });
  $('#tag-filter')?.addEventListener('change', e => { store.tagFilter = e.target.value; renderAppView(); });
  $('#sort-items')?.addEventListener('change', e => { store.sortMode = e.target.value; renderAppView(); });
  $('#image-input')?.addEventListener('change', event => {
    const targetItem = state.items.find(i => i.id === pendingImageTargetItemId);
    pendingImageTargetItemId = '';
    filesToImages(event.target.files, targetItem);
    event.target.value = '';
  });

  document.addEventListener('click', handleGlobalClick);
  document.addEventListener('change', event => {
    const taskToggle = event.target.closest?.('[data-task-toggle]');
    if (!taskToggle) return;
    const card = taskToggle.closest('.content-card');
    const item = state.items.find(entry => entry.id === card?.dataset.id);
    const task = item?.tasks?.[Number(taskToggle.dataset.taskToggle)];
    if (!item || !task) return;
    task.done = taskToggle.checked;
    markEdited(item); persist(); renderAppView();
  });
  document.addEventListener('paste', event => {
    if (event.defaultPrevented || !$('#editor')?.hidden || document.querySelector('dialog[open]')) return;
    if (event.target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
    const files = [...(event.clipboardData?.items || [])]
      .filter(item => item.type.startsWith('image/'))
      .map(item => item.getAsFile())
      .filter(Boolean);
    const card = [...document.querySelectorAll('.content-card')].find(element => element.dataset.id === imagePasteTargetId);
    const targetItem = state.items.find(item => item.id === imagePasteTargetId);
    if (!files.length || !card || !targetItem) return;
    event.preventDefault();
    filesToImages(files, targetItem);
  });
  setupCategoryReorderListeners();
  setupItemCategoryDropListeners();
  setupDropdownDismissListeners();
  setupEditorEventListeners();
  setupBulkEditorEventListeners();
  setupToolbarEventListeners();
  setupTextFormattingToolbar();
  setupDialogEventListeners();
  setupSettingsEventListeners();
  setupKeyboardShortcuts();
  $('#batch-translate-dialog form')?.addEventListener('submit', event => {
    if (event.submitter?.value !== 'start') return;
    event.preventDefault();
    const ids = JSON.parse($('#batch-translate-dialog').dataset.itemIds || '[]');
    $('#batch-translate-dialog').close();
    if (ids.length) startTranslationBatch(ids);
  });
  window.addEventListener('ai-key-status-change', async () => {
    isAiConfigured = await checkAiKey();
    renderAppView();
  });
  renderAppView();
  nativeInvoke('check_for_update')
    .then(version => {
      if (version) toast(`${uiText('发现新版本')} ${version}`, uiText('查看更新'), () => nativeInvoke('open_latest_release'), 15000);
    })
    .catch(() => {});
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
