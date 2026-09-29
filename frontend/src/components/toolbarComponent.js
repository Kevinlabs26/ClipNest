// Toolbar component: multi-select operations, expand-all toggle, and bulk batch actions
import { $, $$, toast, uiText } from '../utils/dom.js';
import { esc, categoryPath } from '../utils/text.js';
import { store, state, persist, markEdited, renderAll } from '../state/store.js';
import { askConfirm } from './confirmComponent.js';

export function toggleSelectionMode() {
  store.selectionModeActive = !store.selectionModeActive;
  if (!store.selectionModeActive) {
    store.selectedItemIds.clear();
  }
  renderAll();
}

export function toggleExpandAll() {
  const visibleCards = $$('.content-card');
  const cardIds = visibleCards.map(card => card.dataset.id).filter(Boolean);
  const isAllExpanded = cardIds.length > 0 && cardIds.every(id => state.expanded.includes(id));

  state.expanded = isAllExpanded
    ? state.expanded.filter(id => !cardIds.includes(id))
    : [...new Set([...state.expanded, ...cardIds])];

  persist();
  renderAll();
}

export function toggleItemSelection(itemId) {
  if (store.selectedItemIds.has(itemId)) {
    store.selectedItemIds.delete(itemId);
  } else {
    store.selectedItemIds.add(itemId);
  }
  renderAll();
}

export function toggleSelectAllVisible(visibleItemIds) {
  const isAllSelected = visibleItemIds.length > 0 && visibleItemIds.every(id => store.selectedItemIds.has(id));
  visibleItemIds.forEach(id => {
    if (isAllSelected) store.selectedItemIds.delete(id);
    else store.selectedItemIds.add(id);
  });
  renderAll();
}

export function bulkFavoriteSelected() {
  const chosenItems = state.items.filter(item => store.selectedItemIds.has(item.id));
  if (!chosenItems.length) return;
  const shouldFavorite = !chosenItems.every(item => item.favorite);
  chosenItems.forEach(item => {
    item.favorite = shouldFavorite;
    markEdited(item);
  });
  persist();
  renderAll();
  toast(uiText(shouldFavorite ? '✓ 已批量收藏' : '✓ 已取消收藏'));
}

export async function bulkDeleteSelected() {
  const selectedIds = [...store.selectedItemIds];
  if (!selectedIds.length) return;
  const count = selectedIds.length;
  const confirmed = await askConfirm(uiText('确认批量删除所选的 {count} 条素材？此操作不可撤销。').replace('{count}', count), uiText('批量删除素材'), uiText('确认删除'), true);
  if (confirmed) {
    state.items = state.items.filter(item => !store.selectedItemIds.has(item.id));
    store.selectedItemIds.clear();
    store.selectionModeActive = false;
    persist();
    renderAll();
    toast(`${uiText('✓ 已批量删除')} ${count} ${uiText('条素材')}`);
  }
}

export function bulkMoveSelected(destinationCategory) {
  if (!destinationCategory || !state.categories.includes(destinationCategory)) return;
  const chosenItems = state.items.filter(item => store.selectedItemIds.has(item.id));
  chosenItems.forEach(item => {
    item.category = destinationCategory;
    markEdited(item);
  });
  state.lastCategory = destinationCategory;
  persist();
  renderAll();
  toast(uiText('✓ 已移动 {count} 条素材至“{name}”').replace('{count}', chosenItems.length).replace('{name}', destinationCategory));
}

export function renderToolbar(visibleItems = []) {
  const selectionToolbarEl = $('#selection-toolbar');
  const selectionModeBtn = $('#selection-mode');
  const expandAllBtn = $('#expand-all');

  if (selectionToolbarEl) {
    selectionToolbarEl.hidden = !store.selectionModeActive;
  }
  if (selectionModeBtn) {
    selectionModeBtn.textContent = uiText(store.selectionModeActive ? '退出多选' : '多选');
    selectionModeBtn.classList.toggle('selected', store.selectionModeActive);
  }

  const visibleIds = visibleItems.map(i => i.id);
  const isAllExpanded = visibleIds.length > 0 && visibleIds.every(id => state.expanded.includes(id));
  if (expandAllBtn) {
    expandAllBtn.innerHTML = `${uiText(isAllExpanded ? '全部收起' : '全部展开')} <span class="expand-chevron ${isAllExpanded ? 'up' : ''}" aria-hidden="true"></span>`;
  }

  if (!store.selectionModeActive) return;

  const countEl = $('#selection-count');
  if (countEl) countEl.textContent = `${uiText('已选')} ${store.selectedItemIds.size} ${uiText('项')}`;

  const selectVisibleBtn = $('#select-visible');
  if (selectVisibleBtn) {
    const isAllVisibleSelected = visibleIds.length > 0 && visibleIds.every(id => store.selectedItemIds.has(id));
    selectVisibleBtn.textContent = uiText(isAllVisibleSelected ? '取消全选' : '全选当前');
  }

  const categorySelectEl = $('#bulk-item-category');
  if (categorySelectEl) {
    categorySelectEl.innerHTML = `<option value="">${uiText('移动到分类…')}</option>` +
      state.categories.map(name => `<option value="${esc(name)}">${esc(categoryPath(name))}</option>`).join('');
  }

  const bulkFavBtn = $('#bulk-favorite');
  if (bulkFavBtn) {
    const chosen = state.items.filter(item => store.selectedItemIds.has(item.id));
    bulkFavBtn.textContent = uiText(chosen.length && chosen.every(item => item.favorite) ? '取消收藏所选' : '收藏所选');
  }

  selectionToolbarEl?.querySelectorAll('button:not(#select-visible):not(#selection-done)').forEach(btn => {
    btn.disabled = store.selectedItemIds.size === 0;
  });
}

export function setupToolbarEventListeners() {
  $('#selection-done')?.addEventListener('click', toggleSelectionMode);
  $('#select-visible')?.addEventListener('click', () => {
    toggleSelectAllVisible(store.getVisibleItems().map(i => i.id));
  });
  $('#bulk-favorite')?.addEventListener('click', bulkFavoriteSelected);
  $('#bulk-delete')?.addEventListener('click', bulkDeleteSelected);
  $('#bulk-item-category')?.addEventListener('change', event => {
    bulkMoveSelected(event.target.value);
    event.target.value = '';
  });
}
