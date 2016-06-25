/****************
 *  Conventions *
 ****************
 f$() = alias jQuery
 f$Example() et i$Example() = fonctions globale
 f$_  = variables

 j$ = jQuery
 b$ = Bootstrap

 n${} = variables globales de la nav
 d${} = données (texte, liens, icônes, couleurs, etc)
 c${} = config du site
 l${} = config locale des sites
 **/

var n$ = {
  version: '160621', // n° version de la nav
  f$ : '1.12.4',     // n° version de notre jQuery
  b$ : '3.3.6',      // n° version de Bootsrap
  host: window.location.host,
  url: window.location.href,
  inframe: top.location!=self.document.location,
  nav: {
    url: '',
    set: false,
    html: '<div id="framanav_container" class="hidden-print" style="height:42px; opacity : 0"></div>'
  },
  browser: {
    agent: navigator.userAgent,
    opera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    firefox: typeof InstallTrigger !== 'undefined',
    safari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    chrome: !!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0),
    ie: /*@cc_on!@*/false || !!document.documentMode
  }
};
  n$.site = n$.host.replace(/^(www|test)\./i,'').replace(/\.(com|net|org|fr|pro)$/i,''); // Domaine et sous-domaine
  n$.name = n$.site[0].toUpperCase()+n$.site.slice(1);                                   // Nom du service
  n$.site = n$.site.replace(/(\.framasoft|frama\.)/i,'')
                   .replace(/framand/i,'and')
                   .replace(/framin/i,'min')
                   .replace(/frama/i,'');

n$.name = 'Framapic';

  if (n$.inframe) { n$.nav.html = '<div id="framanav_container" style="display:none"></div>' };

  if (window.jQuery === undefined) {
    n$.j$ = 'ø';    // n° version du jQuery local
  } else {
    n$.j$ = window.jQuery.fn.jquery;
    f$ = jQuery;   // alias (on l'écrase plus bas mais ça permet de pouvoir l'utiliser plus tôt)
  }

var d$ = {};

// console n'existe pas sur IE8
(function() {
  if (!window.console) {
    window.console = {};
  }
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  for (var i = 0; i < m.length; i++) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = function() {};
    }
  }
})();

/*******************
 *  Config globale
 *******************/
var f$_start_config = function() {
    n$.nav.speed = (n$.nav.set) ? '☀' : '☁';
    if (l$) {
        console.log('✔ '+n$.nav.speed+' config.js '+n$.version+' | '+n$.f$+' | '+n$.j$);

        if(i$('/nav/html/')) { // Si pages « À propos » on réinit la config
            c$.js[0] = 'jQuery';
            f$_bootstrap_css = false;
            c$.js.b$ = true;
            c$.footer = true;
            c$.icons.apple = 'soft.png';
        }

        if(c$.mute) {
          c$.alert[1] = '';      // Pas de bandeau
          c$.modal.info[1] = ''; // Pas de modale
          c$.modal.don[0] = '';
          c$.donate = false;     // Pas de macaron
        }

        switch (c$.js[0]) {
            case 'jQuery' :
                if (window.jQuery === undefined || window.jQuery.fn.jquery !== n$.f$) {
                    console.log('✔ jQuery '+n$.f$+' AJAX');
                    f$LoadJS(f$_nav+'lib/jquery/jquery.min.js', f$_start_jquery);
                } else {
                    console.log('✔ jQuery '+n$.j$+' HTML');
                    f$_start_jquery();
                }
            break;
            case 'noConflict' :
                console.log('✔ jQuery.noConflict '+n$.f$+' AJAX');
                f$LoadJS(f$_nav+'lib/jquery/jquery.min.js', f$_start_jquery);
            break;
            default:
                if (window.jQuery === undefined) {
                    console.error('✘ jQuery');
                } else {
                    console.log('✔ jQuery '+window.jQuery.fn.jquery+' HTML');
                    f$_start_jquery();
                }
            break;
        }

    } else {
        console.error('✘ '+n$.nav.speed+' config.js '+n$.version);
    }
}; // ---> jQuery

/*******************
 *     Nav init
 *******************/
var f$_scripts = document.getElementsByTagName('script');

/** Deprecated **/
var f$_nav = n$.nav.url;

var f$_nav_init = function() {
    for (var i = 0; i < f$_scripts.length; i++) {
        if (f$_scripts[i].getAttribute("src") && f$_scripts[i].getAttribute("src").indexOf("/nav.js") > -1) {
            // Emplacement de la nav ('/nav/', '/static/nav/, '../nav/' → 'http://'+n$.site+'/nav')
            f$_nav = f$_scripts[i].getAttribute("src").replace('nav.js','');
            f$_nav = f$Link(f$_nav);
            // On ajout une div vide de 42px qui contiendra la nav (évite les sauts de mise en page avant le chargement des fichiers)
            if (f$_scripts[i].parentNode.tagName.toLowerCase() == 'body' ) {
                // si nav.js est appelé en haut du body, c'est super rapide
                document.write(n$.nav.html);
                n$.set = true;
            } // sinon c'est dans le head, il faut attendre document.ready (voir plus bas)
        }
    }

    f$LoadJS(f$_nav+'config.js?'+n$.version, f$_start_config);
}; // ---> config.js

f$_nav_init();

/*******************
 *     jQuery
 *******************/
