'use strict';

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
      frame.title = 'Book your Run More Ads strategy call';
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
      config: {layout: 'month_view', theme: 'dark', 'ui.autoscroll': 'false'}
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
  frame.title = 'Book your Run More Ads strategy call';
  frame.src = calendar.href;
  frame.loading = 'eager';
  frame.referrerPolicy = 'strict-origin-when-cross-origin';
  document.querySelector('#call-details').hidden = true;
  document.querySelector('#calendar-area').replaceChildren(frame);
  document.querySelector('#booking-shell').classList.add('has-calendar');
}

function renderTestimonials(items) {
  if (!Array.isArray(items)) return;
  const reviews = items.filter(item => item && item.approved === true && typeof item.name === 'string' && item.name.trim() && typeof item.quote === 'string' && item.quote.trim()).slice(0, 3);
  if (!reviews.length) return;
  const cards = reviews.map(review => {
    const card = document.createElement('article');
    card.className = 'review-card';
    if (review.illustrative === true) {
      const label = document.createElement('div');
      label.className = 'sample-label';
      label.textContent = 'ILLUSTRATIVE EXAMPLE';
      card.append(label);
    }
    if (Number.isInteger(review.rating) && review.rating >= 1 && review.rating <= 5) {
      const stars = document.createElement('div');
      stars.className = 'review-stars';
      stars.setAttribute('aria-label', review.rating + ' out of 5 stars');
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
    ? 'Sample feedback for this preview. These are not published client reviews.'
    : 'In their own words.';
  if (hasExamples) document.querySelector('#feedback-heading').textContent = 'A better way to work on your ads.';
}

fetch('./site-config.json', {cache:'no-store'})
  .then(response => { if (!response.ok) throw new Error('Site configuration unavailable'); return response.json(); })
  .then(config => { renderCalendar(config.calendarUrl); renderTestimonials(config.testimonials); })
  .catch(() => { /* The real contact link remains available if configuration fails. */ });
