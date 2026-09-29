// AI translation and key management service via Tauri backend
import { nativeInvoke } from '../utils/clipboard.js';
import { toast, errorMessage } from '../utils/dom.js';
import { store } from '../state/store.js';

let isAiKeyConfigured = false;

// Check if Windows DPAPI encrypted key is configured
export async function checkAiKeyStatus() {
  try {
    isAiKeyConfigured = await nativeInvoke('has_ai_key');
    return isAiKeyConfigured;
  } catch {
    isAiKeyConfigured = false;
    return false;
  }
}

export function getAiKeyConfigured() {
  return isAiKeyConfigured;
}

// Save encrypted API Key
export async function saveAiKey(key) {
  if (!key.trim()) return false;
  await nativeInvoke('set_ai_key', { key: key.trim() });
  isAiKeyConfigured = true;
  return true;
}

// Delete encrypted API Key
export async function deleteAiKey() {
  await nativeInvoke('delete_ai_key');
  isAiKeyConfigured = false;
}

// Fetch available models from OpenAI compatible endpoint
export async function fetchAiModels(baseUrl) {
  if (!baseUrl) throw new Error('请先填写 Base URL');
  return nativeInvoke('list_ai_models', { baseUrl });
}

// Request single translation from backend
export async function requestTranslation(text, sourceLanguage, targetLanguage) {
  const { preferences } = store.state;
  return nativeInvoke('translate_text', {
    baseUrl: preferences.aiBaseUrl,
    model: preferences.aiModel,
    sourceLanguage,
    targetLanguage,
    text
  });
}

// Batch translation controller object
export class TranslationBatchController {
  constructor(ids, onProgress, onComplete) {
    this.ids = ids;
    this.cursor = 0;
    this.status = 'running';
    this.cancelled = false;
    this.failed = [];
    this.translated = 0;
    this.currentTitle = '';
    this.onProgress = onProgress;
    this.onComplete = onComplete;
  }

  stop() {
    this.cancelled = true;
    this.status = 'paused';
    if (this.onProgress) this.onProgress(this);
  }

  async run() {
    this.status = 'running';
    this.cancelled = false;

    while (this.cursor < this.ids.length && !this.cancelled) {
      const id = this.ids[this.cursor];
      const item = store.state.items.find(entry => entry.id === id);

      if (!item || item.hasSecondLanguage || !item.translations[0]?.trim()) {
        this.cursor++;
        continue;
      }

      this.currentTitle = item.title;
      if (this.onProgress) this.onProgress(this);

      try {
        const sourceText = item.translations[0].trim();
        const translatedText = await requestTranslation(
          sourceText,
          store.state.languages[0],
          store.state.languages[1]
        );

        if (!item.translations[1]?.trim()) {
          item.translations[1] = translatedText;
          item.hasSecondLanguage = true;
          item.updatedAt = Date.now();
          store.persist();
          this.translated++;
        }
      } catch (err) {
        this.failed.push({
          id: item.id,
          title: item.title,
          error: errorMessage(err, '翻译失败')
        });
      }

      this.cursor++;
      if (this.onProgress) this.onProgress(this);
    }

    this.status = this.cancelled ? 'paused' : 'done';
    if (this.onComplete) this.onComplete(this);
  }
}

// Aliases for consistent multi-component usage
export const checkAiKey = checkAiKeyStatus;
export const setAiKey = saveAiKey;
export const fetchModels = fetchAiModels;
export const requestSingleTranslation = requestTranslation;