function f$_start_jquery() {
    /*
     * CSS
     */
    // Bootstrap
    if (f$_bootstrap_css) {
        f$LoadCSS(f$_nav+'lib/bootstrap/css/bootstrap.min.css', f$_css_position, 'all');
    }

    // Font-awesome
    f$LoadCSS(f$_nav+'lib/font-awesome/css/font-awesome.min.css','end','all');

    // Nav.css
    f$LoadCSS(f$_nav+'css/nav.css?'+n$.version);

    // Frama.css
    if(f$_frama_css) {
        f$LoadCSS(f$_nav+'css/frama.css?'+n$.version, 'end', 'all');
    }

    // Ext.css
    if(f$_ext_css) {
        f$LoadCSS(f$_nav+'ext/'+n$.site+'.css?'+n$.version);
    }

    /*
     * Nav
     */
    switch (c$.js[0]) {
        case 'noConflict': var f$ = jQuery.noConflict(); break;
        default          : var f$ = jQuery;break;
    }

    f$(document).ready(function() {
        if (i$('https://framacalc.org/_start', 'u') && f$('html').attr('manifest') !== 'manifest.appcache') {
            console.log('Reloading https://framacalc.org/_start because of bad _start version');
            window.location.href = 'https://framacalc.org/_start?reload=1';
        }

        // Ext.js
        if (typeof c$.js.ext === "function") {
            c$.js.ext();
        } else if(c$.js.ext) {
            f$.getScript(f$_nav+'ext/'+n$.site+'.js');
        }

        f$.ajaxSetup({ cache: true });

        if(!n$.nav.set) {
            f$('body').prepend(n$.nav.html);
        }

        // On charge ensuite les données
        f$.getJSON( f$_nav+'html/data.fr.json' )
        .fail(function() {
            console.error('✘ data.fr.json');
        })
        .done(function(data) {

          // Formatage et traitement des données
          d$ = data; /** passage en global pour lecture dans la console **/
          var f$_color = ''; var f$_menu = ''; var f$_popover = '';
          for (var k in d$.menus) { d$.menus[k].nav ='' }
          d$.menus.follow.footer = ''; d$.menus.about.site = '';
          // Class couleurs + Dropdown menu
          for (var k in d$.f) {
            switch ( d$.f[k].c ) {
              case 'b': f$_color = 'bleu';   f$_menu = 'soft';     break;
              case 'r': f$_color = 'rouge';  f$_menu = 'culture';  break;
              case 'v': f$_color = 'vert';   f$_menu = 'services'; break;
              case 'j': f$_color = 'jaune';  f$_menu = 'vrac';     break;
              case 'f': f$_color = 'violet'; f$_menu = 'follow';   break;
              case 'o': f$_color = 'orange'; f$_menu = (k != 'dio') ? 'about' : 'services'; break;
            }
            // Nom du projet coloré (html)
            // Préfix violet
            if ( d$.f[k].p == undefined ) {
               d$.f[k].html = d$.f[k].p = '';
            } else {
              d$.f[k].html = '<b class="violet">'+d$.f[k].p+'</b>';
            }
            // Suffixe coloré (anglais, accronyme)
            switch (d$.f[k].a) {
              case 'en'  : d$.f[k].html += '<b class="'+f$_color+'" lang="en">'+d$.f[k].s+'</b>'; break;
              case 'abbr': d$.f[k].html += '<b class="'+f$_color+'"><abbr>'+d$.f[k].s+'</abbr></b>'; break;
              default    : d$.f[k].html += '<b class="'+f$_color+'">'+d$.f[k].s+'</b>'; break;
            }

            // Nom du projet nu (name)
            d$.f[k].name = d$.f[k].p+d$.f[k].s;
            // Popovers
            f$_popover = ( d$.f[k].d1 != undefined && d$.f[k].t1 != undefined )
              ? 'rel="popover" data-content="'+d$.f[k].d1+'" title="'+d$.f[k].t1+'"'
              : '';
            // Attribution des entrées dans chaque menu
            d$.menus[f$_menu].nav += '<li class="fs_'+f$_menu+' fs_'+k+'"><a href="'+d$.f[k].l+'" '+f$_popover+'><i class="fa fa-fw fa-lg '+d$.f[k].i+'"></i>&nbsp;'+d$.f[k].name+'</a></li>';

            // "Nous suivre" dans le footer
            if ((f$_menu == 'follow') && !(/(newsletter|contact|wikipedia)/i).test(k)) {
              d$.menus['follow'].footer += '<li class="fs_'+k+'"><a href="'+d$.f[k].l+'" title="'+d$.f[k].t1+'"><i class="fa fa-fw fa-2x '+d$.f[k].i+'"></i><span class="sr-only">'+d$.f[k].name+'</span></a></li>';
            }
            // "À propos" du site
            if(n$.name == d$.f[k].name) {
              f$_soft = (d$.f[k].soft != undefined) ? ' ('+d$.f[k].soft+')' : '';
              d$.menus['about'].site += '<li class="dropdown-header">'+d$.f[k].html+f$_soft+'</li><li role="presentation" class="divider"></li>';
              if(d$.f[k].git != undefined) {
                d$.menus['about'].site += '<li class="fs_about fs_git"><a href="'+d$.f[k].git+'"><i class="fa fa-fw fa-lg '+d$.f.git.i+'"></i>&nbsp;'+d$.f.git.p+d$.f.git.s+'</a></li>';
              }
              if(d$.f[k].src != undefined) {
                d$.menus['about'].site += '<li class="fs_about fs_src"><a href="'+d$.f[k].src+'"><i class="fa fa-fw fa-lg fa-code-fork"></i>&nbsp;'+d$.t.source+f$_soft+'</a></li>';
              }
              d$.f.aide.l = d$.f.aide.l.replace('#aide','#'+n$.name.toLowerCase());
              d$.f.faq.l = d$.f.faq.l+'#'+n$.name.toLowerCase();
            }

          }

          var html =
' <nav class="navbar navbar-default" id="framanav" role="menubar" style="display:none">'+

'   <button type="button" class="navbar-toggle text-muted" data-toggle="collapse" data-target=".navbar-ex1-collapse">'+
'     <span class="sr-only">'+d$.t.toggle+'</span><i class="fa fa-fw fa-lg fa-bars"></i>'+
'   </button>'+

'   <div class="nav-container">'+
'     <div class="navbar-header">'+
'       <a class="navbar-brand" href="'+d$.meta.home.l+'">'+
'         <img src="'+f$_nav+'img/logo.png"/>'+
'         <span class="hidden-sm"><b class="violet">'+d$.meta.home.p+'</b><b class="orange">'+d$.meta.home.s+'</b></span>'+
'       </a>'+
'       <a href="#nav-end" id="nav-skip">'+d$.t.skip+'</a>'+
'     </div>'+

'   <div class="collapse navbar-collapse navbar-ex1-collapse">'+
'     <ul class="nav navbar-nav">';

          for (var k in d$.menus) {
            if(k != 'site' && k != 'community') {
              html +=
'       <li class="dropdown">'+
'         <a href="#" class="dropdown-toggle" data-toggle="dropdown">'+d$.menus[k].name+'<b class="caret"></b></a>'+
'         <ul class="dropdown-menu">'+d$.menus[k].nav+'</ul>'+
'       </li>';
            }
          }

          html +=
'       <li><a href="'+d$.meta.soutenir.l+'/?f=nav" class="btn-soutenir" rel="popover" data-placement="bottom"'+
'              data-content="'+d$.meta.soutenir.d1+'" title="'+d$.meta.soutenir.t1+'">'+
'         <i class="fa fa-lg '+d$.meta.soutenir.i+'"></i>&nbsp;'+d$.meta.soutenir.s+
'       </a></li>'+
'       <li id="btn-benevalo"><a href="'+d$.meta.benevalo.l+'" class="btn-info" rel="popover" data-placement="bottom"'+
'                                data-content="'+d$.meta.benevalo.d1+'" title="'+d$.meta.benevalo.t1+'">'+
'         <i class="fa fa-lg '+d$.meta.benevalo.i+'"></i>&nbsp;'+d$.meta.benevalo.s+
'       </a></li>'+
'      </ul>'+
'   </div>'+
' </div>'+
'  <a id="nav-end" class="sr-only"></a>'+
'</nav>'+
'<a href="'+d$.meta.soutenir.l+'/?f=macaron" id="framanav_donation" rel="donBadge" style="display:none" class="hidden-xs"><span class="sr-only">'+d$.meta.soutenir.s+'</span></a>';


            /** On injecte le code html **/
            f$('#framanav_container').prepend(html);
            // Présentation 2 colonnes pour Services et À propos
            f$('#framanav .dropdown:eq(2)').attr('id','fs_services');
            f$('#framanav .dropdown:eq(5)').attr('id','fs_about');
            // Placement des popovers à gauche
            f$('#framanav #fs_services li:odd a').attr('data-placement','left');
            // À propos
            f$('#fs_about li').has('a[href*="status."]').after(d$.menus['about'].site);
            f$('#fs_about .fs_git').before(f$('#fs_about .fs_aide,#fs_about .fs_faq'));


            f$('#fs_about ul').prepend('<li class="dropdown-header"><b class="violet">'+d$.meta.home.p+'</b><b class="orange">'+d$.meta.home.s+'</b></li><li role="presentation" class="divider"></li>');
            f$('#fs_services li:eq(0)').addClass('dropdown-header');
            f$('#fs_services li:eq(0) a').wrapInner('<b>');
            // Ajout des dividers
            f$('#framanav .dropdown-menu li')
              .has(
                'a[href*="degooglisons"], a[href*="vect"], a[href*="carte.org"], a[href*="news.org"],'+
                'a[href*="enventelibre"], a[href*="wiki."], a[href*="plus.google"], a[href*="status."]'
              )
              .after('<li role="presentation" class="divider"></li>');

            /**
             * Mobile/Desktop
             **/
            // On ajoute du viewport et des boutons mobile/desktop
            f$('#fs_about').append(
              '<li  role="presentation" class="divider"></li>'+
              '<li class="framanav-mobile"><a href="javascript:void(0);">'+
              '  <i class="fa fa-fw fa-lg fa-mobile"></i>&nbsp;'+d$.t.mobile+
              '</a></li>'+
              '<li class="framanav-desktop"><a href="javascript:void(0);">'+
              '  <i class="fa fa-fw fa-lg fa-desktop"></i>&nbsp;'+d$.t.desktop+
              '</a></li>'
            );

            var f$_btn_desktop = f$('.framanav-desktop');
            var f$_btn_mobile = f$('.framanav-mobile');

            function f$_mobile() {
              var f$_viewport = f$('meta[name="viewport"]');
              if (f$_viewport.length==0) {
                f$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
              } else {
                f$_viewport.attr('content','width=device-width, initial-scale=1.0');
              }
              f$_btn_desktop.addClass('visible-xs-inline').show();
              f$_btn_mobile.hide();
            };

            function f$_desktop() {
              var f$_viewport = f$('meta[name="viewport"]');
              if (f$_viewport.length) {
                f$_viewport.attr('content','width=1024');
              }
              f$_btn_desktop.removeClass('visible-xs-inline').hide();
              f$_btn_mobile.show();
            }

            if (c$.mobile) {
            // Viewport mobile si Responsive dans la config
            // Boutons « Désactiver mode mobile » par défaut
              f$_mobile();
            } else if (f$('meta[name="viewport"]').length==0) {
            // Bouton « Activer mode mobile » par défaut
              f$_desktop();
            }
            // Si (Dés)Activation mannuel, le cookie prend la main le temps de la session
            switch (f$Cookie('r','nav_viewport')) {
              case 'mobile' : f$_mobile(); break;
              case 'desktop': f$_desktop(); break;
            }
            // Boutons (Dés)Activer le mode mobile
            f$_btn_mobile.on('click', function() {
              f$_mobile();
              document.cookie = 'nav_viewport=mobile;expire=0';
            });
            f$_btn_desktop.on('click', function() {
              f$_desktop();
              document.cookie = 'nav_viewport=desktop;expire=0';
            });
            /** Fin Mobile/Desktop **/

            f$('#framanav_container').css('opacity','1');

            // Bénévalo
            // Le bouton soutenir remplacé par un bouton bénévalo
            // pendant 3 jours autour de la pleine lune
            var f$_today = Math.floor(new Date().getTime() / 1000);
            var f$_fullMoon = 1453603580; // 24/01/2016 02:46:20
            var f$_moonRev = 2551443;     // 29j 12h 44m 3s

            if((f$_today - f$_fullMoon)%f$_moonRev < 129600 || (f$_today - f$_fullMoon)%f$_moonRev > f$_moonRev-129600) {
              f$('#btn-benevalo').show().prev().hide();
            }

            /*******************
             *   BootStrap JS
             *******************/
            if (c$.js.b$) {
              if (typeof f$().modal == 'function' || c$.js.b$ == 'html') {
                console.log('✔ Bootstrap HTML');
                go_BootStrap();
              } else {
                f$.getScript(f$_nav+'lib/bootstrap/js/bootstrap.min.js', function() {
                  console.log('✔ Bootstrap AJAX');
                  go_BootStrap();
                });
              }
            } else {
              console.info('✘ Bootstrap');
            }

            // Audio JS
            if (c$.js.audio) {
              f$('audio').each(function() {
                f$(this).wrap('<div class="audio" />');
                var outer = this.outerHTML;
                var regex = new RegExp('<' + this.tagName, 'i');
                  var newTag = outer.replace(regex, '<video');
                  regex = new RegExp('</' + this.tagName, 'i');
                  newTag = newTag.replace(regex, '</video');
                f$(this).replaceWith(newTag);
              });
            }

            // Video JS
            if (c$.js.video) {
              f$('link[href*="/nav/css/nav.css"]').before('<link rel="stylesheet" type="text/css" href="'+f$_nav+'lib/video-js/video-js.css" />');
              // Paramètres à ajouter à la vidéo pour appliquer VideoJS en surcouche
              f$('video').attr({
                'class':'video-js vjs-default-skin',
                'data-setup':'{}'});
              // Numérotation des vidéos (pour pouvoir utiliser l'API : videojs('id').ready() )
              f$('video').each(function(index) {
                if(f$(this).has('source[type*="webm"]').length && (n$.browser.firefox || n$.browser.opera || ns.browser.chrome)) {
                  f$(this).children('source[type*="mp4"]').remove();
                }
                f$(this).attr('id','f_video_'+index);
              });

              f$.getScript(f$_nav+'lib/video-js/video.js', function() {
                console.log('✔ video.js');
                videojs.options.flash.swf = f$_nav+'lib/video-js/video-js.swf';
                // On "clique" sur les sous-titres Français
                // pour chaque vidéo dès que VideoJS est prêt
                f$('video').each(function(index) {
                  videojs('f_video_'+index).ready(function() { f$("li.vjs-menu-item:contains('Français')").trigger('click'); });
                });
              });
            }

            // Bloqueur d'iframe style Flashblock
            /* Vidéos Youtube */
            var f$_yt_i=0;
            f$('a[href*="youtube.com/watch"],a[href*="youtu.be/"]').has('img').click(function() {
              // Si lien youtube <a> on l'ajoute le code au clic + ajout d'un Id à l'iframe
              var f$_yt_iframe = f$(this).attr('href').replace(
                /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{10,12})\b[?=&\w]*(?!['"][^<>]*>|<\/a>)/ig,
                '<iframe id="youtube'+ f$_yt_i +'" src="https://www.youtube.com/embed/$1?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen ></iframe>');
              f$(this).after(f$_yt_iframe);
              // On supprime <a><img/></a>
              f$(this).remove();
              f$_yt_i++;
              return false;
            });
            /** Même chose à faire pour Soundcloud, Dailymotion, Vimeo **/

            // Flux RSS Global
            f$('head').append('<link rel="alternate" type="application/rss+xml" title="'+d$.f.rss.d1+'" href="'+d$.f.rss.l+'" />');

            // Favicon et Apple touch icon
            if (!c$.icons.keep) {
              f$('link[rel*=icon]').remove();
              c$.icons.fav = (!c$.icons.fav) ? 'favicon-violet.png' : c$.icons.fav;
              c$.icons.apple = (!c$.icons.apple) ? 'apple-violet.png' : c$.icons.apple;
              f$('head').append('<link rel="icon" type="image/png" href="'+f$_nav+'img/icons/'+c$.icons.fav+'" />');
              f$('head').append('<link rel="apple-touch-icon" href="'+f$_nav+'img/icons/'+c$.icons.apple+'" />');
            }

            // Opt-in
            var f$_optin_dejavu = f$Cookie('r','opt-in');
            if (c$.optin[0]!='' && !f$_optin_dejavu) {
              f$(c$.optin[0]).after(
                '<div class="alert alert-info fade in" id="fs_opt-in">'+
                '  <input type="checkbox" id="fs_opt-in_checkbox" value="false" />'+
                '  <label for="fs_opt-in_checkbox">'+d$.meta.optin.t+'</label>'+
                '  <br /><small>'+d$.meta.optin.d1+
                '    <a href="'+d$.f.newsletter.l+'" id="link-opt-in" target="_blank" >'+d$.meta.optin.d2+'&nbsp;'+
                '      <i class="fa fa-external-link new-window"></i>'+
                '      <span class="sr-only"> ('+d$.t.new-window+')</span>'+
                '    </a>)'+
                '  </small>'+
                '</div>'
              );

              f$(c$.optin[0]).focusin(function() {
                f$('#fs_opt-in_error').remove();
                // Ajout du cookie (expire au bout d'un an)
                f$Cookie('w',c$.optin[2],true,c$.optin[3]);
              });

              // Requête ajax crossdomain lorsque la case est cochée
              f$('#fs_opt-in input, #fs_opt-in label').on('click', function() {
                f$('#fs_opt-in_error').remove();
                f$_email = f$(c$.optin[0]).val();
                if(c$.optin[1]!='' && f$(c$.optin[0]).val()!=f$(c$.optin[1]).val()) { // Cas où il y a un champs pour confirmer email
                  f$(c$.optin[0]).after(
                    '<div class="alert alert-danger fade in" id="fs_opt-in_error">'+
                    'Les adresses emails ne correspondent pas.</div>'
                  );
                  return false;
                } else if( !i$Email(f$(c$.optin[0]).val())) {
                  f$(c$.optin[0]).after(
                    '<div class="alert alert-danger fade in" id="fs_opt-in_error">'+
                    'L’adresse email '+f$_email+' n’est pas valide.</div>'
                  );
                  return false;
                } else {
                  f$('#fs_opt-in input').attr('checked', true);
                  f$.ajax({
                    type: "POST",
                    url: 'https://contact.framasoft.org/php_list/lists/?p=subscribe&id=2', // URL d'abonnement à la liste
                    crossDomain:true,
                    data: 'makeconfirmed=1&htmlemail=1&list%5B5%5D=signup&listname%5B5%5D=Newsletter&email='+f$_email.replace('@','%40')+'&VerificationCodeX=&subscribe=Abonnement' // Paramètres habituellement passés dans le formulaire
                  });
                  // On supprime la case à cocher (pas possible de décocher ; l'annulation se fait depuis le mail reçu)
                  f$('#fs_opt-in').remove();
                  // Message d'alert pour confirmer l'inscription
                  f$(c$.optin[0]).after(
                    '<div class="alert alert-success fade in" id="fs_opt-in_confirm" aria-live="polite">'+
                    '<button type="button" class="close" data-dismiss="alert" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                    'Votre adresse email <strong>'+f$_email+'</strong> a été ajoutée à notre liste. Vous devriez avoir reçu un email de confirmation.</div>'
                  );
                }
              });
            }

            // Footer
            if(c$.footer && !n$.inframe) {

              html =
' <footer id="framafooter" class="row hidden-print" role="contentinfo">'+
'   <div class="container">'+
'     <div class="clearfix col-sm-8">'+
'       <nav class="col-xs-4">'+
'         <h1>'+d$.meta.home.p+d$.meta.home.s+'</h1>'+
'         <ul class="list-unstyled">'+
'           <li><a href="'+d$.f.asso.l+'">'+d$.f.asso.name+'</a></li>'+
'           <li><a href="'+d$.f.charte.l+'">'+d$.f.charte.name+'</a></li>'+
'           <li><a href="'+d$.f.contact.l+'">'+d$.f.contact.name+'</a></li>'+
'         </ul>'+
'       </nav>'+
'       <nav class="col-xs-4">'+
'         <h1>'+d$.menus.community.name+'</h1>'+
'         <ul class="list-unstyled">'+
'           <li><a href="'+d$.f.participer.l+'">'+d$.f.participer.name+'</a></li>'+
'           <li><a href="'+d$.f.benevalo.l+'">'+d$.f.benevalo.name+'</a></li>'+
'           <li><a href="'+d$.f.partenaires.l+'">'+d$.f.partenaires.name+'</a></li>'+
'         </ul>'+
'       </nav>'+
'       <nav class="col-xs-4">'+
'         <h1>'+d$.menus.site.name+'</h1>'+
'         <ul class="list-unstyled">'+
'           <li><a href="'+d$.f.legals.l+'#'+c$.host+'">'+d$.f.legals.name+'</a></li>'+
'           <li><a href="'+d$.f.cgu.l+'"><abbr>'+d$.f.cgu.name+'</abbr></a></li>'+
'           <li><a href="'+d$.f.credits.l+'#'+c$.credits+'">'+d$.f.credits.name+'</a></li>'+
'         </ul>'+
'       </nav>'+
'     </div>'+
'     <div class="col-sm-4">'+
'       <div class="col-xs-12">'+
'         <h1>'+d$.menus.follow.name+'</h1>'+
'         <ul class="list-inline">'+d$.menus.follow.footer+'</ul>'+
'         <h2><span lang="en">'+d$.f.newsletter.name+'</span></h2>'+
'         <form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2" method="post" name="subscribeform">'+
'           <div class="input-group input-group-sm">'+
'             <input class="form-control" title="'+d$.t['type-your-email']+'" name="email" size="40" type="text" placeholder="'+d$.t['your-email']+'" />'+
'               <span class="input-group-btn">'+
'                 <button class="btn btn-default" name="subscribe" type="submit" value="Abonnement">'+d$.t.subscribe+'<span class="sr-only">'+d$.t['to-the-newsletter']+'</span></button>'+
'               </span>'+
'             </div>'+
'             <input name="htmlemail" type="hidden" value="1" /> <input name="list[5]" type="hidden" value="signup" /> <input name="listname[5]" type="hidden" value="Newsletter" />'+
'             <div style="display: none;"><input name="VerificationCodeX" size="20" type="text" value="" /></div>'+
'         </form>'+
'       </div>'+
'     </div>'+
'   </div>'+
' </footer>';

              f$('body').append(html);
              if(f$('body').height() < f$(window).height()) {
                f$('#framafooter').css('position','absolute');
              } else {
                f$('#framafooter').css('position','relative');
              }

              f$(window).on('resize, scroll, click', function() {
                f$('#framafooter').css('position','relative');
                if(f$('body').height() < f$(window).height()) {
                  f$('#framafooter').css('position','absolute');
                } else {
                  f$('#framafooter').css('position','relative');
                }
              });
            }

            // Macaron
            if(c$.donate && !n$.inframe) {
                f$('#framanav_donation').show().delay(Math.random() * (29000 - 1000) + 1000).fadeOut(600).fadeIn(600);
            }

            // Liens À propos
            f$('nav a[href^="/nav/html/"]').attr('href', function() {
                return f$(this).attr('href')
                               .replace('/nav/html/', f$_nav+'html/')
                               .replace('credits.html', 'credits.html#'+c$.credits)
                               .replace('legals.html', 'legals.html#'+c$.host);
            });

            // Crédits
            if(i$('/html/credits.html') && location.hash) {
                f$('#site-credits').load(f$_nav+'html/credits/'+location.hash.replace('#','')+'.html');
            };

            // Hébergeur et Iframe Piwik sur Mentions légales
            if(i$('/html/legals.html')) {
                if(location.hash) {
                    f$('#modal-legals-host').load(f$_nav+'html/host/'+location.hash.replace('#','')+'.html');
                }
                f$('#piwik-iframe').html('<iframe style="border: 0; height: 200px; width: 600px;" src="'+c$.piwik.url+'/index.php?module=CoreAdminHome&action=optOut&language=fr"></iframe>')
            }

            /** On peut ajouter des scripts jQuery "génériques" ici mais... **/

            function go_BootStrap() {
                // Redéfini f$ pour Bootstrap en mode noConflict si nécessaire
                switch (c$.js[0]) {
                    case 'noConflict': var f$ = jQuery.noConflict(); break;
                    default          : var f$ = jQuery; break;
                }

                /**
                 *  Accessibilité
                 *  code issu de https://github.com/paypal/bootstrap-accessibility-plugin
                 **/
                // Alert
                f$('.close').removeAttr('aria-hidden').wrapInner('<span aria-hidden="true"></span>').append('<span class="sr-only">Fermer</span>');
                // Modal
                if(typeof f$().modal == 'function') {
                    var modalhide =   f$.fn.modal.Constructor.prototype.hide;
                    f$.fn.modal.Constructor.prototype.hide = function(){
                        var modalOpener = this.$element.parent().find('[data-target="#' + this.$element.attr('id') + '"]');
                        modalhide.apply(this, arguments);
                        modalOpener.focus();
                    }
                }
                /** Fin accessibilité **/

                if (!n$.inframe) { // Pas de bandeau, nav, modale et macaron en mode iframe

                    if(c$.fixed || i$('/nav/html/')) {
                        f$('#framanav_container ~ *:not(script):first').css('margin-top', '+=42');
                        f$('#framanav_container').css({
                            'position':'fixed',
                            'width':'100%',
                            'top':'0',
                            'z-index':'1000'
                        });
                    }

                    // Liens de la nav à ouvrir dans un onglet
                    if(!i$('/nav/html/')) {
                        f$('#framanav .dropdown-menu a').attr('target','_blank').append('<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span>');
                    }

                    /** ... on ajoute surtout les scripts qui font appel à BootStrap et jQuery ici **/
                    // Activation des popovers
                    if(typeof f$().popover == 'function') {
                        f$('a[rel="popover"]').each(function() {
                            f$(this).popover({
                                html: true,
                                trigger: 'focus hover',
                                // utilisation de 'template' pour ajout du lien sur la popover en mode tactile
                                //template: '<div class="popover" role="tooltip"><div class="arrow"></div><a href="'+f$(this).attr('href')+'"><h3 class="popover-title"></h3><div class="popover-content"></div></a></div>'
                            });
                            f$(this).removeAttr('title');
                        });
                    }

                    // Fenêtre modale et bandeau d'alerte
                    var f$_alert_dejavu = f$Cookie('r','nav-alert');
                    var f$_alert_modal_dejavu = f$Cookie('r',c$.modal.info[2]);

                    // Ajout de la fenêtre modale
                    if (c$.modal.info[0]!='') {
                        f$('body').append(
                        '<div class="modal fade" lang="fr" id="modal-alert" tabindex="-1" role="dialog" aria-labelledby="modal-alertLabel" aria-hidden="true">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                        '<button type="button" class="close" data-dismiss="modal" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                                        '<h1 id="modal-alertLabel">'+c$.modal.info[0]+'</h1>'+
                                    '</div>'+
                                    '<div class="modal-body">'+c$.modal.info[1]+'</div>'+
                                    '<div class="modal-footer">'+
                                        '<button class="btn" id="modal-close" data-dismiss="modal">Fermer</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');

                        if(!f$_alert_modal_dejavu) {
                            f$('#modal-close').after('<button class="btn btn-primary" id="modal-set-cookie" >Ne plus afficher</button>')
                            f$('#modal-alert').modal('show');
                            f$('#modal-set-cookie').click(function() {
                                f$Cookie('w',c$.modal.info[2],true,c$.modal.info[3]); // cookie pour 7 jours par défaut (cf config.js)
                                f$('#modal-alert').modal('hide');
                            });
                        }
                        f$('#modal-alert .close, #modal-close').click(function() {
                            f$Cookie('w',c$.modal.info[2],true); // cookie pour la session
                            f$('#modal-alert').modal('hide');
                        });
                    }

                    // Ajout du bandeau d'alerte
                    if (c$.alert[1]!='' && !f$_alert_dejavu) {

                        f$_alert_margin_top = '';
                        if (c$.fixed || i$('/nav/html/')) {
                            f$('#framanav_container ~ *:not(script):first').css('margin-top', '-=42');
                            f$_alert_margin_top = ' padding-top:52px;';
                        }

                        f$('#framanav_container').after(
                            '<div id="nav-alert" lang="fr" class="alert alert-'+c$.alert[0]+' fade in" style="border-radius:0;'+f$_alert_margin_top+'">'+
                                '<button type="button" class="close" data-dismiss="alert" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                                '<div style="margin:0 auto; max-width:800px;"><p class="text-center">'+c$.alert[1]+'</p></div>'+
                            '</div>'
                        );

                        // Cookie enregistré en fermant (7 jours par défaut cf config.js)
                        f$('#nav-alert').bind('closed.bs.alert', function () {
                            f$Cookie('w',c$.alert[2],true,c$.alert[3]);
                        });

                    }

                    // Fenêtre modal pour dons sur téléchargements
                    if (c$.modal.don[0]!='') {
                        f$('body').append(
                        '<div class="modal fade" lang="fr" id="modal-soutenir" tabindex="-1" role="dialog" aria-labelledby="modal-soutenirLabel" aria-hidden="true">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                        '<button type="button" class="close" data-dismiss="modal" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                                        '<h1 id="modal-soutenirLabel">Soutenez Framasoft</h1>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div id="lldemars-framasoft"></div>'+
                                        '<p>Vous êtes sur le point '+c$.modal.don[1]+' une ressource <b>libre</b> issue de la vingtaine de projets du réseau Framasoft.</p>'+
                                        '<p>Cette ressource est <b>gratuite</b> (et le sera tant que nous existerons) parce que <b>Framasoft est une association d’intérêt général à but non lucratif</b> dont l’objectif est justement la diffusion du logiciel libre et sa culture au plus large public.'+
                                        '<p>Mais tout ceci est rendu possible parce que Framasoft est <b>soutenue par les dons (défiscalisables) de ses utilisateurs</b>.</p>'+
                                        '<p>Merci de prendre quelques minutes en nous aidant à pérenniser et développer notre action.</p>'+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<p class="col-md-6 text-center"><a target="_blank" id="modal-don" href="https://soutenir.framasoft.org/?f=modal&s='+n$.site+'" class="btn btn-soutenir btn-block"><span class="fa fa-fw fa-lg fa-heart"></span> Je veux faire un don<br /> à l’association Framasoft&nbsp;<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span></a></p>'+
                                        '<p class="col-md-6 text-center"><a target="_blank" id="modal-contact" href="https://participer.framasoft.org" class="btn btn-info btn-block"><span class="fa fa-fw fa-lg fa-paw"></span> Je veux participer.<br />Par où on commence ?&nbsp;<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span></a></p>'+
                                        '<p class="clearfix text-right"><a id="modal-dl" href="javascript:void(0);" class="text-primary" >Non merci, je souhaite seulement '+c$.modal.don[2]+'</a></p>'+
                                        '<p class="clearfix text-right"><a id="modal-dl2" href="javascript:void(0);" class="text-primary" >Je soutiens déjà Framasoft</a></p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');

                        if(c$.modal.don[0]=='onstart') {
                            var dejavu = f$Cookie('r', 'dondl');
                            if(!dejavu) {
                                f$('#modal-soutenir').modal('show');
                                f$('#modal-soutenir').css('display','block'); // bugfix
                                f$('#modal-contact, #modal-don, #modal-dl, #modal-soutenir .close').click(function() {
                                    f$Cookie('w','dondl',true,c$.modal.don[3]);
                                    f$('#modal-soutenir').modal('hide');
                                });
                                f$('#modal-dl2').click(function() {
                                    f$Cookie('w','dondl',true,365*24*60*60*1000);
                                    f$('#modal-soutenir').modal('hide');
                                });
                            }
                        } else {
                            f$(c$.modal.don[0]).click(function() {
                                var dejavu = f$Cookie('r','dondl');
                                if(!dejavu) {
                                    link=f$(this).attr('href');
                                    f$('#modal-soutenir').modal('show');
                                    f$('#modal-contact, #modal-don, #modal-dl').click(function() {
                                        f$Cookie('w','dondl',true,c$.modal.don[3]);
                                        f$('#modal-soutenir').modal('hide');
                                        window.location.href = link;
                                    });
                                    f$('#modal-dl2').click(function() {
                                        f$Cookie('w','dondl',true,365*24*60*60*1000);
                                        f$('#modal-soutenir').modal('hide');
                                        window.location.href = link;
                                    });
                                    return false;
                                }
                            });
                        }
                    }
                }// </!n$.inframe>
            } // </go_BootStrap>
        }); // </nav.html>
    }); // </document.ready>
}   // </start_jQuery>

/************** Fonctions globales ****************/
// Cookies
function f$Cookie(set, name, value, time) {

  if (set == 'w') {

    time = typeof time !== 'undefined' ? time : 365*24*60*60*1000;
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + time);
    document.cookie = name + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();

  } else {

    var oRegex = new RegExp("(?:; )?" + name + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    } else {
        return null;
    }

  }

}

