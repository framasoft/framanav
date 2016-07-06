/***********************************************************************
 *                          Config des sites                           *
 ***********************************************************************/

var l$ = {};

// Alias
// On remplace juste la variable n$.site.
// Cette variable n'est utilisée que pour charger les fichiers ext_css,
// credits et placer un tracker sur un lien de la modale Soutenir
switch (n$.site) {
  case 'noenaute' : n$.site = 'pouhiou'; break;
  case 'huit.re' : n$.site = 'frama.link'; break;
  case 'tontonroger' : n$.site = 'framabee'; break;
  case 'trouvons' : n$.site = 'framabee'; break;
}

//i$(/framaboard)/i, 'h')
if (n$.host.indexOf('framaboard') > -1) { n$.site = 'board'; }

//i$(/framadate)/i, 'h')
if (n$.host.indexOf('framadate') > -1)  { n$.site = 'date'; }

if (i$('mypads.framapad.org', 'h')) {
  n$.site = 'mypads';
}

//i$(/.framapad)/i, 'h') etc
if ((n$.host.indexOf('.framapad') > -1 && !(n$.host.indexOf('mypads.') > -1))
    || (n$.host.indexOf('mypads.framapad') > -1 && i$('/p/'))) {
  n$.site = 'etherpad';
}

switch (n$.site) {
  case 'agent':
    n$.name = 'Framapic';
    l$ = {
      js: { video: true, ext: true },
      css: { order: '012345', ext: true },
      footer: false,
      modal: { don: ['a[href*=".framapad.org/p/"]', 'd’utiliser','créer un pad'] }
    }
  break;
  case 'bot' :
    l$ = { mute: true, footer: false };
  break;

  case 'connard' :
    l$ = {
      js: { j$: 'noConflict' },
      css: { frama: false },
      mute: true,
      icons: { keep: true },
      footer: false
    }
  break;

  case 'contact':
    l$ = {
      js: { ext: true },
      css: { ext: true },
      fixed: true,
      optin: ['#wpcf7-f24-p5-o1 .wpcf7-email'],
    }
  break;

  case 'degooglisons-internet':
    l$ = { mute: true }
  break;

  case 'forum':
    l$ = {
      css: { order: '102345' },
      optin: ['#email_confirm', '#email'],
      footer: false
    }
  break;

  case 'link':
    l$ = {
      js: { video: true },
      modal: {
        don : ['onstart', 'd’utiliser', 'utiliser '+n$.name]
      }
    }
  break;

  case 'bag':
    if(i$('framabag.org/u')) {
      l$ = {
        js: { j$: 'html', b$: 'html' },
        mute: true
      }
    }
  break;

  case 'bee':
    l$ = {
      js: {
        j$: 'html', b$: 'html',
        ext: function() { jQuery('#q').focus(); jQuery('.footer').hide(); jQuery('body').css('margin-bottom','0') }
      }
    }
  break;

  case 'bin':
    l$ = {
      js: {j$: 'html', video: true },
      modal: {
        don: ['onstart', 'd’utiliser', 'utiliser '+n$.name]
      }
    }
  break;

  case 'blog':
    l$ = {
      js: { audio: true, video: true },
      optin: ['#commentform #email'],
      fixed : true
    }
  break;

  case 'board':
    if (i$('.framaboard')) { // dans Kanboard
      l$ = {
        js: {
          j$: 'html', b$: 'html',
          ext: function() {
            jQuery('h1 .logo a').html('<b class="violet">Frama</b><b class="vert">board</b>');
            jQuery('h1 .logo').removeClass('logo');
          }
        },
        css: { b$: false }, // board.css chargé en dur en amont de nav.css et frama.css ; tester en remplaçant par "order: 015234"
        footer: false,
        mute: true
      }
    } else {
      l$.optin = ['#registration #email'];
    }
  break;

  case 'book':
    l$ = {
      fixed : true,
      modal: { don: ['a[href*="download-monitor/download.php?id="]'] }
    }
  break;

  case 'bookin':
    l$ = {
      js: {
        j$: 'html',
        ext: function() { jQuery('.ui-page').css('margin-top','-42px') }
      },
      fixed: true
    }
    if (i$('framabookin.org/b')) {
      l$.css.ext = true;
      l$.mute = true;
      l$.footer = false;
    }
  break;

  case 'calc':
    // Calcs à onglets sont dans des frame
    if(top.location.href.indexOf('framacalc.org/=') > -1) {
      document.getElementById("framanav_container").style="height:42px; opacity:0";
      n$.inframe = false;
    }
    if (i$('framacalc.org/_start') || i$('https://framacalc.org/', 'u')) {
      // Si on est sur la page d'accueil
      l$.modal.don = ['a[href*="framacalc.org/"]', 'd’utiliser', 'créer un calc'];

    } else { // dans Ethercalc
      l$ = {
        js: {
          j$: 'noConflict',
          ext: function() { jQuery(window).trigger('resize') }
        },
        css: {
          b$: !n$.inframe,
          ext: !n$.inframe
        },
        mobile: false,
        mute: true,
        footer: false,
        host: 'ovh'
      }
    }
  break;

  case 'carte':
    l$.modal.don = ['a.btn-primary[href*="/map/new/"]', 'd’utiliser', 'créer une carte'];

    if(i$('/map/') && !n$.inframe) {
      l$.mute = true;
      l$.footer = true;
      l$.css.ext = true;
    }
  break;

  case 'cloud':
    l$ = {
      js: { audio: true, video: true },
      fixed: true,
      optin: ['#commentform #email']
    }
  break;


  case 'colibri':
    l$ = {
      js: { j$ : 'noConflict' },
      css: { ext: true },
      mute: true,
      footer: false
    }
  break;

  case 'date':
    l$.js = {j$: 'html', b$ : 'html' };

    if(i$Lang('fr')) {
      l$.modal.don = ['a[href*="create_poll.php?"]', 'd’utiliser', 'créer un sondage'];
      if(i$('create_poll.php?')) {
        l$.optin ['#formulaire input#email'];
      }
    }
    if( i$('framadate.org', 'h') ) {
      l$.js.ext = function(){ jQuery.getScript('/_charts/extra.js') };
    }
  break;

  case 'dvd':
    l$ = {
      js: { video : true },
      modal: { don: ['a[href*="iso.framadvd.org"]'] },
      fixed: true
    }
  break;

  case 'drive':
    l$ = {
      js: { j$: 'html', b$: 'html' },
      fixed: true,
    }
    if( (i$('index.php/app') && !i$('registration')) || i$('index.php/setting') ) {
      l$.footer = false;
      l$.mute = true;
    } else {
      l$.js.video = true;
    }
  break;

  case 'drop':
    l$.js.video = true;
  break;

  case 'games':
    l$.modal.don = ['.play a', 'd’utiliser', 'jouer'];
  break;

  case 'key':
    l$ = {
      js: {
        j$: 'noConflict',
        ext: function () {
            jQuery('#sidebar a.wikilink[href$="SideBar?action=edit"]').attr('href',window.location.href+'?action=edit'); // Bouton edit
            jQuery('#sidebar div[style*="background-color: rgb(238"]:contains("Framablog")').hide(); // Flux RSS Framablog
        }
      },
      fixed: true,
      modal: { don: ['a[href*="files.framakey.org"]'] }
    }
  break;

  case 'android':
    l$ = { fixed: true }
  break;

  case 'news':
    if(i$('framanews.org/ttrss')) {
      l$ = {
        js: {
          j$: 'noConflict',
          ext: function() { jQuery(window).trigger('resize') }
        },
        css: { ext: true },
        mute: true,
        footer: false
      }
    }
  break;

  case 'pack':
    l$ = {
      js: { j$: 'html', b$: 'html' },
      modal: { don: ['onstart', 'd’utiliser','utiliser '+n$.name] }
    }
  break;

//-- <framapad> --------------------------------------------------------
  case 'pad':
    l$ = {
      js: { video: true },
      modal: { don: ['a[href*=".framapad.org/p/"]', 'd’utiliser','créer un pad'] }
    }
  break;

  case 'mypads':
    l$ = {
      js: {
        j$ : 'html',
        ext: function() {
          setInterval(function() {
            if(jQuery('section.pad iframe').length > 0) {
              jQuery('main section.col-md-9').removeClass('col-md-9').addClass('col-md-12');
              jQuery('main aside.col-md-3').removeClass('col-md-3').addClass('col-md-12');
            } else {
              jQuery('main section.col-md-12').removeClass('col-md-12').addClass('col-md-9');
              jQuery('main aside.col-md-12').removeClass('col-md-12').addClass('col-md-3');
            }
          }, 1000)
        }
      },
      mute: true,
      footer: false,
      credits: 'pad',
      icons: { apple: 'pad.png' }
    }
  break;

  case 'etherpad': // dans Etherpad
    l$ = {
      js: {
        j$: 'html',
        ext: function () {
            jQuery('#loading').append('<p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br/>l’export <a href="'+location.href+'/export/html">html</a> ou <a href="'+location.href+'/export/txt">txt</a> de votre document et <a href="https://contact.framasoft.org/#framapad">contactez-nous</a>.</p>');
            jQuery('#exportopena, #exportetherpada').hide();
        }
      },
      css: {
        b$: !n$.inframe,
        ext: !n$.inframe
      },
      mute: true,
      footer: false,
      credits: 'pad',
      icons: { apple: 'pad.png' }
    }

    if(i$(/(lite6.|mypads.|quotidien.|hebdo.|uel.|mestriel.)/i, 'h')) {
      modal.info[0] = 'Nouvelles fonctionnalités';
      modal.info[1] =
          '<p>Nous avons apporté des modifications au fonctionnement de Framapad.</p>'+
          '<ul style="margin-left:30px">'+
              '<li>Réactivation des couleurs d’identification (auteurs identifiés par le surlignage en couleur).</li>'+
              '<li>Possibilité d’afficher une table des matières, en fonction des titres utilisés dans votre pad.</li>'+
              '<li>Possibilité d’afficher le pad en mode « page ».</li>'+
              '<li>Affichage du noms des auteurs au survol du texte.</li>'+
          '</ul>'+
          '<p>Ces modifications peuvent être activées/désactivées au niveau des paramètres de Framapad (roue crantée en haut à droite).</p>'+
          '<p>Pour plus d’informations, voir notre <a href="https://wiki.framasoft.org/projets/framapad">documentation</a>.</p>';
      modal.info[2] = 'newFeatures201605';
      modal.info[3] = 365*24*60*60*1000;
    }
    if(i$(/(beta.framapad)/i, 'h')) {
      modal.info[0] = 'Avertissement';
      modal.info[1] = '<p>Cette instance de Framapad (<b>beta</b>.framapad.org) est instable et ne doit servir que pour des tests.<p>'+
          '<p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>'+
          '<p>Merci.<br />L’équipe technique</p>';
    }
    if( i$(/(lite.framapad|lite[2-5].)/i, 'h')) {
      modal.info[0] = 'Création des pads désactivée';
      modal.info[1] = '<p>Nous vous informons que cette instance de Framapad ('+window.location.host+') ne peut plus accueillir de nouveaux pads.<p>'+
          '<p>Il reste bien évidement possible de travailler sur les pads déjà existants (ils ne seront pas supprimés)'+
          ' mais pour en créer de nouveaux, veuillez passer par <a href="https://framapad.org">la page d’accueil du site</a></p>'+
          '<p>Merci.<br />L’équipe technique</p>';
      host = 'ovh';
    }
  break;
//-- </framapad> -------------------------------------------------------

  case 'phonie':
    l$ = {
      js: { j$: 'noConflict' },
      css: {
        order: '102345',
        ext: true
      },
      footer: false
    }
  break;

  case 'pic':
    l$ = {
      js: {
        j$: 'noConflict',
        video: true
      },
      modal: { don: ['onstart', 'd’utiliser','utiliser '+n$.name] }
    }
  break;

  case 'soft':
    l$ = {
      fixed: true,
      optin: ['#email_auteur']
    }

    if(!i$('http://framasoft.org/', 'u') && !i$('framasoft.org/accueil')
        && !i$('framasoft.org/nav')) {
      l$.js.ext = function() { // Mise en forme « Juste une image »
        flickr_t = jQuery('img[src$="_t.jpg"]').attr('src');
        if(flickr_t) {
          flickr_m = flickr_t.replace('_t.jpg', '_m.jpg');
          jQuery('img[src$="_t.jpg"]').attr('src', flickr_m).css('width', '90%');
        }
      }
      l$.credits = 'libre';
      l$.icons.fav = 'favicon-bleu.png';
      l$.icons.apple = 'libre.png';
    }
  break;

  case 'sphere':
    l$ = {
      js: {
        j$: 'html', b$: 'html',
        ext: function() { jQuery('link[href*=bootstrap-complete]').remove(); }
      },
      css: {order: '102345' }
    }
  break;

  case 'stats':
    l$ = {
      js: { j$: 'html', b$: 'html' },
      fixed: true
    }
  break;

  case 'team':
    l$ = {
      js: { j$: 'html', b$: 'html', ext: true },
    }

    if(i$('/channel')||i$('/admin_console')||i$('/pl/')) {
      l$.fixed = true;
      l$.footer = false;
      l$.mute = true;
    } else {
      l$.css.ext = true;
    }
  break;

  case 'docsteam':
    l$ = {
      fixed: true,
      footer: false,
      mute: true
    }
  break;

  case 'tube':
    l$ = {
      js: { j$: 'html', video: true },
      host: 'ovh',
      alert: [
        'info',
        '<b class="violet">Frama</b><b class="rouge">tube</b> est réservé à l’usage exclusif de <b class="violet">Frama</b><b class="orange">soft</b> pour le moment.'+
        '<br/>L’hebergement de vidéos sera <a href="https://degooglisons-internet.org/liste/#2017">ouvert au public en 2017</a> si nous en avons les moyens.'
      ]
    }

    if(i$('/embed_player')) {
      n$.inframe = true;
      l$.mute = true;
    }
  break;

  case 'vectoriel':
    if(i$('svg-editor')) { // Dans SVG-Editor
      l$ = {
        js: { j$: 'noConflict' },
        css: {
          b$: !n$.inframe,
          ext: !n$.inframe
        },
        mute: true,
        footer: false
      }
    } else {
      l$.modal.don = ['a[href="/svg-editor.html"]', 'd’utiliser', 'créer une image'];
      l$.js.video = true;
    }
  break;

  case 'vox':
    l$ = {
      js: { j$: 'html' },
      css: { ext: true }
    }

    l$.fixed = !(i$('/marketing'));
    l$.js.video = i$('/marketing');

    if(!(i$('/marketing')||i$('users/sign')||i$('/start_group')||i$('users/password/new'))) {
      l$.footer = false;
      l$.mute = true;
      l$.js.ext = true;
    }
  break;

  case 'zic':
    l$ = {
      js: { video : true },
      fixed: true
    }
  break;

  case 'mindmap':
    if(i$('framindmap.org/mindmaps')) { // Dans Mindmaps
      l$ = {
        js: { j$: 'noConflict' },
        css: { ext: true },
        mute: true,
        footer: false
      }
    } else { // Dans Wisemapping (et accueil)
      l$ = {
        js: { j$: 'html', b$: 'html', video: true },
        css: { b$: false, ext: true },
        optin: ['#user #email']
      }

      l$.mute = (!i$('framindmap.org/c/login') && !i$('framindmap.org/c/user/registration'));

      if(i$('framindmap.org/c/maps/') && !i$('/edit')) {
        l$.modal.don = ['onstart', 'd’utiliser', 'utiliser '+n$.name]
        // [Fix] Suppression de la nav dans l'éditeur
        var f$_navcontainer = document.getElementById('framanav_container');
        f$_navcontainer.parentNode.removeChild(f$_navcontainer);
      }
    }
  break;

  case 'participer':
    l$ = {
      js: { video: true },
      fixed: true
    }
  break;

  case 'pouhiou': // pouhiou.com + noenaute.fr
    l$ = {
      js: { j$: 'noConflict' },
      css: { frama: false },
      mute: true,
      footer: false,
      icons: { keep: true }
    }
  break;

  case 'pootle':
    l$ = {
      css: {
        order: '102345',
        frama: false, // en attente
        ext: true
      },
      mute: true
    }
  break;

  case 'status':
    l$ = {
      js: { j$: 'html' },
      mute: true,
      footer: false,
      fixed: true,
      icons: { apple: 'apple-orange.png' }
    }
  break;

  case 'wiki':
    l$ = {
      js: { j$: 'noConflict' },
      css: { ext: true },
      alert: ['']
    }
  break;
}

