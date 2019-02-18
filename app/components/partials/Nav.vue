<template>
  <div>
    <!-- Menus -->
    <div id="framanav_container" class="hidden-print" style="height:42px;" v-show="!inframe">
      <navbar id="framanav" style="display: none;" role="menubar">
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
    </div>

    <!-- Make a donation -->
    <a :href="$root.link.soutenir + '/?f=macaron'"
      id="framanav_donation"
      class="hidden-xs">
      <span class="sr-only" v-html="text($t('fnav.soutenir.name'))"></span>
    </a>

    <!-- Cortex -->
    <iframe
      id="framanav_cortex"
      src="https://framasoft.org/nav/html/cortex.html"
      aria-hidden="true"
      style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
    ></iframe>

    <!-- Alert -->
    <alert id="nav-alert"
      :type="config.alert[0]"
      v-if="config.alert[1] !== '' && state.alert"
      dismissible
      @dismissed="state.alert = false; cookie('w', config.alert[2], true, config.alert[3]);">
      <div><p class="text-center" v-html="config.alert[1]"></p></div>
    </alert>

    <!-- Modal info -->
    <modal v-model="state.modal.info"
      :title="config.modal.info[0]"
      id="modal-finfo"
      aria-labelledby="modal-finfoLabel"
      v-if="config.modal.info[0] !== ''">
      <div slot="header">
        <button type="button" class="close"
          @click="state.modal.info = false; cookie('w', config.modal.info[2], true);">
          <span aria-hidden="true">×</span>
          <span class="sr-only" v-html="$t('txt.close')"></span>
        </button>
        <h1 id="modal-finfoLabel"
          v-html="config.modal.info[0]"
        ></h1>
      </div>

      <div class="clearfix"  id="modal-finfoBody" v-html="config.modal.info[1]"></div>

      <div slot="footer">
        <button class="btn"
          v-html="$t('txt.close')"
          @click="state.modal.info = false; cookie('w', config.modal.info[2], true);"
        ></button>
        <button class="btn btn-primary"
          v-html="$t('txt.nevershow')"
          @click="state.modal.info = false; cookie('w', config.modal.info[2], true, config.modal.info[3]);"
        ></button>
      </div>
    </modal>

    <!-- Modal FAQ -->
    <modal v-model="state.modal.faq"
      :title="$t('fnav.sites.faq.name') + ' ' + name"
      id="modal-fsFAQ"
      aria-labelledby="modal-fsFAQLabel"
      ><!-- v-show="this.$root.f.faq.l.indexOf(this.lname) > -1" -->
      <div slot="header">
        <button type="button" class="close" @click="state.modal.faq = false;">
          <span aria-hidden="true">×</span>
          <span class="sr-only" v-html="$t('txt.close')"></span>
        </button>
        <h1 id="modal-fsFAQLabel" v-html="$t('fnav.sites.faq.name') + ' ' + name"></h1>
      </div>

      <div class="clearfix" id="modal-fsFAQBody">
        <!--
          Import from
          https://contact.framasoft.org/foire-aux-questions/ #this.lname  .list-group-item
        -->
      </div>

      <div slot="footer">
        <span class="pull-left">{{ $t('another-question') }}
          <a :href="$t('f.contact.l')" v-html="$t('contact-us')"></a>
        </span>
        <button class="btn"
          v-html="$t('txt.close')"
          @click="state.modal.faq = false;"
        ></button>
      </div>
    </modal>

    <!-- Modal don -->
    <modal v-model="state.modal.don"
      :title="$t('fnav.modaldon.title')"
      id="modal-soutenir"
      aria-labelledby="modal-soutenirLabel"
      v-if="config.modal.don[1] !== ''"
      @hide="donClose();">
      <div slot="header">
        <button type="button" class="close" @click="state.modal.don = false;">
          <span aria-hidden="true">×</span>
          <span class="sr-only" v-html="$t('txt.close')"></span>
        </button>
        <h1 id="modal-soutenirLabel"
          v-html="$t('fnav.modaldon.title')"
        ></h1>
      </div>

      <div class="clearfix" id="modal-soutenirBody"
        v-html="$t('fnav.modaldon.desc').replace('%modal.don[1]%', $t(config.modal.don[1]))">
      </div>

      <div slot="footer">
        <div class="clearfix">
          <p class="col-md-12 text-center">
            <a target="_blank" :href="$root.link.soutenir + '?f=modal&s=' + site"
              class="btn btn-soutenir btn-block">
              <i :class="'fa fa-fw ' + $root.icon.soutenir" aria-hidden="true"></i>
              <span v-html="$t('fnav.modaldon.b1')"></span>
              <span class="sr-only" v-html="'(' + $t('txt.newWindow') + ')'"></span>
            </a>
          </p>
          <p class="col-md-6 text-center">
            <button id="modal-dl"
              :href="state.modal.donTarget"
              class="btn btn-xs btn-default btn-block"
              @click="state.modal.don = false;">
              <span
                v-if="config.modal.don[2] === 'txt.actionBtn.use'"
                v-html="$t('fnav.modaldon.b3').replace('%modal.don[2]%', `${$t(config.modal.don[2])} ${name}`)"
              ></span>
              <span
                v-else
                v-html="$t('fnav.modaldon.b3').replace('%modal.don[2]%', $t(config.modal.don[2]))"
              ></span>
            </button>
          </p>
          <p class="col-md-6 text-center">
            <button id="modal-dl2"
              class="btn btn-xs btn-default btn-block"
              style="line-height: 36px;"
              @click="state.modal.don = false; storage.modal.don = [true, 31536000000]"
              v-html="$t('fnav.modaldon.b4')">
            </button>
          </p>
        </div>
      </div>
    </modal>

    <!-- Optin -->
    <portal target-el="#foptin">
      <div class="alert alert-danger fade in"
        id="fs_opt-in_error"
        v-if="state.optinEmail !== '' && !isEmail(state.optinEmail)">
        <p v-html="$t('fnav.optin.e2').replace('%f$Email%', '<b>' + state.optinEmail + '</b>')"></p>
      </div>
      <div class="alert alert-success fade in"
        id="fs_opt-in_confirm"
        v-if="state.optinSent">
        <p v-html="$t('fnav.optin.s1').replace('%f$Email%', state.optinEmail)"></p>
      </div>
      <div class="alert alert-info fade in"
        id="fs_opt-in"
        v-if="state.optin && !state.optinSent">
        <input type="checkbox" id="fs_opt-in_checkbox" v-model="state.optinChecked" :value="state.optinChecked" @change="subscribe()">
        <label for="fs_opt-in_checkbox" v-html="$t('fnav.optin.t')"></label>
        <br>
        <small>
          <span v-html="$t('fnav.optin.d1')"></span>&nbsp;
          <a :href="$root.link.newsletter" id="link-opt-in" target="_blank" >
            <span v-html="$t('fnav.optin.d2')"></span>
            <span class="sr-only" v-html="'(' + $t('txt.newWindow') + ')'"></span>
          </a>
        </small>
      </div>
    </portal>

    <Framabin v-if="/:\/\/framabin.org.p/.test(url)" />
    <Framavox v-if="/:\/\/framavox.org/.test(url)" />

    <Footer />
  </div>