// Fonction d'ajout de scripts
function f$LoadJS(url, callback) {
  if (!this.loadedScript) {
    this.loadedScript = new Array();
  }

  // indexOf n'existe pas pour IE8
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/) {
      var len = this.length >>> 0;
      var from = Number(arguments[1]) || 0;
      from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
      if (from < 0)
        from += len;
      for (; from < len; from++) {
        if (from in this &&
            this[from] === elt)
        return from;
      }
      return -1;
    };
  } // fin indexOf

  if (this.loadedScript.indexOf(url) == -1) {
    this.loadedScript.push(url);
    var head = document.getElementsByTagName("head")[0];
    var e = document.createElement("script");
    e.src = url;
    e.type = "text/javascript";
    e.charset ="utf-8";

    var done = false;
    e.onload = e.onreadystatechange = function() {
      if ( !done && (!this.readyState ||
        this.readyState === "loaded" || this.readyState === "complete") ) {
        done = true;
        callback();
        e.onload = e.onreadystatechange = null; // Handle memory leak in IE
      }
    };

    head.appendChild(e);
  }
}

// Ajout de CSS
function f$LoadCSS(url, position, media) {
  if (position==undefined) position='end';
  if (media==undefined) media='screen';
  var f$_link = document.createElement('link');
      f$_link.rel = "stylesheet";
      f$_link.media=media;
      f$_link.href= url;

  if (position == 'start') {
    document.getElementsByTagName('head')[0].insertBefore(f$_link, document.getElementsByTagName('head')[0].firstChild);
  } else {
    document.getElementsByTagName('head')[0].appendChild(f$_link);
  }
}

