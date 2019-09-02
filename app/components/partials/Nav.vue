<template>
  <div>
    <Meta />

    <Cortex />

    <NavMenu />

    <!-- Make a donation -->
    <a
      id="framanav_donation"
      :href="`${$root.link.soutenir}/?f=macaron`"
      :style="!macaron ? 'display: none' : ''"
      class="hidden-xs">
      <span class="sr-only" v-html="text($t('fnav.soutenir.name'))"></span>
    </a>

    <Feedback v-if="testing.feedback" />

    <AlertInfo />

    <ModalInfo />
    <ModalDon v-if="cortexReady" />

    <Framabin v-if="/:\/\/framabin.org.p/.test($root.url)" />
    <Framavox v-if="/:\/\/framavox.org/.test($root.url)" />
    <Framateam v-if="/:\/\/framateam.org/.test($root.url)" />

    <Optin v-if="cortexReady" />
    <Footer />
  </div>
</template>

<script>
import Meta from './Meta.vue';
import Cortex from './Cortex.vue';
import NavMenu from './NavMenu.vue';
import Feedback from './Feedback.vue';
import AlertInfo from './AlertInfo.vue';
import ModalInfo from './ModalInfo.vue';
import ModalDon from './ModalDon.vue';

// Need vue-portal
import Optin from './Optin.vue';
import Footer from './Footer.vue';
import Framabin from './sites/Framabin.vue';
import Framavox from './sites/Framavox.vue';
import Framateam from './sites/Framateam.vue';

export default {
  components: {
    Meta, Cortex, NavMenu, Feedback, AlertInfo, ModalInfo, ModalDon,

    Optin, Footer,
    Framabin, Framavox, Framateam,
  },
  created() {
    // Add [data-*] attributes for CSS
    const html = document.getElementsByTagName('html');
    html[0].setAttribute('data-url', this.$root.url);
    html[0].setAttribute('data-inframe', this.$root.inframe);

    /**
     * Depreciated - Need to be cleaned up
     **/
    // Load Bootstrap CSS
    // Todo: build files from SASS
    let regSites = new RegExp([
      '(bookin', 'drop', 'carte', 'frama.link', 'huit.re', 'memo', 'pic', 'stats)'
      ].join('|'), 'i');
    if (regSites.test(this.$root.host)
      || this.$root.host === 'framaboard.org'
      || this.$root.host === 'framanotes.org'
      || this.$root.url === 'https://framaforms.org/'
      || this.$root.url === 'https://frama.site'
      || this.$root.url === 'https://frama.wiki') {
      const bsCSS = document.createElement('link');
      Object.assign(bsCSS, {
        rel: 'stylesheet',
        href: `${this.$root.baseurl}lib/bootstrap/css/bootstrap.min.css`,
      });
      document.getElementsByTagName('head')[0].appendChild(bsCSS);
    }

    // Wrap .carousel with .carousel-container
    if (/(carte|notes)/.test(this.$root.host)
      || this.$root.host === 'framaboard.org'
      || this.$root.url === 'https://framaforms.org/'
      || this.$root.url === 'https://frama.site'
      || this.$root.url === 'https://frama.wiki') {
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
    if (regSites.test(this.$root.host)
      || this.$root.host === 'framanotes.org'
      || this.$root.url === 'https://framaforms.org/') {
      const bsJS = document.createElement('script');
      Object.assign(bsJS, {
        src: `${this.$root.baseurl}lib/bootstrap/js/bootstrap.min.js`,
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
      href: `${this.$root.baseurl}main.css`,
    });
    document.getElementsByTagName('head')[0].appendChild(fcss);

    // Testing features (keyboard press AABB)
    const kkeys = [];
    window.addEventListener('keydown', (e) => {
      kkeys.push(e.keyCode);
      if (/65,65,66,66/.test(kkeys.toString())) {
        this.testing.feedback = true;
      }
    }, true);
  },
  data() {
    return {
      // Init nav
      version: '190319', // n° version de la nav
      maestro: this.createMaestro(),
      js: function() {},
      macaron: false,
      cortexReady: false,
      testing: {
        feedback: false,
      }
    };
  },
  mounted() {
    const html = document.getElementsByTagName('html');
    setInterval(() => {
      if (html[0].getAttribute('lang') && this.$i18n.locale !== html[0].getAttribute('lang')) {
        this.$i18n.locale = html[0].getAttribute('lang');
      }
    }, 1000);
    setTimeout(() => { this.macaron = true; }, 1500);

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
    link(href) { // Depreciated (to remove with lib/jquery)
      const link = document.createElement('a');
      link.href
        = (/:\/\//.test(href))
        ? href
        : `${this.$root.baseurl}${href.replace(/^\//, '')}`;
      link.href = link.href.replace(/\?$/, `?${this.version}`)
      return [link.protocol, '//', link.host, link.pathname, link.search, link.hash].join('');
    },
    createMaestro() {
      let hash = 4321;
      for (let i = 0; i < this.$root.url.length; i++) {
        hash = hash * 33 ^ this.$root.url.charCodeAt(i);
      }
      const tonality = btoa(String(hash >>> 0)).substring(0, 8)
      const concerto = this.$root.url.split(/[?#]/)[0].substring(this.$root.url.lastIndexOf('/') + 1).replace(/[^a-zA-Z0-9=?]/g, '');
      const currentW = parseInt((window.innerWidth - 60) * (2 / 3), 10);
      const currentH = parseInt(window.innerHeight - 160, 10);
      const talkW = parseInt(currentW / 2, 10);
      const talkH = parseInt(talkW * (9 / 16), 10);
      return [
        'https://framaestro.org/p/#', tonality, '/', concerto, '/',
        '0,20,', currentW, ',', currentH, ',', encodeURIComponent(this.$root.url), ';',
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
