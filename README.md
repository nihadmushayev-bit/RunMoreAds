# Run More Ads

Güncel ajans web sitesi. Vercel yayını: https://runmoreads.vercel.app/

Sites yayını: https://run-more-ads-nihad.vividmug4.chatgpt.site/

Site dosyaları `dist/` içindedir. CRM kayıt fonksiyonu Base44 üzerinde ayrıca barındırılır; bu depo web sitesinin kaynaklarını ve form bağlantı ayarını içerir.

10 Ekim 2026 tarihinde https://scalible.com/ adresinde yayında olan sitenin tarayıcıya sunulan sürümü.

Ana sayfa ve About sayfasının düzeni ve Framer etkileşimleri korunmuştur. Case Studies, dört yaratıcı çalışma örneği, Blog ve dört makale, iletişim, gizlilik, kullanım koşulları ve 404 sayfaları tamamlanmıştır. Eski içerik adresleri yeni sayfalara yönlendirilir. Marka adı Run More Ads olarak değiştirilmiştir. Hizmet ve süreç ikonları, tüm video dosyaları ve kadın–erkek–kadın sırasındaki ekip portreleri yenilenmiştir. Kullanıcının sağladığı ana logo menüde, açılış animasyonunda, marka alanlarında ve alt bölümde kullanılır. Ecommerce ve Automotive için özgün butik ve otomotiv marka işaretleri hazırlanmıştır. İletişim adresi runmoreadsteam@gmail.com olarak güncellenmiştir.

Ekip portreleri yerleşim amaçlı üretilmiş kurgusal kişilerdir. Bunlar gerçek ekip üyelerinin kimlikleri değildir. `image-prompts-v2.json`, farklı toplantı anları ve grafik arka planlı yeni ekip görsellerinin built-in image_gen istemlerini içerir. Videolar gerçek çekim stok görüntüleridir; konu adlarıyla etiketlenmişlerdir. `media-sources.json`, klip isimlerini, kaynak sayfalarını ve lisans bilgilerini içerir. Telefon animasyonu `phone-animation.py` ile özel olarak hazırlanmıştır.

## Çalıştırma

Node.js kurulu bir bilgisayarda bu klasörde terminal açın:

```sh
npm start
```

Ardından http://127.0.0.1:4173 adresini açın. Kurulum veya paket indirme gerekmez. `index.html` dosyasını çift tıklamak yerine sunucu kullanın; JavaScript modülleri HTTP üzerinden yüklenir.

## Dosyalar

- `dist/`: Sunucuya yüklenebilen site dosyaları.
- `server.mjs`: Yerel sunucu; videolar için Range isteklerini destekler.
- `mirror.mjs`: Orijinal yayındaki sürümü yeniden indiren kaynak toplama betiği; değişiklikleri geri alabileceği için düzenlenmiş sürümde yeniden çalıştırmayın.
- `rebrand.mjs`: Marka, ikon ve medya eşleştirmelerini uygulayan betik.
- `media-sources.json`: Video isimleri ve kaynakları.
- `package.json`: Çalıştırma komutları.

Instagram https://www.instagram.com/runmoreadsco adresine, LinkedIn ise https://www.linkedin.com/company/runmoreadsco adresine bağlanır. Twitter kaldırılmıştır; LinkedIn yalnızca metin bağlantısıdır. Ajans rakamları kullanıcının doğruladığı $50K+ gelir ve 50+ markadır; kuruluş 2024, konum Azerbaycan'dır. Eski müşteri sonuçları ve şablon müşteri isimleri kaldırılmıştır. Video case study sayfaları, sitedeki lisanslı stok çekimlerle hazırlanmış yaratıcı konseptlerdir; müşteri kampanyası sonucu iddia etmez.

İletişim formu referanstaki çizgili alanlar ve yuvarlak seçeneklerle düzenlenmiştir. Başvurular e-posta gönderimi olmadan Base44 CRM içindeki Website Enquiries / Sayt müraciətləri bölümüne kaydedilir. Bağlantı `dist/assets/run-more-ads/site/crm-config.json` dosyasındadır; gizli anahtar içermez. Sunucu doğrulama, honeypot, gönderim sınırları ve aynı kimlikle sıralı tekrar kontrolü uygular. Base44 atomik benzersizlik sağlamadığı için eşzamanlı isteklere mutlak tek kayıt garantisi yoktur. Form başarılı sunucu yanıtı gelmeden başarı göstermez; hatada bilgiler korunur. Bir görüşme talebi oluşturur; takvim saati otomatik rezerve edilmez. `complete-site.mjs` tamamlanan sayfaları üretir. Ana sayfadan yeni sayfalara geçişler tamamlanan sayfaları yükler.

## Vercel ve CRM bağlantısı

Vercel’de Framework Preset `Other`, proje kökü depo kökü ve Output Directory `dist` kullanılır. Form mevcut `crm-config.json` üzerinden Base44 kayıt fonksiyonuna doğrudan gönderir; Vercel ortam değişkeni veya tarayıcıya API anahtarı eklemek gerekmez.

CRM fonksiyonunun izinli Origin listesinde `https://runmoreads.vercel.app`, mevcut Sites adresi ve yerel QA adresi bulunur. Alan adı değiştirilirse Base44 `submitWebsiteEnquiry` fonksiyonunun izinli Origin listesine yeni tam origin eklenip CRM uygulaması yeniden yayınlanmalıdır. Sadece GitHub/Vercel yayını yapmak bu sunucu ayarını değiştirmez. Tüm `vercel.app` siteleri için joker izin kullanmayın.
