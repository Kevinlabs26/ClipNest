// Clipboard and Tauri native bridge utilities
import { renderInlineMarkupForClipboard } from './text.js';
import { uiText } from './dom.js';

// Invoke Tauri Rust backend command with error handling
export function nativeInvoke(command, args) {
  const invoke = window.__TAURI__?.core?.invoke;
  if (!invoke) throw new Error(uiText('此功能需要在 ClipNest 桌面版中使用'));
  return invoke(command, args);
}

// Format Markdown bold syntax into parallel plain-text and HTML formats
export function clipboardContent(content) {
  const boldRegex = /\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;
  const plainSource = String(content ?? '').replace(/\[\[(?:color|bg)=#[\da-f]{6}\]\]|\[\[\/(?:color|bg)\]\]/ig, '');
  const plain = plainSource.replace(boldRegex, (_, strong, emphasis) => `**${strong ?? emphasis}**`);
  const html = renderInlineMarkupForClipboard(content).replace(/\r?\n/g, '<br>');
  return { plain, html };
}

// Copy text to clipboard with dual plain/html mime-type support
export async function writeTextToClipboard(content) {
  const { plain, html } = clipboardContent(content);
  try {
    if (navigator.clipboard?.write && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/plain': new Blob([plain], { type: 'text/plain' }),
          'text/html': new Blob([html], { type: 'text/html' })
        })
      ]);
      return true;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(plain);
      return true;
    }
    throw new Error('Clipboard API unavailable');
  } catch {
    // Fallback for restricted WebViews
    const textarea = document.createElement('textarea');
    textarea.value = plain;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    textarea.remove();
    return successful;
  }
}

// Copy image blob to system clipboard as standard PNG
export async function writeImageToClipboard(blob) {
  if (!blob) throw new Error('Image is missing');
  if (!navigator.clipboard?.write || !window.ClipboardItem) {
    throw new Error('Image clipboard is unavailable');
  }
  const bitmap = await createImageBitmap(blob);
  const canvas = document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const pngBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  if (!pngBlob) throw new Error('Could not encode image to PNG');
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': pngBlob })]);
  return true;
}
