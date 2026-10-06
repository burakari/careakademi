/* Care Akademi - menü, iletişim formu ve çerez tercihi */
(function () {
  var d = document;

  // mobil menü
  var b = d.querySelector('.burger'), n = d.getElementById('nav');
  if (b && n) {
    b.addEventListener('click', function () {
      var o = n.classList.toggle('open');
      b.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    n.addEventListener('click', function (e) {
      if (e.target.closest('a')) { n.classList.remove('open'); b.setAttribute('aria-expanded', 'false'); }
    });
  }

  // iletişim formu: veriyi sunucuya göndermez, WhatsApp mesajı hazırlar
  var f = d.getElementById('lead-form');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = d.getElementById(id); return el ? el.value.trim() : ''; };
      var t = 'Merhaba, Care Akademi\'den özel ders hakkında bilgi almak istiyorum.\n' +
        (v('f-ad') ? 'Ad: ' + v('f-ad') + '\n' : '') +
        'Ders / sınav: ' + v('f-ders') + '\n' +
        (v('f-seviye') ? 'Sınıf / seviye: ' + v('f-seviye') + '\n' : '') +
        'Ders şekli: ' + v('f-sekil') + '\n' +
        (v('f-mesaj') ? 'Not: ' + v('f-mesaj') : '');
      if (window.gtag) window.gtag('event', 'generate_lead', { method: 'whatsapp_form' });
      window.open('https://wa.me/905010727223?text=' + encodeURIComponent(t), '_blank', 'noopener');
    });
  }

  // görünme animasyonu (hareket azaltma tercihine saygılı)
  try {
    var mm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !mm) {
      var els = d.querySelectorAll('.sec-head,.card,.steps li,.zone,.quick,.form,.line,.follow,.faq details,.cta-band,.strip');
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      els.forEach(function (el, i) { el.classList.add('rv'); el.style.transitionDelay = ((i % 4) * 70) + 'ms'; io.observe(el); });
    }
  } catch (e) {}

  // çerez tercihi (GA4 yalnızca onayla yüklenir)
  var KEY = 'care_consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var bar;
  function show() {
    if (bar) { bar.hidden = false; return; }
    bar = d.createElement('div');
    bar.className = 'cc';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Çerez tercihi');
    bar.innerHTML = '<p>Siteyi geliştirmek için anonim istatistik çerezleri (Google Analytics) kullanmak istiyoruz. Kabul etmezsen hiçbir takip kodu yüklenmez. Ayrıntılar: <a href="/gizlilik-ve-kvkk/">Gizlilik ve KVKK</a>.</p>' +
      '<div><button class="btn btn-gold btn-sm" type="button" data-c="granted">Kabul et</button>' +
      '<button class="btn btn-ghost btn-sm" type="button" data-c="denied">Reddet</button></div>';
    bar.addEventListener('click', function (e) {
      var c = e.target.getAttribute && e.target.getAttribute('data-c');
      if (!c) return;
      set(c);
      bar.hidden = true;
      if (c === 'granted' && window.careLoadGA) window.careLoadGA();
    });
    d.body.appendChild(bar);
  }
  if (!get()) show();
  var r = d.getElementById('cookie-reset');
  if (r) r.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} show(); });
})();
