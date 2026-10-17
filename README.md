# Run More Ads — Funnel Site

Bu depo Run More Ads funnel sitesinin güncel sürümünü içerir. Eski çok sayfalı site bu sürümle değiştirilmiştir; önceki dosyalar Git geçmişinde korunur.

## Önizleme

`npm start` komutuyla http://127.0.0.1:4174/ adresini açın. Bağımlılık kurulumu veya derleme gerekmez. Sunucuya yüklenecek dosyalar `dist/` klasöründedir. Vercel'e bu klasörün proje olarak yüklenmesi durumunda Output Directory `dist` olmalıdır.

## Takvim bağlantısı

`https://cal.com/runmoreads/30min` bağlantısı `dist/site-config.json` içindeki `calendarUrl` alanına eklendi. Cal.com'un resmi inline embed betiği kullanılarak gerçek müsaitlik ve rezervasyon ekranı sayfanın içine gömülür. Kullanıcının son isteğine göre Cal.com kendi koyu teması ve etkinlik detaylarıyla gösterilir. Ek dış çerçeve, gölge ve 16:9 oran kısıtlaması kaldırılmıştır; takvim doğal yüksekliğine göre büyür. Ana akışta başka sayfaya yönlendirme yapılmaz. Panelin dış kaydırma çubukları iframe üzerinde kapatılmıştır; Cal.com doğal yüksekliğini otomatik güncellemeye devam eder. `ui.autoscroll:false` ile otomatik kaydırma devre dışıdır. Takvimin altındaki yedek bağlantı ve hizmet satırı kaldırılmıştır. Masaüstü gömünün rezervasyon paneli dışındaki 80 px imza şeridi site görünümünden kırpılır. Bu düzenleme Cal.com hesap ayarını değiştirmez. Mobilde imza sağlayıcı tarafından zaten gizlendiği için takvimin içeriği kırpılmaz. Tarih seçimi ve gerçek müsait saatlerin yüklenmesi doğrulandı; test sırasında gerçek toplantı rezervasyonu yapılmadı. Yeni takvimin CRM'ye otomatik aktarımı bu projenin parçası olarak bağlanmadı.

## Üç müşteri yorumu

Kullanıcının isteğiyle üç hizmete uygun örnek yorum yazıldı. Bunlar `illustrative:true` olarak işaretlenmiştir ve sayfada gerçek müşteri yorumu olmadıkları açıkça belirtilir. Kişi, marka, Trustpilot doğrulaması veya yıldız puanı uydurulmadı. Gerçek metinler alındığında `testimonials` dizisindeki kayıtları değiştirin, `illustrative` alanını kaldırın ve gerçek yorum sahibinin onayını doğrulayın:

```json
{"name":"Müşterinin onaylı adı","role":"Marka / görev","quote":"Müşterinin onayladığı gerçek yorum","approved":true}
```

Gerçek bir yıldız puanı verilmişse isteğe bağlı `rating` alanına 1–5 arasında bir tam sayı yazılabilir. Puan verilmezse yıldız gösterilmez. Bu yorumların Trustpilot tarafından doğrulandığı iddia edilmez.

## İçerik

İngilizce metinler ana sitenin Meta reklamları, içerik üretimi ve ecommerce / lead gen hizmetlerine göre hazırlandı. $70K+ müşteriye kazandırılan gelir, 50+ desteklenen marka ve 2024 kuruluş bilgileri kullanıcının daha önce onayladığı bilgilerdir. $70K+ reklam harcaması veya aylık gelir olarak sunulmaz; 50+ marka aktif müşteri sayısı olarak sunulmaz. Logo ve Inter fontları mevcut proje varlıklarından kopyalandı. Referansın başka işletmelere ait isimleri, yorumları, Trustpilot puanı veya takvim bağlantısı kullanılmadı.

## Vercel yayını

Framework: Other. Root Directory: depo kökü. Output Directory: `dist`. Derleme adımı gerekmez. `vercel.json` dosyası statik çıktı klasörünü tanımlar.
