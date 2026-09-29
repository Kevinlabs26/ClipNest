// Theme, color-scheme, and sidebar responsive management
import { $, uiText } from '../utils/dom.js';
import { state, persist } from './store.js';

// Apply color scheme tokens and update toggle indicators
export function updateColorScheme(preferredScheme = state.preferences?.colorScheme || 'auto') {
  const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveDark = preferredScheme === 'dark' || (preferredScheme === 'auto' && isSystemDark);
  document.body.dataset.colorScheme = effectiveDark ? 'dark' : 'light';

  const toggleBtn = $('#theme-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = effectiveDark ? '☀️' : '🌙';
    const label = preferredScheme === 'auto'
      ? (effectiveDark ? '跟随系统 (深色)' : '跟随系统 (浅色)')
      : (effectiveDark ? '深色模式' : '浅色模式');
    toggleBtn.title = `切换外观模式 (当前: ${label})`;
    toggleBtn.setAttribute('aria-label', toggleBtn.title);
  }

  document.querySelectorAll('[data-color-scheme-option]').forEach(button => {
    const selected = button.dataset.colorSchemeOption === preferredScheme;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

// Apply accent theme palette
export function updateTheme(theme = 'green') {
  document.body.dataset.theme = theme;
  document.querySelectorAll('[data-theme-option]').forEach(button => {
    const selected = button.dataset.themeOption === theme;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

// Update card layout density
export function updateDensity(density = 'comfortable') {
  document.body.dataset.density = density;
  document.querySelectorAll('[data-density]').forEach(button => {
    const selected = button.dataset.density === density;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}

export function updateContentTextSize(size = 100) {
  const normalized = Math.min(160, Math.max(80, Math.round(Number(size) / 10) * 10 || 100));
  document.body.style.setProperty('--content-text-scale', String(normalized / 100));
  const value = $('#text-size-value');
  const smaller = $('#text-size-smaller');
  const larger = $('#text-size-larger');
  if (value) value.textContent = `${normalized}%`;
  if (smaller) smaller.disabled = normalized <= 80;
  if (larger) larger.disabled = normalized >= 160;
}

// Sync sidebar collapse state and update toggle button ARIA tags
export function updateSidebarState(collapsed) {
  const isCollapsed = collapsed !== undefined ? collapsed : Boolean(state.preferences?.sidebarCollapsed);
  document.body.dataset.sidebarCollapsed = String(isCollapsed);
  const toggleBtn = $('#sidebar-toggle');
  if (toggleBtn) {
    toggleBtn.title = uiText(isCollapsed ? '展开侧边栏' : '收起侧边栏');
    toggleBtn.setAttribute('aria-label', toggleBtn.title);
    toggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
  }
}

export function setSidebarCollapsed(collapsed) {
  const current = document.body.dataset.sidebarCollapsed === 'true';
  const targetState = collapsed !== undefined ? collapsed : !current;
  if (!state.preferences) state.preferences = {};
  state.preferences.sidebarCollapsed = targetState;
  persist();
  updateSidebarState(targetState);
}

// Initialize system media query listeners
export function initThemeListeners(onSystemThemeChange) {
  if (window.matchMedia) {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', () => {
      onSystemThemeChange();
    });
  }
}
