import { $, $$, toast, errorMessage, uiText, setUiLanguage, displayLanguageName } from '../utils/dom.js';
import { store, state, persist, renderAll } from '../state/store.js';
import { updateSidebarState, updateColorScheme, updateDensity, updateTheme } from '../state/theme.js';
import { checkAiKey, setAiKey, deleteAiKey, fetchModels } from '../services/aiService.js';
import { AI_PROVIDERS } from '../services/storageService.js';
import { exportBackupFile, listRestorePoints, saveRestorePoint, restoreFromPoint, importBackupFile } from '../services/backupService.js';
import { askConfirm } from './confirmComponent.js';

let isSettingsVisible = false;
let currentSettingsSection = 'general';
const LANGUAGE_OPTIONS = ['中文', 'English', '日本語', '한국어', 'Español', 'Français', 'Deutsch', 'Русский'];

export function isSettingsOpen() {
  return isSettingsVisible;
}

export function openSettings(sectionName = 'general') {
  isSettingsVisible = true;
  currentSettingsSection = sectionName;
  renderSettingsPage();
  if (sectionName === 'data') renderVersionList();
}

export function closeSettings() {
  isSettingsVisible = false;
  renderSettingsPage();
}

export async function refreshAiKeyStatus() {
  const statusElement = $('#ai-key-status');
  const deleteBtn = $('#delete-ai-key');
  try {
    const isConfigured = await checkAiKey();
    if (statusElement) {
      statusElement.innerHTML = `<span class="status-dot"></span>${uiText(isConfigured ? 'API Key 已加密保存在本机' : '尚未保存 API Key')}`;
    }
    if (deleteBtn) deleteBtn.hidden = !isConfigured;
  } catch {
    if (statusElement) statusElement.innerHTML = `<span class="status-dot"></span>${uiText('桌面版中可保存 API Key')}`;
    if (deleteBtn) deleteBtn.hidden = true;
  }
}

export function renderSettingsPage() {
  setUiLanguage(state.preferences.uiLanguage);
  const libraryEl = $('#library-view');
  const settingsEl = $('#settings-page');
  if (libraryEl) libraryEl.hidden = isSettingsVisible;
  if (settingsEl) settingsEl.hidden = !isSettingsVisible;
  if (!isSettingsVisible) return;

  $$('[data-settings-section]').forEach(btn => {
    const isSelected = btn.dataset.settingsSection === currentSettingsSection;
    btn.classList.toggle('selected', isSelected);
    btn.setAttribute('aria-pressed', isSelected);
  });

  $$('[data-settings-panel]').forEach(pnl => {
    pnl.hidden = pnl.dataset.settingsPanel !== currentSettingsSection;
  });

  updateDensity(state.preferences.density);
  updateTheme(state.preferences.theme);
  updateSidebarState();
  updateColorScheme(state.preferences.colorScheme);

  $$('button[data-density]').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.density === state.preferences.density);
  });
  $$('[data-color-scheme-option]').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.colorSchemeOption === (state.preferences.colorScheme || 'auto'));
  });
  $$('[data-theme-option]').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.themeOption === state.preferences.theme);
  });
  $$('[data-ui-language]').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.uiLanguage === state.preferences.uiLanguage);
    btn.setAttribute('aria-pressed', String(btn.dataset.uiLanguage === state.preferences.uiLanguage));
  });

  $$('[data-language]').forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.language === store.language);
    if (btn.dataset.language === '0') btn.textContent = displayLanguageName(state.languages[0]);
    else if (btn.dataset.language === '1') btn.textContent = displayLanguageName(state.languages[1]);
  });

  const languageSelects = [$('#language-name-0'), $('#language-name-1')];
  languageSelects.forEach((select, index) => {
    if (!select) return;
    const current = state.languages[index];
    select.replaceChildren(...[...new Set([current, ...LANGUAGE_OPTIONS])].map(name => new Option(name, name)));
    select.value = current;
  });

  const provider = $('#ai-provider');
  const baseUrl = $('#ai-base-url');
  const model = $('#ai-model');
  if (provider) provider.value = state.preferences.aiProvider;
  if (baseUrl) baseUrl.value = state.preferences.aiBaseUrl;
  if (model) model.value = state.preferences.aiModel;

  const itemCountEl = $('#settings-item-count');
  const catCountEl = $('#settings-category-count');
  const imgCountEl = $('#settings-image-count');
  if (itemCountEl) itemCountEl.textContent = `${state.items.length} ${uiText('条素材')}`;
  if (catCountEl) catCountEl.textContent = `${state.categories.length} ${uiText('个分类')}`;
  if (imgCountEl) {
    const totalImgCount = new Set(state.items.flatMap(i => i.images || [])).size;
    imgCountEl.textContent = `${totalImgCount} ${uiText('张图片')}`;
  }
  refreshAiKeyStatus();
}

