// DOM manipulation utilities and toast notifications

// Query single element helper
export function $(selector, scope = document) {
  return scope.querySelector(selector);
}

// Query all elements helper
export function $$(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

// Localized UI text dictionary for system UI
export const UI_TEXTS = {
  'zh-CN': {
    '展开侧边栏': '展开侧边栏',
    '收起侧边栏': '收起侧边栏',
    '按步骤浏览': '按步骤浏览',
    '← 上一步': '← 上一步',
    '下一步 →': '下一步 →',
    '完成流程': '完成流程',
    '填写话术内容': '填写话术内容',
    '填写场景变量': '填写场景变量',
    '请填写每个变量后再复制；原素材不会改变。': '请填写每个变量后再复制；原素材不会改变。',
    '开始场景前填写一次，后续步骤会自动复用。': '开始场景前填写一次，后续步骤会自动复用。',
    '开始浏览': '开始浏览',
    '复制内容': '复制内容',
    '重命名分类': '重命名分类',
    '分类名称': '分类名称',
    '确认操作': '确认操作',
    '确定': '确定',
    '知道了': '知道了'
  },
  'en': {
    '展开侧边栏': 'Expand sidebar',
    '收起侧边栏': 'Collapse sidebar',
    '按步骤浏览': 'Browse steps',
    '← 上一步': '← Previous',
    '下一步 →': 'Next →',
    '完成流程': 'Finish',
    '填写话术内容': 'Fill in the text',
    '填写场景变量': 'Fill in scenario details',
    '请填写每个变量后再复制；原素材不会改变。': 'Fill in each variable before copying. The saved text stays unchanged.',
    '开始场景前填写一次，后续步骤会自动复用。': 'Fill these in once. Later steps will reuse them.',
    '开始浏览': 'Start browsing',
    '复制内容': 'Copy text',
    '重命名分类': 'Rename category',
    '分类名称': 'Category name',
    '确认操作': 'Confirm action',
    '确定': 'Confirm',
    '知道了': 'OK'
  },
  'fr': {
    '展开侧边栏': 'Ouvrir la barre latérale',
    '收起侧边栏': 'Réduire la barre latérale',
    '按步骤浏览': 'Parcourir les étapes',
    '← 上一步': '← Précédent',
    '下一步 →': 'Suivant →',
    '完成流程': 'Terminer',
    '填写话术内容': 'Renseigner le texte',
    '填写场景变量': 'Renseigner le scénario',
    '请填写每个变量后再复制；原素材不会改变。': 'Renseignez chaque variable avant de copier. Le texte enregistré reste inchangé.',
    '开始场景前填写一次，后续步骤会自动复用。': 'Renseignez ces valeurs une fois ; les étapes suivantes les réutiliseront.',
    '开始浏览': 'Commencer',
    '复制内容': 'Copier le texte',
    '重命名分类': 'Renommer la catégorie',
    '分类名称': 'Nom de la catégorie',
    '确认操作': 'Confirmer',
    '确定': 'Confirmer',
    '知道了': 'OK'
  }
};

let currentUiLanguage = 'zh-CN';

// Set current UI language for translations
export function setUiLanguage(lang) {
  currentUiLanguage = ['zh-CN', 'en', 'fr'].includes(lang) ? lang : 'zh-CN';
}

// Translate system UI text by key
export function uiText(text) {
  return UI_TEXTS[currentUiLanguage]?.[text] || text;
}

// Format error object into user-friendly message
export function errorMessage(error, fallback = '操作失败') {
  if (!error) return fallback;
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  return fallback;
}

let toastTimer = null;

// Display a transient toast notification
export function toast(message, actionLabel = '', onAction = null) {
  const toastEl = $('#toast');
  const messageEl = $('#toast-message');
  const actionBtn = $('#toast-action');
  if (!toastEl || !messageEl) return;

  if (toastTimer) clearTimeout(toastTimer);

  messageEl.textContent = message;
  if (actionLabel && onAction && actionBtn) {
    actionBtn.hidden = false;
    actionBtn.textContent = actionLabel;
    actionBtn.onclick = () => {
      onAction();
      toastEl.classList.remove('visible');
    };
  } else if (actionBtn) {
    actionBtn.hidden = true;
    actionBtn.onclick = null;
  }

  toastEl.classList.add('visible');
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('visible');
  }, 3200);
}
