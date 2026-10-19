'use strict';

// Each domain has its own default; an explicit language still lets visitors switch.
const defaultLanguage = ['runmoreads.online', 'www.runmoreads.online'].includes(location.hostname.toLowerCase()) ? 'en' : 'az';
const requestedLanguage = new URLSearchParams(location.search).get('lang');
const language = ['az', 'en'].includes(requestedLanguage) ? requestedLanguage : defaultLanguage;
const translations = {
  az: {
    title: 'Strateji görüşünüzü planlaşdırın — Run More Ads',
    description: 'Meta reklamlarınızı bizə həvalə edin. Run More Ads ilə strateji görüş planlaşdırın və biznesinizi böyütmək üçün reklam imkanlarını öyrənin.',
    skip: 'Görüş təyin etməyə keçin', home: 'Run More Ads — ana səhifə',
    headlineStart: 'Reklam büdcənizi', headlineGrowth: 'davamlı artıma', headlineWith: 'çevirin.',
    headlineAds: 'Meta reklamlarınızı', headlineDone: 'bizə həvalə edin.',
    intro: 'Biznesinizi necə böyüdə biləcəyimizi öyrənmək üçün görüş təyin edin.',
    trackRecord: 'Run More Ads nəticələri', revenue: 'Müştərilərə qazandırılan gəlir',
    brands: 'Əməkdaşlıq etdiyimiz brend', since: '2024-cü ildən', based: 'Azərbaycanda fəaliyyət göstəririk',
    bookLabel: 'Strateji görüş təyin edin', freeCall: 'Ödənişsiz strateji görüş', duration: '30 dəqiqə',
    videoCall: 'Onlayn video görüş', callDescription: 'Biznesiniz, təklifiniz və böyümə hədəfləriniz haqqında danışaq.',
    agendaGoals: 'Hədəfləriniz və auditoriyanız', agendaCreative: 'Reklam məzmununuz və təklifiniz',
    agendaPlan: 'Meta reklamlarınız üçün aydın plan', callNote: 'Yeni müştəri cəlb edən bizneslər və e-ticarət brendləri üçün.',
    pendingTitle: 'Görüş üçün uyğun vaxt seçək.',
    pendingDescription: 'Görüş təqvimi yüklənir. Ödənişsiz strateji görüşünüzü planlaşdırmaq üçün komandamızla əlaqə saxlaya bilərsiniz.',
    contactTeam: 'Komanda ilə əlaqə saxlayın', calendarNote: '30 dəqiqə. Diqqətimiz biznesinizdədir.',
    feedbackHeading: 'Reklamlarınız üçün daha rahat əməkdaşlıq.',
    feedbackCaption: 'Bu səhifə üçün hazırlanmış nümunə rəylərdir. Həqiqi müştəri rəyləri deyil.',
    clientsHeading: 'Müştərilərimiz nə deyir', inOwnWords: 'Öz sözləri ilə.', sampleLabel: 'NÜMUNƏ RƏY',
    rights: 'Bütün hüquqlar qorunur.', socialLinks: 'Əlaqə və sosial şəbəkələr', contact: 'Əlaqə',
    switchLanguage: 'İngilis dilinə keçin', frameTitle: 'Run More Ads ilə strateji görüş təyin edin', stars: '5 ulduzdan'
  },
  en: {
    title: 'Book Your Strategy Call — Run More Ads',
    description: 'Meta ads done for you. Book a strategy call with Run More Ads and discover how we script, film, edit, launch and improve your campaigns.',
    skip: 'Skip to booking', home: 'Run More Ads home',
    headlineStart: 'Turn Your Ad Spend Into', headlineGrowth: 'Predictable Growth', headlineWith: 'With',
    headlineAds: 'Meta Ads', headlineDone: 'Done For You',
    intro: 'Book below to see how we can grow your business.', trackRecord: 'Run More Ads track record',
    revenue: 'Client revenue generated', brands: 'Brands supported', since: 'Since 2024', based: 'Based in Azerbaijan',
    bookLabel: 'Book a strategy call', freeCall: 'Free Strategy Call', duration: '30 minutes', videoCall: 'Online video call',
    callDescription: 'Let’s talk about your business, your offer, and where you want to grow.',
    agendaGoals: 'Your goals & audience', agendaCreative: 'Your creative & offer', agendaPlan: 'A clear plan for your Meta ads',
    callNote: 'For lead gen & ecommerce brands.', pendingTitle: 'Let’s find a time to talk.',
    pendingDescription: 'The scheduling calendar is loading. Contact the team to arrange your free strategy call.',
    contactTeam: 'Contact the team', calendarNote: '30 minutes. Focused on your business.',
    feedbackHeading: 'A better way to work on your ads.',
    feedbackCaption: 'Sample feedback for this preview. These are not published client reviews.',
    clientsHeading: 'What our clients are saying', inOwnWords: 'In their own words.', sampleLabel: 'ILLUSTRATIVE EXAMPLE',
    rights: 'All rights reserved.', socialLinks: 'Contact and social links', contact: 'Contact',
    switchLanguage: 'Switch to Azerbaijani', frameTitle: 'Book your Run More Ads strategy call', stars: 'out of 5 stars'
  }
};
const copy = translations[language];
document.documentElement.lang = language;
document.title = copy.title;
document.querySelector('meta[name="description"]').content = copy.description;
document.querySelectorAll('[data-i18n]').forEach(element => {
  element.textContent = copy[element.dataset.i18n];
});
document.querySelectorAll('[data-i18n-aria]').forEach(element => {
  element.setAttribute('aria-label', copy[element.dataset.i18nAria]);
});
const languageToggle = document.querySelector('#language-toggle');
const nextLanguage = language === 'az' ? 'en' : 'az';
const nextUrl = new URL(location.href);
if (nextLanguage === defaultLanguage) nextUrl.searchParams.delete('lang');
else nextUrl.searchParams.set('lang', nextLanguage);
nextUrl.hash = '';
languageToggle.href = nextUrl.href;
languageToggle.hreflang = nextLanguage;
languageToggle.lang = nextLanguage;
languageToggle.setAttribute('aria-label', copy.switchLanguage);
document.querySelector('#language-name').textContent = nextLanguage === 'en' ? 'English' : 'Azərbaycan dili';

