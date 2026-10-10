import fs from 'node:fs/promises';
const tags=['beauty','car','online-shopping','coffee','business','fitness'];
const catalog=[];
for(const tag of tags){const h=await fs.readFile(tag+'-stock.html','utf8');for(const m of h.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)){try{const j=JSON.parse(m[1]);for(const v of (Array.isArray(j)?j:j['@graph']||[j]).filter(v=>v['@type']==='VideoObject'&&v.copyrightNotice==='Free'))catalog.push({...v,tag});}catch{}}}
const selections=[['automotive','52427'],['beauty-studio','52039'],['ecommerce','42136'],['creative-studio','4809'],['campaign-strategy','42648'],['coffee-brand','41859'],['product-detail','4982'],['beauty-creative','42723'],['performance-training','52079'],['digital-store','42121']];
await fs.mkdir('dist/assets/run-more-ads/videos',{recursive:true});
const manifest=[];
for(const [name,id] of selections){const v=catalog.find(v=>v.contentUrl.includes('/'+id+'/'));if(!v)throw new Error('Missing verified source '+id);manifest.push({name,title:v.name.trim(),source:v['@id'].replace('#video',''),license:'Mixkit Stock Video Free License',licenseUrl:'https://mixkit.co/license/#videoFree',download:v.contentUrl,posterDownload:v.thumbnailUrl,file:'/assets/run-more-ads/videos/'+name+'.mp4',poster:'/assets/run-more-ads/videos/'+name+'.jpg'});}
await Promise.all(manifest.map(async(v)=>{for(const [url,dest] of [[v.download,'dist'+v.file],[v.posterDownload,'dist'+v.poster]]){let ok=false;for(let i=0;i<3&&!ok;i++){try{const r=await fetch(url,{signal:AbortSignal.timeout(90000)});if(!r.ok)throw new Error('HTTP '+r.status);await fs.writeFile(dest,Buffer.from(await r.arrayBuffer()));ok=true;}catch(e){if(i===2)throw e;}}}console.log('DOWNLOADED',v.name);}));
await fs.writeFile('media-sources.json',JSON.stringify(manifest,null,2));
console.log('COMPLETE',manifest.length,'real footage clips');
