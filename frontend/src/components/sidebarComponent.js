// Sidebar component for quick access views, category tree, and folder badges
import { $, uiText } from '../utils/dom.js';
import { esc, categoryPath } from '../utils/text.js';
import { store } from '../state/store.js';

// Render sidebar category tree with badges and hierarchy
export function renderSidebarCategories(onSelectCategory) {
  const { categories, categoryParents, collapsedCategories, categoryIcons, items } = store.state;
  const t = key => esc(uiText(key));
  const counts = Object.fromEntries(categories.map(name => [name, 0]));

  // Tally counts across category hierarchy
  items.forEach(item => {
    let name = item.category;
    while (name && counts[name] !== undefined) {
      counts[name]++;
      name = categoryParents[name];
    }
  });

  const childrenOf = parent => categories.filter(name => (categoryParents[name] || '') === parent);

  const renderBranch = (parent = '', depth = 0) => childrenOf(parent).map(name => {
    const children = childrenOf(name);
    const collapsed = collapsedCategories.includes(name);
    const selected = store.category === name && store.view === 'category';
    const disclosure = children.length
      ? `<button class="category-icon-toggle ${collapsed ? 'collapsed' : ''}" data-toggle-category="${esc(name)}" aria-label="${t(collapsed ? '展开' : '收起')}" aria-expanded="${!collapsed}"></button>`
      : '';

    const customIcon = categoryIcons[name];
    const firstChar = name.trim().charAt(0).toUpperCase() || '▱';
    const folderIcon = customIcon
      ? `<span class="folder" data-set-category-icon="${esc(name)}" title="${t('更改分类图标')}">${esc(customIcon)}</span>`
      : `<span class="folder folder-badge" data-set-category-icon="${esc(name)}" title="${esc(name)} (${t('点击更改图标')})">${esc(firstChar)}</span>`;

    const fullPath = categoryPath(name, categories, categoryParents);
    const row = `<div class="category-row ${children.length ? 'has-children' : ''} ${selected ? 'selected' : ''}" data-category-row="${esc(name)}" style="margin-left:${depth * 20}px">` +
      `<button class="category-button ${selected ? 'selected' : ''}" data-category="${esc(name)}" title="${esc(fullPath)}" aria-label="${esc(fullPath)}">` +
      `${folderIcon}<span class="category-name" title="${t('拖动调整同级顺序')}">${esc(name)}</span><span class="category-count">${counts[name]}</span></button>` +
      `${disclosure}<div class="category-tools">` +
      `<button class="category-child" data-create-child="${esc(name)}" title="${t('新建子分类')}" aria-label="${t('新建子分类')}">＋</button>` +
      `<details class="category-more-wrap"><summary class="category-more" title="${t('更多操作')}" aria-label="${t('更多操作')}">···</summary>` +
      `<div class="category-menu">` +
      `<button type="button" data-category-menu="rename" data-category-name="${esc(name)}">${t('重命名')}</button>` +
      `<button type="button" data-category-menu="icon" data-category-name="${esc(name)}">${t('更改图标')}</button>` +
      `<button type="button" data-category-menu="move" data-category-name="${esc(name)}">${t('移动到…')}</button>` +
      `<button type="button" data-category-menu="remove" data-category-name="${esc(name)}">${t('删除分类')}</button>` +
      `<button type="button" data-category-menu="delete" data-category-name="${esc(name)}">${t('删除并合并…')}</button>` +
      `</div></details></div></div>`;

    return row + (collapsed ? '' : renderBranch(name, depth + 1));
  }).join('');

  const container = $('#categories');
  if (container) {
    container.innerHTML = renderBranch();
    container.querySelectorAll('.category-more-wrap').forEach(menu => {
      menu.addEventListener('toggle', () => {
        menu.closest('.category-row')?.classList.toggle('menu-open', menu.open);
      });
    });
  }

  // Update total counts
  const allCountEl = $('#all-count');
  if (allCountEl) allCountEl.textContent = items.length;

  // Highlight active quick access nav item
  document.querySelectorAll('.quick-access .nav-item').forEach(button => {
    const viewName = button.dataset.view;
    const isSelected = store.view === viewName;
    button.classList.toggle('active', isSelected);
  });
}

// Toggle collapsed status of a category node
export function toggleCategoryCollapse(categoryName) {
  const { collapsedCategories } = store.state;
  const index = collapsedCategories.indexOf(categoryName);
  if (index >= 0) {
    collapsedCategories.splice(index, 1);
  } else {
    collapsedCategories.push(categoryName);
  }
  store.persist();
}
