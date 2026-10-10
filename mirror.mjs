import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const origin = 'https://scalible.com';
const root = path.resolve('dist');
const pages = new Map();
const assets = new Map();
const failures = [];
const textFiles = new Map();
const pending = [];
const decode = s => s.replaceAll('&amp;', '&').replaceAll('\\u0026', '&');
const textExtension = /\.(?:mjs|js|css|json|svg)$/i;
const assetHost = /^(?:framerusercontent\.com|fonts\.gstatic\.com)$/;
function localAsset(url) {
  const u = new URL(url);
  const query = u.search ? '-' + crypto.createHash('sha1').update(u.search).digest('hex').slice(0, 10) : '';
  const ext = path.posix.extname(u.pathname);
  const file = query ? u.pathname.slice(0, -ext.length) + query + ext : u.pathname;
  return '/assets/' + u.hostname + file;
}
function addAsset(url) {
  url = decode(url);
  if (assets.has(url)) return;
  const u = new URL(url);
  if (!assetHost.test(u.hostname) || !path.posix.extname(u.pathname)) return;
  assets.set(url, localAsset(url));
  pending.push(url);
}
function scan(content, base) {
  for (const m of content.matchAll(/https:\/\/(?:framerusercontent\.com|fonts\.gstatic\.com)\/[^\s"'`<>\\)]+/g)) addAsset(m[0]);
  if (/\.(?:mjs|js|css)$/.test(new URL(base).pathname)) {
    for (const m of content.matchAll(/(?:from\s*|import\s*\(|import\s*)["'`](\.[^"'`]+)["'`]/g)) addAsset(new URL(m[1], base).href);
  }
}
async function request(url, allow404=false) {
  let error;
  for (let n=0;n<3;n++) {
    try {
      const r = await fetch(url, {signal: AbortSignal.timeout(90000)});
      if (!r.ok && !(allow404 && r.status===404)) throw new Error('HTTP '+r.status);
      return r;
    } catch(e) { error=e; }
  }
  throw error;
}
const queue = ['/'];
while (queue.length) {
  const route=queue.shift();
  if (pages.has(route)) continue;
  const r=await request(origin+route,true);
  const html=await r.text();
  pages.set(route,html);
  scan(html,origin+route);
  for (const m of html.matchAll(/href="([^"?#]+)(?:[?#][^"]*)?"/g)) {
    const u=new URL(decode(m[1]),origin+route);
    if(u.origin===origin && !path.posix.extname(u.pathname) && !pages.has(u.pathname) && !queue.includes(u.pathname)) queue.push(u.pathname);
  }
  console.log('PAGE',route,html.length);
}
let completed=0;
async function worker() {
  while(pending.length) {
    const url=pending.shift();
    try {
      const dest=path.join(root,assets.get(url));
      let bytes;
      try {if(textExtension.test(new URL(url).pathname))throw new Error('Refresh source text');bytes=await fs.readFile(dest);}catch {const r=await request(url);bytes=Buffer.from(await r.arrayBuffer());}
      await fs.mkdir(path.dirname(dest),{recursive:true});
      if(textExtension.test(new URL(url).pathname)) {
        const content=bytes.toString();
        textFiles.set(url,content);
        scan(content,url);
      }
      await fs.writeFile(dest,bytes);
      completed++;
      if(completed%25===0)console.log('ASSETS',completed,'pending',pending.length);
    }catch(e){failures.push({url,error:e.message});console.log('FAILED',url,e.message);}
  }
}
await Promise.all(Array.from({length:8},worker));
const replacements=[...assets].sort((a,b)=>b[0].length-a[0].length);
function rewrite(content,isHtml=false) {
  for(const [url,local] of replacements) content=content.split(url).join(local).split(url.replaceAll('&','&amp;')).join(local);
  content=content.replaceAll('https://scalible.com/', '/').replaceAll('https://scalible.com', '');
  if(isHtml) {
    content=content.replace(/<script[^>]*src="https:\/\/events\.framer\.com[^>]*><\/script>/g,'');
    content=content.replace(/<link[^>]*rel="canonical"[^>]*>/g,'');
    content=content.replace(/<meta[^>]*property="og:url"[^>]*>/g,'');
  }
  return content;
}
for(const [url,content] of textFiles) await fs.writeFile(path.join(root,assets.get(url)),rewrite(content));
for(const [route,html] of pages) {
  const dest=path.join(root,route,'index.html');
  await fs.mkdir(path.dirname(dest),{recursive:true});
  await fs.writeFile(dest,rewrite(html,true));
}
await fs.writeFile('mirror-report.json',JSON.stringify({source:origin,date:new Date().toISOString(),pages:[...pages.keys()],assetCount:completed,failures},null,2));
console.log('COMPLETE',pages.size,'pages',completed,'assets',failures.length,'failures');
if(failures.length)process.exitCode=1;
