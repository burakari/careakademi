/* Care Akademi - GA4 (yalnızca ziyaretçi onay verirse yüklenir) */
(function () {
  var ID = 'G-3X6CV4KFDC'; // GA4 Ölçüm Kimliği
  var loaded = false;

  function load() {
    if (loaded || !ID) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', ID, { anonymize_ip: true });

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
    document.head.appendChild(s);

    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      var h = a.getAttribute('href') || '';
      if (h.indexOf('wa.me') > -1 || h.indexOf('whatsapp.com') > -1) gtag('event', 'whatsapp_click', { link_url: h });
      else if (h.indexOf('tel:') === 0) gtag('event', 'phone_click');
      else if (h.indexOf('mailto:') === 0) gtag('event', 'email_click');
      else if (/instagram|facebook|x\.com|youtube|tiktok|linkedin/.test(h)) gtag('event', 'social_click', { link_url: h });
    }, true);
  }

  window.careLoadGA = load;
  try { if (localStorage.getItem('care_consent') === 'granted') load(); } catch (e) {}
})();
