/***********************************************************************
 *                           Config globale                            *
 ***********************************************************************/
var f$_config = 'global';
var f$_jquery = 'jQuery';                           // 'jQuery'     = jQuery de la nav ;
                                                    // 'html'       = jQuery (1.10.2 ou +) présent dans la page ;
                                                    // 'noConflict' = variable $ et jQuery renommés en js ;

var f$_cache = true;                                // Obligatoire en prod

var f$_bootstrap_js = true;                         // true ; false ; 'html'
var f$_bootstrap_css = true;
var f$_css_position = 'start';                      // 'start' = head > bootstrap.css > ... /head body > nav.js ;
                                                    // 'end'   = head > ... > bootstrap.css /head body > nav.js ;
var f$_responsive = true;
var f$_frama_css = true;

var f$_nav_static = false;
var f$_extra_css = false;                           // nav/config/nom-de-domaine_extra.css
var f$_footer = true;                               // charger le fichier footer.html

// Popup de don
var f$_modal_don_txtdl1 = 'de télécharger';
var f$_modal_don_txtdl2 = 'télécharger';
var f$_modal_don_liendl = '';                       // selecteur jQuery ou 'onstart' pour l'afficher à l'ouverture de la page
var f$_modal_don_cookie = 7*24*60*60*1000;          // Expire au bout de 7 jours

// Alertes
var f$_alert_type = 'black';                        // warning = jaune ; danger = rouge ; info = bleu ; success = vert
var f$_alert_text = '';                             // /!\ aux \' dans le texte
var f$_alert_cookie_name = 'nav-alert';
var f$_alert_cookie = 7*24*60*60*1000;              // Expire au bout de 7 jours

var f$_alert_modal_title = '';                      // /!\ aux \' dans le texte
var f$_alert_modal_text = '';                       // idem
var f$_alert_modal_onstart = true;                  // s'affiche à l'ouverture de la page ?
var f$_alert_modal_cookie_name = 'nav-alert-modal';
var f$_alert_modal_cookie = 7*24*60*60*1000;        // Expire au bout de 7 jours

// Faire un don (macaron)
var f$_donate = true;
var f$_donate_blink_time = 30000;

// Fonction pour désactiver tout ce qui peut géner sur certains sites
var f$_NoMsg = function() {
    f$_alert_text = '';       // Pas de bandeau
    f$_alert_modal_text = ''; // Pas de modale
    f$_modal_don_liendl = '';
    f$_donate = false;        // Pas de macaron
}

// Audio JS
var f$_audio_js = false;
// Video JS
var f$_video_js = false;

// Opt-in
var f$_email_field1 = '';
var f$_email_field2 = '';
var f$_optin_cookie_name = 'opt-in';
var f$_optin_cookie = 365*24*60*60*1000;            // Expire au bout d'un an

// Icônes
var f$_keep_icons       = false;                    // true pour connard.pro, pouhiou.com, etc
var f$_favicon          = false;                    // 'favicon-violet.png' par défaut
var f$_apple_touch_icon = false;                    // f$_site+'.png' par défaut

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

/***********************************************************************
 *                          Config des sites                           *
 ***********************************************************************/