/***********************************************************************
 *                               Piwik                                 *
 **********************************************************************/
l$.piwik = {
  id: '',
  url: 'https://stats.framasoft.org/'
};

switch (n$.site) {
  case 'soft' :                  l$.piwik.id = '1';  break;
  case 'forum' :                 l$.piwik.id = '2';  break;
  case 'blog' :                  l$.piwik.id = '3';  break;
  case 'pad' :                   l$.piwik.id = '4';  break;
  case 'etherpad' :              l$.piwik.id = '4';  break;
  case 'key' :                   l$.piwik.id = '5';  break;
  case 'dvd' :                   l$.piwik.id = '6';  break;
  case 'book' :                  l$.piwik.id = '7';  break;
  case 'tube' :                  l$.piwik.id = '8';  break;
  case 'zic' :                   l$.piwik.id = '9';  break;
  case 'date' :                  l$.piwik.id = '10'; break;
  case 'calc' :                  l$.piwik.id = '11'; break;
  case 'mindmap' :               l$.piwik.id = '12'; break;
  case 'vectoriel' :             l$.piwik.id = '13'; break;
  case 'phonie' :                l$.piwik.id = '14'; break;
  case 'wiki' :                  l$.piwik.id = '15'; break;
  case 'lab' :                   l$.piwik.id = '16'; break;
  case 'code' :                  l$.piwik.id = '17'; break;
  case 'soutenir' :              l$.piwik.id = '18'; break;
  case 'contact' :               l$.piwik.id = '19'; break;
  case 'news' :                  l$.piwik.id = '20'; break;
  case 'bag' :                   l$.piwik.id = '21'; break;
  case 'android' :               l$.piwik.id = '22'; break;
  case 'start' :                 l$.piwik.id = '23'; break;
  case 'pack' :                  l$.piwik.id = '24'; break;
  case '10ans' :                 l$.piwik.id = '25'; break;
  case 'sphere' :                l$.piwik.id = '26'; break;
  case 'bee' :                   l$.piwik.id = '27'; break;
  case 'games' :                 l$.piwik.id = '28'; break;
  case 'git' :                   l$.piwik.id = '29'; break;
  case 'degooglisons-internet' : l$.piwik.id = '30'; break;
  case 'pic' :                   l$.piwik.id = '31'; break;
  case 'link' :                  l$.piwik.id = '32'; break;
  case 'participer' :            l$.piwik.id = '33'; break;
  case 'colibri' :               l$.piwik.id = '33'; break;
  case 'bin' :                   l$.piwik.id = '34'; break;
  case 'cloud' :                 l$.piwik.id = '35'; break;
  case 'status' :                l$.piwik.id = '37'; break;
  case 'bookin' :                l$.piwik.id = '38'; break;
  case 'stats' :                 l$.piwik.id = '39'; break;
  case 'drive' :                 l$.piwik.id = '40'; l$.piwik.url = 'https://framadrive.org/'; break;
  case 'board' :                 l$.piwik.id = '41'; break;
  case 'drop' :                  l$.piwik.id = '42'; break;
  case 'carte' :                 l$.piwik.id = '43'; break;
  case 'forms' :                 l$.piwik.id = '44'; break;
  case 'petition' :              l$.piwik.id = '45'; break;
  case 'vox' :                   l$.piwik.id = '47'; break;
  case 'team' :                  l$.piwik.id = '48'; break;
}

