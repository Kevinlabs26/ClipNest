import { $, $$, toast, uiText } from '../utils/dom.js';
import { esc, categoryPath } from '../utils/text.js';
import { state, persist, markEdited, renderAll } from '../state/store.js';
import { getImage } from '../services/storageService.js';
import { askConfirm, askAlert, setupConfirmDialogListener } from './confirmComponent.js';

export { askConfirm, askAlert };

const EMOJI_ICONS = ['😀','😃','😄','😁','😆','😅','😂','🙂','😉','😊','😍','🥰','😘','😎','🤔','😴','🥳','😭','🙏','👏','👍','👋','🤝','❤️','🔥','✨','⭐','✅','📌','📎','📁','📚','💬','💡','🎯','🎉','🌱','☀️','🌙','🍀','🌸','🐱','🐶','☕','🎵','🚀','🏠','✉️'];
const SYMBOL_ICONS = ['▤','▱','◈','○','●','□','■','△','▲','◇','◆','☆','★','✦','✧','✿','❀','❖','✓','✔','＋','⌂','⌘','♧','♢','♤','♡','♬','☼','☾','⚑','⚙','⚡','☑','⊙','⊕','∞','→','↗','↘','↻','⏱','☷','☰','▣','▪','▫','⬟'];

let currentIconPickerTarget = null;
let activeIconPickerTab = 'emoji';
let pendingNewCategoryIcon = '';
let activeMovingCategoryName = '';

export function isAncestorCategory(parentName, childName) {
  let cur = childName;
  while (cur) {
    if (cur === parentName) return true;
    cur = state.categoryParents[cur];
  }
  return false;
}

export function askInput(title, initialValue = '', inputHint = '', options = {}) {
  return new Promise(resolve => {
    const inputDialogEl = $('#input-dialog');
    const inputField = $('#input-dialog-value');
    $('#input-dialog-title').textContent = uiText(title);
    $('#input-dialog-hint').textContent = uiText(inputHint);
    $('#input-dialog-icon-row').hidden = !options.categoryIcon;
    $('#input-dialog-icon').textContent = '▱';
    inputField.value = initialValue;
    inputDialogEl.returnValue = '';
    inputDialogEl.addEventListener('close', () => resolve(inputDialogEl.returnValue === 'save' ? inputField.value : null), { once: true });
    inputDialogEl.showModal();
    inputField.focus();
    inputField.select();
  });
}

export async function createCategory(parentCategoryName = '') {
  pendingNewCategoryIcon = '';
  const newCatName = (await askInput(parentCategoryName ? `在“${categoryPath(parentCategoryName)}”下新建子分类` : '新分类名称', '', '', { categoryIcon: true }))?.trim();
  const pickedIcon = pendingNewCategoryIcon;
  pendingNewCategoryIcon = '';
  if (!newCatName) return;
  if (state.categories.includes(newCatName)) return toast('这个分类已存在');
  state.categories.push(newCatName);
  if (pickedIcon) state.categoryIcons[newCatName] = pickedIcon;
  if (parentCategoryName) state.categoryParents[newCatName] = parentCategoryName;
  state.collapsedCategories = state.collapsedCategories.filter(entry => entry !== parentCategoryName);
  state.category = newCatName;
  state.lastCategory = newCatName;
  state.view = 'category';
  persist();
  renderAll();
}

