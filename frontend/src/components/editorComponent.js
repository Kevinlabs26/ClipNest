// Controlled editor component for individual content items
import { $, toast, uiText, displayLanguageName } from '../utils/dom.js';
import { esc, highlight, richTextValue, countDocumentCharacters } from '../utils/text.js';
import { state, persist, markEdited, renderAll } from '../state/store.js';
import { storeImage, getImage } from '../services/storageService.js';
import { openImagePreview } from './dialogsComponent.js';

let activeEditingItemId = '';
let pendingInsertAfterItemId = '';
let activeDraftImageIds = [];
let originalItemImageIds = [];
let draftAutoSaveTimerId = null;
let editorHome = null;
let editorInline = false;

function ensureEditorHome(editor) {
  if (editorHome) return;
  editorHome = document.createComment('editor-home');
  editor.before(editorHome);
}

export function positionEditor() {
  const editor = $('#editor');
  if (!editor || editor.hidden) return;
  ensureEditorHome(editor);
  const card = editorInline
    ? document.querySelector(`.content-card[data-id="${CSS.escape(activeEditingItemId)}"]`)
    : null;
  if (card) {
    card.classList.add('is-editing');
    card.append(editor);
  } else {
    editorHome.after(editor);
  }
}

export function getEditingItemId() {
  return activeEditingItemId;
}

export function showSecondLanguage(shouldShow) {
  const secondLanguageField = $('#second-language-field');
  if (secondLanguageField) {
    secondLanguageField.toggleAttribute('hidden', !shouldShow);
    secondLanguageField.dataset.enabled = String(shouldShow);
  }
  $('#add-second-language')?.toggleAttribute('hidden', shouldShow);
  $('#translate-add-language')?.toggleAttribute('hidden', shouldShow);
  $('#content-form')?.classList.toggle('has-second-language', shouldShow);
}

function updateEditorType(type) {
  const isScript = type === 'script';
  const isDocument = type === 'document';
  const typeName = uiText(isScript ? '双语话术' : isDocument ? '纯文档' : '待办清单');
  $('#dialog-title').textContent = `${uiText($('#item-type-input').disabled ? '编辑' : '新建')} ${typeName}`;
  const languageField = $('#language-input-0')?.closest('.draft-language');
  if (languageField) languageField.hidden = type === 'checklist';
  $('#language-label-0').textContent = isDocument ? uiText('正文') : displayLanguageName(state.languages[0]);
  $('#document-character-count').hidden = !isDocument;
  if (isDocument) $('#document-character-count-value').textContent = countDocumentCharacters(richTextValue($('#language-input-0')));
  $('#language-label-1').textContent = displayLanguageName(state.languages[1]);
  $('#second-language-field').hidden = !isScript || $('#second-language-field').dataset.enabled !== 'true';
  $('#add-second-language').hidden = !isScript || $('#second-language-field').dataset.enabled === 'true';
  $('#translate-add-language').hidden = true;
  document.querySelectorAll('[data-translate-draft]').forEach(button => { button.hidden = !isScript; });
  $('.template-help').hidden = !isScript;
  $('#task-list-field').hidden = type !== 'checklist';
  $('#content-form')?.classList.toggle('has-second-language', isScript && !$('#second-language-field')?.hidden);
  $('#save-status').textContent = uiText(type === 'checklist' ? '输入即自动保存 · 每行一项，勾选可标记完成' : '输入即自动保存');
}

export function updateDraftTranslationControls() {
  const transZero = richTextValue($('#language-input-0')).trim();
  const transOne = richTextValue($('#language-input-1')).trim();
  const forwardBtn = document.querySelector('[data-translate-draft="1"]');
  const reverseBtn = document.querySelector('[data-translate-draft="0"]');
  const addTransBtn = $('#translate-add-language');
  if (forwardBtn) forwardBtn.disabled = !transZero || Boolean(transOne);
  if (reverseBtn) reverseBtn.disabled = !transOne || Boolean(transZero);
  if (addTransBtn) addTransBtn.disabled = !transZero;
}

let draggedImageId = '';
let suppressImageClickUntil = 0;