// Alias
// On remplace juste la variable f$_site.
// Cette variable n'est utilisée que pour charger les fichiers extra_css,
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
    break;
    case 'framablog' :
        f$_nav_static = true;
        f$_audio_js = true;
        f$_video_js = true;
        f$_email_field1 = '#commentform #email';
    break;
    case 'framaboard' :
        if(f$_page('.framaboard')) {
            f$_jquery = 'html';f$_bootstrap = 'html';
            f$_footer = false;
            f$_NoMsg();
            f$_bootstrap_css = false;
            jQuery(document).ready(function() {
                jQuery('h1 .logo').html('<b class="violet">Frama</b><b class="vert">board</b>').removeClass('logo');
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
        f$_extra_css = true;
        jQuery('document').ready(function() {
            jQuery('.ui-page').css('margin-top','-42px');
        });
    break;
    case 'framacalc' :
        if(f$_page('framacalc.org/_start')) {
         // Si on est sur la page d'accueil
            f$_modal_don_txtdl1 = 'd’utiliser';
            f$_modal_don_txtdl2 = 'créer un calc';
            f$_modal_don_liendl = 'a[href*="framacalc.org/"]';
        } else {
         // Si on n'est dans ethercalc
            f$_jquery ='noConflict';
            if (f$_not_in_frame) {
                f$_extra_css = true;
            } else {
                f$_bootstrap_css = false;
            }
            f$_responsive = false;
            f$_NoMsg();
            f$_footer = false;
            f$_alert_modal_title = 'Avertissements';
            f$_alert_modal_text = "<h3>Suppression automatique</h3><p>Votre calc sera supprimé au bout d'un an d'inactivité (aucun accès, aucune modification pendant un an).<br/>Ceci nous permet d'éviter de faire grossir indéfiniment la base de données.</p><h3>Information</h3><p>Nous avons changé d'instance de Framacalc le 11 février 2015 suite à des bugs répétés. Pour retrouver votre calc, il vous faudra vous rendre sur <span style='white-space: nowrap;'>http://old.framacalc.org/le_nom_de_mon_calc</span></p><p>Pour exporter votre calc au format CSV, il suffit d'ajouter \".csv\" à la fin de l'adresse du calc (<span style='white-space: nowrap;'>https://framacalc.org/le_nom_de_mon_calc.csv</span>, <span style='white-space: nowrap;'>http://old.framacalc.org/le_nom_de_mon_calc.csv</span> pour l'ancienne instance)</p>";
            f$_alert_modal_cookie_name = 'nav-alert-modal-warning-framacalc';
        }
        f$_host = 'ovh';
    break;
    case 'framacarte' :
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'créer une carte';
        f$_modal_don_liendl = 'a.btn-primary[href*="/map/new/"]';
        if(f$_page('/map/') && f$_not_in_frame) {
            f$_extra_css = true;
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
        f$_extra_css = true;
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
        /** Extra <script> **/
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
    case 'framagames':
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'jouer';
        f$_modal_don_liendl = '.play a';
    break;
    case 'framakey':
        f$_jquery = 'noConflict';
        f$_nav_static = true;
        f$_modal_don_liendl = 'a[href*="files.framakey.org"]';
        /** Extra <script> **/
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
            f$_extra_css = true;
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
        /*f$_alert_type = 'warning';
        f$_alert_text =
            '<div style="margin:0 auto; max-width:800px;">'+
                '<p class="text-center">L’instance <b>mensuel</b>.framapad.org rencontre des difficultés pour synchroniser les données.<br/> Nous nous efforçons de résoudre ce problème.'+
                '<br/>Plus d’informations sur <a href="https://status.framasoft.org">status.framasoft.org</a> ou en suivant le hashtag #framasoft sur <a href="https://framasphere.org/tags/framasoft">Diaspora</a>/<a href="https://twitter.com/hashtag/framasoft">Twitter</a>.</p>'+
            '</div>';*/
        f$_video_js = true;
    break;
    case 'mypads.framapad':
        f$_jquery = 'html';
        f$_NoMsg();
        f$_footer = false;
        f$_credits = 'framapad';
        f$_apple_touch_icon = 'framapad.png';
    break;
    case 'instances.framapad':
        f$_jquery = 'html';
        if (f$_not_in_frame) {
            f$_extra_css = true;
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
        f$_extra_css = true;
        f$_footer = false;
    break;
    case 'framapic':
        f$_jquery = 'noConflict';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framapic';
        f$_modal_don_liendl = 'onstart';
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
        /** Extra <script> **/
        jQuery(document).ready(function() {
            jQuery('link[href*=bootstrap-complete]').remove();
        });
        /** </script> **/
    break;
    case 'framastats':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_nav_static = true;
    break;
    case 'framatube':
        f$_jquery = 'html';
        f$_video_js = true;
        f$_host = 'ovh';
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
                f$_extra_css = true;
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
    case 'framazic':
        f$_nav_static = true;
        f$_video_js = true;
    break;
    case 'framindmap':
        if(f$_page('framindmap.org/mindmaps')) {
            /* Si on n'est dans Mindmaps */
            f$_jquery = 'noConflict';
            f$_extra_css = true;
            f$_NoMsg();
            f$_footer = false;
        } else {
            f$_jquery = 'html'; f$_bootstrap_js = 'html';
            f$_bootstrap_css = false;
            f$_extra_css = true;
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
        f$_extra_css = true;
        f$_frama_css = false;
        f$_css_position = 'end';
        f$_alert_modal_text = '';
        f$_cache = false;
    break;
    case 'status.framasoft':
        f$_jquery = 'noConflict';
        f$_NoMsg();
        f$_footer = false;
        f$_nav_static = true;
        f$_apple_touch_icon = 'apple-orange.png';
    break;
    case 'wiki.framasoft':
        f$_jquery = 'noConflict';
        f$_alert_text = '';
        f$_extra_css = true;
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
if (/(frama.link|bag|bee|bin|calc|carte|cloud|date|games|git.|news|pad|pic|sphere|vectoriel|mindmap|board|drive|drop)/i.test(f$_site)) {
    f$_favicon = 'favicon-vert.png';
}
if (/(forum.|code|lab|phonie|wiki.)/i.test(f$_site)) {
    f$_favicon = 'favicon-jaune.png';
}
if (/(contact.|participer.|soutenir.|stats|status.)/i.test(f$_site)) {
    f$_favicon = 'favicon-orange.png';
}

if (/^(bot.framasoft|contact.framasoft|degooglisons-internet|forum.framasoft|framabag|framabee|framabin|framablog|framaboard|framabookin|framabook|framacalc|framacarte|framacloud|framacode|framacolibri|framadate|framadrive|framadrop|framadvd|framagames|framakey|framalab|framalang|frama.link|framandroid|framanews|framapack|framapad|framaphonie|framapic|framasoft|framasphere|framastart|framastats|framatube|framavectoriel|framazic|framindmap|participer.framasoft|soutenir.framasoft|wiki.framasoft)$/i.test(f$_site)) {
    f$_apple_touch_icon = f$_site+'.png';
}