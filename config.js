var f$_config = 'global';

/***********************************************************************
 *                          Config des sites                           *
 ***********************************************************************/
// Alias
// On remplace juste la variable f$_site.
// Cette variable n'est utilisée que pour charger les fichiers ext_css,
// credits et placer un tracker sur un lien de la modale Soutenir
switch (f$_site) {
    case 'localhost' : f$_site = 'localhost'; break;
    case 'noenaute' : f$_site = 'pouhiou'; break;
    case 'huit.re' : f$_site = 'frama.link'; break;
    case 'tontonroger' : f$_site = 'framabee'; break;
    case 'trouvons' : f$_site = 'framabee'; break;
    case 'test.framacalc' : f$_site = 'framacalc'; break;
}

if (/(n1.|n2.|n3.|n4.|n5.|n6.|nav.)/i.test(f$_site)) { f$_site = 'nav'; }

if (f$_site.indexOf('framaboard') > -1) { f$_site = 'framaboard'; }

if (f$_site.indexOf('framadate') > -1)  { f$_site = 'framadate'; }

if ((f$_site.indexOf('.framapad') > -1 && !(f$_site.indexOf('mypads.') > -1))
    || (f$_site.indexOf('mypads.framapad') > -1 && f$_page('/p/'))) {
    f$_site = 'instances.framapad';
}

// À propos
var f$_host = 'hetzner';
var f$_credits = f$_site;