// Setup HTML5 Drag and Drop for image thumbnail reordering
function setupImageTileDnD(tileElement, imageId, onReorder) {
  let pressTimer = 0;
  let touchPointerId = null;
  let touchDragStarted = false;
  let startX = 0;
  let startY = 0;
  tileElement.draggable = true;
  tileElement.dataset.imageId = imageId;
  tileElement.addEventListener('dragstart', event => {
    draggedImageId = imageId;
    tileElement.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', imageId);
  });
  tileElement.addEventListener('dragover', event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    if (draggedImageId && draggedImageId !== imageId) tileElement.classList.add('drop-target');
  });
  tileElement.addEventListener('dragleave', () => tileElement.classList.remove('drop-target'));
  tileElement.addEventListener('dragend', () => {
    tileElement.classList.remove('dragging');
    $('#image-list')?.querySelectorAll('.image-tile').forEach(t => t.classList.remove('drop-target'));
    draggedImageId = '';
  });
  tileElement.addEventListener('drop', event => {
    event.preventDefault();
    tileElement.classList.remove('drop-target');
    if (draggedImageId && draggedImageId !== imageId) onReorder(draggedImageId, imageId);
  });

  // Native drag-and-drop is inconsistent on touchscreens; require a short hold before reordering.
  tileElement.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || event.target.closest('button') || touchPointerId !== null) return;
    touchPointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    pressTimer = window.setTimeout(() => {
      touchDragStarted = true;
      tileElement.classList.add('dragging');
      try { tileElement.setPointerCapture(touchPointerId); } catch {}
    }, 320);
  });
  tileElement.addEventListener('pointermove', event => {
    if (event.pointerId !== touchPointerId) return;
    if (!touchDragStarted) {
      if (Math.hypot(event.clientX - startX, event.clientY - startY) > 10) window.clearTimeout(pressTimer);
      return;
    }
    event.preventDefault();
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('.image-tile');
    $('#image-list')?.querySelectorAll('.image-tile').forEach(tile => tile.classList.toggle('drop-target', tile === target && tile !== tileElement));
  }, { passive: false });
  const finishTouchDrag = (event, canceled = false) => {
    if (event.pointerId !== touchPointerId) return;
    window.clearTimeout(pressTimer);
    const target = touchDragStarted && !canceled
      ? document.elementFromPoint(event.clientX, event.clientY)?.closest('.image-tile')
      : null;
    const targetId = target?.dataset.imageId;
    const shouldReorder = Boolean(targetId && targetId !== imageId);
    if (touchDragStarted) suppressImageClickUntil = Date.now() + 500;
    tileElement.classList.remove('dragging');
    $('#image-list')?.querySelectorAll('.image-tile').forEach(tile => tile.classList.remove('drop-target'));
    try { if (tileElement.hasPointerCapture(touchPointerId)) tileElement.releasePointerCapture(touchPointerId); } catch {}
    touchPointerId = null;
    touchDragStarted = false;
    if (shouldReorder) onReorder(imageId, targetId);
  };
  tileElement.addEventListener('pointerup', finishTouchDrag);
  tileElement.addEventListener('pointercancel', event => finishTouchDrag(event, true));
}

export async function renderDraftImages() {
  const container = $('#image-list');
  if (!container) return;
  container.replaceChildren();

  for (const imageId of activeDraftImageIds) {
    const blobData = await getImage(imageId);
    if (!blobData || !activeDraftImageIds.includes(imageId)) continue;
    const tileElement = document.createElement('div');
    tileElement.className = 'image-tile';
    tileElement.title = uiText('按住可拖拽调整顺序，点击可查看大图');

    const imageElement = document.createElement('img');
    const objectUrl = URL.createObjectURL(blobData);
    imageElement.src = objectUrl;
    imageElement.alt = uiText('素材图片');
    imageElement.dataset.imageId = imageId;
    imageElement.dataset.itemId = activeEditingItemId;

    tileElement.addEventListener('click', event => {
      if (event.target !== removeBtn && !tileElement.classList.contains('dragging') && Date.now() >= suppressImageClickUntil) {
        openImagePreview(imageId);
      }
    });

    setupImageTileDnD(tileElement, imageId, (sourceId, targetId) => {
      const fromIdx = activeDraftImageIds.indexOf(sourceId);
      const toIdx = activeDraftImageIds.indexOf(targetId);
      if (fromIdx >= 0 && toIdx >= 0) {
        activeDraftImageIds.splice(fromIdx, 1);
        activeDraftImageIds.splice(toIdx, 0, sourceId);
        const item = state.items.find(e => e.id === activeEditingItemId);
        if (item) { item.images = [...activeDraftImageIds]; markEdited(item); persist(); }
        renderDraftImages();
        syncDraft();
        toast(uiText('✓ 已调整图片位置'));
      }
    });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.textContent = '×';
    removeBtn.dataset.imageId = imageId;
    removeBtn.setAttribute('aria-label', uiText('移除图片'));
    removeBtn.addEventListener('click', event => {
      event.stopPropagation();
      activeDraftImageIds = activeDraftImageIds.filter(id => id !== imageId);
      const currentItem = state.items.find(entry => entry.id === activeEditingItemId);
      if (currentItem) {
        currentItem.images = [...activeDraftImageIds];
        markEdited(currentItem);
        persist();
      }
      renderDraftImages();
      syncDraft();
      toast(uiText('图片已移除'));
    });

    tileElement.append(imageElement, removeBtn);
    container.append(tileElement);
  }
}

