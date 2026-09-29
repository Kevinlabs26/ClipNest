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
    '知道了': '知道了', '批量粘贴示例': '素材标题 1\n语言 1 内容\n---\n语言 2 内容\n===\n素材标题 2\n语言 1 内容'
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
    '知道了': 'OK',
    '搜索素材': 'Search library', '搜索素材…': 'Search library…', '快捷访问': 'Quick access', '快速访问': 'Quick access',
    '全部素材': 'All content', '常用收藏': 'Favorites', '最近复制': 'Recently copied', '我的分类': 'My categories',
    '新建分类': 'New category', '数据保存在此设备': 'Data saved on this device',
    '设置内容语言名称和默认显示方式。': 'Name your content languages and choose how to display them.',
    '语言 1': 'Language 1', '语言 2': 'Language 2',
    '名称会用于素材卡片、编辑区域和复制提示，不会改动已有内容。': 'These names appear on cards, in the editor, and in copy messages. Saved content is unchanged.',
    '保存语言名称': 'Save language names', '语言显示方式': 'Language display',
    '也可以随时在素材库顶部切换。': 'You can also switch this at the top of the library.', '对照': 'Side by side',
    '双语话术默认只有语言 1；纯文档和待办清单不参与语言对照或 AI 翻译。': 'New bilingual scripts start with language 1. Documents and checklists do not use language comparison or AI translation.',
    '配置一次后，可在只有一种语言的素材中一键补全另一种语言。': 'Set this up once to translate content that has only one language.',
    '服务商': 'Provider', '自定义 OpenAI 兼容接口': 'Custom OpenAI-compatible API', '模型名称': 'Model', '加载模型': 'Load models',
    '留空表示保留已保存的 Key': 'Leave blank to keep the saved key',
    '翻译文本会发送给所选服务商并可能产生费用。Key 使用 Windows 用户加密单独保存在本机，不进入素材备份。自定义地址请使用可信的 HTTPS 服务。': 'Text sent for translation goes to the selected provider and may incur charges. Your key is encrypted for your Windows account, stored separately on this device, and excluded from backups. Use a trusted HTTPS endpoint for custom providers.',
    '尚未保存 API Key': 'No API key saved', 'API Key 已加密保存在本机': 'API key encrypted and saved on this device',
    '桌面版中可保存 API Key': 'Save an API key in the desktop app', '删除已保存的 Key': 'Delete saved key', '保存 AI 设置': 'Save AI settings',
    '素材保存在本机。定期导出备份，可在其他设备迁移或恢复数据。': 'Your content is stored on this device. Export backups to move or restore it.',
    '本机资料概况': 'Local data overview', '条素材': 'items', '个分类': 'categories', '张图片': 'images', '仅保存在此设备': 'Stored only on this device',
    '备份文件': 'Backup file', '导出优先采用无损压缩，包含分类、文字和原始图片；也可导入旧版 JSON。': 'Exports use lossless compression when supported and include categories, text, and original images. Older JSON backups can still be imported.',
    '导出备份': 'Export backup', '导入备份': 'Import backup', '本地版本历史': 'Local version history',
    '恢复点最多保留 10 个，保存在此设备并包含关联图片。': 'Up to 10 restore points are kept on this device, including linked images.',
    '创建恢复点': 'Create restore point', '还没有恢复点': 'No restore points yet', '无法读取本地恢复点': 'Could not read local restore points', '恢复': 'Restore',
    '常用操作可以直接通过键盘完成。': 'Use the keyboard for common actions.', '快捷键': 'Keyboard shortcuts',
    '搜索内容': 'Search content', '新建内容': 'New content', '完成当前编辑': 'Finish editing',
    '关于 ClipNest': 'About ClipNest', 'ClipNest 是本机使用的话术与素材库。内容与图片不会自动上传到云端。': 'ClipNest is a local library for reusable scripts and content. Text and images are not uploaded to the cloud automatically.',
    '显示语言': 'Display language', '批量粘贴素材': 'Paste multiple items', '新建内容 (Ctrl+N)': 'New content (Ctrl+N)', '打开设置': 'Open settings',
    '全部': 'All', '收藏': 'Favorites', '待补': 'Missing', '按标签筛选': 'Filter by tag', '所有标签': 'All tags', '素材排序': 'Sort content',
    '手动排序': 'Manual order', '最近编辑': 'Recently edited', '标题顺序': 'Title order', '复制最多': 'Most copied',
    '素材正文文字大小': 'Content text size', '缩小素材文字': 'Decrease text size', '放大素材文字': 'Increase text size',
    '包含子分类': 'Include subcategories', '多选': 'Select multiple', '退出多选': 'Exit selection', '全部展开': 'Expand all', '全部收起': 'Collapse all',
    '已选': 'Selected', '项': 'items', '取消全选': 'Deselect all', '全选当前': 'Select visible', '移动到分类…': 'Move to category…',
    '取消收藏所选': 'Remove selected favorites', '收藏所选': 'Favorite selected', 'AI 翻译为': 'Translate with AI to', '批量翻译': 'Translate', '条': 'items',
    '更改分类图标': 'Change category icon', '点击更改图标': 'Click to change icon', '拖动调整同级顺序': 'Drag to reorder',
    '新建子分类': 'New subcategory', '更多操作': 'More actions', '重命名': 'Rename', '更改图标': 'Change icon', '步骤': 'Step', '共': 'of',
    '移动到…': 'Move to…', '删除分类': 'Delete category', '删除并合并…': 'Delete and merge…', '展开': 'Expand', '收起': 'Collapse',
    '关闭': 'Close', '取消': 'Cancel', '删除': 'Delete', '完成': 'Done', '停止': 'Stop', '继续剩余': 'Continue remaining', '重试失败': 'Retry failed',
    '关闭批量翻译状态': 'Dismiss translation status', '关闭，内容已自动保存': 'Close; content is saved automatically',
    '复制本步话术后自动跳到下一步': 'Advance after copying this step', '复制后自动下一步': 'Advance after copy', '退出流程': 'Exit workflow',
    '每条首行作为标题；用单独一行': 'Use the first line as the title; put', '分开第二种语言，再用': 'on its own line to separate the second language, then use', '分隔下一条。': 'to start the next item.',
    '添加到分类': 'Add to category', '导入素材': 'Import content', '图片可在导入后拖入对应素材卡片': 'After import, drag images onto their content cards.',
    '内容类型': 'Content type', '分类': 'Category', '双语话术': 'Bilingual script', '纯文档': 'Document', '待办清单': 'Checklist',
    '点击写标题；也可以在这里粘贴整段素材': 'Click to add a title, or paste the full content here', '点击输入或直接粘贴': 'Click to type or paste',
    '移除语言 2': 'Remove language 2', '＋ 添加第二种语言': '+ Add a second language', '变量可写成 {{姓名}}，复制时填写': 'Use {{name}} for details you fill in when copying',
    '任务清单': 'Tasks', '每行一项任务，回车添加下一项': 'One task per line; press Enter for another', '＋ 添加标签（可选，用逗号分隔）': '+ Add tags (optional, comma separated)',
    '▧ 添加图片': '▧ Add image', '移动分类': 'Move category', '移动到': 'Move to', '移动所选素材到分类': 'Move selected content to category',
    '确认删除分类': 'Delete category?', '分类里的素材会保留并转为未分类，子分类会提升到上一级。': 'Content in this category is kept as uncategorized, and subcategories move up one level.',
    '删除并合并分类': 'Delete and merge category', '合并到': 'Merge into', '合并并删除': 'Merge and delete', '分类图标（可选）': 'Category icon (optional)',
    '选择分类图标': 'Choose category icon', '选择图标': 'Choose icon', '移除语言 2？': 'Remove language 2?',
    '语言 2 已有内容，移除后这部分内容也会删除。': 'Language 2 contains content. Removing it will delete that content.', '移除': 'Remove',
    '批量 AI 翻译': 'Batch AI translation', '开始翻译': 'Start translation', '复制预览': 'Copy preview',
    '表情': 'Emoji', '符号': 'Symbols', '恢复默认': 'Restore default', '搜索或粘贴表情': 'Search or paste emoji',
    '复制图片': 'Copy image', '下载图片': 'Download image', '打开预览': 'Open preview', '从素材移除': 'Remove from content',
    '添加标签': 'Add tags', '移动': 'Move', '识别到': 'Recognized', '还有': 'More', '粘贴内容后显示识别结果': 'Paste content to preview the recognized items', '请先创建分类': 'Create a category first',
    '请填写两种语言名称': 'Enter both language names', '两种语言名称不能相同': 'The two language names must differ', '✓ 已保存语言名称': '✓ Language names saved',
    '✓ 已加载': '✓ Loaded', '个模型': 'models', '没有可用模型': 'No models available', '加载模型失败': 'Could not load models',
    '请填写 Base URL 和模型名称': 'Enter a Base URL and model name', '✓ 已保存 AI 设置': '✓ AI settings saved', '保存 AI 设置失败': 'Could not save AI settings',
    '✓ 已导出备份': '✓ Backup exported', '导出备份失败': 'Backup export failed', '✓ 已创建本地恢复点': '✓ Local restore point created',
    '创建恢复点失败，请检查存储空间': 'Could not create a restore point. Check available storage.', '确认恢复此版本？当前状态会自动留档。': 'Restore this version? The current state will be saved first.',
    '恢复版本历史': 'Restore version history', '确认恢复': 'Restore', '✓ 已成功恢复版本': '✓ Version restored', '恢复失败': 'Restore failed',
    '导入会替换当前素材和分类，导入前会自动创建恢复点。继续吗？': 'Import will replace the current content and categories. A restore point will be created first. Continue?',
    '继续导入': 'Continue import', '✓ 备份导入成功': '✓ Backup imported', '备份文件解析失败': 'Could not read the backup file',
    '确定删除已保存的 API Key 吗？': 'Delete the saved API key?', '删除 API Key': 'Delete API key', '确认删除': 'Delete', '✓ API Key 已清除': '✓ API key removed', '删除失败': 'Deletion failed',
    '✓ 分类位置已更新': '✓ Category moved', '✓ 分类已删除，素材已保留': '✓ Category deleted; content kept', '✓ 已为所选素材添加标签': '✓ Tags added to selected content',
    '✓ 已合并并删除分类': '✓ Category merged and deleted', '✓ 已复制': '✓ Copied', '✓ 已复制图片': '✓ Image copied', '✓ 已导入': '✓ Imported',
    '✓ 已批量删除': '✓ Deleted', '✓ 已撤销上一次文字格式': '✓ Last text formatting undone', '✓ 已添加': '✓ Added',
    '✓ 已移动 {count} 条素材至“{name}”': '✓ Moved {count} items to “{name}”', '✓ 已移动到“{name}”': '✓ Moved to “{name}”',
    '✓ 已移除第二种语言': '✓ Second language removed', '✓ 已翻译为': '✓ Translated into', '✓ 已自动推进至步骤': '✓ Advanced to step',
    '✓ 已调整图片位置': '✓ Image order updated', '✓ 已调整素材顺序': '✓ Content order updated',
    '个变量': 'variables', '从“更多操作 → 编辑内容”添加待办项目': 'Add tasks from More actions → Edit content.', '使用': 'Use',
    '保存中…': 'Saving…', '先创建一个分类': 'Create a category first', '克隆': 'Duplicate', '内容': 'content',
    '分类由你自己创建，之后可在这里添加素材。': 'Create your own categories, then add content here.', '切换到手动排序后才能拖动排序': 'Switch to manual order before dragging items.',
    '创建话术、文档或待办清单，常用内容都可以放在这里。': 'Create scripts, documents, or checklists to keep your reusable content here.',
    '删除“{name}”后，它的素材和子分类会合并到所选分类。': 'Delete “{name}”? Its content and subcategories will be merged into the selected category.',
    '删除图片': 'Delete image', '删除所选素材？': 'Delete selected content?', '删除素材': 'Delete content', '删除这张图片': 'Delete this image',
    '包含': 'Contains', '双击直接编辑': 'Double-click to edit', '发现新版本': 'New version available', '变量': 'variables',
    '图片保存失败，请重试': 'Could not save the image. Try again.', '图片已移除': 'Image removed',
    '在“{name}”下新建子分类': 'Create a subcategory under “{name}”', '在此后新建': 'Add after this', '复制': 'Copy',
    '将为 {count} 条素材发送文本进行 AI 翻译，可能产生服务费用。': 'Text from {count} items will be sent for AI translation. Provider charges may apply.',
    '已复制': 'Copied', '已完成': 'completed', '手动添加': 'Add manually', '批量删除素材': 'Delete selected content', '批量添加标签': 'Add tags to selected content',
    '拖到素材卡片间调整顺序，拖到左侧分类以移动素材': 'Drag between cards to reorder, or onto a category to move.',
    '拖动素材以排序或移动分类': 'Drag to reorder or move to a category', '按住可拖拽调整顺序，点击可查看大图': 'Hold to reorder; click to preview',
    '文档': 'Document', '文档正文': 'Document body', '字数': 'Characters', '新分类名称': 'New category name', '无法读取图片': 'Could not read image',
    '未分类': 'Uncategorized', '未命名素材': 'Untitled content', '条失败': 'failed', '条已完成': 'completed', '查看全部内容': 'View all content', '查看更新': 'View update', '次': 'times', '正文': 'Body',
    '没有匹配的内容': 'No matching content', '没有匹配的图标': 'No matching icons', '添加图片': 'Add image',
    '添加话术、文档或待办清单，之后就能在这里快速查找。': 'Add scripts, documents, or checklists to find them here later.',
    '点击预览；长按拖动可调整顺序': 'Click to preview; hold to reorder', '用逗号分隔多个标签': 'Separate tags with commas',
    '确认删除“{title}”？此操作不可撤销。': 'Delete “{title}”? This cannot be undone.',
    '确认批量删除所选的 {count} 条素材？此操作不可撤销。': 'Delete {count} selected items? This cannot be undone.',
    '移除图片': 'Remove image', '筛选标签': 'Filter tag', '素材图片': 'Content image', '素材库还是空的': 'Your library is empty',
    '自定义图标': 'Customize icon', '自定义素材图标': 'Customize content icon', '设置 AI 翻译': 'Set up AI translation',
    '试试调整搜索词或筛选条件，也可以查看全部内容。': 'Try another search or filter, or view all content.',
    '请先在此分类之外创建一个分类': 'Create another category first', '请先填写要翻译的语言': 'Enter text to translate first', '请选择图片文件': 'Choose an image file',
    '这个分类已存在': 'This category already exists', '这个分类还没有内容': 'This category is empty', '顶层分类': 'Top-level category',
    '（副本）': ' (copy)', '＋ 新建内容': '+ New content', '＋ 新建分类': '+ New category', '🎯 场景流程': '🎯 Workflow',
    '批量粘贴示例': 'Item title 1\nLanguage 1 text\n---\nLanguage 2 text\n===\nItem title 2\nLanguage 1 text',
    '当前筛选条件': 'Active filters', '设置分栏': 'Settings sections', '选择主题颜色': 'Choose accent color', '素材大图': 'Content image preview', '文字格式': 'Text formatting', '加粗选中文字': 'Bold selected text', '加粗': 'Bold',
    '自选文字颜色': 'Custom text color', '自选文字底色': 'Custom text background', '绿色文字': 'Green text', '蓝色文字': 'Blue text', '红色文字': 'Red text',
    '橙色文字': 'Orange text', '紫色文字': 'Purple text', '撤销上一次文字格式': 'Undo last text formatting', '撤销': 'Undo', '图片操作': 'Image actions',
    '跟随系统 (深色)': 'System (dark)', '跟随系统 (浅色)': 'System (light)', '深色模式': 'Dark mode', '浅色模式': 'Light mode',
    '切换外观模式 (当前: {mode})': 'Switch appearance (current: {mode})', '保存失败，请检查设备存储空间': 'Could not save. Check available device storage.',
    '提示': 'Notice', '操作失败': 'Operation failed', '此功能需要在 ClipNest 桌面版中使用': 'This feature requires the ClipNest desktop app.',
    '图片数据缺失，无法完整导出备份（{id}）': 'Image data is missing; the backup cannot be exported completely ({id}).',
    '找不到该恢复点': 'Restore point not found', '恢复的数据无法保存，请检查设备存储空间': 'Could not save restored data. Check available device storage.',
    '备份文件格式无效': 'Invalid backup file format', '备份中的图片数据无效': 'Invalid image data in backup', '备份中存在重复的图片 ID': 'Duplicate image IDs in backup',
    '导入的数据无法保存，请检查设备存储空间': 'Could not save imported data. Check available device storage.', '请先填写 Base URL': 'Enter a Base URL first', '翻译失败': 'Translation failed',
    '无法初始化更新检查': 'Could not start the update check', '暂时无法检查更新': 'Could not check for updates right now', '更新信息格式无效': 'Invalid update information',
    '无法打开 GitHub Releases 页面': 'Could not open GitHub Releases', '打开更新页面目前仅支持 Windows': 'Opening the update page is supported only on Windows',
    'Windows 无法保护或读取 API Key': 'Windows could not protect or read the API key', 'API Key 加密存储目前仅支持 Windows 桌面版': 'Encrypted API key storage is supported only on Windows',
    '请输入有效的 API Key': 'Enter a valid API key', '请先在设置中保存 API Key': 'Save an API key in Settings first', 'API Key 无法读取，请重新保存': 'Could not read the API key; save it again',
    'Base URL 格式无效': 'Invalid Base URL', 'Base URL 必须使用 HTTPS（本机地址除外）': 'Base URL must use HTTPS except for local addresses', 'Base URL 不应包含用户名或密码': 'Base URL must not contain a username or password',
    '无法初始化模型列表连接': 'Could not start the model list connection', '无法读取模型列表': 'Could not read the model list', '服务商没有返回可用模型列表': 'The provider returned no available models',
    '待翻译内容为空或超过 20,000 个字符': 'Text is empty or exceeds 20,000 characters', '请填写模型名称': 'Enter a model name', '无法初始化翻译连接': 'Could not start the translation connection',
    '无法读取翻译服务响应': 'Could not read the translation response', '翻译服务没有返回文本，请检查模型是否支持 Chat Completions': 'The provider returned no text. Check whether the model supports Chat Completions.',
    '加载模型失败': 'Could not load models', '翻译连接失败': 'Translation connection failed', '服务商返回的模型列表格式无效': 'Provider returned an invalid model list',
    '翻译服务返回无效数据': 'Translation provider returned invalid data', '翻译请求失败': 'Translation request failed', '请检查 API Key 和 Base URL': 'Check the API key and Base URL',
    '请检查服务商、模型和 API Key': 'Check the provider, model, and API key', '翻译失败，请检查 AI 设置': 'Translation failed. Check AI settings.',
    '复制图片失败': 'Could not copy image', '下载图片失败': 'Could not download image', '此版本无法读取压缩备份，请更新 ClipNest': 'This version cannot read compressed backups. Update ClipNest.',
    '已切换浅色模式': 'Light mode enabled', '已开启深色模式': 'Dark mode enabled', '批量翻译完成': 'Batch translation complete',
    '批量翻译已暂停': 'Batch translation paused', '正在批量翻译': 'Translating items',
    '✓ 已加粗选中文字': '✓ Selected text bolded', '✓ 已更改文字底色': '✓ Text background changed', '✓ 已更改文字颜色': '✓ Text color changed',
    '取消选择': 'Deselect item', '选择素材': 'Select item', '编辑内容、分类、标签和图片…': 'Edit content, category, tags and images…',
    '编辑分类、标签和图片…': 'Edit category, tags and images…', '保存失败，请先导出备份': 'Save failed. Export a backup first.',
    '已自动保存': 'Saved automatically', '新建': 'New', '编辑': 'Edit', '编辑内容会自动保存': 'Edits are saved automatically',
    '输入即自动保存': 'Changes save automatically', '输入即自动保存 · 每行一项，勾选可标记完成': 'Changes save automatically · One task per line; check completed tasks',
    '手动恢复点': 'Manual restore point', '恢复前系统留档': 'Before restore', '导入前自动留档': 'Before import',
    '✓ 已取消收藏': '✓ Removed from favorites', '✓ 已批量收藏': '✓ Added to favorites'
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
    '知道了': 'OK',
    '搜索素材': 'Rechercher dans la bibliothèque', '搜索素材…': 'Rechercher dans la bibliothèque…', '快捷访问': 'Accès rapide', '快速访问': 'Accès rapide',
    '全部素材': 'Tous les contenus', '常用收藏': 'Favoris', '最近复制': 'Copiés récemment', '我的分类': 'Mes catégories',
    '新建分类': 'Nouvelle catégorie', '数据保存在此设备': 'Données enregistrées sur cet appareil',
    '设置内容语言名称和默认显示方式。': 'Nommez les langues du contenu et choisissez leur affichage.',
    '语言 1': 'Langue 1', '语言 2': 'Langue 2',
    '名称会用于素材卡片、编辑区域和复制提示，不会改动已有内容。': 'Ces noms s’affichent sur les fiches, dans l’éditeur et dans les messages de copie. Le contenu enregistré reste inchangé.',
    '保存语言名称': 'Enregistrer les noms des langues', '语言显示方式': 'Affichage des langues',
    '也可以随时在素材库顶部切换。': 'Vous pouvez aussi changer cela en haut de la bibliothèque.', '对照': 'Côte à côte',
    '双语话术默认只有语言 1；纯文档和待办清单不参与语言对照或 AI 翻译。': 'Les nouvelles fiches bilingues commencent avec la langue 1. Les documents et listes ne sont pas concernés par la comparaison ou la traduction IA.',
    '配置一次后，可在只有一种语言的素材中一键补全另一种语言。': 'Configurez ce service une fois pour traduire les contenus qui n’ont qu’une seule langue.',
    '服务商': 'Fournisseur', '自定义 OpenAI 兼容接口': 'API compatible OpenAI personnalisée', '模型名称': 'Modèle', '加载模型': 'Charger les modèles',
    '留空表示保留已保存的 Key': 'Laisser vide pour conserver la clé enregistrée',
    '翻译文本会发送给所选服务商并可能产生费用。Key 使用 Windows 用户加密单独保存在本机，不进入素材备份。自定义地址请使用可信的 HTTPS 服务。': 'Le texte à traduire est envoyé au fournisseur choisi et peut entraîner des frais. La clé est chiffrée pour votre compte Windows, conservée séparément sur cet appareil et exclue des sauvegardes. Utilisez une adresse HTTPS fiable pour un fournisseur personnalisé.',
    '尚未保存 API Key': 'Aucune clé API enregistrée', 'API Key 已加密保存在本机': 'Clé API chiffrée et enregistrée sur cet appareil',
    '桌面版中可保存 API Key': 'Enregistrez une clé API dans l’application', '删除已保存的 Key': 'Supprimer la clé enregistrée', '保存 AI 设置': 'Enregistrer les paramètres IA',
    '素材保存在本机。定期导出备份，可在其他设备迁移或恢复数据。': 'Vos contenus sont stockés sur cet appareil. Exportez des sauvegardes pour les transférer ou les restaurer.',
    '本机资料概况': 'Aperçu des données locales', '条素材': 'éléments', '个分类': 'catégories', '张图片': 'images', '仅保存在此设备': 'Stocké uniquement sur cet appareil',
    '备份文件': 'Fichier de sauvegarde', '导出优先采用无损压缩，包含分类、文字和原始图片；也可导入旧版 JSON。': 'L’exportation utilise une compression sans perte si elle est disponible et inclut les catégories, les textes et les images d’origine. Les anciens fichiers JSON restent importables.',
    '导出备份': 'Exporter la sauvegarde', '导入备份': 'Importer une sauvegarde', '本地版本历史': 'Historique local',
    '恢复点最多保留 10 个，保存在此设备并包含关联图片。': 'Jusqu’à 10 points de restauration sont conservés sur cet appareil, avec les images associées.',
    '创建恢复点': 'Créer un point de restauration', '还没有恢复点': 'Aucun point de restauration', '无法读取本地恢复点': 'Impossible de lire les points de restauration', '恢复': 'Restaurer',
    '常用操作可以直接通过键盘完成。': 'Utilisez le clavier pour les actions courantes.', '快捷键': 'Raccourcis clavier',
    '搜索内容': 'Rechercher du contenu', '新建内容': 'Nouveau contenu', '完成当前编辑': 'Terminer la modification',
    '关于 ClipNest': 'À propos de ClipNest', 'ClipNest 是本机使用的话术与素材库。内容与图片不会自动上传到云端。': 'ClipNest est une bibliothèque locale de textes et de contenus réutilisables. Les textes et images ne sont pas envoyés automatiquement dans le cloud.',
    '显示语言': 'Langue affichée', '批量粘贴素材': 'Coller plusieurs éléments', '新建内容 (Ctrl+N)': 'Nouveau contenu (Ctrl+N)', '打开设置': 'Ouvrir les paramètres',
    '全部': 'Tout', '收藏': 'Favoris', '待补': 'À compléter', '按标签筛选': 'Filtrer par étiquette', '所有标签': 'Toutes les étiquettes', '素材排序': 'Trier les contenus',
    '手动排序': 'Ordre manuel', '最近编辑': 'Modifiés récemment', '标题顺序': 'Par titre', '复制最多': 'Les plus copiés',
    '素材正文文字大小': 'Taille du texte', '缩小素材文字': 'Réduire le texte', '放大素材文字': 'Agrandir le texte',
    '包含子分类': 'Inclure les sous-catégories', '多选': 'Sélection multiple', '退出多选': 'Quitter la sélection', '全部展开': 'Tout développer', '全部收起': 'Tout réduire',
    '已选': 'Sélectionnés', '项': 'éléments', '取消全选': 'Tout désélectionner', '全选当前': 'Sélectionner les visibles', '移动到分类…': 'Déplacer vers une catégorie…',
    '取消收藏所选': 'Retirer les favoris sélectionnés', '收藏所选': 'Ajouter les favoris sélectionnés', 'AI 翻译为': 'Traduire par IA vers', '批量翻译': 'Traduire', '条': 'éléments',
    '更改分类图标': 'Changer l’icône de la catégorie', '点击更改图标': 'Cliquer pour changer l’icône', '拖动调整同级顺序': 'Glisser pour réorganiser',
    '新建子分类': 'Nouvelle sous-catégorie', '更多操作': 'Plus d’actions', '重命名': 'Renommer', '更改图标': 'Changer l’icône', '步骤': 'Étape', '共': 'sur',
    '移动到…': 'Déplacer vers…', '删除分类': 'Supprimer la catégorie', '删除并合并…': 'Supprimer et fusionner…', '展开': 'Développer', '收起': 'Réduire',
    '关闭': 'Fermer', '取消': 'Annuler', '删除': 'Supprimer', '完成': 'Terminer', '停止': 'Arrêter', '继续剩余': 'Continuer le reste', '重试失败': 'Réessayer les échecs',
    '关闭批量翻译状态': 'Masquer l’état de traduction', '关闭，内容已自动保存': 'Fermer ; contenu enregistré automatiquement',
    '复制本步话术后自动跳到下一步': 'Passer à l’étape suivante après la copie', '复制后自动下一步': 'Étape suivante après copie', '退出流程': 'Quitter le parcours',
    '每条首行作为标题；用单独一行': 'Utilisez la première ligne comme titre ; placez', '分开第二种语言，再用': 'seul sur une ligne pour séparer la deuxième langue, puis', '分隔下一条。': 'pour commencer l’élément suivant.',
    '添加到分类': 'Ajouter à la catégorie', '导入素材': 'Importer les contenus', '图片可在导入后拖入对应素材卡片': 'Après l’importation, glissez les images sur les fiches correspondantes.',
    '内容类型': 'Type de contenu', '分类': 'Catégorie', '双语话术': 'Texte bilingue', '纯文档': 'Document', '待办清单': 'Liste de tâches',
    '点击写标题；也可以在这里粘贴整段素材': 'Cliquez pour ajouter un titre ou collez ici tout le contenu', '点击输入或直接粘贴': 'Cliquez pour écrire ou coller',
    '移除语言 2': 'Supprimer la langue 2', '＋ 添加第二种语言': '+ Ajouter une deuxième langue', '变量可写成 {{姓名}}，复制时填写': 'Utilisez {{nom}} pour les détails à remplir lors de la copie',
    '任务清单': 'Tâches', '每行一项任务，回车添加下一项': 'Une tâche par ligne ; Entrée pour en ajouter une', '＋ 添加标签（可选，用逗号分隔）': '+ Ajouter des étiquettes (facultatif, séparées par des virgules)',
    '▧ 添加图片': '▧ Ajouter une image', '移动分类': 'Déplacer la catégorie', '移动到': 'Déplacer vers', '移动所选素材到分类': 'Déplacer les contenus sélectionnés vers une catégorie',
    '确认删除分类': 'Supprimer la catégorie ?', '分类里的素材会保留并转为未分类，子分类会提升到上一级。': 'Les contenus restent sans catégorie et les sous-catégories remontent d’un niveau.',
    '删除并合并分类': 'Supprimer et fusionner la catégorie', '合并到': 'Fusionner dans', '合并并删除': 'Fusionner et supprimer', '分类图标（可选）': 'Icône de catégorie (facultative)',
    '选择分类图标': 'Choisir une icône de catégorie', '选择图标': 'Choisir une icône', '移除语言 2？': 'Supprimer la langue 2 ?',
    '语言 2 已有内容，移除后这部分内容也会删除。': 'La langue 2 contient du texte. Sa suppression effacera ce texte.', '移除': 'Supprimer',
    '批量 AI 翻译': 'Traduction IA par lot', '开始翻译': 'Démarrer la traduction', '复制预览': 'Aperçu de la copie',
    '表情': 'Émojis', '符号': 'Symboles', '恢复默认': 'Rétablir la valeur par défaut', '搜索或粘贴表情': 'Rechercher ou coller un émoji',
    '复制图片': 'Copier l’image', '下载图片': 'Télécharger l’image', '打开预览': 'Ouvrir l’aperçu', '从素材移除': 'Retirer du contenu',
    '添加标签': 'Ajouter des étiquettes', '移动': 'Déplacer', '识别到': 'Reconnu', '还有': 'Encore', '粘贴内容后显示识别结果': 'Collez du contenu pour prévisualiser les éléments reconnus', '请先创建分类': 'Créez d’abord une catégorie',
    '请填写两种语言名称': 'Saisissez les deux noms de langue', '两种语言名称不能相同': 'Les deux noms de langue doivent être différents', '✓ 已保存语言名称': '✓ Noms des langues enregistrés',
    '✓ 已加载': '✓ Chargés', '个模型': 'modèles', '没有可用模型': 'Aucun modèle disponible', '加载模型失败': 'Impossible de charger les modèles',
    '请填写 Base URL 和模型名称': 'Saisissez l’URL de base et le nom du modèle', '✓ 已保存 AI 设置': '✓ Paramètres IA enregistrés', '保存 AI 设置失败': 'Impossible d’enregistrer les paramètres IA',
    '✓ 已导出备份': '✓ Sauvegarde exportée', '导出备份失败': 'Échec de l’exportation', '✓ 已创建本地恢复点': '✓ Point de restauration local créé',
    '创建恢复点失败，请检查存储空间': 'Impossible de créer un point de restauration. Vérifiez l’espace disponible.', '确认恢复此版本？当前状态会自动留档。': 'Restaurer cette version ? L’état actuel sera d’abord sauvegardé.',
    '恢复版本历史': 'Restaurer une version', '确认恢复': 'Restaurer', '✓ 已成功恢复版本': '✓ Version restaurée', '恢复失败': 'Échec de la restauration',
    '导入会替换当前素材和分类，导入前会自动创建恢复点。继续吗？': 'L’importation remplacera les contenus et catégories actuels. Un point de restauration sera d’abord créé. Continuer ?',
    '继续导入': 'Continuer l’importation', '✓ 备份导入成功': '✓ Sauvegarde importée', '备份文件解析失败': 'Impossible de lire le fichier de sauvegarde',
    '确定删除已保存的 API Key 吗？': 'Supprimer la clé API enregistrée ?', '删除 API Key': 'Supprimer la clé API', '确认删除': 'Supprimer', '✓ API Key 已清除': '✓ Clé API supprimée', '删除失败': 'Échec de la suppression',
    '✓ 分类位置已更新': '✓ Catégorie déplacée', '✓ 分类已删除，素材已保留': '✓ Catégorie supprimée ; contenus conservés', '✓ 已为所选素材添加标签': '✓ Étiquettes ajoutées aux contenus sélectionnés',
    '✓ 已合并并删除分类': '✓ Catégorie fusionnée et supprimée', '✓ 已复制': '✓ Copié', '✓ 已复制图片': '✓ Image copiée', '✓ 已导入': '✓ Importé',
    '✓ 已批量删除': '✓ Supprimés', '✓ 已撤销上一次文字格式': '✓ Dernière mise en forme annulée', '✓ 已添加': '✓ Ajoutées',
    '✓ 已移动 {count} 条素材至“{name}”': '✓ {count} éléments déplacés vers « {name} »', '✓ 已移动到“{name}”': '✓ Déplacé vers « {name} »',
    '✓ 已移除第二种语言': '✓ Deuxième langue supprimée', '✓ 已翻译为': '✓ Traduit en', '✓ 已自动推进至步骤': '✓ Passage automatique à l’étape',
    '✓ 已调整图片位置': '✓ Ordre des images modifié', '✓ 已调整素材顺序': '✓ Ordre des contenus modifié',
    '个变量': 'variables', '从“更多操作 → 编辑内容”添加待办项目': 'Ajoutez des tâches depuis Plus d’actions → Modifier le contenu.', '使用': 'Utiliser',
    '保存中…': 'Enregistrement…', '先创建一个分类': 'Créez d’abord une catégorie', '克隆': 'Dupliquer', '内容': 'contenu',
    '分类由你自己创建，之后可在这里添加素材。': 'Créez vos propres catégories, puis ajoutez ici du contenu.', '切换到手动排序后才能拖动排序': 'Passez en ordre manuel avant de déplacer les éléments.',
    '创建话术、文档或待办清单，常用内容都可以放在这里。': 'Créez des textes, documents ou listes de tâches pour garder vos contenus utiles ici.',
    '删除“{name}”后，它的素材和子分类会合并到所选分类。': 'Supprimer « {name} » ? Ses contenus et sous-catégories seront fusionnés avec la catégorie choisie.',
    '删除图片': 'Supprimer l’image', '删除所选素材？': 'Supprimer les contenus sélectionnés ?', '删除素材': 'Supprimer le contenu', '删除这张图片': 'Supprimer cette image',
    '包含': 'Contient', '双击直接编辑': 'Double-cliquer pour modifier', '发现新版本': 'Nouvelle version disponible', '变量': 'variables',
    '图片保存失败，请重试': 'Impossible d’enregistrer l’image. Réessayez.', '图片已移除': 'Image retirée',
    '在“{name}”下新建子分类': 'Créer une sous-catégorie sous « {name} »', '在此后新建': 'Ajouter après cet élément', '复制': 'Copier',
    '将为 {count} 条素材发送文本进行 AI 翻译，可能产生服务费用。': 'Le texte de {count} éléments sera envoyé pour traduction IA. Des frais peuvent s’appliquer.',
    '已复制': 'Copié', '已完成': 'terminées', '手动添加': 'Ajouter manuellement', '批量删除素材': 'Supprimer les contenus sélectionnés', '批量添加标签': 'Ajouter des étiquettes aux contenus sélectionnés',
    '拖到素材卡片间调整顺序，拖到左侧分类以移动素材': 'Glissez entre les fiches pour les réorganiser, ou vers une catégorie pour les déplacer.',
    '拖动素材以排序或移动分类': 'Glisser pour réorganiser ou changer de catégorie', '按住可拖拽调整顺序，点击可查看大图': 'Maintenir pour réorganiser ; cliquer pour voir',
    '文档': 'Document', '文档正文': 'Corps du document', '字数': 'Caractères', '新分类名称': 'Nom de la nouvelle catégorie', '无法读取图片': 'Impossible de lire l’image',
    '未分类': 'Sans catégorie', '未命名素材': 'Contenu sans titre', '条失败': 'échecs', '条已完成': 'terminés', '查看全部内容': 'Voir tous les contenus', '查看更新': 'Voir la mise à jour', '次': 'fois', '正文': 'Corps',
    '没有匹配的内容': 'Aucun contenu correspondant', '没有匹配的图标': 'Aucune icône correspondante', '添加图片': 'Ajouter une image',
    '添加话术、文档或待办清单，之后就能在这里快速查找。': 'Ajoutez des textes, documents ou listes pour les retrouver ici plus tard.',
    '点击预览；长按拖动可调整顺序': 'Cliquer pour voir ; maintenir pour réorganiser', '用逗号分隔多个标签': 'Séparez les étiquettes par des virgules',
    '确认删除“{title}”？此操作不可撤销。': 'Supprimer « {title} » ? Cette action est irréversible.',
    '确认批量删除所选的 {count} 条素材？此操作不可撤销。': 'Supprimer {count} éléments sélectionnés ? Cette action est irréversible.',
    '移除图片': 'Retirer l’image', '筛选标签': 'Filtrer l’étiquette', '素材图片': 'Image du contenu', '素材库还是空的': 'Votre bibliothèque est vide',
    '自定义图标': 'Personnaliser l’icône', '自定义素材图标': 'Personnaliser l’icône du contenu', '设置 AI 翻译': 'Configurer la traduction IA',
    '试试调整搜索词或筛选条件，也可以查看全部内容。': 'Essayez une autre recherche ou un autre filtre, ou affichez tous les contenus.',
    '请先在此分类之外创建一个分类': 'Créez d’abord une autre catégorie', '请先填写要翻译的语言': 'Saisissez d’abord le texte à traduire', '请选择图片文件': 'Choisissez un fichier image',
    '这个分类已存在': 'Cette catégorie existe déjà', '这个分类还没有内容': 'Cette catégorie est vide', '顶层分类': 'Catégorie principale',
    '（副本）': ' (copie)', '＋ 新建内容': '+ Nouveau contenu', '＋ 新建分类': '+ Nouvelle catégorie', '🎯 场景流程': '🎯 Parcours',
    '批量粘贴示例': 'Titre 1\nTexte en langue 1\n---\nTexte en langue 2\n===\nTitre 2\nTexte en langue 1',
    '当前筛选条件': 'Filtres actifs', '设置分栏': 'Rubriques des paramètres', '选择主题颜色': 'Choisir une couleur d’accent', '素材大图': 'Aperçu de l’image', '文字格式': 'Mise en forme du texte', '加粗选中文字': 'Mettre le texte sélectionné en gras', '加粗': 'Gras',
    '自选文字颜色': 'Couleur personnalisée du texte', '自选文字底色': 'Surlignage personnalisé', '绿色文字': 'Texte vert', '蓝色文字': 'Texte bleu', '红色文字': 'Texte rouge',
    '橙色文字': 'Texte orange', '紫色文字': 'Texte violet', '撤销上一次文字格式': 'Annuler la dernière mise en forme', '撤销': 'Annuler', '图片操作': 'Actions sur l’image',
    '跟随系统 (深色)': 'Système (sombre)', '跟随系统 (浅色)': 'Système (clair)', '深色模式': 'Mode sombre', '浅色模式': 'Mode clair',
    '切换外观模式 (当前: {mode})': 'Changer l’apparence (actuel : {mode})', '保存失败，请检查设备存储空间': 'Enregistrement impossible. Vérifiez l’espace disponible.',
    '提示': 'Information', '操作失败': 'Échec de l’opération', '此功能需要在 ClipNest 桌面版中使用': 'Cette fonction nécessite l’application de bureau ClipNest.',
    '图片数据缺失，无法完整导出备份（{id}）': 'Données d’image manquantes ; exportation complète impossible ({id}).',
    '找不到该恢复点': 'Point de restauration introuvable', '恢复的数据无法保存，请检查设备存储空间': 'Données restaurées non enregistrées. Vérifiez l’espace disponible.',
    '备份文件格式无效': 'Format de sauvegarde invalide', '备份中的图片数据无效': 'Données d’image invalides dans la sauvegarde', '备份中存在重复的图片 ID': 'Identifiants d’image en double dans la sauvegarde',
    '导入的数据无法保存，请检查设备存储空间': 'Données importées non enregistrées. Vérifiez l’espace disponible.', '请先填写 Base URL': 'Saisissez d’abord une URL de base', '翻译失败': 'Échec de la traduction',
    '无法初始化更新检查': 'Impossible de lancer la vérification des mises à jour', '暂时无法检查更新': 'Impossible de vérifier les mises à jour pour le moment', '更新信息格式无效': 'Informations de mise à jour invalides',
    '无法打开 GitHub Releases 页面': 'Impossible d’ouvrir GitHub Releases', '打开更新页面目前仅支持 Windows': 'L’ouverture de la page des mises à jour est prise en charge uniquement sous Windows',
    'Windows 无法保护或读取 API Key': 'Windows ne peut pas protéger ou lire la clé API', 'API Key 加密存储目前仅支持 Windows 桌面版': 'Le stockage chiffré de la clé API est pris en charge uniquement sous Windows',
    '请输入有效的 API Key': 'Saisissez une clé API valide', '请先在设置中保存 API Key': 'Enregistrez d’abord une clé API dans les paramètres', 'API Key 无法读取，请重新保存': 'Clé API illisible ; enregistrez-la à nouveau',
    'Base URL 格式无效': 'URL de base invalide', 'Base URL 必须使用 HTTPS（本机地址除外）': 'L’URL de base doit utiliser HTTPS, sauf pour les adresses locales', 'Base URL 不应包含用户名或密码': 'L’URL de base ne doit pas contenir de nom d’utilisateur ni de mot de passe',
    '无法初始化模型列表连接': 'Impossible de lancer la connexion à la liste des modèles', '无法读取模型列表': 'Impossible de lire la liste des modèles', '服务商没有返回可用模型列表': 'Le fournisseur n’a renvoyé aucun modèle disponible',
    '待翻译内容为空或超过 20,000 个字符': 'Le texte est vide ou dépasse 20 000 caractères', '请填写模型名称': 'Saisissez un nom de modèle', '无法初始化翻译连接': 'Impossible de lancer la connexion de traduction',
    '无法读取翻译服务响应': 'Impossible de lire la réponse du service de traduction', '翻译服务没有返回文本，请检查模型是否支持 Chat Completions': 'Le fournisseur n’a renvoyé aucun texte. Vérifiez que le modèle prend en charge Chat Completions.',
    '加载模型失败': 'Impossible de charger les modèles', '翻译连接失败': 'Échec de la connexion de traduction', '服务商返回的模型列表格式无效': 'Liste de modèles invalide renvoyée par le fournisseur',
    '翻译服务返回无效数据': 'Données invalides renvoyées par le service de traduction', '翻译请求失败': 'Échec de la demande de traduction', '请检查 API Key 和 Base URL': 'Vérifiez la clé API et l’URL de base',
    '请检查服务商、模型和 API Key': 'Vérifiez le fournisseur, le modèle et la clé API', '翻译失败，请检查 AI 设置': 'Échec de la traduction. Vérifiez les paramètres IA.',
    '复制图片失败': 'Impossible de copier l’image', '下载图片失败': 'Impossible de télécharger l’image', '此版本无法读取压缩备份，请更新 ClipNest': 'Cette version ne peut pas lire les sauvegardes compressées. Mettez ClipNest à jour.',
    '已切换浅色模式': 'Mode clair activé', '已开启深色模式': 'Mode sombre activé', '批量翻译完成': 'Traduction par lot terminée',
    '批量翻译已暂停': 'Traduction par lot en pause', '正在批量翻译': 'Traduction des éléments en cours',
    '✓ 已加粗选中文字': '✓ Texte sélectionné mis en gras', '✓ 已更改文字底色': '✓ Surlignage modifié', '✓ 已更改文字颜色': '✓ Couleur du texte modifiée',
    '取消选择': 'Désélectionner le contenu', '选择素材': 'Sélectionner le contenu', '编辑内容、分类、标签和图片…': 'Modifier le contenu, la catégorie, les étiquettes et les images…',
    '编辑分类、标签和图片…': 'Modifier la catégorie, les étiquettes et les images…', '保存失败，请先导出备份': 'Enregistrement impossible. Exportez d’abord une sauvegarde.',
    '已自动保存': 'Enregistré automatiquement', '新建': 'Nouveau', '编辑': 'Modifier', '编辑内容会自动保存': 'Les modifications sont enregistrées automatiquement',
    '输入即自动保存': 'Enregistrement automatique', '输入即自动保存 · 每行一项，勾选可标记完成': 'Enregistrement automatique · Une tâche par ligne ; cochez les tâches terminées',
    '手动恢复点': 'Point de restauration manuel', '恢复前系统留档': 'Avant restauration', '导入前自动留档': 'Avant importation',
    '✓ 已取消收藏': '✓ Retirés des favoris', '✓ 已批量收藏': '✓ Ajoutés aux favoris'
  }
};

