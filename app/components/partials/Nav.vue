<template>
  <div id="framanav_container" class="hidden-print" style="'height:42px;" v-show="!inframe">


    <navbar id="framanav" role="menubar">
      <span slot="brand">
        <a class="navbar-brand" slot="brand" :href="$root.link.soft">
          <img :src="$root['/'] + 'img/logo.png'" alt="" />
          <span class="hidden-sm" v-html="$root.color.soft"></span>
        </a>
        <a href="#nav-end" id="nav-skip" v-html="$t('txt.skip')"></a>
      </span>
      <template slot="collapse">
        <navbar-nav>
          <dropdown
            ref="dropdown" tag="li" :id="'fs_' + key"
            v-for="(cat, key) in $t('fnav.cat')" :key="key"
          >
            <a class="dropdown-toggle" role="button">
              {{ cat.name }} <b class="caret"></b>
            </a>
            <template slot="dropdown">
              <li class="dropdown-header" v-if="key === 'about'" v-html="$root.color.soft"></li>
              <popover tag="li" :class="'fs_' + l"
                :enable="$i18n.messages[$t('lang')].fnav.sites[l].t1 ? true : false"
                :placement="((key === 'services' || key === 'about') && !(index % 2)) ? 'right' : 'left'"
                :auto-placement="false" trigger="hover-focus" append-to="#framanav"
                :title="text($t('fnav.sites.' + l + '.t1'))"
                v-for="(l, index) in $root.fnav.cat[key]" :key="l"
              >
                <a :href="($t('fnav.sites.' + l + '.link').indexOf('fnav.') > -1) ? $root.link[l] : $t('fnav.sites.' + l + '.link')">
                  <i :class="'fa fa-fw fa-lg ' + $root.icon[l]" aria-hidden="true"></i>
                  {{
                    ($t('fnav.sites.' + l + '.name').indexOf('fnav.') > -1)
                    ? $root.txt[l]
                    : text($t('fnav.sites.' + l + '.name'))
                  }}
                  <span class="sr-only" v-html="'(' + $t('txt.newWindow') + ')'"></span>
                  <i class="fa new-window fa-external-link" aria-hidden="true"></i>
                </a>
                <template slot="popover">
                  <div v-html="$t('fnav.sites.' + l + '.d1')"></div>
                </template>
              </popover>
            </template>
          </dropdown>
          <popover tag="li" id="btn-soutenir" v-show="!benevalo()"
            placement="bottom" trigger="hover-focus" append-to="#framanav"
            :title="text($t('fnav.soutenir.t1'))"
          >
            <a :href="$root.link.soutenir + '/?f=nav'" class="btn-soutenir">
              <i :class="'fa fa-fw fa-lg ' + $root.icon.soutenir" aria-hidden="true"></i>
              {{ text($t('fnav.soutenir.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.soutenir.d1')"></div>
            </template>
          </popover>
          <popover tag="li" id="btn-benevalo" v-show="benevalo()"
            placement="bottom" trigger="hover-focus" append-to="#framanav"
            :title="text($t('fnav.benevalo.t1'))"
          >
            <a :href="$root.link.benevalo" class="btn-info">
              <i :class="'fa fa-fw fa-lg ' + $root.icon.benevalo" aria-hidden="true"></i>
              {{ text($t('fnav.benevalo.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.benevalo.d1')"></div>
            </template>
          </popover>
          <popover tag="li" id="btn-myframa"
            placement="bottom" trigger="hover-focus" append-to="#framanav"
            :title="text($t('fnav.myframa.t1'))"
          >
            <a :href="myframa" class="btn-primary"
              @click="window.open(myframa, 'myframa', 'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1'); return false;"
            >
              <i :class="'fa fa-fw fa-lg ' + $root.icon.my" aria-hidden="true"></i>
              {{ $root.txt.my }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.myframa.d1')"></div>
            </template>
          </popover>
        </navbar-nav>
      </template>
    </navbar>
    <a :href="$root.link.soutenir + '/?f=macaron'"
      id="framanav_donation"
      class="hidden-xs">
      <span class="sr-only" v-html="text($t('fnav.soutenir.name'))"></span>
    </a>
    <portal target-el="#ffooter">
      <footer id="framafooter"
        class="clearfix hidden-print"
        :style="footerStyle"
        role="contentinfo"
        v-show="!inframe">
        <div class="container">
          <div class="clearfix col-sm-8">
            <nav class="col-xs-4">
              <h1 v-html="$root.txt.soft"></h1>
              <ul class="list-unstyled">
                <li v-for="key in $root.fnav.footer.frama">
                  <a
                    :href="($t('fnav.sites.' + key + '.link').indexOf('fnav.') > -1) ? $root.link[key] : $t('fnav.sites.' + key + '.link')"
                    v-html="$t('fnav.sites.' + key + '.name')"
                  ></a>
                </li>
              </ul>
            </nav>
            <nav class="col-xs-4">
              <h1>{{ $t('txt.community') }}</h1>
              <ul class="list-unstyled">
                <li>
                  <a :href="$root.link.colibri">
                    {{ text($root.txt.colibri) }}
                  </a>
                </li>
                <li v-for="key in $root.fnav.footer.community">
                  <a
                    :href="($t('fnav.sites.' + key + '.link').indexOf('fnav.') > -1) ? $root.link[key] : $t('fnav.sites.' + key + '.link')"
                    v-html="$t('fnav.sites.' + key + '.name')"
                  ></a>
                </li>
              </ul>
            </nav>
            <nav class="col-xs-4">
              <h1 v-html="$t('txt.site')"></h1>
              <ul class="list-unstyled">
                <li v-for="key in $root.fnav.footer.site">
                  <a
                    :href="($t('fnav.sites.' + key + '.link').indexOf('fnav.') > -1) ? $root.link[key] : $t('fnav.sites.' + key + '.link')"
                    v-html="$t('fnav.sites.' + key + '.name')"
                  ></a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="col-sm-4">
            <div class="col-xs-12">
              <h1 v-html="$t('fnav.cat.follow.name')"></h1>
              <ul class="list-inline">
                <popover tag="li" :class="'fs_' + key"
                  v-for="key in $root.fnav.footer.follow" :key="key"
                  placement="top" trigger="hover-focus" append-to="#framanav"
                  :title="text($t('fnav.sites.' + key + '.t1'))"
                >
                  <a :href="($t('fnav.sites.' + key + '.link').indexOf('fnav.') > -1) ? $root.link[key] : $t('fnav.sites.' + key + '.link')">
                    <i :class="'fa fa-fw fa-2x ' + $root.icon[key]" aria-hidden="true"></i>
                    <span class="sr-only">{{
                      ($t('fnav.sites.' + key + '.name').indexOf('fnav.') > -1)
                      ? $root.txt[key]
                      : text($t('fnav.sites.' + key + '.name')) }}</span>
                  </a>
                    <template slot="popover">
                    <div v-html="$t('fnav.sites.' + key + '.d1')"></div>
                  </template>
                </popover>
              </ul>
              <h2 v-html="$t('fnav.sites.newsletter.name')"></h2>
              <form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2"
                method="post" name="subscribeform">
                <div class="input-group input-group-sm">
                  <input class="form-control" :title="$t('txt.typeYourEmail')" name="email" size="40" :placeholder="$t('txt.yourEmail')" type="text">
                  <span class="input-group-btn">
                    <button class="btn btn-default" name="subscribe" type="submit" value="subscribe">
                      {{ $t('txt.subscribe') }}<span class="sr-only" v-html="$t('txt.toTheNewsletter')"></span>
                    </button>
                  </span>
                </div>
                <input name="htmlemail" value="1" type="hidden">
                <input name="list[5]" value="signup" type="hidden">
                <input name="listname[5]" value="Newsletter" type="hidden">
                <div style="display: none;"><input name="VerificationCodeX" size="20" value="" type="text"></div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </portal>
  </div>
</template>

<script>
import { Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip } from 'uiv';
import { text, analytics } from '../../tools';
export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip
  },
  directives: {
    Popover, Tooltip
  },
  data() {
    return {
      version: '190108', // n° version de la nav
      inframe: window.top.location !== window.self.document.location,
      myframa: 'https://my.framasoft.org',
      footerStyle: 'position: relative',
      host: window.location.host,
      name: '',
      lname: '',
      site: window.location.host.replace(/^(www|test)\./i, '').replace(/\.(com|net|org|fr|pro)$/i, ''),
      url: window.location.href,
      baseurl: '',
      browser: {
        agent: navigator.userAgent,
        opera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        firefox: typeof InstallTrigger !== 'undefined',
        safari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
        chrome: !!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0),
        ie: /*@cc_on!@*/false || !!document.documentMode, // eslint-disable-line
      },
      storage: {},
      log: [],
    };
  },
  mounted() {
    this.name = this.site[0].toUpperCase() + this.site.slice(1).replace('.framasoft', ''); // Nom du service
    this.lname = this.name.toLowerCase();
    this.site = this.site.replace(/framand/i, 'and')
        .replace(/framage/i, 'age')
        .replace(/framae/i, 'mae')
        .replace(/(\.framasoft|frama\.)/i, '')
        .replace(/framin/i, 'min')
        .replace(/frame/i, 'me')
        .replace(/frama/i, '');

    if (!this.inframe) {
      const bookmarkURL = window.location.href;
      const bookmarkTitle = document.title || bookmarkURL;
      this.myframa = [
        'https://my.framasoft.org/?post=', encodeURIComponent(bookmarkURL),
        '&title=', encodeURIComponent(bookmarkTitle),
        '&description=', encodeURIComponent(document.getSelection()),
        '&source=bookmarklet',
      ].join('');
    }

    window.addEventListener('click', this.footerPosition);
    window.addEventListener('load', this.footerPosition);
    window.addEventListener('resize', this.footerPosition);
    window.addEventListener('scroll', this.footerPosition);

    document.getElementsByTagName('html')[0].setAttribute('data-url', window.location.href);
    document.getElementsByTagName('html')[0].setAttribute('data-inframe', this.inframe);

    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('/nav.js') > -1) {
        this.baseurl = this.l(scripts[i].getAttribute('src').replace('nav.js', ''));
      }
    }
    /* eslint-disable */
    require('../../config.js');
    /* eslint-enable */
    this.log.push(`✔ ☁ config.js ${this.version}`);

    // Matomo
    analytics(this.site);

    // Favicons
    const icons = [{}, {}];
    document.querySelectorAll('link[rel*=icon]').forEach(e => e.parentNode.removeChild(e));

    const regSites = new RegExp([
      '(agenda', 'bag', 'bee', 'bin', 'blog', 'board',
      'bookin', 'book', 'calc', 'carte', 'cloud', 'code', 'colibri', 'date',
      'drive', 'drop', 'dvd', 'forms', 'games', 'key', 'lab', 'lang', 'libre',
      'link', 'listes', 'maestro', 'memo', 'mindmap', 'minetest', 'news', 'pack',
      'phonie', 'piaf', 'pic', 'site', 'slides', 'sphere', 'start', 'stats',
      'status', 'talk', 'team', 'tube', 'vectoriel', 'vox', 'zic',
      'bot.', 'contact.', 'degooglisons-internet', 'forum.', 'participer.',
      'soutenir.)'
      ].join('|'), 'i');
    if (this.isURL(regSites, 'h')) {
      icons[0].file = `fav_${this.site}.png`;
      icons[1].file = `${this.site}.png`;
    }

    if (this.isURL(/(pad)/i, 'h')) {
      icons[0].file = 'fav_pad.png';
      icons[1].file = 'pad.png';
    }

    icons[0].file = icons[0].file || 'favicon-violet.png';
    icons[0].link = document.createElement('link');
    icons[0].link.rel = 'icon';
    icons[0].link.type = 'image/png';
    icons[0].link.href = this.l(`icons/${icons[0].file}`, 'n');
    document.getElementsByTagName('head')[0].appendChild(icons[0].link);

    icons[1].file = icons[1].file || 'apple-violet.png';
    icons[1].link = document.createElement('link');
    icons[1].link.rel = 'apple-touch-icon';
    icons[1].link.type = 'image/png';
    icons[1].link.href = this.l(`icons/${icons[1].file}`, 'n');
    document.getElementsByTagName('head')[0].appendChild(icons[1].link);

    // RSS
    const rss = document.createElement('link');
    rss.rel = 'alternate';
    rss.type = 'application/rss+xml';
    rss.href = 'https://rss.framasoft.org';
    rss.title = this.$i18n.t('fnav.sites.rss.d1'); // !? not translated
    document.getElementsByTagName('head')[0].appendChild(rss);
  },
  methods: {
    text(html) {
      return text(html)
    },
    l(href, nav, version) {
      // Lien absolu depuis l’emplacement de la nav
      if (nav === 'n' && this.baseurl !== '') {
        if (version === 'v') {
          return `${this.baseurl}${href}?${this.version}`;
        }
        return `${this.baseurl}${href}`;
      }
      // Lien relatif converti en url absolue (le navigateur fait lui-même le boulot)
      const link = document.createElement('a');
      link.href = href;
      return [link.protocol, '//', link.host, link.pathname, link.search, link.hash].join('');
    },
    cookie(action, name, value, time) {
      if (action === 'w') {
        const t = typeof time !== 'undefined' ? time : 31536000000; // 365 * 24 * 60 * 60 * 1000
        const today = new Date();
        const expires = new Date();
        expires.setTime(today.getTime() + t);
        document.cookie = [name, '=', encodeURIComponent(value), ';expires=', expires.toGMTString()].join('');
      } else {
        const oRegex = new RegExp(['(?:; )?', name, '=([^;]*);?'].join(''));
        if (oRegex.test(document.cookie)) {
          return decodeURIComponent(RegExp.$1);
        }
      }
      return null;
    },
    benevalo() {
      const today = Math.floor(new Date().getTime() / 1000);
      const fullMoon = 1453603580; // 24/01/2016 02:46:20
      const moonRev = 2551443; // 29j 12h 44m 3s

      return ((today - fullMoon) % moonRev < 129600
        || (today - fullMoon) % moonRev > moonRev - 129600);
    },
    divider(key) {
      return ([
        'start', 'zic', ' evl', ' dio', 'maestro', ' carte', ' minetest',
        ' news', 'git', 'wiki', ' petitions', ' wikipedia', ' status',
        ' credits'].indexOf(key) > -1);
    },
    footerPosition() {
      this.footerStyle = (document.body.scrollHeight < window.innerHeight )
        ? 'position: absolute'
        : 'position: relative';
      setTimeout(() => { // au cas où une animation redimentionne le body
        this.footerStyle = (document.body.scrollHeight < window.innerHeight )
          ? 'position: absolute'
          : 'position: relative';
      }, 800);
    },
    // Boolean functions
    isURL(string, location) {
      let l = window.location.href;
      switch (location) {
        case 'h': l = window.location.host; break;
        case 'u': break;
        default:
          return (l.indexOf(string) > -1);
      }

      if (typeof string === 'object' || typeof string === 'function') { // RegExp
        return (string.test(l));
      }
      return (l === string);
    },

    isEmail(emailAddress) { // RegEx from https://emailregex.com/
      const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      return pattern.test(emailAddress) === true;
    },

    isLang(lg, browser) {
      if (browser !== 'b') { // Langue de la page
        let lang = '';
        const html = document.getElementsByTagName('html');
        const meta = document.getElementsByTagName('script');

        if (window.location.href.indexOf('framabin.org/p/') > -1 // Contournement de PrivateBin
          && document.getElementById('language')
          && document.getElementById('language').innerHTML.indexOf('> français <') > -1) {
          lang = 'fr';
        } else if (window.location.host.indexOf('framindmap.org') > -1 // Contournement de Wisemapping
          && document.getElementById('userSettingsBtn')
          && document.getElementById('userSettingsBtn').innerHTML === 'Compte') {
          lang = 'fr';
        } else if (html[0].getAttribute('lang')) {
          lang = html[0].getAttribute('lang');
        } else if (html[0].getAttribute('locale')) {
          lang = html[0].getAttribute('locale');
        } else {
          for (let i = 0; i < meta.length; i += 1) {
            if ((meta[i].getAttribute('http-equiv') && meta[i].getAttribute('content')
              && meta[i].getAttribute('http-equiv').indexOf('Language') > -1)
              || (meta[i].getAttribute('property') && meta[i].getAttribute('content')
                  && meta[i].getAttribute('property').indexOf('locale') > -1)) {
              lang = meta[i].getAttribute('content');
            }
          }
        }
        return (lang.substr(0, 2).toLowerCase() === lg);
      }
      // Langue du navigateur
      const userLang = navigator.languages
        || [navigator.language || navigator.userLanguage];
      for (let i = 0; i < userLang.length; i += 1) {
        if (userLang[i].substring(0, 2).toLowerCase() === lg) {
          return true;
        }
      }
      return false;
    },

    isBefore(date) {
      return new Date(new Date().toDateString()) < new Date(date);
    },

    isAfter(date) {
      return new Date(new Date().toDateString()) > new Date(date);
    },
  }
}
</script>
