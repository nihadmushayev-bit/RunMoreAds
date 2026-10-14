import fs from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const base = '/assets/run-more-ads/';
await fs.mkdir(path.join(root, 'assets/run-more-ads/brand'), {recursive:true});
await fs.mkdir(path.join(root, 'assets/run-more-ads/brands'), {recursive:true});
// Keep the supplied artwork intact. The SVG viewport frames the original PNG.
const logo = await fs.readFile(path.join(root, 'assets/run-more-ads/brand/run-more-ads-original.png')).catch(() => fs.readFile('C:/Users/nihad/Downloads/Run More Ads Logo.png'));
await fs.writeFile(path.join(root, 'assets/run-more-ads/brand/run-more-ads-original.png'), logo);
// Uniformly scale the artwork; centre its visible R, with generous black padding.
await fs.writeFile(path.join(root, 'assets/run-more-ads/brand/run-more-ads-logo-v3.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" role="img" aria-label="Run More Ads"><rect width="640" height="640" fill="#000"/><image href="data:image/png;base64,${logo.toString('base64')}" x="-119.95" y="-115.75" width="877.8" height="877.8"/></svg>`);

const brands = {
 'ecommerce': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Ecommerce EC monogram"><rect width="80" height="80" rx="40" fill="#6753ad"/><path d="M37 22H22V58H37M22 40H35" fill="none" stroke="#fffaf0" stroke-width="7" stroke-linejoin="round"/><path d="M61 26C43 13 33 28 33 40S43 67 61 54" fill="none" stroke="#fffaf0" stroke-width="7" stroke-linecap="square"/></svg>`,
 'automotive': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Automotive A monogram"><rect width="80" height="80" rx="40" fill="#951f36"/><path d="M17 59 36 20H45L64 59H52L40 32 28 59Z" fill="#fff6e7"/><path d="M34 48H58L61 54H31Z" fill="#fff6e7"/><path d="M14 64H66" stroke="#fff6e7" stroke-width="2"/></svg>`
};
for (const [name, svg] of Object.entries(brands)) await fs.writeFile(path.join(root, `assets/run-more-ads/brands/${name}.svg`),svg);

const css = `
.framer-8N0MW,.framer-2F1uX{overflow:hidden!important}
.framer-8N0MW{border-radius:8px!important}
.framer-2F1uX{border-radius:12px!important}
[data-framer-name="D1FF5F1B-A775-4FF7-8EF4-B5EFBA3632A8"]{width:100%!important;height:100%!important;top:50%!important;left:50%!important;border-radius:0!important}
[data-framer-name="D1FF5F1B-A775-4FF7-8EF4-B5EFBA3632A8"] img{border-radius:0!important;object-fit:contain!important}
a[data-framer-name="Logo"]{width:max-content!important;min-width:0!important;gap:9px!important;align-items:center!important}
a[data-framer-name="Logo"]>div:has(>.framer-8N0MW){width:32px!important;height:32px!important;flex:none!important}
a[data-framer-name="Logo"] h1{--framer-font-size:22px!important;--framer-letter-spacing:-.055em!important;--framer-line-height:110%!important}
[data-framer-name="Logo"] h1{white-space:nowrap;--framer-font-size:23px!important}
a[data-framer-name="Logo"] h1{--framer-font-size:22px!important}
.framer-1iu6so h1{--framer-font-size:28px!important}
.framer-13w7suw{background:#000!important;border-radius:8px!important;overflow:hidden!important}
.framer-13w7suw .framer-1vs828r{width:100%!important;height:100%!important;top:50%!important;left:50%!important;filter:none!important;-webkit-filter:none!important}
[data-framer-name="Preloader"]::before,[data-framer-name="Preloader"]::after{content:none!important}
.framer-6pNpP .framer-2ms3g7{width:60px!important;height:60px!important;top:0!important;background-image:url('${base}brand/run-more-ads-logo-v3.svg')!important;background-size:contain!important;background-position:center!important;background-repeat:no-repeat!important}
.framer-6pNpP .framer-2ms3g7>div{display:none!important}
@media(max-width:809px){a[data-framer-name="Logo"]{gap:8px!important}a[data-framer-name="Logo"] h1{--framer-font-size:21px!important}}
@media(max-width:767px){.framer-LGey9 .framer-1s4bke0{padding-top:88px!important}.framer-LGey9 .framer-1s4bke0 .framer-3o224j{height:auto!important}}

`;

async function walk(dir) {const out=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);if(e.isDirectory())out.push(...await walk(f));else out.push(f);}return out;}
let changed = 0;
for(const file of await walk(root)) {
 if(!/\.(html|mjs|js|json|css)$/.test(file))continue;
 let s=await fs.readFile(file,'utf8'), original=s;
 s=s.replaceAll(base+'brand/run-more-ads-logo.svg',base+'brand/run-more-ads-logo-v3.svg');
 s=s.replace(/\/assets\/framerusercontent\.com\/images\/(?:D5MEWnPA9ePRqCdAvOVY33eL7Q|TQzw53CcJfN5rlajBHEdbvKlis|spfOSmDREC26YmpSFS1EN7rf6U)(?:-[a-f0-9]+)?\.png/g, base+'brand/run-more-ads-logo-v3.svg');
 // Only story avatar objects change; the service icons stay in their cards.
 s=s.replace(/avatar:([\w]+)\(\{[\s\S]*?\},``\),id:`default-item-[01]`,media:`\/assets\/run-more-ads\/videos\/(ecommerce|automotive)\.mp4`/g,(match,fn,category)=>match.replaceAll(base+'icons/social-conversation.svg',base+'brands/'+category+'.svg').replaceAll(base+'icons/paid-target.svg',base+'brands/'+category+'.svg'));
 s=s.replace(/<img src="\/assets\/run-more-ads\/icons\/social-conversation\.svg" alt style="width:20px;height:20px;border-radius:50%;object-fit:cover">/g, `<img src="${base}brands/ecommerce.svg" alt="Ecommerce logo" style="width:20px;height:20px;border-radius:50%;object-fit:cover">`);
 s=s.replace(/<img src="\/assets\/run-more-ads\/icons\/paid-target\.svg" alt style="width:20px;height:20px;border-radius:50%;object-fit:cover">/g, `<img src="${base}brands/automotive.svg" alt="Automotive logo" style="width:20px;height:20px;border-radius:50%;object-fit:cover">`);
 for(const name of ['creative-team','media-buying-team','account-team'])s=s.replaceAll(base+'team/'+name+'.png',base+'team/'+name+'-v2.jpg');
 s=s.replaceAll('Portrait of a woman in an ivory shirt and taupe overshirt','Creative strategist speaking at a colourful studio meeting').replaceAll('Portrait of a man in a charcoal t-shirt','Media strategist listening at a meeting in black and white').replaceAll('Portrait of a woman with dark curly hair in a black blouse','Account strategist in a relaxed portrait against a graphic studio wall');
 s=s.replace(/\b(?:scalibleteam@gmail\.com|hello@viral\.coowbase\.co|hello@viral\.com|hello@viral\.co)\b/g,'runmoreadsteam@gmail.com');
 if(file.endsWith('.html')){
  s=s.replace(/<style id="rma-brand-style">[\s\S]*?<\/style>/g,'');
  s=s.replace('</head>',`<style id="rma-brand-style">${css}</style></head>`);
 }
 if(s!==original){await fs.writeFile(file,s);changed++;}
}
console.log('Refined branding in',changed,'source files');
await import('./update-instagram.mjs');
