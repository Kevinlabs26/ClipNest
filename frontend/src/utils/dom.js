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
    '设置': '设置', '管理显示偏好、语言、AI 翻译与本机数据。': '管理显示偏好、语言、AI 翻译与本机数据。', '← 返回素材库': '← 返回素材库',
    '常规': '常规', '语言': '语言', 'AI 翻译': 'AI 翻译', '数据与备份': '数据与备份', '快捷键与关于': '快捷键与关于',
    '调整界面语言、主题和素材卡片密度。': '调整界面语言、主题和素材卡片密度。', '界面语言': '界面语言',
    '只更改应用按钮与菜单，不改变素材内容语言。': '只更改应用按钮与菜单，不改变素材内容语言。', '外观模式': '外观模式',
    '选择浅色、深色，或跟随 Windows 操作系统外观偏好。': '选择浅色、深色，或跟随 Windows 操作系统外观偏好。',
    '跟随系统': '跟随系统', '浅色': '浅色', '深色': '深色', '素材卡片密度': '素材卡片密度',
    '控制素材卡片之间的留白，不影响文字内容。': '控制素材卡片之间的留白，不影响文字内容。', '舒适': '舒适', '紧凑': '紧凑',
    '主题颜色': '主题颜色', '更改界面的强调色，立即应用并保存在此设备。': '更改界面的强调色，立即应用并保存在此设备。',
    '森林绿': '森林绿', '海岸蓝': '海岸蓝', '薰衣草': '薰衣草', '暖陶色': '暖陶色',
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
    '设置': 'Settings', '管理显示偏好、语言、AI 翻译与本机数据。': 'Manage display, language, AI translation, and local data preferences.', '← 返回素材库': '← Back to library',
    '常规': 'General', '语言': 'Language', 'AI 翻译': 'AI translation', '数据与备份': 'Data and backups', '快捷键与关于': 'Shortcuts and about',
    '调整界面语言、主题和素材卡片密度。': 'Adjust the interface language, theme, and card spacing.', '界面语言': 'Interface language',
    '只更改应用按钮与菜单，不改变素材内容语言。': 'Changes app controls and menus, not your saved content.', '外观模式': 'Appearance',
    '选择浅色、深色，或跟随 Windows 操作系统外观偏好。': 'Choose light, dark, or follow your Windows appearance preference.',
    '跟随系统': 'System', '浅色': 'Light', '深色': 'Dark', '素材卡片密度': 'Card spacing',
    '控制素材卡片之间的留白，不影响文字内容。': 'Adjust the space between cards without changing their content.', '舒适': 'Comfortable', '紧凑': 'Compact',
    '主题颜色': 'Accent color', '更改界面的强调色，立即应用并保存在此设备。': 'Change the interface accent color. It is applied and saved on this device.',
    '森林绿': 'Forest green', '海岸蓝': 'Coastal blue', '薰衣草': 'Lavender', '暖陶色': 'Terracotta',
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
    '设置': 'Paramètres', '管理显示偏好、语言、AI 翻译与本机数据。': 'Gérez l’affichage, la langue, la traduction IA et les données locales.', '← 返回素材库': '← Retour à la bibliothèque',
    '常规': 'Général', '语言': 'Langue', 'AI 翻译': 'Traduction IA', '数据与备份': 'Données et sauvegardes', '快捷键与关于': 'Raccourcis et à propos',
    '调整界面语言、主题和素材卡片密度。': 'Réglez la langue, le thème et l’espacement des fiches.', '界面语言': 'Langue de l’interface',
    '只更改应用按钮与菜单，不改变素材内容语言。': 'Modifie les commandes et menus, pas le contenu enregistré.', '外观模式': 'Apparence',
    '选择浅色、深色，或跟随 Windows 操作系统外观偏好。': 'Choisissez clair, sombre ou le réglage de Windows.',
    '跟随系统': 'Système', '浅色': 'Clair', '深色': 'Sombre', '素材卡片密度': 'Espacement des fiches',
    '控制素材卡片之间的留白，不影响文字内容。': 'Réglez l’espace entre les fiches sans modifier leur contenu.', '舒适': 'Confortable', '紧凑': 'Compact',
    '主题颜色': 'Couleur d’accent', '更改界面的强调色，立即应用并保存在此设备。': 'Change la couleur d’accent, appliquée et enregistrée sur cet appareil.',
    '森林绿': 'Vert forêt', '海岸蓝': 'Bleu côtier', '薰衣草': 'Lavande', '暖陶色': 'Terre cuite',
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
export function toast(message, actionLabel = '', onAction = null, duration = 3200) {
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
  }, duration);
}
