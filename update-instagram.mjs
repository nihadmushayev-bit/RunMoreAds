import fs from 'node:fs/promises';
import path from 'node:path';
const url='https://www.instagram.com/runmoreadsco';
const root=path.resolve('dist');
async function walk(d){const out=[];for(const e of await fs.readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())out.push(...await walk(p));else out.push(p);}return out;}
function endCall(s,start){let depth=0,quote=null;for(let i=start;i<s.length;i++){const c=s[i];if(quote){if(c==='\\'){i++;continue;}if(c===quote)quote=null;continue;}if(c==='"'||c==="'"||c==='`'){quote=c;continue;}if(c==='(')depth++;if(c===')'&&--depth===0)return i+1;}throw new Error('Unclosed Instagram component');}
let changed=0;
for(const file of await walk(root)){
 if(!/\.(html|mjs|js|json)$/.test(file))continue;
 let s=await fs.readFile(file,'utf8'), original=s;
 s=s.replaceAll('"aria-label":`Instagram @runmoreadsco`,style:{display:`contents`}', '"aria-label":`Instagram @runmoreadsco`,style:{display:`inline-flex`,width:16,height:16}').replaceAll('aria-label="Instagram @runmoreadsco" style="display:contents"','aria-label="Instagram @runmoreadsco" style="display:inline-flex;width:16px;height:16px"');
 s=s.replaceAll('https://instagram.com',url).replaceAll('href:`instagram.com`','href:`'+url+'`');
 s=s.replace(/(cOjr0oSd0:`InstagramLogo`[\s\S]{0,400}?ws1WndZLy:)`[^`]+`/g,'$1`'+url+'`');
 s=s.replace(/(<div class="(?:framer-fwbmrz|framer-1eja2p7)-container"[^>]*>[\s\S]{0,600}?<a\b[^>]*\bhref=")[^"]+/g,'$1'+url);
 if(file.endsWith('.mjs')&&!s.includes('Instagram @runmoreadsco')){
  for(const [marker,jsx] of [['o(F,{children:o(j,{className:`framer-19p8c3f-container`','o'],['u(B,{children:u(I,{className:`framer-jin4d6-container`','u']]){
   const start=s.indexOf(marker);
   if(start>=0){const end=endCall(s,start);s=s.slice(0,start)+jsx+'(`a`,{href:`'+url+'`,target:`_blank`,rel:`noopener noreferrer`,"aria-label":`Instagram @runmoreadsco`,style:{display:`inline-flex`,width:16,height:16},children:'+s.slice(start,end)+'})'+s.slice(end);}
  }
 }
 if(file.endsWith('.html')&&!s.includes('Instagram @runmoreadsco')){
  const starts=[...s.matchAll(/<div class="framer-(?:19p8c3f|jin4d6)-container"/g)].map(x=>x.index).reverse();
  for(const start of starts){const tags=/<\/?div\b[^>]*>/g;tags.lastIndex=start;let depth=0,end;for(let m;(m=tags.exec(s));){depth+=m[0].startsWith('</')?-1:1;if(depth===0){end=tags.lastIndex;break;}}if(!end)throw new Error('Unclosed Instagram icon');s=s.slice(0,start)+`<a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Instagram @runmoreadsco" style="display:inline-flex;width:16px;height:16px">`+s.slice(start,end)+'</a>'+s.slice(end);}
 }
 if(s!==original){await fs.writeFile(file,s);changed++;}
}
console.log('Instagram updated in',changed,'files');
await import('./update-location-and-references.mjs');