export function renameCategory(oldCategoryName, requestedNewName) {
  const finalName = requestedNewName?.trim();
  if (!finalName) return false;
  if (finalName === oldCategoryName) return true;
  if (state.categories.includes(finalName)) {
    toast('这个分类已存在');
    return false;
  }
  state.categories = state.categories.map(entry => entry === oldCategoryName ? finalName : entry);
  if (state.categoryParents[oldCategoryName]) {
    state.categoryParents[finalName] = state.categoryParents[oldCategoryName];
    delete state.categoryParents[oldCategoryName];
  }
  state.categories.forEach(c => { if (state.categoryParents[c] === oldCategoryName) state.categoryParents[c] = finalName; });
  if (state.categoryIcons[oldCategoryName]) {
    state.categoryIcons[finalName] = state.categoryIcons[oldCategoryName];
    delete state.categoryIcons[oldCategoryName];
  }
  state.collapsedCategories = state.collapsedCategories.map(entry => entry === oldCategoryName ? finalName : entry);
  state.items.forEach(item => { if (item.category === oldCategoryName) { item.category = finalName; markEdited(item); } });
  if (state.lastCategory === oldCategoryName) state.lastCategory = finalName;
  if (state.category === oldCategoryName) state.category = finalName;
  persist(); renderAll();
  return true;
}

export function renderIconPicker() {
  const searchQuery = ($('#icon-picker-search')?.value || '').trim();
  const iconList = (activeIconPickerTab === 'emoji' ? EMOJI_ICONS : SYMBOL_ICONS).filter(icon => !searchQuery || icon.includes(searchQuery));
  const gridEl = $('#icon-picker-grid');
  if (gridEl) {
    gridEl.innerHTML = `${searchQuery ? `<button class="icon-picker-custom" data-icon-value="${esc(searchQuery)}">使用“${esc(searchQuery)}”</button>` : ''}${iconList.map(icon => `<button type="button" data-icon-value="${esc(icon)}" aria-label="${esc(icon)}">${esc(icon)}</button>`).join('') || '<span class="empty-icons">没有匹配的图标</span>'}`;
  }
  $$('[data-icon-tab]').forEach(btn => btn.classList.toggle('selected', btn.dataset.iconTab === activeIconPickerTab));
}

export function openIconPicker(anchorElement, pickerKind, targetId) {
  currentIconPickerTarget = { kind: pickerKind, id: targetId };
  activeIconPickerTab = 'emoji';
  if ($('#icon-picker-search')) $('#icon-picker-search').value = '';
  renderIconPicker();
  const pickerEl = $('#icon-picker');
  (pickerKind === 'new-category' ? $('#input-dialog') : document.body).append(pickerEl);
  pickerEl.hidden = false;
  const rect = anchorElement.getBoundingClientRect();
  const posX = Math.max(12, Math.min(rect.left, window.innerWidth - pickerEl.offsetWidth - 12));
  const below = rect.bottom + 8;
  pickerEl.style.left = `${posX}px`;
  pickerEl.style.top = `${below + pickerEl.offsetHeight <= window.innerHeight - 12 ? below : Math.max(12, rect.top - pickerEl.offsetHeight - 8)}px`;
  $('#icon-picker-search')?.focus({ preventScroll: true });
}

export function closeIconPicker() {
  const pickerEl = $('#icon-picker');
  if (pickerEl) pickerEl.hidden = true;
  currentIconPickerTarget = null;
  if (pickerEl && pickerEl.parentElement !== document.body) document.body.append(pickerEl);
}

export function applyPickedIcon(iconValue) {
  if (!currentIconPickerTarget) return;
  if (currentIconPickerTarget.kind === 'new-category') {
    pendingNewCategoryIcon = iconValue.slice(0, 8);
    const iconBtn = $('#input-dialog-icon');
    if (iconBtn) iconBtn.textContent = pendingNewCategoryIcon || '▱';
    closeIconPicker();
    return;
  }
  if (currentIconPickerTarget.kind === 'category') {
    if (iconValue) state.categoryIcons[currentIconPickerTarget.id] = iconValue.slice(0, 8);
    else delete state.categoryIcons[currentIconPickerTarget.id];
  } else {
    const item = state.items.find(entry => entry.id === currentIconPickerTarget.id);
    if (item) {
      item.icon = iconValue.slice(0, 8);
      markEdited(item);
    }
  }
  persist();
  closeIconPicker();
  renderAll();
}