/** Deprecated → i$() **/
function f$_page(string) {
    return (n$.url.indexOf(string) > -1);
}

// Sur quel site/page on est ?
function i$(string, location) {
  switch (location) {
    case 'h' : location = window.location.host; break;
    case 'u' : location = window.location.href; break;
    default:
      location = window.location.href;
      return (location.indexOf(string) > -1);
    break;
  }

  if( typeof string === 'object' || typeof string === 'function' ) { // RegExp
    return (string.test(location));
  } else { // String
    return (location == string);
  }
}

// Est-ce une adresse email valide ?
function i$Email(emailAddress) {
  var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  return pattern.test(emailAddress)==true;
}

// Dans quel langue est la page web ?
function i$Lang(lg) {
  var lang = '';
  var html = document.getElementsByTagName("html");
  var meta = document.getElementsByTagName('script');

  if(html[0].getAttribute("lang")) {

    lang = html[0].getAttribute("lang");

  } else if(html[0].getAttribute("locale")) {

    lang = html[0].getAttribute("locale");

  } else {

    for (var i = 0; i < meta.length; i++) {
      if ((meta[i].getAttribute("http-equiv") && meta[i].getAttribute("content")
           && meta[i].getAttribute("http-equiv").indexOf("Language") > -1)
        ||(meta[i].getAttribute("property") && meta[i].getAttribute("content")
           && meta[i].getAttribute("property").indexOf("locale") > -1)) {

          lang = meta[i].getAttribute("content");

      }
    }
  }
  return (lang.substr(0,2).toLowerCase() == lg)
}

