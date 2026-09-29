// Central application store and state dispatcher
import { loadLibraryState, saveLibraryState } from '../services/storageService.js';
import { toast } from '../utils/dom.js';
import { categoryPath } from '../utils/text.js';

class Store {
  constructor() {
    this.state = loadLibraryState();
    this.view = 'all';
    this.category = '';
    this.language = this.state.languageMode;
    this.filter = 'all';
    this.tagFilter = '';
    this.sortMode = 'manual';
    this.searchQuery = '';
    this.includeDescendants = false;
    this.scenarioFlow = null;
    this.selectionModeActive = false;
    this.selectedItemIds = new Set();
    this.settingsOpen = false;
    this.settingsSection = 'general';
    this.listeners = new Set();
  }

  // Subscribe to state change notifications
  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all subscribed components
  notify() {
    this.listeners.forEach(listener => {
      try { listener(this); } catch (err) { console.error(err); }
    });
  }

  // Persist current state to disk
  persist() {
    this.state.languageMode = this.language;
    const success = saveLibraryState(this.state);
    if (!success) {
      toast('保存失败，请检查设备存储空间');
    }
    return success;
  }

  // Compute all visible items based on current view, category, filter, and search
  getVisibleItems() {
    const query = this.searchQuery.trim().toLowerCase();
    const categoriesWithDescendants = new Set();

    if (this.view === 'category' && this.category) {
      categoriesWithDescendants.add(this.category);
      if (this.includeDescendants) {
        let added = true;
        while (added) {
          added = false;
          for (const name of this.state.categories) {
            const parent = this.state.categoryParents[name];
            if (parent && categoriesWithDescendants.has(parent) && !categoriesWithDescendants.has(name)) {
              categoriesWithDescendants.add(name);
              added = true;
            }
          }
        }
      }
    }

    let items = this.state.items.filter(item => {
      // View boundary
      if (this.view === 'favorites' && !item.favorite) return false;
      if (this.view === 'recent' && (!item.recent || item.recent <= 0)) return false;
      if (this.view === 'category' && !categoriesWithDescendants.has(item.category)) return false;

      // Filter tabs
      if (this.filter === 'favorites' && !item.favorite) return false;
      if (this.filter === 'missing-second' && ((item.type || 'script') !== 'script' || item.hasSecondLanguage)) return false;

      // Tag filter
      if (this.tagFilter && !(item.tags || []).includes(this.tagFilter)) return false;

      // Search keyword filter
      if (query) {
        const titleMatch = (item.title || '').toLowerCase().includes(query);
        const categoryMatch = categoryPath(item.category, this.state.categories, this.state.categoryParents).toLowerCase().includes(query);
        const trans0Match = (item.translations?.[0] || '').toLowerCase().includes(query);
        const trans1Match = (item.translations?.[1] || '').toLowerCase().includes(query);
        const taskMatch = (item.tasks || []).some(task => task.text.toLowerCase().includes(query));
        const tagMatch = (item.tags || []).some(t => t.toLowerCase().includes(query));
        if (!titleMatch && !categoryMatch && !trans0Match && !trans1Match && !taskMatch && !tagMatch) return false;
      }

      return true;
    });

    // Apply sorting
    if (this.view === 'recent' && this.sortMode === 'manual') {
      items.sort((a, b) => (b.recent || 0) - (a.recent || 0));
    } else if (this.sortMode === 'updated') {
      items.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    } else if (this.sortMode === 'title') {
      items.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'zh-CN'));
    } else if (this.sortMode === 'popular') {
      items.sort((a, b) => (b.copied || 0) - (a.copied || 0));
    }

    return items;
  }
}

export const store = new Store();
export const state = store.state;
export function persist() { return store.persist(); }
export function markEdited(item) { item.updatedAt = Date.now(); }
export function renderAll() { store.notify(); }
