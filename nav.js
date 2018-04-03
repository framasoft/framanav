/** ************* *
 *  Conventions
 ** ************* *
 f$() = alias jQuery

 j$ = jQuery
 b$ = Bootstrap

 n${} = variables et fonctions globales de la nav
 n{}  = fonctions de la nav (exportées également dans n$)
 d${} = données (texte, liens, icônes, couleurs, etc)
 c${} = config du site
 l${} = config locale des sites
 */

let f$ = function f$() {
  // alias jQuery défini plus bas
};

const d$ = {};
let c$ = {};

const n$ = {
  version: '180403', // n° version de la nav
  f$: '3.3.1', // n° version de notre jQuery
  b$: '3.3.7', // n° version de Bootsrap
  host: window.location.host,
  url: window.location.href,
  baseurl: '',
  inframe: window.top.location !== window.self.document.location,
  container: [
    '<div id="framanav_container" class="hidden-print" style="height:42px; opacity : 0"></div>',
    '<iframe id="framanav_cortex" src="https://framasoft.org/nav/html/cortex.html" ',
    'style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"></iframe>',
  ].join(''),
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

(function framanav() {
  const n = {

    /** Nav init **************************************************** */
    init() {
      if (n.is.url(/test\/home\.html$/, 'u')) { n$.host = 'framapic.org'; }
      n$.site = n$.host.replace(/^(www|test)\./i, '').replace(/\.(com|net|org|fr|pro)$/i, ''); // Domaine et sous-domaine
      n$.name = n$.site[0].toUpperCase() + n$.site.slice(1).replace('.framasoft', ''); // Nom du service
      n$.lname = n$.name.toLowerCase();
      n$.site = n$.site.replace(/framand/i, 'and')
        .replace(/framage/i, 'age')
        .replace(/framae/i, 'mae')
        .replace(/(\.framasoft|frama\.)/i, '')
        .replace(/framin/i, 'min')
        .replace(/frame/i, 'me')
        .replace(/frama/i, '');

      if (n$.inframe) { n$.container = '<div id="framanav_container" style="display:none"></div>'; }
      if (n.is.url(/nav\/html\/cortex\.html$/, 'u')) { n$.site = 'cortex'; }
      if (n.is.url(/nav\/test\//, 'u')) { n$.site = 'code'; }

      // Détection de la version de jQuery
      if (window.jQuery === undefined) {
        n$.j$ = 'ø'; // n° version du jQuery local
      } else {
        n$.j$ = window.jQuery.fn.jquery;
        f$ = jQuery; // alias (peut-être écrasé plus bas)
      }

      // Création du lien Framaestro avec page courante + visio Framatalk
      n.maestro();

      // Ajout <html data-url="" data-inframe=""> pour site.scss
      document.getElementsByTagName('html')[0].setAttribute('data-url', window.location.href);
      document.getElementsByTagName('html')[0].setAttribute('data-inframe', n$.inframe);

      // Détection URL de la nav → 'http://'+n$.site+'/nav'
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i += 1) {
        if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('/nav.js') > -1) {
          n$.baseurl = this.l(scripts[i].getAttribute('src').replace('nav.js', ''));
          // On ajout une div vide de 42px qui contiendra la nav
          // (évite les sauts de mise en page avant le chargement des fichiers)
          if (scripts[i].parentNode.tagName.toLowerCase() === 'body') {
            // si nav.js est appelé en haut du body, c'est super rapide
            document.write(n$.container);
            n$.container = '☀';
          } // sinon c'est dans le head, il faut attendre document.ready (voir plus bas)
        }
      }

      n.loadJS(n.l('config.js', 'n', 'v'), n.config);
    },

    /** Config globale ********************************************** */
    config() {
      /* global l$ */
      n.mergeObj(c$, l$); // import de la config l$ dans c$

      if (l$) {
        n$.log.push(`✔ ${n$.container.replace(/<.*/, '☁')} config.js ${n$.version} | ${n$.f$} | ${n$.j$} → ${n.jquery()} ?`);

        if (n.is.url('/nav/html/')) { // si pages « À propos » on réinit la config
          c$.js.b$ = true;
          c$.css.b$ = false;
          c$.icons.apple = 'soft.png';
        }

        n.loadCSS(c$.css);

        /** c$.js.j$ = n.jquery() mais on garde l$.js.j$
         * en fallback pour les cas très particuliers */
        switch (c$.js.j$) {
          case 'AJAX':
            if (n.jquery() === 'AJAX') {
              n.loadJS(n.l(`lib/jquery/jquery-${n$.f$}.min.js`, 'n'), n.fQuery);
              n$.log.push(`✔ jQuery ${n$.j$} AJAX`);
            } else {
              n.fQuery();
              n$.log.push(`✔ jQuery ${n$.j$} HTML`);
            }
            break;
          case 'noConflict':
            n$.log.push(`✔ jQuery.noConflict ${n$.j$} AJAX`);
            n.loadJS(n.l(`lib/jquery/jquery-${n$.f$}.min.js`, 'n'), n.fQuery);
            break;
          default:
            if (window.jQuery === undefined) {
              n$.log.push('✘ jQuery');
            } else {
              n$.log.push(`✔ jQuery ${n$.j$} HTML`);
              n.fQuery();
            }
            break;
        }
      } else {
        n$.log.push(`✘ ${n$.container.replace(/<.*/, '☁')} config.js ${n$.version}`);
      }
    },

    /** jQuery is ready ********************************************* */
    fQuery() {
      switch (c$.js.j$) {
        case 'noConflict': f$ = jQuery.noConflict(); break;
        default: f$ = jQuery; break;
      }

      f$(document).ready(() => {
        f$.ajaxSetup({ cache: true });

        if (n$.container !== '☀') { f$('body').prepend(n$.container); }

        if (n.is.url(/nav\/html\/cortex\.html$/, 'u')) {
          n.cortex();
        } else {
          n.minus();
        }

        // On charge ensuite les données
        let f$I18n = {};
        let f$Fr = {};
        let dataI18n = function dataI18n() {};
        let dataFr = function dataFr() {};
        if (n.is.lang('en') || !n.is.lang('fr', 'b')) {
          dataI18n = f$.getJSON(n.l('html/data.en.json', 'n'))
            .fail(() => { n$.log.push('✘ data.en.json'); })
            .done((data) => { f$I18n = data; });
        }
        dataFr = f$.getJSON(n.l('html/data.fr.json', 'n'))
          .fail(() => { n$.log.push('✘ data.fr.json'); })
          .done((data) => { f$Fr = data; });

        f$.when(dataI18n, dataFr) // eslint-disable-line promise/catch-or-return
          .then(() => {
            n.mergeObj(d$, f$Fr); // import default locale 'fr' dans d$
            n.mergeObj(d$, f$I18n); // import locale dans d$

            if (n$.inframe) { f$('#framanav_container').hide(); }

            Object.keys(d$.menu).forEach((k) => {
              d$.menu[k].list = [];
            });
            d$.menu.about.site = '';

            // Class couleurs + Dropdown menu
            Object.keys(d$.f).forEach((k) => {
              switch (d$.f[k].c) {
                case 'b': d$.menu.soft.list.push(k); break;
                case 'r': d$.menu.culture.list.push(k); break;
                case 'v': d$.menu.services.list.push(k); break;
                case 'j': d$.menu.vrac.list.push(k); break;
                case 'f': d$.menu.follow.list.push(k); break;
                default: // case: 'o':
                  if (k !== 'dio') {
                    d$.menu.about.list.push(k);
                  } else {
                    d$.menu.services.list.push(k);
                  }
                  break;
              }

              // "À propos" du site
              if (n$.name === n.text(n.html.frama(k))) {
                const f$Soft = n.wrap(d$.f[k].soft, ' (', ')') || '';
                d$.menu.about.site = [d$.menu.about.site, '<li class="dropdown-header">', n.html.frama(k), f$Soft, '</li>', n.html.divider()].join('');
                if (d$.f[k].doc !== undefined) {
                  d$.f.doc.l = d$.f[k].doc;
                }
                if (d$.f[k].git !== undefined) {
                  d$.menu.about.site = [d$.menu.about.site, '<li class="fs_about fs_git"><a href="', d$.f[k].git, '">', n.html.i(d$.f.git.i), '&nbsp;', d$.f.git.p, d$.f.git.s, '</a></li>'].join('');
                }
                if (d$.f[k].src !== undefined) {
                  d$.menu.about.site = [d$.menu.about.site, '<li class="fs_about fs_src"><a href="', d$.f[k].src, '">', n.html.i('fa-code-fork'), '&nbsp;', d$.t.source, f$Soft, '</a></li>'].join('');
                }
                d$.f.faq.l = `${d$.f.faq.l}#${n$.lname}`;
                d$.f.aide.l = d$.f.aide.l.replace(/aide$/, n$.lname);
              }
            });

            /** On balance le code html */
            f$('#framanav_container').prepend(n.html.navbar());
            // Placement des popovers à gauche
            f$('#fs_services li:odd a, #fs_about li:even a').attr('data-placement', 'left');
            // Réagencement À propos
            f$('#fs_about li').has('a[href*="status."]').after(d$.menu.about.site);
            f$('#fs_about .fs_git').before(f$('#fs_about .fs_aide, #fs_about .fs_faq, #fs_about .fs_doc'));

            f$('#fs_about ul').prepend(`<li class="dropdown-header">${n.html.frama('soft')}</li>${n.html.divider()}`);
            f$('#fs_about .fs_dio2').before(`<li class="dropdown-header"><b>${d$.t.campaign}<b></li>${n.html.divider()}`);

            f$('#fs_services .fs_dio, #fs_about .fs_dio2, #fs_about .fs_cuo').addClass('dropdown-header');
            f$('#fs_services .fs_dio a').wrapInner('<b>');
            f$('#fs_about .fs_dio2 a, #fs_about .fs_cuo a').addClass('text-left');

            // Ajout des dividers
            f$([
              '.fs_start', '.fs_zic', ' .fs_evl', ' .fs_evl2', ' .fs_dio',
              '.fs_maestro', ' .fs_carte', ' .fs_minetest', ' .fs_news',
              ' .fs_services.fs_git', '.fs_wiki', ' .fs_petitions',
              ' .fs_gplus', ' .fs_wikipedia', ' .fs_status', ' .fs_credits',
            ].join()).after(n.html.divider());

            // Ajout des boutons mobile/desktop
            f$('#fs_about .dropdown-menu').append([
              n.html.divider(),
              '<li class="framanav-mobile"><a href="javascript:void(0);">',
              n.html.i('fa-mobile'), '&nbsp;', d$.t.mobile,
              '</a></li>',
              '<li class="framanav-desktop"><a href="javascript:void(0);">',
              n.html.i('fa-desktop'), '&nbsp;', d$.t.desktop,
              '</a></li>',
            ].join(''));
            n.viewport();

            f$('#framanav_container').css('opacity', '1');

            n.benevalo();
            n.myframa();
            n.footer();

            /** Import de bootstrap.js ****************************** */
            if (c$.js.b$) {
              if (typeof f$().modal === 'function' || c$.js.b$ === 'html') {
                n$.log.push('✔ Bootstrap HTML');
                n.bootstrap();
              } else {
                f$.getScript(n.l('lib/bootstrap/js/bootstrap.min.js', 'n'), () => {
                  n$.log.push('✔ Bootstrap AJAX');
                  n.bootstrap();
                });
              }
            } else {
              n$.log.push('✘ Bootstrap');
            }

            /** À traiter en dernier ******************************** */
            n.audioJS();
            n.videoJS();
            n.ytBlock();

            // Flux RSS Global
            f$('head').append(n.html.link('rss', d$.f.rss.l, d$.f.rss.d1));

            // Favicon et Apple touch icon
            if (!c$.icons.keep) {
              f$('link[rel*=icon]').remove();
              c$.icons.fav = c$.icons.fav || 'favicon-violet.png';
              c$.icons.apple = c$.icons.apple || 'apple-violet.png';
              f$('head').append(n.html.link('fav', n.l(`img/icons/${c$.icons.fav}`, 'n')));
              f$('head').append(n.html.link('apple', n.l(`img/icons/${c$.icons.apple}`, 'n')));
            }

            n.storageReady(() => { n.optin(); });
            n.macaron();

            // Liens À propos
            f$('#framafooter a[href*="/nav/html/"], #fs_about a').attr('href', function addHash() {
              return f$(this).attr('href')
                .replace('credits.html', `credits.html#${c$.credits}`)
                .replace('legals.html', `legals.html#${c$.host}`);
            });

            // Crédits
            if (n.is.url('/html/credits.html') && window.location.hash) {
              f$('#site-credits').load(n.l(window.location.hash.replace('#', 'html/credits/').replace(/$/, '.html'), 'n'));
            }

            // Hébergeur et Iframe Piwik sur Mentions légales
            if (n.is.url('/html/legals.html')) {
              if (window.location.hash) {
                f$('#modal-legals-host').load(n.l(window.location.hash.replace('#', 'html/host/').replace(/$/, '.html'), 'n'));
              }
              f$('#piwik-iframe').html(`<iframe style="border: 0; height: 200px; width: 600px;" src="${c$.piwik.url}index.php?module=CoreAdminHome&action=optOut&language=fr"></iframe>`);
            }

            // Ext.js
            if (typeof c$.js.ext === 'function') {
              c$.js.ext();
            } else if (c$.js.ext === true) {
              f$.getScript(n.l(`ext/${n$.site}.js`, 'n'));
            } else if (typeof c$.js.ext === 'string') {
              f$.getScript(n.l(`ext/${c$.js.ext}.js`, 'n'));
            }
          })
          .fail((err) => { n$.log.push('✘ data.*.json', err); });
      }); // </document.ready>
    },

    /** Bootstrap required ****************************************** */
    bootstrap() {
      // Redéfini f$ pour Bootstrap en mode noConflict si nécessaire
      switch (c$.js.j$) {
        case 'noConflict': f$ = jQuery.noConflict(); break;
        default: f$ = jQuery; break;
      }

      /**
       *  Accessibilité
       *  code issu de https://github.com/paypal/bootstrap-accessibility-plugin
       */
      // Modal
      if (typeof f$().modal === 'function') {
        const modalhide = f$.fn.modal.Constructor.prototype.hide;
        f$.fn.modal.Constructor.prototype.hide = function fixModalA11y() {
          const modalOpener = this.$element.parent().find(['[data-target="#', this.$element.attr('id'), '"]'].join(''));
          modalhide.apply(this, arguments); // eslint-disable-line prefer-rest-params
          modalOpener.focus();
        };
      }
      /** Fin accessibilité */

      if (!n$.inframe) { // Pas de bandeau, nav, modale et macaron en mode iframe
        // Liens de la nav à ouvrir dans un onglet
        if (!n.is.url('/nav/html/')) {
          f$('#framanav .dropdown-menu a').attr('target', '_blank').append(n.html.newWindow());
        }

        /** ... on ajoute surtout les scripts qui font appel à BootStrap et jQuery ici */

        // Activation des popovers
        if (typeof f$().popover === 'function') {
          f$('a[rel="popover"]').each(function enablePopover() {
            f$(this).popover({
              html: true,
              trigger: 'focus hover',
            });
            f$(this).removeAttr('title');
          });
        }

        n.bsModalInfo();
        n.bsAlert();
        n.storageReady(() => n.bsModalSoutenir());
        n.bsModalFAQ();
      } // </!n$.inframe>
    },

    /** Fonctions génériques **************************************** */
    l(href, nav, version) {
      // Lien absolu depuis l’emplacement de la nav
      if (nav === 'n' && n$.baseurl !== '') {
        if (version === 'v') {
          return `${n$.baseurl}${href}?${n$.version}`;
        }
        return `${n$.baseurl}${href}`;
      }
      // Lien relatif converti en url absolue (le navigateur fait lui-même le boulot)
      const link = document.createElement('a');
      link.href = href;
      return [link.protocol, '//', link.host, link.pathname, link.search, link.hash].join('');
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
          if (!done && (!this.readyState ||
            this.readyState === 'loaded' || this.readyState === 'complete')) {
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

    loadCSS(css) {
      function AddLink(stylesheet, position) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';

        switch (stylesheet) {
          case '0': // Bootstrap
            link.media = (css.b$) ? 'all' : 'none';
            link.href = n.l('lib/bootstrap/css/bootstrap.min.css', 'n');
            break;
          case '2': // Font-Awesome
            link.media = 'all';
            link.href = n.l('lib/fork-awesome/css/fork-awesome.min.css', 'n');
            break;
          case '3': // Nav
            link.media = 'screen';
            link.href = n.l('css/nav.css', 'n', 'v');
            break;
          case '4': // Frama
            link.media = (css.frama) ? 'all' : 'none';
            link.href = n.l('css/frama.css', 'n', 'v');
            break;
          default:
            // no default
            break;
        }

        if (link.media !== 'none' && stylesheet !== '1') {
          // Ajout au début du <head>
          if (position !== undefined) {
            document.getElementsByTagName('head')[0].insertBefore(
              link,
              document.getElementsByTagName('head')[0].firstChild,
            );
          // Ajout à la fin <head>
          } else {
            document.getElementsByTagName('head')[0].appendChild(link);
          }
        }
      }

      /** Parcours décroissant à partir de la position du '1' (= css du site)
       *  exemple 02-1-34 → on commence par le 2 puis le 0 */
      for (let i = css.order.indexOf('1'); i >= 0; i -= 1) {
        AddLink(css.order[i], 'first');
      }
      /** Parcours croissant pour le reste
       * exemple 02-1-34 → dans l'ordre 3 et 4 */
      for (let i = css.order.indexOf('1'); i < css.order.length; i += 1) {
        AddLink(css.order[i]);
      }
    },

    mergeObj(a, b) {
      function MergeRecursive(o1, o2) {
        const o3 = o1;
        Object.keys(o2).forEach((p) => {
          try {
            if (o2[p].constructor === Object) {
              o3[p] = MergeRecursive(o3[p], o2[p]);
            } else if (o2[p].constructor === Array) {
              for (let i = 0; i < o2[p].length; i += 1) {
                o3[p][i] = o2[p][i];
              }
            } else {
              o3[p] = o2[p];
            }
          } catch (e) {
            o3[p] = o2[p];
          }
        });
        return o3;
      }

      MergeRecursive(a, b);
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

    cortex(action, msg) {
      const m = msg;
      switch (action) {
        case 'o': // output to Minus
          try {
            window.parent.postMessage(localStorage.framanav, '*');
          } catch (e) {
            window.parent.postMessage(JSON.stringify(n.storageInit()), '*');
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
              n.cortex('i', n.storageInit());
            }
          } catch (e) {
            // Pas accès au localStorage
          }
          n.cortex('o');

          window.onmessage = function listenMinus(event) {
            /* if(event.origin !== 'frama.web') {
              return;
            } */
            const payload = JSON.parse(event.data);
            if (payload.framanav !== n.storageInit() &&
              Object.keys(payload.framanav).length) {
              n.mergeObj(n$.storage, payload.framanav);
              n.cortex('i', n$.storage);
            }
            n.cortex('o');
          };
          break;
      }
    },

    minus(action, msg) {
      const m = msg; const c = document.getElementById('framanav_cortex');
      if (c) {
        switch (action) {
          case 'i': { // input in n$.storage
            n$.storage = JSON.parse(m);
            break;
          }
          case 'o': { // output to Cortex
            c.contentWindow.postMessage(JSON.stringify({ framanav: m }), '*');
            break;
          }
          default: { // init
            n.minus('o', n$.storage);

            const eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
            const eventer = window[eventMethod];
            const messageEvent = (eventMethod === 'attachEvent') ? 'onmessage' : 'message';
            eventer(messageEvent, e => n.minus('i', e.data), false);
            break;
          }
        }
      }
    },

    storageInit() {
      return { modal: { don: [false, 604800000] }, optin: [false, 604800000] };
    },

    storageReady(callback) {
      if (document.getElementById('framanav_cortex')) {
        if (Object.keys(n$.storage).length > 0) {
          callback();
        } else {
          window.setTimeout(n.storageReady.bind(null, callback), 100);
        }
      }
    },

    wrap(text, prefix, sufix) {
      const t = text || ''; const p = prefix || ''; const s = sufix || '';
      return t.replace(/^/, p).replace(/$/, s);
    },

    text(html) {
      const div = document.createElement('div');
      div.innerHTML = html;
      const text = div.textContent || div.innerText || '';
      return text;
    },

    // Version de jQuery à utiliser
    /**
      si undefined              → AJAX
      si 1.9.0 < jquery < 3.0.0 → HTML
      sinon                     → noConflict
      /!\ si $ déjà défini (prototype, mootools, etc)
      */
    jquery() {
      if (window.jQuery !== undefined) {
        const version = window.jQuery.fn.jquery.split(' ')[0].split('.');
        if ((version[0] < 2 && version[1] < 9) || // < 1.9
            (version[0] === 1 && version[1] === 9 && version[2] < 1) || // 1.9.0
            (version[0] > 2)) { // 3.x
          return 'noConflict';
        }
        return 'HTML';
      }
      return 'AJAX';
    },

    bsPlugins(jQuery) { // WIP Detecter la présence de Bootstrap
      const plugins = ['modal', 'dropdown', 'alert', 'tooltip', 'popover', 'carousel', 'tab'];
      const score = [];
      for (let i = 0; i < plugins.length; i += 1) {
        score.push(+(typeof jQuery()[plugins[i]] === 'function'));
      }
      return score.join('');
    },

    bsAlert() {
      const dejavu = n.cookie('r', 'nav-alert');
      if (c$.alert[1] !== '' && !dejavu) {
        f$('#framanav_container').after(n.html.alert(
          c$.alert[0], 'nav-alert',
          `<div><p class="text-center">${c$.alert[1]}</p></div>`,
          true,
        ));

        // Cookie enregistré en fermant (7 jours par défaut cf config.js)
        f$('#nav-alert').bind('closed.bs.alert', () => {
          n.cookie('w', c$.alert[2], true, c$.alert[3]);
        });
      }
    },

    bsModalInfo() {
      const dejavu = n.cookie('r', c$.modal.info[2]);
      if (c$.modal.info[0] !== '') {
        f$('body').append(n.html.modal(
          'finfo', // id
          c$.modal.info[0], // title
          c$.modal.info[1], // body
          [ // footer
            '<button class="btn" id="modal-close" data-dismiss="modal">',
            d$.t.close,
            '</button>',
            '<button class="btn btn-primary" id="modal-set-cookie" >',
            d$.t.nevershow,
            '</button>',
          ].join(''),
        ));

        if (!dejavu) {
          f$('#modal-finfo').modal('show');
          f$('#modal-set-cookie').click(() => {
            // cookie de 7 jours par défaut
            n.cookie('w', c$.modal.info[2], true, c$.modal.info[3]);
            f$('#modal-finfo').modal('hide');
          });
          f$('#modal-finfo .close, #modal-close').click(() => {
            // cookie de session
            n.cookie('w', c$.modal.info[2], true);
            f$('#modal-finfo').modal('hide');
          });
        }
      }
    },

    bsModalFAQ() {
      if (d$.f.faq.l.indexOf(n$.lname) > -1) {
        f$('body').append(n.html.modal(
          'fsFAQ', // id
          [d$.f.faq.s, n$.name].join(' '), // title (/!\ space)
          '', // body (ajax load bellow)
          [ // footer
            '<span class="pull-left">', d$.t['another-question'],
            ' <a href="', d$.f.contact.l, '">', d$.t['contact-us'], '</a>',
            '</span> ',
            '<button class="btn" id="modal-close" data-dismiss="modal">', d$.t.close, '</button>',
          ].join(''),
          'lg', // size
        ));
        f$('.fs_faq a').on('click', () => {
          if (f$('#modal-fsFAQ .modal-body').html() === '') {
            f$('#modal-fsFAQ .modal-body').load(
              ['https://contact.framasoft.org/foire-aux-questions/ #', n$.lname, ' .list-group-item'].join(''),
              (data) => {
                if (f$(data).find(n$.lname.replace(/^/, '#')).length < 1) {
                  window.location.href = f$('.fs_faq a').attr('href');
                } else {
                  f$('#modal-fsFAQ').modal('show');
                }
              },
            );
          } else {
            f$('#modal-fsFAQ').modal('show');
          }
          return false;
        });
      }
    },

    bsModalSoutenir() {
      if (c$.modal.don[0] !== '') {
        f$('body').append(n.html.modal(
          'soutenir', d$.meta.modaldon.t,
          d$.meta.modaldon.d.join('').replace('%c$.modal.don[1]%', c$.modal.don[1]),
          [ // footer
            '<div class="clearfix"><p class="col-md-12 text-center">',
            '  <a target="_blank" id="modal-don" href="', d$.meta.soutenir.l, '/?f=modal&s=', n$.site, '" class="btn btn-soutenir btn-block">',
            n.html.i(d$.meta.soutenir.i), ' ', d$.meta.modaldon.b1, n.html.newWindow(),
            '  </a></p>',
            '<p class="col-md-6 text-center">',
            '  <a id="modal-dl" href="javascript:void(0);" class="btn btn-xs btn-default btn-block" >',
            d$.meta.modaldon.b3.replace('%c$.modal.don[2]%', c$.modal.don[2]),
            '  </a>',
            '</p>',
            '<p class="col-md-6 text-center">',
            '  <a id="modal-dl2" href="javascript:void(0);" class="btn btn-xs btn-default btn-block" style="line-height: 36px;">',
            d$.meta.modaldon.b4,
            '  </a>',
            '</p></div>',
          ].join(''),
        ));

        // Les modales « onstart » sont déclenchées par un clic sur un lien temporaire
        c$.modal.don[0] = c$.modal.don[0].replace('onstart', 'a[href="#SoutenirFramasoft"]');
        f$('body').append('<a href="#SoutenirFramasoft" class="sr-only"></a>');

        // Les autres des liens présents dans la pageq
        f$(c$.modal.don[0]).each(function eventModal() {
          f$(this).click(() => {
            if (n$.storage.modal.don[0]) {
              n.cookie('w', 'dondl', true, n$.storage.modal.don[1]);
            }
            const dejavu = n.cookie('r', 'dondl');
            if (!dejavu) {
              const link = n.l(f$(this).attr('href')).replace(/#SoutenirFramasoft$/, '#');
              f$('a[href="#SoutenirFramasoft"]').remove();
              f$('#modal-soutenir').modal('show');
              f$('#modal-soutenir').css('display', 'block'); // bugfix
              f$('#modal-contact, #modal-don, #modal-dl, #modal-soutenir .close').click(() => {
                n.cookie('w', 'dondl', true, c$.modal.don[3]);
                n$.storage.modal.don = [true, c$.modal.don[3]];
                n.minus('o', n$.storage);
                f$('#modal-soutenir').modal('hide');
                window.location.href = link;
              });
              f$('#modal-dl2').click(() => {
                n.cookie('w', 'dondl', true, 31536000000); // 365 * 24 * 60 * 60 * 1000
                n$.storage.modal.don = [true, 31536000000];
                n.minus('o', n$.storage);
                f$('#modal-soutenir').modal('hide');
                window.location.href = link;
              });
              return false;
            }
            return true;
          });
        });
        if (c$.modal.don[0] === 'a[href="#SoutenirFramasoft"]') {
          f$(c$.modal.don[0]).trigger('click');
        }
      }
    },

    viewport(type) {
      const vp = f$('meta[name="viewport"]');
      const btnDesktop = f$('.framanav-desktop');
      const btnMobile = f$('.framanav-mobile');

      switch (type) {
        case 'mobile': // switch sur le viewport mobile
          if (vp.length === 0) {
            f$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
          } else {
            vp.attr('content', 'width=device-width, initial-scale=1.0');
          }
          btnDesktop.addClass('visible-xs-inline').show();
          btnMobile.hide();
          break;
        case 'desktop': // switch sur le viewport desktop
          if (vp.length) {
            vp.attr('content', 'width=1024');
          }
          btnDesktop.removeClass('visible-xs-inline').hide();
          btnMobile.show();
          break;
        default: // init du viewport
          if (c$.mobile) { // viewport mobile par défaut dans la config
            n.viewport('mobile');
          } else if (f$('meta[name="viewport"]').length === 0) {
            n.viewport('desktop');
          }
          // Si (Dés)Activation mannuel, le cookie prend la main le temps de la session
          switch (n.cookie('r', 'nav_viewport')) {
            case 'mobile': n.viewport('mobile'); break;
            case 'desktop': n.viewport('desktop'); break;
            default:
              // no default
              break;
          }
          // Boutons (Dés)Activer le mode mobile
          btnMobile.on('click', () => {
            n.viewport('mobile');
            document.cookie = 'nav_viewport=mobile;expire=0';
            return false;
          });
          btnDesktop.on('click', () => {
            n.viewport('desktop');
            document.cookie = 'nav_viewport=desktop;expire=0';
            return false;
          });
          break;
      }
    },

    /** Framatrucs ************************************************** */
    benevalo() {
      // Le bouton soutenir remplacé par un bouton bénévalo
      // pendant 3 jours autour de la pleine lune
      const today = Math.floor(new Date().getTime() / 1000);
      const fullMoon = 1453603580; // 24/01/2016 02:46:20
      const moonRev = 2551443; // 29j 12h 44m 3s

      if ((today - fullMoon) % moonRev < 129600 ||
        (today - fullMoon) % moonRev > moonRev - 129600) {
        f$('#btn-benevalo').show();
        f$('#btn-benevalo').prev().hide();
      }
    },

    footer() {
      f$('body').append(n.html.footer());

      if (f$('body').height() < f$(window).height()) {
        f$('#framafooter').css('position', 'absolute');
      } else {
        f$('#framafooter').css('position', 'relative');
      }

      f$(window).on('resize, scroll, click', () => {
        f$('#framafooter').css('position', 'relative');
        if (f$('body').height() < f$(window).height()) {
          f$('#framafooter').css('position', 'absolute');
        } else {
          f$('#framafooter').css('position', 'relative');
        }
        setTimeout(() => { // au cas où une animation redimentionne le body
          if (f$('body').height() < f$(window).height()) {
            f$('#framafooter').css('position', 'absolute');
          } else {
            f$('#framafooter').css('position', 'relative');
          }
        }, 800);
      });
    },

    macaron() {
      f$('#framanav_donation')
        .show()
        .delay((Math.random() * 28000) + 1000)
        .fadeOut(600)
        .fadeIn(600);
    },

    maestro() {
      if (!n$.inframe) {
        md5 = function () {for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c){var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16){b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}(); // eslint-disable-line
        const tonality = md5(n$.url).substring(0, 8); // eslint-disable-line
        const concerto = n$.url.split(/[?#]/)[0].substring(n$.url.lastIndexOf('/') + 1).replace(/[^a-zA-Z0-9=?]/g, '');
        const currentW = parseInt((window.innerWidth - 60) * (2 / 3), 10);
        const currentH = parseInt(window.innerHeight - 160, 10);
        const talkW = parseInt(currentW / 2, 10);
        const talkH = parseInt(talkW * (9 / 16), 10);
        n$.maestro = [
          'https://framaestro.org/p/#', tonality, '/', concerto, '/',
          '0,20,', currentW, ',', currentH, ',', encodeURIComponent(n$.url), ';',
          '0,', (currentW + 40), ',', talkW, ',', talkH, ',',
          encodeURIComponent('https://framatalk.org/', tonality, concerto), ';',
        ].join('');
      }
    },

    myframa() {
      if (!n$.inframe) {
        const bookmarkURL = window.location.href;
        const bookmarkTitle = document.title || bookmarkURL;
        const myFrama = [
          'https://my.framasoft.org/?post=', encodeURIComponent(bookmarkURL),
          '&title=', encodeURIComponent(bookmarkTitle),
          '&description=', encodeURIComponent(document.getSelection()),
          '&source=bookmarklet',
        ].join('');

        f$('#btn-myframa').on('click', () => {
          window.open(
            myFrama, 'myframa',
            'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1',
          );
          return false;
        });
        f$('#btn-myframa a').attr('href', myFrama);
      }
    },

    optin() {
      if (n$.storage.optin[0]) {
        n.cookie('w', c$.optin[2], true, n$.storage.optin[2]);
      }
      const dejavu = n.cookie('r', 'opt-in');
      if (c$.optin[0] !== '' && !dejavu) {
        f$(c$.optin[0])
          .after(n.html.alert(
            'info',
            'fs_opt-in',
            [
              '<input type="checkbox" id="fs_opt-in_checkbox" value="false" />',
              '<label for="fs_opt-in_checkbox">', d$.meta.optin.t, '</label><br>',
              '<small>', d$.meta.optin.d1,
              '&nbsp;<a href="', d$.f.newsletter.l, '" id="link-opt-in" target="_blank" >', d$.meta.optin.d2, n.html.newWindow(), '</a>',
              '</small>',
            ].join(''),
          ));

        f$(c$.optin[0]).focusin(() => {
          f$('#fs_opt-in_error').remove();
          // Ajout du cookie (expire au bout d'un an)
          n.cookie('w', c$.optin[2], true, c$.optin[3]);
          n$.storage.optin = [true, c$.optin[3]];
          n.minus('o', n$.storage);
        });

        // Requête ajax crossdomain lorsque la case est cochée
        f$('#fs_opt-in input, #fs_opt-in label').on('click', () => {
          f$('#fs_opt-in_error').remove();
          const f$Email = f$(c$.optin[0]).val();
          if (c$.optin[1] !== '' && f$(c$.optin[0]).val() !== f$(c$.optin[1]).val()) { // Cas où il y a un champs pour confirmer email
            f$(c$.optin[0]).after(n.html.alert(
              'danger',
              'fs_opt-in_error',
              d$.meta.optin.e2,
            ));
            return false;
          } else if (!n.is.email(f$(c$.optin[0]).val())) {
            f$(c$.optin[0]).after(n.html.alert(
              'danger',
              'fs_opt-in_error',
              d$.meta.optin.e2.replace('%f$Email%', f$Email),
            ));
            return false;
          }

          f$('#fs_opt-in input').attr('checked', true);
          f$.ajax({
            type: 'POST',
            url: 'https://contact.framasoft.org/php_list/lists/?p=subscribe&id=2', // URL d'abonnement à la liste
            crossDomain: true,
            data: ['makeconfirmed=1&htmlemail=1&list%5B5%5D=signup&listname%5B5%5D=Newsletter&email=', f$Email.replace('@', '%40'), '&VerificationCodeX=&subscribe=Abonnement'].join(''), // Paramètres habituellement passés dans le formulaire
          });
          // On supprime la case à cocher (pas possible de décocher ;
          // l'annulation se fait depuis le mail reçu)
          f$('#fs_opt-in').remove();
          // Message d'alert pour confirmer l'inscription
          f$(c$.optin[0]).after(n.html.alert(
            'success', 'fs_opt-in_confirm',
            d$.meta.optin.s1.replace('%f$Email%', f$Email),
            true,
          ));
          return true;
        });
      }
    },

    /** Fonctions medias ******************************************** */
    audioJS() {
      if (c$.js.audio) {
        f$('audio').each(function replaceByVideo() {
          f$(this).wrap('<div class="audio" />');
          const outer = this.outerHTML;
          let regex = new RegExp(this.tagName.replace(/^/, '<'), 'i');
          let newTag = outer.replace(regex, '<video');
          regex = new RegExp(this.tagName.replace(/^/, '</'), 'i');
          newTag = newTag.replace(regex, '</video');
          f$(this).replaceWith(newTag);
        });
      }
    },

    videoJS() {
      if (c$.js.video) {
        f$('link[href*="/nav/css/nav.css"]')
          .before(n.html.link('css', n.l('lib/video-js/video-js.css', 'n'), 'all'));

        f$('video').each(function initVideoJS(index) {
          // Format webm d’abord
          if (f$(this).has('source[type*="webm"]').length && (n$.browser.firefox || n$.browser.opera || n$.browser.chrome)) {
            f$(this).children('source[type*="mp4"]').remove();
          }
          // Paramètres à ajouter à la vidéo pour appliquer VideoJS en surcouche
          // + numérotation des vidéos (pour pouvoir utiliser l'API : videojs('id').ready() )
          f$(this).attr({
            class: 'video-js vjs-default-skin',
            'data-setup': '{}',
            id: `f_video_${index}`,
          });
        });

        f$.getScript(n.l('lib/video-js/video.js', 'n'), () => {
          n$.log.push('✔ video.js');
          /* global videojs */
          videojs.options.flash.swf = n.l('lib/video-js/video-js.swf', 'n');
          // On "clique" sur les sous-titres Français
          // pour chaque vidéo dès que VideoJS est prêt
          f$('video').each((index) => {
            videojs(`f_video_${index}`).ready(() => { f$('li.vjs-menu-item:contains("Français")').trigger('click'); });
          });
        });
      }
    },

    ytBlock() {
      // Bloqueur d'iframe style Flashblock pour Youtube
      // faire de même pour Soundcloud, Dailymotion, Vimeo
      f$('a[href*="youtube.com/watch"], a[href*="youtu.be/"]')
        .has('> img')
        .append(n.wrap(n.html.i('fa-play fc_light'), '<span class="btn-youtube">', '</span>'))
        .wrapInner('<span style="position:relative" />')
        .each(function addIframe(index) {
          f$(this).click(() => {
            // Si lien youtube <a> on l'ajoute le code au clic + ajout d'un Id à l'iframe
            const ytIframe = [
              '<iframe id="youtube', index, '" src="https://www.youtube.com/embed/',
              f$(this).attr('href').replace(
                /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([-\w]{10,12})\b[?=&\w]*(?!['"][^<>]*>|<\/a>)/ig,
                '$1',
              ),
              '?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen ></iframe>',
            ].join('');
            f$(this).after(ytIframe);
            f$(this).remove();
            return false;
          });
        });
    },

    /** Fonctions booleénnes **************************************** */
    is: {
      url(string, location) {
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

      email(emailAddress) { // RegEx from https://emailregex.com/
        const pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return pattern.test(emailAddress) === true;
      },

      lang(lg, browser) {
        if (browser !== 'b') { // Langue de la page
          let lang = '';
          const html = document.getElementsByTagName('html');
          const meta = document.getElementsByTagName('script');

          if (window.location.host.indexOf('framindmap.org') > -1 // Contournement de Wisemapping
            && document.getElementById('userSettingsBtn')
            && document.getElementById('userSettingsBtn').innerHTML === 'Compte') {
            lang = 'fr';
          } else if (html[0].getAttribute('lang')) {
            lang = html[0].getAttribute('lang');
          } else if (html[0].getAttribute('locale')) {
            lang = html[0].getAttribute('locale');
          } else {
            for (let i = 0; i < meta.length; i += 1) {
              if ((meta[i].getAttribute('http-equiv') && meta[i].getAttribute('content') &&
                  meta[i].getAttribute('http-equiv').indexOf('Language') > -1) ||
                  (meta[i].getAttribute('property') && meta[i].getAttribute('content')
                   && meta[i].getAttribute('property').indexOf('locale') > -1)) {
                lang = meta[i].getAttribute('content');
              }
            }
          }
          return (lang.substr(0, 2).toLowerCase() === lg);
        }
        // Langue du navigateur
        const userLang = navigator.languages ||
          [root.navigator.language || root.navigator.userLanguage];
        for (let i = 0; i < userLang.length; i += 1) {
          if (userLang[i].substring(0, 2).toLowerCase() === lg) {
            return true;
          }
        }
        return false;
      },

      before(date) {
        return new Date(new Date().toDateString()) < new Date(date);
      },

      after(date) {
        return new Date(new Date().toDateString()) > new Date(date);
      },

    },

    /** HTML ******************************************************** */
    html: {
      sr(text) { // Lecteur d’écran
        const t = text || '';
        return n.wrap(t, '<span class="sr-only">', '</span>');
      },

      i(class1, class2) { // Icône Fork-Awesome
        const c1 = class1 || '';
        const c2 = class2 || 'fa-fw fa-lg';
        return ['<i class="fa ', c2, ' ', c1, '" aria-hidden="true"></i>'].join('');
      },

      newWindow() { // Icône + texte
        return n.wrap(n.html.sr(n.wrap(d$.t.newwindow, '(', ')')), '&nbsp;', n.html.i('fa-external-link', 'new-window'));
      },

      divider() { // Séparateur de menu
        return '<li role="presentation" class="divider"></li>';
      },

      frama(truc) { // Framatruc en couleur
        const html = []; let color;

        if (truc === 'soft') {
          return '<b class="violet">Frama</b><b class="orange">soft</b>';
        }

        switch (d$.f[truc].c) {
          case 'b': color = 'bleu'; break;
          case 'r': color = 'rouge'; break;
          case 'v': color = 'vert'; break;
          case 'j': color = 'jaune'; break;
          case 'f': color = 'violet'; break;
          default: // case: 'o':
            color = 'orange';
            break;
        }

        // Prefix violet
        if (d$.f[truc].p !== undefined && d$.f[truc].p !== '') {
          html.push(n.wrap(d$.f[truc].p, '<b class="violet">', '</b>'));
        }

        // Suffixe en couleur et accessible
        if (d$.f[truc].s !== undefined && d$.f[truc].s !== '') {
          switch (d$.f[truc].a) {
            case 'en':
              html.push(n.wrap(d$.f[truc].s, `<b class="${color}" lang="en">`, '</b>'));
              break;
            case 'abbr':
              html.push(n.wrap(d$.f[truc].s, `<b class="${color}"><abbr>`, '</abbr></b>'));
              break;
            default:
              html.push(n.wrap(d$.f[truc].s, `<b class="${color}">`, '</b>'));
              break;
          }
        }

        return html.join('');
      },

      link(type, url, context) {
        const html = [];

        if (type !== undefined && url !== undefined) {
          switch (type) {
            case 'css':
              html.push('<link rel="stylesheet" ');
              if (context !== undefined) { html.push(' media="', context, '"'); }
              html.push(' href="', url, '" />');
              break;
            case 'rss':
              html.push('<link rel="alternate" type="application/rss+xml"');
              if (context !== undefined) { html.push(' title="', context, '"'); }
              html.push(' href="', url, '" />');
              break;
            case 'fav':
              html.push('<link rel="icon" type="image/png" href="', url, '" />');
              break;
            case 'apple':
              html.push('<link rel="apple-touch-icon" href="', url, '" />');
              break;
            default:
              // no default
              break;
          }
        }
        return html.join('');
      },

      menu(type, title, list) {
        const html = []; let dropdown;

        // Menus footer
        if (type === 'footer') {
          html.push('<nav class="col-xs-4">', '<h1>', title, '</h1>', '<ul class="list-unstyled">');

          for (let i = 0; i < list.length; i += 1) {
            const k = list[i];
            html.push('<li><a href="', d$.f[k].l, '">', n.text(n.html.frama(k)), '</a></li>');
          }

          html.push('</ul>', '</nav>');
        }

        // Menus "Nous suivre" du footer
        if (type === 'follow') {
          html.push('<h1>', title, '</h1>', '  <ul class="list-inline">');

          for (let i = 0; i < list.length; i += 1) {
            const k = list[i];
            html.push(
              '<li class="fs_', k, '">',
              '<a href="', d$.f[k].l, '" title="', d$.f[k].t1, '" ', n.html.popover(d$.f[k].t1, d$.f[k].d1, 'top'), '>',
              n.html.i(d$.f[k].i, 'fa-fw fa-2x'), n.html.sr(d$.f[k].name),
              '</a></li>',
            );
          }

          html.push('</ul>');
        }

        // Menus dropdown
        if (type === 'dropdown') {
          html.push(
            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',
            title,
            '<b class="caret"></b></a>',
            '<ul class="dropdown-menu">',
          );

          for (let i = 0; i < list.length; i += 1) {
            const k = list[i];
            dropdown = (k === 'dio') ? d$.f[k].c : 'v';
            html.push(
              '<li class="fs_dropdown_', dropdown, ' fs_', k, '">',
              '<a href="', d$.f[k].l, '" ', n.html.popover(d$.f[k].t1, d$.f[k].d1), '>',
              n.html.i(d$.f[k].i), '&nbsp;', n.text(n.html.frama(k)),
              '</a></li>',
            );
          }

          html.push('</ul>');
        }

        return html.join('');
      },

      navbar() {
        const html = [
          '<nav class="navbar navbar-default" id="framanav" role="menubar" style="display:none">',
          '  <button type="button" class="navbar-toggle text-muted" data-toggle="collapse" data-target=".navbar-ex1-collapse">',
          n.html.sr(d$.t.toggle), n.html.i('fa-bars'),
          '  </button>',
          '  <div class="nav-container">',
          '    <div class="navbar-header">',
          '      <a class="navbar-brand" href="', d$.meta.home.l, '">',
          '        <img src="', n$.baseurl, 'img/logo.png" />',
          '        <span class="hidden-sm">', n.html.frama('soft'), '</span>',
          '      </a>',
          '      <a href="#nav-end" id="nav-skip">', d$.t.skip, '</a>',
          '    </div>',
          '    <div class="collapse navbar-collapse navbar-ex1-collapse">',
          '      <ul class="nav navbar-nav">',
        ];
        Object.keys(d$.menu).forEach((k) => {
          if (k !== 'site' && k !== 'community') {
            html.push(
              '<li class="dropdown" id="fs_', k, '">',
              n.html.menu('dropdown', d$.menu[k].name, d$.menu[k].list),
              '</li>',
            );
          }
        });
        html.push(
          '<li><a href="', d$.meta.soutenir.l, '/?f=nav" class="btn-soutenir" ', n.html.popover(d$.meta.soutenir.t1, d$.meta.soutenir.d1, 'bottom'), '>',
          n.html.i(d$.meta.soutenir.i), '&nbsp;', d$.meta.soutenir.s,
          '</a></li>',
          '<li id="btn-benevalo"><a href="', d$.meta.benevalo.l, '" class="btn-info" ', n.html.popover(d$.meta.benevalo.t1, d$.meta.benevalo.d1, 'bottom'), '>',
          n.html.i(d$.meta.benevalo.i), '&nbsp;', d$.meta.benevalo.s,
          '</a></li>',
          '<li id="btn-myframa"><a href="', d$.meta.myframa.l, '" class="btn-primary" ', n.html.popover(d$.meta.myframa.t1, d$.meta.myframa.d1, 'bottom'), '>',
          n.html.i(d$.meta.myframa.i), '&nbsp;', d$.meta.myframa.s,
          '</a></li>',
          '      </ul>',
          '    </div>',
          '  </div>',
          '  <a id="nav-end" class="sr-only"></a>',
          '</nav>',
          '<a href="', d$.meta.soutenir.l, '/?f=macaron" id="framanav_donation" rel="donBadge" style="display:none" class="hidden-xs">', n.html.sr(d$.meta.soutenir.s), '</a>',
        );
        return html.join('');
      },

      newsletter() {
        return [
          '<h2>', n.text(n.html.frama('newsletter')), '</h2>',
          '<form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2" method="post" name="subscribeform">',
          '  <div class="input-group input-group-sm">',
          '    <input class="form-control" title="', d$.t['type-your-email'], '" name="email" size="40" type="text" placeholder="', d$.t['your-email'], '" />',
          '      <span class="input-group-btn">',
          '        <button class="btn btn-default" name="subscribe" type="submit" value="subscribe">', d$.t.subscribe, n.html.sr(d$.t['to-the-newsletter']), '</button>',
          '      </span>',
          '    </div>',
          '    <input name="htmlemail" type="hidden" value="1" />',
          '    <input name="list[5]" type="hidden" value="signup" />',
          '    <input name="listname[5]" type="hidden" value="Newsletter" />',
          '    <div style="display: none;"><input name="VerificationCodeX" size="20" type="text" value="" /></div>',
          '</form>',
        ].join('');
      },

      footer() {
        return [
          '<footer id="framafooter" class="row hidden-print" role="contentinfo">',
          '  <div class="container">',
          '    <div class="clearfix col-sm-8">',
          n.html.menu('footer', n.text(n.html.frama('soft')), ['asso', 'charte', 'contact', 'stats', 'status']),
          n.html.menu('footer', d$.menu.community.name, ['participer', 'colibri', 'benevalo', 'partenaires']),
          n.html.menu('footer', d$.menu.site.name, ['aide', 'faq', 'legals', 'cgu', 'credits']),
          '    </div>',
          '    <div class="col-sm-4">',
          '      <div class="col-xs-12">',
          n.html.menu('follow', d$.menu.follow.name, ['diaspora', 'mastodon', 'twitter', 'facebook', 'rss']),
          n.html.newsletter(),
          '      </div>',
          '    </div>',
          '  </div>',
          '</footer>',
        ].join('');
      },

      modal(id, title, body, footer, lg) { // Modales
        const size = (lg === undefined) ? '' : ' modal-lg';
        const html = [
          '<div class="modal fade" lang="', d$.meta.lg, '" id="modal-', id, '" tabindex="-1" role="dialog" aria-labelledby="modal-', id, 'Label" aria-hidden="true">',
          '  <div class="modal-dialog', size, '">',
          '    <div class="modal-content">',
          '      <div class="modal-header">',
          '        <button type="button" class="close" data-dismiss="modal" title="', d$.t.close, '"><i aria-hidden="true">&times;</i>', n.html.sr(d$.t.close), '</button>',
          '        <h1 id="modal-', id, 'Label">', title, '</h1>',
          '      </div>',
          '      <div class="modal-body">', body, '</div>',
          '      <div class="modal-footer">', footer, '</div>',
          '    </div>',
          '  </div>',
          '</div>',
        ];
        return html.join('');
      },

      popover(title, description, placement) { // Popover
        const html = [];
        if (title !== undefined && description !== undefined) {
          html.push('rel="popover" data-content="', description, '" title="', title, '"');
        }
        if (placement !== undefined) {
          html.push(' data-placement="', placement, '"');
        }
        return html.join('');
      },

      alert(type, id, body, close) { // Alert
        const html = [];
        html.push('<div class="alert alert-', type, ' fade in" id="', id, '">');
        if (close) {
          html.push(
            '<button type="button" class="close" data-dismiss="alert" title="',
            d$.t.close,
            '"><i aria-hidden="true">&times;</i>',
            n.html.sr(d$.t.close),
            '</button>',
          );
        }
        html.push(body, '</div>');
        return html.join('');
      },

    },

  };

  n.mergeObj(n$, n); // export des fonctions pour config.js

  n.init();

  /** **************************************************************** *
   *                           Config globale                          *
   ** **************************************************************** */
  c$ = {
    js: {
      j$: n.jquery(),
      /**
       * 'AJAX'       = jQuery de la nav ;
       * 'HTML'       = jQuery (1.9.1 ou +) présent dans la page ;
       * 'noConflict' = variable $ et jQuery renommés en js ;
       */
      b$: 'bootstrap',
      /**
       * 'bootstrap'  = bootstrap de la nav;
       * 'html'       = bootstrap présent dans la page ;
       * false        = on désactive bootstrap;
       */
      ext: false,
      /**
       * ext/n$.site.js si true
       * ou bien une fonction lancée au dom.ready
       */
      audio: false,
      video: false,
    },
    css: {
      order: '01234',
      /** cas possibles : 01234, 10234
        0 : bootstrap
        1 : css du site
        2 : font-awesome
        3 : nav.css
        4 : frama.css */
      b$: true,
      frama: true,
    },
    mobile: true, // activer le viewport

    modal: {
      don: ['', 'de télécharger', 'télécharger', 604800000],
      /**
        0 : sélecteur jQuery ou 'onstart' pour l'afficher à l'ouverture de la page
        3 : durée du cookie (7 jours)
       */
      info: ['', '', 'modal-info', 604800000],
      /** [titre, texte, nom du cookie, durée du cookie (7 jours)] */
    },
    alert: ['black', '', 'nav-alert', 604800000],
    /** [couleur (classes bootstrap), texte, nom du cookie, durée du cookie (7 jours)] */

    optin: ['', '', 'opt-in', 604800000],
    /** [sélecteur email1, email2, nom du cookie, durée du cookie (7 jours)] */

    icons: {
      keep: false, // garder les icônes du site (connard.pro, pouhiou.com)
      fav: false, // favicon-violet.png
      apple: false, // n$.site+'.png'
    },
    host: 'hetzner',
    credits: n$.site,
    piwik: {
      id: '',
      url: 'https://stats.framasoft.org/',
    },
  };

  // Bandeau soutenir défiscalisation
  const f$Today = new Date();
  const f$DD = f$Today.getDate();
  const f$MM = f$Today.getMonth() + 1;
  const f$YYYY = f$Today.getFullYear();

  if (f$MM === 12 && (31 - f$MM) < 16 && n$.site !== 'soutenir' && n.is.lang('fr')) {
    const f$Rebours = ((31 - f$DD) === 0) ? '24 heures' : [(31 - f$DD), ' jours'].join('');
    c$.alert[0] = 'info';
    c$.alert[1] = [
      'Rappel&nbsp;: il vous reste <b>', f$Rebours, '</b> pour faire un <b>don défiscalisé en ', f$YYYY, '</b> à Framasoft.',
      '<br/>Merci pour votre soutien <a href="https://soutenir.framasoft.org" class="btn btn-xs btn-soutenir">', n.html.i('fa-heart', ''), n.html.sr('Faire un don ?'), '</a>',
    ].join('');
  }
}());