if(l$.piwik.id != '') {
  var _paq = _paq || [];

  _paq.push([function() {
    var self = this;
    function getOriginalVisitorCookieTimeout() {
      var now = new Date(),
      nowTs = Math.round(now.getTime() / 1000),
      visitorInfo = self.getVisitorInfo();
      var createTs = parseInt(visitorInfo[2]);
      var cookieTimeout = 33696000; // 13 mois en secondes
      var originalTimeout = createTs + cookieTimeout - nowTs;
      return originalTimeout;
    }
    this.setVisitorCookieTimeout( getOriginalVisitorCookieTimeout() );
  }]);

  _paq.push(["trackPageView"]);
  _paq.push(["enableLinkTracking"]);

  (function() {
    var u=l$.piwik.url;
    _paq.push(["setTrackerUrl", u+"piwik.php"]);
    _paq.push(["setSiteId", l$.piwik.id]);
    var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
    g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
  })();
}

/***********************************************************************
 *                             Favicons                                *
 **********************************************************************/
if (i$(/(dvd|key|libre|android|pack|start)/i,'h')) {
  l$.icons.fav = 'favicon-bleu.png';
}
if (i$(/(blog|book|lang|tube|zic)/i,'h')) {
  l$.icons.fav = 'favicon-rouge.png';
}
if (i$(/(link|bag|bee|bin|calc|carte|cloud|date|forms|games|git|news|pad|petition|pic|sphere|team|vectoriel|vox|mindmap|board|drive|drop)/i,'h')) {
  l$.icons.fav = 'favicon-vert.png';
}
if (i$(/(forum.|code|lab|phonie|wiki.)/i,'h')) {
  l$.icons.fav = 'favicon-jaune.png';
}
if (i$(/(contact.|participer.|soutenir.|stats|status.)/i,'h')) {
  l$.icons.fav = 'favicon-orange.png';
}

if (i$(/(bot.|contact.|degooglisons-internet|forum.|bag|bee|bin|blog|board|bookin|book|calc|carte|cloud|code|colibri|date|drive|drop|dvd|games|key|lab|lang|link|android|news|pack|pad|phonie|pic|soft|sphere|start|stats|team|tube|vectoriel|vox|zic|mindmap|participer.|soutenir.|wiki.)/i,'h')) {
  l$.icons.apple = n$.site+'.png';
}
