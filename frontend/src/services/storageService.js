// Persistent storage service (LocalStorage + IndexedDB for blobs and version history)
export const KEY = 'clipnest.library.v1';
export const IMAGE_DB = 'clipnest.assets.v1';
export const DEFAULT_LANGUAGES = ['语言 1', '语言 2'];

export const AI_PROVIDERS = {
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-5-mini' },
  deepseek: { baseUrl: 'https://api.deepseek.com', model: 'deepseek-v4-flash' },
  gemini: { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/', model: 'gemini-3.8-flash' },
  qwen: { baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus' },
  groq: { baseUrl: 'https://api.groq.com/openai/v1', model: 'openai/gpt-oss-20b' },
  custom: { baseUrl: '', model: '' }
};

const DEMO_IDS = new Set(['welcome', 'meeting', 'hello', 'followup']);
const DEMO_CATEGORIES = new Set(['互动线索', '聚会资料', '新人跟进']);

// Normalize raw state data to prevent null dereferences
export function normalize(data) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const realItems = items.filter(item => !DEMO_IDS.has(item.id));
  const categories = Array.isArray(data?.categories)
    ? data.categories.filter(name => !DEMO_CATEGORIES.has(name))
    : [];

  for (const item of realItems) {
    if (item.category && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  }

  const categoryParents = Object.fromEntries(
    categories
      .filter(name => categories.includes(data?.categoryParents?.[name]) && data.categoryParents[name] !== name)
      .map(name => [name, data.categoryParents[name]])
  );

  for (const name of categories) {
    const path = new Set([name]);
    let parent = categoryParents[name];
    while (parent && !path.has(parent)) {
      path.add(parent);
      parent = categoryParents[parent];
    }
    if (parent) delete categoryParents[name];
  }

  return {
    categories,
    categoryParents,
    collapsedCategories: Array.isArray(data?.collapsedCategories)
      ? data.collapsedCategories.filter(name => categories.includes(name))
      : [],
    categoryIcons: Object.fromEntries(
      categories.filter(name => data?.categoryIcons?.[name]).map(name => [name, String(data.categoryIcons[name])])
    ),
    languages: Array.isArray(data?.languages) && data.languages.length === 2
      ? data.languages
      : DEFAULT_LANGUAGES,
    items: realItems.map(item => ({
      ...item,
      type: ['script', 'document', 'checklist'].includes(item.type) ? item.type : 'script',
      translations: Array.isArray(item.translations) ? item.translations : [item.zh || '', item.fr || ''],
      hasSecondLanguage: item.type === 'document' || item.type === 'checklist' ? false : Boolean(item.hasSecondLanguage || (item.translations?.[1] || item.fr || '').trim()),
      tasks: Array.isArray(item.tasks) ? item.tasks.filter(task => task && typeof task.text === 'string').map(task => ({
        id: typeof task.id === 'string' ? task.id : crypto.randomUUID(), text: task.text, done: Boolean(task.done)
      })) : [],
      images: Array.isArray(item.images) ? item.images : [],
      tags: Array.isArray(item.tags) ? item.tags : [],
      favorite: Boolean(item.favorite),
      copied: item.copied || 0,
      recent: item.recent || 0,
      updatedAt: Number(item.updatedAt) || 0
    })),
    expanded: [],
    languageMode: ['both', '0', '1'].includes(data?.languageMode) ? data.languageMode : 'both',
    preferences: {
      density: ['compact', 'comfortable'].includes(data?.preferences?.density) ? data.preferences.density : 'comfortable',
      contentTextSize: [80, 90, 100, 110, 120, 130, 140, 150, 160].includes(data?.preferences?.contentTextSize) ? data.preferences.contentTextSize : 100,
      colorScheme: ['auto', 'light', 'dark'].includes(data?.preferences?.colorScheme) ? data.preferences.colorScheme : 'auto',
      theme: ['green', 'blue', 'purple', 'terracotta'].includes(data?.preferences?.theme) ? data.preferences.theme : 'green',
      sidebarCollapsed: typeof data?.preferences?.sidebarCollapsed === 'boolean'
        ? data.preferences.sidebarCollapsed
        : typeof window !== 'undefined' ? window.innerWidth <= 700 : false,
      uiLanguage: ['zh-CN', 'en', 'fr'].includes(data?.preferences?.uiLanguage) ? data.preferences.uiLanguage : 'zh-CN',
      aiProvider: Object.keys(AI_PROVIDERS).includes(data?.preferences?.aiProvider) ? data.preferences.aiProvider : 'openai',
      aiBaseUrl: typeof data?.preferences?.aiBaseUrl === 'string' ? data.preferences.aiBaseUrl : AI_PROVIDERS.openai.baseUrl,
      aiModel: typeof data?.preferences?.aiModel === 'string' ? data.preferences.aiModel : AI_PROVIDERS.openai.model
    },
    lastCategory: typeof data?.lastCategory === 'string' ? data.lastCategory : ''
  };
}

let imageDatabasePromise = null;

// Initialize or get IndexedDB instance
export function openImageDatabase() {
  if (!imageDatabasePromise) {
    imageDatabasePromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(IMAGE_DB, 2);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains('images')) db.createObjectStore('images');
        if (!db.objectStoreNames.contains('versions')) db.createObjectStore('versions', { keyPath: 'id' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
  return imageDatabasePromise;
}

// Store image blob into IndexedDB
export async function storeImage(file, id = crypto.randomUUID()) {
  const db = await openImageDatabase();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readwrite');
    transaction.objectStore('images').put(file, id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  return id;
}

// Retrieve image blob from IndexedDB by ID
export async function getImage(id) {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('images').objectStore('images').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Remove image blob from IndexedDB by ID
export async function removeImage(id) {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readwrite');
    transaction.objectStore('images').delete(id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}

// Read whole state from LocalStorage
export function loadLibraryState() {
  try {
    const raw = localStorage.getItem(KEY);
    return normalize(raw ? JSON.parse(raw) : {});
  } catch {
    return normalize({});
  }
}

// Save whole state to LocalStorage
export function saveLibraryState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}
