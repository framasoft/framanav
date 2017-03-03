 /***********************************************************************
 *                          Config des sites                           *
 ***********************************************************************/
// Pour savoir à quoi correspondent les options de config, aller à la fin
// de nav.js. La variable c$ contient toutes les valeurs par défaut ainsi
// que les explications pour comprendre à quoi ça correspond.

if(l$ == undefined || l$.constructor != Object) {
  var l$ = {};
}

// Alias
// On remplace juste la variable n$.site.
// Cette variable n'est utilisée que pour charger les fichiers ext_css,
// credits et placer un tracker sur un lien de la modale Soutenir
switch (n$.site) {
  case 'noenaute' : n$.site = 'pouhiou'; break;
  case 'huit.re' : n$.site = 'link'; break;
  case 'tontonroger' : n$.site = 'bee'; break;
  case 'trouvons' : n$.site = 'bee'; break;
}
// Config pour domaine et sous-domaine
if (i$(/framaboard/i, 'h'))        { n$.site = 'board' }
if (i$(/framadate/i, 'h'))         { n$.site = 'date' }

if (i$('mypads.framapad.org', 'h')) { n$.site = 'mypads' }
if ( (i$(/.framapad/i, 'h') && !i$(/mypads./i, 'h'))
    || (i$(/mypads.framapad/i, 'h') && i$('/p/')) ) {
  n$.site = 'etherpad';
}

