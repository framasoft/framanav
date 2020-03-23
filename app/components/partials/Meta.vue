<template>
  <span></span>
</template>

<script>
export default {
  created() {
    // Matomo
    this.analytics(this.$t('site'));
  },
  mounted() {
    // Favicons
    const icons = [{}, {}];
    
    if (!/(team)/i.test(this.$t('host'))) {
      document.querySelectorAll('link[rel*=icon]').forEach(e => e.parentNode.removeChild(e));
    }

    const regSites = new RegExp([
      '(agenda', 'bag', 'bee', 'bin', 'blog', 'board',
      'bookin', 'book', 'calc', 'carte', 'cloud', 'code', 'colibri', 'date',
      'drive', 'drop', 'dvd', 'forms', 'games', 'key', 'lab', 'lang', 'libre',
      'link', 'listes', 'maestro', 'memo', 'mindmap', 'minetest', 'news', 'notes',
      'pack', 'phonie', 'piaf', 'pic', 'site', 'slides', 'sphere', 'start', 'stats',
      'status', 'talk', 'team', 'tube', 'vectoriel', 'vox', 'zic',
      'alt.', 'bot.', 'contact.', 'degooglisons-internet', 'forum.', 'participer.',
      'soutenir.)',
    ].join('|'), 'i');
    if (regSites.test(this.$t('host'))) {
      icons[0].file = `fav_${this.$t('site')}.png`;
      icons[1].file = `${this.$t('site')}.png`;
    }

    if (/(pad)/i.test(this.$t('host'))) {
      icons[0].file = 'fav_pad.png';
      icons[1].file = 'pad.png';
    }
    
    
    if (!/(team)/i.test(this.$t('host'))) {
      icons[0].file = icons[0].file || 'favicon-violet.png';
      icons[0].link = document.createElement('link');
      Object.assign(icons[0].link, {
        rel: 'icon',
        type: 'image/png',
        href: `${this.$t('baseurl')}icons/${icons[0].file}`,
      });
      document.getElementsByTagName('head')[0].appendChild(icons[0].link);

      icons[1].file = icons[1].file || 'apple-orange.png';
      icons[1].link = document.createElement('link');
      Object.assign(icons[1].link, {
        rel: 'apple-touch-icon',
        type: 'image/png',
        href: `${this.$t('baseurl')}icons/${icons[1].file}`,
      });
      document.getElementsByTagName('head')[0].appendChild(icons[1].link);
    }

    // RSS
    const rss = document.createElement('link');
    Object.assign(rss, {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: this.$t('link.rss'),
      title: this.$i18n.t('fnav.sites.rss.d1'),
    });
    document.getElementsByTagName('head')[0].appendChild(rss);
  },
  methods: {
    analytics(site) {
      const c = {
        id: '',
        url: 'https://stats.framasoft.org/',
        mode: 'img', // 'js',
      };

      switch (site) {
        case 'soft': /**           */ c.id = '1'; break;
        // case 'forum': /**          */ c.id = '2'; break;
        case 'blog': /**           */ c.id = '3'; break;
        case 'pad': /**            */ c.id = '4'; break;
        case 'etherpad': /**       */ c.id = '4'; break;
        case 'key': /**            */ c.id = '5'; break;
        case 'dvd': /**            */ c.id = '6'; break;
        case 'book': /**           */ c.id = '7'; break;
        // case 'tube': /**           */ c.id = '8'; break;
        case 'zic': /**            */ c.id = '9'; break;
        case 'date': /**           */ c.id = '10'; break;
        case 'calc': /**           */ c.id = '11'; break;
        case 'mindmap': /**        */ c.id = '12'; break;
        case 'vectoriel': /**      */ c.id = '13'; break;
        // case 'phonie': /**         */ c.id = '14'; break;
        // case 'lab': /**            */ c.id = '16'; break;
        // case 'code': /**           */ c.id = '17'; break;
        case 'localhost:8080': /**      */ c.id = '17'; c.mode = 'js'; break;
        case 'soutenir': /**       */ c.id = '18'; break;
        case 'contact': /**        */ c.id = '19'; break;
        case 'news': /**           */ c.id = '20'; break;
        case 'bag': /**            */ c.id = '21'; break;
        case 'start': /**          */ c.id = '23'; break;
        case 'pack': /**           */ c.id = '24'; break;
        case '10ans': /**          */ c.id = '25'; break;
        case 'sphere': /**         */ c.id = '26'; break;
        case 'bee': /**            */ c.id = '27'; break;
        case 'games': /**          */ c.id = '28'; break;
        case 'git': /**            */ c.id = '29'; break;
        case 'degooglisons-internet': c.id = '30'; break;
        case 'pic': /**            */ c.id = '31'; c.mode = 'img'; break;
        case 'link': /**           */ c.id = '32'; break;
        case 'participer': /**     */ c.id = '33'; break;
        case 'colibri': /**        */ c.id = '33'; break;
        case 'bin': /**            */ c.id = '34'; c.mode = 'img'; break;
        case 'cloud': /**          */ c.id = '35'; break;
        case 'status': /**         */ c.id = '37'; break;
        case 'bookin': /**         */ c.id = '38'; break;
        case 'stats': /**          */ c.id = '39'; break;
        case 'drive': /**          */ c.id = '40'; c.mode = 'img'; break;
        case 'board': /**          */ c.id = '41'; break;
        case 'drop': /**           */ c.id = '42'; c.mode = 'img'; break;
        case 'carte': /**          */ c.id = '43'; break;
        case 'forms': /**          */ c.id = '44'; break;
        // case 'petition': /**       */ c.id = '45'; break;
        case 'vox': /**            */ c.id = '47'; break;
        case 'team': /**           */ c.id = '48'; break;
        case 'memo': /**           */ c.id = '49'; break;
        case 'talk': /**           */ c.id = '50'; break;
        case 'minetest': /**       */ c.id = '51'; break;
        case 'notes': /**          */ c.id = '52'; break;
        case 'agenda': /**         */ c.id = '53'; c.mode = 'img'; break;
        case 'listes': /**         */ c.id = '54'; break;
        case 'my': /**             */ c.id = '56'; break;
        case 'troll': /**          */ c.id = '57'; break;
        case 'slides': /**         */ c.id = '58'; break;
        case 'maestro': /**        */ c.id = '59'; break;
        case 'docs': /**           */ c.id = '60'; break;
        case 'libre': /**          */ c.id = '61'; break;
        case 'piaf': /**           */ c.id = '62'; break;
        case 'contributopia': /**  */ c.id = '63'; break;
        case 'site': /**           */ c.id = '64'; break;
        case 'wiki': /**           */ c.id = '64'; break;
        case 'trad': /**           */ c.id = '65'; break;
        case 'clic': /**           */ c.id = '66'; break;
        case 'story': /**          */ c.id = '67'; break;

        // no default
      }

      if (c.id !== ''
          // Pas de Matomo si DoNotTrack
          // DNT est respecté mais on évite les notifications des uBlock, Ghostery, etc
          && !(navigator.doNotTrack === 'yes'
          || navigator.doNotTrack === '1'
          || navigator.msDoNotTrack === '1'
          || window.doNotTrack === '1')) {
        // Code Javascript
        if (c.mode === 'js') {
          var _paq = window._paq || []; // eslint-disable-line

          // Conformité CNIL
          _paq.push([function matomoCNIL() {
            const self = this;
            function getOriginalVisitorCookieTimeout() {
              const now = new Date();
              const nowTs = Math.round(now.getTime() / 1000);
              const visitorInfo = self.getVisitorInfo();
              const createTs = parseInt(visitorInfo[2], 10);
              const cookieTimeout = 33696000; // 13 mois en secondes
              const originalTimeout = (createTs + cookieTimeout) - nowTs;
              return originalTimeout;
            }
            this.setVisitorCookieTimeout(getOriginalVisitorCookieTimeout());
          }]);

          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          // Code Matomo JS
          (function matomoJS() {
            const u = c.url;
            _paq.push(['setTrackerUrl', [u, 'p.php'].join('')]);
            _paq.push(['setSiteId', c.id]);
            const d = document;
            const g = d.createElement('script');
            const s = d.getElementsByTagName('script')[0];
            g.type = 'text/javascript'; g.defer = true; g.async = true;
            g.src = [u, 'p.js'].join(''); s.parentNode.insertBefore(g, s);
          }());
        // Code Matomo Image
        } else {
          (function matomoImg() {
            const d = document;
            const g = d.createElement('img');
            const s = d.getElementsByTagName('body')[0];
            g.style = 'border:0'; g.alt = '';
            g.src = [c.url, 'p.php?idsite=', c.id, '&rec=1'].join(''); s.appendChild(g);
          }());
        }
      }
    },
  },
};
</script>
