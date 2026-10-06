/* Care Akademi - GA4 takibi
   Tek yerden yönetilir: aşağıdaki ID'yi kendi GA4 Ölçüm Kimliğinle değiştir. */
(function () {
  var ID = 'G-3X6CV4KFDC'; // GA4 Ölçüm Kimliği (başka bir mülke geçersen sadece bunu değiştir)

  if (!ID || ID.indexOf('XXXX') > -1) return; // ID girilmediyse hiçbir şey yüklenmez

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ID, { anonymize_ip: true });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
  document.head.appendChild(s);

  // Dönüşüm olayları: WhatsApp, telefon, e-posta tıklamaları ve form gönderimi
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var h = a.getAttribute('href') || '';
    if (h.indexOf('wa.me') > -1 || h.indexOf('whatsapp.com') > -1) {
      gtag('event', 'whatsapp_click', { link_url: h });
    } else if (h.indexOf('tel:') === 0) {
      gtag('event', 'phone_click');
    } else if (h.indexOf('mailto:') === 0) {
      gtag('event', 'email_click');
    }
  }, true);

  document.addEventListener('submit', function (e) {
    gtag('event', 'form_submit', { form_id: (e.target && e.target.id) || 'form' });
  }, true);
})();