export function openCategoryMove(catName) {
  activeMovingCategoryName = catName;
  const candidates = state.categories.filter(c => c !== catName && !isAncestorCategory(catName, c));
  $('#category-parent-select').innerHTML = `<option value="">顶层分类</option>${candidates.map(c => `<option value="${esc(c)}">${esc(categoryPath(c))}</option>`).join('')}`;
  $('#category-parent-select').value = state.categoryParents[catName] || '';
  $('#category-move-dialog').showModal();
}

export function openCategoryDelete(catName) {
  const destinations = state.categories.filter(c => c !== catName && !isAncestorCategory(catName, c));
  if (!destinations.length) return toast('请先在此分类之外创建一个分类');
  $('#category-delete-name').textContent = `删除“${categoryPath(catName)}”后，它的素材和子分类会合并到所选分类。`;
  $('#category-delete-target').innerHTML = destinations.map(c => `<option value="${esc(c)}">${esc(categoryPath(c))}</option>`).join('');
  $('#category-delete-target').value = destinations.includes(state.categoryParents[catName]) ? state.categoryParents[catName] : destinations[0];
  $('#category-delete-dialog').dataset.category = catName;
  $('#category-delete-dialog').showModal();
}

export function openCategoryRemove(catName) {
  $('#category-remove-dialog').dataset.category = catName;
  $('#category-remove-name').textContent = `“${categoryPath(catName)}”`;
  $('#category-remove-dialog').showModal();
}

export function promptTemplateValues(variables, initialValues = {}, isScenario = false, previewContent = '') {
  const dialogEl = $('#template-dialog');
  const fieldsContainer = $('#template-fields');
  fieldsContainer.replaceChildren(...variables.map(varName => {
    const labelEl = document.createElement('label');
    labelEl.className = 'field-label';
    labelEl.textContent = varName;
    const inputEl = document.createElement('input');
    inputEl.required = true;
    inputEl.dataset.variable = varName;
    inputEl.value = initialValues[varName] ?? '';
    labelEl.append(inputEl);
    return labelEl;
  }));
  const headTitle = dialogEl.querySelector('.dialog-head h2');
  const noteEl = dialogEl.querySelector('.category-delete-note');
  const submitBtn = dialogEl.querySelector('.dialog-actions .primary');
  const previewWrapper = $('#template-preview')?.closest('label');
  if (headTitle) headTitle.textContent = uiText(isScenario ? '填写场景变量' : '填写话术内容');
  if (noteEl) noteEl.textContent = uiText(isScenario ? '开始场景前填写一次，后续步骤会自动复用。' : '请填写每个变量后再复制；原素材不会改变。');
  if (submitBtn) submitBtn.textContent = uiText(isScenario ? '开始浏览' : '复制内容');
  if (previewWrapper) previewWrapper.hidden = isScenario;
  $('#template-preview').textContent = previewContent;

  return new Promise(resolve => {
    dialogEl.returnValue = '';
    dialogEl.addEventListener('close', () => {
      const resultValues = Object.fromEntries([...fieldsContainer.querySelectorAll('input')].map(input => [input.dataset.variable, input.value]));
      resolve(dialogEl.returnValue === 'copy' ? resultValues : null);
      if (headTitle) headTitle.textContent = uiText('填写话术内容');
      if (noteEl) noteEl.textContent = uiText('请填写每个变量后再复制；原素材不会改变。');
      if (submitBtn) submitBtn.textContent = uiText('复制内容');
      if (previewWrapper) previewWrapper.hidden = false;
    }, { once: true });
    dialogEl.showModal();
    fieldsContainer.querySelector('input')?.focus();
  });
}

export async function openImagePreview(imageId, itemId = '') {
  const previewModal = $('#image-preview');
  if (!previewModal || previewModal.open) return;
  const imageBlob = await getImage(imageId);
  if (!imageBlob) return toast('无法读取图片');
  const previewImg = $('#image-preview-content');
  previewImg.src = URL.createObjectURL(imageBlob);
  previewImg.dataset.imageId = imageId;
  previewImg.dataset.itemId = itemId;
  previewModal.showModal();
}