let currentUiLanguage = 'zh-CN';

// Set current UI language for translations
export function setUiLanguage(lang) {
  currentUiLanguage = ['zh-CN', 'en', 'fr'].includes(lang) ? lang : 'zh-CN';
  document.documentElement.lang = currentUiLanguage;
  document.querySelectorAll('[data-ui-text]').forEach(el => { el.textContent = uiText(el.dataset.uiText); });
  document.querySelectorAll('[data-ui-placeholder]').forEach(el => {
    if (el.hasAttribute('data-placeholder')) el.dataset.placeholder = uiText(el.dataset.uiPlaceholder);
    else el.placeholder = uiText(el.dataset.uiPlaceholder);
  });
  document.querySelectorAll('[data-ui-title]').forEach(el => { el.title = uiText(el.dataset.uiTitle); });
  document.querySelectorAll('[data-ui-aria-label]').forEach(el => { el.setAttribute('aria-label', uiText(el.dataset.uiAriaLabel)); });
  document.querySelectorAll('[data-ui-alt]').forEach(el => { el.alt = uiText(el.dataset.uiAlt); });
}

// Translate system UI text by key
export function uiText(text) {
  return UI_TEXTS[currentUiLanguage]?.[text] || text;
}

export function displayLanguageName(name) {
  return name === '语言 1' || name === '语言 2' ? uiText(name) : name;
}

// Format error object into user-friendly message
export function errorMessage(error, fallback = '操作失败') {
  if (!error) return uiText(fallback);
  const message = typeof error === 'string' ? error : error.message;
  if (!message) return uiText(fallback);
  const match = message.match(/^(加载模型失败|翻译连接失败)：(.+)$/);
  if (match) return `${uiText(match[1])}: ${match[2]}`;
  const httpMatch = message.match(/^(服务商返回的模型列表格式无效|翻译服务返回无效数据|加载模型失败|翻译请求失败)（HTTP ([^)]+)）(?::|：)?(.*)$/);
  if (httpMatch) return `${uiText(httpMatch[1])} (HTTP ${httpMatch[2]})${httpMatch[3] ? `: ${uiText(httpMatch[3])}` : ''}`;
  return uiText(message);
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
