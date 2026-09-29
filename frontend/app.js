const KEY = 'clipnest.library.v1';
const DEFAULT_LANGUAGES = ['语言 1', '语言 2'];
const LANGUAGE_OPTIONS = ['简体中文', '繁體中文', 'English', 'Français', 'Español', 'Português', '日本語', '한국어', 'Deutsch', 'Русский', 'Italiano', 'العربية', 'हिन्दी', 'Türkçe', 'Tiếng Việt', 'ไทย', 'Bahasa Indonesia', 'Bahasa Melayu', 'Nederlands', 'Polski', 'Українська'];
const UI_COPY = {
  'ClipNest · 话术与素材库':['ClipNest · Message Library','ClipNest · Bibliothèque de messages'], 'ClipNest 首页':['ClipNest home','Accueil ClipNest'], '话术与素材库':['Message Library','Bibliothèque de messages'],
  '搜索素材':['Search materials','Rechercher'], '搜索素材…':['Search materials…','Rechercher…'], '快速访问':['Quick access','Accès rapide'], '全部素材':['All materials','Tous les éléments'], '常用收藏':['Favorites','Favoris'], '最近复制':['Recently copied','Récemment copiés'], '我的分类':['My categories','Mes catégories'], '新建分类':['New category','Nouvelle catégorie'], '数据保存在此设备':['Data stored on this device','Données stockées sur cet appareil'], '我的素材库':['My library','Ma bibliothèque'], '显示语言':['Display language','Langue d’affichage'], '对照':['Side by side','En parallèle'], '打开设置':['Open settings','Ouvrir les réglages'], '设置':['Settings','Réglages'], '批量粘贴':['Bulk paste','Collage multiple'], '新建素材':['New item','Nouvel élément'], 'CONTENT LIBRARY':['CONTENT LIBRARY','BIBLIOTHÈQUE DE CONTENUS'], '常用双语内容，随时找到，立即复制。':['Find and copy your saved content.','Retrouvez et copiez vos contenus enregistrés.'],
  '全部':['All','Tout'], '☆ 收藏':['☆ Favorites','☆ Favoris'], '待补':['Missing','À compléter'], '未分类':['Uncategorized','Sans catégorie'], '所有标签':['All tags','Tous les tags'], '素材排序':['Sort items','Trier les éléments'], '手动排序':['Custom order','Ordre personnalisé'], '最近编辑':['Recently edited','Modifiés récemment'], '标题顺序':['Title','Titre'], '复制最多':['Most copied','Les plus copiés'], '包含子分类':['Include subcategories','Inclure les sous-catégories'], '仅本分类':['This category only','Cette catégorie uniquement'], '按步骤浏览':['Browse steps','Parcourir les étapes'], '上一步':['Previous step','Étape précédente'], '下一步':['Next step','Étape suivante'], '退出流程':['Exit workflow','Quitter le parcours'], '多选':['Select','Sélectionner'], '退出多选':['Exit selection','Quitter la sélection'], '全部展开':['Expand all','Tout développer'], '全部收起':['Collapse all','Tout réduire'], '清除全部':['Clear all','Tout effacer'],
  '重试失败':['Retry failed','Réessayer les échecs'], '继续剩余':['Continue remaining','Continuer'], '停止':['Stop','Arrêter'], '已选 0 项':['0 selected','0 sélectionné'], '全选当前':['Select all shown','Tout sélectionner'], '移动到分类…':['Move to category…','Déplacer vers…'], '添加标签':['Add tags','Ajouter des tags'], '收藏所选':['Favorite selected','Ajouter aux favoris'], '取消收藏所选':['Remove selected from favorites','Retirer des favoris'], '删除':['Delete','Supprimer'], '完成':['Done','Terminé'],
  '批量粘贴素材':['Bulk paste items','Coller plusieurs éléments'], '每条首行作为标题；用单独一行':['Use the first line as the title. Separate languages with a line'], '添加到分类':['Add to category','Ajouter à la catégorie'], '粘贴内容后显示识别结果':['Paste content to preview detected items','Collez du contenu pour afficher l’aperçu'], '图片可在导入后拖入对应素材卡片':['You can add images to items after importing','Ajoutez des images aux éléments après importation'], '导入素材':['Import items','Importer'], '新素材':['New item','Nouvel élément'], '关闭，内容已自动保存':['Close; content is saved automatically','Fermer ; le contenu est enregistré automatiquement'], '点击写标题；也可以在这里粘贴整段素材':['Add a title or paste the full content here','Saisissez un titre ou collez tout le contenu ici'], '点击输入或直接粘贴':['Click to type or paste','Saisissez ou collez ici'], '添加第二种语言':['Add second language','Ajouter une deuxième langue'], '变量可写成':['Use variables like','Utilisez des variables comme'], '添加标签（可选，用逗号分隔）':['Add tags (optional, comma-separated)','Ajouter des tags (facultatif, séparés par des virgules)'], '添加图片':['Add image','Ajouter une image'], '输入即自动保存':['Changes are saved automatically','Enregistrement automatique'], '编辑内容会自动保存':['Changes are saved automatically','Enregistrement automatique'], '可粘贴整段，用 --- 分开两种语言':['Paste full content; separate languages with ---','Collez le contenu complet ; séparez les langues avec ---'],
  'CLIPNEST PREFERENCES':['CLIPNEST PREFERENCES','PRÉFÉRENCES CLIPNEST'], '设置页面':['Settings','Réglages'], '管理显示偏好、语言、AI 翻译与本机数据。':['Manage appearance, languages, AI translation, and local data.','Gérez l’apparence, les langues, la traduction IA et les données locales.'], '← 返回素材库':['← Back to library','← Retour à la bibliothèque'], '设置分栏':['Settings sections','Sections des réglages'], '常规':['General','Général'], '语言':['Languages','Langues'], '界面语言':['Interface language','Langue de l’interface'], '只更改应用按钮与菜单，不改变素材内容语言。':['Changes app labels and menus, not the languages used in your items.','Modifie les libellés et menus, pas les langues de vos contenus.'], 'AI 翻译':['AI translation','Traduction IA'], '数据与备份':['Data & backup','Données et sauvegarde'], '快捷键与关于':['Shortcuts & about','Raccourcis et à propos'], '调整界面语言、主题和素材卡片密度。':['Adjust the interface language, theme, and item card spacing.','Réglez la langue de l’interface, le thème et l’espacement des cartes.'], '素材卡片密度':['Card spacing','Espacement des cartes'], '控制素材卡片之间的留白，不影响文字内容。':['Adjust the space between cards.','Réglez l’espace entre les cartes.'], '舒适':['Comfortable','Confortable'], '紧凑':['Compact','Compact'], '主题颜色':['Theme color','Couleur du thème'], '更改界面的强调色，立即应用并保存在此设备。':['Change the accent color. Saved on this device.','Changez la couleur d’accentuation. Enregistrée sur cet appareil.'], '森林绿':['Forest green','Vert forêt'], '海岸蓝':['Coastal blue','Bleu côtier'], '薰衣草':['Lavender','Lavande'], '暖陶色':['Terracotta','Terre cuite'], '设置内容语言名称和默认显示方式。':['Set content language names and the default display mode.','Définissez les noms des langues et le mode d’affichage par défaut.'], '名称会用于素材卡片、编辑区域和复制提示，不会改动已有内容。':['Names appear on cards, in the editor, and in copy notices. Existing content is unchanged.','Les noms apparaissent sur les cartes, dans l’éditeur et les notifications. Le contenu existant reste inchangé.'], '保存语言名称':['Save language names','Enregistrer les noms'], '语言显示方式':['Language display','Affichage des langues'], '也可以随时在素材库顶部切换。':['You can also switch this at the top of the library.','Vous pouvez aussi modifier ce réglage en haut de la bibliothèque.'], '新建素材默认只有语言 1；需要时可在条目中添加第二种语言。':['New items start with Language 1. Add a second language whenever needed.','Les nouveaux éléments commencent avec la langue 1. Ajoutez une deuxième langue au besoin.'], '配置一次后，可在只有一种语言的素材中一键补全另一种语言。':['Translate items with missing content in one click.','Traduisez en un clic les éléments auxquels il manque une langue.'], '服务商':['Provider','Fournisseur'], '自定义 OpenAI 兼容接口':['Custom OpenAI-compatible API','API compatible OpenAI personnalisée'], '模型名称':['Model','Modèle'], '加载模型':['Load models','Charger les modèles'], 'API Key':['API key','Clé API'], '留空表示保留已保存的 Key':['Leave blank to keep the saved key','Laissez vide pour conserver la clé enregistrée'], '翻译文本会发送给所选服务商并可能产生费用。':['Text is sent to the selected provider and may incur charges.','Le texte est envoyé au fournisseur choisi et peut entraîner des frais.'], '尚未保存 API Key':['No API key saved','Aucune clé API enregistrée'], '删除已保存的 Key':['Delete saved key','Supprimer la clé enregistrée'], '保存 AI 设置':['Save AI settings','Enregistrer les réglages IA'],
  '素材保存在本机。定期导出备份，可在其他设备迁移或恢复数据。':['Items are stored locally. Export backups to move or restore your data.','Les éléments sont stockés localement. Exportez une sauvegarde pour les transférer ou les restaurer.'], '本机资料概况':['Local library overview','Aperçu de la bibliothèque locale'], '仅保存在此设备':['Stored on this device only','Stocké uniquement sur cet appareil'], '备份文件':['Backup files','Fichiers de sauvegarde'], '导出包含分类、文字和图片的 JSON 文件；导入前会确认并保留恢复点。':['Export a JSON backup with categories, text, and images. A restore point is saved before importing.','Exportez une sauvegarde JSON avec catégories, textes et images. Un point de restauration est créé avant l’importation.'], '导出备份':['Export backup','Exporter la sauvegarde'], '导入备份':['Import backup','Importer une sauvegarde'], '本地版本历史':['Local version history','Historique local'], '恢复点最多保留 10 个，保存在此设备并包含关联图片。':['Up to 10 restore points are kept on this device, including their images.','Jusqu’à 10 points de restauration avec leurs images sont conservés sur cet appareil.'], '创建恢复点':['Create restore point','Créer un point de restauration'], '常用操作可以直接通过键盘完成。':['Use keyboard shortcuts for common actions.','Utilisez les raccourcis clavier pour les actions courantes.'], '关于 ClipNest':['About ClipNest','À propos de ClipNest'], 'ClipNest 是本机使用的话术与素材库。内容与图片不会自动上传到云端。':['ClipNest is a local library for messages and media. Your content and images are not uploaded.','ClipNest est une bibliothèque locale de messages et de médias. Vos contenus et images ne sont pas téléversés.'], '移动分类':['Move category','Déplacer la catégorie'], '删除并合并分类':['Delete and merge category','Supprimer et fusionner la catégorie'], '移除语言 2？':['Remove Language 2?','Supprimer la langue 2 ?'], '语言 2 已有内容，移除后这部分内容也会删除。':['Language 2 contains content. Removing it will also delete that content.','La langue 2 contient du contenu. Sa suppression effacera aussi ce contenu.'], '批量 AI 翻译':['Batch AI translation','Traduction IA par lot'], '开始翻译':['Start translation','Démarrer la traduction'], '填写话术内容':['Fill in message content','Renseigner le message'], '请填写每个变量后再复制；原素材不会改变。':['Fill in each variable before copying. The original item will not change.','Renseignez chaque variable avant de copier. L’élément d’origine ne sera pas modifié.'], '填写场景变量':['Set scenario values','Renseigner les variables du scénario'], '开始场景前填写一次，后续步骤会自动复用。':['Fill these in once; later steps will reuse them.','Renseignez-les une fois ; les étapes suivantes les réutiliseront.'], '开始浏览':['Start browsing','Commencer'], '复制预览':['Copy preview','Aperçu de la copie'], '复制内容':['Copy content','Copier le contenu'], '选择图标':['Choose an icon','Choisir une icône'], '表情':['Emoji','Émojis'], '符号':['Symbols','Symboles'], '恢复默认':['Reset to default','Rétablir par défaut'], '搜索或粘贴表情':['Search or paste an emoji','Rechercher ou coller un émoji'], '素材大图':['Full-size item image','Image en taille réelle'],
  '全部收藏':['All favorites','Tous les favoris'], '待补简体中文':['Missing Simplified Chinese','Chinois simplifié manquant'], '当前条件':['Current filters','Filtres actuels'], '清除关键词筛选':['Clear search filter','Effacer le filtre de recherche'], '清除标签筛选':['Clear tag filter','Effacer le filtre de tag'], '清除收藏筛选':['Clear favorites filter','Effacer le filtre favoris'], '展开':['Expand','Développer'], '收起':['Collapse','Réduire'], '展开侧边栏':['Expand sidebar','Développer la barre latérale'], '收起侧边栏':['Collapse sidebar','Réduire la barre latérale'], '复制':['Copy','Copier'], '编辑':['Edit','Modifier'], '克隆':['Clone','Dupliquer'], '手动添加':['Add manually','Ajouter manuellement'], '删除这张图片':['Remove this image','Supprimer cette image'], '删除图片':['Remove image','Supprimer l’image'], '筛选标签':['Filter by tag','Filtrer par tag'], '在此后新建':['Insert after','Insérer après'], '删除素材':['Delete item','Supprimer l’élément'], '删除分类':['Delete category','Supprimer la catégorie'], '分类里的素材会保留并转为未分类，子分类会提升到上一级。':['Items will be kept as uncategorized, and subcategories will move up one level.','Les éléments seront conservés sans catégorie et les sous-catégories remonteront d’un niveau.'], '确认删除分类':['Delete category?','Supprimer la catégorie ?'], '分类已删除，素材已保留':['Category deleted; items were kept','Catégorie supprimée ; éléments conservés'], '更改分类图标':['Change category icon','Changer l’icône de catégorie'], '拖动调整同级顺序':['Drag to reorder','Glisser pour réorganiser'], '新建子分类':['Add subcategory','Ajouter une sous-catégorie'], '更多操作':['More actions','Plus d’actions'], '重命名':['Rename','Renommer'], '更改图标':['Change icon','Changer l’icône'], '移动到…':['Move to…','Déplacer vers…'], '删除并合并…':['Delete and merge…','Supprimer et fusionner…'], '设置 AI 翻译':['Set up AI translation','Configurer la traduction IA'], '撤销':['Undo','Annuler'], '新分类名称':['New category name','Nom de la catégorie'], '修改分类名称':['Rename category','Renommer la catégorie'], '批量添加标签':['Add tags to items','Ajouter des tags'], '这条素材的标题不能为空':['The item title cannot be empty','Le titre ne peut pas être vide'], '没有符合条件的素材':['No items match these filters','Aucun élément ne correspond à ces filtres'], '没有找到素材':['No items found','Aucun élément trouvé'], '先创建一个分类':['Create a category first','Créez d’abord une catégorie'], '分类由你自己创建，之后可在这里添加素材。':['Create a category, then add items here.','Créez une catégorie, puis ajoutez-y des éléments.'], '试试其他关键词，或新建一条内容。':['Try another search or create a new item.','Essayez un autre terme ou créez un élément.'], '清除筛选':['Clear filters','Effacer les filtres'], '恢复':['Restore','Restaurer'], '还没有恢复点':['No restore points yet','Aucun point de restauration'], '无法读取本地版本':['Could not read local versions','Impossible de lire les versions locales'], '创建恢复点失败，请检查存储空间':['Could not create a restore point. Check available storage.','Création impossible. Vérifiez l’espace disponible.'], '找不到这个恢复点':['Restore point not found','Point de restauration introuvable'], 'API Key 已加密保存在本机':['API key is encrypted and stored on this device','La clé API est chiffrée et stockée sur cet appareil'], '桌面版中可保存 API Key':['Save an API key in the desktop app','Enregistrez une clé API dans l’application de bureau'], '图片操作':['Image actions','Actions sur l’image'], '复制图片':['Copy image','Copier l’image'], '下载图片':['Download image','Télécharger l’image'], '打开预览':['Open preview','Ouvrir l’aperçu'], '从素材移除':['Remove from item','Retirer de l’élément'], '无法读取图片':['Could not load image','Impossible de charger l’image'], '无法复制图片，请检查剪贴板权限':['Could not copy image. Check clipboard permissions.','Impossible de copier l’image. Vérifiez les autorisations du presse-papiers'], '已下载图片':['Image downloaded','Image téléchargée']
};
const AI_PROVIDERS = {
  openai: { baseUrl: 'https://api.openai.com/v1', model: 'gpt-5-mini' },
  deepseek: { baseUrl: 'https://api.deepseek.com', model: 'deepseek-v4-flash' },
  gemini: { baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai/', model: 'gemini-3.8-flash' },
  qwen: { baseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1', model: 'qwen-plus' },
  groq: { baseUrl: 'https://api.groq.com/openai/v1', model: 'openai/gpt-oss-20b' }
};
const DEMO_IDS = new Set(['welcome', 'meeting', 'hello', 'followup']);
const DEMO_CATEGORIES = new Set(['互动线索', '聚会资料', '新人跟进']);
const EMOJI_ICONS = ['😀','😃','😄','😁','😆','😅','😂','🙂','😉','😊','😍','🥰','😘','😎','🤔','😴','🥳','😭','🙏','👏','👍','👋','🤝','❤️','🔥','✨','⭐','✅','📌','📎','📁','📚','💬','💡','🎯','🎉','🌱','☀️','🌙','🍀','🌸','🐱','🐶','☕','🎵','🚀','🏠','✉️'];
const SYMBOL_ICONS = ['▤','▱','◈','○','●','□','■','△','▲','◇','◆','☆','★','✦','✧','✿','❀','❖','✓','✔','＋','⌂','⌘','♧','♢','♤','♡','♬','☼','☾','⚑','⚙','⚡','☑','⊙','⊕','∞','→','↗','↘','↻','⏱','☷','☰','▣','▪','▫','⬟'];
const IMAGE_DB = 'clipnest.assets.v1';
// ponytail: keep original image blobs in IndexedDB; generate thumbnails when large libraries make full-size previews slow.
let imageDatabase;
let draftImages = [];
let originalImages = [];
let imageTargetId = '';
let reorderDrag = null;
let categoryReorder = null;
let ignoreCategoryClick = false;
let movingCategory = '';
let iconPickerTarget = null;
let iconPickerTab = 'emoji';
let pendingCategoryIcon = '';
let selectionMode = false;
const selectedItems = new Set();
let visibleItemIds = [];
let pendingLanguageRemovalId = '';
let pendingDraftLanguageRemoval = false;
let pendingDeleteUndo = null;
let pendingBackup = null;
let deleteTargetIds = [];
let pendingInsertAfterId = '';
let editingItemId = '';
let aiKeyConfigured = false;
let translationBatch = null;
let pendingBatchTranslationIds = [];
const objectUrls = new Set();

function normalize(data) {
  const items = Array.isArray(data?.items) ? data.items : [];
  const realItems = items.filter(item => !DEMO_IDS.has(item.id));
  const categories = Array.isArray(data?.categories) ? data.categories.filter(name => !DEMO_CATEGORIES.has(name)) : [];
  for (const item of realItems) if (item.category && !categories.includes(item.category)) categories.push(item.category);
  const categoryParents = Object.fromEntries(categories.filter(name => categories.includes(data?.categoryParents?.[name]) && data.categoryParents[name] !== name).map(name => [name, data.categoryParents[name]]));
  for (const name of categories) {
    const path = new Set([name]);
    let parent = categoryParents[name];
    while (parent && !path.has(parent)) { path.add(parent); parent = categoryParents[parent]; }
    if (parent) delete categoryParents[name];
  }
  return {
    categories,
    categoryParents,
    collapsedCategories: Array.isArray(data?.collapsedCategories) ? data.collapsedCategories.filter(name => categories.includes(name)) : [],
    categoryIcons: Object.fromEntries(categories.filter(name => data?.categoryIcons?.[name]).map(name => [name, String(data.categoryIcons[name])])),
    languages: Array.isArray(data?.languages) && data.languages.length === 2 ? data.languages : DEFAULT_LANGUAGES,
    items: realItems.map(item => ({
      ...item,
      translations: Array.isArray(item.translations) ? item.translations : [item.zh || '', item.fr || ''],
      hasSecondLanguage: Boolean(item.hasSecondLanguage || (item.translations?.[1] || item.fr || '').trim()),
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
      colorScheme: ['auto', 'light', 'dark'].includes(data?.preferences?.colorScheme) ? data.preferences.colorScheme : 'auto',
      theme: ['green', 'blue', 'purple', 'terracotta'].includes(data?.preferences?.theme) ? data.preferences.theme : 'green',
      sidebarCollapsed: typeof data?.preferences?.sidebarCollapsed === 'boolean' ? data.preferences.sidebarCollapsed : window.innerWidth <= 700,
      uiLanguage: ['zh-CN', 'en', 'fr'].includes(data?.preferences?.uiLanguage) ? data.preferences.uiLanguage : 'zh-CN',
      aiProvider: ['openai', 'deepseek', 'gemini', 'qwen', 'groq', 'custom'].includes(data?.preferences?.aiProvider) ? data.preferences.aiProvider : 'openai',
      aiBaseUrl: typeof data?.preferences?.aiBaseUrl === 'string' ? data.preferences.aiBaseUrl : AI_PROVIDERS.openai.baseUrl,
      aiModel: typeof data?.preferences?.aiModel === 'string' ? data.preferences.aiModel : AI_PROVIDERS.openai.model
    },
    lastCategory: typeof data?.lastCategory === 'string' ? data.lastCategory : ''
  };
}

let state;
try { state = normalize(JSON.parse(localStorage.getItem(KEY) || '{}')); }
catch { state = normalize({}); }
let language = state.languageMode;
let view = 'all';
let settingsOpen = false;
let settingsSection = 'general';
let category = '';
let includeDescendants = false;
let scenarioFlow = null;
let filter = 'all';
let tagFilter = '';
let sortMode = 'manual';
let pendingTemplate = null;
let pendingVersionRestoreId = '';
let imageContextTarget = null;
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
function uiText(value) {
  const locale = state.preferences.uiLanguage;
  if (locale === 'zh-CN') return UI_COPY[value] ? value : Object.entries(UI_COPY).find(([, copy]) => copy.includes(value))?.[0] || value;
  const source = UI_COPY[value] ? value : Object.entries(UI_COPY).find(([, copy]) => copy.includes(value))?.[0];
  const translated = source && UI_COPY[source][locale === 'en' ? 0 : 1];
  if (translated) return translated;
  if (locale === 'en') return value.replace(/(\d+) 条素材/g, '$1 items').replace(/(\d+) 个分类/g, '$1 categories').replace(/(\d+) 张图片/g, '$1 images').replace(/已复制 (\d+) 次/g, 'Copied $1 times').replace(/已选 (\d+) 项/g, '$1 selected').replace(/识别到 (\d+) 条素材/g, '$1 items detected').replace(/✓? ?已复制(.+)/g, '✓ Copied$1').replace(/AI 翻译为(.+)/g, 'Translate to $1').replace(/手动添加(.+)/g, 'Add $1 manually').replace(/待补(.+)/g, 'Missing $1').replace(/复制(.+)/g, 'Copy $1').replace(/仅显示尚未添加(.+)的内容。/g, 'Showing items missing $1.').replace(/在“(.+)”下新建子分类/g, 'New subcategory under “$1”').replace(/已完成 (\d+) · 失败 (\d+) · 剩余 (\d+)/g, '$1 done · $2 failed · $3 remaining').replace(/重试失败 (\d+) 条/g, 'Retry $1 failed').replace(/继续剩余 (\d+) 条/g, 'Continue $1 remaining').replace(/正在翻译：(.+)/g, 'Translating: $1');
  return value.replace(/(\d+) 条素材/g, '$1 éléments').replace(/(\d+) 个分类/g, '$1 catégories').replace(/(\d+) 张图片/g, '$1 images').replace(/已复制 (\d+) 次/g, 'Copié $1 fois').replace(/已选 (\d+) 项/g, '$1 sélectionné(s)').replace(/识别到 (\d+) 条素材/g, '$1 éléments détectés').replace(/✓? ?已复制(.+)/g, '✓ Copié$1').replace(/AI 翻译为(.+)/g, 'Traduire en $1').replace(/手动添加(.+)/g, 'Ajouter $1 manuellement').replace(/待补(.+)/g, 'Manque : $1').replace(/复制(.+)/g, 'Copier $1').replace(/仅显示尚未添加(.+)的内容。/g, 'Éléments sans $1 uniquement.').replace(/在“(.+)”下新建子分类/g, 'Nouvelle sous-catégorie dans « $1 »').replace(/已完成 (\d+) · 失败 (\d+) · 剩余 (\d+)/g, '$1 terminés · $2 échecs · $3 restants').replace(/重试失败 (\d+) 条/g, 'Réessayer les $1 échecs').replace(/继续剩余 (\d+) 条/g, 'Continuer ($1 restants)').replace(/正在翻译：(.+)/g, 'Traduction : $1');
}
function localizeInterface() {
  const locale = state.preferences.uiLanguage;
  document.documentElement.lang = locale;
  document.title = uiText('ClipNest · 话术与素材库');
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode, parent = node.parentElement;
    if (parent.closest('[contenteditable="true"], .card-title, .card-meta, .language-text, .tag, .category-name, .category-count, #template-preview, #category-flow-scenario, #category-flow-step, #category-remove-name') || (parent.matches('option') && parent.value && parent.closest('#category-input, #bulk-category, #bulk-item-category, #tag-filter, #language-name-0, #language-name-1, #ai-model')) || (parent.id === 'page-title' && view === 'category')) continue;
    const raw = node.nodeValue, trimmed = raw.trim();
    if (!trimmed) continue;
    const translated = uiText(trimmed);
    if (translated !== trimmed) node.nodeValue = raw.replace(trimmed, translated);
  }
  document.querySelectorAll('[title],[aria-label],[placeholder],[alt]').forEach(element => {
    if (element.tagName === 'IMG' || element.matches('.category-button') || element.closest('.category-button')) return;
    for (const attribute of ['title', 'aria-label', 'placeholder', 'alt']) {
      if (!element.hasAttribute(attribute)) continue;
      const value = element.getAttribute(attribute), translated = uiText(value);
      if (translated !== value) element.setAttribute(attribute, translated);
    }
  });
}
function updateSidebarState() {
  const collapsed = state.preferences.sidebarCollapsed;
  document.body.dataset.sidebarCollapsed = String(collapsed);
  const toggle = $('#sidebar-toggle');
  toggle.title = uiText(collapsed ? '展开侧边栏' : '收起侧边栏');
  toggle.setAttribute('aria-label', toggle.title);
  toggle.setAttribute('aria-expanded', String(!collapsed));
}
function setSidebarCollapsed(collapsed) {
  state.preferences.sidebarCollapsed = collapsed;
  updateSidebarState();
  persist();
}
function updateColorScheme() {
  const scheme = state.preferences.colorScheme || 'auto';
  const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const effectiveDark = scheme === 'dark' || (scheme === 'auto' && isSystemDark);
  document.body.dataset.colorScheme = effectiveDark ? 'dark' : 'light';
  const toggle = $('#theme-toggle');
  if (toggle) {
    toggle.textContent = effectiveDark ? '☀️' : '🌙';
    const label = scheme === 'auto' ? (effectiveDark ? '跟随系统 (深色)' : '跟随系统 (浅色)') : (effectiveDark ? '深色模式' : '浅色模式');
    toggle.title = `切换外观模式 (当前: ${label})`;
    toggle.setAttribute('aria-label', toggle.title);
  }
  document.querySelectorAll('[data-color-scheme-option]').forEach(button => {
    const selected = button.dataset.colorSchemeOption === scheme;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
function highlight(text, term) {
  const paint = value => {
    let safe = esc(value);
    const escapedTerm = term ? term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
    if (escapedTerm) {
      safe = safe.replace(new RegExp(`(${escapedTerm})`, 'ig'), '<mark>$1</mark>');
    }
    // Render placeholders like {{name}} as visual badge chips
    return safe.replace(/(\{\{\s*([^{}]+?)\s*\}\})/g, '<span class="template-variable">$1</span>');
  };
  const source = String(text ?? '');
  const bold = /\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;
  let html = '', cursor = 0, match;
  while ((match = bold.exec(source))) {
    html += paint(source.slice(cursor, match.index)) + `<strong>${paint(match[1] ?? match[2])}</strong>`;
    cursor = bold.lastIndex;
  }
  return html + paint(source.slice(cursor));
}
function richTextValue(element) {
  const blocks = new Set(['DIV', 'P', 'LI']);
  function read(node, insideBold = false) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    if (node.tagName === 'BR') return '\n';
    const ownBold = node.matches('b, strong') || /^(bold|[6-9]00)$/.test(node.style.fontWeight);
    const bold = ownBold && !insideBold;
    let value = [...node.childNodes].map(child => read(child, insideBold || ownBold)).join('');
    if (bold && value) value = `*${value}*`;
    return blocks.has(node.tagName) && value && !value.endsWith('\n') ? `${value}\n` : value;
  }
  return read(element).replace(/\n+$/, '');
}

function persist() {
  try { localStorage.setItem(KEY, JSON.stringify({ ...state, languageMode: language })); return true; }
  catch { toast('保存失败，请导出备份并检查设备存储空间'); return false; }
}
function markEdited(item) { if (item) item.updatedAt = Date.now(); }
function openImageDatabase() {
  if (!imageDatabase) imageDatabase = new Promise((resolve, reject) => {
    const request = indexedDB.open(IMAGE_DB, 2);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('images')) db.createObjectStore('images');
      if (!db.objectStoreNames.contains('versions')) db.createObjectStore('versions', { keyPath: 'id' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  return imageDatabase;
}
async function storeImage(file, id = crypto.randomUUID()) {
  const db = await openImageDatabase();
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readwrite');
    transaction.objectStore('images').put(file, id);
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
  return id;
}
async function getImage(id) {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('images').objectStore('images').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
function openImageContextMenu(event, image) {
  event.preventDefault();
  imageContextTarget = image;
  const menu = $('#image-context-menu');
  menu.showPopover();
  const bounds = menu.getBoundingClientRect();
  menu.style.left = `${Math.max(8, Math.min(event.clientX, innerWidth - bounds.width - 8))}px`;
  menu.style.top = `${Math.max(8, Math.min(event.clientY, innerHeight - bounds.height - 8))}px`;
  menu.querySelector('button')?.focus();
}
function closeImageContextMenu() {
  const menu = $('#image-context-menu');
  if (menu.matches(':popover-open')) menu.hidePopover();
  imageContextTarget = null;
}
async function copyImageToClipboard(id) {
  const blob = await getImage(id);
  if (!blob) throw new Error('Image is missing');
  if (!navigator.clipboard?.write || !window.ClipboardItem) throw new Error('Image clipboard is unavailable');
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width; canvas.height = bitmap.height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0);
  bitmap.close();
  const png = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!png) throw new Error('Could not encode image');
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
}
async function openImagePreview(id, itemId = '') {
  if ($('#image-preview').open) return;
  const blob = await getImage(id);
  if (!blob) return toast('无法读取图片');
  const preview = $('#image-preview-content');
  preview.src = URL.createObjectURL(blob);
  preview.dataset.imageId = id;
  preview.dataset.itemId = itemId;
  $('#image-preview').showModal();
}
async function removeImages(ids) {
  if (!ids.length) return;
  const db = await openImageDatabase();
  const versions = await new Promise((resolve, reject) => {
    const request = db.transaction('versions').objectStore('versions').getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
  const protectedIds = new Set([
    ...state.items.flatMap(item => item.images || []),
    ...versions.flatMap(version => version.imageIds || [])
  ]);
  const removable = ids.filter(id => !protectedIds.has(id));
  if (!removable.length) return;
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('images', 'readwrite');
    removable.forEach(id => transaction.objectStore('images').delete(id));
    transaction.oncomplete = resolve;
    transaction.onerror = () => reject(transaction.error);
  });
}
async function listVersions() {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('versions').objectStore('versions').getAll();
    request.onsuccess = () => resolve(request.result.sort((a, b) => b.createdAt - a.createdAt));
    request.onerror = () => reject(request.error);
  });
}
async function saveVersion(label = '手动恢复点') {
  const db = await openImageDatabase();
  const imageIds = [...new Set(state.items.flatMap(item => item.images || []))];
  const version = { id: crypto.randomUUID(), label, createdAt: Date.now(), data: JSON.parse(JSON.stringify({ ...state, languageMode: language })), imageIds };
  await new Promise((resolve, reject) => {
    const transaction = db.transaction('versions', 'readwrite');
    transaction.objectStore('versions').put(version);
    transaction.oncomplete = resolve; transaction.onerror = () => reject(transaction.error);
  });
  const oldVersions = (await listVersions()).slice(10);
  if (oldVersions.length) await new Promise((resolve, reject) => {
    const transaction = db.transaction('versions', 'readwrite');
    oldVersions.forEach(entry => transaction.objectStore('versions').delete(entry.id));
    transaction.oncomplete = resolve; transaction.onerror = () => reject(transaction.error);
  });
  await removeImages(oldVersions.flatMap(entry => entry.imageIds || []));
}
async function getVersion(id) {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const request = db.transaction('versions').objectStore('versions').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
function cleanupPendingDeleteImages(pending) {
  const used = new Set(state.items.flatMap(item => item.images));
  removeImages(pending.imageIds.filter(id => !used.has(id))).catch(() => {});
}
function deleteItemsWithUndo(ids) {
  if (pendingDeleteUndo) {
    clearTimeout(pendingDeleteUndo.timer);
    cleanupPendingDeleteImages(pendingDeleteUndo);
    pendingDeleteUndo = null;
  }
  const selected = new Set(ids);
  const removed = state.items.map((item, index) => ({ item, index })).filter(({ item }) => selected.has(item.id));
  if (!removed.length) return;
  const imageIds = [...new Set(removed.flatMap(({ item }) => item.images))];
  state.items = state.items.filter(item => !selected.has(item.id));
  selectedItems.clear(); selectionMode = false; persist(); render();
  const undo = { removed, imageIds, timer: null };
  pendingDeleteUndo = undo;
  undo.timer = setTimeout(() => {
    if (pendingDeleteUndo !== undo) return;
    pendingDeleteUndo = null; cleanupPendingDeleteImages(undo); toast('删除已完成');
  }, 5000);
  toast(`已删除 ${removed.length} 条素材`, () => {
    if (pendingDeleteUndo !== undo) return;
    clearTimeout(undo.timer);
    for (const entry of removed) state.items.splice(Math.min(entry.index, state.items.length), 0, entry.item);
    pendingDeleteUndo = null; persist(); render(); toast('✓ 删除已撤销');
  }, 5000);
}
async function filesToImages(files, item) {
  const images = [...files].filter(file => file.type.startsWith('image/'));
  if (!images.length) return toast('请拖入图片文件');
  try {
    const ids = await Promise.all(images.map(file => storeImage(file)));
    if (item) { item.images.push(...ids); markEdited(item); persist(); render(); }
    else { draftImages.push(...ids); renderDraftImages(); syncDraft(); }
    toast(`✓ 已添加 ${ids.length} 张图片`);
  } catch { toast('图片保存失败，请重试'); }
}
async function renderDraftImages() {
  const list = $('#image-list');
  list.querySelectorAll('img').forEach(image => { URL.revokeObjectURL(image.src); objectUrls.delete(image.src); });
  list.replaceChildren();
  for (const id of draftImages) {
    const blob = await getImage(id);
    if (!blob || !draftImages.includes(id)) continue;
    const tile = document.createElement('div'); tile.className = 'image-tile';
    const image = document.createElement('img'); image.src = URL.createObjectURL(blob); objectUrls.add(image.src); image.alt = ''; image.dataset.imageId = id; image.dataset.itemId = editingItemId; image.dataset.action = 'preview-image';
    const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = '×'; remove.dataset.imageId = id; remove.setAttribute('aria-label', '移除图片');
    remove.addEventListener('click', () => {
      const index = draftImages.indexOf(id);
      const ownerId = editingItemId;
      draftImages = draftImages.filter(entry => entry !== id);
      const item = state.items.find(entry => entry.id === ownerId);
      if (item) { item.images = [...draftImages]; markEdited(item); persist(); }
      renderDraftImages(); syncDraft();
      const cleanup = setTimeout(() => {
        if (!state.items.some(entry => entry.images.includes(id))) removeImages([id]).catch(() => {});
      }, 5000);
      toast('图片已移除', () => {
        clearTimeout(cleanup);
        const current = state.items.find(entry => entry.id === ownerId);
        if (!current) { removeImages([id]).catch(() => {}); return; }
        if (current.images.includes(id)) return;
        if (!$('#editor').hidden && editingItemId === ownerId) {
          draftImages.splice(Math.min(index, draftImages.length), 0, id);
          current.images = [...draftImages]; markEdited(current); renderDraftImages(); syncDraft();
        } else {
          current.images.splice(Math.min(index, current.images.length), 0, id); markEdited(current); persist(); render();
        }
        toast('✓ 已撤销移除图片');
      }, 5000);
    });
    tile.append(image, remove); list.append(tile);
  }
}
async function hydrateCardImages() {
  for (const element of document.querySelectorAll('.card-image[data-image-id]')) {
    const blob = await getImage(element.dataset.imageId).catch(() => null);
    if (blob && element.isConnected) { element.src = URL.createObjectURL(blob); objectUrls.add(element.src); }
  }
}
function blobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}
function toast(message, action = null, duration = 1500) {
  const element = $('#toast');
  const button = $('#toast-action');
  if (!action && pendingDeleteUndo && !button.hidden) return;
  $('#toast-message').textContent = uiText(message);
  button.hidden = !action;
  button.textContent = action ? uiText('撤销') : '';
  button.onclick = action ? () => { clearTimeout(toast.timer); button.hidden = true; button.onclick = null; action(); } : null;
  element.classList.add('visible');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => { element.classList.remove('visible'); button.hidden = true; button.onclick = null; }, duration);
}
function askInput(title, value = '', hint = '', options = {}) {
  return new Promise(resolve => {
    const dialog = $('#input-dialog');
    const input = $('#input-dialog-value');
    $('#input-dialog-title').textContent = uiText(title);
    $('#input-dialog-hint').textContent = uiText(hint);
    $('#input-dialog-icon-row').hidden = !options.categoryIcon;
    $('#input-dialog-icon').textContent = '▱';
    input.value = value;
    dialog.returnValue = '';
    dialog.addEventListener('close', () => resolve(dialog.returnValue === 'save' ? input.value : null), { once: true });
    dialog.showModal();
    input.focus(); input.select();
  });
}
async function createCategory(parent = '') {
  pendingCategoryIcon = '';
  const name = (await askInput(parent ? `在“${categoryPath(parent)}”下新建子分类` : '新分类名称', '', '', { categoryIcon: true }))?.trim();
  const icon = pendingCategoryIcon;
  pendingCategoryIcon = '';
  if (!name) return;
  if (state.categories.includes(name)) return toast('这个分类已存在');
  state.categories.push(name);
  if (icon) state.categoryIcons[name] = icon;
  if (parent) state.categoryParents[name] = parent;
  state.collapsedCategories = state.collapsedCategories.filter(entry => entry !== parent);
  category = name;
  state.lastCategory = name;
  view = 'category';
  persist();
  render();
}
function renameCategory(oldName, requestedName) {
  const name = requestedName?.trim();
  if (!name) return false;
  if (name === oldName) return true;
  if (state.categories.includes(name)) { toast('这个分类已存在'); return false; }
  state.categories = state.categories.map(entry => entry === oldName ? name : entry);
  if (state.categoryParents[oldName]) { state.categoryParents[name] = state.categoryParents[oldName]; delete state.categoryParents[oldName]; }
  for (const child of state.categories) if (state.categoryParents[child] === oldName) state.categoryParents[child] = name;
  if (state.categoryIcons[oldName]) { state.categoryIcons[name] = state.categoryIcons[oldName]; delete state.categoryIcons[oldName]; }
  state.collapsedCategories = state.collapsedCategories.map(entry => entry === oldName ? name : entry);
  state.items.forEach(item => { if (item.category === oldName) { item.category = name; markEdited(item); } });
  if (state.lastCategory === oldName) state.lastCategory = name;
  if (category === oldName) category = name;
  persist(); render();
  return true;
}
function renderIconPicker() {
  const query = $('#icon-picker-search').value.trim();
  const icons = (iconPickerTab === 'emoji' ? EMOJI_ICONS : SYMBOL_ICONS).filter(icon => !query || icon.includes(query));
  $('#icon-picker-grid').innerHTML = `${query ? `<button class="icon-picker-custom" data-icon-value="${esc(query)}">使用“${esc(query)}”</button>` : ''}${icons.map(icon => `<button type="button" data-icon-value="${esc(icon)}" aria-label="${esc(icon)}">${esc(icon)}</button>`).join('') || '<span class="empty-icons">没有匹配的图标</span>'}`;
  document.querySelectorAll('[data-icon-tab]').forEach(button => button.classList.toggle('selected', button.dataset.iconTab === iconPickerTab));
}
function openIconPicker(anchor, kind, id) {
  iconPickerTarget = { kind, id };
  iconPickerTab = 'emoji';
  $('#icon-picker-search').value = '';
  renderIconPicker();
  const picker = $('#icon-picker');
  (kind === 'new-category' ? $('#input-dialog') : document.body).append(picker);
  picker.hidden = false;
  const rect = anchor.getBoundingClientRect();
  const left = Math.max(12, Math.min(rect.left, innerWidth - picker.offsetWidth - 12));
  const below = rect.bottom + 8;
  picker.style.left = `${left}px`;
  picker.style.top = `${below + picker.offsetHeight <= innerHeight - 12 ? below : Math.max(12, rect.top - picker.offsetHeight - 8)}px`;
  $('#icon-picker-search').focus({ preventScroll: true });
}
function closeIconPicker() { const picker = $('#icon-picker'); picker.hidden = true; iconPickerTarget = null; if (picker.parentElement !== document.body) document.body.append(picker); }
function applyPickedIcon(value) {
  if (!iconPickerTarget) return;
  if (iconPickerTarget.kind === 'new-category') {
    pendingCategoryIcon = value.slice(0, 8);
    $('#input-dialog-icon').textContent = pendingCategoryIcon || '▱';
    closeIconPicker(); return;
  } else if (iconPickerTarget.kind === 'category') {
    if (value) state.categoryIcons[iconPickerTarget.id] = value.slice(0, 8);
    else delete state.categoryIcons[iconPickerTarget.id];
  } else {
    const item = state.items.find(entry => entry.id === iconPickerTarget.id);
    if (item) { item.icon = value.slice(0, 8); markEdited(item); }
  }
  persist(); closeIconPicker(); render();
}
function categoryPath(name) {
  if (!name) return uiText('未分类');
  const path = [name];
  while (state.categoryParents[path[0]]) path.unshift(state.categoryParents[path[0]]);
  return path.join(' / ');
}
function scenarioSteps(parent) { return state.categories.filter(name => state.categoryParents[name] === parent); }
async function beginScenarioFlow() {
  const steps = scenarioSteps(category);
  if (!steps.length) return;
  const variables = [...new Set(state.items
    .filter(item => categoryContains(category, item.category))
    .flatMap(item => item.translations.flatMap(text => [...text.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)].map(match => match[1].trim())))
    .filter(Boolean))];
  const values = variables.length ? await promptTemplateValues(variables, {}, true) : {};
  if (!values) return;
  scenarioFlow = { parent: category, values };
  goToScenarioStep(0);
}
function goToScenarioStep(index) {
  const steps = scenarioSteps(scenarioFlow?.parent);
  if (!steps[index]) return;
  view = 'category'; category = steps[index]; includeDescendants = false; state.lastCategory = category;
  document.querySelectorAll('.nav-item').forEach(button => button.classList.remove('active'));
  persist(); render(); $('.content-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function updateScenarioFlow() {
  const start = $('#start-category-flow');
  const panel = $('#category-flow');
  const activeSteps = scenarioFlow && view === 'category' && state.categories.includes(scenarioFlow.parent) ? scenarioSteps(scenarioFlow.parent) : [];
  const index = activeSteps.indexOf(category);
  if (index < 0) scenarioFlow = null;
  start.hidden = view !== 'category' || !scenarioSteps(category).length || Boolean(scenarioFlow);
  start.textContent = uiText('按步骤浏览');
  panel.hidden = !scenarioFlow;
  if (!scenarioFlow) return;
  $('#category-flow-scenario').textContent = categoryPath(scenarioFlow.parent);
  const locale = state.preferences.uiLanguage;
  $('#category-flow-step').textContent = locale === 'en' ? `(${index + 1} of ${activeSteps.length})` : locale === 'fr' ? `(${index + 1}/${activeSteps.length})` : `(第 ${index + 1}/${activeSteps.length} 步)`;
  const prevBtn = $('#category-flow-prev');
  const nextBtn = $('#category-flow-next');
  prevBtn.textContent = uiText('← 上一步');
  nextBtn.textContent = index === activeSteps.length - 1 ? uiText('完成流程') : uiText('下一步 →');
  $('#category-flow-exit').textContent = uiText('退出流程');
  prevBtn.disabled = index <= 0;
  nextBtn.disabled = false;

  const stepper = $('#category-flow-stepper');
  if (stepper) {
    stepper.innerHTML = activeSteps.map((stepName, stepIndex) => {
      const isPast = stepIndex < index;
      const isCurrent = stepIndex === index;
      const stateClass = isCurrent ? 'current' : isPast ? 'completed' : 'upcoming';
      const badgeIcon = isPast ? '✓' : String(stepIndex + 1);
      return `<button class="stepper-item ${stateClass}" type="button" data-flow-step-index="${stepIndex}" title="切换至第 ${stepIndex + 1} 步：${esc(stepName)}">
        <span class="stepper-badge">${badgeIcon}</span>
        <span class="stepper-name">${esc(stepName)}</span>
      </button>`;
    }).join('<span class="stepper-arrow">›</span>');
  }
}
function categoryContains(parent, name) {
  while (name) {
    if (name === parent) return true;
    name = state.categoryParents[name];
  }
  return false;
}
function toggleCategory(name) {
  state.collapsedCategories = state.collapsedCategories.includes(name)
    ? state.collapsedCategories.filter(entry => entry !== name)
    : [...state.collapsedCategories, name];
  persist(); renderCategories();
}
function openCategoryMove(name) {
  movingCategory = name;
  $('#category-parent-select').innerHTML = `<option value="">顶层分类</option>${state.categories.filter(candidate => candidate !== name && !categoryContains(name, candidate)).map(candidate => `<option value="${esc(candidate)}">${esc(categoryPath(candidate))}</option>`).join('')}`;
  $('#category-parent-select').value = state.categoryParents[name] || '';
  $('#category-move-dialog').showModal();
}
function openCategoryDelete(name) {
  const destinations = state.categories.filter(candidate => candidate !== name && !categoryContains(name, candidate));
  if (!destinations.length) return toast('请先在此分类之外创建一个分类');
  $('#category-delete-name').textContent = `删除“${categoryPath(name)}”后，它的素材和子分类会合并到所选分类。`;
  $('#category-delete-target').innerHTML = destinations.map(candidate => `<option value="${esc(candidate)}">${esc(categoryPath(candidate))}</option>`).join('');
  $('#category-delete-target').value = destinations.includes(state.categoryParents[name]) ? state.categoryParents[name] : destinations[0];
  $('#category-delete-dialog').dataset.category = name;
  $('#category-delete-dialog').showModal();
}
function openCategoryRemove(name) {
  $('#category-remove-dialog').dataset.category = name;
  $('#category-remove-name').textContent = `“${categoryPath(name)}”`;
  $('#category-remove-dialog').showModal();
}
function renderCategories() {
  const selectedCategory = $('#category-input').value;
  const counts = Object.fromEntries(state.categories.map(name => [name, 0]));
  state.items.forEach(item => {
    let name = item.category;
    while (name && counts[name] !== undefined) { counts[name]++; name = state.categoryParents[name]; }
  });
  const childrenOf = parent => state.categories.filter(name => (state.categoryParents[name] || '') === parent);
  const renderBranch = (parent = '', depth = 0) => childrenOf(parent).map(name => {
    const children = childrenOf(name);
    const collapsed = state.collapsedCategories.includes(name);
    const selected = category === name && view === 'category';
    const disclosure = children.length ? `<button class="category-icon-toggle ${collapsed ? 'collapsed' : ''}" data-toggle-category="${esc(name)}" aria-label="${collapsed ? '展开' : '收起'}" aria-expanded="${!collapsed}"></button>` : '';
    const customIcon = state.categoryIcons[name];
    const firstChar = name.trim().charAt(0).toUpperCase() || '▱';
    const folderIcon = customIcon
      ? `<span class="folder" data-set-category-icon="${esc(name)}" title="更改分类图标">${esc(customIcon)}</span>`
      : `<span class="folder folder-badge" data-set-category-icon="${esc(name)}" title="${esc(name)} (点击更改图标)">${esc(firstChar)}</span>`;
    const row = `<div class="category-row ${children.length ? 'has-children' : ''} ${selected ? 'selected' : ''}" data-category-row="${esc(name)}" style="margin-left:${depth * 20}px"><button class="category-button ${selected ? 'selected' : ''}" data-category="${esc(name)}" title="${esc(categoryPath(name))}" aria-label="${esc(categoryPath(name))}">${folderIcon}<span class="category-name" title="拖动调整同级顺序">${esc(name)}</span><span class="category-count">${counts[name]}</span></button>${disclosure}<div class="category-tools"><button class="category-child" data-create-child="${esc(name)}" title="新建子分类" aria-label="新建子分类">＋</button><details class="category-more-wrap"><summary class="category-more" title="更多操作" aria-label="更多操作">···</summary><div class="category-menu"><button type="button" data-category-menu="rename" data-category-name="${esc(name)}">重命名</button><button type="button" data-category-menu="icon" data-category-name="${esc(name)}">更改图标</button><button type="button" data-category-menu="move" data-category-name="${esc(name)}">移动到…</button><button type="button" data-category-menu="remove" data-category-name="${esc(name)}">删除分类</button><button type="button" data-category-menu="delete" data-category-name="${esc(name)}">删除并合并…</button></div></details></div></div>`;
    return row + (collapsed ? '' : renderBranch(name, depth + 1));
  }).join('');
  $('#categories').innerHTML = renderBranch();
  $('#categories').querySelectorAll('.category-more-wrap').forEach(menu => menu.addEventListener('toggle', () => {
    menu.closest('.category-row')?.classList.toggle('menu-open', menu.open);
  }));
  $('#category-input').innerHTML = `<option value="">未分类</option>${state.categories.map(name => `<option value="${esc(name)}">${esc(categoryPath(name))}</option>`).join('')}`;
  if (!selectedCategory || state.categories.includes(selectedCategory)) $('#category-input').value = selectedCategory;
  $('#all-count').textContent = state.items.length;
}
function renderSettingsPage() {
  $('#library-view').hidden = settingsOpen;
  $('#settings-page').hidden = !settingsOpen;
  if (!settingsOpen) return;
  document.querySelectorAll('[data-settings-section]').forEach(button => {
    const selected = button.dataset.settingsSection === settingsSection;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });
  document.querySelectorAll('[data-settings-panel]').forEach(panel => { panel.hidden = panel.dataset.settingsPanel !== settingsSection; });
  document.body.dataset.density = state.preferences.density;
  document.body.dataset.theme = state.preferences.theme;
  updateSidebarState();
  updateColorScheme();
  document.querySelectorAll('[data-density]').forEach(button => {
    const selected = button.dataset.density === state.preferences.density;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });
  document.querySelectorAll('[data-setting-language]').forEach(button => {
    const selected = button.dataset.settingLanguage === language;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
    if (button.dataset.settingLanguage === '0') button.textContent = state.languages[0];
    if (button.dataset.settingLanguage === '1') button.textContent = state.languages[1];
  });
  document.querySelectorAll('[data-theme-option]').forEach(button => {
    const selected = button.dataset.themeOption === state.preferences.theme;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', selected);
  });
  document.querySelectorAll('[data-ui-language]').forEach(button => {
    const selected = button.dataset.uiLanguage === state.preferences.uiLanguage;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  if (!$('#language-form').contains(document.activeElement)) {
    [0, 1].forEach(index => {
      const select = $(`#language-name-${index}`);
      const current = state.languages[index];
      select.replaceChildren(...[...new Set([current, ...LANGUAGE_OPTIONS])].map(name => {
        const option = document.createElement('option'); option.value = name; option.textContent = name;
        if (name === current && !LANGUAGE_OPTIONS.includes(name)) option.textContent += '（当前自定义名称）';
        return option;
      }));
      select.value = current;
    });
  }
  if (!$('#ai-settings-form').contains(document.activeElement)) {
    $('#ai-provider').value = state.preferences.aiProvider;
    $('#ai-base-url').value = state.preferences.aiBaseUrl;
    $('#ai-base-url-field').hidden = state.preferences.aiProvider !== 'custom';
    setAiModelOptions([state.preferences.aiModel], state.preferences.aiModel);
  }
  refreshAiKeyStatus();
  $('#settings-item-count').textContent = `${state.items.length} 条素材`;
  $('#settings-category-count').textContent = `${state.categories.length} 个分类`;
  $('#settings-image-count').textContent = `${new Set(state.items.flatMap(item => item.images || [])).size} 张图片`;
  localizeInterface();
}
function nativeInvoke(command, args) {
  const invoke = window.__TAURI__?.core?.invoke;
  if (!invoke) throw new Error('此功能需要在 ClipNest 桌面版中使用');
  return invoke(command, args);
}
function errorMessage(error, fallback) { return typeof error === 'string' ? error : error?.message || fallback; }
function setAiModelOptions(models, selected) {
  const select = $('#ai-model');
  select.replaceChildren(...[...new Set(models)].map(model => {
    const option = document.createElement('option'); option.value = model; option.textContent = model;
    return option;
  }));
  if ([...select.options].some(option => option.value === selected)) select.value = selected;
}
async function loadAvailableAiModels(quiet = false, baseUrl = $('#ai-base-url').value.trim(), provider = $('#ai-provider').value) {
  const button = $('#load-ai-models');
  if (!baseUrl) throw new Error('请先填写 Base URL');
  button.disabled = true; button.textContent = '加载中…';
  try {
    const models = await nativeInvoke('list_ai_models', { baseUrl });
    if (provider !== $('#ai-provider').value) return;
    const selected = models.includes($('#ai-model').value) ? $('#ai-model').value : models[0];
    setAiModelOptions(models, selected);
    if (!quiet) toast(`✓ 已加载 ${models.length} 个模型`);
  } catch (error) {
    if (!quiet) toast(errorMessage(error, '无法加载模型'));
    throw error;
  } finally { button.disabled = false; button.textContent = '加载模型'; }
}
async function refreshAiKeyStatus() {
  try {
    const saved = await nativeInvoke('has_ai_key');
    aiKeyConfigured = saved;
    $('#ai-key-status').innerHTML = `<span class="status-dot"></span>${saved ? 'API Key 已加密保存在本机' : '尚未保存 API Key'}`;
    $('#delete-ai-key').hidden = !saved;
  } catch {
    $('#ai-key-status').innerHTML = '<span class="status-dot"></span>桌面版中可保存 API Key';
    $('#delete-ai-key').hidden = true;
  }
  localizeInterface();
}
async function requestTranslation(text, source, target) {
  return nativeInvoke('translate_text', {
    baseUrl: state.preferences.aiBaseUrl,
    model: state.preferences.aiModel,
    sourceLanguage: state.languages[source],
    targetLanguage: state.languages[target],
    text
  });
}
function updateTranslationBatchStatus() {
  const batch = translationBatch;
  const panel = $('#translation-batch-status');
  panel.hidden = !batch;
  if (!batch) return;
  const remaining = batch.ids.length - batch.cursor;
  const progress = $('#translation-batch-progress');
  progress.max = batch.retrying ? batch.retryTotal || 1 : batch.ids.length || 1;
  progress.value = batch.retrying ? Math.max(0, (batch.retryIndex || 1) - 1) : batch.cursor;
  const counts = `已完成 ${batch.translated} · 失败 ${batch.failed.length} · 剩余 ${remaining}`;
  $('#translation-batch-title').textContent = batch.status === 'running'
    ? batch.retrying ? `正在重试 ${batch.retryIndex}/${batch.retryTotal}：${batch.currentTitle}` : `正在翻译：${batch.currentTitle || '准备中…'}`
    : batch.status === 'done' ? '批量翻译完成' : batch.cancelled ? '批量翻译已停止' : '批量翻译已暂停';
  $('#translation-batch-detail').textContent = batch.failed[0] ? `${counts}；${batch.failed[0].title}：${batch.failed[0].error}` : counts;
  $('#retry-translation-failures').hidden = !batch.failed.length || batch.status === 'running';
  $('#retry-translation-failures').textContent = `重试失败 ${batch.failed.length} 条`;
  $('#continue-translation-batch').hidden = !remaining || batch.status === 'running';
  $('#continue-translation-batch').textContent = `继续剩余 ${remaining} 条`;
  $('#stop-translation-batch').hidden = batch.status !== 'running';
  $('#stop-translation-batch').disabled = batch.cancelled;
  $('#stop-translation-batch').textContent = batch.cancelled ? '正在停止…' : '停止';
  $('#dismiss-translation-batch').hidden = batch.status === 'running';
  localizeInterface();
}
async function translateBatchItem(id) {
  const item = state.items.find(entry => entry.id === id);
  const source = item?.translations[0]?.trim();
  if (!item || item.hasSecondLanguage || !source) return 'skipped';
  const result = await requestTranslation(source, 0, 1);
  if (item.translations[1].trim() || item.translations[0].trim() !== source) return 'skipped';
  item.translations[1] = result;
  item.hasSecondLanguage = true;
  markEdited(item);
  if (!persist()) { item.translations[1] = ''; item.hasSecondLanguage = false; throw new Error('本机保存失败，已停止批量翻译'); }
  return 'translated';
}
async function continueTranslationBatch() {
  const batch = translationBatch;
  if (!batch || batch.status === 'running') return;
  batch.status = 'running'; batch.cancelled = false; batch.retrying = false;
  render();
  while (batch.cursor < batch.ids.length && !batch.cancelled) {
    const id = batch.ids[batch.cursor];
    const item = state.items.find(entry => entry.id === id);
    batch.currentTitle = item?.title || '未命名条目';
    render();
    try {
      const result = await translateBatchItem(id);
      if (result === 'translated') batch.translated++;
      else batch.skipped++;
      batch.cursor++;
    } catch (error) {
      batch.failed.push({ id, title: batch.currentTitle, error: errorMessage(error, '翻译失败') });
      batch.cursor++;
      break;
    }
    render();
  }
  batch.status = batch.cursor >= batch.ids.length && !batch.failed.length ? 'done' : 'paused';
  render();
}
function startTranslationBatch(ids) {
  translationBatch = { ids, cursor: 0, translated: 0, skipped: 0, failed: [], status: 'paused', cancelled: false };
  continueTranslationBatch();
}
async function retryTranslationFailures() {
  const batch = translationBatch;
  if (!batch || batch.status === 'running' || !batch.failed.length) return;
  const retry = batch.failed.splice(0);
  batch.status = 'running'; batch.cancelled = false; batch.retrying = true;
  batch.retryTotal = retry.length;
  render();
  for (let index = 0; index < retry.length; index++) {
    if (batch.cancelled) { batch.failed.push(...retry.slice(index)); break; }
    const entry = retry[index];
    const item = state.items.find(record => record.id === entry.id);
    batch.currentTitle = item?.title || entry.title;
    batch.retryIndex = index + 1;
    render();
    try {
      const result = await translateBatchItem(entry.id);
      if (result === 'translated') batch.translated++;
      else batch.skipped++;
    } catch (error) {
      batch.failed.push({ ...entry, error: errorMessage(error, '翻译失败') }, ...retry.slice(index + 1));
      break;
    }
    render();
  }
  batch.retrying = false;
  batch.status = batch.cursor >= batch.ids.length && !batch.failed.length ? 'done' : 'paused';
  render();
}
function updateDraftTranslationControls() {
  if ($('#editor').hidden) return;
  const values = [0, 1].map(index => richTextValue($(`#language-input-${index}`)).trim());
  const secondHidden = $('#second-language-field').hidden;
  $('[data-translate-draft="0"]').hidden = secondHidden || !values[1] || Boolean(values[0]);
  $('[data-translate-draft="1"]').hidden = secondHidden || !values[0] || Boolean(values[1]);
  $('#translate-add-language').hidden = !secondHidden || !values[0] || Boolean(values[1]);
  document.querySelectorAll('[data-translate-draft], #translate-add-language').forEach(button => {
    const target = button.id === 'translate-add-language' ? 1 : Number(button.dataset.translateDraft);
    button.textContent = aiKeyConfigured ? `AI 翻译为${state.languages[target]}` : '设置 AI 翻译';
  });
  localizeInterface();
}
function updateCardTranslationControls(card, item) {
  card?.querySelectorAll('[data-translation-target]').forEach(button => {
    const target = Number(button.dataset.translationTarget);
    button.hidden = !item.translations[1 - target]?.trim() || Boolean(item.translations[target]?.trim());
    button.dataset.action = aiKeyConfigured ? `translate-${target}` : 'configure-ai';
    button.textContent = aiKeyConfigured ? `AI 翻译为${button.dataset.translationName}` : '设置 AI 翻译';
  });
}
function render() {
  if (settingsOpen) { renderSettingsPage(); return; }
  $('#library-view').hidden = false;
  $('#settings-page').hidden = true;
  document.body.dataset.density = state.preferences.density;
  document.body.dataset.theme = state.preferences.theme;
  updateSidebarState();
  updateColorScheme();
  if (view === 'category' && !state.categories.includes(category)) view = 'all';
  renderCategories();
  const names = state.languages;
  document.querySelector('[data-language="0"]').textContent = names[0];
  document.querySelector('[data-language="1"]').textContent = names[1];
  $('#missing-language-name').textContent = names[1];
  const missingLanguageCount = state.items.filter(item => !item.hasSecondLanguage).length;
  $('#missing-language-count').textContent = missingLanguageCount;
  $('[data-filter="missing-second"]').disabled = missingLanguageCount === 0;
  document.querySelectorAll('[data-language]').forEach(button => button.classList.toggle('selected', button.dataset.language === language));
  $('#language-label-0').textContent = names[0];
  $('#language-label-1').textContent = names[1];
  $('#language-name-0').value = names[0];
  $('#language-name-1').value = names[1];

  const term = $('#search').value.trim().toLocaleLowerCase();
  const tags = [...new Set(state.items.flatMap(item => item.tags || []))].sort((a, b) => a.localeCompare(b, 'zh-CN'));
  if (!tags.includes(tagFilter)) tagFilter = '';
  $('#tag-filter').innerHTML = '<option value="">所有标签</option>' + tags.map(tag => `<option value="${esc(tag)}">#${esc(tag)}</option>`).join('');
  $('#tag-filter').value = tagFilter;
  document.querySelectorAll('.filter').forEach(button => button.classList.toggle('selected', button.dataset.filter === filter));
  const activeFilters = $('#active-filters');
  const filterLabels = [
    $('#search').value.trim() ? `关键词“${$('#search').value.trim()}”` : '',
    tagFilter ? `标签 #${tagFilter}` : '',
    filter === 'favorites' ? '收藏' : filter === 'missing-second' ? `待补${names[1]}` : '',
  ].filter(Boolean);
  activeFilters.hidden = !filterLabels.length;
  activeFilters.innerHTML = filterLabels.length
    ? `<span class="active-filters-label">筛选中</span>${$('#search').value.trim() ? `<button class="active-filter-chip" type="button" data-clear-filter="search" aria-label="清除关键词筛选">关键词：${esc($('#search').value.trim())}<span aria-hidden="true">×</span></button>` : ''}${tagFilter ? `<button class="active-filter-chip" type="button" data-clear-filter="tag" aria-label="清除标签筛选">#${esc(tagFilter)}<span aria-hidden="true">×</span></button>` : ''}${filter !== 'all' ? `<button class="active-filter-chip" type="button" data-clear-filter="filter" aria-label="清除${esc(filterLabels.at(-1))}筛选">${esc(filterLabels.at(-1))}<span aria-hidden="true">×</span></button>` : ''}<button class="clear-filters" id="clear-all-filters" type="button">清除全部</button>`
    : '';
  $('#sort-items').value = sortMode;
  const canInsertAfter = sortMode === 'manual' && !tagFilter && view !== 'recent' && view !== 'favorites' && filter === 'all' && !term;
  let items = state.items.filter(item =>
    (view !== 'favorites' || item.favorite) &&
    (view !== 'recent' || item.recent) &&
    (view !== 'category' || item.category === category || (includeDescendants && categoryContains(category, item.category))) &&
    (filter !== 'favorites' || item.favorite) &&
    (filter !== 'missing-second' || !item.hasSecondLanguage) &&
    (!tagFilter || (item.tags || []).includes(tagFilter)) &&
    (!term || [item.title, categoryPath(item.category), ...(item.translations || []), ...item.tags].join(' ').toLocaleLowerCase().includes(term))
  );
  if (editingItemId && !items.some(item => item.id === editingItemId)) {
    const editingItem = state.items.find(item => item.id === editingItemId);
    if (editingItem) items.push(editingItem);
  }
  if (sortMode === 'title') items.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN', { numeric: true, sensitivity: 'base' }));
  else if (sortMode === 'updated') items.sort((a, b) => b.updatedAt - a.updatedAt);
  else if (sortMode === 'popular') items.sort((a, b) => b.copied - a.copied);
  else if (view === 'recent') items.sort((a, b) => b.recent - a.recent);
  visibleItemIds = items.map(item => item.id);
  const batchButton = $('#batch-translate');
  const batchCandidates = items.filter(item => item.id !== editingItemId && !item.hasSecondLanguage && item.translations[0].trim());
  const batchRemaining = translationBatch ? translationBatch.ids.length - translationBatch.cursor : 0;
  batchButton.hidden = filter !== 'missing-second' && translationBatch?.status !== 'running';
  batchButton.disabled = translationBatch?.status === 'running' ? false : translationBatch?.status === 'paused' ? !batchRemaining && !translationBatch.failed.length : aiKeyConfigured && !batchCandidates.length;
  batchButton.textContent = translationBatch?.status === 'running' ? '停止翻译'
    : translationBatch?.status === 'paused' && batchRemaining ? `继续剩余 ${batchRemaining} 条`
      : translationBatch?.status === 'paused' && translationBatch.failed.length ? `重试失败 ${translationBatch.failed.length} 条`
        : aiKeyConfigured ? `全部翻译 ${batchCandidates.length} 条` : '设置 AI 翻译';
  updateTranslationBatchStatus();
  const selectionToolbar = $('#selection-toolbar');
  selectionToolbar.hidden = !selectionMode;
  $('#selection-mode').textContent = selectionMode ? '退出多选' : '多选';
  $('#selection-count').textContent = `已选 ${selectedItems.size} 项`;
  const selectedRecords = state.items.filter(item => selectedItems.has(item.id));
  $('#bulk-favorite').textContent = selectedRecords.length && selectedRecords.every(item => item.favorite) ? '取消收藏所选' : '收藏所选';
  $('#bulk-item-category').innerHTML = '<option value="">移动到分类…</option>' + state.categories.map(name => `<option value="${esc(name)}">${esc(categoryPath(name))}</option>`).join('');
  for (const button of selectionToolbar.querySelectorAll('button:not(#select-visible):not(#selection-done)')) button.disabled = !selectedItems.size;
  $('#select-visible').textContent = visibleItemIds.length && visibleItemIds.every(id => selectedItems.has(id)) ? '取消全选' : '全选当前';

  const title = view === 'category' ? category : view === 'favorites' ? '常用收藏' : view === 'recent' ? '最近复制' : '全部素材';
  $('#current-title').textContent = title;
  $('#page-title').textContent = title;
  $('#page-title').contentEditable = view === 'category';
  $('#page-title').title = view === 'category' ? '点击直接修改分类名称' : '';
  $('#category-title-icon').hidden = view !== 'category';
  $('#category-title-icon').textContent = view === 'category' ? state.categoryIcons[category] || '▱' : '';
  $('#category-title-icon').dataset.setCategoryIcon = view === 'category' ? category : '';
  const hasChildren = view === 'category' && state.categories.some(name => state.categoryParents[name] === category);
  $('#include-descendants').hidden = !hasChildren;
  $('#include-descendants').textContent = includeDescendants ? '仅本分类' : '包含子分类';
  $('#include-descendants').setAttribute('aria-pressed', String(includeDescendants));
  updateScenarioFlow();
  $('#page-subtitle').textContent = filter === 'missing-second' ? `仅显示尚未添加${names[1]}的内容。` : sortMode === 'updated' ? '按最近编辑时间排序。' : sortMode === 'title' ? '按标题排序，快速浏览内容。' : sortMode === 'popular' ? '按复制次数排序，优先显示高频内容。' : view === 'recent' ? '按最近复制时间排列，快速回到常用内容。' : view === 'favorites' ? '收藏常用素材，让高频内容触手可及。' : '常用内容，随时找到，立即复制。';
  $('#results').textContent = `${items.length} 条素材`;
  const cards = $('#cards');
  const editor = $('#editor');
  const focusedEditorField = editor.contains(document.activeElement) ? document.activeElement : null;
  if (editor.parentElement === cards) editor.remove();
  cards.className = `cards language-${language}`;
  cards.querySelectorAll('img').forEach(image => { URL.revokeObjectURL(image.src); objectUrls.delete(image.src); });
  cards.innerHTML = items.map(item => {
    if (item.id === editingItemId) return `<div class="editor-slot" data-editor-slot="${esc(item.id)}"></div>`;
    const collapsed = state.expanded.includes(item.id) ? '' : 'collapsed';
    const translationTarget = item.translations[0].trim() ? (item.translations[1].trim() ? -1 : 1) : (item.translations[1].trim() ? 0 : -1);
    const varMatches = [...(item.translations[0] || '').matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g), ...(item.translations[1] || '').matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)];
    const varNames = [...new Set(varMatches.map(m => m[1].trim()))];
    let copyButtonsHtml = '';
    if (language === '0') {
      copyButtonsHtml = `<button class="card-copy-pill" data-action="copy-0" title="复制 ${esc(names[0])}">复制 ${esc(names[0])}</button>`;
    } else if (language === '1') {
      const targetIdx = item.hasSecondLanguage ? 1 : 0;
      copyButtonsHtml = `<button class="card-copy-pill" data-action="copy-${targetIdx}" title="复制 ${esc(names[targetIdx])}">复制 ${esc(names[targetIdx])}</button>`;
    } else {
      if (item.hasSecondLanguage) {
        copyButtonsHtml = `<div class="card-copy-group"><button class="card-copy-pill" data-action="copy-0" title="复制 ${esc(names[0])}">${esc(names[0])}</button><button class="card-copy-pill" data-action="copy-1" title="复制 ${esc(names[1])}">${esc(names[1])}</button></div>`;
      } else {
        copyButtonsHtml = `<button class="card-copy-pill" data-action="copy-0" title="复制 ${esc(names[0])}">复制 ${esc(names[0])}</button>`;
      }
    }
    return `<article class="content-card ${collapsed} ${selectedItems.has(item.id) ? 'is-selected' : ''} ${item.hasSecondLanguage ? '' : 'single-language'}" data-id="${esc(item.id)}" tabindex="-1">
      ${canInsertAfter ? '<button class="drag-handle" type="button" title="拖动调整顺序" aria-label="拖动调整顺序">⠿</button>' : ''}
      ${selectionMode ? `<button class="select-item ${selectedItems.has(item.id) ? 'selected' : ''}" data-select-item="${esc(item.id)}" type="button" aria-label="${selectedItems.has(item.id) ? '取消选择' : '选择素材'}" aria-pressed="${selectedItems.has(item.id)}">${selectedItems.has(item.id) ? '✓' : ''}</button>` : ''}
      <div class="card-head"><button class="card-icon" data-action="icon" title="自定义图标；留空恢复默认" aria-label="自定义素材图标">${esc(item.icon || '▤')}</button><div><h2 class="card-title" data-inline-title title="双击或点击 ✎ 编辑">${highlight(item.title, term)}</h2><div class="card-meta">${esc(categoryPath(item.category))} · ${esc(names[0])}${item.hasSecondLanguage ? ` / ${esc(names[1])}` : ''}${item.copied ? ` · 已复制 ${item.copied} 次` : ''}${varNames.length ? `<span class="card-meta-var-badge" title="包含 ${varNames.length} 个变量：${esc(varNames.join(', '))}">⚡ ${varNames.length} 变量</span>` : ''}</div></div>
      <div class="card-actions"><button class="icon-button ${item.favorite ? 'favorite' : ''}" data-action="favorite" title="收藏" aria-label="收藏">${item.favorite ? '★' : '☆'}</button><button class="icon-button" data-action="edit" title="编辑素材" aria-label="编辑">✎</button>${copyButtonsHtml}<details class="card-more-wrap"><summary class="icon-button card-more" aria-label="更多操作" title="更多操作">···</summary><div class="card-more-menu">${canInsertAfter ? '<button type="button" data-action="insert-after">在此后新建</button>' : ''}<button type="button" data-action="clone">克隆</button>${item.hasSecondLanguage ? '' : `<button type="button" data-action="add-language">手动添加${esc(names[1])}</button>`}${translationTarget >= 0 ? `<button type="button" data-translation-target="${translationTarget}" data-translation-name="${esc(names[translationTarget])}" data-action="${aiKeyConfigured ? `translate-${translationTarget}` : 'configure-ai'}">${aiKeyConfigured ? `AI 翻译为${esc(names[translationTarget])}` : '设置 AI 翻译'}</button>` : ''}<button type="button" data-action="add-image">添加图片</button><button type="button" class="danger-action" data-action="delete-item">删除</button></div></details><button class="card-toggle" data-action="toggle" aria-label="${collapsed ? '展开' : '收起'}" aria-expanded="${!collapsed}" title="${collapsed ? '展开' : '收起'}"></button></div></div>
      <div class="card-body">${[0, 1].filter(index => index === 0 || item.hasSecondLanguage).map(index => `<section class="language-block" data-lang="${index}"><div class="language-head"><span>${esc(names[index])}</span><div class="language-tools"><button class="text-button translate-button" data-translation-target="${index}" data-translation-name="${esc(names[index])}" data-action="${aiKeyConfigured ? `translate-${index}` : 'configure-ai'}" ${!item.translations[index].trim() && item.translations[1 - index].trim() ? '' : 'hidden'}>${aiKeyConfigured ? 'AI 翻译' : '设置 AI'}</button><button class="copy-button" data-action="copy-${index}" title="复制${esc(names[index])}">复制</button>${index === 1 ? '<button class="remove-language" data-action="remove-language" title="移除语言 2" aria-label="移除语言 2">×</button>' : ''}</div></div><p class="language-text" data-inline-edit="${index}" aria-label="${esc(names[index])} 内容" title="双击或点击 ✎ 编辑">${highlight(item.translations[index], term)}</p></section>`).join('')}</div>
      ${item.images.length ? `<div class="card-images">${item.images.map(id => `<div class="card-image-wrap"><img class="card-image" data-image-id="${esc(id)}" data-action="preview-image" alt="素材图片"><button class="remove-card-image" type="button" data-action="remove-image" data-image-id="${esc(id)}" aria-label="删除这张图片" title="删除图片">×</button></div>`).join('')}</div>` : ''}
      ${item.tags.length ? `<footer class="card-foot">${item.tags.map(tag => `<button class="tag" type="button" data-tag-filter="${esc(tag)}" aria-label="筛选标签 ${esc(tag)}">#${esc(tag)}</button>`).join('')}</footer>` : ''}
    </article>`;
  }).join('');
  cards.querySelectorAll('[data-translation-target]').forEach(button => { button.disabled = Boolean(translationBatch); });
  const editorSlot = editingItemId && cards.querySelector(`[data-editor-slot="${CSS.escape(editingItemId)}"]`);
  if (editorSlot) editorSlot.replaceWith(editor);
  else cards.before(editor);
  if (focusedEditorField) focusedEditorField.focus({ preventScroll: true });
  hydrateCardImages();

  const empty = $('#empty');
  if (items.length) { empty.hidden = true; localizeInterface(); return; }
  empty.hidden = false;
  if (!state.categories.length) {
    empty.innerHTML = `<span>＋</span><h2>先创建一个分类</h2><p>分类由你自己创建，之后可在这里添加素材。</p><button class="button primary" id="empty-category">＋ 新建分类</button>`;
  } else if (filterLabels.length) {
    empty.innerHTML = `<span>⌕</span><h2>没有符合条件的素材</h2><p>当前条件：${filterLabels.map(esc).join(' · ')}</p><button class="button" id="empty-clear-filters" type="button">清除筛选</button>`;
  } else {
    empty.innerHTML = `<span>⌕</span><h2>没有找到素材</h2><p>试试其他关键词，或新建一条内容。</p><button class="button primary" id="empty-new">＋ 新建素材</button>`;
  }
  localizeInterface();
}
function applyTemplate(content, values) {
  return content.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (match, name) => values[name.trim()] ?? match);
}
function promptTemplateValues(variables, initialValues = {}, scenario = false, preview = '') {
  const dialog = $('#template-dialog');
  const fields = $('#template-fields');
  fields.replaceChildren(...variables.map(name => {
    const label = document.createElement('label'); label.className = 'field-label'; label.textContent = name;
    const input = document.createElement('input'); input.required = true; input.dataset.variable = name; input.value = initialValues[name] ?? '';
    label.append(input); return label;
  }));
  const title = dialog.querySelector('.dialog-head h2');
  const note = dialog.querySelector('.category-delete-note');
  const submit = dialog.querySelector('.dialog-actions .primary');
  const previewLabel = $('#template-preview').closest('label');
  title.textContent = uiText(scenario ? '填写场景变量' : '填写话术内容');
  note.textContent = uiText(scenario ? '开始场景前填写一次，后续步骤会自动复用。' : '请填写每个变量后再复制；原素材不会改变。');
  submit.textContent = uiText(scenario ? '开始浏览' : '复制内容');
  previewLabel.hidden = scenario;
  $('#template-preview').textContent = preview;
  pendingTemplate = scenario ? null : { content: preview, variables };
  return new Promise(resolve => {
    dialog.returnValue = '';
    dialog.addEventListener('close', () => {
      const values = Object.fromEntries([...fields.querySelectorAll('input')].map(input => [input.dataset.variable, input.value]));
      resolve(dialog.returnValue === 'copy' ? values : null);
      title.textContent = uiText('填写话术内容');
      note.textContent = uiText('请填写每个变量后再复制；原素材不会改变。');
      submit.textContent = uiText('复制内容');
      previewLabel.hidden = false;
      pendingTemplate = null;
    }, { once: true });
    dialog.showModal(); fields.querySelector('input')?.focus();
  });
}
async function fillTemplate(content, variables) {
  const values = await promptTemplateValues(variables, {}, false, content);
  return values ? applyTemplate(content, values) : null;
}
function clipboardContent(content) {
  const bold = /\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;
  let plain = '', html = '', cursor = 0, match;
  const addText = text => {
    plain += text;
    html += esc(text).replace(/\r?\n/g, '<br>');
  };
  while ((match = bold.exec(content))) {
    addText(content.slice(cursor, match.index));
    const value = match[1] ?? match[2];
    plain += `**${value}**`;
    html += `<strong>${esc(value)}</strong>`;
    cursor = bold.lastIndex;
  }
  addText(content.slice(cursor));
  return { plain, html };
}
async function copyItem(item, index) {
  let content = item.translations[index] || '';
  const variables = [...new Set([...content.matchAll(/\{\{\s*([^{}]+?)\s*\}\}/g)].map(match => match[1].trim()).filter(Boolean))];
  if (variables.length) {
    if (scenarioFlow) {
      const missing = variables.filter(name => !Object.hasOwn(scenarioFlow.values, name));
      if (missing.length) {
        const values = await promptTemplateValues(missing, {}, false, content);
        if (!values) return;
        Object.assign(scenarioFlow.values, values);
      }
      content = applyTemplate(content, scenarioFlow.values);
    } else {
      content = await fillTemplate(content, variables);
      if (content === null) return;
    }
  }
  const clipboard = clipboardContent(content);
  try {
    if (navigator.clipboard?.write && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({
        'text/plain': new Blob([clipboard.plain], { type: 'text/plain' }),
        'text/html': new Blob([clipboard.html], { type: 'text/html' })
      })]);
    } else await navigator.clipboard.writeText(clipboard.plain);
  }
  catch {
    const area = document.createElement('textarea');
    area.value = clipboard.plain;
    document.body.append(area); area.select(); document.execCommand('copy'); area.remove();
  }
  item.copied++;
  item.recent = Date.now();
  persist();
  const card = $(`.content-card[data-id="${CSS.escape(item.id)}"]`);
  const meta = card?.querySelector('.card-meta');
  if (meta) meta.textContent = `${categoryPath(item.category)} · ${state.languages[0]}${item.hasSecondLanguage ? ` / ${state.languages[1]}` : ''} · 已复制 ${item.copied} 次`;
  if (view === 'recent' && !['title', 'updated', 'popular'].includes(sortMode) && card) {
    const firstCard = $('#cards').querySelector('.content-card');
    if (firstCard && firstCard !== card) firstCard.before(card);
  }
  toast(`✓ 已复制${state.languages[index]}`);
  if (scenarioFlow && $('#flow-auto-next')?.checked) {
    const activeSteps = scenarioSteps(scenarioFlow.parent);
    const curIdx = activeSteps.indexOf(category);
    if (curIdx >= 0 && curIdx < activeSteps.length - 1) {
      setTimeout(() => {
        goToScenarioStep(curIdx + 1);
        toast(`✓ 已复制 · 自动切换至第 ${curIdx + 2} 步`);
      }, 350);
    }
  }
}
function applyQuickPaste(value) {
  const lines = value.split(/\r?\n/);
  const titleIndex = lines.findIndex(line => line.trim());
  if (titleIndex < 0) return;
  $('#title-input').innerHTML = highlight(lines[titleIndex].trim(), '');
  const content = lines.slice(titleIndex + 1);
  const separator = content.findIndex(line => line.trim() === '---');
  if (separator >= 0) {
    $('#language-input-0').innerHTML = highlight(content.slice(0, separator).join('\n').trim(), '');
    $('#language-input-1').innerHTML = highlight(content.slice(separator + 1).join('\n').trim(), '');
    showSecondLanguage(true);
    return;
  }
  const secondLanguage = content.findIndex(line => line.trim().toLocaleLowerCase() === state.languages[1].toLocaleLowerCase());
  const firstLanguage = content.findIndex(line => line.trim().toLocaleLowerCase() === state.languages[0].toLocaleLowerCase());
  if (firstLanguage >= 0 && secondLanguage > firstLanguage) {
    $('#language-input-0').innerHTML = highlight(content.slice(firstLanguage + 1, secondLanguage).join('\n').trim(), '');
    $('#language-input-1').innerHTML = highlight(content.slice(secondLanguage + 1).join('\n').trim(), '');
    showSecondLanguage(true);
  } else {
    const header = content.findIndex(line => line.trim().toLocaleLowerCase() === state.languages[0].toLocaleLowerCase());
    const start = header >= 0 ? header + 1 : 0;
    $('#language-input-0').innerHTML = highlight(content.slice(start).join('\n').trim(), '');
    $('#language-input-1').textContent = '';
    showSecondLanguage(false);
  }
}
function parseBulk(value) {
  return value.split(/^[ \t]*={3,}[ \t]*$/m).map(block => {
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
function renderBulkPreview() {
  const items = parseBulk($('#bulk-input').value);
  $('#bulk-count').textContent = items.length ? `识别到 ${items.length} 条素材` : '粘贴内容后显示识别结果';
  $('#bulk-preview-list').innerHTML = items.slice(0, 6).map(item => `<span class="bulk-preview-item">${esc(item.title)}${item.hasSecondLanguage ? ` · ${esc(state.languages[1])}` : ''}</span>`).join('') + (items.length > 6 ? `<span class="bulk-preview-item">还有 ${items.length - 6} 条…</span>` : '');
  $('#bulk-import').disabled = !items.length;
}
function openBulkEditor() {
  if (!state.categories.length) return toast('请先创建分类');
  if (!$('#editor').hidden) closeEditor();
  const selected = view === 'category' ? category : state.lastCategory;
  $('#bulk-category').innerHTML = state.categories.map(name => `<option value="${esc(name)}">${esc(name)}</option>`).join('');
  $('#bulk-category').value = state.categories.includes(selected) ? selected : state.categories[0];
  $('#bulk-editor').hidden = false;
  renderBulkPreview();
  $('#bulk-editor').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#bulk-input').focus({ preventScroll: true });
}
function importBulk() {
  const entries = parseBulk($('#bulk-input').value);
  const targetCategory = $('#bulk-category').value;
  if (!entries.length || !state.categories.includes(targetCategory)) return;
  const items = entries.map(entry => ({
    ...entry, id: crypto.randomUUID(), category: targetCategory, tags: [], images: [], icon: '', favorite: false, copied: 0, recent: 0, updatedAt: Date.now()
  }));
  state.items.push(...items);
  state.lastCategory = targetCategory;
  view = 'category'; category = targetCategory; filter = 'all';
  document.querySelectorAll('.nav-item').forEach(button => button.classList.remove('active'));
  document.querySelectorAll('.filter').forEach(button => button.classList.toggle('selected', button.dataset.filter === 'all'));
  persist();
  $('#bulk-input').value = '';
  $('#bulk-editor').hidden = true;
  render();
  toast(`✓ 已导入 ${items.length} 条素材`);
}
function showSecondLanguage(show) {
  $('#second-language-field').hidden = !show;
  $('#add-second-language').hidden = show;
  $('#translate-add-language').hidden = show;
  $('#content-form').classList.toggle('has-second-language', show);
}
function openEditor(item, insertAfterId = '') {
  if (!item && !state.categories.length) return toast('请先创建分类');
  if (!$('#editor').hidden) closeEditor();
  const isNew = !item;
  pendingInsertAfterId = item ? '' : insertAfterId;
  $('#bulk-editor').hidden = true;
  $('#content-form').reset();
  const insertCategory = state.items.find(entry => entry.id === pendingInsertAfterId)?.category;
  const targetCategory = item ? item.category : insertAfterId ? (insertCategory ?? '') : (view === 'category' ? category : state.lastCategory || state.categories[0] || '');
  if (!item) {
    item = { id: crypto.randomUUID(), title: '', category: targetCategory, translations: ['', ''], hasSecondLanguage: false, tags: [], images: [], icon: '', favorite: false, copied: 0, recent: 0, updatedAt: Date.now() };
    const anchorIndex = state.items.findIndex(entry => entry.id === pendingInsertAfterId);
    if (anchorIndex < 0) state.items.push(item);
    else state.items.splice(anchorIndex + 1, 0, item);
    pendingInsertAfterId = '';
  }
  editingItemId = item.id;
  state.expanded = [...new Set([...state.expanded, item.id])];
  $('#item-id').value = item.id;
  $('#dialog-title').textContent = isNew ? '新素材' : '编辑素材';
  $('#title-input').innerHTML = highlight(item.title || '', '');
  $('#category-input').value = item ? item.category : targetCategory;
  $('#language-input-0').innerHTML = highlight(item.translations[0] || '', '');
  $('#language-input-1').innerHTML = highlight(item.translations[1] || '', '');
  showSecondLanguage(Boolean(item?.hasSecondLanguage));
  $('#tags-input').value = (item?.tags || []).join(', ');
  originalImages = [...(item?.images || [])];
  draftImages = [...originalImages];
  renderDraftImages();
  $('#save-status').textContent = isNew ? '输入即自动保存' : '编辑内容会自动保存';
  $('#editor').hidden = false;
  render();
  updateDraftTranslationControls();
  $('#editor').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#title-input').focus({ preventScroll: true });
}
function closeEditor() {
  const itemId = $('#item-id').value;
  const item = state.items.find(entry => entry.id === itemId);
  if (item) {
    syncDraft(); clearTimeout(draftSaveTimer);
    const hasContent = Boolean((item.title || '').trim() || item.translations.some(text => String(text || '').trim()) || item.tags.length || item.images.length);
    if (hasContent) item.title ||= '未命名素材';
    else state.items = state.items.filter(entry => entry.id !== itemId);
    persist();
  }
  draftImages = []; originalImages = [];
  $('#editor').hidden = true;
  editingItemId = '';
  pendingInsertAfterId = '';
  $('#content-form').reset();
  render();
}

$('#settings-page').addEventListener('click', event => {
  const settingsTab = event.target.closest('[data-settings-section]');
  const settingsBack = event.target.closest('#settings-back');
  const densityOption = event.target.closest('[data-density]');
  const colorSchemeOption = event.target.closest('[data-color-scheme-option]');
  const themeOption = event.target.closest('[data-theme-option]');
  const languageOption = event.target.closest('[data-setting-language]');
  const uiLanguageOption = event.target.closest('[data-ui-language]');
  if (!settingsTab && !settingsBack && !densityOption && !colorSchemeOption && !themeOption && !languageOption && !uiLanguageOption) return;
  event.stopPropagation();
  if (settingsBack) { settingsOpen = false; render(); return; }
  if (settingsTab) {
    settingsSection = settingsTab.dataset.settingsSection;
    renderSettingsPage();
    if (settingsSection === 'data') renderVersionList();
    return;
  }
  if (colorSchemeOption) {
    state.preferences.colorScheme = colorSchemeOption.dataset.colorSchemeOption;
    persist();
    updateColorScheme();
    return;
  }
  if (densityOption) state.preferences.density = densityOption.dataset.density;
  if (themeOption) state.preferences.theme = themeOption.dataset.themeOption;
  if (languageOption) language = languageOption.dataset.settingLanguage;
  if (uiLanguageOption) state.preferences.uiLanguage = uiLanguageOption.dataset.uiLanguage;
  persist();
  renderSettingsPage();
});

$('#batch-translate-dialog').addEventListener('close', () => {
  const ids = pendingBatchTranslationIds;
  pendingBatchTranslationIds = [];
  if ($('#batch-translate-dialog').returnValue === 'start') startTranslationBatch(ids);
});

document.addEventListener('dblclick', event => {
  const target = event.target.closest('.card-title, .language-text');
  if (!target) return;
  const card = target.closest('.content-card');
  if (!card) return;
  const item = state.items.find(entry => entry.id === card.dataset.id);
  if (item) openEditor(item);
});

$('#sidebar-toggle').addEventListener('click', event => {
  event.preventDefault();
  event.stopPropagation();
  ignoreCategoryClick = false;
  setSidebarCollapsed(!state.preferences.sidebarCollapsed);
});

document.addEventListener('click', async event => {
  if (ignoreCategoryClick) { ignoreCategoryClick = false; event.preventDefault(); return; }
  if (event.target.closest('.search') && state.preferences.sidebarCollapsed) setSidebarCollapsed(false);
  if (event.target.closest('#theme-toggle')) {
    const isCurrentlyDark = document.body.dataset.colorScheme === 'dark';
    state.preferences.colorScheme = isCurrentlyDark ? 'light' : 'dark';
    persist();
    updateColorScheme();
    toast(state.preferences.colorScheme === 'dark' ? '已开启深色模式' : '已切换浅色模式');
    return;
  }
  if (event.target.closest('#settings-button')) { settingsOpen = true; settingsSection = 'general'; render(); return; }
  if (event.target.closest('#retry-translation-failures')) { retryTranslationFailures(); return; }
  if (event.target.closest('#continue-translation-batch')) { continueTranslationBatch(); return; }
  if (event.target.closest('#stop-translation-batch')) { if (translationBatch) { translationBatch.cancelled = true; updateTranslationBatchStatus(); } return; }
  if (event.target.closest('#dismiss-translation-batch')) { if (translationBatch?.status !== 'running') { translationBatch = null; render(); } return; }
  if (event.target.closest('#batch-translate')) {
    if (translationBatch?.status === 'running') { translationBatch.cancelled = true; updateTranslationBatchStatus(); return; }
    if (translationBatch?.status === 'paused') {
      if (translationBatch.cursor < translationBatch.ids.length) continueTranslationBatch();
      else retryTranslationFailures();
      return;
    }
    if (translationBatch?.status === 'done') translationBatch = null;
    if (!aiKeyConfigured) { settingsOpen = true; settingsSection = 'ai'; render(); return; }
    if (!$('#editor').hidden) return toast('请先保存或关闭正在编辑的条目');
    pendingBatchTranslationIds = visibleItemIds.filter(id => {
      const item = state.items.find(entry => entry.id === id);
      return id !== editingItemId && item && !item.hasSecondLanguage && item.translations[0].trim();
    });
    if (!pendingBatchTranslationIds.length) return toast('当前没有可翻译的内容');
    $('#batch-translate-note').textContent = `将按当前列表筛选条件，逐条把 ${pendingBatchTranslationIds.length} 条内容翻译为${state.languages[1]}并自动保存。可在过程中停止；AI 服务可能按用量计费。`;
    $('#batch-translate-dialog').showModal(); return;
  }
  if (event.target.closest('#selection-mode')) { selectionMode = !selectionMode; if (!selectionMode) selectedItems.clear(); render(); return; }
  if (event.target.closest('#include-descendants')) { includeDescendants = !includeDescendants; render(); return; }
  if (event.target.closest('#start-category-flow')) { beginScenarioFlow(); return; }
  if (event.target.closest('#category-flow-prev')) { goToScenarioStep(scenarioSteps(scenarioFlow?.parent).indexOf(category) - 1); return; }
  if (event.target.closest('#category-flow-next')) {
    const steps = scenarioSteps(scenarioFlow?.parent);
    const curIdx = steps.indexOf(category);
    if (curIdx >= steps.length - 1) {
      scenarioFlow = null;
      render();
      toast('🎯 场景流程已全部完成！');
      return;
    }
    goToScenarioStep(curIdx + 1);
    return;
  }
  if (event.target.closest('#category-flow-exit')) { scenarioFlow = null; render(); return; }
  const flowStep = event.target.closest('[data-flow-step-index]');
  if (flowStep) {
    const stepIdx = Number(flowStep.dataset.flowStepIndex);
    goToScenarioStep(stepIdx);
    return;
  }
  const clearFilter = event.target.closest('[data-clear-filter]');
  if (clearFilter) {
    if (clearFilter.dataset.clearFilter === 'search') $('#search').value = '';
    if (clearFilter.dataset.clearFilter === 'tag') { tagFilter = ''; $('#tag-filter').value = ''; }
    if (clearFilter.dataset.clearFilter === 'filter') filter = 'all';
    render(); return;
  }
  if (event.target.closest('#clear-all-filters, #empty-clear-filters')) {
    $('#search').value = ''; tagFilter = ''; filter = 'all'; render(); return;
  }
  const tagChip = event.target.closest('[data-tag-filter]');
  if (tagChip) { tagFilter = tagChip.dataset.tagFilter; render(); return; }
  const selectItem = event.target.closest('[data-select-item]');
  if (selectItem) { const id = selectItem.dataset.selectItem; selectedItems.has(id) ? selectedItems.delete(id) : selectedItems.add(id); render(); return; }
  if (event.target.closest('#selection-done')) { selectionMode = false; selectedItems.clear(); render(); return; }
  if (event.target.closest('#select-visible')) {
    const allSelected = visibleItemIds.length && visibleItemIds.every(id => selectedItems.has(id));
    visibleItemIds.forEach(id => allSelected ? selectedItems.delete(id) : selectedItems.add(id)); render(); return;
  }
  if (event.target.closest('#bulk-favorite')) {
    const chosen = state.items.filter(item => selectedItems.has(item.id));
    const value = !chosen.every(item => item.favorite);
    chosen.forEach(item => { item.favorite = value; markEdited(item); }); persist(); render(); return;
  }
  if (event.target.closest('#bulk-add-tags')) {
    const value = await askInput('批量添加标签', '', '用逗号分隔');
    if (value === null) return;
    const tags = value.split(',').map(tag => tag.trim()).filter(Boolean);
    state.items.filter(item => selectedItems.has(item.id)).forEach(item => { item.tags = [...new Set([...item.tags, ...tags])]; markEdited(item); });
    persist(); render(); if (tags.length) toast('✓ 标签已添加'); return;
  }
  if (event.target.closest('#bulk-delete')) {
    const count = state.items.filter(item => selectedItems.has(item.id)).length;
    deleteTargetIds = state.items.filter(item => selectedItems.has(item.id)).map(item => item.id);
    $('#bulk-delete-title').textContent = '删除所选素材？';
    $('#bulk-delete-note').textContent = `将删除 ${count} 条素材；图片仅在没有其他素材引用时一并清理。`;
    $('#bulk-delete-dialog').showModal(); return;
  }
  const nav = event.target.closest('[data-view]');
  if (nav) {
    settingsOpen = false;
    scenarioFlow = null; view = nav.dataset.view; category = '';
    document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', button === nav));
    render();
  }
  const categoryButton = event.target.closest('[data-category]');
  const categoryDisclosure = event.target.closest('[data-toggle-category]');
  if (categoryDisclosure && !categoryDisclosure.classList.contains('empty')) { toggleCategory(categoryDisclosure.dataset.toggleCategory); return; }
  const childCategory = event.target.closest('[data-create-child]');
  if (childCategory) { await createCategory(childCategory.dataset.createChild); return; }
  const categoryMenuAction = event.target.closest('[data-category-menu]');
  if (categoryMenuAction) {
    const name = categoryMenuAction.dataset.categoryName;
    categoryMenuAction.closest('.category-more-wrap').open = false;
    if (categoryMenuAction.dataset.categoryMenu === 'rename') {
      const renamed = await askInput('修改分类名称', name);
      if (renamed !== null) renameCategory(name, renamed);
    } else if (categoryMenuAction.dataset.categoryMenu === 'icon') openIconPicker(categoryMenuAction, 'category', name);
    else if (categoryMenuAction.dataset.categoryMenu === 'move') openCategoryMove(name);
    else if (categoryMenuAction.dataset.categoryMenu === 'remove') openCategoryRemove(name);
    else openCategoryDelete(name);
    return;
  }
  const categoryIcon = event.target.closest('[data-set-category-icon]');
  if (categoryIcon?.dataset.setCategoryIcon && (!state.preferences.sidebarCollapsed || !categoryIcon.closest('.category-button'))) { openIconPicker(categoryIcon, 'category', categoryIcon.dataset.setCategoryIcon); return; }
  if (categoryButton) { scenarioFlow = null; settingsOpen = false; view = 'category'; category = categoryButton.dataset.category; includeDescendants = false; state.lastCategory = category; persist(); document.querySelectorAll('.nav-item').forEach(button => button.classList.remove('active')); render(); }
  const languageButton = event.target.closest('[data-language]');
  if (languageButton) {
    language = languageButton.dataset.language;
    document.querySelectorAll('[data-language]').forEach(button => button.classList.toggle('selected', button === languageButton));
    persist(); render();
  }
  const draftTranslate = event.target.closest('[data-translate-draft], #translate-add-language');
  if (draftTranslate) {
    if (!aiKeyConfigured) { settingsOpen = true; settingsSection = 'ai'; render(); return; }
    const target = draftTranslate.id === 'translate-add-language' ? 1 : Number(draftTranslate.dataset.translateDraft);
    const source = 1 - target;
    if (target === 1 && $('#second-language-field').hidden) showSecondLanguage(true);
    syncDraft();
    const sourceText = richTextValue($(`#language-input-${source}`)).trim();
    if (!sourceText || richTextValue($(`#language-input-${target}`)).trim()) return;
    draftTranslate.disabled = true;
    const oldLabel = draftTranslate.textContent;
    draftTranslate.textContent = '翻译中…';
    try {
      const translation = await requestTranslation(sourceText, source, target);
      $(`#language-input-${target}`).innerHTML = highlight(translation, '');
      syncDraft(); toast(`✓ 已翻译为${state.languages[target]}`);
    } catch (error) { toast(errorMessage(error, '翻译失败')); }
    finally { if (draftTranslate.isConnected) { draftTranslate.disabled = false; draftTranslate.textContent = oldLabel; updateDraftTranslationControls(); } }
    return;
  }
  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) { filter = filterButton.dataset.filter; document.querySelectorAll('.filter').forEach(button => button.classList.toggle('selected', button === filterButton)); render(); }
  const action = event.target.closest('[data-action]');
  if (action) {
    action.closest('.card-more-wrap')?.removeAttribute('open');
    const item = state.items.find(entry => entry.id === action.closest('[data-id]')?.dataset.id);
    if (action.dataset.action === 'configure-ai') { settingsOpen = true; settingsSection = 'ai'; render(); return; }
    if (item && action.dataset.action.startsWith('translate-')) {
      const target = Number(action.dataset.action.slice(-1)), source = 1 - target;
      if (!item.translations[source]?.trim() || item.translations[target]?.trim()) return;
      const oldLabel = action.textContent;
      action.disabled = true; action.textContent = '翻译中…';
      try {
        const translation = await requestTranslation(item.translations[source], source, target);
        item.translations[target] = translation;
        if (target === 1) item.hasSecondLanguage = true;
        markEdited(item); persist(); render(); toast(`✓ 已翻译为${state.languages[target]}`);
      } catch (error) { action.disabled = false; action.textContent = oldLabel; toast(errorMessage(error, '翻译失败')); }
      return;
    }
    if (item && action.dataset.action === 'clone') {
      const clone = { ...item, id: crypto.randomUUID(), title: `${item.title || '未命名素材'}（副本）`, translations: [...item.translations], tags: [...item.tags], images: [...item.images], copied: 0, recent: 0, updatedAt: Date.now() };
      state.items.splice(state.items.indexOf(item) + 1, 0, clone);
      if (state.expanded.includes(item.id)) state.expanded.push(clone.id);
      persist(); render(); toast('✓ 已克隆到原素材后面', () => {
        state.items = state.items.filter(entry => entry.id !== clone.id);
        state.expanded = state.expanded.filter(id => id !== clone.id);
        persist(); render(); toast('✓ 已撤销克隆');
      }, 5000);
      return;
    }
    if (item && action.dataset.action === 'toggle') {
      state.expanded = state.expanded.includes(item.id) ? state.expanded.filter(id => id !== item.id) : [...state.expanded, item.id];
      persist(); render();
    }
    if (item && action.dataset.action === 'favorite') { item.favorite = !item.favorite; markEdited(item); persist(); render(); }
    if (item && action.dataset.action === 'edit') {
      openEditor(item);
      return;
    }
    if (item && action.dataset.action === 'insert-after') { openEditor(null, item.id); return; }
    if (item && action.dataset.action === 'delete-item') {
      deleteTargetIds = [item.id];
      $('#bulk-delete-title').textContent = '删除这条素材？';
      $('#bulk-delete-note').textContent = `将删除“${item.title}”及其未被其他素材引用的图片。`;
      $('#bulk-delete-dialog').showModal(); return;
    }
    if (item && action.dataset.action === 'add-language') {
      item.hasSecondLanguage = true; markEdited(item); persist();
      openEditor(item);
      return;
    }
    if (item && action.dataset.action === 'remove-language') {
      if (item.translations[1].trim()) { pendingLanguageRemovalId = item.id; $('#remove-language-dialog').showModal(); }
      else removeSecondLanguage(item);
    }
    if (item && action.dataset.action === 'add-image') { imageTargetId = item.id; $('#image-input').click(); }
    if (item && action.dataset.action === 'icon') openIconPicker(action, 'item', item.id);
    if (action.dataset.action === 'preview-image') { openImagePreview(action.dataset.imageId, item?.id || action.dataset.itemId || ''); return; }
    if (item && action.dataset.action === 'remove-image') {
      const imageId = action.dataset.imageId;
      const imageIndex = item.images.indexOf(imageId);
      if (imageIndex < 0) return;
      item.images = item.images.filter(id => id !== imageId);
      markEdited(item);
      persist(); render();
      const cleanup = setTimeout(() => {
        if (!state.items.some(entry => entry.images.includes(imageId))) removeImages([imageId]).catch(() => {});
      }, 5000);
      toast('图片已移除', () => {
        clearTimeout(cleanup);
        const current = state.items.find(entry => entry.id === item.id);
        if (current && !current.images.includes(imageId)) { current.images.splice(Math.min(imageIndex, current.images.length), 0, imageId); markEdited(current); }
        persist(); render(); toast('✓ 已撤销移除图片');
      }, 5000);
    }
    if (item && action.dataset.action === 'copy-quick') copyItem(item, language === '1' && item.hasSecondLanguage ? 1 : 0);
    else if (item && action.dataset.action.startsWith('copy-')) copyItem(item, Number(action.dataset.action.slice(-1)));
  }
  if (event.target.closest('#image-picker')) { imageTargetId = ''; $('#image-input').click(); }
  if (event.target.closest('#finish-content')) closeEditor();
  if (event.target.closest('#new-content, #empty-new')) openEditor();
  if (event.target.closest('#bulk-content')) openBulkEditor();
  if (event.target.closest('#close-bulk')) $('#bulk-editor').hidden = true;
  if (event.target.closest('#bulk-import')) importBulk();
  if (event.target.closest('#add-category, #empty-category')) await createCategory();
  if (event.target.closest('#input-dialog-icon')) { openIconPicker($('#input-dialog-icon'), 'new-category', ''); return; }
  if (event.target.closest('#export-data')) exportBackup();
  if (event.target.closest('#import-data')) $('#backup-file').click();
  if (event.target.closest('#expand-all')) {
    const ids = [...document.querySelectorAll('.content-card')].map(card => card.dataset.id);
    const allOpen = ids.every(id => state.expanded.includes(id));
    state.expanded = allOpen ? state.expanded.filter(id => !ids.includes(id)) : [...new Set([...state.expanded, ...ids])];
    persist(); render();
    $('#expand-all').innerHTML = `全部${allOpen ? '展开' : '收起'} <span class="expand-chevron ${allOpen ? '' : 'up'}" aria-hidden="true"></span>`;
  }
});
$('#bulk-item-category').addEventListener('change', event => {
  const destination = event.target.value;
  if (!destination || !state.categories.includes(destination)) return;
  const moved = state.items.filter(item => selectedItems.has(item.id)).map(item => [item.id, item.category]);
  state.items.filter(item => selectedItems.has(item.id)).forEach(item => { item.category = destination; markEdited(item); });
  state.lastCategory = destination; event.target.value = ''; persist(); render();
  toast(`已移动 ${moved.length} 条素材`, () => {
    moved.forEach(([id, previous]) => { const item = state.items.find(entry => entry.id === id); if (item) { item.category = previous; markEdited(item); } });
    persist(); render(); toast('✓ 已撤销移动');
  }, 5000);
});
$('#bulk-delete-form').addEventListener('submit', event => {
  if (pendingVersionRestoreId) {
    event.preventDefault();
    const id = pendingVersionRestoreId;
    $('#bulk-delete-dialog').close('restore');
    restoreVersion(id);
    return;
  }
  if (pendingBackup) {
    event.preventDefault();
    const backup = pendingBackup;
    $('#bulk-delete-dialog').close('import');
    importBackup(backup);
    return;
  }
  if (event.submitter?.value !== 'delete') return;
  event.preventDefault();
  deleteItemsWithUndo(deleteTargetIds);
  deleteTargetIds = [];
  $('#bulk-delete-dialog').close();
});
$('#bulk-delete-dialog').addEventListener('close', () => {
  pendingBackup = null;
  pendingVersionRestoreId = '';
  $('#bulk-delete-title').textContent = '删除所选素材？';
  $('#bulk-delete-note').textContent = '';
  $('#bulk-delete-confirm').textContent = '删除';
  $('#bulk-delete-confirm').classList.add('danger');
});
$('#remove-language-form').addEventListener('submit', event => {
  if (event.submitter?.value !== 'remove') return;
  event.preventDefault();
  if (pendingDraftLanguageRemoval) {
    removeDraftSecondLanguage();
    pendingDraftLanguageRemoval = false;
    $('#remove-language-dialog').close();
    return;
  }
  const item = state.items.find(entry => entry.id === pendingLanguageRemovalId);
  if (item) removeSecondLanguage(item);
  pendingLanguageRemovalId = ''; $('#remove-language-dialog').close();
});
function removeSecondLanguage(item) {
  const previous = item.translations[1];
  item.hasSecondLanguage = false; item.translations[1] = ''; markEdited(item);
  persist(); render();
  toast('已移除语言 2', () => {
    const current = state.items.find(entry => entry.id === item.id);
    if (current) { current.hasSecondLanguage = true; current.translations[1] = previous; markEdited(current); }
    persist(); render(); toast('✓ 已撤销移除语言 2');
  }, 5000);
}
async function exportBackup() {
  try {
    const ids = [...new Set(state.items.flatMap(item => item.images))];
    const images = [];
    for (const id of ids) { const blob = await getImage(id); if (blob) images.push({ id, data: await blobAsDataUrl(blob) }); }
    const file = new Blob([JSON.stringify({ ...state, images }, null, 2)], { type: 'application/json' });
    const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(file), download: 'clipnest-backup.json' });
    link.click(); setTimeout(() => URL.revokeObjectURL(link.href), 1000); toast('✓ 备份已导出');
  } catch { toast('备份导出失败'); }
}
async function importBackup(raw) {
  const previousState = state, previousLanguage = language;
  const oldImages = [...new Set(state.items.flatMap(item => item.images || []))];
  const imageIds = new Map((raw.images || []).map(image => [image.id, crypto.randomUUID()]));
  try {
    await saveVersion('导入前自动恢复点');
    for (const image of raw.images || []) await storeImage(await (await fetch(image.data)).blob(), imageIds.get(image.id));
    const data = normalize(raw);
    data.items.forEach(item => { item.images = item.images.map(id => imageIds.get(id)).filter(Boolean); });
    state = data; language = state.languageMode;
    if (!persist()) throw new Error('Storage write failed');
    if (pendingDeleteUndo) {
      clearTimeout(pendingDeleteUndo.timer); cleanupPendingDeleteImages(pendingDeleteUndo); pendingDeleteUndo = null;
    }
    render();
    const cleanup = setTimeout(() => removeImages(oldImages).catch(() => {}), 5000);
    toast('备份已导入', () => {
      clearTimeout(cleanup); state = previousState; language = previousLanguage;
      persist(); render(); removeImages([...imageIds.values()]).catch(() => {}); toast('✓ 已撤销备份导入');
    }, 5000);
  } catch {
    state = previousState; language = previousLanguage; persist(); render();
    await removeImages([...imageIds.values()]).catch(() => {});
    toast('备份导入失败，原有资料已保留');
  }
}
async function renderVersionList() {
  const list = $('#version-list');
  try {
    const versions = await listVersions();
    if (!versions.length) { list.innerHTML = '<div class="version-empty">还没有恢复点</div>'; localizeInterface(); return; }
    list.replaceChildren(...versions.map(version => {
      const row = document.createElement('div'); row.className = 'version-row';
      const meta = document.createElement('span'); meta.className = 'version-meta';
      const title = document.createElement('strong'); title.textContent = version.label;
      const detail = document.createElement('small');
      detail.textContent = `${new Date(version.createdAt).toLocaleString()} · ${version.data.items.length} 条素材 · ${(version.imageIds || []).length} 张图片`;
      meta.append(title, detail);
      const button = document.createElement('button'); button.className = 'button'; button.type = 'button'; button.textContent = '恢复';
      button.dataset.restoreVersion = version.id;
      row.append(meta, button); return row;
    }));
    localizeInterface();
  } catch { list.innerHTML = '<div class="version-empty">无法读取本地版本</div>'; localizeInterface(); }
}
async function restoreVersion(id) {
  const version = await getVersion(id).catch(() => null);
  if (!version) return toast('找不到这个恢复点');
  const previousState = state, previousLanguage = language;
  const oldImageIds = [...new Set(state.items.flatMap(item => item.images || []))];
  try {
    await saveVersion('恢复前自动恢复点');
    const restored = normalize(version.data);
    const availableImages = new Set((await Promise.all((version.imageIds || []).map(async id => await getImage(id).then(blob => blob ? id : null).catch(() => null)))).filter(Boolean));
    restored.items.forEach(item => { item.images = item.images.filter(id => availableImages.has(id)); });
    state = restored; language = state.languageMode;
    if (!persist()) throw new Error('Storage write failed');
    render(); await removeImages(oldImageIds); toast('✓ 版本已恢复，恢复前资料也已留档');
  } catch {
    state = previousState; language = previousLanguage; persist(); render();
    toast('恢复失败，当前资料已保留');
  }
  renderVersionList();
}
$('#search').addEventListener('input', render);
$('#tag-filter').addEventListener('change', event => { tagFilter = event.target.value; render(); });
$('#sort-items').addEventListener('change', event => { sortMode = event.target.value; render(); });
$('#bulk-input').addEventListener('input', renderBulkPreview);
$('#create-version').addEventListener('click', async () => {
  const button = $('#create-version'); button.disabled = true;
  try { await saveVersion(); await renderVersionList(); toast('✓ 已创建本地恢复点'); }
  catch { toast('创建恢复点失败，请检查存储空间'); }
  button.disabled = false;
});
$('#version-list').addEventListener('click', event => {
  const button = event.target.closest('[data-restore-version]');
  if (!button) return;
  pendingVersionRestoreId = button.dataset.restoreVersion;
  $('#bulk-delete-title').textContent = '恢复这个本地版本？';
  $('#bulk-delete-note').textContent = '当前资料会先自动保存为一个恢复点，之后仍可切回。';
  $('#bulk-delete-confirm').textContent = '恢复版本';
  $('#bulk-delete-confirm').classList.remove('danger');
  $('#bulk-delete-dialog').showModal();
});
$('#template-fields').addEventListener('input', () => {
  if (!pendingTemplate) return;
  const values = Object.fromEntries([...$('#template-fields').querySelectorAll('input')].map(input => [input.dataset.variable, input.value]));
  $('#template-preview').textContent = applyTemplate(pendingTemplate.content, values);
});
$('#template-form').addEventListener('submit', event => {
  if (event.submitter?.value === 'cancel') return;
  if (event.submitter?.value !== 'copy') { event.preventDefault(); return; }
  event.preventDefault();
  const firstEmpty = [...$('#template-fields').querySelectorAll('input')].find(input => !input.value.trim());
  if (firstEmpty) { firstEmpty.focus(); return; }
  $('#template-dialog').close('copy');
});
$('#input-dialog-form').addEventListener('click', event => {
  if (event.target.closest('[data-input-cancel]')) $('#input-dialog').close('cancel');
});
$('#icon-picker-search').addEventListener('input', renderIconPicker);
$('#icon-picker').addEventListener('click', event => {
  const tab = event.target.closest('[data-icon-tab]');
  if (tab) { iconPickerTab = tab.dataset.iconTab; renderIconPicker(); return; }
  if (event.target.closest('#reset-picked-icon')) { applyPickedIcon(''); return; }
  const choice = event.target.closest('[data-icon-value]');
  if (choice) applyPickedIcon(choice.dataset.iconValue);
});
document.addEventListener('pointerdown', event => {
  if (!$('#icon-picker').hidden && !$('#icon-picker').contains(event.target)) closeIconPicker();
  document.querySelectorAll('.category-more-wrap[open]').forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
  document.querySelectorAll('.card-more-wrap[open]').forEach(menu => { if (!menu.contains(event.target)) menu.open = false; });
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !$('#icon-picker').hidden) closeIconPicker();
});
$('#page-title').addEventListener('focus', () => {
  if (view === 'category') $('#page-title').dataset.originalCategory = category;
});
$('#page-title').addEventListener('blur', () => {
  if (view !== 'category') return;
  const oldName = $('#page-title').dataset.originalCategory || category;
  const name = $('#page-title').innerText.trim();
  if (!name) { $('#page-title').textContent = oldName; return; }
  if (name !== oldName && !renameCategory(oldName, name)) $('#page-title').textContent = oldName;
});
$('#page-title').addEventListener('keydown', event => {
  if (event.key === 'Enter') { event.preventDefault(); $('#page-title').blur(); }
  if (event.key === 'Escape') {
    event.preventDefault(); $('#page-title').textContent = $('#page-title').dataset.originalCategory || category; $('#page-title').blur();
  }
});
let inlineSaveTimer;
let draftSaveTimer;
const textEditStarts = new WeakMap();
document.addEventListener('input', event => {
  const field = event.target.closest('[data-inline-edit], [data-inline-title]');
  if (field) {
    clearTimeout(inlineSaveTimer);
    inlineSaveTimer = setTimeout(() => saveInlineText(field), 250);
  } else if (!$('#editor').hidden && $('#editor').contains(event.target)) syncDraft();
});
document.addEventListener('focusin', event => {
  const field = event.target.closest('[data-inline-edit], [data-inline-title], #title-input, #language-input-0, #language-input-1');
  if (field) textEditStarts.set(field, textSnapshot(field));
});
document.addEventListener('focusout', event => {
  const field = event.target.closest('[data-inline-edit], [data-inline-title], #title-input, #language-input-0, #language-input-1');
  if (!field) return;
  const before = textEditStarts.get(field);
  textEditStarts.delete(field);
  if (field.hasAttribute('data-inline-edit') || field.hasAttribute('data-inline-title')) {
    clearTimeout(inlineSaveTimer); saveInlineText(field);
  } else {
    syncDraft(); clearTimeout(draftSaveTimer);
    $('#save-status').textContent = persist() ? '已自动保存' : '保存失败，请先导出备份';
  }
  const after = textSnapshot(field);
  if (before && after && before.value !== after.value) {
    toast('文字修改已保存', () => undoTextEdit(before, after), 5000);
  }
});
function textSnapshot(field) {
  const itemId = field.closest('[data-id]')?.dataset.id || (field.closest('#editor') ? $('#item-id').value : '');
  const item = state.items.find(entry => entry.id === itemId);
  if (!item) return null;
  const index = field.hasAttribute('data-inline-edit') ? Number(field.dataset.inlineEdit) : Number(/^language-input-(\d)$/.exec(field.id)?.[1]);
  const key = field.hasAttribute('data-inline-title') || field.id === 'title-input' ? 'title' : `translation-${index}`;
  return { itemId, key, value: key === 'title' ? item.title : item.translations[index] };
}
function undoTextEdit(before, after) {
  const item = state.items.find(entry => entry.id === after.itemId);
  const index = Number(after.key.slice(-1));
  if (!item || (after.key === 'title' ? item.title : item.translations[index]) !== after.value) return toast('内容已有新的修改，未撤销');
  if (after.key === 'title') item.title = before.value;
  else item.translations[index] = before.value;
  markEdited(item); persist(); render();
  if (editingItemId === item.id) {
    const field = after.key === 'title' ? $('#title-input') : $(`#language-input-${index}`);
    if (field) field.innerHTML = highlight(before.value, '');
  }
  toast('✓ 已撤销文字修改');
}
function saveInlineText(field) {
  const item = state.items.find(entry => entry.id === field.closest('[data-id]')?.dataset.id);
  if (!item) return;
  if (field.hasAttribute('data-inline-title')) item.title = richTextValue(field).trim() || item.title;
  else item.translations[Number(field.dataset.inlineEdit)] = richTextValue(field);
  markEdited(item);
  persist();
  updateCardTranslationControls(field.closest('[data-id]'), item);
}
$('#title-input').addEventListener('paste', event => {
  const text = event.clipboardData?.getData('text/plain') || '';
  if (!text.includes('\n') && !text.includes('\r')) return;
  event.preventDefault(); applyQuickPaste(text); syncDraft();
});
document.addEventListener('paste', event => {
  if (event.defaultPrevented) return;
  const field = event.target.closest?.('[data-inline-edit], [data-inline-title], #title-input, #language-input-0, #language-input-1');
  const text = event.clipboardData?.getData('text/plain') || '';
  if (!field || !/\*[^*\n]+\*/.test(text)) return;
  const selection = getSelection();
  if (!selection?.rangeCount || !field.contains(selection.anchorNode)) return;
  event.preventDefault();
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const template = document.createElement('template');
  template.innerHTML = highlight(text, '');
  const fragment = template.content;
  const lastNode = fragment.lastChild;
  range.insertNode(fragment);
  if (lastNode) range.setStartAfter(lastNode);
  range.collapse(true);
  selection.removeAllRanges(); selection.addRange(range);
  field.dispatchEvent(new Event('input', { bubbles: true }));
});
$('#title-input').addEventListener('keydown', event => {
  if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); $('#language-input-0').focus(); }
});
$('#editor').addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') { event.preventDefault(); closeEditor(); }
});
$('#category-input').addEventListener('change', syncDraft);
$('#category-move-form').addEventListener('submit', event => {
  if (event.submitter?.id !== 'category-move-save') return;
  event.preventDefault();
  let parent = $('#category-parent-select').value;
  if (parent === movingCategory || (parent && categoryContains(movingCategory, parent))) return toast('不能移动到自身或其子分类中');
  if (parent) state.categoryParents[movingCategory] = parent;
  else delete state.categoryParents[movingCategory];
  while (parent) {
    state.collapsedCategories = state.collapsedCategories.filter(name => name !== parent);
    parent = state.categoryParents[parent];
  }
  persist(); render(); $('#category-move-dialog').close(); toast('✓ 分类位置已更新');
});
$('#category-remove-form').addEventListener('submit', event => {
  if (event.submitter?.id !== 'category-remove-confirm') return;
  event.preventDefault();
  const removed = $('#category-remove-dialog').dataset.category;
  if (!state.categories.includes(removed)) return;
  const parent = state.categoryParents[removed] || '';
  const previous = {
    categories: [...state.categories], categoryParents: { ...state.categoryParents }, categoryIcons: { ...state.categoryIcons },
    collapsedCategories: [...state.collapsedCategories], itemCategories: state.items.map(item => [item.id, item.category]),
    category, lastCategory: state.lastCategory, view
  };
  state.items.forEach(item => { if (item.category === removed) { item.category = ''; markEdited(item); } });
  for (const child of state.categories) if (state.categoryParents[child] === removed) {
    if (parent) state.categoryParents[child] = parent;
    else delete state.categoryParents[child];
  }
  state.categories = state.categories.filter(name => name !== removed);
  delete state.categoryParents[removed]; delete state.categoryIcons[removed];
  state.collapsedCategories = state.collapsedCategories.filter(name => name !== removed && name !== parent);
  if (category === removed) {
    if (parent) category = parent;
    else { category = ''; view = 'all'; }
  }
  if (state.lastCategory === removed) state.lastCategory = parent || state.categories[0] || '';
  let ancestor = parent;
  while (ancestor) { state.collapsedCategories = state.collapsedCategories.filter(name => name !== ancestor); ancestor = state.categoryParents[ancestor]; }
  document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', view !== 'category' && button.dataset.view === view));
  scenarioFlow = null;
  persist(); render(); $('#category-remove-dialog').close();
  toast('分类已删除，素材已保留', () => {
    state.categories = previous.categories; state.categoryParents = previous.categoryParents;
    state.categoryIcons = previous.categoryIcons; state.collapsedCategories = previous.collapsedCategories;
    previous.itemCategories.forEach(([id, name]) => { const item = state.items.find(entry => entry.id === id); if (item) { item.category = name; markEdited(item); } });
    category = previous.category; state.lastCategory = previous.lastCategory; view = previous.view;
    document.querySelectorAll('.nav-item').forEach(button => button.classList.toggle('active', view !== 'category' && button.dataset.view === view));
    persist(); render(); toast('✓ 已撤销删除分类');
  }, 5000);
});
$('#category-delete-form').addEventListener('submit', event => {
  if (event.submitter?.id !== 'category-delete-confirm') return;
  event.preventDefault();
  const removed = $('#category-delete-dialog').dataset.category;
  const destination = $('#category-delete-target').value;
  if (!state.categories.includes(removed) || !state.categories.includes(destination) || categoryContains(removed, destination)) return toast('请选择有效的合并分类');
  const previous = {
    categories: [...state.categories], categoryParents: { ...state.categoryParents }, categoryIcons: { ...state.categoryIcons },
    collapsedCategories: [...state.collapsedCategories], itemCategories: state.items.map(item => [item.id, item.category]),
    category, lastCategory: state.lastCategory
  };
  state.items.forEach(item => { if (item.category === removed) { item.category = destination; markEdited(item); } });
  for (const child of state.categories) if (state.categoryParents[child] === removed) state.categoryParents[child] = destination;
  state.categories = state.categories.filter(name => name !== removed);
  delete state.categoryParents[removed]; delete state.categoryIcons[removed];
  state.collapsedCategories = state.collapsedCategories.filter(name => name !== removed && name !== destination);
  if (category === removed) category = destination;
  if (state.lastCategory === removed) state.lastCategory = destination;
  let parent = destination;
  while (parent) { state.collapsedCategories = state.collapsedCategories.filter(name => name !== parent); parent = state.categoryParents[parent]; }
  persist(); render(); $('#category-delete-dialog').close();
  toast('已合并并删除分类', () => {
    state.categories = previous.categories; state.categoryParents = previous.categoryParents;
    state.categoryIcons = previous.categoryIcons; state.collapsedCategories = previous.collapsedCategories;
    previous.itemCategories.forEach(([id, name]) => { const item = state.items.find(entry => entry.id === id); if (item) { item.category = name; markEdited(item); } });
    category = previous.category; state.lastCategory = previous.lastCategory;
    persist(); render(); toast('✓ 已撤销分类合并');
  }, 5000);
});
$('#add-second-language').addEventListener('click', () => { showSecondLanguage(true); $('#language-input-1').focus(); syncDraft(); });
function removeDraftSecondLanguage() {
  const itemId = editingItemId;
  const previous = richTextValue($('#language-input-1'));
  $('#language-input-1').textContent = '';
  showSecondLanguage(false);
  syncDraft();
  toast('已移除语言 2', () => {
    const item = state.items.find(entry => entry.id === itemId);
    if (item) { item.hasSecondLanguage = true; item.translations[1] = previous; }
    if (!$('#editor').hidden && $('#item-id').value === itemId) {
      $('#language-input-1').innerHTML = highlight(previous, ''); showSecondLanguage(true); syncDraft();
    } else { persist(); render(); }
    toast('✓ 已撤销移除语言 2');
  }, 5000);
}
$('#remove-draft-language').addEventListener('click', () => {
  if (richTextValue($('#language-input-1')).trim()) {
    pendingDraftLanguageRemoval = true;
    $('#remove-language-dialog').showModal();
  } else {
    removeDraftSecondLanguage();
  }
});
$('#remove-language-dialog').addEventListener('close', () => { pendingDraftLanguageRemoval = false; pendingLanguageRemovalId = ''; });
function syncDraft() {
  if ($('#editor').hidden) return;
  const idField = $('#item-id');
  const title = richTextValue($('#title-input')).trim();
  const translations = [richTextValue($('#language-input-0')), richTextValue($('#language-input-1'))];
  const tags = $('#tags-input').value.split(',').map(tag => tag.trim()).filter(Boolean);
  let item = state.items.find(entry => entry.id === idField.value);
  if (!item) return;
  if (!item.title && !title && !translations.some(text => text.trim()) && !tags.length && !draftImages.length) return;
  markEdited(item);
  item.title = title || item.title;
  item.category = $('#category-input').value;
  item.translations = translations;
  item.hasSecondLanguage = !$('#second-language-field').hidden || Boolean(translations[1].trim());
  updateDraftTranslationControls();
  item.tags = tags;
  const removedImages = item.images.filter(id => !draftImages.includes(id));
  item.images = [...draftImages];
  state.lastCategory = item.category;
  $('#all-count').textContent = state.items.length;
  $('#save-status').textContent = '保存中…';
  clearTimeout(draftSaveTimer);
  draftSaveTimer = setTimeout(() => { $('#save-status').textContent = persist() ? '已自动保存' : '保存失败，请先导出备份'; }, 250);
  removeImages(removedImages).catch(() => {});
}
$('#content-form').addEventListener('submit', event => event.preventDefault());
$('#image-input').addEventListener('change', event => {
  const item = state.items.find(entry => entry.id === imageTargetId);
  imageTargetId = '';
  filesToImages(event.target.files, item); event.target.value = '';
});
$('#editor').addEventListener('dragover', event => { event.preventDefault(); $('#editor').classList.add('dragging'); });
$('#editor').addEventListener('dragleave', event => { if (!$('#editor').contains(event.relatedTarget)) $('#editor').classList.remove('dragging'); });
$('#editor').addEventListener('paste', event => {
  const files = [...(event.clipboardData?.items || [])].filter(item => item.type.startsWith('image/')).map(item => item.getAsFile()).filter(Boolean);
  if (files.length) { event.preventDefault(); filesToImages(files); }
});
document.addEventListener('pointerdown', event => {
  const handle = event.target.closest('.drag-handle');
  const card = handle?.closest('.content-card[data-id]');
  if (!card || event.button !== 0) return;
  reorderDrag = { id: card.dataset.id, x: event.clientX, y: event.clientY, active: false };
});
document.addEventListener('pointermove', event => {
  if (!reorderDrag) return;
  if (!reorderDrag.active && Math.hypot(event.clientX - reorderDrag.x, event.clientY - reorderDrag.y) < 5) return;
  reorderDrag.active = true;
  event.preventDefault();
  document.querySelector(`[data-id="${reorderDrag.id}"]`)?.classList.add('dragging');
  document.querySelectorAll('.drop-target').forEach(card => card.classList.remove('drop-target', 'drop-before', 'drop-after'));
  document.querySelectorAll('.item-drop-target').forEach(row => row.classList.remove('item-drop-target'));
  const underPointer = document.elementFromPoint(event.clientX, event.clientY);
  const categoryTarget = underPointer?.closest('[data-category-row]');
  const target = underPointer?.closest('.content-card[data-id]');
  if (categoryTarget) categoryTarget.classList.add('item-drop-target');
  if (target && target.dataset.id !== reorderDrag.id) {
    target.classList.add('drop-target', event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2 ? 'drop-after' : 'drop-before');
    reorderDrag.targetId = target.dataset.id;
  } else reorderDrag.targetId = '';
}, { passive: false });
document.addEventListener('pointerup', event => {
  if (!reorderDrag) return;
  const { id, active } = reorderDrag;
  const underPointer = document.elementFromPoint(event.clientX, event.clientY);
  const categoryName = underPointer?.closest('[data-category-row]')?.dataset.categoryRow || '';
  const targetId = underPointer?.closest('.content-card[data-id]')?.dataset.id || reorderDrag.targetId;
  document.querySelectorAll('.content-card').forEach(card => card.classList.remove('dragging', 'drop-target', 'drop-before', 'drop-after'));
  document.querySelectorAll('.item-drop-target').forEach(row => row.classList.remove('item-drop-target'));
  reorderDrag = null;
  if (!active) return;
  if (categoryName) {
    const item = state.items.find(entry => entry.id === id);
    if (item && state.categories.includes(categoryName) && item.category !== categoryName) {
      const previousCategory = item.category;
      item.category = categoryName; markEdited(item);
      persist(); render();
      toast(`已移动到 ${categoryPath(categoryName)}`, () => {
        const current = state.items.find(entry => entry.id === item.id);
        if (current) { current.category = previousCategory; markEdited(current); }
        persist(); render(); toast('✓ 已撤销移动');
      }, 5000);
    }
    return;
  }
  if (!targetId || id === targetId) return;
  const from = state.items.findIndex(item => item.id === id);
  if (from < 0) return;
  const [item] = state.items.splice(from, 1);
  const targetIndex = state.items.findIndex(entry => entry.id === targetId);
  if (targetIndex < 0) { state.items.splice(from, 0, item); return; }
  const target = [...document.querySelectorAll('.content-card')].find(card => card.dataset.id === targetId);
  const after = target && event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
  state.items.splice(targetIndex + (after ? 1 : 0), 0, item);
  persist(); render();
});
document.addEventListener('pointercancel', () => {
  reorderDrag = null;
  document.querySelectorAll('.content-card').forEach(card => card.classList.remove('dragging', 'drop-target', 'drop-before', 'drop-after'));
  document.querySelectorAll('.item-drop-target').forEach(row => row.classList.remove('item-drop-target'));
});
document.addEventListener('dragover', event => {
  if ([...(event.dataTransfer?.types || [])].includes('Files')) event.preventDefault();
});
document.addEventListener('drop', event => {
  const files = event.dataTransfer?.files;
  const card = event.target.closest('.content-card[data-id]');
  if (!files?.length) return;
  event.preventDefault();
  $('#editor').classList.remove('dragging');
  const item = card && state.items.find(entry => entry.id === card.dataset.id);
  if (item) filesToImages(files, item);
  else if (!$('#editor').hidden) filesToImages(files);
});
document.addEventListener('click', event => {
  const card = event.target.closest?.('.content-card[data-id]');
  if (card && !event.target.closest('button, a, input, select, [contenteditable="true"]')) card.focus({ preventScroll: true });
});
document.addEventListener('paste', event => {
  if (event.defaultPrevented) return;
  const card = event.target.closest?.('.content-card[data-id]');
  const files = [...(event.clipboardData?.items || [])].filter(item => item.type.startsWith('image/')).map(item => item.getAsFile()).filter(Boolean);
  const target = card && state.items.find(item => item.id === card.dataset.id);
  if (!files.length || !target) return;
  event.preventDefault(); filesToImages(files, target);
});
document.addEventListener('pointerdown', event => {
  const label = event.target.closest('.category-name');
  const row = label?.closest('[data-category-row]');
  if (!row || event.button !== 0) return;
  categoryReorder = { name: row.dataset.categoryRow, x: event.clientX, y: event.clientY, active: false };
});
document.addEventListener('pointermove', event => {
  if (!categoryReorder) return;
  if (!categoryReorder.active && Math.hypot(event.clientX - categoryReorder.x, event.clientY - categoryReorder.y) < 5) return;
  categoryReorder.active = true;
  event.preventDefault();
  document.querySelectorAll('.category-row').forEach(row => row.classList.remove('category-dragging', 'category-drop-before', 'category-drop-after'));
  const source = [...document.querySelectorAll('[data-category-row]')].find(row => row.dataset.categoryRow === categoryReorder.name);
  source?.classList.add('category-dragging');
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-category-row]');
  if (target && target.dataset.categoryRow !== categoryReorder.name && (state.categoryParents[target.dataset.categoryRow] || '') === (state.categoryParents[categoryReorder.name] || '')) {
    const after = event.clientY > target.getBoundingClientRect().top + target.offsetHeight / 2;
    target.classList.add(after ? 'category-drop-after' : 'category-drop-before');
    categoryReorder.targetName = target.dataset.categoryRow;
    categoryReorder.after = after;
  } else categoryReorder.targetName = '';
}, { passive: false });
document.addEventListener('pointerup', event => {
  if (!categoryReorder) return;
  const drag = categoryReorder;
  const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-category-row]');
  document.querySelectorAll('.category-row').forEach(row => row.classList.remove('category-dragging', 'category-drop-before', 'category-drop-after'));
  categoryReorder = null;
  if (!drag.active) return;
  ignoreCategoryClick = true; setTimeout(() => { ignoreCategoryClick = false; }, 0);
  const targetName = target?.dataset.categoryRow || drag.targetName;
  if (!targetName || targetName === drag.name || (state.categoryParents[targetName] || '') !== (state.categoryParents[drag.name] || '')) return;
  const siblings = state.categories.filter(name => (state.categoryParents[name] || '') === (state.categoryParents[drag.name] || ''));
  const from = siblings.indexOf(drag.name);
  const to = siblings.indexOf(targetName);
  if (from < 0 || to < 0) return;
  siblings.splice(from, 1);
  siblings.splice(to + (drag.after ? 1 : 0) - (from < to ? 1 : 0), 0, drag.name);
  let index = 0;
  state.categories = state.categories.map(name => (state.categoryParents[name] || '') === (state.categoryParents[drag.name] || '') ? siblings[index++] : name);
  persist(); renderCategories();
});
document.addEventListener('pointercancel', () => {
  categoryReorder = null;
  document.querySelectorAll('.category-row').forEach(row => row.classList.remove('category-dragging', 'category-drop-before', 'category-drop-after'));
});
document.querySelectorAll('#cancel-content, #cancel-content-bottom').forEach(button => button.addEventListener('click', () => closeEditor()));
document.addEventListener('contextmenu', event => {
  event.preventDefault();
  const image = event.target.closest('img[data-image-id]');
  if (image) openImageContextMenu(event, image);
});
$('#image-context-menu').addEventListener('click', async event => {
  const button = event.target.closest('[data-image-menu-action]');
  if (!button || !imageContextTarget) return;
  event.preventDefault(); event.stopPropagation();
  const image = imageContextTarget;
  const imageId = image.dataset.imageId;
  const itemId = image.dataset.itemId || image.closest('.content-card')?.dataset.id || '';
  closeImageContextMenu();
  if (button.dataset.imageMenuAction === 'preview') { await openImagePreview(imageId, itemId); return; }
  try {
    const blob = await getImage(imageId);
    if (!blob) throw new Error('Image is missing');
    if (button.dataset.imageMenuAction === 'copy') {
      await copyImageToClipboard(imageId);
      toast('✓ 图片已复制');
    } else if (button.dataset.imageMenuAction === 'download') {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const extension = ({ 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif', 'image/bmp': 'bmp' })[blob.type] || 'img';
      link.href = url; link.download = `clipnest-image.${extension}`; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast('✓ 已下载图片');
    } else if (button.dataset.imageMenuAction === 'remove') {
      const wrap = image.closest('.card-image-wrap, .image-tile');
      const removeButton = wrap?.querySelector('[data-action="remove-image"], [data-image-id].remove-image, button[data-image-id]')
        || [...document.querySelectorAll('.content-card[data-id]')].find(card => card.dataset.id === itemId)?.querySelector(`[data-action="remove-image"][data-image-id="${CSS.escape(imageId)}"]`);
      if (removeButton) removeButton.click();
      else toast('图片当前无法移除');
    }
  } catch (error) {
    toast(button.dataset.imageMenuAction === 'copy' ? '无法复制图片，请检查剪贴板权限' : errorMessage(error, '无法读取图片'));
  }
});
document.addEventListener('pointerdown', event => {
  if ($('#image-context-menu').matches(':popover-open') && !event.target.closest('#image-context-menu')) closeImageContextMenu();
});
document.addEventListener('keydown', event => { if (event.key === 'Escape' && $('#image-context-menu').matches(':popover-open')) closeImageContextMenu(); });
window.addEventListener('blur', closeImageContextMenu);
window.addEventListener('scroll', closeImageContextMenu, true);
$('#image-preview').addEventListener('click', event => { if (event.target === $('#image-preview')) $('#image-preview').close(); });
$('#image-preview').addEventListener('close', () => { URL.revokeObjectURL($('#image-preview-content').src); });
$('#backup-file').addEventListener('change', async event => {
  try {
    const file = event.target.files[0];
    if (!file) return;
    const raw = JSON.parse(await file.text());
    if (!raw || !Array.isArray(raw.categories) || !Array.isArray(raw.items) || !raw.items.every(item => item && typeof item.title === 'string' && (Array.isArray(item.translations) || (typeof item.zh === 'string' && typeof item.fr === 'string')))) throw new Error('Invalid backup');
    const images = Array.isArray(raw.images) ? raw.images : [];
    if (!images.every(image => typeof image.id === 'string' && typeof image.data === 'string' && image.data.startsWith('data:image/'))) throw new Error('Invalid backup image');
    pendingBackup = raw;
    $('#bulk-delete-title').textContent = '导入备份并替换当前资料？';
    $('#bulk-delete-note').textContent = `备份包含 ${raw.items.length} 条素材、${raw.categories.length} 个分类和 ${images.length} 张图片。确认后会替换当前资料。`;
    $('#bulk-delete-confirm').textContent = '替换并导入';
    $('#bulk-delete-confirm').classList.add('danger');
    $('#bulk-delete-dialog').showModal();
  } catch { toast('备份文件无效，未导入'); }
  event.target.value = '';
});
$('#language-form').addEventListener('submit', event => {
  if (event.submitter?.value !== 'save') return;
  event.preventDefault();
  const names = [$('#language-name-0').value, $('#language-name-1').value];
  if (!names[0] || !names[1] || names[0].toLocaleLowerCase() === names[1].toLocaleLowerCase()) return toast('请填写两个不同的语言名称');
  state.languages = names; persist(); render(); toast('✓ 语言名称已更新');
});
$('#ai-provider').addEventListener('change', event => {
  const preset = AI_PROVIDERS[event.target.value];
  $('#ai-base-url-field').hidden = event.target.value !== 'custom';
  if (preset) {
    $('#ai-base-url').value = preset.baseUrl;
    $('#ai-model').value = preset.model;
    setAiModelOptions([preset.model], preset.model);
    const provider = event.target.value;
    nativeInvoke('has_ai_key').then(saved => saved && loadAvailableAiModels(true, preset.baseUrl, provider)).catch(() => {});
  } else {
    setAiModelOptions([$('#ai-model').value].filter(Boolean), $('#ai-model').value);
  }
});
$('#load-ai-models').addEventListener('click', async event => {
  try { await loadAvailableAiModels(); } catch { /* The helper reports errors for manual refresh. */ }
});
$('#ai-settings-form').addEventListener('submit', async event => {
  event.preventDefault();
  const provider = $('#ai-provider').value;
  const baseUrl = $('#ai-base-url').value.trim();
  const model = $('#ai-model').value.trim();
  const key = $('#ai-key').value.trim();
  if (!baseUrl || !model) return toast('请填写 Base URL 和模型名称');
  try {
    const hasKey = await nativeInvoke('has_ai_key');
    if (key) await nativeInvoke('save_ai_key', { key });
    else if (!hasKey) return toast('请先填写 API Key');
    aiKeyConfigured = true;
    state.preferences.aiProvider = provider;
    state.preferences.aiBaseUrl = baseUrl;
    state.preferences.aiModel = model;
    if (!persist()) return;
    $('#ai-key').value = '';
    refreshAiKeyStatus();
    toast('✓ AI 翻译设置已保存');
  } catch (error) { toast(errorMessage(error, '无法保存 AI 设置')); }
});
$('#delete-ai-key').addEventListener('click', async () => {
  try {
    await nativeInvoke('delete_ai_key');
    aiKeyConfigured = false;
    $('#ai-key').value = '';
    await refreshAiKeyStatus();
    toast('已删除本机保存的 API Key');
  } catch (error) { toast(errorMessage(error, '无法删除 API Key')); }
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); if (state.preferences.sidebarCollapsed) setSidebarCollapsed(false); $('#search').focus(); }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'n') { event.preventDefault(); if (settingsOpen) { settingsOpen = false; render(); } openEditor(); }
});
render();
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (state.preferences.colorScheme === 'auto') {
      updateColorScheme();
    }
  });
}
nativeInvoke('has_ai_key').then(saved => {
  if (aiKeyConfigured !== saved) { aiKeyConfigured = saved; if (!settingsOpen) render(); }
}).catch(() => {});
window.addEventListener('storage', event => {
  if (event.key !== KEY || !event.newValue) return;
  try { state = normalize(JSON.parse(event.newValue)); language = state.languageMode; render(); }
  catch { /* Ignore incomplete external writes; the next valid save will sync. */ }
});