</template>

<script>
import Footer from './Footer.vue';
import Framabin from './Framabin.vue';
import Framavox from './Framavox.vue';

import { Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip, Modal, Alert } from 'uiv';
import { text, analytics, mergeObj } from '../../tools';
import { siteConfig } from '../../config';

export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip, Modal, Alert,
    Footer, Framabin, Framavox,
  },
  created() {
    // Optin
    if (!window.vuefsPrerender) {
      const foptin = document.createElement('div');
      foptin.id = 'foptin';
      document.getElementsByTagName('body')[0].appendChild(foptin);
    }
  },
  directives: {
    Popover, Tooltip
  },
  data() {
    const bookmarkURL = window.location.href;
    const bookmarkTitle = document.title || bookmarkURL;

    return {
      // Init nav
      version: '190108', // n° version de la nav
      inframe: window.top.location !== window.self.document.location,
      myframa: [
          'https://my.framasoft.org/?post=', encodeURIComponent(bookmarkURL),
          '&title=', encodeURIComponent(bookmarkTitle),
          '&description=', encodeURIComponent(document.getSelection()),
          '&source=bookmarklet',
        ].join(''),
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
      storage: this.storageInit(),
      log: [],
      // Global config
      config: {
        modal: {
          don: ['', '', '', 604800000],
          /** [querySelector or 'onstart', 'txt.action.*', 'txt.actionBtn.*', cookie duration (7 days)] */
          info: ['', '', 'modal-info', 604800000],
          /** [title, text, cookie name, cookie duration] */
        },
        alert: ['black', '', 'nav-alert', 604800000],
        /** [color (from bootstrap), text, cookie name, cookie duration] */
        optin: ['', 'opt-in', 604800000],
        /** [email selector, cookie name, cookie duration] */
      },
      state: {
        modal: {
          don: false,
          donTarget: '#SoutenirFramasoft',
          faq: false,
          info: false,
        },
        alert: false,
        optin: false,
        optinChecked: false,
        optinEmail: '',
        optinSent: false,
      },
    };
  },
  mounted() {
    const html = document.getElementsByTagName('html');
    setInterval(() => {
      if (html[0].getAttribute('lang') && this.$i18n.locale !== html[0].getAttribute('lang')) {
        this.$i18n.locale = html[0].getAttribute('lang');
      }
    }, 1000);

    if (this.isURL(/nav\/html\/cortex\.html$/, 'u')) {
      this.cortex();
    } else {
      this.minus();
    }

    this.name = this.site[0].toUpperCase() + this.site.slice(1).replace('.framasoft', ''); // Nom du service
    this.lname = this.name.toLowerCase();

    // Get current script root url
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i += 1) {
      if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('/nav.js') > -1) {
        this.baseurl = this.l(scripts[i].getAttribute('src').replace('nav.js', ''));
      }
    }

    // [site] Cleaning (shortest name for config)
    this.site = this.site.replace(/framand/i, 'and') // TODO : remplacer par noFrama ?
        .replace(/framage/i, 'age')
        .replace(/framae/i, 'mae')
        .replace(/(\.framasoft|frama\.)/i, '')
        .replace(/framin/i, 'min')
        .replace(/frame/i, 'me')
        .replace(/frama/i, '');

    // [site] Aliases
    switch (this.site) {
      case 'huit.re': this.site = 'link'; break;
      case 'tontonroger': this.site = 'bee'; break;
      case 'trouvons': this.site = 'bee'; break;

      // no default
    }

    // [site] Subdomains
    if (this.isURL(/framaboard/i, 'h')) { this.site = 'board'; }
    if (this.isURL(/framadate/i, 'h')) { this.site = 'date'; }
    if (this.isURL(/framacalc/i, 'h')) { this.site = 'calc'; }

    // [site] Exceptions Framapad
    if (this.isURL('mypads.framapad.org', 'h')
      || this.isURL('beta3.framapad.org', 'h')) {
      this.site = 'mypads';
      this.name = 'Framapad';
    }
    if ((this.isURL(/.framapad/i, 'h') && !this.isURL(/mypads./i, 'h'))
      || (this.isURL(/mypads.framapad/i, 'h') && this.isURL('/p/'))
      || (this.isURL(/beta3.framapad/i, 'h') && this.isURL('/p/'))) {
      this.site = 'etherpad';
      this.name = 'Framapad';
    }

    // Footer position refresh on events
    window.addEventListener('click', this.footerPosition);
    window.addEventListener('load', this.footerPosition);
    window.addEventListener('resize', this.footerPosition);
    window.addEventListener('scroll', this.footerPosition);

    // Add [data-*] attributes for CSS
    html[0].setAttribute('data-url', window.location.href);
    html[0].setAttribute('data-inframe', this.inframe);

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
    Object.assign(icons[0].link, {
      rel: 'icon',
      type: 'image/png',
      href: this.l(`icons/${icons[0].file}`, 'n'),
    });
    document.getElementsByTagName('head')[0].appendChild(icons[0].link);

    icons[1].file = icons[1].file || 'apple-orange.png';
    icons[1].link = document.createElement('link');
    Object.assign(icons[1].link, {
      rel: 'apple-touch-icon',
      type: 'image/png',
      href: this.l(`icons/${icons[1].file}`, 'n'),
    });
    document.getElementsByTagName('head')[0].appendChild(icons[1].link);

    // RSS
    const rss = document.createElement('link');
    Object.assign(rss, {
      rel: 'alternate',
      type: 'application/rss+xml',
      href: 'https://rss.framasoft.org',
      title: this.$i18n.t('fnav.sites.rss.d1'),
    });
    document.getElementsByTagName('head')[0].appendChild(rss);
    /*********** Config ***********/
    mergeObj(
      this.config, // default config
      (!!Object.keys(siteConfig(this)).length)
      ? siteConfig(this) // config.js
      : l$ || {} // inline config (or nothing)
    );

    if (this.config.js !== undefined && this.config.js.ext !== undefined) {
      if (this.config.js.jQuery) {
        this.loadJS(this.l('lib/jquery/jquery-3.3.1.min.js', 'n'), () => {
          this.config.js.ext();
        });
      } else {
        this.config.js.ext();
      }
    }

    /** Alert */
    if (this.config.alert[1] !== '') {
      this.state.alert = !this.cookie('r', this.config.alert[2]);
    }

    /** Modal info */
    if (this.config.modal.info[0] !== '') {
      this.state.modal.info = !this.cookie('r', this.config.modal.info[2]);
    }

    /** Modal don */
    if (this.config.modal.don[0] !== '') {
      if (this.storage.modal.don[0]) {
        // Global cookie send locally
        this.cookie('w', this.config.modal.don[1], true, this.storage.modal.don[2]);
      }
      this.state.modal.don = !this.cookie('r', 'dondl');
    }

    /** Opt-in */
    if (this.config.optin[0] !== '') {
      if (this.storage.optin[0]) {
        // Global cookie send locally
        this.cookie('w', this.config.optin[1], true, this.storage.optin[2]);
      }
      // Move box next to email input
      document.querySelector(this.config.optin[0]).after(document.getElementById('foptin'));
      // Display checkbox
      this.state.optin = (!this.cookie('r', 'opt-in'));
    }
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
    donClose() {
      this.cookie('w', 'dondl', true, this.storage.modal.don[1]);
      window.location.href= this.state.modal.donTarget;
    },
    subscribe() {
      this.state.optinEmail
        = (this.config.optin[0] !== '' && document.querySelector(this.config.optin[0]) !== null)
        ? document.querySelector(this.config.optin[0]).value
        : '';
      if (this.isEmail(this.state.optinEmail)) {
        // Subscribe
        fetch('https://contact.framasoft.org/php_list/lists/?p=subscribe&id=2', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: [
            'makeconfirmed=1&htmlemail=1&list%5B5%5D=signup&listname%5B5%5D=Newsletter&email=',
            this.state.optinEmail.replace('@', '%40'),
            '&VerificationCodeX=&subscribe=Abonnement'
          ].join(''), // Paramètres habituellement passés dans le formulaire
        }).catch((err) => {
          console.error(err); // eslint-disable-line
        });
        this.state.optinSent = true;

        // Never ask again
        this.cookie('w', this.config.optin[1], true, this.config.optin[2]);
        this.storage.optin = [true, this.config.optin[2]];
        this.minus('o', this.storage);
      }
      // Not a valid email
      this.state.optinChecked = false;
    },
    /* Storage */
    storageInit() {
      return { modal: { don: [false, 604800000] }, optin: [false, 604800000] };
    },
    storageReady(callback) {
      if (document.getElementById('framanav_cortex')) {
        if (Object.keys(this.storage).length > 0) {
          callback();
        } else {
          window.setTimeout(this.storageReady.bind(null, callback), 100);
        }
      }
    },
    cortex(action, msg) {
      const m = msg;
      switch (action) {
        case 'o': // output to Minus
          try {
            window.parent.postMessage(localStorage.framanav, '*');
          } catch (e) {
            window.parent.postMessage(JSON.stringify(this.storageInit()), '*');
          }
          break;
        case 'i': // input in localStorage
          try {
            localStorage.setItem('framanav', JSON.stringify(m));
          } catch (e) {
            // Pas accès au localStorage
          }
          break;
        default: // init
          try {
            if (localStorage.framanav === undefined) {
              this.cortex('i', this.storageInit());
            }
          } catch (e) {
            // Pas accès au localStorage
          }
          this.cortex('o');

          window.onmessage = function listenMinus(event) {
            /* if(event.origin !== 'frama.web') {
              return;
            } */
            try {
              const payload = JSON.parse(event.data);
              if (payload.framanav !== this.storageInit()
                && Object.keys(payload.framanav).length) {
                this.mergeObj(this.storage, payload.framanav);
                this.cortex('i', this.storage);
              }
              this.cortex('o');
            } catch (e) {
              // Pas du JSON ?
            }
          };
          break;
      }
    },
    minus(action, msg) {
      const m = msg; const c = document.getElementById('framanav_cortex');
      if (c) {
        switch (action) {
          case 'i': { // input in this.storage
            try {
              this.storage = JSON.parse(m);
            } catch (e) {
              // Pas du JSON
            }
            break;
          }
          case 'o': { // output to Cortex
            c.contentWindow.postMessage(JSON.stringify({ framanav: m }), '*');
            break;
          }
          default: { // init
            this.minus('o', this.storage);

            const eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
            const eventer = window[eventMethod];
            const messageEvent = (eventMethod === 'attachEvent') ? 'onmessage' : 'message';
            eventer(messageEvent, e => this.minus('i', e.data), false);
            break;
          }
        }
      }
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
    loadJS(url, callback) {
      if (!this.loadedScript) {
        this.loadedScript = [];
      }

      if (this.loadedScript.indexOf(url) === -1) {
        this.loadedScript.push(url);
        const head = document.getElementsByTagName('head')[0];
        const e = document.createElement('script');
        e.src = url;
        e.type = 'text/javascript';
        e.charset = 'utf-8';

        let done = false;
        e.onload = function isLoaded() {
          if (!done && (!this.readyState
            || this.readyState === 'loaded' || this.readyState === 'complete')) {
            done = true;
            callback();
            e.onload = null; // Handle memory leak in IE
            e.onreadystatechange = e.onload;
          }
        };
        e.onreadystatechange = e.onload;
        head.appendChild(e);
      }
    },
  }
}
</script>