export async function renderVersionList() {
  const listContainer = $('#version-list');
  if (!listContainer) return;
  try {
    const versions = await listRestorePoints();
    if (!versions.length) {
      listContainer.innerHTML = `<div class="version-empty">${uiText('还没有恢复点')}</div>`;
      return;
    }
    listContainer.replaceChildren(...versions.map(record => {
      const row = document.createElement('div');
      row.className = 'version-row';
      const meta = document.createElement('span');
      meta.className = 'version-meta';
      const title = document.createElement('strong');
      title.textContent = uiText(record.label);
      const detail = document.createElement('small');
      detail.textContent = `${new Date(record.createdAt).toLocaleString()} · ${record.data.items?.length || 0} ${uiText('条素材')} · ${(record.imageIds || []).length} ${uiText('张图片')}`;
      meta.append(title, detail);
      const restoreBtn = document.createElement('button');
      restoreBtn.className = 'button';
      restoreBtn.type = 'button';
      restoreBtn.textContent = uiText('恢复');
      restoreBtn.dataset.restoreVersion = record.id;
      row.append(meta, restoreBtn);
      return row;
    }));
  } catch {
    listContainer.innerHTML = `<div class="version-empty">${uiText('无法读取本地恢复点')}</div>`;
  }
}

export function setupSettingsEventListeners() {
  $('#settings-page')?.addEventListener('click', async event => {
    const navTab = event.target.closest('[data-settings-section]');
    const backBtn = event.target.closest('#settings-back');
    const densityBtn = event.target.closest('button[data-density]');
    const colorSchemeBtn = event.target.closest('[data-color-scheme-option]');
    const themeBtn = event.target.closest('[data-theme-option]');
    const uiLangBtn = event.target.closest('[data-ui-language]');

    if (backBtn) { closeSettings(); renderAll(); return; }
    if (navTab) {
      currentSettingsSection = navTab.dataset.settingsSection;
      renderSettingsPage();
      if (currentSettingsSection === 'data') renderVersionList();
      return;
    }
    if (colorSchemeBtn) {
      event.stopPropagation();
      const previous = state.preferences.colorScheme;
      state.preferences.colorScheme = colorSchemeBtn.dataset.colorSchemeOption;
      if (!persist()) { state.preferences.colorScheme = previous; renderSettingsPage(); return; }
      updateColorScheme();
      renderSettingsPage();
      return;
    }
    if (densityBtn) {
      event.stopPropagation();
      const previous = state.preferences.density;
      state.preferences.density = densityBtn.dataset.density;
      if (!persist()) { state.preferences.density = previous; renderSettingsPage(); return; }
      updateDensity(state.preferences.density);
      renderSettingsPage();
      return;
    }
    if (themeBtn) {
      event.stopPropagation();
      const previous = state.preferences.theme;
      state.preferences.theme = themeBtn.dataset.themeOption;
      if (!persist()) { state.preferences.theme = previous; renderSettingsPage(); return; }
      updateTheme(state.preferences.theme);
      renderSettingsPage();
      return;
    }
    if (uiLangBtn) {
      event.stopPropagation();
      const previous = state.preferences.uiLanguage;
      state.preferences.uiLanguage = uiLangBtn.dataset.uiLanguage;
      if (!persist()) { state.preferences.uiLanguage = previous; renderSettingsPage(); return; }
      renderSettingsPage();
      toast(`✓ ${uiLangBtn.textContent}`);
    }
  }, true);

  $('#language-form')?.addEventListener('submit', event => {
    event.preventDefault();
    const languages = [$('#language-name-0').value.trim(), $('#language-name-1').value.trim()];
    if (!languages[0] || !languages[1]) return toast(uiText('请填写两种语言名称'));
    if (languages[0] === languages[1]) return toast(uiText('两种语言名称不能相同'));
    const previousLanguages = state.languages;
    state.languages = languages;
    if (!persist()) { state.languages = previousLanguages; return; }
    renderAll(); renderSettingsPage();
    toast(uiText('✓ 已保存语言名称'));
  });

  $('#ai-provider')?.addEventListener('change', event => {
    const preset = AI_PROVIDERS[event.target.value];
    if (!preset) return;
    $('#ai-base-url').value = preset.baseUrl;
    $('#ai-model').value = preset.model;
    $('#ai-model-options').replaceChildren();
  });

  $('#load-ai-models')?.addEventListener('click', async event => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      const models = await fetchModels($('#ai-base-url').value.trim());
      const modelInput = $('#ai-model');
      $('#ai-model-options').replaceChildren(...models.map(name => new Option(name, name)));
      if (models.length && !models.includes(modelInput.value)) modelInput.value = models[0];
      toast(models.length ? `${uiText('✓ 已加载')} ${models.length} ${uiText('个模型')}` : uiText('没有可用模型'));
    } catch (err) { toast(errorMessage(err, uiText('加载模型失败'))); }
    finally { button.disabled = false; }
  });

  $('#ai-settings-form')?.addEventListener('submit', async event => {
    event.preventDefault();
    const keyInput = $('#ai-key');
    const key = keyInput.value.trim();
    if (!$('#ai-base-url').value.trim() || !$('#ai-model').value.trim()) return toast(uiText('请填写 Base URL 和模型名称'));
    const previousPreferences = { ...state.preferences };
    try {
      state.preferences.aiProvider = $('#ai-provider').value;
      state.preferences.aiBaseUrl = $('#ai-base-url').value.trim();
      state.preferences.aiModel = $('#ai-model').value.trim();
      if (!persist()) { Object.assign(state.preferences, previousPreferences); return; }
      if (key) await setAiKey(key);
      keyInput.value = '';
      await refreshAiKeyStatus();
      window.dispatchEvent(new Event('ai-key-status-change'));
      toast(uiText('✓ 已保存 AI 设置'));
    } catch (err) {
      Object.assign(state.preferences, previousPreferences);
      persist();
      toast(errorMessage(err, uiText('保存 AI 设置失败')));
    }
  });

  $('#export-data')?.addEventListener('click', async () => {
    try { await exportBackupFile(); toast(uiText('✓ 已导出备份')); }
    catch (err) { toast(errorMessage(err, uiText('导出备份失败'))); }
  });

  $('#import-data')?.addEventListener('click', () => $('#backup-file')?.click());

  $('#create-version')?.addEventListener('click', async () => {
    const btn = $('#create-version');
    if (btn) btn.disabled = true;
    try {
      await saveRestorePoint('手动恢复点');
      await renderVersionList();
      toast(uiText('✓ 已创建本地恢复点'));
    } catch {
      toast(uiText('创建恢复点失败，请检查存储空间'));
    } finally {
      if (btn) btn.disabled = false;
    }
  });

  $('#version-list')?.addEventListener('click', async event => {
    const btn = event.target.closest('[data-restore-version]');
    if (!btn) return;
    const versionId = btn.dataset.restoreVersion;
    const confirmed = await askConfirm(uiText('确认恢复此版本？当前状态会自动留档。'), uiText('恢复版本历史'), uiText('确认恢复'), false);
    if (confirmed) {
      try {
        await restoreFromPoint(versionId);
        renderAll();
        renderSettingsPage();
        renderVersionList();
        toast(uiText('✓ 已成功恢复版本'));
      } catch (err) {
        toast(errorMessage(err, uiText('恢复失败')));
      }
    }
  });

  $('#backup-file')?.addEventListener('change', async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    const confirmed = await askConfirm(uiText('导入会替换当前素材和分类，导入前会自动创建恢复点。继续吗？'), uiText('导入备份'), uiText('继续导入'), false);
    if (!confirmed) { event.target.value = ''; return; }
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      await importBackupFile(parsed);
      renderAll();
      renderSettingsPage();
      await renderVersionList();
      toast(uiText('✓ 备份导入成功'));
    } catch (err) {
      toast(errorMessage(err, uiText('备份文件解析失败')));
    }
    event.target.value = '';
  });

  $('#delete-ai-key')?.addEventListener('click', async () => {
    const confirmed = await askConfirm(uiText('确定删除已保存的 API Key 吗？'), uiText('删除 API Key'), uiText('确认删除'), true);
    if (!confirmed) return;
    try {
      await deleteAiKey();
      await refreshAiKeyStatus();
      window.dispatchEvent(new Event('ai-key-status-change'));
      toast(uiText('✓ API Key 已清除'));
    } catch (err) {
      toast(errorMessage(err, uiText('删除失败')));
    }
  });
}