document.querySelector('#copyright-year').textContent = String(new Date().getFullYear());

function getCalendarUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password) return null;
    return url;
  } catch { return null; }
}

function renderCalendar(value) {
  const calendar = getCalendarUrl(value);
  if (!calendar) return;
  if (calendar.hostname === 'cal.com' || calendar.hostname === 'app.cal.com') {
    const host = document.createElement('div');
    host.id = 'cal-inline';
    host.className = 'cal-host';
    document.querySelector('#call-details').hidden = true;
    document.querySelector('#calendar-area').replaceChildren(host);
    document.querySelector('#booking-shell').classList.add('has-calendar');
    // Keep the provider's responsive height, without a second scrollable viewport.
    const prepareFrame = () => {
      const frame = host.querySelector('iframe');
      if (!frame) return;
      frame.setAttribute('scrolling', 'no');
      frame.title = copy.frameTitle;
    };
    new MutationObserver(prepareFrame).observe(host, {childList: true, subtree: true});
    // Official Cal.com inline loader. The provider owns availability and booking.
    window.Cal = window.Cal || function () {
      const cal = window.Cal;
      const args = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        const script = document.createElement('script');
        script.src = 'https://app.cal.com/embed/embed.js';
        script.async = true;
        document.head.append(script);
        cal.loaded = true;
      }
      if (args[0] === 'init') {
        const api = function () { api.q.push(arguments); };
        const namespace = args[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          cal.ns[namespace].q.push(args);
          cal.q.push(['initNamespace', namespace]);
        } else cal.q.push(args);
        return;
      }
      cal.q.push(args);
    };
    window.Cal('init', 'rma-funnel', {origin: 'https://app.cal.com'});
    window.Cal.ns['rma-funnel']('inline', {
      elementOrSelector: '#cal-inline',
      calLink: calendar.pathname.replace(/^\/+|\/+$/g, ''),
      config: {layout: 'month_view', theme: 'dark', locale: language, 'ui.autoscroll': 'false'}
    });
    window.Cal.ns['rma-funnel']('ui', {
      theme: 'dark',
      layout: 'month_view',
      hideEventTypeDetails: false
    });
    return;
  }
  if (calendar.hostname === 'calendly.com' || calendar.hostname.endsWith('.calendly.com')) {
    calendar.searchParams.set('embed_domain', location.hostname);
    calendar.searchParams.set('embed_type', 'Inline');
    calendar.searchParams.set('hide_event_type_details', '1');
    calendar.searchParams.set('primary_color', '4269b1');
  }
  const frame = document.createElement('iframe');
  frame.className = 'calendar-embed';
  frame.title = copy.frameTitle;
  frame.src = calendar.href;
  frame.loading = 'eager';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  document.querySelector('#call-details').hidden = true;
  document.querySelector('#calendar-area').replaceChildren(frame);
  document.querySelector('#booking-shell').classList.add('has-calendar');
}

function renderTestimonials(items) {
  if (!Array.isArray(items)) return;
  const reviews = items.filter(item => item && item.approved === true && typeof item.name === 'string' && item.name.trim() && typeof item.quote === 'string' && item.quote.trim()).slice(0, 3)
    .map(item => ({...item, ...item.translations?.[language]}));
  if (!reviews.length) return;
  const cards = reviews.map(review => {
    const card = document.createElement('article');
    card.className = 'review-card';
    if (review.illustrative === true) {
      const label = document.createElement('div');
      label.className = 'sample-label';
      label.textContent = copy.sampleLabel;
      card.append(label);
    }
    if (Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5) {
      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.setAttribute('aria-label', language === 'az' ? copy.stars + ' ' + review.rating : review.rating + ' ' + copy.stars);
      stars.textContent = '★'.repeat(review.rating);
      card.append(stars);
    }
    const quote = document.createElement('blockquote');
    quote.textContent = '“' + review.quote.trim() + '”';
    const footer = document.createElement('div');
    footer.className = 'review-footer';
    const byline = document.createElement('div');
    const name = document.createElement('div');
    name.className = 'review-name';
    name.textContent = review.name.trim();
    byline.append(name);
    if (typeof review.role === 'string' && review.role.trim()) {
      const role = document.createElement('p');
      role.className = 'review-role';
      role.textContent = review.role.trim();
      byline.append(role);
    }
    footer.append(byline);
    card.append(quote, footer);
    return card;
  });
  const grid = document.querySelector('#review-grid');
  const placeholders = Array.from(grid.children).slice(reviews.length);
  grid.replaceChildren(...cards, ...placeholders);
  const hasExamples = reviews.some(review => review.illustrative === true);
  document.querySelector('#feedback-caption').textContent = hasExamples
    ? copy.feedbackCaption : copy.inOwnWords;
  document.querySelector('#feedback-heading').textContent = hasExamples ? copy.feedbackHeading : copy.clientsHeading;
}

fetch('./site-config.json', {cache:'no-store'})
  .then(response => { if (!response.ok) throw new Error('Site configuration unavailable'); return response.json(); })
  .then(config => { renderCalendar(config.calendarUrl); renderTestimonials(config.testimonials); })
  .catch(() => { /* The real contact link remains available if configuration fails. */ });
