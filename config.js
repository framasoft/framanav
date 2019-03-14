/** ****************************************************************** *
 *                          Config des sites                           *
 * ******************************************************************* */
// Pour savoir à quoi correspondent les options de config, aller à la fin
// de nav.js. La variable c$ contient toutes les valeurs par défaut ainsi
// que les explications pour comprendre à quoi ça correspond.

/* global n$:{} f$ */

var l$; l$ = l$ || {}; // eslint-disable-line

// Alias
// On remplace juste la variable n$.site.
// Cette variable n'est utilisée que pour charger les fichiers ext_css,
// credits et placer un tracker sur un lien de la modale Soutenir

switch (n$.site) {
  case 'huit.re': n$.site = 'link'; break;
  case 'tontonroger': n$.site = 'bee'; break;
  case 'trouvons': n$.site = 'bee'; break;

  // no default
}

// Config pour domaine et sous-domaine
if (n$.is.url(/framaboard/i, 'h')) { n$.site = 'board'; }
if (n$.is.url(/framadate/i, 'h')) { n$.site = 'date'; }
if (n$.is.url(/framacalc/i, 'h')) { n$.site = 'calc'; }

if (n$.is.url('mypads.framapad.org', 'h') || n$.is.url('beta3.framapad.org', 'h')) { n$.site = 'mypads'; }
if ((n$.is.url(/.framapad/i, 'h') && !n$.is.url(/mypads./i, 'h'))
  || (n$.is.url(/mypads.framapad/i, 'h') && n$.is.url('/p/'))
  || (n$.is.url(/beta3.framapad/i, 'h') && n$.is.url('/p/'))) {
  n$.site = 'etherpad';
}