export async function filesToImages(fileList, targetItem) {
  const imageFiles = [...fileList].filter(f => f.type.startsWith('image/'));
  if (!imageFiles.length) return toast(uiText('请选择图片文件'));
  try {
    const savedIds = await Promise.all(imageFiles.map(f => storeImage(f)));
    if (targetItem) {
      targetItem.images.push(...savedIds);
      markEdited(targetItem);
      persist();
      renderAll();
    } else {
      activeDraftImageIds.push(...savedIds);
      renderDraftImages();
      syncDraft();
    }
    toast(`${uiText('✓ 已添加')} ${savedIds.length} ${uiText('张图片')}`);
  } catch {
    toast(uiText('图片保存失败，请重试'));
  }
}

export function syncDraft() {
  const editorModal = $('#editor');
  if (!editorModal || editorModal.hidden) return;
  const itemId = $('#item-id')?.value;
  const targetItem = state.items.find(entry => entry.id === itemId);
  if (!targetItem) return;

  const currentTitle = richTextValue($('#title-input')).trim();
  const type = $('#item-type-input')?.value || targetItem.type || 'script';
  const currentTrans = [richTextValue($('#language-input-0')), richTextValue($('#language-input-1'))];
  if (type === 'document') $('#document-character-count-value').textContent = countDocumentCharacters(currentTrans[0]);
  const tagList = ($('#tags-input')?.value || '').split(',').map(t => t.trim()).filter(Boolean);
  const taskLines = ($('#task-list-input')?.value || '').split(/\r?\n/).map(text => text.trim()).filter(Boolean);

  if (!targetItem.title && !currentTitle && !currentTrans.some(t => t.trim()) && !taskLines.length && !tagList.length && !activeDraftImageIds.length) {
    return;
  }

  markEdited(targetItem);
  targetItem.title = currentTitle || targetItem.title;
  targetItem.type = type;
  targetItem.category = $('#category-input')?.value || targetItem.category;
  if (type === 'checklist') {
    const previousTasks = targetItem.tasks || [];
    targetItem.tasks = taskLines.map((text, index) => ({ id: previousTasks[index]?.id || crypto.randomUUID(), text, done: previousTasks[index]?.text === text && previousTasks[index].done }));
    targetItem.translations = ['', ''];
    targetItem.hasSecondLanguage = false;
  } else {
    targetItem.tasks = [];
    targetItem.translations = currentTrans;
    targetItem.hasSecondLanguage = type === 'script' && (!$('#second-language-field')?.hidden || Boolean(currentTrans[1].trim()));
    if (type === 'document') targetItem.translations[1] = '';
  }
  targetItem.tags = tagList;
  targetItem.images = [...activeDraftImageIds];
  state.lastCategory = targetItem.category;

  updateDraftTranslationControls();
  const statusEl = $('#save-status');
  if (statusEl) statusEl.textContent = uiText('保存中…');
  clearTimeout(draftAutoSaveTimerId);
  draftAutoSaveTimerId = setTimeout(() => {
    if (statusEl) statusEl.textContent = uiText(persist() ? '已自动保存' : '保存失败，请先导出备份');
  }, 250);
}

