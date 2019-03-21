<template>
  <div>
    <Meta />

    <!-- Menus -->
    <div id="framanav_container" class="hidden-print" style="height:42px;" v-show="!$root.inframe">
      <navbar id="framanav" style="display: none;" role="menubar">
        <span slot="brand">
          <a class="navbar-brand" slot="brand" :href="$root.link.soft">
            <img :src="`${$root.baseurl}img/logo.png`" alt="" />
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
                  <a :href="/^fnav/.test($t(`fnav.sites.${l}.link`)) ? $root.link[l] : $t(`fnav.sites.${l}.link`)"
                    target="_blank">
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
                @click.prevent="openMyframa()"
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

    <AlertInfo />

    <!-- TODO
    <ModalFAQ />
    -->
    <ModalInfo />
    <ModalDon :storage="storage.modal.don" />

    <Framabin v-if="/:\/\/framabin.org.p/.test($root.url)" />
    <Framavox v-if="/:\/\/framavox.org/.test($root.url)" />
    <Framateam v-if="/:\/\/framateam.org/.test($root.url)" />

    <Optin :storage="storage.optin" />
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

    // Load Bootstrap CSS (Depreciated)const regSites = new RegExp([
    const regSites = new RegExp([
      '(bookin', 'drop', 'bookin', 'carte', 'forms', 'memo', 'pic',
      'stats)'
      ].join('|'), 'i');
    if (regSites.test(this.$root.host) || this.$root.host === 'framaboard.org') {
      const bscss = document.createElement('link');
      Object.assign(bscss, {
        rel: 'stylesheet',
        href: `${this.$root.baseurl}lib/bootstrap/css/bootstrap.min.css`,
      });
      document.getElementsByTagName('head')[0].appendChild(bscss);
    }
    // Load CSS
    const fcss = document.createElement('link');
    Object.assign(fcss, {
      rel: 'stylesheet',
      href: `${this.$root.baseurl}main.css`,
    });
    document.getElementsByTagName('head')[0].appendChild(fcss);


    this.storage = this.storageInit;
  },
  directives: {
    Popover, Tooltip
  },
  data() {
    return {
      // Init nav
      version: '190319', // n° version de la nav
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
      js: function() {},
    };
  },
  mounted() {
    const html = document.getElementsByTagName('html');
    setInterval(() => {
      if (html[0].getAttribute('lang') && this.$i18n.locale !== html[0].getAttribute('lang')) {
        this.$i18n.locale = html[0].getAttribute('lang');
      }
    }, 1000);

    /*********** Custom JavaScript ***********/
    this.customJS(this.$root.site);
    if(typeof this.js === 'function') {
      if (/jQuery/.test(this.js.toString()) && window.jQuery === undefined) {
        this.loadJS(this.link('lib/jquery/jquery-3.3.1.min.js'), () => {
          this.js();
        });
      } else {
        this.js();
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
    openMyframa() {
      window.open(this.myframa, 'myframa', 'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1');
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

        if (html[0].getAttribute('lang')) {
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
    customJS(site) {
      switch (site) {
        case 'bee':
          this.js = function() {
            if (jQuery('.explain').length) { jQuery('#q').focus(); }
            jQuery('.footer').hide();
            jQuery('body').css('margin-bottom', '0');
            // Default search in fr
            if (this.isLang('fr', 'b') && document.cookie.indexOf('language=') === -1) {
              jQuery('select[name="language"] option[value="fr"]').prop('selected', true);
            }
            // Active search engine list
            let engines = '';
            jQuery('#main_results .label-default').each((i) => {
              const html = jQuery('<div />')
                .append(jQuery('#main_results .label-default')
                  .eq(i).clone())
                .html();
              if (engines.indexOf(html) === -1) {
                engines += `${html} `;
              }
            });
            jQuery('#sidebar_results').append(`
              <div class="panel panel-default">
                <div class="panel-heading">
                  <h4 class="panel-title">${this.$i18n.t('bee.search')}</h4>
                </div>
                <div class="panel-body">
                  <p>${engines.replace(/pull-right/g, '')}</p>
                  <p>${this.$i18n.t('bee.pref')}</p>
                </div>
              </div>
            `);
          };
          break;

        case 'board':
          if (/\.framaboard/.test(this.$root.host)) { // dans Kanboard
            this.js = function() {
              jQuery('h1 .logo a').html(this.$root.color.board);
              jQuery('h1 .logo').removeClass('logo');
              jQuery([
                'a[href$="?controller=UserCreationController&action=show&remote=1"]',
                'a[href^="/?controller=UserViewController&action=external"]',
                'input[name="is_ldap_user"]'].join())
                .parent().hide();
            };
          }
          break;

        case 'calc':
          // dans Ethercalc
          if (!/accueil\.framacalc\.org/.test(this.$root.host)) {
            this.js = function() {
              try {
                if (window.top.location.href.indexOf('framacalc.org/=') > -1) {
                  document.getElementById('framanav_container').style = 'height:42px; opacity:0';
                  document.getElementsByTagName('html')[0].setAttribute('data-inframe', 'false');
                }
              } catch (e) {
                // continue regardless of error
              }
              setInterval(() => {
                if (document.body.scrollHeight < window.innerHeight - 30) {
                  window.dispatchEvent(new Event('resize'));
                }
              }, 1000)
            };
          }
          break;

        case 'drop':
          this.js = function() {
            if (this.$root.url !== 'https://framadrop.org/') {
              jQuery('main .row:last,main hr:last').hide();
            }
          };
          break;

        case 'libre':
          this.js = function() {
            if (this.$root.inframe) {
              document.querySelectorAll('a').forEach(a => Object.assign(a, { target: '_blank' }));
            }
          };
          break;

        case 'mindmap':
          this.js = function() {
            const html = document.getElementsByTagName('html');
            if (document.getElementById('userSettingsBtn')
              && document.getElementById('userSettingsBtn').innerHTML === 'Compte'
              && html[0].getAttribute('lang') !== 'fr') {
              html[0].lang = 'fr';
              this.$i18n.locale = 'fr';
            } else {
              html[0].lang = 'en';
              this.$i18n.locale = 'en';
            }
          };
          break;

        case 'my':
          if (/source=bookmarklet/.test(this.$root.url)) {
            document.getElementsByTagName('html')[0].setAttribute('data-inframe', 'true');
            this.js = function() {
              document.getElementById('loginform').insertAdjacentHTML('beforeEnd',
                `<p class="alert alert-warning"><b>Rappel&nbsp;:</b> MyFrama sert à
                regrouper en un même endroit vos liens (notamment vos pads, calcs, sondages, etc).
                Il ne permet <strong>pas de créer un compte unique</strong> pour
                accéder à l’ensemble des services de Framasoft.</p>`);
            };
          } else {
            this.js = function() {
              if (this.$root.inframe) {
                document.getElementById('linklist').classList.add('container-fluid');
                document.getElementById('linklist').classList.remove('container');
                document.getElementById('pageheader').style.display = 'none';
                document.querySelectorAll('a').forEach(a => Object.assign(a, { target: '_blank' }));
              }
            };
          }
          break;

        // <framapad> --------------------------------------------------------
        case 'etherpad': // dans Etherpad
          this.js = function() {
            jQuery('#loading').delay(2000).append(`
              <p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br>
              l’export <a href="${this.$root.url}/export/html">html</a>
              ou <a href="${this.$root.url}/export/txt">txt</a>
              de votre document et <a href="${this.$root.link.contact}/#framapad">contactez-nous</a>.</p>`);
            if (!this.$root.inframe) {
              const addMaestroBtn = setInterval(() => {
                if (jQuery('#editbar .menu_right').length && !jQuery('#maestroBtn').length) {
                  jQuery('#editbar .menu_right').prepend(`
                    <li id="maestroBtn">
                      <a title="Ajouter une visio-conférence"
                        href="${this.maestro}">
                        <button class="buttonicon fa fa-video-camera"
                          style="top:0 !important;"></button>
                        <span class="sr-only">Visio-conférence</span>
                      </a>
                    </li>`);
                  clearInterval(addMaestroBtn);
                }
              }, 1000);
            }
          };
          break;
          // </framapad> -------------------------------------------------------

        case 'piaf':
          this.js = function() {
            document.querySelectorAll('img[src*="/packs/logo"]')
              .forEach(img => Object.assign(img, { src: 'https://framasoft.org/nav/icons/piaf.png' }));
          };
          break;

        // no default
      }
    },
  }
}
</script>
