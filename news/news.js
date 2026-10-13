(function () {
  function lang() { return (document.documentElement.lang || localStorage.getItem('preferred-language') || 'ru').slice(0, 2); }
  function showBlocks() {
    var l = lang();
    document.querySelectorAll('.lang-block').forEach(function (b) { b.hidden = b.getAttribute('data-lang') !== l; });
    renderFeed();
  }
  var feed = document.getElementById('news-feed');
  var posts = null;
  var more = { ru: 'Читать полностью', uz: 'Тўлиқ ўқиш', en: 'Read more' };
  function fmt(iso, l) {
    try { return new Date(iso).toLocaleDateString(l === 'en' ? 'en-GB' : (l === 'uz' ? 'uz-Cyrl' : 'ru-RU'),
      { day: 'numeric', month: 'long', year: 'numeric' }); } catch (e) { return iso.slice(0, 10); }
  }
  function renderFeed() {
    if (!feed || !posts) return;
    var l = lang();
    feed.textContent = '';
    posts.forEach(function (p) {
      var t = p[l] || p.ru;
      var a = document.createElement('a');
      a.className = 'news-card'; a.href = '/news/' + p.slug + '.html';
      var d = document.createElement('time'); d.className = 'news-date'; d.textContent = fmt(p.date, l);
      var h = document.createElement('h3'); h.textContent = t.title;
      var e = document.createElement('p'); e.textContent = t.excerpt;
      var m = document.createElement('span'); m.className = 'news-more'; m.textContent = more[l] || more.ru;
      a.appendChild(d); a.appendChild(h); a.appendChild(e); a.appendChild(m);
      feed.appendChild(a);
    });
  }
  if (feed) {
    fetch('/news/posts.json', { cache: 'no-cache' }).then(function (r) { return r.ok ? r.json() : []; })
      .then(function (data) { posts = data; renderFeed(); }).catch(function () {});
  }
  new MutationObserver(showBlocks).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  document.addEventListener('DOMContentLoaded', showBlocks);
  showBlocks();
})();
