<template>
  <div>
    <Meta />
    <Cortex />

    <HeaderMenu />

    <Feedback v-if="testing.feedback" />

    <AlertInfo />
    <ModalInfo />
    <ModalDon v-if="cortexReady" />

    <Framabin v-if="/:\/\/framabin.org.p/.test($t('url'))" />
    <Framavox v-if="/:\/\/framavox.org/.test($t('url'))" />
    <Framateam v-if="/:\/\/framateam.org/.test($t('url'))" />

    <Optin v-if="cortexReady" />
    <FooterMenu />
    <BackTop />
  </div>
</template>

<script>
import Meta from './Meta.vue';
import Cortex from './Cortex.vue';

import HeaderMenu from './HeaderMenu.vue'; /* TODO : replace by PopMenu */

import AlertInfo from './AlertInfo.vue';
import ModalInfo from './ModalInfo.vue';
import ModalDon from './ModalDon.vue';

// Need vue-portal
import Framabin from './sites/Framabin.vue';
import Framavox from './sites/Framavox.vue';
import Framateam from './sites/Framateam.vue';

import Optin from './Optin.vue';
import Feedback from './Feedback.vue';
import FooterMenu from './FooterMenu.vue';

import BackTop from './BackTop.vue';

export default {
  components: {
    Meta, Cortex, HeaderMenu,

    AlertInfo, ModalInfo, ModalDon,

    Framabin, Framavox, Framateam,
    Optin, FooterMenu, Feedback,
    BackTop,
  },
  created() {
    // Add [data-*] attributes for CSS
    const html = document.getElementsByTagName('html');
    html[0].setAttribute('data-url', this.$t('url'));
    html[0].setAttribute('data-inframe', this.$t('inframe'));
    html[0].setAttribute('id', 'f--');

    /**
     * Depreciated - Need to be cleaned up
     **/
    // Load Bootstrap CSS
    // Todo: build files from SASS
    let regSites = new RegExp([
      '(bookin', 'drop', 'carte', 'frama.link', 'huit.re', 'memo', 'pic', 'stats)'
      ].join('|'), 'i');
    if (regSites.test(this.$t('host'))
      || this.$t('host') === 'framaboard.org'
      || this.$t('host') === 'framanotes.org'
      || this.$t('url') === 'https://framaforms.org/'
      || this.$t('url') === 'https://frama.site'
      || this.$t('url') === 'https://frama.wiki') {
      const bsCSS = document.createElement('link');
      Object.assign(bsCSS, {
        rel: 'stylesheet',
        href: `${this.$t('baseurl')}lib/bootstrap/css/bootstrap.min.css`,
      });
      document.getElementsByTagName('head')[0].appendChild(bsCSS);
    }

    // Wrap .carousel with .carousel-container
    if (/(carte|notes)/.test(this.$t('host'))
      || this.$t('url') === 'https://framaforms.org/'
      || this.$t('url') === 'https://frama.site'
      || this.$t('url') === 'https://frama.wiki') {
      const carousel = document.querySelector('.carousel');
      const carouselContainer = document.createElement('div');
      if (carousel !== null) {
        carouselContainer.classList.add('carousel-container');
        carousel.parentNode.insertBefore(carouselContainer, carousel);
        carouselContainer.appendChild(carousel);
      }
    }

    // Modales, Carousel and Tabs need BootstrapJS
    regSites = new RegExp([
      '(agenda', 'bookin', 'drive', 'memo)'
      ].join('|'), 'i');
    if (regSites.test(this.$t('host'))
      || this.$t('host') === 'framanotes.org'
      || this.$t('url') === 'https://framaforms.org/') {
      const bsJS = document.createElement('script');
      Object.assign(bsJS, {
        src: `${this.$t('baseurl')}lib/bootstrap/js/bootstrap.min.js`,
        type: 'text/javascript',
        charset: 'utf-8',
      });
      document.getElementsByTagName('head')[0].appendChild(bsJS);
    }
    /** </> */

    // Load CSS
    const fcss = document.createElement('link');
    Object.assign(fcss, {
      rel: 'stylesheet',
      href: `${this.$t('baseurl')}main.css`,
    });
    document.getElementsByTagName('head')[0].appendChild(fcss);

    // Testing features
    const kkeys = [];
    window.addEventListener('keydown', (e) => {
      kkeys.push(e.keyCode);
      if (/65,65,66,66/.test(kkeys.toString())) { //  (keyboard press AABB)
        this.testing.feedback = true;
      }
      if (/88,88,89,89/.test(kkeys.toString())) { //  (keyboard press XXYY)
        this.testing.navpop = true;
      }
    }, true);
    /* regSites = new RegExp([
      '(forms', 'bookin', 'memo)'
      ].join('|'), 'i');*/
    if (/listes/.test(this.$t('host'))) {
      this.testing.feedback = true;
    }
  },
  data() {
    return {
      // Init nav
      version: '191120', // n° version de la nav
      maestro: this.createMaestro(),
      js: function() {},
      cortexReady: true,// false,
      testing: {
        navpop: process.env.NODE_ENV === 'development',
        feedback: process.env.NODE_ENV === 'development',
      }
    };
  },
  mounted() {
    const html = document.getElementsByTagName('html');
    setInterval(() => {
      const lang = html[0].getAttribute('lang');
      if (lang && this.$i18n.locale !== lang && this.$i18n.locale !== lang.substr(0, 2)) {
        if (this.$i18n.messages.locales.available.includes(lang)) {
          /* lang === (fr|en|…) */
          this.$i18n.locale = lang;
        } else if (this.$i18n.messages.locales.available.includes(lang.substr(0, 2))) {
            /* lang === (fr_FR|en_GB|…) */
            this.$i18n.locale = lang.substr(0, 2);
        } else {
          /* lang === (it|sv|ø|…) */
          this.$i18n.locale = this.$i18n.fallbackLocale;
        }
      }
    }, 1000);

    /*********** Custom JavaScript ***********/
    this.customJS(this.$t('site'));
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
    link(href) { // Depreciated (to remove with lib/jquery)
      const link = document.createElement('a');
      link.href
        = (/:\/\//.test(href))
        ? href
        : `${this.$t('baseurl')}${href.replace(/^\//, '')}`;
      link.href = link.href.replace(/\?$/, `?${this.version}`)
      return [link.protocol, '//', link.host, link.pathname, link.search, link.hash].join('');
    },
    createMaestro() {
      let hash = 4321;
      for (let i = 0; i < this.$t('url').length; i++) {
        hash = hash * 33 ^ this.$t('url').charCodeAt(i);
      }
      const tonality = btoa(String(hash >>> 0)).substring(0, 8)
      const concerto = this.$t('url').split(/[?#]/)[0].substring(this.$t('url').lastIndexOf('/') + 1).replace(/[^a-zA-Z0-9=?]/g, '');
      const currentW = parseInt((window.innerWidth - 60) * (2 / 3), 10);
      const currentH = parseInt(window.innerHeight - 160, 10);
      const talkW = parseInt(currentW / 2, 10);
      const talkH = parseInt(talkW * (9 / 16), 10);
      return [
        'https://framaestro.org/p/#', tonality, '/', concerto, '/',
        '0,20,', currentW, ',', currentH, ',', encodeURIComponent(this.$t('url')), ';',
        '0,', (currentW + 40), ',', talkW, ',', talkH, ',',
        encodeURIComponent(`https://framatalk.org/${tonality}${concerto}`), ';',
      ].join('');
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
        case 'board':
          if (/\.framaboard/.test(this.$t('host'))) { // dans Kanboard
            this.js = function() {
              jQuery('h1 .logo a').html(this.$t('color.board'));
              jQuery('h1 .logo').removeClass('logo');
            };
          }
          break;

        case 'calc':
          // dans Ethercalc
          if (!/accueil\.framacalc\.org/.test(this.$t('host'))) {
            this.js = function() {
              try {
                if (window.top.location.href.indexOf('framacalc.org/=') > -1) {
                  document.getElementById('f-header').style = 'height:42px; opacity:0';
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
            if (this.$t('url') !== 'https://framadrop.org/') {
              jQuery('main .row:last,main hr:last').hide();
            } else {
              document.querySelector('#delete-day option[value="60"]')
                .insertAdjacentHTML('beforeend', ' (max 2Mo)');
              document.querySelector('#delete-day option[value="30"]')
                .insertAdjacentHTML('beforeend', ' (max 50Mo)');
              document.querySelector('#delete-day option[value="7"]')
                .insertAdjacentHTML('beforeend', ' (max 200Mo)');
            }
          };
          break;

        case 'libre':
          this.js = function() {
            if (this.$t('inframe') === 'true') {
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
          if (/source=bookmarklet/.test(this.$t('url'))) {
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
              if (this.$t('inframe') === 'true') {
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
              l’export <a href="${this.$t('url')}/export/html">html</a>
              ou <a href="${this.$t('url')}/export/txt">txt</a>
              de votre document et <a href="${this.$t('link.contact')}/#framapad">contactez-nous</a>.</p>`);
            if (this.$t('inframe') === 'false') {
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
            document.querySelectorAll('img[src*="/packs/media/images/logo"]')
              .forEach(img => Object.assign(img, { src: 'https://framasoft.org/nav/icons/piaf.png' }));
          };
          break;

        // no default
      }
    },
  }
}
</script>
