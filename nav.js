/** ************* *
 *  Conventions
 ** ************* *
 f$() = alias jQuery

 j$ = jQuery
 b$ = Bootstrap

 n${} = variables et fonctions globales de la nav
 d${} = données (texte, liens, icônes, couleurs, etc)
 h${} = html
 c${} = config du site
 l${} = config locale des sites
 */

let f$ = function f$() {
  // alias jQuery défini plus bas
};

const d$ = {};
let h$ = {};
let c$ = {};

const n$ = {
  version: '180222', // n° version de la nav
  f$: '1.12.4', // n° version de notre jQuery
  b$: '3.3.6', // n° version de Bootsrap
  host: window.location.host,
  url: window.location.href,
  inframe: window.top.location !== window.self.document.location,
  nav: {
    url: '',
    set: false,
    html: [
      '<div id="framanav_container" class="hidden-print" style="height:42px; opacity : 0"></div>',
      '<iframe id="framanav_cortex" src="https://framasoft.org/nav/html/cortex.html" ',
      'style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"></iframe>',
    ].join(''),
  },
  browser: {
    agent: navigator.userAgent,
    opera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    firefox: typeof InstallTrigger !== 'undefined',
    safari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    chrome: !!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0),
    ie: /*@cc_on!@*/false || !!document.documentMode, // eslint-disable-line
  },
  log: [],
};