switch (f$_site) {
    case 'bot.framasoft' : f$_NoMsg(); f$_footer = false; break;
    case 'connard' :
        f$_jquery = 'noConflict';
        f$_frama_css = false;
        f$_NoMsg();
        f$_keep_icons = true;
        f$_footer = false;
    break;
    case 'contact.framasoft' :
        f$_nav_static = true;
        f$_email_field1 = '#wpcf7-f24-p5-o1 .wpcf7-email';
        f$_ext_js = f$_ext_css = true;
    break;
    case 'degooglisons-internet' : f$_NoMsg(); break;
    case 'forum.framasoft' :
        f$_css_position = 'end';
        f$_email_field1 = '#email_confirm'; f$_email_field2 = '#email';
        f$_footer = false;
    break;
    case 'frama.link' :
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = f$_page('frama.link') ? 'utiliser Frama.link' : 'utiliser Huit.re';
        f$_modal_don_liendl = 'onstart';
        f$_video_js = true;
    break;
    case 'framabag' :
        if(f$_page('framabag.org/u')) { // Si on n'est pas dans wallabag
            f$_jquery = 'html'; f$_bootstrap_js = 'html';
            f$_NoMsg();
        }
    break;
    case 'framabee' :
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        jQuery(document).ready(function() {
            jQuery('#q').focus(); jQuery('.footer').hide(); jQuery('body').css('margin-bottom','0');
        });
    break;
    case 'framabin' :
        f$_jquery = 'html';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framabin';
        f$_modal_don_liendl = 'onstart';
        f$_video_js = true;
    break;
    case 'framablog' :
        f$_nav_static = true;
        f$_audio_js = true;
        f$_video_js = true;
        f$_email_field1 = '#commentform #email';
    break;
    case 'framaboard' :
        if(f$_page('.framaboard')) {
            f$_jquery = 'html'; f$_bootstrap_js = 'html';
            f$_footer = false;
            f$_NoMsg();
            f$_bootstrap_css = false; /* framaboard.css chargé en dur en amont de nav.css et frama.css */
            jQuery(document).ready(function() {
                jQuery('h1 .logo a').html('<b class="violet">Frama</b><b class="vert">board</b>');
                jQuery('h1 .logo').removeClass('logo');
            });
        } else {
            f$_email_field1 = '#registration #email';
        }
    break;
    case 'framabook' :
        f$_nav_static = true;
        f$_modal_don_liendl = 'a[href*="download-monitor/download.php?id="]';
    break;
    case 'framabookin' :
        f$_jquery = 'html';
        f$_nav_static = true;
        if (f$_page('framabookin.org/b')) {
            f$_NoMsg();
            f$_footer = false;
        }
        // Fix décalage de la nav
        f$_ext_css = true;
        f$_ext_js = function() { jQuery('.ui-page').css('margin-top','-42px') };
    break;
    case 'framacalc' :
        if(f$_page('framacalc.org/_start') || window.location.href == 'https://framacalc.org/') {
        // Si on est sur la page d'accueil
            f$_modal_don_txtdl1 = 'd’utiliser';
            f$_modal_don_txtdl2 = 'créer un calc';
            f$_modal_don_liendl = 'a[href*="framacalc.org/"]';
        } else {
        // Si on n'est dans ethercalc
            // Calcs à onglets
            if(top.location.href.indexOf('framacalc.org/=') > -1) {
                document.getElementById("framanav_container").style="height:42px; opacity:0";
                f$_not_in_frame = true;
            }

            f$_jquery ='noConflict';
            if (f$_not_in_frame) {
                f$_ext_css = true;
            } else {
                f$_bootstrap_css = false;
            }
            f$_responsive = false;
            f$_NoMsg();
            f$_footer = false;

            f$_ext_js = function() {jQuery(window).trigger('resize')}; //recalcul des dimensions
        }
        f$_host = 'ovh';
    break;
    case 'framacarte' :
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'créer une carte';
        f$_modal_don_liendl = 'a.btn-primary[href*="/map/new/"]';
        if(f$_page('/map/') && f$_not_in_frame) {
            f$_ext_css = true;
            f$_NoMsg();
            f$_footer = false;
        }
    break;
    case 'framacloud' :
        f$_nav_static = true;
        f$_audio_js = true;
        f$_video_js = true;
        f$_email_field1 = '#commentform #email';
    break;
    case 'framacode' :
    break;
    case 'framacolibri' :
        f$_jquery = 'noConflict';
        f$_NoMsg();
        f$_footer = false
        f$_ext_css = true;
    break;
    case 'framadate' :
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        var f$_dateLang = document.getElementsByTagName("html")[0].getAttribute("lang");
        if(f$_dateLang == "fr" ) {
            f$_modal_don_txtdl1 = 'd’utiliser';
            f$_modal_don_txtdl2 = 'créer un sondage';
            f$_modal_don_liendl = 'a[href*="create_poll.php?"]';
            if(f$_page('create_poll.php?')) { // Opt-in
                f$_email_field1 = '#formulaire input#email';
            }
        }
        /** <script> **/
        if(window.location.host == 'framadate.org') {
            jQuery(document).ready(function(){
                jQuery.getScript('/_charts/extra.js');
            });
        }
        /** </script> **/
    break;
    case 'framadvd':
        f$_modal_don_liendl = 'a[href*="iso.framadvd.org"]';
        f$_nav_static = true;
        f$_video_js = true;
    break;
    case 'framadrive':
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static= true;
        if( (f$_page('index.php/app') && !f$_page('registration')) || f$_page('index.php/setting')) {
            f$_footer = false;
            f$_NoMsg();
        } else {
            f$_footer = true;
            f$_video_js = true;
        }
    break;
    case 'framadrop':
        f$_video_js = true;
    break;
    case 'framagames':
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'jouer';
        f$_modal_don_liendl = '.play a';
    break;
    case 'framakey':
        f$_jquery = 'noConflict';
        f$_nav_static = true;
        f$_modal_don_liendl = 'a[href*="files.framakey.org"]';
        /** <script> **/
        jQuery('document').ready(function () {
            // Bouton edit dans la colonne de gauche
            jQuery('#sidebar a.wikilink[href$="SideBar?action=edit"]').attr('href',window.location.href+'?action=edit');
            // Flux RSS Framablog tout pourri
            jQuery('#sidebar div[style="padding: 2px; font-size: smaller; text-align: left; background-color: rgb(238, 238, 238); line-height: 1.3em; margin-left: −14px; -moz-border-radius:3px; border: 1px solid #999;"]').hide();
        });
        /** </script> **/
    break;
    case 'framalab': break;
    case 'framandroid': f$_nav_static = true; break;
    case 'framanews':
        if(f$_page('framanews.org/ttrss')) {
            // Si on n'est dans ttrss
            f$_ext_css = true;
            f$_jquery = 'noConflict';
            f$_NoMsg();
            f$_footer = false;
        }
        f$_host = 'iniz';
    break;
    case 'framapack':
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framapack';
        f$_modal_don_liendl = 'onstart';
    break;
//-- <framapad> ----------------------------------------------------------------
    case 'framapad':
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'créer un pad';
        f$_modal_don_liendl = 'a[href*=".framapad.org/p/"]';
        f$_video_js = true;
    break;
    case 'mypads.framapad':
        f$_jquery = 'html';
        f$_NoMsg();
        f$_footer = false;
        f$_credits = 'framapad';
        f$_apple_touch_icon = 'framapad.png';
        f$_ext_js = function() {
          setInterval(function() {
            if(jQuery('section.pad iframe').length > 0) {
              jQuery('main section.col-md-9').removeClass('col-md-9').addClass('col-md-12');
              jQuery('main aside.col-md-3').removeClass('col-md-3').addClass('col-md-12');
            } else {
              jQuery('main section.col-md-12').removeClass('col-md-12').addClass('col-md-9');
              jQuery('main aside.col-md-12').removeClass('col-md-12').addClass('col-md-3');
            }
          }, 1000)
        };
    break;
    case 'instances.framapad':
        f$_jquery = 'html';
        if (f$_not_in_frame) {
            f$_ext_css = true;
        } else {
            f$_bootstrap_css = false;
        }
        f$_NoMsg();
        jQuery('document').ready(function () {
            jQuery('#loading').append('<p class="small">Si le pad refuse de s’afficher, essayez de télécharger<br/>l’export <a href="'+location.href+'/export/html">html</a> ou <a href="'+location.href+'/export/txt">txt</a> de votre document et <a href="https://contact.framasoft.org/#framapad">contactez-nous</a>.</p>');
            jQuery('#exportopena, #exportetherpada').hide();
        });
        f$_footer = false;
        f$_credits = 'framapad';
        f$_apple_touch_icon = 'framapad.png';
        if(/(lite6.|mypads.|quotidien.|hebdo.|mensuel.|mestriel.|annuel.)/i.test(window.location.host)) {
            f$_alert_modal_title = 'Nouvelles fonctionnalités';
            f$_alert_modal_text =
            '<p>Nous avons apporté des modifications au fonctionnement de Framapad.</p>'+
            '<ul style="margin-left:30px">'+
                '<li>Réactivation des couleurs d’identification (auteurs identifiés par le surlignage en couleur).</li>'+
                '<li>Possibilité d’afficher une table des matières, en fonction des titres utilisés dans votre pad.</li>'+
                '<li>Possibilité d’afficher le pad en mode « page ».</li>'+
                '<li>Affichage du noms des auteurs au survol du texte.</li>'+
            '</ul>'+
            '<p>Ces modifications peuvent être activées/désactivées au niveau des paramètres de Framapad (roue crantée en haut à droite).</p>'+
            '<p>Pour plus d’informations, voir notre <a href="https://wiki.framasoft.org/projets/framapad">documentation</a>.</p>';
            f$_alert_modal_cookie_name = 'newFeatures201605';
            f$_alert_modal_cookie = 365*24*60*60*1000;

        }
        if(/(beta.framapad)/i.test(window.location.host)) {
            f$_alert_modal_title = 'Avertissement';
            f$_alert_modal_text = '<p>Cette instance de Framapad (<b>beta</b>.framapad.org) est instable et ne doit servir que pour des tests.<p>'+
            '<p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>'+
            '<p>Merci.<br />L’équipe technique</p>';
        }
        if(/(lite.framapad|lite2.|lite3.|lite4.|lite5.)/i.test(window.location.host)) {
            f$_alert_modal_title = 'Création des pads désactivée';
            f$_alert_modal_text = '<p>Nous vous informons que cette instance de Framapad ('+window.location.host+') ne peut plus accueillir de nouveaux pads.<p>'+
            '<p>Il reste bien évidement possible de travailler sur les pads déjà existants (ils ne seront pas supprimés)'+
            ' mais pour en créer de nouveaux, veuillez passer par <a href="https://framapad.org">la page d’accueil du site</a></p>'+
            '<p>Merci.<br />L’équipe technique</p>';
            f$_host = 'ovh';
        }
    break;
//-- </framapad> ---------------------------------------------------------------
    case 'framaphonie':
        f$_jquery = 'noConflict';
        f$_css_position = 'end';
        f$_ext_css = true;
        f$_footer = false;
    break;
    case 'framapic':
        f$_jquery = 'noConflict';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framapic';
        f$_modal_don_liendl = 'onstart';
        f$_video_js = true;
    break;
    case 'framasoft':
        f$_nav_static = true;
        f$_email_field1 = '#email_auteur';
        if(f$_url != 'http://framasoft.net/'
           && !f$_page('framasoft.net/accueil')
           && f$_url != 'http://framasoft.org/'
           && !f$_page('framasoft.org/accueil')) {
            // Mise en forme « Juste une image »
            flickr_t = jQuery('img[src$="_t.jpg"]').attr('src');
            flickr_m = flickr_t.replace('_t.jpg', '_m.jpg');
            jQuery('img[src$="_t.jpg"]').attr('src', flickr_m).css('width', '90%');
            f$_credits = 'framalibre';
            f$_favicon = 'favicon-bleu.png';
            f$_apple_touch_icon = 'framalibre.png';
        }
    break;
    case 'framasphere':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_css_position = 'end';
        /** <script> **/
        jQuery(document).ready(function() {
            jQuery('link[href*=bootstrap-complete]').remove();
        });
        /** </script> **/
    break;
    case 'framastats':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_nav_static = true;
    break;
    case 'framateam':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_ext_js = true;
        if(f$_page('/channel')||f$_page('/admin_console')||f$_page('/pl/')) {
            f$_nav_static = true;
            f$_footer = false;
            f$_NoMsg();
        } else {
            f$_ext_css = true;
        }
    break;
    case 'docs.framateam':
        f$_nav_static = true;
        f$_footer = false;
        f$_NoMsg();
    break;
    case 'framatube':
        f$_jquery = 'html';
        f$_video_js = true;
        f$_host = 'ovh';
        f$_alert_type = 'info';
        f$_alert_text =
            '<div style="margin:0 auto; max-width:800px;">'+
                '<p class="text-center"><b class="violet">Frama</b><b class="rouge">tube</b> est réservé à l’usage exclusif de <b class="violet">Frama</b><b class="orange">soft</b> pour le moment.'+
                '<br/>L’hebergement de vidéos sera <a href="https://degooglisons-internet.org/liste/#2017">ouvert au public en 2017</a> si nous en avons les moyens.</p>'+
            '</div>';
        if(f$_page('/embed_player')) {
            f$_not_in_frame = false;
            f$_NoMsg();
        }
    break;
    case 'framavectoriel':
        f$_jquery = 'noConflict';
        if(f$_page('svg-editor')) {
        // Si on n'est dans svg-editor
            if (f$_not_in_frame) {
                f$_ext_css = true;
            } else {
                f$_bootstrap_css = false;
            }
            f$_NoMsg();
            f$_footer = false;
        } else {
            f$_modal_don_txtdl1 = 'd’utiliser';
            f$_modal_don_txtdl2 = 'créer une image';
            f$_modal_don_liendl = 'a[href="/svg-editor.html"]';
            f$_video_js = true;
        }
    break;
    case 'framavox':
        f$_jquery = 'html'; //f$_bootstrap_js = 'html';
        f$_ext_css = true;
        f$_nav_static = !(f$_page('/marketing'));
        f$_video_js = f$_page('/marketing');
        if(!(f$_page('/marketing')||f$_page('users/sign')||f$_page('/start_group')||f$_page('users/password/new'))) {
            f$_footer = false;
            f$_NoMsg();
            f$_ext_js = true;
        }
    break;
    case 'framazic':
        f$_nav_static = true;
        f$_video_js = true;
    break;
    case 'framindmap':
        if(f$_page('framindmap.org/mindmaps')) {
            /* Si on n'est dans Mindmaps */
            f$_jquery = 'noConflict';
            f$_ext_css = true;
            f$_NoMsg();
            f$_footer = false;
        } else {
            f$_jquery = 'html'; f$_bootstrap_js = 'html';
            f$_bootstrap_css = false;
            f$_ext_css = true;
            f$_video_js = true;
            f$_email_field1 = '#user #email';
            if(!f$_page('framindmap.org/c/login') && !f$_page('framindmap.org/c/user/registration')) {
                f$_NoMsg();
            }
            if(f$_page('framindmap.org/c/maps/') && !f$_page('/edit')) {
                f$_modal_don_txtdl1 = 'd’utiliser';
                f$_modal_don_txtdl2 = 'utiliser Framindmap';
                f$_modal_don_liendl = 'onstart';
            }
            // Suppression de la nav dans l'éditeur
            if(f$_page('framindmap.org/c/maps') && f$_page('/edit')) {
                var f$_navcontainer = document.getElementById('framanav_container');
                f$_navcontainer.parentNode.removeChild(f$_navcontainer);
            }
        }
    break;
    case 'localhost':   break;
    case 'nav':
        f$_apple_touch_icon = 'framasoft.png';
    break;
    case 'participer.framasoft':
        f$_nav_static = true;
        f$_video_js = true;
    break;
    case 'pouhiou':
        f$_jquery = 'noConflict';
        f$_frama_css = false;
        f$_NoMsg();
        f$_keep_icons = true;
        f$_footer = false;
    break;
    case 'pootle.framasoft':
        f$_ext_css = true;
        f$_frama_css = false;
        f$_css_position = 'end';
        f$_alert_modal_text = '';
    break;
    case 'status.framasoft':
        f$_jquery = 'html';
        f$_NoMsg();
        f$_footer = false;
        f$_nav_static = true;
        f$_apple_touch_icon = 'apple-orange.png';
    break;
    case 'wiki.framasoft':
        f$_jquery = 'noConflict';
        f$_alert_text = '';
        f$_ext_css = true;
    break;
}

