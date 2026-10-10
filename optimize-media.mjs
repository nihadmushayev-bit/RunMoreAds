import fs from 'node:fs/promises';
import path from 'node:path';
import {spawn} from 'node:child_process';
import ffmpeg from 'ffmpeg-static';
await fs.mkdir('raw-media',{recursive:true});
const manifest=JSON.parse(await fs.readFile('media-sources.json','utf8'));
const jobs=manifest.map(v=>({name:v.name,output:path.join('dist',v.file),input:path.join('raw-media',v.name+'.mp4')}));
for(const j of jobs){try{await fs.access(j.input);}catch{await fs.rename(j.output,j.input);}}
async function encode(j){await new Promise((resolve,reject)=>{const p=spawn(ffmpeg,['-y','-i',j.input,'-t','10','-vf','scale=-2:720','-r','24','-an','-c:v','libx264','-crf','24','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',j.output],{stdio:'ignore'});p.on('exit',code=>code===0?resolve():reject(new Error(j.name+' '+code)));});console.log('OPTIMIZED',j.name,(await fs.stat(j.output)).size);}
await Promise.all(Array.from({length:2},async()=>{while(jobs.length)await encode(jobs.shift());}));
