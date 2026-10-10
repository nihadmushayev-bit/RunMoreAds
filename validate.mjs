import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=path.resolve('dist');
async function walk(dir){const a=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())a.push(...await walk(p));else a.push(p);}return a;}
const files=await walk(root),missing=new Set(),syntax=[];
for(const file of files.filter(f=>/\.(html|mjs|js|css|json)$/.test(f))){
 const s=await fs.readFile(file,'utf8');
 for(const m of s.matchAll(/\/assets\/[^\s"'`<>\\,)]+/g)){if(m[0].includes('${'))continue;const p=path.join(root,m[0].replaceAll('&amp;','&'));try{await fs.access(p);}catch{missing.add(m[0]);}}
 if(file.endsWith('.mjs')){const r=spawnSync(process.execPath,['--check',file],{encoding:'utf8'});if(r.status!==0)syntax.push({file,error:r.stderr});}
}
const pages=files.filter(f=>f.endsWith('index.html'));
for(const page of pages){const route=path.relative(root,path.dirname(page)).split(path.sep).join('/');const r=await fetch('http://127.0.0.1:4173/'+route);if(!r.ok)throw new Error('Page failed '+route);}
const result={pages:pages.length,files:files.length,missing:[...missing],syntaxErrors:syntax};
await fs.writeFile('validation-report.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result));
if(missing.size||syntax.length)process.exitCode=1;
