// Bulk import editor component for multi-item raw text parsing
import { $, toast } from '../utils/dom.js';
import { esc } from '../utils/text.js';
import { state, persist, renderAll } from '../state/store.js';

// Parse raw bulk content separated by === lines
export function parseBulkText(rawContent) {
  return rawContent.split(/^[ \t]*={3,}[ \t]*$/m).map(block => {
    const lines = block.split(/\r?\n/);
    const titleIndex = lines.findIndex(line => line.trim());
    if (titleIndex < 0) return null;
    const title = lines[titleIndex].trim();
    const content = lines.slice(titleIndex + 1);
    const separator = content.findIndex(line => line.trim() === '---');
    return {
      title,
      translations: separator < 0
        ? [content.join('\n').trim(), '']
        : [content.slice(0, separator).join('\n').trim(), content.slice(separator + 1).join('\n').trim()],
      hasSecondLanguage: separator >= 0
    };
  }).filter(Boolean);
}

// Render dynamic preview of parsed items in bulk editor
export function renderBulkPreview() {
  const parsedItems = parseBulkText($('#bulk-input')?.value || '');
  const countEl = $('#bulk-count');
  const previewListEl = $('#bulk-preview-list');
  const importBtn = $('#bulk-import');

  if (countEl) countEl.textContent = parsedItems.length ? `识别到 ${parsedItems.length} 条素材` : '粘贴内容后显示识别结果';
  if (previewListEl) {
    previewListEl.innerHTML = parsedItems.slice(0, 6).map(item => `<span class="bulk-preview-item">${esc(item.title)}${item.hasSecondLanguage ? ` · ${esc(state.languages[1])}` : ''}</span>`).join('') + (parsedItems.length > 6 ? `<span class="bulk-preview-item">还有 ${parsedItems.length - 6} 条…</span>` : '');
  }
  if (importBtn) importBtn.disabled = !parsedItems.length;
}

// Open bulk editor modal
export function openBulkEditor() {
  if (!state.categories.length) return toast('请先创建分类');
  const selectedCat = state.view === 'category' ? state.category : state.lastCategory;
  const bulkCategorySelect = $('#bulk-category');
  const bulkModal = $('#bulk-editor');

  if (bulkCategorySelect) {
    bulkCategorySelect.innerHTML = state.categories.map(name => `<option value="${esc(name)}">${esc(name)}</option>`).join('');
    bulkCategorySelect.value = state.categories.includes(selectedCat) ? selectedCat : state.categories[0];
  }
  if (bulkModal) {
    bulkModal.hidden = false;
    renderBulkPreview();
    bulkModal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  $('#bulk-input')?.focus({ preventScroll: true });
}

// Close bulk editor modal
export function closeBulkEditor() {
  const bulkModal = $('#bulk-editor');
  if (bulkModal) bulkModal.hidden = true;
}

// Commit bulk import into store
export function importBulk() {
  const entries = parseBulkText($('#bulk-input')?.value || '');
  const targetCategory = $('#bulk-category')?.value;
  if (!entries.length || !state.categories.includes(targetCategory)) return;

  const newItems = entries.map(entry => ({
    ...entry,
    id: crypto.randomUUID(),
    category: targetCategory,
    tags: [],
    images: [],
    icon: '',
    favorite: false,
    copied: 0,
    recent: 0,
    updatedAt: Date.now()
  }));

  state.items.push(...newItems);
  state.lastCategory = targetCategory;
  state.view = 'category';
  state.category = targetCategory;
  state.filter = 'all';
  persist();

  if ($('#bulk-input')) $('#bulk-input').value = '';
  closeBulkEditor();
  renderAll();
  toast(`✓ 已导入 ${newItems.length} 条素材`);
}

// Bind bulk editor events
export function setupBulkEditorEventListeners() {
  $('#bulk-input')?.addEventListener('input', () => renderBulkPreview());
  $('#bulk-editor')?.addEventListener('paste', () => setTimeout(renderBulkPreview, 0));
  $('#bulk-import')?.addEventListener('click', importBulk);
  $('#close-bulk')?.addEventListener('click', closeBulkEditor);
}