/***********************************************************************
 *                               Piwik                                 *
 **********************************************************************/
var f$_piwik_id = '';
var f$_piwik_url = 'https://stats.framasoft.org/';
switch (f$_site) {
    case 'framasoft' :              f$_piwik_id = '1';  break;
    case 'forum.framasoft' :        f$_piwik_id = '2';  break;
    case 'framablog' :              f$_piwik_id = '3';  break;
    case 'framapad' :               f$_piwik_id = '4';  break;
    case 'instances.framapad' :     f$_piwik_id = '4';  break;
    case 'framakey' :               f$_piwik_id = '5';  break;
    case 'framadvd' :               f$_piwik_id = '6';  break;
    case 'framabook' :              f$_piwik_id = '7';  break;
    case 'framatube' :              f$_piwik_id = '8';  break;
    case 'framazic' :               f$_piwik_id = '9';  break;
    case 'framadate' :              f$_piwik_id = '10'; break;
    case 'framacalc' :              f$_piwik_id = '11'; break;
    case 'framindmap' :             f$_piwik_id = '12'; break;
    case 'framavectoriel' :         f$_piwik_id = '13'; break;
    case 'framaphonie' :            f$_piwik_id = '14'; break;
    case 'wiki.framasoft' :         f$_piwik_id = '15'; break;
    case 'framalab' :               f$_piwik_id = '16'; break;
    case 'framacode' :              f$_piwik_id = '17'; break;
    case 'soutenir.framasoft' :     f$_piwik_id = '18'; break;
    case 'contact.framasoft' :      f$_piwik_id = '19'; break;
    case 'framanews' :              f$_piwik_id = '20'; break;
    case 'framabag' :               f$_piwik_id = '21'; break;
    case 'framandroid' :            f$_piwik_id = '22'; break;
    case 'framastart' :             f$_piwik_id = '23'; break;
    case 'framapack' :              f$_piwik_id = '24'; break;
    case '10ans.framasoft' :        f$_piwik_id = '25'; break;
    case 'framasphere' :            f$_piwik_id = '26'; break;
    case 'framabee' :               f$_piwik_id = '27'; break;
    case 'framagames' :             f$_piwik_id = '28'; break;
    case 'git.framasoft' :          f$_piwik_id = '29'; break;
    case 'degooglisons-internet' :  f$_piwik_id = '30'; break;
    case 'framapic' :               f$_piwik_id = '31'; break;
    case 'frama.link' :             f$_piwik_id = '32'; break;
    case 'participer.framasoft' :   f$_piwik_id = '33'; break;
    case 'framacolibri' :           f$_piwik_id = '33'; break;
    case 'framabin' :               f$_piwik_id = '34'; break;
    case 'framacloud' :             f$_piwik_id = '35'; break;
    case 'status.framasoft' :       f$_piwik_id = '37'; break;
    case 'framabookin' :            f$_piwik_id = '38'; break;
    case 'framastats' :             f$_piwik_id = '39'; break;
    case 'framadrive' :             f$_piwik_id = '40'; f$_piwik_url = 'https://framadrive.org/'; break;
    case 'framaboard' :             f$_piwik_id = '41'; break;
    case 'framadrop' :              f$_piwik_id = '42'; break;
    case 'framacarte' :             f$_piwik_id = '43'; break;
    case 'framaforms' :             f$_piwik_id = '44'; break;
    case 'framapetition' :          f$_piwik_id = '45'; break;
    case 'framavox' :               f$_piwik_id = '47'; break;
    case 'framateam' :              f$_piwik_id = '48'; break;
}