// Conversion en url absolue
function f$Link(href) {
  var link = document.createElement("a");
  link.href = href;
  return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);
}

// Mise à jour de la config
function f$c$(site, l$) {
  function merge(obj1, obj2) {
    for (var p in obj2) {
      try {
        if ( obj2[p].constructor==Object ) {
          obj1[p] = merge(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }

  if(n$.site == site) {
    for (var key in l$) {
       if (l$.hasOwnProperty(key)) {
          var obj = l$[key];
          for (var prop in obj) {
             if (obj.hasOwnProperty(prop)) {
                //alert(prop + " = " + obj[prop]);
             }
          }
       }
    }
  }
}

/***********************************************************************
 *                           Config globale                            *
 ***********************************************************************/
var c$ = {
  js: {
    j$: 'jQuery',                   // 'jQuery'     = jQuery de la nav ;
                                    // 'html'       = jQuery (1.12.4 ou +) présent dans la page ;
                                    // 'noConflict' = variable $ et jQuery renommés en js ;
    b$: 'bootstrap',                // 'bootstrap'  = bootstrap de la nav;
                                    // 'html'       = bootstrap présent dans la page ;
                                    //  false       = on désactive bootstrap
    ext: false,                     // ext/n$.site.js si true ou bien une fonction lancée au dom.ready
    audio: false,
    video: false
  },
  css: {
    order: 01234,                   /** cas possibles : 01234, 10234, 01423 **/
    b$: true,                       // 0 : bootstrap
                                    // 1 : css du site
                                    // 2 : font-awesome + nav.css
    frama: true,                    // 3 : frama.css
    ext:false                       // 4 : nav/ext/n$.site.css si true
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
     **/
    info: ['', '', 'n$modal-info', 604800000],
    /** [titre, texte, nom du cookie, durée du cookie (7 jours)] **/
  },
  alert: ['black', '', 'n$alert', 604800000],
  /** [couleur (classes bootstrap), texte, nom du cookie, durée du cookie (7 jours)] **/
  mute: false,  // désactive macaron, modal, alert

  optin: ['', '', 'n$optin', 604800000],
  /** [sélecteur email1, email2, nom du cookie, durée du cookie (7 jours)] **/

  icons: {
    keep: false, // garder les icônes du site (connard.pro, pouhiou.com)
    fav: false,  // favicon-violet.png
    apple: false // n$.site+'.png'
  },
  host: 'hetzner',
  credits: n$.site,
  piwik: {
    id: '',
    url: 'https://stats.framasoft.org/'
  }
};

var f$_bootstrap_css = true;
var f$_css_position = 'start';                      // 'start' = head > bootstrap.css > ... /head body > nav.js ;
                                                    // 'end'   = head > ... > bootstrap.css /head body > nav.js ;
var f$_frama_css = true;
var f$_ext_css = false;                             // nav/ext/nom-de-domaine.css

/* Bandeau Degooglisons
    f$_banniere = Math.floor(Math.random() * 3);
    switch (f$_banniere) {
    case 0:
        f$_alert_type       = 'info';
        f$_alert_img_left   = '<div class="col-sm-3 hidden-xs" style="padding:0;padding-right:10px; max-width: 150px;" aria-hidden="true"><a href="https://degooglisons-internet.org"><img src="'+f$_nav+'img/stallman.png" alt="" class="img-responsive center-block" /></a></div>';
        f$_alert_img_right  = '';
        break;
    case 1:
        f$_alert_type       = 'warning';
        f$_alert_img_left   = '<div class="col-sm-3 hidden-xs" style="padding:0;padding-right:10px; max-width: 150px;" aria-hidden="true"><a href="https://degooglisons-internet.org"><img src="'+f$_nav+'img/aaron.png" alt="" class="img-responsive center-block" /></a></div>';
        f$_alert_img_right  = '';
        break;
    case 2:
        f$_alert_type       = 'success';
        f$_alert_img_left   = '';
        f$_alert_img_right  = '<div class="col-sm-3 hidden-xs" style="padding:0;padding-left:10px; max-width: 150px;" aria-hidden="true"><a href="https://degooglisons-internet.org"><img src="'+f$_nav+'img/geekette.png" alt="" class="img-responsive center-block" /></a></div>';
        break;
    }

    f$_alert_text =
        '<div style="margin:0 auto; max-width:800px; text-align:justify">'+
            f$_alert_img_left+
            '<div class="col-sm-9" style="padding:0">'+
                '<p style="font-weight:bold;font-size:16px;" class="text-center">'+
                    '<a href="https://degooglisons-internet.org" style="text-decoration:none"><b class="frama">Dégooglisons</b> <b class="soft">Internet</b>, l’an 2.</a>'+
                '</p>'+
                '<p>Les services en ligne de géants tentaculaires comme Google, Apple, Facebook, Amazon ou Microsoft (GAFAM) mettent en danger nos vies numériques.</p>'+
                '<p>Pour cette 2e année, <b class="frama">Frama</b><b class="soft">soft</b> continue le défi de vous proposer '+
                    'une alternative Libre, Éthique, Décentralisée et Solidaire à chacun de ces services.'+
                '</p>'+
                '<p class="text-center"><b>Le succès de <a href="https://degooglisons-internet.org">cette campagne est entre vos mains</a> !</b></p></div>'+
            f$_alert_img_right+
        '</div><div class="clearfix"></div>';
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
*/

// Bandeau soutenir défiscalisation
var f$_today = new Date();
var f$_dd = f$_today.getDate();
var f$_mm = f$_today.getMonth()+1;
var f$_yyyy = f$_today.getFullYear();

if(f$_mm == 12 && (31-f$_dd) < 15 && n$.site != 'soutenir.framasoft') {
    f$_rebours = ((31-f$_dd) == 1) ? '24 heures' : 31-f$_dd+' jours';
    c$.alert[0] = 'info';
    c$.alert[1] =
        'Rappel : il vous reste <b>'+f$_rebours+'</b> pour faire un <b>don défiscalisé en '+f$_yyyy+'</b> à Framasoft.'+
        '<br/>Merci pour votre soutien <a href="https://soutenir.framasoft.org" class="btn btn-xs btn-soutenir"><i class="fa fa-heart"></i><span class="sr-only">Faire un don ?</a>';
}


//f$c$('localhost', c$);