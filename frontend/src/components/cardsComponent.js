// Cards Component: item cards, dual-language copy pills, variable badges, and image hydration
import { $, toast, uiText, displayLanguageName } from '../utils/dom.js';
import { esc, highlight, categoryPath, richTextValue, countDocumentCharacters } from '../utils/text.js';
import { getImage } from '../services/storageService.js';
import { store, markEdited } from '../state/store.js';
import { askConfirm } from './confirmComponent.js';

const activeBlobUrls = new Set();
let cardImageDrag = null;
let suppressCardImageClickUntil = 0;
const inlineSaveTimers = new Map();

export function setupTextFormattingToolbar() {
  const toolbar = $('#text-format-toolbar');
  if (!toolbar || toolbar.dataset.bound) return;
  toolbar.dataset.bound = 'true';
  let selectedField = null;
  let selectedRange = null;
  const formatHistory = [];

  const hide = () => {
    toolbar.hidden = true;
    selectedField = selectedRange = null;
  };
  const getContext = field => {
    const card = field?.closest('.content-card');
    const item = store.state.items.find(entry => entry.id === card?.dataset.id);
    const index = Number(field?.dataset.inlineEdit);
    return item && Number.isInteger(index) ? { item, index } : null;
  };
  const updateUndo = () => {
    const button = toolbar.querySelector('[data-format-command="undo"]');
    const context = getContext(selectedField);
    const last = formatHistory.at(-1);
    if (button) button.disabled = !context || !last || last.itemId !== context.item.id || last.index !== context.index || context.item.translations[context.index] !== last.after;
  };
  const positionToolbar = range => {
    const rect = range.getBoundingClientRect();
    const contentLeft = document.querySelector('.main')?.getBoundingClientRect().left || 0;
    const minLeft = Math.max(8, contentLeft + 8);
    const maxLeft = window.innerWidth - toolbar.offsetWidth - 8;
    const centered = rect.left + rect.width / 2 - toolbar.offsetWidth / 2;
    toolbar.style.left = `${Math.max(minLeft, Math.min(maxLeft, centered))}px`;
    const top = rect.top >= 56 ? rect.top - toolbar.offsetHeight - 8 : rect.bottom + 8;
    toolbar.style.top = `${Math.max(8, Math.min(window.innerHeight - toolbar.offsetHeight - 8, top))}px`;
  };
  const undo = expectedField => {
    while (formatHistory.length) {
      const last = formatHistory.at(-1);
      if (expectedField) {
        const context = getContext(expectedField);
        if (!context || last.itemId !== context.item.id || last.index !== context.index) return false;
      }
      formatHistory.pop();
      const item = store.state.items.find(entry => entry.id === last.itemId);
      if (!item || item.translations[last.index] !== last.after) continue;
      item.translations[last.index] = last.before;
      markEdited(item);
      store.persist();
      const field = document.querySelector(`.content-card[data-id="${CSS.escape(last.itemId)}"] [data-inline-edit="${last.index}"]`);
      if (field) field.innerHTML = highlight(last.before, store.searchQuery.trim().toLowerCase());
      hide();
      toast(uiText('✓ 已撤销上一次文字格式'));
      return true;
    }
    updateUndo();
    return false;
  };
  const applyFormat = (kind, color = '') => {
    if (!selectedField?.isConnected || !selectedRange) return;
    const context = getContext(selectedField);
    if (!context) return hide();
    const { item, index } = context;
    const before = item.translations[index];
    const wrapper = kind === 'bold' ? document.createElement('strong') : document.createElement('span');
    if (kind === 'color' || kind === 'bg') {
      if (!/^#[\da-f]{6}$/i.test(color)) return;
      const attribute = kind === 'color' ? 'textColor' : 'textBg';
      const property = kind === 'color' ? 'color' : 'background-color';
      wrapper.querySelectorAll(`[data-text-${kind === 'color' ? 'color' : 'bg'}]`).forEach(node => {
        delete node.dataset[attribute];
        node.style.removeProperty(property);
      });
      if (kind === 'color') {
        wrapper.dataset.textColor = color.toLowerCase();
        wrapper.style.color = color;
      } else {
        wrapper.dataset.textBg = color.toLowerCase();
        wrapper.style.backgroundColor = color;
      }
    } else if (kind !== 'bold') return;

    wrapper.append(selectedRange.extractContents());
    selectedRange.insertNode(wrapper);
    const selection = window.getSelection();
    selectedRange = document.createRange();
    selectedRange.selectNodeContents(wrapper);
    selection?.removeAllRanges();
    selection?.addRange(selectedRange);

    item.translations[index] = richTextValue(selectedField);
    formatHistory.push({ itemId: item.id, index, before, after: item.translations[index] });
    if (formatHistory.length > 30) formatHistory.shift();
    markEdited(item);
    store.persist();
    updateUndo();
    positionToolbar(selectedRange);
    toast(uiText(kind === 'bold' ? '✓ 已加粗选中文字' : kind === 'bg' ? '✓ 已更改文字底色' : '✓ 已更改文字颜色'));
  };

  document.addEventListener('selectionchange', () => {
    if (toolbar.contains(document.activeElement)) return;
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) return hide();
    const range = selection.getRangeAt(0);
    const fieldFor = node => (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement)?.closest('.language-text');
    const field = fieldFor(range.startContainer);
    if (!field || field !== fieldFor(range.endContainer) || field.isContentEditable || !field.getClientRects().length) return hide();

    selectedField = field;
    selectedRange = range.cloneRange();
    toolbar.hidden = false;
    positionToolbar(selectedRange);
    updateUndo();
  });

  toolbar.addEventListener('pointerdown', event => { if (!event.target.closest('input')) event.preventDefault(); });
  toolbar.addEventListener('click', event => {
    const button = event.target.closest('button[data-format-command]');
    if (button?.dataset.formatCommand === 'undo') { undo(selectedField); return; }
    if (button?.dataset.formatCommand === 'bold') applyFormat('bold');
    else if (button?.dataset.formatCommand === 'color' || button?.dataset.formatCommand === 'bg') applyFormat(button.dataset.formatCommand, button.dataset.textColor);
  });
  toolbar.addEventListener('change', event => {
    const picker = event.target.closest('input[data-format-picker]');
    if (picker) applyFormat(picker.dataset.formatPicker, picker.value);
  });
  document.addEventListener('keydown', event => {
    if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'z' || event.target.closest?.('input, textarea, [contenteditable="true"]')) return;
    if (document.querySelector('dialog[open]')) return;
    const selection = window.getSelection();
    const node = selection?.rangeCount ? selection.getRangeAt(0).startContainer : null;
    const selectionField = node && (node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement)?.closest('.language-text');
    if (!selectionField && !toolbar.contains(document.activeElement)) return;
    if (undo(selectionField || selectedField)) event.preventDefault();
  });
}

