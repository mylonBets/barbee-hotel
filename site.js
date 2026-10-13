/* Barbee Hotel + Danny's, shared behaviour */
(function () {
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- open / closed badge, Indiana time ---- */
  var statusEl = document.getElementById('openStatus');
  function renderStatus() {
    if (!statusEl) return;
    var n;
    try { n = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Indiana/Indianapolis' })); }
    catch (e) { n = new Date(); }
    var d = n.getDay(), m = n.getHours() * 60 + n.getMinutes();
    var open = 16 * 60 + 30, close = null;
    if (d >= 2 && d <= 4) close = 21 * 60;
    if (d === 5 || d === 6) close = 22 * 60;
    var isOpen = close !== null && m >= open && m < close;
    statusEl.textContent = isOpen ? 'Open now' : 'Closed now';
    statusEl.className = 'desk__status ' + (isOpen ? 'is-open' : 'is-shut');
  }
  renderStatus();
  setInterval(renderStatus, 60000);

  /* ---- scrollspy ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.desk__nav a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if (window.IntersectionObserver) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var a = map[e.target.id];
        if (a) a.classList.add('is-active');
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) obs.observe(el);
    });
  }

  /* ---- quiet reveal on scroll ---- */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealables = document.querySelectorAll('.band__head, .feature, .menu__col, .cards, .split, .hist, .grid, .visit, .map, .story');
  if (!reduce && window.IntersectionObserver) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('reveal'); });
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rObs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });
    Array.prototype.forEach.call(revealables, function (el) { rObs.observe(el); });
  }

  /* ---- capture helper: /?y=1234 jumps there with images loaded ---- */
  var qy = new URLSearchParams(location.search).get('y');
  if (qy !== null) {
    document.documentElement.style.scrollBehavior = 'auto';
    Array.prototype.forEach.call(document.querySelectorAll('img[loading="lazy"]'), function (im) { im.loading = 'eager'; });
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function (el) { el.classList.add('is-in'); });
    var go = function () { window.scrollTo(0, parseInt(qy, 10) || 0); };
    go(); window.addEventListener('load', go);
    setTimeout(go, 150); setTimeout(go, 700);
  }

  /* ---- gallery lightbox ---- */
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  var lb = document.getElementById('lb'),
      lbImg = document.getElementById('lbImg'),
      i = 0, opener = null;

  function show(n) {
    i = (n + shots.length) % shots.length;
    var btn = shots[i];
    var jpg = btn.getAttribute('data-full');
    var webp = jpg.replace(/\.(jpg|png)$/, '.webp');
    lbImg.onerror = function () { lbImg.onerror = null; lbImg.src = jpg; };
    lbImg.src = webp;
    lbImg.alt = btn.querySelector('img').alt;
  }
  function openLb(n) {
    opener = shots[n];
    show(n);
    if (!lb) return;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    if (lbClose) lbClose.focus();
  }
  function closeLb() {
    if (!lb) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (opener) opener.focus();
  }

  shots.forEach(function (b, n) { b.addEventListener('click', function () { openLb(n); }); });
  var lbClose=document.getElementById('lbClose');
  if (lbClose) lbClose.addEventListener('click', closeLb);
  var lbPrev=document.getElementById('lbPrev');
  if (lbPrev) lbPrev.addEventListener('click', function (e) { e.stopPropagation(); show(i - 1); });
  var lbNext=document.getElementById('lbNext');
  if (lbNext) lbNext.addEventListener('click', function (e) { e.stopPropagation(); show(i + 1); });
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb || e.target === lbImg) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (!lb || lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(i - 1);
    if (e.key === 'ArrowRight') show(i + 1);
  });
})();