(function framanav() {
  const navJS = {

    /** Nav init **************************************************** */
    init() {
      n$.site = n$.host.replace(/^(www|test)\./i, '').replace(/\.(com|net|org|fr|pro)$/i, ''); // Domaine et sous-domaine
      n$.name = n$.site[0].toUpperCase() + n$.site.slice(1).replace('.framasoft', ''); // Nom du service
      n$.site = n$.site.replace(/framand/i, 'and')
        .replace(/framage/i, 'age')
        .replace(/framae/i, 'mae')
        .replace(/(\.framasoft|frama\.)/i, '')
        .replace(/framin/i, 'min')
        .replace(/frame/i, 'me')
        .replace(/frama/i, '');

      if (n$.inframe) { n$.nav.html = '<div id="framanav_container" style="display:none"></div>'; }

      // Détection de la version de jQuery
      if (window.jQuery === undefined) {
        n$.j$ = 'ø'; // n° version du jQuery local
      } else {
        n$.j$ = window.jQuery.fn.jquery;
        f$ = jQuery; // alias (peut-être écrasé plus bas)
      }

      // Création du lien Framaestro avec page courante + visio Framatalk
      navJS.maestro();

      // Ajout <html data-url="" data-inframe=""> pour site.scss
      document.getElementsByTagName('html')[0].setAttribute('data-url', window.location.href);
      document.getElementsByTagName('html')[0].setAttribute('data-inframe', n$.inframe);

      // Détection URL de la nav → 'http://'+n$.site+'/nav'
      const scripts = document.getElementsByTagName('script');
      for (let i = 0; i < scripts.length; i += 1) {
        if (scripts[i].getAttribute('src') && scripts[i].getAttribute('src').indexOf('/nav.js') > -1) {
          n$.nav.url = this.l(scripts[i].getAttribute('src').replace('nav.js', ''));
          // On ajout une div vide de 42px qui contiendra la nav
          // (évite les sauts de mise en page avant le chargement des fichiers)
          if (scripts[i].parentNode.tagName.toLowerCase() === 'body') {
            // si nav.js est appelé en haut du body, c'est super rapide
            document.write(n$.nav.html);
            n$.nav.set = true;
          } // sinon c'est dans le head, il faut attendre document.ready (voir plus bas)
        }
      }

      navJS.loadJS(navJS.l('config.js', 'n', 'v'), navJS.config);
    },

    /** Config globale ********************************************** */
    config() {
      /* global l$ */
      navJS.mergeObj(c$, l$); // import de la config l$ dans c$

      n$.nav.speed = (n$.nav.set) ? '☀' : '☁';
      if (l$) {
        n$.log.push(`✔ ${n$.nav.speed} config.js ${n$.version} | ${n$.f$} | ${n$.j$} → ${navJS.jquery()} ?`);

        if (navJS.is.url('/nav/html/')) { // si pages « À propos » on réinit la config
          c$.js.b$ = true;
          c$.css.b$ = false;
          c$.css.ext = false;
          c$.footer = true;
          c$.icons.apple = 'soft.png';
        }

        if (c$.mute) {
          if (l$.alert === undefined) { c$.alert[1] = ''; } // pas de bandeau
          if (l$.modal === undefined) {
            c$.modal.info[0] = ''; c$.modal.don[0] = ''; // pas de modale
          } else {
            if (l$.modal.info === undefined) { c$.modal.info[0] = ''; }
            if (l$.modal.don === undefined) { c$.modal.don[0] = ''; }
          }
          c$.donate = false; // pas de macaron
        }

        navJS.loadCSS(c$.css);

        /** c$.js.j$ = navJS.jquery() mais on garde l$.js.j$
         * en fallback pour les cas très particuliers */
        switch (c$.js.j$) {
          case 'AJAX':
            if (navJS.jquery() === 'AJAX') {
              navJS.loadJS(navJS.l('lib/jquery/jquery.min.js', 'n'), navJS.fQuery);
              n$.log.push(`✔ jQuery ${n$.j$} AJAX`);
            } else {
              navJS.fQuery();
              n$.log.push(`✔ jQuery ${n$.j$} HTML`);
            }
            break;
          case 'noConflict':
            n$.log.push(`✔ jQuery.noConflict ${n$.j$} AJAX`);
            navJS.loadJS(navJS.l('lib/jquery/jquery.min.js', 'n'), navJS.fQuery);
            break;
          default:
            if (window.jQuery === undefined) {
              n$.log.push('✘ jQuery');
            } else {
              n$.log.push(`✔ jQuery ${n$.j$} HTML`);
              navJS.fQuery();
            }
            break;
        }
      } else {
        n$.log.push(`✘ ${n$.nav.speed} config.js ${n$.version}`);
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

        if (!n$.nav.set) { f$('body').prepend(n$.nav.html); }

        // On charge ensuite les données
        let f$I18n = {};
        let f$Fr = {};
        let dataI18n = function dataI18n() {};
        let dataFr = function dataFr() {};
        if (navJS.is.lang('en') || !navJS.is.lang('fr', 'b')) {
          dataI18n = f$.getJSON(navJS.l('html/data.en.json', 'n'))
            .fail(() => { n$.log.push('✘ data.en.json'); })
            .done((data) => { f$I18n = data; });
        }
        dataFr = f$.getJSON(navJS.l('html/data.fr.json', 'n'))
          .fail(() => { n$.log.push('✘ data.fr.json'); })
          .done((data) => { f$Fr = data; });

        f$.when(dataI18n, dataFr) // eslint-disable-line promise/catch-or-return
          .then(function dataProcess() {
            navJS.mergeObj(d$, f$Fr); // import default locale 'fr' dans d$
            navJS.mergeObj(d$, f$I18n); // import locale dans d$

            let f$Color = ''; let f$Menu = '';
            Object.keys(d$.menu).forEach((k) => {
              d$.menu[k].nav = '';
            });
            d$.menu.follow.footer = ''; d$.menu.about.site = '';

            if (n$.inframe) f$('#framanav_container').hide();

            h$ = {
              framasoft: `<b class="violet">${d$.meta.home.p}</b><b class="orange">${d$.meta.home.s}</b>`,
              rssLink: `<link rel="alternate" type="application/rss+xml" title="${d$.f.rss.d1}" href="${d$.f.rss.l}" />`,
              newwindow: `&nbsp;<i class="fa fa-external-link new-window" aria-hidden="true"></i>${navJS.html.sr(['(', d$.t.newwindow, ')'].join(''))}</span>`,
              divider: '<li role="presentation" class="divider"></li>',
              menu: d$.menu,
              f: {},
            };

            // Class couleurs + Dropdown menu
            Object.keys(d$.f).forEach((k) => {
              switch (d$.f[k].c) {
                case 'b': f$Color = 'bleu'; f$Menu = 'soft'; break;
                case 'r': f$Color = 'rouge'; f$Menu = 'culture'; break;
                case 'v': f$Color = 'vert'; f$Menu = 'services'; break;
                case 'j': f$Color = 'jaune'; f$Menu = 'vrac'; break;
                case 'f': f$Color = 'violet'; f$Menu = 'follow'; break;
                default: // case: 'o':
                  f$Color = 'orange';
                  f$Menu = (k !== 'dio') ? 'about' : 'services';
                  break;
              }
              // Nom du projet coloré (html)
              // Préfix violet
              h$.f[k] = {};

              if (d$.f[k].p === undefined) {
                h$.f[k].html = ''; d$.f[k].p = '';
              } else {
                h$.f[k].html = `<b class="violet">${d$.f[k].p}</b>`;
              }
              // Suffixe coloré (anglais, accronyme)
              switch (d$.f[k].a) {
                case 'en': h$.f[k].html += `<b class="${f$Color}" lang="en">${d$.f[k].s}</b>`; break;
                case 'abbr': h$.f[k].html += `<b class="${f$Color}"><abbr>${d$.f[k].s}</abbr></b>`; break;
                default: h$.f[k].html += `<b class="${f$Color}">${d$.f[k].s}</b>`; break;
              }

              // Nom du projet nu (name)
              h$.f[k].name = d$.f[k].p + d$.f[k].s;

              // Attribution des entrées dans chaque menu
              h$.menu[f$Menu].nav = [h$.menu[f$Menu].nav, '<li class="fs_', f$Menu, ' fs_', k, '"><a href="', d$.f[k].l, '" ', navJS.html.popover(d$.f[k].t1, d$.f[k].d1), '>', navJS.html.i(d$.f[k].i), '&nbsp;', h$.f[k].name, '</a></li>'].join('');

              // "Nous suivre" dans le footer
              if ((f$Menu === 'follow') && !(/(wiki|colibri|newsletter|contact|wikipedia)/i).test(k)) {
                h$.menu.follow.footer = [h$.menu.follow.footer, '<li class="fs_', k, '"><a href="', d$.f[k].l, '" title="', d$.f[k].t1, '" ', navJS.html.popover(d$.f[k].t1, d$.f[k].d1, 'top'), '><i class="fa fa-fw fa-2x ', d$.f[k].i, '" aria-hidden="true"></i>', navJS.html.sr(d$.f[k].name), '</a></li>'].join('');
              }
              // "À propos" du site
              if (n$.name === h$.f[k].name) {
                const f$Soft = (d$.f[k].soft !== undefined) ? ` (${d$.f[k].soft})` : '';
                h$.menu.about.site = [h$.menu.about.site, '<li class="dropdown-header">', h$.f[k].html, f$Soft, '</li>', h$.divider].join('');
                if (d$.f[k].doc !== undefined) {
                  d$.f.doc.l = d$.f[k].doc;
                }
                if (d$.f[k].git !== undefined) {
                  h$.menu.about.site = [h$.menu.about.site, '<li class="fs_about fs_git"><a href="', d$.f[k].git, '">', navJS.html.i(d$.f.git.i), '&nbsp;', d$.f.git.p, d$.f.git.s, '</a></li>'].join('');
                }
                if (d$.f[k].src !== undefined) {
                  h$.menu.about.site = [h$.menu.about.site, '<li class="fs_about fs_src"><a href="', d$.f[k].src, '">', navJS.html.i('fa-code-fork'), '&nbsp;', d$.t.source, f$Soft, '</a></li>'].join('');
                }
                d$.f.faq.l = `${d$.f.faq.l}#${n$.name.toLowerCase()}`;
                d$.f.aide.l = d$.f.aide.l.replace('#aide', n$.name.toLowerCase().relace(/^/, '#'));
              }
            });
            // Switch mobile/desktop
            h$.menu.about.nav = [h$.menu.about.nav, h$.divider,
              '<li class="framanav-mobile"><a href="javascript:void(0);">',
              navJS.html.i('fa-mobile'), '&nbsp;', d$.t.mobile,
              '</a></li>',
              '<li class="framanav-desktop"><a href="javascript:void(0);">',
              navJS.html.i('fa-desktop'), '&nbsp;', d$.t.desktop,
              '</a></li>'].join('');

            h$.nav = [
              '<nav class="navbar navbar-default" id="framanav" role="menubar" style="display:none">',
              '  <button type="button" class="navbar-toggle text-muted" data-toggle="collapse" data-target=".navbar-ex1-collapse">',
              navJS.html.sr(d$.t.toggle), navJS.html.i('fa-bars'),
              '  </button>',
              '  <div class="nav-container">',
              '    <div class="navbar-header">',
              '      <a class="navbar-brand" href="', d$.meta.home.l, '">',
              '        <img src="', n$.nav.url, 'img/logo.png" />',
              '        <span class="hidden-sm">', h$.framasoft, '</span>',
              '      </a>',
              '      <a href="#nav-end" id="nav-skip">', d$.t.skip, '</a>',
              '    </div>',
              '    <div class="collapse navbar-collapse navbar-ex1-collapse">',
              '      <ul class="nav navbar-nav">'];
            Object.keys(d$.menu).forEach((k) => {
              if (k !== 'site' && k !== 'community') {
                h$.nav.push(
                  '<li class="dropdown" id="fs_', k, '">',
                  '  <a href="#" class="dropdown-toggle" data-toggle="dropdown">', h$.menu[k].name, '<b class="caret"></b></a>',
                  '  <ul class="dropdown-menu">', h$.menu[k].nav, '</ul>',
                  '</li>',
                );
              }
            });
            h$.nav.push(
              '<li><a href="', d$.meta.soutenir.l, '/?f=nav" class="btn-soutenir" ', navJS.html.popover(d$.meta.soutenir.t1, d$.meta.soutenir.d1, 'bottom'), '>',
              navJS.html.i(d$.meta.soutenir.i), '&nbsp;', d$.meta.soutenir.s,
              '</a></li>',
              '<li id="btn-benevalo"><a href="', d$.meta.benevalo.l, '" class="btn-info" ', navJS.html.popover(d$.meta.benevalo.t1, d$.meta.benevalo.d1, 'bottom'), '>',
              navJS.html.i(d$.meta.benevalo.i), '&nbsp;', d$.meta.benevalo.s,
              '</a></li>',
              '<li id="btn-myframa"><a href="', d$.meta.myframa.l, '" class="btn-primary" ', navJS.html.popover(d$.meta.myframa.t1, d$.meta.myframa.d1, 'bottom'), '>',
              navJS.html.i(d$.meta.myframa.i), '&nbsp;', d$.meta.myframa.s,
              '</a></li>',
              '      </ul>',
              '    </div>',
              '  </div>',
              '  <a id="nav-end" class="sr-only"></a>',
              '</nav>',
              '<a href="', d$.meta.soutenir.l, '/?f=macaron" id="framanav_donation" rel="donBadge" style="display:none" class="hidden-xs">', navJS.html.sr(d$.meta.soutenir.s), '</a>',
            );

            /** On balance le code html */
            f$('#framanav_container').prepend(h$.nav.join(''));
            // Placement des popovers à gauche
            f$('#fs_services li:odd a, #fs_about li:even a').attr('data-placement', 'left');
            // Réagencement À propos
            f$('#fs_about li').has('a[href*="status."]').after(d$.menu.about.site);
            f$('#fs_about .fs_git').before(f$('#fs_about .fs_aide, #fs_about .fs_faq, #fs_about .fs_doc'));

            f$('#fs_about ul').prepend(`<li class="dropdown-header">${h$.framasoft}</li>${h$.divider}`);
            f$('#fs_about .fs_dio2').before(`<li class="dropdown-header"><b>${d$.t.campaign}<b></li>${h$.divider}`);

            f$('#fs_services .fs_dio, #fs_about .fs_dio2, #fs_about .fs_cuo').addClass('dropdown-header');
            f$('#fs_services .fs_dio a').wrapInner('<b>');
            f$('#fs_about .fs_dio2 a, #fs_about .fs_cuo a').addClass('text-left');

            // Ajout des dividers
            f$([
              '.fs_start', '.fs_zic', ' .fs_evl', ' .fs_evl2', ' .fs_dio',
              '.fs_maestro', ' .fs_carte', ' .fs_minetest', ' .fs_news',
              ' .fs_services.fs_git', '.fs_wiki', ' .fs_petitions',
              ' .fs_gplus', ' .fs_wikipedia', ' .fs_status', ' .fs_credits',
            ].join()).after(h$.divider);

            /**
             * Mobile/Desktop
             */
            // On ajoute du viewport et des boutons mobile/desktop
            const f$BtnDesktop = f$('.framanav-desktop');
            const f$BtnMobile = f$('.framanav-mobile');

            function f$Mobile() {
              const f$Viewport = f$('meta[name="viewport"]');
              if (f$Viewport.length === 0) {
                f$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
              } else {
                f$Viewport.attr('content', 'width=device-width, initial-scale=1.0');
              }
              f$BtnDesktop.addClass('visible-xs-inline').show();
              f$BtnMobile.hide();
            }

            function f$Desktop() {
              const f$Viewport = f$('meta[name="viewport"]');
              if (f$Viewport.length) {
                f$Viewport.attr('content', 'width=1024');
              }
              f$BtnDesktop.removeClass('visible-xs-inline').hide();
              f$BtnMobile.show();
            }

            if (c$.mobile) {
            // Viewport mobile si Responsive dans la config
            // Boutons « Désactiver mode mobile » par défaut
              f$Mobile();
            } else if (f$('meta[name="viewport"]').length === 0) {
            // Bouton « Activer mode mobile » par défaut
              f$Desktop();
            }
            // Si (Dés)Activation mannuel, le cookie prend la main le temps de la session
            switch (navJS.cookie('r', 'nav_viewport')) {
              case 'mobile': f$Mobile(); break;
              case 'desktop': f$Desktop(); break;
              default:
                // no default
                break;
            }
            // Boutons (Dés)Activer le mode mobile
            f$BtnMobile.on('click', () => {
              f$Mobile();
              document.cookie = 'nav_viewport=mobile;expire=0';
            });
            f$BtnDesktop.on('click', () => {
              f$Desktop();
              document.cookie = 'nav_viewport=desktop;expire=0';
            });
            /** Fin Mobile/Desktop */

            f$('#framanav_container').css('opacity', '1');

            // Bénévalo
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
            // MyFrama
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

            // Footer
            if (c$.footer && !n$.inframe) {
              h$.footer = [
                '<footer id="framafooter" class="row hidden-print" role="contentinfo">',
                '  <div class="container">',
                '    <div class="clearfix col-sm-8">',
                '      <nav class="col-xs-4">',
                '        <h1>', d$.meta.home.p, d$.meta.home.s, '</h1>',
                '        <ul class="list-unstyled">',
                '          <li><a href="', d$.f.asso.l, '">', h$.f.asso.name, '</a></li>',
                '          <li><a href="', d$.f.charte.l, '">', h$.f.charte.name, '</a></li>',
                '          <li><a href="', d$.f.contact.l, '">', h$.f.contact.name, '</a></li>',
                '          <li><a href="', d$.f.stats.l, '">', h$.f.stats.name, '</a></li>',
                '          <li><a href="', d$.f.status.l, '">', h$.f.status.name, '</a></li>',
                '        </ul>',
                '      </nav>',
                '      <nav class="col-xs-4">',
                '        <h1>', d$.menu.community.name, '</h1>',
                '        <ul class="list-unstyled">',
                '          <li><a href="', d$.f.participer.l, '">', h$.f.participer.name, '</a></li>',
                '          <li><a href="', d$.f.colibri.l, '">', d$.f.colibri.d0, '</a></li>',
                '          <li><a href="', d$.f.benevalo.l, '">', h$.f.benevalo.name, '</a></li>',
                '          <li><a href="', d$.f.partenaires.l, '">', h$.f.partenaires.name, '</a></li>',
                '        </ul>',
                '      </nav>',
                '      <nav class="col-xs-4">',
                '        <h1>', d$.menu.site.name, '</h1>',
                '        <ul class="list-unstyled">',
                '          <li><a href="', d$.f.aide.l, '">', h$.f.aide.name, '</a></li>',
                '          <li class="fs_faq"><a href="', d$.f.faq.l, '">', h$.f.faq.name, '</a></li>',
                '          <li><a href="', d$.f.legals.l, '">', h$.f.legals.name, '</a></li>',
                '          <li><a href="', d$.f.cgu.l, '"><abbr>', h$.f.cgu.name, '</abbr></a></li>',
                '          <li><a href="', d$.f.credits.l, '">', h$.f.credits.name, '</a></li>',
                '        </ul>',
                '      </nav>',
                '    </div>',
                '    <div class="col-sm-4">',
                '      <div class="col-xs-12">',
                '        <h1>', d$.menu.follow.name, '</h1>',
                '        <ul class="list-inline">', h$.menu.follow.footer, '</ul>',
                '        <h2>', h$.f.newsletter.name, '</h2>',
                '        <form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2" method="post" name="subscribeform">',
                '          <div class="input-group input-group-sm">',
                '            <input class="form-control" title="', d$.t['type-your-email'], '" name="email" size="40" type="text" placeholder="', d$.t['your-email'], '" />',
                '              <span class="input-group-btn">',
                '                <button class="btn btn-default" name="subscribe" type="submit" value="subscribe">', d$.t.subscribe, navJS.html.sr(d$.t['to-the-newsletter']), '</button>',
                '              </span>',
                '            </div>',
                '            <input name="htmlemail" type="hidden" value="1" /> <input name="list[5]" type="hidden" value="signup" /> <input name="listname[5]" type="hidden" value="Newsletter" />',
                '            <div style="display: none;"><input name="VerificationCodeX" size="20" type="text" value="" /></div>',
                '        </form>',
                '      </div>',
                '    </div>',
                '  </div>',
                '</footer>'].join('');

              f$('body').append(h$.footer);

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
            }

            /** Import de bootstrap.js ******************************** */
            if (c$.js.b$) {
              if (typeof f$().modal === 'function' || c$.js.b$ === 'html') {
                n$.log.push('✔ Bootstrap HTML');
                navJS.bootstrap();
              } else {
                f$.getScript(navJS.l('lib/bootstrap/js/bootstrap.min.js', 'n'), () => {
                  n$.log.push('✔ Bootstrap AJAX');
                  navJS.bootstrap();
                });
              }
            } else {
              n$.log.push('✘ Bootstrap');
            }

            // Audio JS
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

            // Video JS
            if (c$.js.video) {
              f$('link[href*="/nav/css/nav.css"]').before(`<link href="${n$.nav.url}lib/video-js/video-js.css" media="all" rel="stylesheet"/>`);

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

              f$.getScript(navJS.l('lib/video-js/video.js', 'n'), () => {
                n$.log.push('✔ video.js');
                /* global videojs */
                videojs.options.flash.swf = navJS.l('lib/video-js/video-js.swf', 'n');
                // On "clique" sur les sous-titres Français
                // pour chaque vidéo dès que VideoJS est prêt
                f$('video').each((index) => {
                  videojs(`f_video_${index}`).ready(() => { f$('li.vjs-menu-item:contains("Français")').trigger('click'); });
                });
              });
            }

            // Bloqueur d'iframe style Flashblock
            /* Vidéos Youtube */
            let f$YTi = 0;
            f$('a[href*="youtube.com/watch"], a[href*="youtu.be/"]').has('img')
              .append(`<span class="btn-youtube">${navJS.html.i('fa-play fc_light')}</span>`)
              .wrapInner('<span style="position:relative" />')
              .click(() => {
                // Si lien youtube <a> on l'ajoute le code au clic + ajout d'un Id à l'iframe
                const f$YTiframe = [
                  '<iframe id="youtube', f$YTi, '" src="https://www.youtube.com/embed/',
                  f$(this).attr('href').replace(
                    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([-\w]{10,12})\b[?=&\w]*(?!['"][^<>]*>|<\/a>)/ig,
                    '$1',
                  ),
                  '?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen ></iframe>',
                ].join('');
                f$(this).after(f$YTiframe);
                // On supprime <a><img/></a>
                f$(this).remove();
                f$YTi += 1;
                return false;
              });
            /** Même chose à faire pour Soundcloud, Dailymotion, Vimeo */

            // Flux RSS Global
            f$('head').append(h$.rssLink);

            // Favicon et Apple touch icon
            if (!c$.icons.keep) {
              f$('link[rel*=icon]').remove();
              c$.icons.fav = (!c$.icons.fav) ? 'favicon-violet.png' : c$.icons.fav;
              c$.icons.apple = (!c$.icons.apple) ? 'apple-violet.png' : c$.icons.apple;
              f$('head').append(`<link rel="icon" type="image/png" href="${n$.nav.url}img/icons/${c$.icons.fav}" />`);
              f$('head').append(`<link rel="apple-touch-icon" href="${n$.nav.url}img/icons/${c$.icons.apple}" />`);
            }

            // Opt-in
            const f$OptInDejavu = navJS.cookie('r', 'opt-in');
            if (c$.optin[0] !== '' && !f$OptInDejavu) {
              f$(c$.optin[0])
                .after(navJS.html.alert(
                  'info',
                  'fs_opt-in',
                  [
                    '<input type="checkbox" id="fs_opt-in_checkbox" value="false" />',
                    '<label for="fs_opt-in_checkbox">', d$.meta.optin.t, '</label><br>',
                    '<small>', d$.meta.optin.d1,
                    '&nbsp;<a href="', d$.f.newsletter.l, '" id="link-opt-in" target="_blank" >', d$.meta.optin.d2, h$.newwindow, '</a>',
                    '</small>',
                  ].join(''),
                ));

              f$(c$.optin[0]).focusin(() => {
                f$('#fs_opt-in_error').remove();
                // Ajout du cookie (expire au bout d'un an)
                navJS.cookie('w', c$.optin[2], true, c$.optin[3]);
              });

              // Requête ajax crossdomain lorsque la case est cochée
              f$('#fs_opt-in input, #fs_opt-in label').on('click', () => {
                f$('#fs_opt-in_error').remove();
                const f$Email = f$(c$.optin[0]).val();
                if (c$.optin[1] !== '' && f$(c$.optin[0]).val() !== f$(c$.optin[1]).val()) { // Cas où il y a un champs pour confirmer email
                  f$(c$.optin[0]).after(navJS.html.alert(
                    'danger',
                    'fs_opt-in_error',
                    d$.meta.optin.e2,
                  ));
                  return false;
                } else if (!navJS.is.email(f$(c$.optin[0]).val())) {
                  f$(c$.optin[0]).after(navJS.html.alert(
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
                f$(c$.optin[0]).after(navJS.html.alert(
                  'success', 'fs_opt-in_confirm',
                  d$.meta.optin.s1.replace('%f$Email%', f$Email),
                  true,
                ));
                return true;
              });
            }

            // Macaron
            if (c$.donate && !n$.inframe) {
              f$('#framanav_donation')
                .show()
                .delay((Math.random() * 28000) + 1000)
                .fadeOut(600)
                .fadeIn(600);
            }

            // Liens À propos
            f$('#framafooter a[href*="/nav/html/"], #fs_about a').attr('href', function addHash() {
              return f$(this).attr('href')
                .replace('credits.html', `credits.html#${c$.credits}`)
                .replace('legals.html', `legals.html#${c$.host}`);
            });

            // Crédits
            if (navJS.is.url('/html/credits.html') && window.location.hash) {
              f$('#site-credits').load(navJS.l(window.location.hash.replace('#', 'html/credits/').replace(/$/, '.html'), 'n'));
            }

            // Hébergeur et Iframe Piwik sur Mentions légales
            if (navJS.is.url('/html/legals.html')) {
              if (window.location.hash) {
                f$('#modal-legals-host').load(navJS.l(window.location.hash.replace('#', 'html/host/').replace(/$/, '.html'), 'n'));
              }
              f$('#piwik-iframe').html(`<iframe style="border: 0; height: 200px; width: 600px;" src="${c$.piwik.url}index.php?module=CoreAdminHome&action=optOut&language=fr"></iframe>`);
            }

            // Ext.js
            if (typeof c$.js.ext === 'function') {
              c$.js.ext();
            } else if (c$.js.ext === true) {
              f$.getScript(navJS.l(`ext/${n$.site}.js`, 'n'));
            } else if (typeof c$.js.ext === 'string') {
              f$.getScript(navJS.l(`ext/${c$.js.ext}.js`, 'n'));
            }
          })
          .fail((err) => { n$.log.push('✘ data.*.json', err); });
        // </dataProcess>
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
        if (c$.fixed || navJS.is.url('/nav/html/')) {
          f$('body').addClass('fnav-fixed');
        }

        // Liens de la nav à ouvrir dans un onglet
        if (!navJS.is.url('/nav/html/')) {
          f$('#framanav .dropdown-menu a').attr('target', '_blank').append(h$.newwindow);
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

        // Modal et Alert d'info
        const f$AlertDejavu = navJS.cookie('r', 'nav-alert');
        const f$ModalInfoDejavu = navJS.cookie('r', c$.modal.info[2]);

        // Modal
        if (c$.modal.info[0] !== '') {
          f$('body').append(navJS.html.modal( // id, title, body, footer
            'finfo', c$.modal.info[0],
            c$.modal.info[1],
            [
              '<button class="btn" id="modal-close" data-dismiss="modal">',
              d$.t.close,
              '</button>',
              '<button class="btn btn-primary" id="modal-set-cookie" >',
              d$.t.nevershow,
              '</button>',
            ].join(''),
          ));

          if (!f$ModalInfoDejavu) {
            f$('#modal-finfo').modal('show');
            f$('#modal-set-cookie').click(() => {
              navJS.cookie('w', c$.modal.info[2], true, c$.modal.info[3]); // cookie pour 7 jours par défaut (cf config ci-dessous)
              f$('#modal-finfo').modal('hide');
            });
            f$('#modal-finfo .close, #modal-close').click(() => {
              navJS.cookie('w', c$.modal.info[2], true); // cookie pour la session
              f$('#modal-finfo').modal('hide');
            });
          }
        }

        // Alert
        if (c$.alert[1] !== '' && !f$AlertDejavu) {
          if (c$.fixed || navJS.is.url('/nav/html/')) {
            f$('#framanav_container ~ *:not(script):first').css('margin-top', '-=42');
          }

          f$('#framanav_container').after(navJS.html.alert(
            c$.alert[0], 'nav-alert',
            `<div style="margin:0 auto; max-width:800px;"><p class="text-center">${c$.alert[1]}</p></div>`,
            true,
          ));

          // Cookie enregistré en fermant (7 jours par défaut cf config.js)
          f$('#nav-alert').bind('closed.bs.alert', () => {
            navJS.cookie('w', c$.alert[2], true, c$.alert[3]);
          });
        }

        // Fenêtre modal pour dons sur téléchargements
        if (c$.modal.don[0] !== '') {
          f$('body').append(navJS.html.modal(
            'soutenir', d$.meta.modaldon.t,
            [ // body
              d$.meta.modaldon.d[0].replace('%c$.modal.don[1]%', c$.modal.don[1]),
              d$.meta.modaldon.d[1],
              d$.meta.modaldon.d[2],
              d$.meta.modaldon.d[3],
            ].join(''),
            [ // footer
              '<div class="clearfix"><p class="col-md-12 text-center">',
              '  <a target="_blank" id="modal-don" href="', d$.meta.soutenir.l, '/?f=modal&s=', n$.site, '" class="btn btn-soutenir btn-block">',
              navJS.html.i(d$.meta.soutenir.i), ' ', d$.meta.modaldon.b1, h$.newwindow,
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

          if (c$.modal.don[0] === 'onstart') {
            const dejavu = navJS.cookie('r', 'dondl');
            if (!dejavu) {
              f$('#modal-soutenir').modal('show');
              f$('#modal-soutenir').css('display', 'block'); // bugfix
              f$('#modal-contact, #modal-don, #modal-dl, #modal-soutenir .close').click(() => {
                navJS.cookie('w', 'dondl', true, c$.modal.don[3]);
                f$('#modal-soutenir').modal('hide');
              });
              f$('#modal-dl2').click(() => {
                navJS.cookie('w', 'dondl', true, 31536000000); // 365 * 24 * 60 * 60 * 1000
                f$('#modal-soutenir').modal('hide');
              });
            }
          } else {
            f$(c$.modal.don[0]).click(() => {
              const dejavu = navJS.cookie('r', 'dondl');
              if (!dejavu) {
                const link = navJS.l(f$(this).attr('href'));
                f$('#modal-soutenir').modal('show');
                f$('#modal-contact, #modal-don, #modal-dl').click(() => {
                  navJS.cookie('w', 'dondl', true, c$.modal.don[3]);
                  f$('#modal-soutenir').modal('hide');
                  window.location.href = link;
                });
                f$('#modal-dl2').click(() => {
                  navJS.cookie('w', 'dondl', true, 31536000000); // 365 * 24 * 60 * 60 * 1000
                  f$('#modal-soutenir').modal('hide');
                  window.location.href = link;
                });
                return false;
              }
              return true;
            });
          }
        }

        // Modal FAQ
        if (d$.f.faq.l.indexOf(n$.name.toLowerCase()) > -1) {
          f$('body').append(navJS.html.modal(
            'fsFAQ',
            [d$.f.faq.s, n$.name].join(' '), // ! space
            '',
            [
              '<span class="pull-left">', d$.t['another-question'],
              ' <a href="', d$.f.contact.l, '">', d$.t['contact-us'], '</a>',
              '</span> ',
              '<button class="btn" id="modal-close" data-dismiss="modal">', d$.t.close, '</button>',
            ].join(''),
            'lg',
          ));
          f$('.fs_faq a').on('click', () => {
            if (f$('#modal-fsFAQ .modal-body').html() === '') {
              f$('#modal-fsFAQ .modal-body').load(
                ['https://contact.framasoft.org/foire-aux-questions/ #', n$.name.toLowerCase(), ' .list-group-item'].join(''),
                (data) => {
                  if (f$(data).find(n$.name.toLowerCase().replace(/^/, '#')).length < 1) {
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
      } // </!n$.inframe>
    },

    /** Fonctions génériques **************************************** */
    l(href, nav, version) {
      // Lien absolu depuis l’emplacement de la nav
      if (nav === 'n' && n$.nav.url !== '') {
        if (version === 'v') {
          return `${n$.nav.url}${href}?${n$.version}`;
        }
        return `${n$.nav.url}${href}`;
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
            link.href = navJS.l('lib/bootstrap/css/bootstrap.min.css', 'n');
            break;
          case '2': // Font-Awesome
            link.media = 'all';
            link.href = navJS.l('lib/fork-awesome/css/fork-awesome.min.css', 'n');
            break;
          case '3': // Nav
            link.media = 'screen';
            link.href = navJS.l('css/nav.css', 'n', 'v');
            break;
          case '4': // Frama
            link.media = (css.frama) ? 'all' : 'none';
            link.href = navJS.l('css/frama.css', 'n', 'v');
            break;
          case '5': // Ext *obsolete*
            link.media = (css.ext) ? 'all' : 'none';
            link.href = navJS.l(`ext/${n$.site}.css`, 'n', 'v');
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
       *  exemple 02-1-345 → on commence par le 2 puis le 0 */
      for (let i = css.order.indexOf('1'); i >= 0; i -= 1) {
        AddLink(css.order[i], 'first');
      }
      /** Parcours croissant pour le reste
       * exemple 02-1-345 → dans l'ordre 3, 4 et 5 */
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

      email(emailAddress) {
        const pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2, 4}$/i);
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
        return t.replace(/^/, '<span class="sr-only">').replace(/$/, '</span>');
      },

      i(classCSS) { // Icône Fork-Awesome
        const c = classCSS || '';
        return c.replace(/^/, '<i class="fa fa-fw fa-lg ').replace(/$/, '" aria-hidden="true"></i>');
      },

      modal(id, title, body, footer, lg) { // Modales
        const size = (lg === undefined) ? '' : ' modal-lg';
        const html = [
          '<div class="modal fade" lang="', d$.meta.lg, '" id="modal-', id, '" tabindex="-1" role="dialog" aria-labelledby="modal-', id, 'Label" aria-hidden="true">',
          '  <div class="modal-dialog', size, '">',
          '    <div class="modal-content">',
          '      <div class="modal-header">',
          '        <button type="button" class="close" data-dismiss="modal" title="', d$.t.close, '"><i aria-hidden="true">&times;</i>', navJS.html.sr(d$.t.close), '</button>',
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
            navJS.html.sr(d$.t.close),
            '</button>',
          );
        }
        html.push(body, '</div>');
        return html.join('');
      },

    },

  };

  navJS.mergeObj(n$, navJS); // export des fonctions pour config.js

  navJS.init();

  /** **************************************************************** *
   *                           Config globale                          *
   ** **************************************************************** */
  c$ = {
    js: {
      j$: navJS.jquery(),
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
      order: '012345',
      /** cas possibles : 012345, 102345, 015234
        0 : bootstrap
        1 : css du site
        2 : font-awesome
        3 : nav.css
        4 : frama.css
        5 : nav/ext/n$.site.css si true */
      b$: true,
      frama: true,
      ext: false,
    },
    mobile: true, // activer le viewport
    fixed: false, // position de la nav

    footer: true,

    donate: true, // macaron
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
    mute: false, // désactive macaron, modal, alert

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

  if (f$MM === 12 && (31 - f$MM) < 16 && n$.site !== 'soutenir' && navJS.is.lang('fr')) {
    const f$Rebours = ((31 - f$DD) === 0) ? '24 heures' : [(31 - f$DD), ' jours'].join('');
    c$.alert[0] = 'info';
    c$.alert[1] = [
      'Rappel&nbsp;: il vous reste <b>', f$Rebours, '</b> pour faire un <b>don défiscalisé en ', f$YYYY, '</b> à Framasoft.',
      '<br/>Merci pour votre soutien <a href="https://soutenir.framasoft.org" class="btn btn-xs btn-soutenir"><i class="fa fa-heart" aria-hidden="true"></i><span class="sr-only">Faire un don ?</a>',
    ].join('');
  }
}());
