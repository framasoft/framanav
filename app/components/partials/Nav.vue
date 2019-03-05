<template>
  <div>
    <Meta />

    <!-- Menus -->
    <div id="framanav_container" class="hidden-print" style="height:42px;" v-show="!$root.inframe">
      <navbar id="framanav" style="display: none;" role="menubar">
        <span slot="brand">
          <a class="navbar-brand" slot="brand" :href="$root.link.soft">
            <img :src="`${$root['/']}img/logo.png`" alt="" />
            <span class="hidden-sm" v-html="$root.color.soft"></span>
          </a>
          <a href="#nav-end" id="nav-skip" v-html="$t('txt.skip')"></a>
        </span>
        <template slot="collapse">
          <navbar-nav>
            <dropdown
              ref="dropdown" tag="li" :id="`fs_${key}`"
              v-for="(cat, key) in $t('fnav.cat')" :key="key"
            >
              <a class="dropdown-toggle" role="button">
                {{ cat.name }} <b class="caret"></b>
              </a>
              <template slot="dropdown">
                <li class="dropdown-header" v-if="key === 'about'" v-html="$root.color.soft"></li>
                <popover
                  v-for="(l, index) in $root.fnav.cat[key]" :key="l"
                  tag="li" :class="`fs_${l}`"
                  :enable="!/^fnav/.test($t(`fnav.sites.${l}.t1`))"
                  :placement="/(services|about)/.test(key) && !(index % 2) ? 'right' : 'left'"
                  :auto-placement="false" trigger="hover-focus" append-to="#framanav"
                  :title="text($t(`fnav.sites.${l}.t1`))"
                >
                  <a :href="/^fnav/.test($t(`fnav.sites.${l}.link`)) ? $root.link[l] : $t(`fnav.sites.${l}.link`)">
                    <i :class="`fa fa-fw fa-lg ${$root.icon[l]}`" aria-hidden="true"></i>
                    {{
                      /^fnav/.test($t(`fnav.sites.${l}.name`))
                      ? $root.txt[l]
                      : text($t(`fnav.sites.${l}.name`))
                    }}
                    <span class="sr-only" v-html="`(${$t('txt.newWindow')})`"></span>
                    <i class="fa new-window fa-external-link" aria-hidden="true"></i>
                  </a>
                  <template slot="popover">
                    <div v-html="$t(`fnav.sites.${l}.d1`)"></div>
                  </template>
                </popover>
              </template>
            </dropdown>
            <popover tag="li" id="btn-soutenir" v-show="!benevalo()"
              placement="bottom" trigger="hover-focus" append-to="#framanav"
              :title="text($t('fnav.soutenir.t1'))"
            >
              <a :href="`${$root.link.soutenir}/?f=nav`" class="btn-soutenir">
                <i :class="`fa fa-fw fa-lg ${$root.icon.soutenir}`" aria-hidden="true"></i>
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
                <i :class="`fa fa-fw fa-lg ${$root.icon.benevalo}`" aria-hidden="true"></i>
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
                <i :class="`fa fa-fw fa-lg ${$root.icon.my}`" aria-hidden="true"></i>
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
    <ModalFAQ />
    -->
    <ModalInfo :config="config.modal.info" />
    <ModalDon
      :config="config.modal.don"
      :storage="storage.modal.don"
    />

    <Framabin v-if="/:\/\/framabin.org.p/.test($root.url)" />
    <Framavox v-if="/:\/\/framavox.org/.test($root.url)" />
    <Framateam v-if="/:\/\/framateam.org/.test($root.url)" />

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
import Framateam from './sites/Framateam.vue';

import { Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip, Modal } from 'uiv';
import { siteConfig } from '../../config';

export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip, Modal,

    Meta, Cortex, AlertInfo, ModalFAQ, ModalInfo, ModalDon,

    Optin, Footer,
    Framabin, Framavox, Framateam,
  },
  created() {
    // Add [data-*] attributes for CSS
    const html = document.getElementsByTagName('html');
    html[0].setAttribute('data-url', this.$root.url);
    html[0].setAttribute('data-inframe', this.$root.inframe);

    // Load CSS
    const fcss = document.createElement('link');
    Object.assign(fcss, {
      rel: 'stylesheet',
      href: `${this.$root.baseurl}main.css`,
    });
    document.getElementsByTagName('head')[0].appendChild(fcss);

    this.storage = this.storageInit;

    let localConfig = {};
    try {
      localConfig = l$;
    } catch (e) {
      // continue regardless of error
    }
    this.config = this.merge(
      this.config, // default config
      (!!Object.keys(siteConfig(this)).length)
      ? siteConfig(this) // config.js
      : localConfig
    );
  },
  directives: {
    Popover, Tooltip
  },
  data() {
    return {
      // Init nav
      version: '190108', // n° version de la nav
      myframa: [
          'https://my.framasoft.org/?post=', encodeURIComponent(this.$root.url),
          '&title=', encodeURIComponent(document.title || this.$root.url),
          '&description=', encodeURIComponent(document.getSelection()),
          '&source=bookmarklet',
        ].join(''),
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
    link(href) {
      const link = document.createElement('a');
      link.href
        = (/:\/\//.test(href))
        ? href
        : `${this.$root.baseurl}${href.replace(/^\//, '')}`;
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
    isLang(lg, browser) {
      if (browser !== 'b') { // Langue de la page
        let lang = '';
        const html = document.getElementsByTagName('html');
        const meta = document.getElementsByTagName('script');

        if (this.$root.url.indexOf('framabin.org/p/') > -1 // Contournement de PrivateBin
          && document.getElementById('language')
          && document.getElementById('language').innerHTML.indexOf('> français <') > -1) {
          lang = 'fr';
        } else if (this.$root.host.indexOf('framindmap.org') > -1 // Contournement de Wisemapping
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
        Object.assign(e, {
          src: url,
          type: 'text/javascript',
          charset: 'utf-8',
        });

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