switch (n$.site) {
  case 'cortex':
    l$ = {
      js: { b$: false },
      css: { order: '1' }, // Désactive toutes CSS
    };
    break;

  case 'bee':
    l$ = {
      js: {
        ext() {
          if (jQuery('.explain').length) { jQuery('#q').focus(); }
          jQuery('.footer').hide();
          jQuery('body').css('margin-bottom', '0');
          // Default search in fr
          if (n$.is.lang('fr', 'b') && document.cookie.indexOf('language=') === -1) {
            $('select[name="language"] option[value="fr"]').prop('selected', true);
          }
          // Active search engine list
          let i18n = {
            search: 'Search engines used',
            pref: 'You can <a href="/preferences">choose others in the preferences</a>',
          };
          if (document.cookie.indexOf('locale=fr') > -1 || n$.is.lang('fr', 'b')) {
            i18n = {
              search: 'Moteurs de recherche utilisés',
              pref: 'Vous pouvez <a href="/preferences">en choisir d’autres dans les préférences</a>',
            };
          }
          let engines = '';
          $('#main_results .label-default').each((i) => {
            const html = $('<div />').append($('#main_results .label-default').eq(i).clone()).html();
            if (engines.indexOf(html) === -1) {
              engines += `${html} `;
            }
          });
          $('#sidebar_results').append(`
            <div class="panel panel-default">
              <div class="panel-heading">
                <h4 class="panel-title">${i18n.search}</h4>
              </div>
              <div class="panel-body">
                <p>${engines.replace(/pull-right/g, '')}</p>
                <p>${i18n.pref}</p>
              </div>
            </div>
          `);
        },
      },
    };
    break;

  case 'bin':
    l$ = {
      js: { ext: true },
      modal: {
        don: ['onstart', 'd’utiliser', ['utiliser ', n$.name].join('')],
      },
    };
    break;

  case 'blog':
    l$ = {
      js: {
        j$: 'noConflict',
        b$: 'bootstrap',
        audio: true,
        video: true,
      },
      optin: ['#commentform #email'],
    };
    break;

  case 'board':
    if (n$.is.url('.framaboard')) { // dans Kanboard
      l$ = {
        js: {
          b$: 'html',
          ext() {
            jQuery('h1 .logo a').html('<b class="violet">Frama</b><b class="vert">board</b>');
            jQuery('h1 .logo').removeClass('logo');
            jQuery([
              'a[href$="?controller=UserCreationController&action=show&remote=1"]',
              'a[href^="/?controller=UserViewController&action=external"]',
              'input[name="is_ldap_user"]'].join())
              .parent().hide();
            if (/(controller=PasswordResetController|controller=AuthController)/.test(window.location.href)) {
              jQuery('#form-username')
                .on('keyup', () => {
                  if (/@/.test(jQuery('#form-username').val())) {
                    jQuery('#lisez-bordel').show();
                  } else {
                    jQuery('#lisez-bordel').hide();
                  }
                })
                .after(`
                <p id="lisez-bordel" class="alert alert-warning" style="display: none;">
                  Veuillez saisir votre identifiant et non votre adresse email
                </p>`);
            }
          },
        },
        css: { b$: false },
      };
    } else {
      l$.optin = ['#registration #email'];
    }
    break;

  case 'book':
    l$ = {
      js: { j$: 'noConflict', b$: 'bootstrap' },
      modal: { don: ['a[href*="download-monitor/download.php?id="]'] },
    };
    break;

  case 'calc':
    // Calcs à onglets sont dans des frame
    try {
      if (window.top.location.href.indexOf('framacalc.org/=') > -1) {
        document.getElementById('framanav_container').style = 'height:42px; opacity:0';
        n$.inframe = false;
      }
    } catch (e) {
      // continue regardless of error
    }
    if (n$.is.url('accueil.framacalc.org')) {
      // Si on est sur la page d'accueil
      if (n$.is.lang('fr')) {
        l$.modal = {
          don: ['a[href*="lite.framacalc.org/"]', 'd’utiliser', 'créer un calc'],
        };
      }
      l$.js = {
        ext() {
          if (n$.cookie('r', 'calc-alert')) { $('#classic .alert').hide(); }
          $('#classic .alert').on('closed.bs.alert', () => {
            n$.cookie('w', 'calc-alert', true, 31536000000);
          });
        },
      };
    } else { // dans Ethercalc
      l$ = {
        js: {
          ext() { jQuery(window).trigger('resize'); },
        },
        css: { b$: !n$.inframe },
        mobile: false,
      };
    }
    break;

  case 'carte':
    if (n$.is.lang('fr')) {
      l$.modal = { don: ['a.btn-primary[href*="/map/new/"]', 'd’utiliser', 'créer une carte'] };
    }
    break;

  case 'clic':
    l$.js = { b$: 'html' };
    break;

  case 'date':
    l$.js = { ext: n$.is.url('framadate.org', 'h') };
    if (n$.is.lang('fr')) {
      l$.modal = { don: ['a[href*="create_poll.php?"]', 'd’utiliser', 'créer un sondage'] };
      if (n$.is.url('create_poll.php?')) {
        l$.optin = ['#formulaire input#email'];
      }
    }
    break;

  case 'drop':
    l$.js = {
      ext() {
        if (!n$.is.url('https://framadrop.org/', 'u')) {
          $('main .row:last,main hr:last').hide();
        }
        $('#delete-day option[value="60"]').append(' (max 2Mo)');
        $('#delete-day option[value="30"]').append(' (max 50Mo)');
        $('#delete-day option[value="7"]').append(' (max 200Mo)');
        // $('#delete-day option[value="1"]').append(' (max 500Mo)');
      },
    };
    break;

  case 'dvd':
    l$ = {
      modal: { don: ['a[href*="iso.framadvd.org"]'] },
    };
    break;

  case 'games':
    l$.modal = { don: ['.play a', 'd’utiliser', 'jouer'] };
    break;

  case 'key':
    l$.js = { j$: 'noConflict', b$: 'bootstrap' };
    l$.modal = { don: ['a[href*="framaclic.org"]'] };
    break;

  case 'libre':
    l$ = {
      js: {
        ext() {
          if (n$.inframe) {
            f$('a').attr('target', '_blank');
          }
        },
      },
    };
    break;

  case 'link':
    l$ = {
      modal: {
        don: ['onstart', 'd’utiliser', ['utiliser ', n$.name].join('')],
      },
    };
    break;

  case 'maestro':
    l$ = {
      js: { b$: 'html' },
    };
    break;

  case 'mindmap':
    l$ = {
      css: { b$: false },
      optin: ['#user #email'],
    };
    if (n$.is.url('framindmap.org/c/maps/') && !n$.is.url('/edit')) {
      l$.modal = { don: ['onstart', 'd’utiliser', ['utiliser ', n$.name].join('')] };
    }
    break;

  case 'my':
    if (n$.is.url('source=bookmarklet')) {
      n$.inframe = true;
      l$ = {
        js: {
          ext() {
            jQuery('#loginform').append([
              '<p class="alert alert-warning"><b>Rappel&nbsp;:</b> MyFrama sert à ',
              'regrouper en un même endroit vos liens (notamment vos pads, calcs, sondages, etc). ',
              'Il ne permet <strong>pas de créer un compte unique</strong> pour ',
              'accéder à l’ensemble des services de Framasoft.</p>',
            ].join(''));
          },
        },
      };
    } else {
      l$ = {
        js: {
          ext() {
            if (n$.inframe) {
              f$('#linklist').addClass('container-fluid').removeClass('container');
              f$('#pageheader').hide();
              f$('a').attr('target', '_blank');
            }
          },
        },
      };
    }
    break;

  case 'news':
    if (n$.is.url('framanews.org/ttrss')) { // N’est pas actif
      l$ = {
        js: {
          ext() { jQuery(window).trigger('resize'); },
        },
      };
    }
    break;

  case 'pack':
    l$ = {
      modal: { don: ['onstart', 'd’utiliser', ['utiliser ', n$.name].join('')] },
    };
    break;

  // <framapad> --------------------------------------------------------
  case 'pad':
    l$ = {
      modal: { don: ['a[href*=".framapad.org/p/"]', 'd’utiliser', 'créer un pad'] },
    };
    break;

  case 'mypads':
    n$.name = 'Framapad';
    l$ = {
      credits: 'pad',
    };
    break;

  case 'etherpad': // dans Etherpad
    n$.name = 'Framapad';
    l$ = {
      js: {
        ext() {
          jQuery('#loading').delay(2000).append([
            '<p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br>',
            'l’export <a href="', window.location.href, '/export/html">html</a> ',
            'ou <a href="', window.location.href, '/export/txt">txt</a> ',
            'de votre document et <a href="https://contact.framasoft.org/#framapad">contactez-nous</a>.</p>',
          ].join(''));
          if (!n$.inframe) {
            const addMaestroBtn = setInterval(() => {
              if (jQuery('#editbar .menu_right').length && !jQuery('#maestroBtn').length) {
                jQuery('#editbar .menu_right').prepend([
                  '<li id="maestroBtn"><a title="Ajouter une visio-conférence" href="', n$.maestro, '">',
                  '  <button class="buttonicon fa fa-video-camera" style="top:0 !important;"></button>',
                  '  <span class="sr-only">Visio-conférence</span>',
                  '</a></li>',
                ].join(''));
                clearInterval(addMaestroBtn);
              }
            }, 1000);
          }
        },
      },
      css: { b$: !n$.inframe },
      credits: 'pad',
    };
    if (n$.is.url(/(beta.framapad)/i, 'h')) {
      l$.modal = {
        info: [
          'Avertissement',
          [
            '<p>Cette instance de Framapad (<b>beta</b>.framapad.org) est ',
            'instable et ne doit servir que pour des tests.<p>',
            '<p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>',
            '<p>Merci.<br />L’équipe technique</p>',
          ].join(''),
        ],
      };
    }
    break;
    // </framapad> -------------------------------------------------------

  case 'piaf':
    l$ = {
      js: {
        ext() {
          document.querySelectorAll('img[src*="/packs/logo"]')
            .forEach(img => Object.assign(img, { src: 'https://framasoft.org/nav/img/icons/piaf.png' }));
        },
      },
    };
    /**
     * Deactivate the alerts elsewhere than homepage, main view and public profile and tags view
     */
    if (!(n$.is.url(/framapiaf.org\/web/, 'u') || n$.is.url(/framapiaf.org\/about/, 'u') || n$.is.url(/framapiaf.org\/@/, 'u') || n$.is.url(/framapiaf.org\/tags/, 'u'))) {
      l$.alert = ['', ''];
    }
    break;

  case 'pic':
    l$ = {
      modal: { don: ['onstart', 'd’utiliser', ['utiliser ', n$.name].join('')] },
      host: 'soyoustart',
    };
    break;

  case 'site':
    l$ = {
      js: { j$: 'noConflict', b$: 'html' },
      alert: [
        'info',
        [
          '<b class="violet">Frama</b><b class="vert">site</b> est en phase de test. ',
          'Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque. ',
          'C’est à l’écoute de vos retours que nous allons l’améliorer ',
          'et le documenter au cours des semaines à venir.',
        ].join(''),
      ],
    };
    break;

  case 'team':
    l$ = {
      js: { j$: 'noConflict', b$: 'html', ext: true },
    };
    break;

  case 'vectoriel':
    if (n$.is.url('svg-editor')) { // Dans SVG-Editor
      l$ = {
        css: {
          b$: !n$.inframe,
        },
      };
    } else {
      l$ = {
        modal: { don: ['a[href$="svg-editor.html"]', 'd’utiliser', 'créer une image'] },
      };
    }
    break;

  case 'vox':
    l$ = {
      js: {
        ext: true,
      },
    };
    break;

  case 'wiki':
    if (n$.is.url('frama.wiki', 'h')) {
      l$ = {
        js: { j$: 'noConflict', b$: 'html' },
        alert: [
          'info',
          [
            '<b class="violet">Frama</b><b class="vert">wiki</b> est en phase de test. ',
            'Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque. ',
            'C’est à l’écoute de vos retours que nous allons l’améliorer et le documenter au cours des semaines à venir.',
          ].join(''),
        ],
      };
    } else {
      n$.inframe = n$.is.url('mediamanager.php');
      l$ = {
        alert: ['', ''],
      };
    }
    break;

  case 'zic':
    l$ = {
      js: {
        j$: 'noConflict',
        b$: 'bootstrap',
      },
    };
    break;

  // no default
}