if(f$_piwik_id != '') {
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
      var u=f$_piwik_url;
      _paq.push(["setTrackerUrl", u+"piwik.php"]);
      _paq.push(["setSiteId", f$_piwik_id]);
      var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
      g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
    })();
}

/***********************************************************************
 *                             Favicons                                *
 **********************************************************************/
if (/(dvd|key|libre|android|pack|start)/i.test(f$_site)) {
    f$_favicon = 'favicon-bleu.png';
}
if (/(blog|book|lang|tube|zic)/i.test(f$_site)) {
    f$_favicon = 'favicon-rouge.png';
}
if (/(frama.link|bag|bee|bin|calc|carte|cloud|date|forms|games|git.|news|pad|petition|pic|sphere|team|vectoriel|vox|mindmap|board|drive|drop)/i.test(f$_site)) {
    f$_favicon = 'favicon-vert.png';
}
if (/(forum.|code|lab|phonie|wiki.)/i.test(f$_site)) {
    f$_favicon = 'favicon-jaune.png';
}
if (/(contact.|participer.|soutenir.|stats|status.)/i.test(f$_site)) {
    f$_favicon = 'favicon-orange.png';
}

if (/^(bot.framasoft|contact.framasoft|degooglisons-internet|forum.framasoft|framabag|framabee|framabin|framablog|framaboard|framabookin|framabook|framacalc|framacarte|framacloud|framacode|framacolibri|framadate|framadrive|framadrop|framadvd|framagames|framakey|framalab|framalang|frama.link|framandroid|framanews|framapack|framapad|framaphonie|framapic|framasoft|framasphere|framastart|framastats|framateam|framatube|framavectoriel|framavox|framazic|framindmap|participer.framasoft|soutenir.framasoft|wiki.framasoft)$/i.test(f$_site)) {
    f$_apple_touch_icon = f$_site+'.png';
}
