// Local library backup export/import and version history snapshots
import { openImageDatabase, getImage, storeImage, normalize } from './storageService.js';
import { store } from '../state/store.js';
import { uiText } from '../utils/dom.js';

// Convert blob to DataURL
export async function blobAsDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

// Export library with embedded images into a single JSON file
export async function exportBackupFile() {
  const ids = [...new Set(store.state.items.flatMap(item => item.images || []))];
  const images = [];

  for (const id of ids) {
    const blob = await getImage(id);
    if (!blob) throw new Error(uiText('图片数据缺失，无法完整导出备份（{id}）').replace('{id}', id));
    images.push({ id, data: await blobAsDataUrl(blob) });
  }

  const payload = { ...store.state, images };
  const fileBlob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const downloadUrl = URL.createObjectURL(fileBlob);
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = `clipnest-backup-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(downloadUrl), 2000);
}

// Save snapshot version to IndexedDB (max 10 items)
export async function saveRestorePoint(label = '手动恢复点') {
  const db = await openImageDatabase();
  const versions = await listRestorePoints();

  // Enforce max 10 restore points
  if (versions.length >= 10) {
    versions.sort((a, b) => a.createdAt - b.createdAt);
    const toRemove = versions.slice(0, versions.length - 9);
    for (const item of toRemove) {
      await deleteRestorePoint(item.id);
    }
  }

  const newVersion = {
    id: crypto.randomUUID(),
    label,
    createdAt: Date.now(),
    data: JSON.parse(JSON.stringify(store.state)),
    imageIds: [...new Set(store.state.items.flatMap(item => item.images || []))]
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction('versions', 'readwrite');
    tx.objectStore('versions').put(newVersion);
    tx.oncomplete = () => resolve(newVersion);
    tx.onerror = () => reject(tx.error);
  });
}

// List all restore points ordered newest first
export async function listRestorePoints() {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('versions', 'readonly');
    const request = tx.objectStore('versions').getAll();
    request.onsuccess = () => {
      const records = request.result || [];
      records.sort((a, b) => b.createdAt - a.createdAt);
      resolve(records);
    };
    request.onerror = () => reject(request.error);
  });
}

// Delete restore point by ID
export async function deleteRestorePoint(id) {
  const db = await openImageDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('versions', 'readwrite');
    tx.objectStore('versions').delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

// Restore library state from point ID
export async function restoreFromPoint(id) {
  const db = await openImageDatabase();
  const version = await new Promise((resolve, reject) => {
    const tx = db.transaction('versions', 'readonly');
    const request = tx.objectStore('versions').get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

  if (!version) throw new Error('找不到该恢复点');

  // Create safety point before overwriting
  await saveRestorePoint('恢复前系统留档');

  const restored = normalize(version.data);
  const previousState = JSON.parse(JSON.stringify(store.state));
  const previousLanguage = store.language;
  Object.assign(store.state, restored);
  store.language = restored.languageMode;
  if (!store.persist()) {
    Object.assign(store.state, previousState);
    store.language = previousLanguage;
    throw new Error('恢复的数据无法保存，请检查设备存储空间');
  }
  return true;
}

// Import JSON file and update state
export async function importBackupFile(rawJson) {
  if (!rawJson || typeof rawJson !== 'object' || Array.isArray(rawJson)) throw new Error('备份文件格式无效');
  const images = rawJson.images ?? [];
  if (!Array.isArray(images) || images.some(img => !img || typeof img.id !== 'string' || !/^data:image\/[a-z0-9.+-]+;base64,/i.test(img.data || ''))) {
    throw new Error('备份中的图片数据无效');
  }
  const imageMap = new Map(images.map(img => [img.id, crypto.randomUUID()]));
  if (imageMap.size !== images.length) throw new Error('备份中存在重复的图片 ID');

  // Auto safety point
  await saveRestorePoint('导入前自动留档');

  // Store images
  for (const img of images) {
    const response = await fetch(img.data);
    const blob = await response.blob();
    await storeImage(blob, imageMap.get(img.id));
  }

  const normalized = normalize(rawJson);
  normalized.items.forEach(item => {
    item.images = (item.images || []).map(id => imageMap.get(id)).filter(Boolean);
  });

  const previousState = JSON.parse(JSON.stringify(store.state));
  const previousLanguage = store.language;
  Object.assign(store.state, normalized);
  store.language = normalized.languageMode;
  if (!store.persist()) {
    Object.assign(store.state, previousState);
    store.language = previousLanguage;
    throw new Error('导入的数据无法保存，请检查设备存储空间');
  }
  return true;
}