/** ****************************************************************** *
 *                               Piwik                                 *
 * ******************************************************************* */
l$.piwik = {
  id: '',
  url: 'https://stats.framasoft.org/',
  mode: 'js',
};

switch (n$.site) {
  case 'soft': /**           */ l$.piwik.id = '1'; break;
  case 'blog': /**           */ l$.piwik.id = '3'; break;
  case 'pad': /**            */ l$.piwik.id = '4'; break;
  case 'etherpad': /**       */ l$.piwik.id = '4'; break;
  case 'key': /**            */ l$.piwik.id = '5'; break;
  case 'dvd': /**            */ l$.piwik.id = '6'; break;
  case 'book': /**           */ l$.piwik.id = '7'; break;
  case 'tube': /**           */ l$.piwik.id = '8'; break;
  case 'zic': /**            */ l$.piwik.id = '9'; break;
  case 'date': /**           */ l$.piwik.id = '10'; break;
  case 'calc': /**           */ l$.piwik.id = '11'; break;
  case 'mindmap': /**        */ l$.piwik.id = '12'; break;
  case 'vectoriel': /**      */ l$.piwik.id = '13'; break;
  case 'phonie': /**         */ l$.piwik.id = '14'; break;
  case 'lab': /**            */ l$.piwik.id = '16'; break;
  case 'code': /**           */ l$.piwik.id = '17'; break;
  // case 'localhost': /**      */ l$.piwik.id = '17'; break;
  case 'soutenir': /**       */ l$.piwik.id = '18'; break;
  case 'contact': /**        */ l$.piwik.id = '19'; break;
  case 'news': /**           */ l$.piwik.id = '20'; break;
  case 'bag': /**            */ l$.piwik.id = '21'; break;
  case 'start': /**          */ l$.piwik.id = '23'; break;
  case 'pack': /**           */ l$.piwik.id = '24'; break;
  case '10ans': /**          */ l$.piwik.id = '25'; break;
  case 'sphere': /**         */ l$.piwik.id = '26'; break;
  case 'bee': /**            */ l$.piwik.id = '27'; break;
  case 'games': /**          */ l$.piwik.id = '28'; break;
  case 'git': /**            */ l$.piwik.id = '29'; break;
  case 'degooglisons-internet': l$.piwik.id = '30'; break;
  case 'pic': /**            */ l$.piwik.id = '31'; l$.piwik.mode = 'img'; break;
  case 'link': /**           */ l$.piwik.id = '32'; break;
  case 'participer': /**     */ l$.piwik.id = '33'; break;
  case 'colibri': /**        */ l$.piwik.id = '33'; break;
  case 'bin': /**            */ l$.piwik.id = '34'; l$.piwik.mode = 'img'; break;
  case 'cloud': /**          */ l$.piwik.id = '35'; break;
  case 'status': /**         */ l$.piwik.id = '37'; break;
  case 'bookin': /**         */ l$.piwik.id = '38'; break;
  case 'stats': /**          */ l$.piwik.id = '39'; break;
  case 'drive': /**          */ l$.piwik.id = '40'; l$.piwik.mode = 'img'; break;
  case 'board': /**          */ l$.piwik.id = '41'; break;
  case 'drop': /**           */ l$.piwik.id = '42'; l$.piwik.mode = 'img'; break;
  case 'carte': /**          */ l$.piwik.id = '43'; break;
  case 'forms': /**          */ l$.piwik.id = '44'; break;
  case 'petition': /**       */ l$.piwik.id = '45'; break;
  case 'vox': /**            */ l$.piwik.id = '47'; break;
  case 'team': /**           */ l$.piwik.id = '48'; break;
  case 'memo': /**           */ l$.piwik.id = '49'; break;
  case 'talk': /**           */ l$.piwik.id = '50'; break;
  case 'minetest': /**       */ l$.piwik.id = '51'; break;
  case 'notes': /**          */ l$.piwik.id = '52'; break;
  case 'agenda': /**         */ l$.piwik.id = '53'; l$.piwik.mode = 'img'; break;
  case 'listes': /**         */ l$.piwik.id = '54'; break;
  case 'my': /**             */ l$.piwik.id = '56'; break;
  case 'troll': /**          */ l$.piwik.id = '57'; break;
  case 'slides': /**         */ l$.piwik.id = '58'; break;
  case 'maestro': /**        */ l$.piwik.id = '59'; break;
  case 'docs': /**           */ l$.piwik.id = '60'; break;
  case 'libre': /**          */ l$.piwik.id = '61'; break;
  case 'piaf': /**           */ l$.piwik.id = '62'; l$.piwik.mode = 'img'; break;
  case 'contributopia': /**  */ l$.piwik.id = '63'; break;
  case 'site': /**           */ l$.piwik.id = '64'; break;
  case 'wiki': /**           */ l$.piwik.id = '64'; break;
  case 'trad': /**           */ l$.piwik.id = '65'; break;
  case 'clic': /**           */ l$.piwik.id = '66'; break;
  case 'story': /**          */ l$.piwik.id = '67'; break;

  // no default
}

