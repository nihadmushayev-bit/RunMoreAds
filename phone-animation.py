from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps
import math, subprocess, pathlib

root=pathlib.Path(__file__).resolve().parent
ffmpeg=root/'node_modules/ffmpeg-static/ffmpeg.exe'
out=root/'dist/assets/run-more-ads/videos/phone-growth.mp4'
fontpath='C:/Windows/Fonts/arial.ttf'
font=lambda size:ImageFont.truetype(fontpath,size)
poster=Image.open(root/'dist/assets/run-more-ads/videos/beauty-studio.jpg').convert('RGB')
photo=ImageOps.fit(poster,(272,248),centering=(.5,.4))
process=subprocess.Popen([str(ffmpeg),'-y','-f','rawvideo','-pix_fmt','rgb24','-s','720x720','-r','24','-i','-','-an','-c:v','libx264','-crf','20','-preset','fast','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
for n in range(144):
    t=n/24
    frame=Image.new('RGB',(720,720),(247,242,234))
    shadow=Image.new('RGBA',(720,720))
    sd=ImageDraw.Draw(shadow)
    sd.ellipse((164,574,596,644),fill=(0,0,0,45))
    shadow=shadow.filter(ImageFilter.GaussianBlur(20))
    frame.paste(shadow,(0,0),shadow)
    phone=Image.new('RGBA',(352,594))
    d=ImageDraw.Draw(phone)
    d.rounded_rectangle((16,7,346,581),radius=48,fill='#0b0c0e')
    d.rounded_rectangle((3,2,333,572),radius=47,fill='#34363a',outline='#66686c',width=2)
    d.rounded_rectangle((10,8,327,564),radius=43,fill='#090a0b')
    d.rounded_rectangle((23,20,313,550),radius=34,fill='#f4f1e9')
    d.rounded_rectangle((108,30,229,49),radius=10,fill='#090a0b')
    d.text((42,69),'Run More Ads',font=font(19),fill='#111111')
    d.ellipse((42,108,66,132),fill='#111111')
    d.text((75,110),'Beauty Studio',font=font(13),fill='#222222')
    crop=photo.resize((272+int(6*math.sin(t)),248+int(6*math.sin(t))))
    crop=ImageOps.fit(crop,(272,248))
    mask=Image.new('L',(272,248));ImageDraw.Draw(mask).rounded_rectangle((0,0,271,247),radius=15,fill=255)
    phone.paste(crop,(32,147),mask)
    d=ImageDraw.Draw(phone)
    d.text((42,412),'Creative that converts.',font=font(16),fill='#111111')
    d.rounded_rectangle((42,446,291,507),radius=12,fill='#161719')
    growth=int(65+24*(.5+.5*math.sin(t*math.pi/3)))
    d.text((55,457),f'+{growth}% growth',font=font(17),fill='#ffffff')
    points=[(56+i*10,493-6*math.sin(i*.65+t)-i*.65)for i in range(22)]
    d.line(points,fill='#a4c9b5',width=3)
    d.rounded_rectangle((122,532,215,536),radius=2,fill='#090a0b')
    angle=-13+4*math.sin(t*math.pi/3)
    phone=phone.rotate(angle,Image.Resampling.BICUBIC,expand=True)
    x=(720-phone.width)//2+int(7*math.sin(t*math.pi/3))
    y=(720-phone.height)//2-12+int(9*math.cos(t*math.pi/3))
    frame.paste(phone,(x,y),phone)
    process.stdin.write(frame.tobytes())
process.stdin.close()
if process.wait()!=0:raise RuntimeError('Phone render failed')
print('Created',out)