export function startInlineCardEdit(card, focusTarget) {
  const item = store.state.items.find(entry => entry.id === card?.dataset.id);
  if (!item) return;
  const fields = focusTarget ? [focusTarget] : [];
  const save = () => {
    const title = card.querySelector('[data-inline-title]');
    if (title) item.title = richTextValue(title);
    card.querySelectorAll('[data-inline-edit]').forEach(field => {
      item.translations[Number(field.dataset.inlineEdit)] = richTextValue(field);
    });
    const countEl = card.querySelector('[data-document-count]');
    if (countEl) countEl.textContent = countDocumentCharacters(item.translations[0]);
    markEdited(item);
    window.clearTimeout(inlineSaveTimers.get(item.id));
    inlineSaveTimers.set(item.id, window.setTimeout(() => {
      store.persist();
      inlineSaveTimers.delete(item.id);
    }, 250));
  };

  fields.forEach(field => {
    field.contentEditable = 'true';
    field.classList.add('inline-editing');
    if (field.dataset.inlineEditBound) return;
    field.dataset.inlineEditBound = 'true';
    field.addEventListener('input', save);
    field.addEventListener('blur', () => {
      save();
      const value = richTextValue(field);
      field.contentEditable = 'false';
      field.classList.remove('inline-editing');
      field.innerHTML = highlight(value, store.searchQuery.trim().toLowerCase());
      window.clearTimeout(inlineSaveTimers.get(item.id));
      inlineSaveTimers.delete(item.id);
      store.persist();
    });
    field.addEventListener('keydown', event => {
      if (field.hasAttribute('data-inline-title') && event.key === 'Enter') {
        event.preventDefault();
        field.blur();
      } else if (event.key === 'Enter' && !event.isComposing) {
        event.preventDefault();
        document.execCommand('insertLineBreak');
        save();
      } else if (event.key === 'Escape') {
        field.blur();
      }
    });
  });
  focusTarget?.focus();
}

