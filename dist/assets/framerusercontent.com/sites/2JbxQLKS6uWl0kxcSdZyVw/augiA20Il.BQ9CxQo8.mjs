import{t as e}from"./rolldown-runtime.Dh6celcD.mjs";function t(e,t){return{customHTMLBodyEnd:`<script>
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  const refKey = 'ref';

  // Store UTM and ref values from URL
  (function () {
    const urlParams = new URLSearchParams(window.location.search);
    let hasNewUTM = false;

    utmKeys.forEach(key => {
      if (urlParams.has(key)) {
        hasNewUTM = true;
      }
    });

    if (hasNewUTM) {
      utmKeys.forEach(key => {
        const value = urlParams.get(key);
        if (value) {
          localStorage.setItem(key, value);
        }
      });
    }

    if (urlParams.has(refKey)) {
      const ref = urlParams.get(refKey);
      if (ref) {
        localStorage.setItem(refKey, ref);
      }
    }
  })();

  function applyParamsToButtons() {
    const storedParams = new URLSearchParams();

    // Add UTM params from localStorage
    utmKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        storedParams.set(key, value);
      }
    });

    // Add ref param from localStorage
    const ref = localStorage.getItem(refKey);
    if (ref) {
      storedParams.set(refKey, ref);
    }

    const buttons = document.querySelectorAll('a.buy-now');
    buttons.forEach(button => {
      try {
        const url = new URL(button.href);
        const params = new URLSearchParams(url.search);

        storedParams.forEach((value, key) => {
          params.set(key, value);
        });

        url.search = params.toString();
        button.href = url.toString();
      } catch (err) {
        console.warn('Param append error:', err);
      }
    });
  }

  window.addEventListener('DOMContentLoaded', applyParamsToButtons);

  const observer = new MutationObserver(() => {
    applyParamsToButtons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
<\/script>
`,description:`Run More Ads scripts, films, edits, and launches Meta ads for lead generation and ecommerce brands.`,favicon:`/assets/framerusercontent.com/assets/TQzw53CcJfN5rlajBHEdbvKlis.png`,robots:`max-image-preview:large`,socialImage:`/assets/framerusercontent.com/assets/KfEvJD0tcOXIe2Plh2HpSUHIGmw.jpg`,title:`Run More Ads — Meta Ads Agency`}}var n=e((()=>{}));function r(e,n){return{breakpoints:[{hash:`72rtr7`,mediaQuery:`(min-width: 1200px)`},{hash:`1q94wgs`,mediaQuery:`(min-width: 810px) and (max-width: 1199.98px)`},{hash:`7etcj0`,mediaQuery:`(max-width: 809.98px)`}],description:t(e,n).description,elements:{},robots:`max-image-preview:large`,serializationId:`framer-LGey9`,title:t(e,n).title||`Home`,viewport:`width=device-width`}}var i,a,o=e((()=>{n(),i=1,a={exports:{metadataVersion:{type:`variable`,annotations:{framerContractVersion:`1`}},default:{type:`function`,annotations:{framerContractVersion:`1`}},__FramerMetadata__:{type:`variable`}}}}));export{i,o as n,r,a as t};
//# sourceMappingURL=augiA20Il.BQ9CxQo8.mjs.map