export function openEditor(existingItem, insertAfterId = '') {
  if (!existingItem && !state.categories.length) return toast(uiText('请先创建分类'));
  const editorModal = $('#editor');
  if (!editorModal.hidden) closeEditor();
  const isNewItem = !existingItem;
  editorInline = true;
  pendingInsertAfterItemId = existingItem ? '' : insertAfterId;
  $('#bulk-editor').hidden = true;
  $('#content-form').reset();

  const insertCategory = state.items.find(e => e.id === pendingInsertAfterItemId)?.category;
  const resolvedCategory = existingItem ? existingItem.category : insertAfterId ? (insertCategory ?? '') : (state.view === 'category' ? state.category : state.lastCategory || state.categories[0] || '');

  let currentItem = existingItem;
  if (!currentItem) {
    currentItem = {
      id: crypto.randomUUID(), title: '', category: resolvedCategory,
      type: 'script', translations: ['', ''], hasSecondLanguage: false, tasks: [], tags: [],
      images: [], icon: '', favorite: false, copied: 0, recent: 0, updatedAt: Date.now()
    };
    const anchorIdx = state.items.findIndex(e => e.id === pendingInsertAfterItemId);
    if (anchorIdx < 0) state.items.push(currentItem);
    else state.items.splice(anchorIdx + 1, 0, currentItem);
    pendingInsertAfterItemId = '';
  }

  activeEditingItemId = currentItem.id;
  state.expanded = [...new Set([...state.expanded, currentItem.id])];
  $('#item-id').value = currentItem.id;
  $('#item-type-input').value = currentItem.type || 'script';
  $('#item-type-input').disabled = !isNewItem;
  $('#second-language-field').dataset.enabled = String(Boolean(currentItem.hasSecondLanguage));
  $('#task-list-input').value = (currentItem.tasks || []).map(task => task.text).join('\n');
  $('#title-input').innerHTML = highlight(currentItem.title || '', '');
  const categorySelect = $('#category-input');
  categorySelect.replaceChildren(...state.categories.map(category => new Option(category, category)));
  categorySelect.value = currentItem.category;
  $('#language-input-0').innerHTML = highlight(currentItem.translations[0] || '', '');
  $('#language-input-1').innerHTML = highlight(currentItem.translations[1] || '', '');
  showSecondLanguage(Boolean(currentItem.hasSecondLanguage));
  updateEditorType(currentItem.type || 'script');
  $('#tags-input').value = (currentItem.tags || []).join(', ');
  originalItemImageIds = [...(currentItem.images || [])];
  activeDraftImageIds = [...originalItemImageIds];
  renderDraftImages();
  $('#save-status').textContent = uiText(isNewItem ? (currentItem.type === 'checklist' ? '输入即自动保存 · 每行一项，勾选可标记完成' : '输入即自动保存') : '编辑内容会自动保存');
  editorModal.hidden = false;
  renderAll();
  positionEditor();
  updateDraftTranslationControls();
  editorModal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#title-input').focus({ preventScroll: true });
}

export function closeEditor() {
  const itemId = $('#item-id')?.value;
  const currentItem = state.items.find(entry => entry.id === itemId);
  if (currentItem) {
    syncDraft();
    clearTimeout(draftAutoSaveTimerId);
    const hasContent = Boolean((currentItem.title || '').trim() || currentItem.translations.some(t => String(t || '').trim()) || currentItem.tasks?.length || currentItem.tags.length || currentItem.images.length);
    if (hasContent) currentItem.title ||= uiText('未命名素材');
    else state.items = state.items.filter(entry => entry.id !== itemId);
    persist();
  }
  activeDraftImageIds = [];
  originalItemImageIds = [];
  const editorModal = $('#editor');
  ensureEditorHome(editorModal);
  editorInline = false;
  editorHome.after(editorModal);
  editorModal.hidden = true;
  activeEditingItemId = '';
  pendingInsertAfterItemId = '';
  $('#content-form').reset();
  renderAll();
}

export function applyQuickPaste(clipboardRawValue) {
  const textLines = clipboardRawValue.split(/\r?\n/);
  const firstNonEmptyIndex = textLines.findIndex(line => line.trim());
  if (firstNonEmptyIndex < 0) return;
  $('#title-input').innerHTML = highlight(textLines[firstNonEmptyIndex].trim(), '');
  const remainingLines = textLines.slice(firstNonEmptyIndex + 1);
  const splitIndex = remainingLines.findIndex(line => line.trim() === '---');

  if (splitIndex >= 0) {
    $('#language-input-0').innerHTML = highlight(remainingLines.slice(0, splitIndex).join('\n').trim(), '');
    $('#language-input-1').innerHTML = highlight(remainingLines.slice(splitIndex + 1).join('\n').trim(), '');
    showSecondLanguage(true);
  } else {
    $('#language-input-0').innerHTML = highlight(remainingLines.join('\n').trim(), '');
    $('#language-input-1').textContent = '';
    showSecondLanguage(false);
  }
  syncDraft();
}

export function setupEditorEventListeners() {
  $('#content-form')?.addEventListener('submit', event => event.preventDefault());
  $('#content-form')?.addEventListener('input', () => syncDraft());
  $('#item-type-input')?.addEventListener('change', event => { updateEditorType(event.target.value); syncDraft(); });
  $('#finish-content')?.addEventListener('click', closeEditor);

  const editorModal = $('#editor');
  if (editorModal) {
    editorModal.addEventListener('dragover', event => {
      event.preventDefault();
      editorModal.classList.add('dragging');
    });
    editorModal.addEventListener('dragleave', event => {
      if (!editorModal.contains(event.relatedTarget)) editorModal.classList.remove('dragging');
    });
    editorModal.addEventListener('paste', event => {
      const files = [...(event.clipboardData?.items || [])].filter(it => it.type.startsWith('image/')).map(it => it.getAsFile()).filter(Boolean);
      if (files.length) {
        event.preventDefault();
        filesToImages(files, null);
      }
    });
  }
}
