import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const removedClasses = ['framer-jx0221', 'framer-1oaxvj4', 'framer-9mtn8n'];
const headings = ["Brands we've scaled with Meta ads.", 'Brands we’ve helped grow on social.'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat();
}

function removeHtmlBlock(source, className) {
  const opening = new RegExp('<(div|section)\\b[^>]*class="' + className + '(?: [^"]*)?"[^>]*>');
  let match;
  while ((match = opening.exec(source))) {
    const tags = new RegExp('<\\/?' + match[1] + '\\b[^>]*>', 'g');
    tags.lastIndex = match.index;
    let depth = 0, end;
    for (let tag; (tag = tags.exec(source));) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (!depth) { end = tags.lastIndex; break; }
    }
    if (!end) throw new Error('Unclosed reference block: ' + className);
    source = source.slice(0, match.index) + source.slice(end);
  }
  return source;
}

function endCall(source, start) {
  let depth = 0, quote = null;
  for (let i = start; i < source.length; i++) {
    const char = source[i];
    if (quote) {
      if (char === '\\') i++;
      else if (char === quote) quote = null;
    } else if (char === '"' || char === "'" || char === '`') quote = char;
    else if (char === '(') depth++;
    else if (char === ')' && --depth === 0) return i + 1;
  }
  throw new Error('Unclosed reference component');
}

function removeRuntimeBlock(source, className) {
  const marker = 'className:`' + className + '`';
  let index;
  while ((index = source.indexOf(marker)) >= 0) {
    const prefix = source.slice(0, index);
    const calls = [...prefix.matchAll(/\b(?:u|h|o|l)\([A-Za-z_$][\w$]*,\{__framer__animate:/g)];
    const start = calls.at(-1)?.index;
    if (start === undefined || index - start > 400) throw new Error('Cannot identify reference component: ' + className);
    const end = endCall(source, start);
    source = source.slice(0, start) + 'null' + source.slice(end);
  }
  return source;
}

function stripSearchHeadings(value) {
  if (Array.isArray(value)) return value.filter(v => !headings.includes(v)).map(stripSearchHeadings);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, stripSearchHeadings(v)]));
  return value;
}

let changed = 0;
for (const file of await walk(root)) {
  if (!/\.(html|mjs|js|json)$/.test(file)) continue;
  let source = await fs.readFile(file, 'utf8');
  const original = source;
  for (const className of removedClasses) {
    if (file.endsWith('.html')) source = removeHtmlBlock(source, className);
    if (file.endsWith('.mjs')) source = removeRuntimeBlock(source, className);
  }
  source = source.replaceAll('Scottsdale, Arizona', 'Azerbaijan')
    .replaceAll('across the United States', 'across Azerbaijan')
    .replaceAll('Working with clients nationwide, with on site filming across the Valley', 'Working with clients across Azerbaijan, with on site filming nationwide');
  if (/searchIndex-[^/\\]+\.json$/.test(file)) source = JSON.stringify(stripSearchHeadings(JSON.parse(source)));
  if (source !== original) { await fs.writeFile(file, source); changed++; }
}
console.log('Reference sections and Azerbaijan location updated in', changed, 'files');
await import('./complete-site.mjs');