function setupCardImageReordering(container) {
  if (container.dataset.imageReorderBound) return;
  container.dataset.imageReorderBound = 'true';

  const clearDrag = () => {
    if (!cardImageDrag) return;
    window.clearTimeout(cardImageDrag.timer);
    const { source, pointerId } = cardImageDrag;
    source.classList.remove('dragging');
    source.closest('.card-images')?.querySelectorAll('.card-image-wrap').forEach(tile => tile.classList.remove('drop-target'));
    try { if (source.hasPointerCapture(pointerId)) source.releasePointerCapture(pointerId); } catch {}
  };

  container.addEventListener('pointerdown', event => {
    const source = event.target.closest('.card-image-wrap');
    if (!source || event.button !== 0 || event.target.closest('button') || cardImageDrag) return;
    const card = source.closest('.content-card');
    if (!card) return;
    cardImageDrag = { source, card, pointerId: event.pointerId, x: event.clientX, y: event.clientY, active: false, timer: 0 };

    const begin = () => {
      if (!cardImageDrag || cardImageDrag.source !== source) return;
      cardImageDrag.active = true;
      source.classList.add('dragging');
      try { source.setPointerCapture(event.pointerId); } catch {}
    };
    cardImageDrag.begin = begin;
    if (event.pointerType !== 'mouse') cardImageDrag.timer = window.setTimeout(begin, 320);
  });

  container.addEventListener('pointermove', event => {
    if (!cardImageDrag || event.pointerId !== cardImageDrag.pointerId) return;
    if (!cardImageDrag.active) {
      const distance = Math.hypot(event.clientX - cardImageDrag.x, event.clientY - cardImageDrag.y);
      if (event.pointerType === 'mouse' && distance > 6) {
        window.clearTimeout(cardImageDrag.timer);
        cardImageDrag.begin();
      } else if (event.pointerType !== 'mouse' && distance > 10) {
        window.clearTimeout(cardImageDrag.timer);
        cardImageDrag = null;
      }
      if (!cardImageDrag?.active) return;
    }
    event.preventDefault();
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('.card-image-wrap');
    cardImageDrag.card.querySelectorAll('.card-image-wrap').forEach(tile => tile.classList.toggle('drop-target', tile === target && tile !== cardImageDrag.source));
  }, { passive: false });

  container.addEventListener('pointerup', event => {
    if (!cardImageDrag || event.pointerId !== cardImageDrag.pointerId) return;
    const drag = cardImageDrag;
    const target = drag.active ? document.elementFromPoint(event.clientX, event.clientY)?.closest('.card-image-wrap') : null;
    const item = store.state.items.find(entry => entry.id === drag.card.dataset.id);
    const from = item?.images.indexOf(drag.source.dataset.imageId) ?? -1;
    const to = target?.closest('.content-card') === drag.card ? item?.images.indexOf(target.dataset.imageId) ?? -1 : -1;
    const shouldReorder = drag.active && from >= 0 && to >= 0 && from !== to;
    if (drag.active) suppressCardImageClickUntil = Date.now() + 500;
    clearDrag();
    cardImageDrag = null;

    if (shouldReorder) {
      const [imageId] = item.images.splice(from, 1);
      item.images.splice(to, 0, imageId);
      const list = drag.card.querySelector('.card-images');
      [...(list?.children || [])]
        .sort((a, b) => item.images.indexOf(a.dataset.imageId) - item.images.indexOf(b.dataset.imageId))
        .forEach(tile => list.append(tile));
      store.persist();
      toast(uiText('✓ 已调整图片位置'));
    }
  });

  container.addEventListener('pointercancel', event => {
    if (!cardImageDrag || event.pointerId !== cardImageDrag.pointerId) return;
    clearDrag();
    cardImageDrag = null;
  });

  container.addEventListener('click', event => {
    if (Date.now() < suppressCardImageClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  container.addEventListener('dblclick', event => {
    const field = event.target.closest('[data-inline-title], [data-inline-edit]');
    if (field) startInlineCardEdit(field.closest('.content-card'), field);
  });
}

// Revoke previously created blob URLs to prevent memory leak
export function cleanupCardBlobUrls() {
  activeBlobUrls.forEach(url => URL.revokeObjectURL(url));
  activeBlobUrls.clear();
}

// Hydrate card images asynchronously from IndexedDB
export async function hydrateCardImages() {
  const imageElements = document.querySelectorAll('img.card-image[data-image-id]');
  for (const img of imageElements) {
    const id = img.dataset.imageId;
    if (!id || img.src.startsWith('blob:')) continue;
    try {
      const blob = await getImage(id);
      if (blob) {
        const url = URL.createObjectURL(blob);
        activeBlobUrls.add(url);
        img.src = url;
      }
    } catch (err) {
      console.error('Failed to load image blob', err);
    }
  }
}

// Render cards list with dual-language pills and empty state fallback
export function renderCards(items, aiKeyConfigured = false) {
  const cardsContainer = $('#cards');
  if (!cardsContainer) return;
  setupCardImageReordering(cardsContainer);

  const { language, searchQuery, selectedItemIds, selectionModeActive, state } = store;
  const { expanded, categories, categoryParents } = state;
  const languages = state.languages.map(displayLanguageName);
  const t = key => esc(uiText(key));
  const term = searchQuery.trim().toLowerCase();

  cardsContainer.className = `cards language-${language}`;
  cleanupCardBlobUrls();

  cardsContainer.innerHTML = items.map(item => {
    const itemType = item.type || 'script';
    const isScript = itemType === 'script';
    const isDocument = itemType === 'document';
    const isCollapsed = expanded.includes(item.id) ? '' : 'collapsed';
    const translationTarget = isScript && item.translations[0]?.trim()
      ? (item.translations[1]?.trim() ? -1 : 1)
      : isScript && item.translations[1]?.trim() ? 0 : -1;

    // Extract unique template variable names
    const varMatches = [
      ...(item.translations[0] || '').matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g),
      ...(item.translations[1] || '').matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)
    ];
    const varNames = [...new Set(varMatches.map(m => m[1].trim()))];

    // Build 1-click dual language copy pills
    let copyButtonsHtml = '';
    if (!isScript) {
      copyButtonsHtml = '';
    } else if (language === '0') {
      copyButtonsHtml = `<button class="card-copy-pill" data-action="copy-0" title="${t('复制')} ${esc(languages[0])}">${t('复制')} ${esc(languages[0])}</button>`;
    } else if (language === '1') {
      const targetIdx = item.hasSecondLanguage ? 1 : 0;
      copyButtonsHtml = `<button class="card-copy-pill" data-action="copy-${targetIdx}" title="${t('复制')} ${esc(languages[targetIdx])}">${t('复制')} ${esc(languages[targetIdx])}</button>`;
    } else {
      if (item.hasSecondLanguage) {
        copyButtonsHtml = `<div class="card-copy-group">` +
          `<button class="card-copy-pill" data-action="copy-0" title="${t('复制')} ${esc(languages[0])}">${esc(languages[0])}</button>` +
          `<button class="card-copy-pill" data-action="copy-1" title="${t('复制')} ${esc(languages[1])}">${esc(languages[1])}</button>` +
          `</div>`;
      } else {
        copyButtonsHtml = `<button class="card-copy-pill" data-action="copy-0" title="${t('复制')} ${esc(languages[0])}">${t('复制')} ${esc(languages[0])}</button>`;
      }
    }

    const isSelected = selectedItemIds.has(item.id);
    const fullCategoryPath = categoryPath(item.category, categories, categoryParents);

    return `<article class="content-card ${isCollapsed} ${isSelected ? 'is-selected' : ''} ${item.hasSecondLanguage ? '' : 'single-language'}" data-id="${esc(item.id)}" tabindex="-1">` +
      `<button class="drag-handle" type="button" title="${t('拖到素材卡片间调整顺序，拖到左侧分类以移动素材')}" aria-label="${t('拖动素材以排序或移动分类')}">⠿</button>` +
      `<div class="card-head">` +
      (selectionModeActive ? `<button class="select-item ${isSelected ? 'selected' : ''}" data-select-item="${esc(item.id)}" type="button" aria-label="${t(isSelected ? '取消选择' : '选择素材')}" aria-pressed="${isSelected}">${isSelected ? '✓' : ''}</button>` : '') +
      `<button class="card-icon" data-action="icon" title="${t('自定义图标')}" aria-label="${t('自定义素材图标')}">${esc(item.icon || '▤')}</button>` +
      `<div><h2 class="card-title" data-inline-title title="${t('双击直接编辑')}">${highlight(item.title, term)}</h2>` +
      `<div class="card-meta">${item.category ? esc(fullCategoryPath) : t('未分类')} · ${isScript ? `${esc(languages[0])}${item.hasSecondLanguage ? ` / ${esc(languages[1])}` : ''}` : isDocument ? `${t('文档')} · ${t('字数')}: <span data-document-count>${countDocumentCharacters(item.translations[0])}</span>` : `${t('待办清单')} · ${(item.tasks || []).filter(task => task.done).length}/${(item.tasks || []).length} ${t('已完成')}`}<span data-copy-count>${isScript && item.copied ? ` · ${t('已复制')} ${item.copied} ${t('次')}` : ''}</span>${isScript && varNames.length ? `<span class="card-meta-var-badge" title="${t('包含')} ${varNames.length} ${t('个变量')}：${esc(varNames.join(', '))}">⚡ ${varNames.length} ${t('变量')}</span>` : ''}</div>` +
      `</div>` +
      `<div class="card-actions">` +
      `<button class="icon-button ${item.favorite ? 'favorite' : ''}" data-action="favorite" title="${t('收藏')}" aria-label="${t('收藏')}">${item.favorite ? '★' : '☆'}</button>` +
      copyButtonsHtml +
      `<details class="card-more-wrap"><summary class="icon-button card-more" aria-label="${t('更多操作')}" title="${t('更多操作')}">···</summary>` +
      `<div class="card-more-menu">` +
      `<button type="button" data-action="edit-full">${t(isScript ? '编辑分类、标签和图片…' : '编辑内容、分类、标签和图片…')}</button>` +
      `<button type="button" data-action="insert-after">${t('在此后新建')}</button>` +
      `<button type="button" data-action="clone">${t('克隆')}</button>` +
      (isScript && !item.hasSecondLanguage ? `<button type="button" data-action="add-language">${t('手动添加')} ${esc(languages[1])}</button>` : '') +
      (isScript && translationTarget >= 0 ? `<button type="button" data-translation-target="${translationTarget}" data-action="${aiKeyConfigured ? `translate-${translationTarget}` : 'configure-ai'}">${aiKeyConfigured ? `${t('AI 翻译为')} ${esc(languages[translationTarget])}` : t('设置 AI 翻译')}</button>` : '') +
      `<button type="button" data-action="add-image">${t('添加图片')}</button>` +
      `<button type="button" class="danger-action" data-action="delete-item">${t('删除')}</button>` +
      `</div></details>` +
      `<button class="card-toggle" data-action="toggle" aria-label="${t(isCollapsed ? '展开' : '收起')}" aria-expanded="${!isCollapsed}" title="${t(isCollapsed ? '展开' : '收起')}"></button>` +
      `</div></div>` +
      (isScript ? `<div class="card-body">${[0, 1].filter(idx => idx === 0 || item.hasSecondLanguage).map(idx => `<section class="language-block" data-lang="${idx}"><div class="language-head"><span>${esc(languages[idx])}</span><div class="language-tools"><button class="copy-button" data-action="copy-${idx}" title="${t('复制')} ${esc(languages[idx])}">${t('复制')}</button>${idx === 1 ? `<button class="remove-language" data-action="remove-language" title="${t('移除语言 2')}" aria-label="${t('移除语言 2')}">×</button>` : ''}</div></div><p class="language-text" data-inline-edit="${idx}" aria-label="${esc(languages[idx])} ${t('内容')}" title="${t('双击直接编辑')}">${highlight(item.translations[idx], term)}</p></section>`).join('')}</div>` : isDocument ? `<div class="card-body document-body"><section class="language-block document-block"><div class="language-head"><span>${t('正文')}</span></div><p class="language-text" data-inline-edit="0" aria-label="${t('文档正文')}" title="${t('双击直接编辑')}">${highlight(item.translations[0] || '', term)}</p></section></div>` : `<div class="card-body checklist-body">${(item.tasks || []).map((task, index) => `<label class="task-row"><input type="checkbox" data-task-toggle="${index}" aria-label="${t('完成')} ${esc(task.text)}" ${task.done ? 'checked' : ''}><span class="${task.done ? 'task-done' : ''}">${highlight(task.text, term)}</span></label>`).join('') || `<p class="task-empty">${t('从“更多操作 → 编辑内容”添加待办项目')}</p>`}</div>` ) +
      (item.images?.length ? `<div class="card-images">${item.images.map(id => `<div class="card-image-wrap" data-image-id="${esc(id)}" title="${t('点击预览；长按拖动可调整顺序')}"><img class="card-image" data-image-id="${esc(id)}" data-action="preview-image" alt="${t('素材图片')}"><button class="remove-card-image" type="button" data-action="remove-image" data-image-id="${esc(id)}" aria-label="${t('删除这张图片')}" title="${t('删除图片')}">×</button></div>`).join('')}</div>` : '') +
      (item.tags?.length ? `<footer class="card-foot">${item.tags.map(tag => `<button class="tag" type="button" data-tag-filter="${esc(tag)}" aria-label="${t('筛选标签')} ${esc(tag)}">#${esc(tag)}</button>`).join('')}</footer>` : '') +
      `</article>`;
  }).join('');

  hydrateCardImages();

  // Render empty state
  const emptyEl = $('#empty');
  if (emptyEl) {
    if (items.length) {
      emptyEl.hidden = true;
    } else {
      emptyEl.hidden = false;
      if (!categories.length) {
        emptyEl.innerHTML = `<span>＋</span><h2>${t('先创建一个分类')}</h2><p>${t('分类由你自己创建，之后可在这里添加素材。')}</p><button class="button primary" id="empty-category">${t('＋ 新建分类')}</button>`;
      } else if (store.searchQuery.trim() || store.tagFilter || store.filter !== 'all' || store.view === 'favorites' || store.view === 'recent') {
        emptyEl.innerHTML = `<span>⌕</span><h2>${t('没有匹配的内容')}</h2><p>${t('试试调整搜索词或筛选条件，也可以查看全部内容。')}</p><button class="button" id="empty-show-all">${t('查看全部内容')}</button><button class="button primary" id="empty-new">${t('＋ 新建内容')}</button>`;
      } else if (store.view === 'category') {
        emptyEl.innerHTML = `<span>▤</span><h2>${t('这个分类还没有内容')}</h2><p>${t('添加话术、文档或待办清单，之后就能在这里快速查找。')}</p><button class="button primary" id="empty-new">${t('＋ 新建内容')}</button>`;
      } else {
        emptyEl.innerHTML = `<span>▤</span><h2>${t('素材库还是空的')}</h2><p>${t('创建话术、文档或待办清单，常用内容都可以放在这里。')}</p><button class="button primary" id="empty-new">${t('＋ 新建内容')}</button>`;
      }
    }
  }
}

// Dispatch item card actions cleanly
export async function handleCardAction(actionElement, callbacks) {
  const cardElement = actionElement.closest('.content-card');
  const targetId = cardElement?.dataset.id;
  const targetItem = store.state.items.find(entry => entry.id === targetId);
  const actionType = actionElement.dataset.action;
  if (!targetItem || !actionType) return;

  if (actionType.startsWith('copy-')) {
    const idx = Number(actionType.slice(5));
    callbacks.onCopy(targetItem, idx);
  } else if (actionType === 'toggle') {
    const { expanded } = store.state;
    store.state.expanded = expanded.includes(targetItem.id)
      ? expanded.filter(id => id !== targetItem.id)
      : [...expanded, targetItem.id];
    store.persist();
    callbacks.onRefresh();
  } else if (actionType === 'favorite') {
    targetItem.favorite = !targetItem.favorite;
    targetItem.updatedAt = Date.now();
    store.persist();
    callbacks.onRefresh();
  } else if (actionType === 'icon') {
    callbacks.onIcon?.(actionElement, targetItem);
  } else if (actionType === 'edit-full') {
    callbacks.onEdit(targetItem);
  } else if (actionType === 'insert-after') {
    callbacks.onInsertAfter(targetItem.id);
  } else if (actionType === 'clone') {
    const clone = {
      ...targetItem,
      id: crypto.randomUUID(),
      title: `${targetItem.title || uiText('未命名素材')}${uiText('（副本）')}`,
      translations: [...targetItem.translations],
      tasks: (targetItem.tasks || []).map(task => ({ ...task })),
      tags: [...targetItem.tags],
      images: [...targetItem.images],
      copied: 0,
      recent: 0,
      updatedAt: Date.now()
    };
    const idx = store.state.items.indexOf(targetItem);
    store.state.items.splice(idx + 1, 0, clone);
    store.persist();
    callbacks.onRefresh();
  } else if (actionType === 'delete-item') {
    const itemTitle = targetItem.title || uiText('未命名素材');
    const confirmed = await askConfirm(uiText('确认删除“{title}”？此操作不可撤销。').replace('{title}', itemTitle), uiText('删除素材'), uiText('确认删除'), true);
    if (confirmed) {
      store.state.items = store.state.items.filter(entry => entry.id !== targetItem.id);
      store.persist();
      callbacks.onRefresh();
    }
  } else if (actionType === 'preview-image') {
    callbacks.onPreviewImage(actionElement.dataset.imageId);
  }
}
