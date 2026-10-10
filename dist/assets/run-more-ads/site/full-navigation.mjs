
// Retained Framer pages must open the completed standalone pages instead of stale template routes.
window.addEventListener('click',event=>{
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const link=event.target.closest?.('a[href]');if(!link||link.hasAttribute('download')||link.target==='_blank')return;
 const url=new URL(link.href,location.href);if(url.origin!==location.origin||url.hash)return;
 const route=url.pathname.replace(/\/$/,'');
 if(!/^\/(?:case-studies|blog|book-a-call|privacy-policy|terms-of-service|404)(?:\/|$)/.test(route))return;
 event.preventDefault();event.stopImmediatePropagation();location.assign(url.href);
},true);