export function setupDialogEventListeners() {
  setupConfirmDialogListener();

  $('#category-move-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const newParent = $('#category-parent-select')?.value || '';
    if (newParent) state.categoryParents[activeMovingCategoryName] = newParent;
    else delete state.categoryParents[activeMovingCategoryName];
    persist(); renderAll();
    $('#category-move-dialog')?.close();
    toast('✓ 分类位置已更新');
  });

  $('#category-remove-form')?.addEventListener('submit', event => {
    if (event.submitter?.id !== 'category-remove-confirm') return;
    event.preventDefault();
    const targetCat = $('#category-remove-dialog')?.dataset.category;
    if (!state.categories.includes(targetCat)) return;
    const parent = state.categoryParents[targetCat] || '';
    state.items.forEach(item => { if (item.category === targetCat) { item.category = ''; markEdited(item); } });
    state.categories.forEach(name => { if (state.categoryParents[name] === targetCat) {
      if (parent) state.categoryParents[name] = parent;
      else delete state.categoryParents[name];
    } });
    state.categories = state.categories.filter(c => c !== targetCat);
    delete state.categoryParents[targetCat];
    delete state.categoryIcons[targetCat];
    if (state.category === targetCat) state.category = '';
    persist(); renderAll();
    $('#category-remove-dialog')?.close();
    toast('✓ 分类已删除，素材已保留');
  });

  $('#category-delete-form')?.addEventListener('submit', event => {
    if (event.submitter?.id !== 'category-delete-confirm') return;
    event.preventDefault();
    const targetCat = $('#category-delete-dialog')?.dataset.category;
    const destCat = $('#category-delete-target')?.value;
    if (!state.categories.includes(targetCat) || !state.categories.includes(destCat)) return;
    state.items.forEach(item => { if (item.category === targetCat) { item.category = destCat; markEdited(item); } });
    state.categories.forEach(name => { if (state.categoryParents[name] === targetCat) state.categoryParents[name] = destCat; });
    state.categories = state.categories.filter(c => c !== targetCat);
    delete state.categoryParents[targetCat];
    delete state.categoryIcons[targetCat];
    if (state.category === targetCat) state.category = destCat;
    persist(); renderAll();
    $('#category-delete-dialog')?.close();
    toast('✓ 已合并并删除分类');
  });

  $('#remove-language-form')?.addEventListener('submit', event => {
    if (event.submitter?.value !== 'remove') return;
    event.preventDefault();
    const item = state.items.find(entry => entry.id === $('#remove-language-dialog')?.dataset.itemId);
    if (!item) return;
    item.translations[1] = '';
    item.hasSecondLanguage = false;
    markEdited(item); persist(); renderAll();
    $('#remove-language-dialog').close();
    toast('✓ 已移除第二种语言');
  });

  $('#image-preview')?.addEventListener('click', event => {
    if (event.target === $('#image-preview')) $('#image-preview').close();
  });
  $('#image-preview')?.addEventListener('close', () => {
    const previewImg = $('#image-preview-content');
    if (previewImg?.src) URL.revokeObjectURL(previewImg.src);
  });

  $('#icon-picker-search')?.addEventListener('input', renderIconPicker);
  $('#icon-picker')?.addEventListener('click', event => {
    const tabBtn = event.target.closest('[data-icon-tab]');
    if (tabBtn) { activeIconPickerTab = tabBtn.dataset.iconTab; renderIconPicker(); return; }
    if (event.target.closest('#reset-picked-icon')) { applyPickedIcon(''); return; }
    const choice = event.target.closest('[data-icon-value]');
    if (choice) applyPickedIcon(choice.dataset.iconValue);
  });
  document.addEventListener('pointerdown', event => {
    const picker = $('#icon-picker');
    if (picker && !picker.hidden && !picker.contains(event.target)) closeIconPicker();
  });
}