switch (n$.site) {
  case 'agent':

    if( i$(/framatruc/i, 'h') ) {
    /** Test nouvelle config en prod **/

    } else {
    /** Config "agent" ailleurs (notamment sur /test/*.html) **/
      n$.name = 'Framapic';
      // Utilisation d'un hash pour switcher/test la config iframe
      if(i$('#iframe')) n$.inframe = true;
      // Conf de démo par défaut
      l$ = {
        css: { order: '012345', ext: true },
        footer: false,
        fixed: i$('fixed'),
        credits: 'pad'
      }
      // test/medias.html
      if(i$('media')) {
        l$ = {
          js: { video: true, audio: true, ext: true },
        }
      }
      // test/verbose.*.html
      if(i$('verbose')) {
        l$ = {
          js : { ext: true },
          fixed: i$('fixed'),
          modal: {
            don: ['a[href="index.html"]', 'd’utiliser','créer un pad'],
            info: [
              'Veggie ipsum',
              '<p>Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jÃ­cama salsify.</p>'+
              '<p>Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed collard greens nori. Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout chard.<p>'
            ]
          },
          optin: ['#email'],
          alert: [
            'info',
            'Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.'
          ]
        }
      }

    }
  break;

  case 'android':
    l$ = { fixed: true }
  break;

  case 'forum':
    n$.name = 'Framagora'
    l$ = {
      css: { order: '102345' },
      optin: ['#email_confirm', '#email'],
      footer: false
    }
  break;

  case 'bag':
    l$ = { mute: i$('framabag.org/u') }
  break;

  case 'bee':
    l$ = {
      js: {
        ext: function() { if( jQuery('.explain').length ) { jQuery('#q').focus() }; jQuery('.footer').hide(); jQuery('body').css('margin-bottom','0') }
      }
    }
  break;

  case 'bin':
    l$ = {
      js: { video: true },
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
          b$: 'html',
          ext: function() {
            jQuery('h1 .logo a').html('<b class="violet">Frama</b><b class="vert">board</b>');
            jQuery('h1 .logo').removeClass('logo');
            jQuery(
              'a[href$="?controller=UserCreationController&action=show&remote=1"],'+
              'a[href^="/?controller=UserViewController&action=external"],'+
              'input[name="is_ldap_user"]')
              .parent().hide();
          }
        },
        css: { order: '015234', b$: false, ext: true },
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
        ext: function() { jQuery('.ui-page').css('margin-top','-42px') }
      },
      css: { ext: i$('framabookin.org/b') },
      mute: i$('framabookin.org/b'),
      fixed: true,
      footer: !i$('framabookin.org/b')
    }
  break;

  case 'bot' :
    l$ = { mute: true, footer: false };
  break;

  case 'calc':
    // Calcs à onglets sont dans des frame
    try {
        if(top.location.href.indexOf('framacalc.org/=') > -1) {
            document.getElementById("framanav_container").style="height:42px; opacity:0";
            n$.inframe = false;
        }
    } catch(e) { }
    if (i$('framacalc.org/_start') || i$('https://framacalc.org/', 'u')) {
      // Si on est sur la page d'accueil
      l$.modal = {
        don: ['a[href*="framacalc.org/"]', 'd’utiliser', 'créer un calc']
      }
    } else { // dans Ethercalc
      l$ = {
        js: {
          ext: function() { jQuery(window).trigger('resize') }
        },
        css: {
          b$: !n$.inframe,
          ext: true
        },
        mobile: false,
        mute: true,
        footer: false,
        host: 'ovh'
      }
    }
  break;

  case 'carte':
    l$.modal = { don: ['a.btn-primary[href*="/map/new/"]', 'd’utiliser', 'créer une carte'] };

    if(i$('/map/') && !n$.inframe) {
      l$.mute = true;
      l$.footer = false;
      l$.css = { ext: true };
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
      css: { ext: true },
      mute: true,
      footer: false
    }
  break;

  case 'connard' :
    l$ = {
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

  case 'date':
    l$.js = { ext: i$('framadate.org', 'h') };
    if(i$Lang('fr')) {
      l$.modal = { don: ['a[href*="create_poll.php?"]', 'd’utiliser', 'créer un sondage'] };
      if(i$('create_poll.php?')) l$.optin ['#formulaire input#email'];
    }
  break;

  case 'degooglisons-internet':
    l$ = { mute: true }
  break;

  case 'docs':
    l$ = {
      js: {
        j$: 'noConflict',
        video : true
      },
      css: { ext: true },
      mute: true,
      footer: false
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
      fixed: true,
    }
    if( (i$('index.php/app') && !i$('registration')) || i$('index.php/setting') ) {
      l$.footer = false;
      l$.mute = true;
    } else {
      l$.js = { video: true };
    }
  break;

  case 'drop':
    l$.js = { video: true };
  break;

  case 'games':
    l$.modal = { don: ['.play a', 'd’utiliser', 'jouer'] };
  break;

  case 'key':
    l$ = {
      js: {
        ext: function () {
            jQuery('#sidebar a.wikilink[href$="SideBar?action=edit"]').attr('href',window.location.href+'?action=edit'); // Bouton edit
            jQuery('#sidebar div[style*="background-color: rgb(238"]:contains("Framablog")').hide(); // Flux RSS Framablog
        }
      },
      fixed: true,
      modal: { don: ['a[href*="files.framakey.org"]'] }
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

  case 'listes':
    l$ = {
      js: {
        ext: function() {
          f$('footer:not([id])').remove();
          f$('header .row, main.row').addClass('ombre');
          f$('header h1').css('margin-top','30px');
          f$('main').css('margin-bottom','30px');
        }
      }
    }
  break;

  case 'maestro':
    l$ = {
     js: { b$: 'html'},
      mute: i$('/p/')
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
        js: { video: true },
        css: { b$: false, ext: true },
        optin: ['#user #email'],
        mute: (!i$('framindmap.org/c/login') && !i$('framindmap.org/c/user/registration'))
      }
      if(i$('framindmap.org/c/maps/') && !i$('/edit')) {
        l$.modal = { don: ['onstart', 'd’utiliser', 'utiliser '+n$.name] }
      }
      if(i$('framindmap.org/c/maps') && i$('/edit')) {
        // [Fix] Suppression de la nav dans l'éditeur
        var f$_navcontainer = document.getElementById('framanav_container');
        f$_navcontainer.parentNode.removeChild(f$_navcontainer);
      }
    }
  break;

  case 'minetest':
    l$.js = { video: true };
    if(i$('/carte/')) {
      l$.mute = true;
      l$.footer = false;
    }
  break;

  case 'my':
    if(i$('source=bookmarklet')) {
      n$.inframe = true;
      l$ = {
        mute: true,
        footer: false
      }
    }
  break;

  case 'news':
    if(i$('framanews.org/ttrss')) {
      l$ = {
        js: {
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
      modal: { don: ['onstart', 'd’utiliser','utiliser '+n$.name] },
      mute: i$('/admin'),
      footer: !i$('/admin')
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
    n$.name = 'Framapad';
    l$ = {
      js: {
        ext: true
      },
      mute: true,
      footer: false,
      credits: 'pad',
      icons: {
        fav: 'fav_pad.png',
        apple: 'pad.png'
      }
    }
  break;

  case 'etherpad': // dans Etherpad
    n$.name = 'Framapad';
    l$ = {
      js: {
        ext: function () {
          jQuery('#loading').delay(2000).append('<p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br/>l’export <a href="'+location.href+'/export/html">html</a> ou <a href="'+location.href+'/export/txt">txt</a> de votre document et <a href="https://contact.framasoft.org/#framapad">contactez-nous</a>.</p>');
          if(!n$.inframe) {
            var addMaestroBtn = setInterval(function() {
              if(jQuery('#editbar .menu_right').length && !jQuery('#maestroBtn').length ) {
                jQuery('#editbar .menu_right').prepend(
                  '<li id="maestroBtn"><a title="Ajouter une visio-conférence" href="'+n$.maestro+'">'+
                    '<button class="buttonicon fa fa-video-camera" style="top:0 !important;"></button><span class="sr-only">Visio-conférence</span>'+
                  '</a></li>');
                clearInterval(addMaestroBtn);
              }
            }, 1000)
          }
        }
      },
      css: {
        b$: !n$.inframe,
        ext: !n$.inframe
      },
      mute: true,
      footer: false,
      credits: 'pad',
      icons: {
        fav: 'fav_pad.png',
        apple: 'pad.png'
      }
    }

    if(i$(/(lite6.|mypads.|quotidien.|hebdo.|uel.|mestriel.)/i, 'h')) {
      l$.modal = {
        info: [
          'Nouvelles fonctionnalités',
          '<p>Nous avons apporté des modifications au fonctionnement de Framapad.</p>'+
          '<ul style="margin-left:30px">'+
              '<li>Réactivation des couleurs d’identification (auteurs identifiés par le surlignage en couleur).</li>'+
              '<li>Possibilité d’afficher une table des matières, en fonction des titres utilisés dans votre pad.</li>'+
              '<li>Possibilité d’afficher le pad en mode « page ».</li>'+
              '<li>Affichage du nom des auteurs au survol du texte.</li>'+
              '<li>Possibilité d’annoter le document dans la marge et proposer du texte de remplacement.</li>'+
          '</ul>'+
          '<p>Ces modifications peuvent être activées/désactivées au niveau des paramètres de Framapad (roue crantée en haut à droite).</p>'+
          '<p>Pour plus d’informations, voir notre <a href="https://wiki.framasoft.org/projets/framapad">documentation</a>.</p>',
          'newFeatures201605',
          365*24*60*60*1000
        ]
      }
    }
    if(i$(/(beta.framapad)/i, 'h')) {
      l$.modal = {
        info: [
          'Avertissement',
          '<p>Cette instance de Framapad (<b>beta</b>.framapad.org) est instable et ne doit servir que pour des tests.<p>'+
          '<p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>'+
          '<p>Merci.<br />L’équipe technique</p>'
        ]
      }
    }
    if( i$(/(lite.framapad|lite[2-5].)/i, 'h')) {
      l$.modal = {
        info: [
          'Création des pads désactivée et passage prochain en lecture seule',
          '<p>Nous vous informons que cette instance de Framapad ('+n$.host+') ne peut plus accueillir de nouveaux pads.<p>'+
          '<p>Il reste bien évidement possible de travailler sur les pads déjà existants (ils ne seront pas supprimés)'+
          ' mais pour en créer de nouveaux, veuillez passer par <a href="https://framapad.org">la page d’accueil du site</a></p>'+
          '<p>De plus, nous passerons très prochainement les pads existants en lecture seule.<br>'+
          'Vous pourrez consulter le dernier contenu des pads ainsi que le contenu des révisions enregistrées (bouton « étoile »).<br>'+
          'Plus de détails sur <a href="https://status.framasoft.org/">https://status.framasoft.org/</a></p>'+
          '<p>Merci.<br />L’équipe technique</p>'
        ]
      };
      host = 'ovh';
    }
  break;
//-- </framapad> -------------------------------------------------------

  case 'participer':
    l$ = {
      js: { video: true },
      fixed: true
    }
  break;

  case 'phonie':
    l$ = {
      css: {
        order: '102345',
        ext: true
      },
      footer: false
    }
  break;

  case 'pic':
    l$ = {
      js: { video: true },
      modal: { don: ['onstart', 'd’utiliser','utiliser '+n$.name] }
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

  case 'pouhiou': // pouhiou.com + noenaute.fr
    l$ = {
      css: { frama: false },
      mute: true,
      footer: false,
      icons: { keep: true }
    }
  break;

  case 'soft':
    l$ = {
      fixed: true,
      icons: {
        fav: 'favicon-violet.png',
        apple: 'soft.png'
      }
    }
    if(!i$('https://framasoft.org/', 'u') && !i$(/org\/accueil|org\/nav/i, 'u')) { // dans l'annuaire
      l$ = {
        js: {
          ext: function() { // Mise en forme « Juste une image »
            flickr_t = jQuery('img[src$="_t.jpg"]').attr('src');
            if(flickr_t) {
              flickr_m = flickr_t.replace('_t.jpg', '_m.jpg');
              jQuery('img[src$="_t.jpg"]').attr('src', flickr_m).css('width', '90%');
            }
          }
        },
        optin: ['#email_auteur'],
        credits: 'libre',
        fixed: true,
        icons: {
          fav: 'fav_libre.png',
          apple: 'libre.png'
        }
      }
    }
  break;

  case 'sphere':
    l$ = {
      js: {
        ext: function() { jQuery('link[href*=bootstrap-complete]').remove(); }
      },
      css: { order: '102345' }
    }
  break;

  case 'stats':
    l$ = { fixed: true }
  break;


  case 'status':
    l$ = {
      js: {
        ext: function() {
          jQuery('.section-components:eq(0) li.sub-component').each(function() {
            var framatruc = jQuery(this).children('a');
            framatruc.after('<span class="col-xs-1 pull-right"><a href="https://contact.framasoft.org/#'+framatruc.text().split(' ', 1)[0].toLowerCase().replace(/è/g, 'e')+'" class="btn btn-success btn-outline btn-xs" title="Signaler une panne concernant '+framatruc.text()+'"><i class="fa fa-fw fa-lg fa-bug" aria-hidden="true"></i><span class="sr-only">Signaler</span></a></span>')
          });
          jQuery('.section-components:eq(0) li.sub-component a.btn[title]').tooltip();
        }
      },
      mute: true,
      footer: false,
      fixed: true
    }
  break;

//-- <framateam> -------------------------------------------------------
  case 'team':
    l$ = {
      js: { j$: 'noConflict', b$: 'html', ext: true },
      css: { ext: true },
      fixed: true,
      mute: ( i$('/channel') || i$('/tutorial') || i$('/admin_console') || i$('/pl/') ),
      donate: false
    }
  break;

  case 'docs.team':
    l$ = {
      fixed: true,
      footer: false,
      mute: true
    }
  break;
//-- </framateam> ------------------------------------------------------

  case 'tube':
    n$.inframe = i$('/embed_player');
    l$ = {
      js: { video: true },
      host: 'ovh',
      alert: [
        'info',
        '<b class="violet">Frama</b><b class="rouge">tube</b> est réservé à l’usage exclusif de <b class="violet">Frama</b><b class="orange">soft</b> pour le moment.'+
        '<br/>L’hebergement de vidéos sera <a href="https://degooglisons-internet.org/liste/#2017">ouvert au public en 2017</a> si nous en avons les moyens.'
      ],
      mute: i$('/embed_player')
    }
  break;

  case 'vectoriel':
    if(i$('svg-editor')) { // Dans SVG-Editor
      l$ = {
        css: {
          b$: !n$.inframe,
          ext: !n$.inframe
        },
        mute: true,
        footer: false
      }
    } else {
      l$ = {
        js: { video: true },
        modal: { don: ['a[href="/svg-editor.html"]', 'd’utiliser', 'créer une image'] }
      }
    }
  break;

  case 'vox':
    l$ = {
      js: { video: i$('/marketing') },
      css: { ext: true },
      fixed: !i$('/marketing')
    }

    if( !i$(/(\/marketing|users\/sign|\/start_group|users\/password\/new)/i, 'u') ) {
      l$.footer = false;
      l$.mute = true;
      l$.js.ext = true;
    }
  break;

  case 'wiki':
    n$.inframe = i$('mediamanager.php');
    l$ = {
      css: { ext: true },
      alert: ['', '']
    }
  break;

  case 'zic':
    l$ = {
      js: { video : true },
      fixed: true
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
  case 'memo' :                  l$.piwik.id = '49'; break;
  case 'talk' :                  l$.piwik.id = '50'; break;
  case 'minetest' :              l$.piwik.id = '51'; break;
  case 'notes' :                 l$.piwik.id = '52'; break;
  case 'agenda' :                l$.piwik.id = '53'; break;
  case 'listes' :                l$.piwik.id = '54'; break;
  case 'my' :                    l$.piwik.id = '56'; break;
  case 'troll' :                 l$.piwik.id = '57'; break;
  case 'slides' :                l$.piwik.id = '58'; break;
  case 'maestro' :               l$.piwik.id = '59'; break;
  case 'docs' :                  l$.piwik.id = '60'; break;
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
    _paq.push(["setTrackerUrl", u+"p.php"]);
    _paq.push(["setSiteId", l$.piwik.id]);
    var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
    g.defer=true; g.async=true; g.src=u+"p.js"; s.parentNode.insertBefore(g,s);
  })();
}

/***********************************************************************
 *                             Favicons                                *
 **********************************************************************/
l$.icons = (l$.icons == undefined) ? {} : l$.icons ;

if (i$(/(phonie)/i,'h')) {
  l$.icons.fav = 'favicon-jaune.png';
}

if ( i$(/(agenda|android|bag|bee|bin|blog|board|bookin|book|calc|carte|cloud|code|colibri|date|drive|drop|dvd|forms|games|key|lab|lang|link|listes|maestro|memo|mindmap|minetest|news|pack|pad|phonie|pic|slides|sphere|start|stats|status|talk|team|tube|vectoriel|vox|zic)/i,'h')
   || i$(/(bot.|contact.|degooglisons-internet|forum.|participer.|soutenir.|wiki.)/i,'h') ){
  l$.icons.apple = n$.site+'.png';
  l$.icons.fav = 'fav_'+n$.site+'.png';
}
