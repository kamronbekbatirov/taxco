/* Новости и публикации: лента Telegram-канала (news.html) и переключение языка в статьях (news/<slug>.html).
   Данные - /news/channel.json (посты канала) и /news/posts.json (статьи сайта); их обновляет панель TaxCo AI.
   Файл собирает панель (app/site_assets/news.js → /news/news.js) - правьте исходник там. */
(function () {
  'use strict';

  var T = {
    ru: {
      lead: 'Разборы налоговых новостей, разъяснения и практика - из Telegram-канала Ироды Аббасовны. Лента обновляется сама.',
      all: 'Все', ru: 'Русский', uz: 'Ўзбекча', en: 'English', more: 'Показать ещё', expand: 'Читать полностью', collapse: 'Свернуть',
      open: 'Открыть в Telegram', fwd: 'Переслано из', poll: 'Опрос', quiz: 'Викторина', article: 'Статья на сайте',
      subscribe: 'Подписаться на канал', subs: 'подписчиков', articles: 'Статьи на сайте', today: 'Сегодня',
      yesterday: 'Вчера', ctaTitle: 'Нужна консультация?', ctaText: 'Разберём ваш вопрос по налогам и подготовим письменное заключение.',
      ctaBtn: 'Записаться', empty: 'Не удалось загрузить ленту. Читайте новости прямо в канале',
      months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      k: ' тыс.', m: ' млн', dec: ','
    },
    uz: {
      lead: 'Солиқ янгиликлари таҳлили, тушунтиришлар ва амалиёт - Ирода Аббасовнанинг Telegram-каналидан. Лента ўзи янгиланади.',
      all: 'Барчаси', ru: 'Русча', uz: 'Ўзбекча', en: 'Инглизча', more: 'Яна кўрсатиш', expand: 'Тўлиқ ўқиш', collapse: 'Йиғиш',
      open: 'Telegram’да очиш', fwd: 'Қуйидагидан юборилган:', poll: 'Сўровнома', quiz: 'Викторина', article: 'Сайтдаги мақола',
      subscribe: 'Каналга обуна бўлиш', subs: 'обуначи', articles: 'Сайтдаги мақолалар', today: 'Бугун',
      yesterday: 'Кеча', ctaTitle: 'Маслаҳат керакми?', ctaText: 'Солиқ бўйича саволингизни кўриб чиқамиз ва ёзма хулоса тайёрлаймиз.',
      ctaBtn: 'Ёзилиш', empty: 'Лентани юклаб бўлмади. Янгиликларни каналда ўқинг',
      months: ['январ', 'феврал', 'март', 'апрел', 'май', 'июн', 'июл', 'август', 'сентябр', 'октябр', 'ноябр', 'декабр'],
      k: ' минг', m: ' млн', dec: ','
    },
    en: {
      lead: 'Tax news analysis, explanations and practice from Iroda Abbasovna’s Telegram channel. The feed updates automatically.',
      all: 'All', ru: 'Russian', uz: 'Uzbek', en: 'English', more: 'Show more', expand: 'Read more', collapse: 'Show less',
      open: 'Open in Telegram', fwd: 'Forwarded from', poll: 'Poll', quiz: 'Quiz', article: 'Article on the website',
      subscribe: 'Join the channel', subs: 'subscribers', articles: 'Articles', today: 'Today',
      yesterday: 'Yesterday', ctaTitle: 'Need a consultation?', ctaText: 'We will review your tax question and prepare a written opinion.',
      ctaBtn: 'Book now', empty: 'Could not load the feed. Read the news in the channel',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      k: 'K', m: 'M', dec: '.'
    }
  };
  var PAGE = 10;

  function lang() {
    var l = (document.documentElement.lang || '').slice(0, 2);
    if (!T[l]) { try { l = (localStorage.getItem('preferred-language') || 'ru').slice(0, 2); } catch (e) { l = 'ru'; } }
    return T[l] ? l : 'ru';
  }
  function t(key) { return T[lang()][key]; }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function link(href, cls, text) {
    var a = el('a', cls, text);
    a.href = href;
    if (/^https?:/.test(href) && href.indexOf(location.host) < 0) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }

  // ---------- статьи: блок на выбранном языке ----------
  function showBlocks() {
    var l = lang();
    document.querySelectorAll('.lang-block').forEach(function (b) { b.hidden = b.getAttribute('data-lang') !== l; });
  }

  // ---------- форматирование ----------
  function fmtDate(iso) {
    // в ISO уже ташкентское время (+05:00) - берём цифры как есть
    var m = /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d)/.exec(iso || '');
    if (!m) return '';
    var now = new Date(Date.now() + 5 * 3600e3), y = now.getUTCFullYear();
    var today = y + '-' + ('0' + (now.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + now.getUTCDate()).slice(-2);
    var yest = new Date(now.getTime() - 864e5);
    var yesterday = yest.getUTCFullYear() + '-' + ('0' + (yest.getUTCMonth() + 1)).slice(-2) + '-' + ('0' + yest.getUTCDate()).slice(-2);
    var day = m[1] + '-' + m[2] + '-' + m[3], time = m[4] + ':' + m[5];
    if (day === today) return t('today') + ', ' + time;
    if (day === yesterday) return t('yesterday') + ', ' + time;
    var l = lang(), month = t('months')[+m[2] - 1], d = +m[3];
    var date = l === 'en' ? d + ' ' + month : d + ' ' + month;
    return date + (+m[1] !== y ? ' ' + m[1] : '') + ', ' + time;
  }
  function fmtCount(s) {
    var m = /^([\d.]+)\s*([KM]?)$/i.exec(String(s || '').trim());
    if (!m) return s || '';
    var n = m[1].replace('.', t('dec'));
    return n + (m[2].toUpperCase() === 'K' ? t('k') : m[2].toUpperCase() === 'M' ? t('m') : '');
  }
  function channelTitle(c) { return (c.title || c.username || '').replace(/_/g, ' '); }

  // ---------- фото на весь экран ----------
  function lightbox(src) {
    var box = el('div', 'tg-lightbox'), img = el('img');
    img.src = src; img.alt = '';
    box.appendChild(img);
    function close() { box.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    box.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(box);
  }

  // ---------- карточка поста ----------
  function media(p) {
    var items = p.media || [];
    if (!items.length) return null;
    var shown = items.slice(0, 4), wrap = el('div', 'tg-media n' + shown.length);
    shown.forEach(function (m, i) {
      var a = link(p.url, '');
      var img = el('img');
      img.src = m.src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
      if (shown.length === 1 && m.ratio) { img.width = 800; img.height = Math.round(800 * m.ratio); }
      a.appendChild(img);
      if (m.type === 'video') {
        a.appendChild(el('span', 'tg-play'));
        if (m.duration) a.appendChild(el('span', 'tg-dur', m.duration));
      } else {
        a.addEventListener('click', function (e) {
          if (e.ctrlKey || e.metaKey || e.shiftKey) return;
          e.preventDefault(); lightbox(m.src);
        });
      }
      if (i === 3 && items.length > 4) a.appendChild(el('span', 'tg-more-photos', '+' + (items.length - 4)));
      wrap.appendChild(a);
    });
    return wrap;
  }

  function preview(pv) {
    var a = link(pv.url, 'tg-preview'), body = el('div', 'pv-body');
    if (pv.site) body.appendChild(el('div', 'pv-site', pv.site));
    if (pv.title) body.appendChild(el('div', 'pv-title', pv.title));
    if (pv.desc) body.appendChild(el('div', 'pv-desc', pv.desc));
    if (pv.image && !pv.small) {
      var big = el('img', 'pv-image'); big.src = pv.image; big.alt = ''; big.loading = 'lazy';
      body.appendChild(big);
    }
    a.appendChild(body);
    if (pv.image && pv.small) {
      var th = el('img', 'pv-thumb'); th.src = pv.image; th.alt = ''; th.loading = 'lazy';
      a.appendChild(th);
    }
    return a;
  }

  function poll(pl) {
    var box = el('div', 'tg-poll'), q = el('div', 'tg-poll-q');
    q.innerHTML = pl.question;  // HTML уже очищен панелью (только оформление и ссылки)
    box.appendChild(q);
    box.appendChild(el('div', 'tg-poll-type', t('poll') + (pl.voters ? ' · ' + pl.voters : '')));
    (pl.options || []).forEach(function (o) {
      var row = el('div', 'tg-opt');
      if (o.percent != null) {
        var bar = el('i', 'tg-opt-bar'); bar.style.width = Math.max(0, Math.min(100, o.percent)) + '%';
        row.appendChild(bar);
        row.appendChild(el('b', '', o.percent + '%'));
      }
      var txt = el('span'); txt.innerHTML = o.text; row.appendChild(txt);
      box.appendChild(row);
    });
    return box;
  }

  function card(p, filter, channel) {
    var c = el('article', 'tg-card');
    var meta = el('div', 'tg-meta');
    if (channel.photo) { var ava = el('img', 'tg-ava'); ava.src = channel.photo; ava.alt = ''; meta.appendChild(ava); }
    var who = el('div', 'tg-who');
    who.appendChild(el('b', '', channelTitle(channel)));
    var time = el('time', '', fmtDate(p.date)); time.dateTime = p.date || '';
    who.appendChild(time);
    meta.appendChild(who);
    c.appendChild(meta);

    if (p.fwd) {
      var fwd = el('div', 'tg-fwd', t('fwd') + ' ');
      fwd.appendChild(p.fwd.url ? link(p.fwd.url, '', p.fwd.name) : el('span', '', p.fwd.name));
      c.appendChild(fwd);
    }
    var pic = media(p);
    var textHtml = (p.parts && (filter === 'ru' || filter === 'uz') && p.parts[filter]) || p.html;
    if (pic && !textHtml) c.appendChild(pic);
    if (textHtml) {
      var text = el('div', 'tg-text is-clamped');
      text.innerHTML = textHtml;  // HTML уже очищен панелью (только оформление и ссылки)
      c.appendChild(text);
      var btn = el('button', 'tg-expand', t('expand')); btn.type = 'button'; btn.hidden = true;
      btn.addEventListener('click', function () {
        var open = text.classList.toggle('is-clamped');
        btn.textContent = open ? t('expand') : t('collapse');
      });
      c.appendChild(btn);
      if (pic) c.appendChild(pic);
      requestAnimationFrame(function () {
        if (text.scrollHeight > text.clientHeight + 24) btn.hidden = false; else text.classList.remove('is-clamped');
      });
    }
    if (p.poll) c.appendChild(poll(p.poll));
    if (p.doc) {
      var d = link(p.url, 'tg-doc'); d.appendChild(el('i'));
      var dn = el('span', '', p.doc.title); if (p.doc.extra) dn.appendChild(el('small', '', p.doc.extra));
      d.appendChild(dn); c.appendChild(d);
    }
    if (p.preview) c.appendChild(preview(p.preview));
    if (p.article) {
      var art = link('/news/' + p.article.slug + '.html', 'tg-article');
      var at = el('div'); at.appendChild(el('small', '', t('article'))); at.appendChild(el('span', '', p.article.title));
      art.appendChild(at); c.appendChild(art);
    }

    var foot = el('div', 'tg-foot'), stats = el('div', 'tg-stats');
    (p.reactions || []).forEach(function (r) { stats.appendChild(el('span', 'tg-react', r.emoji + ' ' + fmtCount(r.count))); });
    if (p.views) stats.appendChild(el('span', 'tg-views', fmtCount(p.views)));
    foot.appendChild(stats);
    foot.appendChild(link(p.url, 'tg-open', t('open') + ' ↗'));
    c.appendChild(foot);
    return c;
  }

  // ---------- страница ленты ----------
  var feedEl = document.getElementById('tg-feed');
  var state = { data: null, articles: [], shown: PAGE, filter: null };

  function savedFilter() { try { return localStorage.getItem('news-filter'); } catch (e) { return null; } }
  function hasEnglish() {
    return !!(state.data && (state.data.posts || []).some(function (p) { return p.lang === 'en'; }));
  }
  function currentFilter() {
    var f = state.filter || savedFilter();
    if (f === 'ru' || f === 'uz' || f === 'all' || (f === 'en' && hasEnglish())) return f;
    if (lang() === 'en') return hasEnglish() ? 'en' : 'all';  // английских постов нет - показываем все
    return lang();
  }
  function visible(posts, f) {
    if (f === 'all') return posts;
    var list = posts.filter(function (p) { return !p.lang || p.lang === 'both' || p.lang === f; });
    return list.length ? list : posts;
  }

  function renderFilters() {
    var box = document.getElementById('news-filters');
    if (!box || !state.data) return;
    box.textContent = '';
    var f = currentFilter();
    (hasEnglish() ? ['ru', 'uz', 'en', 'all'] : ['ru', 'uz', 'all']).forEach(function (key) {
      var b = el('button', 'news-chip', t(key)); b.type = 'button';
      b.setAttribute('aria-pressed', String(f === key));
      b.addEventListener('click', function () {
        state.filter = key; state.shown = PAGE;
        try { localStorage.setItem('news-filter', key); } catch (e) {}
        renderFeed();
      });
      box.appendChild(b);
    });
    box.hidden = false;
  }

  function renderChannel() {
    var c = state.data && state.data.channel;
    if (!c) return;
    var ava = document.getElementById('ch-ava');
    if (ava && c.photo) { ava.src = c.photo; ava.hidden = false; }
    var title = document.getElementById('ch-title');
    if (title) title.textContent = channelTitle(c);
    var subs = document.getElementById('ch-subs');
    if (subs) subs.textContent = c.subscribers ? fmtCount(c.subscribers) + ' ' + t('subs') : '';
    var desc = document.getElementById('ch-desc');
    if (desc && c.description) { desc.innerHTML = c.description; desc.hidden = false; }
  }

  function renderArticles() {
    var box = document.getElementById('news-articles');
    if (!box) return;
    var list = box.querySelector('.news-art-list');
    list.textContent = '';
    var l = lang();
    state.articles.slice(0, 6).forEach(function (a) {
      var item = link('/news/' + a.slug + '.html', 'news-art');
      item.appendChild(el('time', '', fmtDate(a.date).replace(/, \d\d:\d\d$/, '')));
      item.appendChild(el('span', '', (a[l] || a.ru || {}).title || ''));
      list.appendChild(item);
    });
    box.hidden = !state.articles.length;
  }

  function renderFeed() {
    if (!feedEl || !state.data) return;
    var f = currentFilter(), posts = visible(state.data.posts || [], f);
    feedEl.textContent = '';
    posts.slice(0, state.shown).forEach(function (p) { feedEl.appendChild(card(p, f, state.data.channel || {})); });
    var more = document.getElementById('tg-more');
    if (more) more.hidden = posts.length <= state.shown;
    renderFilters();
  }

  function renderTexts() {
    document.querySelectorAll('[data-news-t]').forEach(function (e) { e.textContent = t(e.getAttribute('data-news-t')); });
  }

  function renderAll() {
    showBlocks();
    if (!feedEl) return;
    renderTexts();
    renderChannel();
    renderArticles();
    renderFeed();
  }

  if (feedEl) {
    var more = document.getElementById('tg-more');
    if (more) more.addEventListener('click', function () { state.shown += PAGE; renderFeed(); });
    feedEl.addEventListener('click', function (e) {
      var sp = e.target.closest && e.target.closest('.tg-spoiler');
      if (sp) sp.classList.add('open');
    });
    fetch('/news/channel.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) { state.data = data; renderAll(); })
      .catch(function () {
        feedEl.textContent = '';
        var box = el('div', 'news-empty', t('empty') + ' ');
        box.appendChild(link('https://t.me/iroda_abbasovna', '', '@iroda_abbasovna'));
        feedEl.appendChild(box);
      });
    fetch('/news/posts.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (list) { state.articles = list || []; renderArticles(); })
      .catch(function () {});
  }

  new MutationObserver(renderAll).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  document.addEventListener('DOMContentLoaded', function () { showBlocks(); if (feedEl) renderTexts(); });
  showBlocks();
  if (feedEl) renderTexts();
})();
