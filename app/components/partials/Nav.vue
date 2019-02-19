<template>
  <div>
    <Meta :site="site" :baseurl="baseurl" />

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
                  :enable="!!$i18n.messages[$t('lang')].fnav.sites[l].t1"
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
    <a :href="`${$root.link.soutenir}/?f=macaron`"
      id="framanav_donation"
      class="hidden-xs">
      <span class="sr-only" v-html="text($t('fnav.soutenir.name'))"></span>
    </a>

    <!-- TODO
      <Cortex
        key="framanav"
        src="https://framasoft.org/nav/html/cortex.html"
        :storage="storage"
        :init="storageInit"/>
    -->

    <AlertInfo :config="config.alert" />

    <!-- TODO
    <ModalFAQ :name="name" />
    -->
    <ModalInfo :config="config.modal.info" />
    <ModalDon
      :name="name"
      :config="config.modal.don"
      :storage="storage.modal.don"
    />

    <Framabin v-if="/:\/\/framabin.org.p/.test(url)" />
    <Framavox v-if="/:\/\/framavox.org/.test(url)" />

    <Optin
      :config="config.optin"
      :storage="storage.optin"
    />
    <Footer />
  </div>
</template>

<script>
import Meta from './Meta.vue';
import Cortex from './Cortex.vue';
import AlertInfo from './AlertInfo.vue';
import ModalFAQ from './ModalFAQ.vue';
import ModalInfo from './ModalInfo.vue';
import ModalDon from './ModalDon.vue';

// Need vue-portal
import Optin from './Optin.vue';
import Footer from './Footer.vue';
import Framabin from './sites/Framabin.vue';
import Framavox from './sites/Framavox.vue';

import { Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip, Modal } from 'uiv';
import { text, mergeObj, cookie } from '../../tools';
import { siteConfig } from '../../config';

export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip, Modal,

    Meta, Cortex, AlertInfo, ModalFAQ, ModalInfo, ModalDon,

    Optin, Footer,
    Framabin, Framavox,
  },
  created() {
    // Get current script root url
    const scripts = document.getElementsByTagName('script');
    this.baseurl = this.link(scripts[scripts.length-1].src.replace('nav.js', ''));

    // Add [data-*] attributes for CSS
    const html = document.getElementsByTagName('html');
    html[0].setAttribute('data-url', window.location.href);
    html[0].setAttribute('data-inframe', this.inframe);

    // Load CSS
    const fcss = document.createElement('link');
    Object.assign(fcss, {
      rel: 'stylesheet',
      href: `${this.baseurl}main.css`,
    });
    document.getElementsByTagName('head')[0].appendChild(fcss);

    this.storage = this.storageInit;

    mergeObj(
      this.config, // default config
      (!!Object.keys(siteConfig(this)).length)
      ? siteConfig(this) // config.js
      : l$ || {} // inline config (or nothing)
    );
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
      storageInit: {
        modal: { don: [false, 604800000] },
        optin: [false, 604800000],
      },
      storage: {},
      // Global config
      config: {
        modal: {
          don: ['', '', '', 604800000],
          /** [querySelector or 'onstart', 'txt.action.*', 'txt.actionBtn.*', cookie duration (7 days)] */
          info: ['', '', 'modal-info', 604800000],
          /** [title, text, cookie name, cookie duration] */
        },
        alert: ['', '', 'nav-alert', 604800000],
        /** [color (from bootstrap), text, cookie name, cookie duration] */
        optin: ['', 'opt-in', 604800000],
        /** [email selector, cookie name, cookie duration] */
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

    this.name = this.site[0].toUpperCase() + this.site.slice(1).replace('.framasoft', ''); // Nom du service
    this.lname = this.name.toLowerCase();

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

    /*********** Config ***********/
    if (this.config.js !== undefined && this.config.js.ext !== undefined) {
      if (this.config.js.jQuery) {
        this.loadJS(this.link('lib/jquery/jquery-3.3.1.min.js'), () => {
          this.config.js.ext();
        });
      } else {
        this.config.js.ext();
      }
    }
  },
  methods: {
    text, cookie,
    link(href) {
      const link = document.createElement('a');
      link.href
        = (/:\/\//.test(href))
        ? href
        : `${this.baseurl}${href.replace(/^\//, '')}`;
      link.href = link.href.replace(/\?$/, `?${this.version}`)
      return [link.protocol, '//', link.host, link.pathname, link.search, link.hash].join('');
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
