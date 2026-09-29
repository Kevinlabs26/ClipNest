// Text processing, sanitization, template variable parsing, and highlight helpers

// Escape HTML control characters
export function esc(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Render search term highlights and template variable badges
export function highlight(text, term = '') {
  const paint = (value) => {
    let safe = esc(value);
    const escapedTerm = term ? term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
    if (escapedTerm) {
      safe = safe.replace(new RegExp(`(${escapedTerm})`, 'ig'), '<mark>$1</mark>');
    }
    // Render placeholders like {{name}} as visual badge chips
    return safe.replace(/(\{\{\s*([^{}]+?)\s*\}\})/g, '<span class="template-variable">$1</span>');
  };
  return renderInlineMarkup(text, paint);
}

function findColorClose(source, start, kind) {
  const token = new RegExp(`\\[\\[${kind}=(#[\\da-f]{6})\\]\\]|\\[\\[\\/${kind}\\]\\]`, 'ig');
  token.lastIndex = start;
  let depth = 1;
  let match;
  while ((match = token.exec(source))) {
    if (match[1]) depth++;
    else if (--depth === 0) return match.index;
  }
  return -1;
}

function renderInlineMarkup(source, paint = esc) {
  source = String(source ?? '');
  const colorOpen = /\[\[(color|bg)=(#[\da-f]{6})\]\]/ig;
  const bold = /\*\*([^*\n]+?)\*\*|\*([^*\n]+?)\*/g;
  let html = '';
  let cursor = 0;
  while (cursor < source.length) {
    colorOpen.lastIndex = cursor;
    bold.lastIndex = cursor;
    const colorMatch = colorOpen.exec(source);
    const boldMatch = bold.exec(source);
    if (colorMatch && (!boldMatch || colorMatch.index < boldMatch.index)) {
      const kind = colorMatch[1].toLowerCase();
      const color = colorMatch[2].toLowerCase();
      const closeAt = findColorClose(source, colorOpen.lastIndex, kind);
      if (closeAt < 0) { html += paint(source.slice(cursor)); break; }
      html += paint(source.slice(cursor, colorMatch.index));
      const attribute = kind === 'color' ? 'text-color' : 'text-bg';
      const property = kind === 'color' ? 'color' : 'background-color';
      html += `<span data-${attribute}="${color}" style="${property}:${color}">${renderInlineMarkup(source.slice(colorOpen.lastIndex, closeAt), paint)}</span>`;
      cursor = closeAt + `[[/${kind}]]`.length;
    } else if (boldMatch) {
      html += paint(source.slice(cursor, boldMatch.index));
      html += `<strong>${renderInlineMarkup(boldMatch[1] ?? boldMatch[2], paint)}</strong>`;
      cursor = bold.lastIndex;
    } else {
      html += paint(source.slice(cursor));
      break;
    }
  }
  return html;
}

export function renderInlineMarkupForClipboard(text) {
  return renderInlineMarkup(text, esc);
}

// Extract distinct variable names formatted as {{varName}}
export function extractVariables(text) {
  const pattern = /\{\{\s*([^{}]+?)\s*\}\}/g;
  const variables = [];
  let match;
  while ((match = pattern.exec(text || ''))) {
    const varName = match[1].trim();
    if (varName && !variables.includes(varName)) {
      variables.push(varName);
    }
  }
  return variables;
}

// Replace variables with user inputs
export function renderTemplate(text, values = {}) {
  return (text || '').replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (_, name) => {
    const key = name.trim();
    return values[key] !== undefined ? values[key] : `{{${key}}}`;
  });
}

// Read rich-text HTML node and convert bold elements into Markdown
export function richTextValue(element) {
  if (!element) return '';
  const blocks = new Set(['DIV', 'P', 'LI']);

  function readNode(node, insideBold = false) {
    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue || '';
    if (node.nodeType !== Node.ELEMENT_NODE) return '';
    if (node.tagName === 'BR') return '\n';

    const ownBold = node.matches('b, strong') || /^(bold|[6-9]00)$/.test(node.style.fontWeight);
    const bold = ownBold && !insideBold;
    let value = Array.from(node.childNodes).map(child => readNode(child, insideBold || ownBold)).join('');
    for (const [kind, color] of [['color', node.dataset.textColor], ['bg', node.dataset.textBg]]) {
      if (/^#[\da-f]{6}$/i.test(color || '') && value) value = `[[${kind}=${color.toLowerCase()}]]${value}[[/${kind}]]`;
    }
    if (bold && value) value = `*${value}*`;
    return blocks.has(node.tagName) && (!value || !value.endsWith('\n')) ? `${value}\n` : value;
  }

  return readNode(element).replace(/\n+$/, '');
}

// Build human-readable path string for nested categories
export function categoryPath(name, categories = [], categoryParents = {}) {
  if (!name) return '未分类';
  const path = [name];
  let current = name;
  const visited = new Set([name]);

  while (categoryParents[current] && categories.includes(categoryParents[current])) {
    const parent = categoryParents[current];
    if (visited.has(parent)) break;
    visited.add(parent);
    path.unshift(parent);
    current = parent;
  }
  return path.join(' / ');
}