if (l$.piwik.id !== ''
    // Pas de Piwik si DoNotTrack
    // DNT est respecté mais on évite les notifications des uBlock, Ghostery, etc
    && !(navigator.doNotTrack === 'yes'
    || navigator.doNotTrack === '1'
    || navigator.msDoNotTrack === '1'
    || window.doNotTrack === '1')) {
  // Code Javascript
  if (l$.piwik.mode === 'js') {
    var _paq = _paq || []; // eslint-disable-line

    // Conformité CNIL
    _paq.push([function piwikCNIL() {
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
    // Code Piwik JS
    (function piwikJS() {
      const u = l$.piwik.url;
      _paq.push(['setTrackerUrl', [u, 'p.php'].join('')]);
      _paq.push(['setSiteId', l$.piwik.id]);
      const d = document;
      const g = d.createElement('script');
      const s = d.getElementsByTagName('script')[0];
      g.type = 'text/javascript'; g.defer = true; g.async = true;
      g.src = [u, 'p.js'].join(''); s.parentNode.insertBefore(g, s);
    }());
  // Code Piwik Image
  } else {
    (function piwikImg() {
      const d = document;
      const g = d.createElement('img');
      const s = d.getElementsByTagName('body')[0];
      g.style = 'border:0'; g.alt = '';
      g.src = [l$.piwik.url, 'p.php?idsite=', l$.piwik.id, '&rec=1'].join(''); s.appendChild(g);
    }());
  }

  // Framaclic
  (function framaclic() {
    const d = document;
    const g = d.createElement('img');
    const s = d.getElementsByTagName('body')[0];
    g.style = 'border:0'; g.alt = '';
    g.src = ['https://framaclic.org/h/', l$.piwik.id].join(''); s.appendChild(g);
  }());
}

/** ****************************************************************** *
 *                             Favicons                                *
 * ******************************************************************* */
l$.icons = l$.icons || {};

if (n$.is.url(/(agenda|bag|bee|bin|blog|board|bookin|book|calc|carte|cloud|code|colibri|date|drive|drop|dvd|forms|games|key|lab|lang|libre|link|listes|maestro|memo|mindmap|minetest|news|pack|phonie|piaf|pic|site|slides|sphere|start|stats|status|talk|team|tube|vectoriel|vox|wiki|zic)/i, 'h')
  || n$.is.url(/(bot.|contact.|degooglisons-internet|participer.|soutenir.)/i, 'h')) {
  l$.icons.apple = [n$.site, '.png'].join('');
  l$.icons.fav = ['fav_', n$.site, '.png'].join('');
}

if (n$.is.url(/(pad)/i, 'h')) {
  l$.icons.fav = 'fav_pad.png';
  l$.icons.apple = 'pad.png';
}

if (n$.is.url(/(framawiki)/i, 'h')) {
  l$.icons.fav = 'fav_wiki2.png';
  l$.icons.apple = 'wiki2.png';
}

/* Bandeau urgence
if (/(contact|degooglisons-internet|soft|listes)/.test(n$.site)) {
  l$.alert = [
    'warning',
    `<strong>Framalistes indisponible&nbsp;:</strong> victime de son succès,
    nous allons migrer Framalistes vers un serveur plus adapté, à partir du
    <strong>mardi 29/01/2019 à 21h</strong> (UTC+1).
    Le service devrait être coupé pendant environ 24h. Vos emails seront traités
    à l’issue de cette coupure.
    <a href="https://status.framasoft.org/incident/458">+ d’infos</a>`,
  ];
}
*/
