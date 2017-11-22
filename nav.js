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
 h${} = html
 c${} = config du site
 l${} = config locale des sites
 **/

var n$ = {
  version: '170209', // n° version de la nav
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
  n$.name = n$.site[0].toUpperCase()+n$.site.slice(1).replace('.framasoft', '');         // Nom du service
  n$.site = n$.site.replace(/framand/i,'and')
                   .replace(/framage/i,'age')
                   .replace(/framae/i, 'mae')
                   .replace(/(\.framasoft|frama\.)/i,'')
                   .replace(/framin/i,'min')
                   .replace(/frame/i, 'me')
                   .replace(/frama/i,'');
  n$.site = (/Framatech/i.test(window.navigator.userAgent)) ? 'agent' : n$.site;     // Config locale

  if (n$.inframe) n$.nav.html = '<div id="framanav_container" style="display:none"></div>';
  if (!n$.inframe) {
    f$Md5=function(){for(var m=[],l=0;64>l;)m[l]=0|4294967296*Math.abs(Math.sin(++l));return function(c){var e,g,f,a,h=[];c=unescape(encodeURI(c));for(var b=c.length,k=[e=1732584193,g=-271733879,~e,~g],d=0;d<=b;)h[d>>2]|=(c.charCodeAt(d)||128)<<8*(d++%4);h[c=16*(b+8>>6)+14]=8*b;for(d=0;d<c;d+=16){b=k;for(a=0;64>a;)b=[f=b[3],(e=b[1]|0)+((f=b[0]+[e&(g=b[2])|~e&f,f&e|~f&g,e^g^f,g^(e|~f)][b=a>>4]+(m[a]+(h[[a,5*a+1,3*a+5,7*a][b]%16+d]|0)))<<(b=[7,12,17,22,5,9,14,20,4,11,16,23,6,10,15,21][4*b+a++%4])|f>>>32-b),e,g];for(a=4;a;)k[--a]=k[a]+b[a]}for(c="";32>a;)c+=(k[a>>3]>>4*(1^a++&7)&15).toString(16);return c}}();
    f$tonality = f$Md5(n$.url).substring(0,8);
    f$concerto = n$.url.split(/[?#]/)[0].substring(n$.url.lastIndexOf('/')+1).replace(/[^a-zA-Z0-9=\?]/g, '');
    currentW = parseInt((window.innerWidth - 60) * 2/3);
    currentH = parseInt(window.innerHeight - 160);
    talkW = parseInt(currentW / 2);
    talkH = parseInt(talkW * 9/16);
    n$.maestro =
      'https://framaestro.org/p/#'+f$tonality+'/'+f$concerto+'/'+
      '0,20,'+currentW+','+currentH+','+encodeURIComponent(n$.url)+';'+
      '0,'+(currentW + 40)+','+talkW+','+talkH+','+encodeURIComponent('https://framatalk.org/'+f$tonality+f$concerto)+';';
  }

  if (window.jQuery === undefined) {
    n$.j$ = 'ø';    // n° version du jQuery local
  } else {
    n$.j$ = window.jQuery.fn.jquery;
    f$ = jQuery;   // alias (on l'écrase plus bas mais ça permet de pouvoir l'utiliser plus tôt)
  }

var d$ = {};
var h$ = {};

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
  f$Merge(c$, l$);

  n$.nav.speed = (n$.nav.set) ? '☀' : '☁';
  if (l$) {
      console.log('✔ '+n$.nav.speed+' config.js '+n$.version+' | '+n$.f$+' | '+n$.j$+' → '+i$jQuery()+' ?');

    if(i$('/nav/html/')) { // Si pages « À propos » on réinit la config
      f$_bootstrap_css = false;
      c$.js.b$ = true;
      c$.css.b$ = false;
      c$.css.ext = false;
      c$.footer = true;
      c$.icons.apple = 'soft.png';
    }

    if(c$.mute) {
      if(l$.alert == undefined) c$.alert[1] = '';                                    // Pas de bandeau
      if(l$.modal == undefined) {
        c$.modal.info[0] = ''; c$.modal.don[0] = '';                                 // Pas de modale
      } else {
        if(l$.modal.info == undefined) c$.modal.info[0] = '';
        if(l$.modal.don == undefined) c$.modal.don[0] = '';
      }
      c$.donate = false;                                                             // Pas de macaron
    }

    /** c$.js.j$ = i$jQuery() mais on garde l$.js.j$ en fallback pour les cas très particuliers **/
    switch (c$.js.j$) {
      case 'AJAX' :
        if (i$jQuery() == 'AJAX') {
          f$LoadJS(n$.nav.url+'lib/jquery/jquery.min.js', f$_start_jquery);
          console.log('✔ jQuery '+n$.f$+' AJAX');
        } else {
          f$_start_jquery();
          console.log('✔ jQuery '+n$.j$+' HTML');
        }
      break;
      case 'noConflict' :
        console.log('✔ jQuery.noConflict '+n$.f$+' AJAX');
        f$LoadJS(n$.nav.url+'lib/jquery/jquery.min.js', f$_start_jquery);
      break;
      default:
        if (window.jQuery === undefined) {
          console.error('✘ jQuery');
        } else {
          console.log('✔ jQuery '+n$.j$+' HTML');
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

var f$_nav_init = function() {
  for (var i = 0; i < f$_scripts.length; i++) {
    if (f$_scripts[i].getAttribute("src") && f$_scripts[i].getAttribute("src").indexOf("/nav.js") > -1) {
      // Emplacement de la nav ('/nav/', '/static/nav/, '../nav/' → 'http://'+n$.site+'/nav')
      n$.nav.url = f$_scripts[i].getAttribute("src").replace('nav.js','');
      n$.nav.url = f$Link(n$.nav.url);
      // On ajout une div vide de 42px qui contiendra la nav (évite les sauts de mise en page avant le chargement des fichiers)
      if (f$_scripts[i].parentNode.tagName.toLowerCase() == 'body' ) {
        // si nav.js est appelé en haut du body, c'est super rapide
        document.write(n$.nav.html);
        n$.nav.set = true;
      } // sinon c'est dans le head, il faut attendre document.ready (voir plus bas)
    }
  }

  f$LoadJS(n$.nav.url+'config.js?'+n$.version, f$_start_config);
}; // ---> config.js

f$_nav_init();

/*******************
 *     jQuery
 *******************/
function f$_start_jquery() {
  /*
   * CSS
   */
  f$LoadCSS(c$.css);

  /*
   * Nav
   */
  switch (c$.js.j$) {
    case 'noConflict': var f$ = jQuery.noConflict(); break;
    default          : var f$ = jQuery; break;
  }

  f$(document).ready(function() {
    if (i$('https://framacalc.org/_start', 'u') && f$('html').attr('manifest') !== 'manifest.appcache') {
      console.log('Reloading https://framacalc.org/_start because of bad _start version');
      window.location.href = 'https://framacalc.org/_start?reload=1';
    }

    f$.ajaxSetup({ cache: true });

    if(!n$.nav.set) f$('body').prepend(n$.nav.html);

    // On charge ensuite les données
    f$_i18n = {};
    var dataI18n = function(){};
    if(i$Lang('en')) {
    dataI18n = f$.getJSON( n$.nav.url+'html/data.en.json' )
        .fail(function() { console.error('✘ data.en.json') })
        .done( function(data) { f$_i18n = data; });
    }
    var dataFr = f$.getJSON( n$.nav.url+'html/data.fr.json' )
        .fail(function() { console.error('✘ data.fr.json') })
        .done( function(data) { f$_fr = data; });

    f$.when(dataI18n, dataFr).then(function() {
        // Import i18n dans d$
        f$Merge(d$, f$_fr);
        f$Merge(d$, f$_i18n);

        var f$_color = ''; var f$_menu = '';
        for (var k in d$.menu) { d$.menu[k].nav ='' }
        d$.menu.follow.footer = ''; d$.menu.about.site = '';

        if (n$.inframe) f$('#framanav_container').hide();

        h$ = {
          framasoft: !i$Agent() ? '<b class="violet">'+d$.meta.home.p+'</b><b class="orange">'+d$.meta.home.s+'</b>' : '<b class="violet">Lara</b><b class="orange">Croft</b>',
          rssLink : '<link rel="alternate" type="application/rss+xml" title="'+d$.f.rss.d1+'" href="'+d$.f.rss.l+'" />',
          newwindow: '&nbsp;<i class="fa fa-external-link new-window" aria-hidden="true"></i>'+h$SR('('+d$.t.newwindow+')')+'</span>',
          divider: '<li role="presentation" class="divider"></li>',
          menu: d$.menu,
          f: {}
        }

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
          h$.f[k] = {};

          if ( d$.f[k].p == undefined ) {
            h$.f[k].html = d$.f[k].p = '';
          } else {
            h$.f[k].html = '<b class="violet">'+d$.f[k].p+'</b>';
          }
          // Suffixe coloré (anglais, accronyme)
          switch (d$.f[k].a) {
            case 'en'  : h$.f[k].html += '<b class="'+f$_color+'" lang="en">'+d$.f[k].s+'</b>'; break;
            case 'abbr': h$.f[k].html += '<b class="'+f$_color+'"><abbr>'+d$.f[k].s+'</abbr></b>'; break;
            default    : h$.f[k].html += '<b class="'+f$_color+'">'+d$.f[k].s+'</b>'; break;
          }

          // Nom du projet nu (name)
          h$.f[k].name = d$.f[k].p+d$.f[k].s;

          // Attribution des entrées dans chaque menu
          h$.menu[f$_menu].nav += '<li class="fs_'+f$_menu+' fs_'+k+'"><a href="'+d$.f[k].l+'" '+h$Popover(d$.f[k].t1, d$.f[k].d1)+'>'+h$icon(d$.f[k].i)+'&nbsp;'+h$.f[k].name+'</a></li>';

          // "Nous suivre" dans le footer
          if ((f$_menu == 'follow') && !(/(wiki|agora|newsletter|contact|wikipedia)/i).test(k)) {
            h$.menu['follow'].footer += '<li class="fs_'+k+'"><a href="'+d$.f[k].l+'" title="'+d$.f[k].t1+'" '+h$Popover(d$.f[k].t1, d$.f[k].d1, 'top')+'><i class="fa fa-fw fa-2x '+d$.f[k].i+'" aria-hidden="true"></i>'+h$SR(d$.f[k].name)+'</a></li>';
          }
          // "À propos" du site
          if(n$.name == h$.f[k].name) {
            f$_soft = (d$.f[k].soft != undefined) ? ' ('+d$.f[k].soft+')' : '';
            h$.menu['about'].site += '<li class="dropdown-header">'+h$.f[k].html+f$_soft+'</li>'+h$.divider;
            if(d$.f[k].doc != undefined) {
              d$.f.doc.l = d$.f[k].doc;
            }
            if(d$.f[k].git != undefined) {
              h$.menu['about'].site += '<li class="fs_about fs_git"><a href="'+d$.f[k].git+'">'+h$icon(d$.f.git.i)+'&nbsp;'+d$.f.git.p+d$.f.git.s+'</a></li>';
            }
            if(d$.f[k].src != undefined) {
              h$.menu['about'].site += '<li class="fs_about fs_src"><a href="'+d$.f[k].src+'">'+h$icon('fa-code-fork')+'&nbsp;'+d$.t.source+f$_soft+'</a></li>';
            }
            d$.f.faq.l = d$.f.faq.l+'#'+n$.name.toLowerCase();
            d$.f.aide.l = d$.f.aide.l.replace('#aide','#'+n$.name.toLowerCase());
          }
        }
        // Switch mobile/desktop
        h$.menu['about'].nav +=
          h$.divider+
          '<li class="framanav-mobile"><a href="javascript:void(0);">'+
            h$icon('fa-mobile')+'&nbsp;'+d$.t.mobile+
          '</a></li>'+
          '<li class="framanav-desktop"><a href="javascript:void(0);">'+
            h$icon('fa-desktop')+'&nbsp;'+d$.t.desktop+
          '</a></li>';

        h$.nav =
'<nav class="navbar navbar-default" id="framanav" role="menubar" style="display:none">'+
  '<button type="button" class="navbar-toggle text-muted" data-toggle="collapse" data-target=".navbar-ex1-collapse">'+
    h$SR(d$.t.toggle)+h$icon('fa-bars')+
  '</button>'+
  '<div class="nav-container">'+
    '<div class="navbar-header">'+
      '<a class="navbar-brand" href="'+d$.meta.home.l+'">'+
        '<img src="'+n$.nav.url+'img/logo.png"/>'+
        '<span class="hidden-sm">'+h$.framasoft+'</span>'+
      '</a>'+
      '<a href="#nav-end" id="nav-skip">'+d$.t.skip+'</a>'+
    '</div>'+
    '<div class="collapse navbar-collapse navbar-ex1-collapse">'+
      '<ul class="nav navbar-nav">';
          for (var k in d$.menu) {
            if(k != 'site' && k != 'community') {
              h$.nav +=
        '<li class="dropdown" id="fs_'+k+'">'+
          '<a href="#" class="dropdown-toggle" data-toggle="dropdown">'+h$.menu[k].name+'<b class="caret"></b></a>'+
          '<ul class="dropdown-menu">'+h$.menu[k].nav+'</ul>'+
        '</li>';
            }
          }
        h$.nav +=
        '<li><a href="'+d$.meta.soutenir.l+'/?f=nav" class="btn-soutenir" '+h$Popover(d$.meta.soutenir.t1, d$.meta.soutenir.d1, 'bottom')+'>'+
          h$icon(d$.meta.soutenir.i)+'&nbsp;'+d$.meta.soutenir.s+
        '</a></li>'+
        '<li id="btn-benevalo"><a href="'+d$.meta.benevalo.l+'" class="btn-info" '+h$Popover(d$.meta.benevalo.t1, d$.meta.benevalo.d1, 'bottom')+'>'+
          h$icon(d$.meta.benevalo.i)+'&nbsp;'+d$.meta.benevalo.s+
        '</a></li>'+
        '<li id="btn-myframa"><a href="'+d$.meta.myframa.l+'" class="btn-primary" '+h$Popover(d$.meta.myframa.t1, d$.meta.myframa.d1, 'bottom')+'>'+
          h$icon(d$.meta.myframa.i)+'&nbsp;'+d$.meta.myframa.s+
        '</a></li>'+
      '</ul>'+
    '</div>'+
  '</div>'+
  '<a id="nav-end" class="sr-only"></a>'+
'</nav>'+
'<a href="'+d$.meta.soutenir.l+'/?f=macaron" id="framanav_donation" rel="donBadge" style="display:none" class="hidden-xs">'+h$SR(d$.meta.soutenir.s)+'</a>';

        /** On balance le code html **/
        f$('#framanav_container').prepend(h$.nav);
        // Placement des popovers à gauche
        f$('#fs_services li:odd a, #fs_about li:even a').attr('data-placement','left');
        // Réagencement À propos
        f$('#fs_about li').has('a[href*="status."]').after(d$.menu['about'].site);
        f$('#fs_about .fs_git').before(f$('#fs_about .fs_aide,#fs_about .fs_faq,#fs_about .fs_doc'));

        f$('#fs_about ul').prepend('<li class="dropdown-header">'+h$.framasoft+'</li>'+h$.divider);
        f$('#fs_services li:eq(0)').addClass('dropdown-header');
        f$('#fs_services li:eq(0) a').wrapInner('<b>');
        // Ajout des dividers
        f$('#framanav .dropdown-menu li')
          .has(
            'a[href$="framastart.org"], a[href*="zic.org"], a[href*="enventelibre.org"],'+
            'a[href*="degooglisons"], a[href*="maestro.org"], a[href*="carte.org"], a[href*="minetest.org"], a[href*="news.org"],'+
            ' a[href*="framagit.org"], a[href*="frama.wiki"],'+
            ' a[href*="petitions.org"], a[href*="wikipedia.org"], a[href*="plus.google"], a[href*="status."]'
          )
          .after(h$.divider);

        /**
         * Mobile/Desktop
         **/
        // On ajoute du viewport et des boutons mobile/desktop
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
        var today = Math.floor(new Date().getTime() / 1000);
        var fullMoon = 1453603580; // 24/01/2016 02:46:20
        var moonRev = 2551443;     // 29j 12h 44m 3s

        if((today - fullMoon)%moonRev < 129600 || (today - fullMoon)%moonRev > moonRev-129600) {
          f$('#btn-benevalo').show();
          f$('#btn-benevalo').prev().hide();
        }
        // MyFrama
        if (!n$.inframe) {
          var bm_url = location.href;
          var bm_title = document.title || bm_url;
          var myframa = 'https://my.framasoft.org/?post=' + encodeURIComponent(bm_url)+
            '&title=' + encodeURIComponent(bm_title)+
            '&description=' + encodeURIComponent(document.getSelection())+
            '&source=bookmarklet';

          function f$popup(url) {
            window.open(
              url,'_blank','menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1'
            );
          }
          f$('#btn-myframa').on('click', function() {
            window.open(
              myframa,'myframa',
              'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1'
            );
            return false;
          });
          f$('#btn-myframa a').attr('href', myframa)
        }

        // Footer
        if(c$.footer && !n$.inframe) {

          h$.footer =
'<footer id="framafooter" class="row hidden-print" role="contentinfo">'+
  '<div class="container">'+
    '<div class="clearfix col-sm-8">'+
      '<nav class="col-xs-4">'+
        '<h1>'+d$.meta.home.p+d$.meta.home.s+'</h1>'+
        '<ul class="list-unstyled">'+
          '<li><a href="'+d$.f.asso.l+'">'+h$.f.asso.name+'</a></li>'+
          '<li><a href="'+d$.f.charte.l+'">'+h$.f.charte.name+'</a></li>'+
          '<li><a href="'+d$.f.contact.l+'">'+h$.f.contact.name+'</a></li>'+
          '<li><a href="'+d$.f.stats.l+'">'+h$.f.stats.name+'</a></li>'+
          '<li><a href="'+d$.f.status.l+'">'+h$.f.status.name+'</a></li>'+
        '</ul>'+
      '</nav>'+
      '<nav class="col-xs-4">'+
        '<h1>'+d$.menu.community.name+'</h1>'+
        '<ul class="list-unstyled">'+
          '<li><a href="'+d$.f.participer.l+'">'+h$.f.participer.name+'</a></li>'+
          '<li><a href="'+d$.f.benevalo.l+'">'+h$.f.benevalo.name+'</a></li>'+
          '<li><a href="'+d$.f.partenaires.l+'">'+h$.f.partenaires.name+'</a></li>'+
          '<li><a href="'+d$.f.agora.l+'">'+h$.f.agora.name+'</a></li>'+
        '</ul>'+
      '</nav>'+
      '<nav class="col-xs-4">'+
        '<h1>'+d$.menu.site.name+'</h1>'+
        '<ul class="list-unstyled">'+
          '<li><a href="'+d$.f.aide.l+'">'+h$.f.aide.name+'</a></li>'+
          '<li class="fs_faq"><a href="'+d$.f.faq.l+'">'+h$.f.faq.name+'</a></li>'+
          '<li><a href="'+d$.f.legals.l+'">'+h$.f.legals.name+'</a></li>'+
          '<li><a href="'+d$.f.cgu.l+'"><abbr>'+h$.f.cgu.name+'</abbr></a></li>'+
          '<li><a href="'+d$.f.credits.l+'">'+h$.f.credits.name+'</a></li>'+
        '</ul>'+
      '</nav>'+
    '</div>'+
    '<div class="col-sm-4">'+
      '<div class="col-xs-12">'+
        '<h1>'+d$.menu.follow.name+'</h1>'+
        '<ul class="list-inline">'+h$.menu.follow.footer+'</ul>'+
        '<h2>'+h$.f.newsletter.name+'</h2>'+
        '<form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2" method="post" name="subscribeform">'+
          '<div class="input-group input-group-sm">'+
            '<input class="form-control" title="'+d$.t['type-your-email']+'" name="email" size="40" type="text" placeholder="'+d$.t['your-email']+'" />'+
              '<span class="input-group-btn">'+
              '  <button class="btn btn-default" name="subscribe" type="submit" value="subscribe">'+d$.t.subscribe+h$SR(d$.t['to-the-newsletter'])+'</button>'+
              '</span>'+
            '</div>'+
            '<input name="htmlemail" type="hidden" value="1" /> <input name="list[5]" type="hidden" value="signup" /> <input name="listname[5]" type="hidden" value="Newsletter" />'+
            '<div style="display: none;"><input name="VerificationCodeX" size="20" type="text" value="" /></div>'+
        '</form>'+
      '</div>'+
    '</div>'+
  '</div>'+
'</footer>';

          f$('body').append(h$.footer);

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
            setTimeout( function() { // au cas où une animation redimentionne le body
              if(f$('body').height() < f$(window).height()) {
                f$('#framafooter').css('position','absolute');
              } else {
                f$('#framafooter').css('position','relative');
              }
            }, 800);
          });
        }

        /*******************
         *   BootStrap JS
         *******************/
        if (c$.js.b$) {
          if (typeof f$().modal == 'function' || c$.js.b$ == 'html') {
            console.log('✔ Bootstrap HTML');
            go_BootStrap();
          } else {
            f$.getScript(n$.nav.url+'lib/bootstrap/js/bootstrap.min.js', function() {
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
          f$('link[href*="/nav/css/nav.css"]').before('<link href="'+n$.nav.url+'lib/video-js/video-js.css" media="all" rel="stylesheet"/>');
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

          f$.getScript(n$.nav.url+'lib/video-js/video.js', function() {
            console.log('✔ video.js');
            videojs.options.flash.swf = n$.nav.url+'lib/video-js/video-js.swf';
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
        f$('head').append(h$.rssLink);

        // Favicon et Apple touch icon
        if (!c$.icons.keep) {
          f$('link[rel*=icon]').remove();
          c$.icons.fav = (!c$.icons.fav) ? 'favicon-violet.png' : c$.icons.fav;
          c$.icons.apple = (!c$.icons.apple) ? 'apple-violet.png' : c$.icons.apple;
          f$('head').append('<link rel="icon" type="image/png" href="'+n$.nav.url+'img/icons/'+c$.icons.fav+'" />');
          f$('head').append('<link rel="apple-touch-icon" href="'+n$.nav.url+'img/icons/'+c$.icons.apple+'" />');
        }

        // Opt-in
        var f$_optin_dejavu = f$Cookie('r','opt-in');
        if (c$.optin[0]!='' && !f$_optin_dejavu) {
          f$(c$.optin[0]).after(
            h$Alert('info', 'fs_opt-in',
              '<input type="checkbox" id="fs_opt-in_checkbox" value="false" />'+
              '<label for="fs_opt-in_checkbox">'+d$.meta.optin.t+'</label>'+
              '<br /><small>'+d$.meta.optin.d1+
                '&nbsp;<a href="'+d$.f.newsletter.l+'" id="link-opt-in" target="_blank" >'+d$.meta.optin.d2+h$.newwindow+'</a>'+
              '</small>'
            )
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
                h$Alert('danger', 'fs_opt-in_error', d$.meta.optin.e2)
              );
              return false;
            } else if( !i$Email(f$(c$.optin[0]).val())) {
              f$(c$.optin[0]).after(
                h$Alert('danger', 'fs_opt-in_error', d$.meta.optin.e2.replace('%f$_email%', f$_email))
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
                h$Alert(
                  'success', 'fs_opt-in_confirm',
                  d$.meta.optin.s1.replace('%f$_email%', f$_email),
                  true
                )
              );
            }
          });
        }

        // Macaron
        if(c$.donate && !n$.inframe) {
          f$('#framanav_donation').show().delay(Math.random() * (29000 - 1000) + 1000).fadeOut(600).fadeIn(600);
        }

        // Liens À propos
        f$('#framafooter a[href*="/nav/html/"], #fs_about a').attr('href', function() {
          return f$(this).attr('href')
                         .replace('credits.html', 'credits.html#'+c$.credits)
                         .replace('legals.html', 'legals.html#'+c$.host);
        });

        // Crédits
        if(i$('/html/credits.html') && location.hash) {
          f$('#site-credits').load(n$.nav.url+'html/credits/'+location.hash.replace('#','')+'.html');
        };

        // Hébergeur et Iframe Piwik sur Mentions légales
        if(i$('/html/legals.html')) {
          if(location.hash) {
            f$('#modal-legals-host').load(n$.nav.url+'html/host/'+location.hash.replace('#','')+'.html');
          }
          f$('#piwik-iframe').html('<iframe style="border: 0; height: 200px; width: 600px;" src="'+c$.piwik.url+'/index.php?module=CoreAdminHome&action=optOut&language=fr"></iframe>')
        }

        // Ext.js
        if (typeof c$.js.ext === "function") {
          c$.js.ext();
        } else if(c$.js.ext === true) {
          f$.getScript(n$.nav.url+'ext/'+n$.site+'.js');
        } else if(typeof c$.js.ext === "string") {
          f$.getScript(n$.nav.url+'ext/'+c$.js.ext+'.js');
        }
        /** On peut ajouter des scripts jQuery "génériques" ici mais... **/

        function go_BootStrap() {
          // Redéfini f$ pour Bootstrap en mode noConflict si nécessaire
          switch (c$.js.j$) {
            case 'noConflict': var f$ = jQuery.noConflict(); break;
            default          : var f$ = jQuery; break;
          }

          /**
           *  Accessibilité
           *  code issu de https://github.com/paypal/bootstrap-accessibility-plugin
           **/
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
              f$('body').addClass('fnav-fixed');
            }

            // Liens de la nav à ouvrir dans un onglet
            if(!i$('/nav/html/')) {
              f$('#framanav .dropdown-menu a').attr('target','_blank').append(h$.newwindow);
            }

            /** ... on ajoute surtout les scripts qui font appel à BootStrap et jQuery ici **/

            // Activation des popovers
            if(typeof f$().popover == 'function') {
              f$('a[rel="popover"]').each(function() {
                f$(this).popover({
                  html: true,
                  trigger: 'focus hover'
                });
                f$(this).removeAttr('title');
              });
            }

            // Modal et Alert d'info
            var f$_alert_dejavu = f$Cookie('r','nav-alert');
            var f$_modalInfo_dejavu = f$Cookie('r',c$.modal.info[2]);

            // Modal
            if (c$.modal.info[0]!='') {
              f$('body').append(
                h$Modal( // id, title, body, footer
                  'finfo', c$.modal.info[0],
                  c$.modal.info[1],
                  '<button class="btn" id="modal-close" data-dismiss="modal">'+d$.t.close+'</button>'+
                  '<button class="btn btn-primary" id="modal-set-cookie" >'+d$.t.nevershow+'</button>'
                )
              );

              if(!f$_modalInfo_dejavu) {
                f$('#modal-finfo').modal('show');
                f$('#modal-set-cookie').click(function() {
                  f$Cookie('w',c$.modal.info[2],true,c$.modal.info[3]); // cookie pour 7 jours par défaut (cf config ci-dessous)
                  f$('#modal-finfo').modal('hide');
                });
                f$('#modal-finfo .close, #modal-close').click(function() {
                  f$Cookie('w',c$.modal.info[2],true); // cookie pour la session
                  f$('#modal-finfo').modal('hide');
                });
              }
            }

            // Alert
            if (c$.alert[1]!='' && !f$_alert_dejavu) {

              f$_alert_margin_top = '';
              if (c$.fixed || i$('/nav/html/')) {
                f$('#framanav_container ~ *:not(script):first').css('margin-top', '-=42');
              }

              f$('#framanav_container').after(
                h$Alert(
                  c$.alert[0], 'nav-alert',
                  '<div style="margin:0 auto; max-width:800px;"><p class="text-center">'+c$.alert[1]+'</p></div>',
                  true
                )
              );

              // Cookie enregistré en fermant (7 jours par défaut cf config.js)
              f$('#nav-alert').bind('closed.bs.alert', function () {
                f$Cookie('w',c$.alert[2],true,c$.alert[3]);
              });

            }

            // Fenêtre modal pour dons sur téléchargements
            if (c$.modal.don[0]!='') {
              f$('body').append(
                h$Modal(
                  'soutenir', d$.meta.modaldon.t,
                  // body
                  '<div id="lldemars-framasoft"></div>'+
                  d$.meta.modaldon.d[0].replace('%c$.modal.don[1]%', c$.modal.don[1])+
                  d$.meta.modaldon.d[1]+d$.meta.modaldon.d[2]+d$.meta.modaldon.d[3],
                  // footer
                  '<div class="clearfix"><p class="col-md-12 text-center"><a target="_blank" id="modal-don" href="'+d$.meta.soutenir.l+'/?f=modal&s='+n$.site+'" class="btn btn-soutenir btn-block">'+h$icon(d$.meta.soutenir.i)+' '+d$.meta.modaldon.b1+h$.newwindow+'</a></p>'+
                  '<!--<p class="col-md-6 text-center"><a target="_blank" id="modal-contact" href="'+d$.f.participer.l+'" class="btn btn-info btn-block">'+h$icon(d$.f.participer.i)+' '+d$.meta.modaldon.b2+h$.newwindow+'</a></p>-->'+
                  '<p class="col-md-6 text-center"><a id="modal-dl" href="javascript:void(0);" class="btn btn-xs btn-default btn-block" >'+d$.meta.modaldon.b3.replace('%c$.modal.don[2]%',c$.modal.don[2])+'</a></p>'+
                  '<p class="col-md-6 text-center"><a id="modal-dl2" href="javascript:void(0);" class="btn btn-xs btn-default btn-block" style="line-height: 36px;">'+d$.meta.modaldon.b4+'<br></a></p></div>'
                )
              );

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
                    link=f$Link(f$(this).attr('href'));
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

            // Modal FAQ
            if(d$.f.faq.l.indexOf(n$.name.toLowerCase()) > -1) {
              f$('body').append(
                h$Modal(
                  'fsFAQ', d$.f.faq.s+' '+n$.name,
                  '',
                  '<span class="pull-left">'+d$.t["another-question"]+' <a href="'+d$.f.contact.l+'">'+d$.t["contact-us"]+'</a></span> <button class="btn" id="modal-close" data-dismiss="modal">'+d$.t.close+'</button>',
                  'lg'
                )
              );
              f$('.fs_faq a').on('click', function() {
                if(f$('#modal-fsFAQ .modal-body').html() == '') {
                  f$('#modal-fsFAQ .modal-body').load('https://contact.framasoft.org/foire-aux-questions/ #'+n$.name.toLowerCase()+' .list-group-item', function(data) {
                    if( f$(data).find('#'+n$.name.toLowerCase()).length < 1 ) {
                      window.location.href = f$('.fs_faq a').attr('href');
                    } else {
                      f$('#modal-fsFAQ').modal('show');
                    }
                  });
                } else {
                  f$('#modal-fsFAQ').modal('show');
                }
                return false;
              });
            }
          }// </!n$.inframe>
        } // </go_BootStrap>
      }); // </nav.html>
  }); // </document.ready>
}   // </start_jQuery>

/************************ Fonctions globales **************************/
//----------------------Fonctions f$ -----------------------------------
// Conversion en url absolue (c'est le navigateur qui fait lui-même le boulot)
function f$Link(href) {
  var link = document.createElement("a");
  link.href = href;
  return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);
}

// Import de la config l$ dans c$
// ou du fichier de lang (en) dans d$ (fr)
function f$Merge(global, local) {

  function MergeRecursive(obj1, obj2) {
    for (var p in obj2) {
      try {
        if ( obj2[p].constructor == Object ) {
          obj1[p] = MergeRecursive(obj1[p], obj2[p]);
        } else if (obj2[p].constructor == Array) {
          for (var i = 0; i < obj2[p].length; i++) {
            obj1[p][i] = obj2[p][i];
          }
        } else {
          obj1[p] = obj2[p];
        }
      } catch(e) {
        obj1[p] = obj2[p];
      }
    }
    return obj1;
  }

  MergeRecursive(global, local);
}

// Cookies
function f$Cookie(set, name, value, time) {

  if (set == 'w') {

    time = typeof time !== 'undefined' ? time : 365*24*60*60*1000;
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + time);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + expires.toGMTString();

  } else {

    var oRegex = new RegExp("(?:; )?" + name + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
      return decodeURIComponent(RegExp["$1"]);
    } else {
      return null;
    }

  }

}

// Ajout de scripts (quand jQuery est prêt utiliser plutôt f$.getScript())
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
function f$LoadCSS(css) {
  function AddLink(stylesheet, position) {
    var link = document.createElement('link');
        link.rel = "stylesheet";

    switch( stylesheet ) {
      case '0': // Bootstrap
        link.media = (css.b$) ? 'all' : 'none';
        link.href  = n$.nav.url+'lib/bootstrap/css/bootstrap.min.css';
      break;
      case '2': // Font-Awesome
        link.media = 'all';
        link.href   = n$.nav.url+'lib/font-awesome/css/font-awesome.min.css';
      break;
      case '3': // Nav
        link.media = 'screen';
        link.href   = n$.nav.url+'css/nav.css?'+n$.version;
      break;
      case '4': // Frama
        link.media = (css.frama) ? 'all' : 'none';
        link.href   = n$.nav.url+'css/frama.css?'+n$.version;
      break;
      case '5': // Ext
        link.media = (css.ext) ? 'all' : 'none';
        if(typeof css.ext === 'boolean') {
          link.href   = n$.nav.url+'ext/'+n$.site+'.css?'+n$.version;
        } else {
          link.href   = n$.nav.url+'ext/'+css.ext+'.css?'+n$.version;
        }
      break;
    }
    if(link.media != 'none' && stylesheet != '1') {
      // Ajout au début du <head>
      if ( position != undefined ) {
        document.getElementsByTagName('head')[0].insertBefore(
          link,
          document.getElementsByTagName('head')[0].firstChild
        );
      // Ajout à la fin <head>
      } else {
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    }
  }

  /** Parcours décroissant à partir de la position du '1' (= css du site)
   *  exemple 02-1-345 → on commence par le 2 puis le 0 **/
  for(var i = css.order.indexOf('1'); i >= 0; i--) {
    AddLink(css.order[i], 'first');
  }
  /** Parcours croissant pour le reste
   * exemple 02-1-345 → dans l'ordre 3, 4 et 5 **/
  for(var i = css.order.indexOf('1'); i < css.order.length; i++) {
    AddLink(css.order[i]);
  }
}

//----------------------Fonctions HTML ---------------------------------
// Modales
function h$Modal(id, title, body, footer, lg) {
  lg = (lg == undefined) ? '' : ' modal-lg';
  var html =
    '<div class="modal fade" lang="'+d$.meta.lg+'" id="modal-'+id+'" tabindex="-1" role="dialog" aria-labelledby="modal-'+id+'Label" aria-hidden="true">'+
      '<div class="modal-dialog'+lg+'">'+
        '<div class="modal-content">'+
          '<div class="modal-header">'+
            '<button type="button" class="close" data-dismiss="modal" title="'+d$.t.close+'"><i aria-hidden="true">&times;</i>'+h$SR(d$.t.close)+'</button>'+
            '<h1 id="modal-'+id+'Label">'+title+'</h1>'+
          '</div>'+
          '<div class="modal-body">'+body+'</div>'+
          '<div class="modal-footer">'+footer+'</div>'+
        '</div>'+
      '</div>'+
    '</div>';
  return html;
}

// Popover
function h$Popover(title, description, placement) {
  html = ( title != undefined && description != undefined )
       ? 'rel="popover" data-content="'+description+'" title="'+title+'"'
       : '';
  html += ( placement != undefined )
        ? ' data-placement="'+placement+'"'
        : '';
  return html;
}

// Alert
function h$Alert(type, id, body, close) {
  close = ( close )
        ? '<button type="button" class="close" data-dismiss="alert" title="'+d$.t.close+'"><i aria-hidden="true">&times;</i>'+h$SR(d$.t.close)+'</button>'
        : ''
  html = '<div class="alert alert-'+type+' fade in" id="'+id+'">'+close+body+'</div>'
  return html;
}

// Texte pour lecteur d'écran
function h$SR(text) {
  return '<span class="sr-only">'+text+'</span>';
}

// Icône Font-Awesome
function h$icon(classCSS) {
  return '<i class="fa fa-fw fa-lg '+classCSS+'" aria-hidden="true"></i>';
}

//----------------------Fonctions i$ -----------------------------------
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

// Version de jQuery à utiliser
/**
  si undefined              → AJAX
  si 1.9.0 < jquery < 3.0.0 → HTML
  sinon                     → noConflict
  /!\ si $ déjà défini (prototype, mootools, etc)
  **/
function i$jQuery() {
  if (window.jQuery === undefined) {
    return 'AJAX';
  } else {
    var version = window.jQuery.fn.jquery.split(' ')[0].split('.');
    if ( (version[0] < 2 && version[1] < 9)                        // < 1.9
         || (version[0] == 1 && version[1] == 9 && version[2] < 1) // 1.9.0
         || (version[0] > 2) ) {                                   // 3.x
      return 'noConflict';
    } else {
      return 'HTML';
    }
  }
}

function i$Agent() {
  return (/Framatech/i.test(window.navigator.userAgent));
}

function i$Before(date) {
  return new Date(new Date().toDateString()) < new Date(date);
}

function i$After(date) {
  return new Date(new Date().toDateString()) > new Date(date);
}

/***********************************************************************
 *                           Config globale                            *
 ***********************************************************************/
var c$ = {
  js: {
    j$: i$jQuery(),                 // 'AJAX'       = jQuery de la nav ;
                                    // 'HTML'       = jQuery (1.9.1 ou +) présent dans la page ;
                                    // 'noConflict' = variable $ et jQuery renommés en js ;
    b$: 'bootstrap',                // 'bootstrap'  = bootstrap de la nav;
                                    // 'html'       = bootstrap présent dans la page ;
                                    //  false       = on désactive bootstrap
    ext: false,                     // ext/n$.site.js si true ou bien une fonction lancée au dom.ready
    audio: false,
    video: false
  },
  css: {
    order: '012345',                /** cas possibles : 012345, 102345, 015234 **/
    b$: true,                       // 0 : bootstrap
                                    // 1 : css du site
                                    // 2 : font-awesome
                                    // 3 : nav.css
    frama: true,                    // 4 : frama.css
    ext:false                       // 5 : nav/ext/n$.site.css si true
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
    info: ['', '', 'modal-info', 604800000],
    /** [titre, texte, nom du cookie, durée du cookie (7 jours)] **/
  },
  alert: ['black', '', 'nav-alert', 604800000],
  /** [couleur (classes bootstrap), texte, nom du cookie, durée du cookie (7 jours)] **/
  mute: false,  // désactive macaron, modal, alert

  optin: ['', '', 'opt-in', 604800000],
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

// Bandeau soutenir défiscalisation
var f$_today = new Date();
var f$_dd = f$_today.getDate();
var f$_mm = f$_today.getMonth()+1;
var f$_yyyy = f$_today.getFullYear();



if(f$_mm == 12 && (31-f$_dd) < 16 && n$.site != 'soutenir') {
  f$_rebours = ((31-f$_dd) == 0) ? '24 heures' : 31-f$_dd+' jours';
  c$.alert[0] = 'info';
  c$.alert[1] =
    'Rappel : il vous reste <b>'+f$_rebours+'</b> pour faire un <b>don défiscalisé en '+f$_yyyy+'</b> à Framasoft.'+
    '<br/>Merci pour votre soutien <a href="https://soutenir.framasoft.org" class="btn btn-xs btn-soutenir"><i class="fa fa-heart" aria-hidden="true"></i><span class="sr-only">Faire un don ?</a>';
}

// Bandeau PeerTube
if( i$Before('2017/12/14') && n$.site != 'soutenir') {
  c$.alert[0] = 'danger';
  c$.alert[1] =
    '<p>Framasoft finance le développement de PeerTube, '+
    'un logiciel libre innovant qui pourra, dès 2018, révolutionner la manière dont '+
    'on voit, diffuse et héberge des vidéos en ligne.</p>'+
    '<p>Si, comme nous, vous croyez que <a href="https://framatube.org">Peertube peut briser l’hégémonie de YouTube</a> (et des autres), '+
    'contribuez à cet effort en soutenant Framasoft <a href="https://soutenir.framasoft.org" class="btn btn-xs btn-soutenir"><i class="fa fa-heart" aria-hidden="true"></i><span class="sr-only">Faire un don ?</a></p>'+
    '<div class="clearfix fsbarre hidden" style="max-width:500px;margin:10px auto"><div class="col-xs-10"><div class="progress" style="margin-bottom:0;"><div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="30000" style="width: 0%"><span class="dons"></span></div></div></div><div class="col-xs-2">30 000 €</div></div>';

  var startDons = 53000;
  setInterval(function(){
    if (window.jQuery !== undefined) {
      if(jQuery('.fsbarre').length && jQuery('.fsbarre').hasClass('hidden') ) {
        jQuery.getJSON( 'https://soutenir.framasoft.org/sites/all/dons/total.txt' )
          .fail(function() { console.error('✘ don') })
          .done( function(data) {
            if( (data-startDons)/900 > 66 ) {
              jQuery('.fsbarre .progress-bar').removeClass('progress-bar-danger').addClass('progress-bar-success');
              jQuery('.fsbarre .progress-bar').attr({
                'aria-valuenow':(data-startDons),
                'aria-valuenow':'90000',
                'style':'width:'+(data-startDons)/900+'%'
              });
              jQuery('.fsbarre .col-xs-2').text('90 000 €');
            } else if ( (data-startDons)/900 > 33 ) {
              jQuery('.progress-bar.active').removeClass('progress-bar-danger').addClass('progress-bar-warning');
              jQuery('.fsbarre .progress-bar').attr({
                'aria-valuenow':(data-startDons),
                'aria-valuenow':'60000',
                'style':'width:'+(data-startDons)/600+'%'
              });
              jQuery('.fsbarre .col-xs-2').text('60 000 €');
            } else {
              jQuery('.fsbarre .progress-bar').attr({
                'aria-valuenow':(data-startDons),
                'aria-valuenow':'30000',
                'style':'width:'+(data-startDons)/300+'%'
              });
            }
            jQuery('.fsbarre').removeClass('hidden');
            jQuery('.fsbarre .dons').text((data-startDons)+'€')
          });
      }
    }
  }, 500)
}

// Bandeau maintenance
/*if (/(bin|soft|forms|forum.|dvd|book|zic|date|cloud|participer.|memo|notes|talk|mindmap|wiki.|lab|soutenir.|contact.|android|start|10ans.|games|degooglisons-internet)/i.test(n$.site)) {
  c$.alert[0] = 'warning';
  c$.alert[1] =
    '<b>Message de service :</b> Mercredi 1er Février, dès 9h, nous procéderons à une migration importante sur nos serveurs. '+
    'En conséquence, <a href="https://status.framasoft.org/incident/195">de nombreux sites et services seront indisponibles</a>, et ce pendant plusieurs heures.';
}*/
