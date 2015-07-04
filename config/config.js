/***********************************************************************
 *                           Config globale                            *
 ***********************************************************************/
var f$_config = 'global'; // ← à virer
                                      
var f$_jquery = 'jQuery';                           // jQuery = jQuery de la nav ; fQuery = jQuery de la nav avec variables renommées pour éviter les conflits ; html = jQuery (1.10.2 ou +) présent dans la page
var f$_jquery_noconflict = false;                                               // Pas utile normalement

var f$_cache = true;                                // Obligatoire en prod

var f$_bootstrap_js = true;                         // true ; false ; html
var f$_bootstrap_css = true;
var f$_css_position = 'start';                      // 'start' = head > bootstrap.css > ... /head body > nav.js ;
                                                    // 'end'   = head > ... > bootstrap.css /head body > nav.js ;
var f$_responsive = true;
var f$_frama_css = true;

var f$_nav_static = false;
var f$_extra_css = false;                           // nav/config/nom-de-domaine_extra.css
var f$_extra_js = false;                            // nav/config/nom-de-domaine_extra.js

var f$_footer = false;                              // charger le fichier footer.html

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

var f$_alert_modal_btn = false;                     // bouton "plus d'info" dans le bandeau pour ouvrir la fenêtre modale
var f$_alert_modal_title = '';                      // /!\ aux \' dans le texte
var f$_alert_modal_text = '';                       // idem
var f$_alert_modal_onstart = true;                  // s'affiche à l'ouverture de la page ?
var f$_alert_modal_cookie_name = 'nav-alert-modal';
var f$_alert_modal_cookie = 7*24*60*60*1000;        // Expire au bout de 7 jours

// Faire un don (macaron)
var f$_donate = true;
var f$_donate_blink_time = 30000;

// Audio JS
var f$_audio_js = false;
// Video JS
var f$_video_js = false;

// Opt-in
var f$_email_field1 = '';
var f$_email_field2 = '';
var f$_optin_cookie_name = 'opt-in';
var f$_optin_cookie = 365*24*60*60*1000;            // Expire au bout d'un an

/***********************************************************************
 *                          Config des sites                           *
 ***********************************************************************/
f$_config = 'local'; // ← à virer

// Alias
// On remplace juste la variable f$_site.
// Cette variable n'est utilisée que pour charger les fichiers local_config,
// extra_css, extra_js et placer un tracker sur un lien de la modale Soutenir
switch (f$_site) {
    case 'localhost' : f$_site = 'localhost'; break;
    case 'beta.framapad' : f$_site = 'instances.framapad'; break;
    case 'lite2.framapad' : f$_site = 'instances.framapad'; break;
    case 'lite3.framapad' : f$_site = 'instances.framapad'; break;
    case 'lite4.framapad' : f$_site = 'instances.framapad'; break;
    case 'lite5.framapad' : f$_site = 'instances.framapad'; break;
    case 'lite6.framapad' : f$_site = 'instances.framapad'; break;
    case 'full1.framapad' : f$_site = 'instances.framapad'; break;
    case 'full2.framapad' : f$_site = 'instances.framapad'; break;
    case 'quotidien.framapad' : f$_site = 'instances.framapad'; break;
    case 'hebdo.framapad' : f$_site = 'instances.framapad'; break;
    case 'mensuel.framapad' : f$_site = 'instances.framapad'; break;
    case 'bimestriel.framapad' : f$_site = 'instances.framapad'; break;
    case 'semestriel.framapad' : f$_site = 'instances.framapad'; break;
    case 'annuel.framapad' : f$_site = 'instances.framapad'; break;
    case 'education.framapad' : f$_site = 'instances.framapad'; break;
    case 'sciences.framapad' : f$_site = 'instances.framapad'; break;
    case 'noenaute' : f$_site = 'pouhiou'; break;
    case 'beta.framadate' : f$_site = 'framadate'; break;
    case 'openbar.framadate' : f$_site = 'framadate'; break;
    case 'huit.re' : f$_site = 'frama.link'; break;
    case 'tontonroger' : f$_site = 'framabee'; break;
    case 'trouvons' : f$_site = 'framabee'; break;
    case 'test.framacalc' : f$_site = 'framacalc'; break;
}

// À propos
var f$_host = 'hetzner';
var f$_credits = f$_site;

var f$_NoMsg = function() {
    f$_alert_text = '';       // Pas de bandeau
    f$_alert_modal_text = ''; // Pas de modale
    f$_modal_don_liendl = ''; 
    f$_donate = false;        // Pas de macaron
}

switch (f$_site) {
    case 'bot.framasoft' :
        f$_NoMsg();
    break;
    case 'connard' :
        f$_jquery = 'fQuery';
        f$_frama_css = false;
        f$_NoMsg();
    break;
    case 'contact.framasoft' :
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static = true;
        f$_footer = true;
        f$_email_field1 = '#wpcf7-f24-p5-o1 .wpcf7-email';
    break;
    case 'degooglisons-internet' :
        f$_NoMsg();
    break;
    case 'forum.framasoft' :
        f$_css_position = 'end';
        f$_email_field1 = '#email_confirm'; f$_email_field2 = '#email';
    break;
    case 'frama.link' :
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = f$_page('frama.link') ? 'utiliser Frama.link' : 'utiliser Huit.re';
        f$_modal_don_liendl = 'onstart';
        f$_footer = true;
    break;
    case 'framabag' :
        if(f$_page('framabag.org/u')) { // Si on n'est pas dans wallabag
            f$_nav_extra_css = true;
            f$_jquery = 'fQuery';
            f$_NoMsg();
        }
    break;
    case 'framabee' :
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_footer = true;
    break;
    case 'framabin' :
        f$_jquery = 'html';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framabin';
        f$_modal_don_liendl = 'onstart';
        f$_footer = true;
    break;
    case 'framablog' :
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static = true;
        f$_footer = true;
        f$_audio_js = true;
        f$_video_js = true;
        //Opt-in
        //f$_email_field1 = '#c_mail';
    break;
    case 'framabook' :
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static = true;
        f$_footer = true;
        f$_modal_don_liendl = 'a[href*="download-monitor/download.php?id="]';
    break;
    case 'framabookin' :
        f$_jquery = 'html';
        f$_nav_static = true;
        if (!f$_page('framabookin.org/b')) {
            f$_footer = true;
        } else {
            f$_NoMsg();
        }
        // Fix décalage de la nav
        f$_extra_css = true;
        jQuery('document').ready(function() {
            jQuery('.ui-page').css('margin-top','-42px');
        });
    break;
    case 'framacalc' :
        if(f$_page('framacalc.org/_start')) { // Si on est sur la page d'accueil
            
            f$_modal_don_txtdl1 = 'd’utiliser';
            f$_modal_don_txtdl2 = 'créer un calc';
            f$_modal_don_liendl = 'a[href*="framacalc.org/"]';
            f$_footer = true;
        } else { // Si on n'est dans ethercalc
            f$_jquery ='fQuery';
            if (f$_not_in_frame) {
                f$_extra_css = true;
            } else {
                f$_bootstrap_css = false;
            }
            f$_responsive = false;
            f$_NoMsg();
            f$_alert_modal_title = 'Avertissements';
            f$_alert_modal_text = "<h3>Suppression automatique</h3><p>Votre calc sera supprimé au bout d'un an d'inactivité (aucun accès, aucune modification pendant un an).<br/>Ceci nous permet d'éviter de faire grossir indéfiniment la base de données.</p><h3>Information</h3><p>Nous avons changé d'instance de Framacalc le 11 février 2015 suite à des bugs répétés. Pour retrouver votre calc, il vous faudra vous rendre sur <span style='white-space: nowrap;'>http://old.framacalc.org/le_nom_de_mon_calc</span></p><p>Pour exporter votre calc au format CSV, il suffit d'ajouter \".csv\" à la fin de l'adresse du calc (<span style='white-space: nowrap;'>https://framacalc.org/le_nom_de_mon_calc.csv</span>, <span style='white-space: nowrap;'>http://old.framacalc.org/le_nom_de_mon_calc.csv</span> pour l'ancienne instance)</p>";
            f$_alert_modal_cookie_name = 'nav-alert-modal-warning-framacalc';
        }
        f$_host = 'ovh';
    break;
    case 'framacloud' :
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static = true;
        f$_footer = true;
        f$_audio_js = true;
        f$_video_js = true;
    break;
    case 'framacode' :
        f$_jquery = 'fQuery';
        f$_css_position = 'start';
        f$_footer = true;
    break;
    case 'framacolibri' :
        f$_jquery = 'fQuery';
        f$_NoMsg();
        f$_extra_css = true;
    break;
    case 'framadate' :
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'créer un sondage';
        f$_modal_don_liendl = 'a[href*="infos_sondage.php?choix_sondage="]';
        if(f$_page('infos_sondage.php?choix_sondage')) { // Opt-in
            f$_email_field1 = '#formulaire input[name="adresse"]';
        }
        f$_footer = true;
        /** Extra <script> **/
        // Somme des votes (fonctionnalité de la branche develop)
        if(window.location.host == 'framadate.org') {
            jQuery(document).ready(function(){
                // Graphique
                if(jQuery('html').attr('lang')=='fr') {
                    jQuery('tr#addition td:eq(0)').append('<br/>'+(jQuery('#tableContainer tbody tr').length-2)+' votants');
                    jQuery.getScript('/_charts/resultats.js');
                }
                // Somme des votes (fonctionnalité de la branche develop)
                jQuery('tr#addition td').each(function(index) {
                    countIfneedbe = jQuery('#tableContainer tbody td.bg-warning[headers]').filter('[headers$="S'+(index-1)+'"],[headers$="H'+(index-1)+'"]').length;
                    if(countIfneedbe>0) {
                        jQuery(this).append('<br/><span class="small text-muted">(+'+countIfneedbe+')</span>');
                    }
                });
                // Tutoriel
                if(jQuery('html').attr('lang')=='fr') {
                    jQuery('a[href*="aqg259dth55iuhwm"]').before('<a href="javascript:void(0)" data-toggle="modal" data-target="#TutoModal">lire le tutoriel détaillé ?</a> ou ');
                    jQuery('main .col-md-4:has(.glyphicon-question-sign)').append(
                    '<div class="modal fade" id="TutoModal" tabindex="-1" role="dialog" aria-labelledby="TutoModalLabel">'+
                        '<div class="modal-dialog modal-lg">'+
                             '<div class="modal-content">'+
                                  '<div class="modal-header">'+
                                       '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
                                       '<h4 class="modal-title" id="TutoModalLabel">Planifier un rendez-vous rapidement avec Framadate</h4>'+
                                  '</div>'+
                                  '<div class="modal-body" id="TutoImport">'+
                                  '</div>'+
                                  '<div class="modal-footer">'+
                                      '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                                  '</div>'+    
                             '</div>'+
                        '</div>'+
                    '</div>'
                    );
                    jQuery('#TutoImport').load("_tutoriel/tutoframadate.html .row", function() {
                        jQuery( "#TutoImport img" ).attr( "src", function( i, val ) {
                            return '_tutoriel/'+ val;
                        });
                        jQuery( "#TutoImport .row" ).after('<hr role="presentation" />');
                    });
                }
            });
        }
        /** </script> **/
    break;
    case 'framadvd':
        f$_jquery = 'fQuery';
        f$_modal_don_liendl = 'a[href*="iso.framadvd.org"]';
        f$_nav_static = true;
        f$_footer = true;
        f$_video_js = true;
    break;    
    case 'framagames':
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'jouer';
        f$_modal_don_liendl = '.play a';
        f$_footer = true;
    break;
    case 'framakey':
        f$_jquery = 'fQuery';
        f$_nav_static = true;
        f$_footer = true;
        f$_modal_don_liendl = 'a[href*="files.framakey.org"]';
    break;
    case 'framalab':
        f$_nav_static = true;
        f$_footer = true;
    break;
    case 'framandroid':
        f$_jquery = 'jQuery';
        f$_footer = true;
    break;
    case 'framanews':
        if(f$_page('framanews.org/ttrss')) {
            // Si on n'est dans ttrss
            f$_extra_css = true;
            f$_jquery = 'fQuery';
            f$_NoMsg();
        }
        f$_host = 'iniz';
    break;
    case 'framapack':
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framapack';
        f$_modal_don_liendl = 'onstart';
        f$_footer = true;
    break;
    case 'framapad':
        f$_jquery = 'fQuery';
        f$_css_position = 'end';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'créer un pad';
        f$_modal_don_liendl = 'a[href*=".framapad.org/p/"]';
        f$_video_js = true;
        f$_footer = true;
    break;
    case 'framaphonie':
        f$_jquery = 'fQuery';
        f$_css_position = 'end';
        f$_extra_css = true;
    break;
    case 'framapic':
        f$_jquery = 'fQuery';
        f$_modal_don_txtdl1 = 'd’utiliser';
        f$_modal_don_txtdl2 = 'utiliser Framapic';
        f$_modal_don_liendl = 'onstart';
        f$_footer = true;
    break;
    case 'framasoft':
        f$_nav_static = true;
        f$_email_field1 = '#email_auteur';
        if(f$_url != 'http://www.framasoft.net/'
           && f$_url != 'http://framasoft.net/'
           && !f$_page('framasoft.net/accueil')
           && f$_url != 'http://www.framasoft.org/'
           && f$_url != 'http://framasoft.org/'
           && !f$_page('framasoft.org/accueil')) {
            // Mise en forme « Juste une image »
            flickr_t = jQuery('img[src$="_t.jpg"]').attr('src');
            flickr_m = flickr_t.replace('_t.jpg', '_m.jpg');
            jQuery('img[src$="_t.jpg"]').attr('src', flickr_m).css('width', '90%');
            f$_credits = 'framalibre';
        } else {
            f$_footer = true;
        }
    break;
    case 'framasphere':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_css_position = 'end';
        f$_footer = true;
        /** Extra <script> **/
        jQuery(document).ready(function() {
            jQuery('link[href*=bootstrap-complete]').remove();
            jQuery('footer').remove();
            // A11y inscription-framasphere@framalistes.org
            jQuery('a[href="/users/sign_up"]').attr('aria-describeby','inscription-email');
            jQuery('a[href="/users/sign_up"]').after('<p id="inscription-email" class="alert text-left" style="font-size:smaller; max-width:250px; margin:10px auto; padding:10px; background:#eee; color:#555; border-color:#999">Si vous rencontrez des difficultés pour vous inscrire, notamment à cause du captcha, envoyez un email à inscription-framasphere@framalistes.org contenant l’identifiant que vous souhaitez utiliser.</p>');
        });
        /** </script> **/
    break;
    case 'framastats':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_nav_static = true;
        f$_footer = true;
    break;
    case 'framatube':
        f$_jquery = 'fQuery';
        f$_video_js = true;
        f$_host = 'ovh';
    break;
    case 'framavectoriel':
        f$_jquery = 'fQuery';
        if(f$_page('svg-editor')) {
        // Si on n'est dans svg-editor
            if (f$_not_in_frame) {
                f$_extra_css = true;
            } else {
                f$_bootstrap_css = false;
            }
            f$_NoMsg();
        } else {
            f$_footer = true;
            f$_modal_don_txtdl1 = 'd’utiliser';
            f$_modal_don_txtdl2 = 'créer une image';
            f$_modal_don_liendl = 'a[href="/svg-editor.html"]';
            f$_video_js = true;
        }
    break;
    case 'framazic':
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static = true;
        f$_footer = true;
        f$_video_js = true;
    break;
    case 'framindmap':
        if(f$_page('framindmap.org/mindmaps')) {
            /* Si on n'est dans Mindmaps */
            f$_jquery = 'fQuery';
            f$_extra_css = true;
            f$_NoMsg();
        } else {
            f$_jquery = 'html'; f$_bootstrap_js = 'html';
            f$_bootstrap_css = false;
            f$_footer = true;
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
    case 'instances.framapad':
        f$_jquery = 'fQuery';
        if (f$_not_in_frame) {
            f$_extra_css = true;
        } else {
            f$_bootstrap_css = false;
        }
        f$_NoMsg();
        f$_credits = 'framapad';
    break;
    case 'lite.framapad':
        f$_jquery = 'fQuery';
        f$_extra_css = true;
        f$_NoMsg();
        // Message arrêt de la création des pads
        f$_alert_modal_title = 'Création des pads désactivée';
        f$_alert_modal_text = '<p>Nous vous informons que cette instance de Framapad (<b>lite</b>.framapad.org) ne peut plus accueillir de nouveaux pads.<p>'+
         '<br /><p>Il reste bien évidement possible de travailler sur les pads déjà existants (ils ne seront pas supprimés)'+
         ' mais pour en créer de nouveaux, veuillez passer par la page d’accueil du site :<br />'+
         '<a href="http://www.framapad.org">www.framapad.org</a></p>'+
         '<br /><p>Merci.<br />L’équipe technique</p>';
        f$_host = 'ovh';
        f$_credits = 'framapad';
    break;
    case 'lite6.framapad':
        f$_jquery = 'fQuery';
        f$_extra_css = true;
        f$_NoMsg();
        f$_host = 'hetzner';
        f$_credits = 'framapad';
    break;
    case 'localhost':

    break;
    case 'participer.framasoft':
        f$_jquery = 'html'; f$_bootstrap = 'html';
        f$_nav_static = true;
        f$_footer = true;
        f$_video_js = true;
    break;
    case 'pouhiou':
        f$_jquery = 'fQuery';
        f$_frama_css = false;
        f$_NoMsg();
    break;
    case 'soutenir.framasoft':
        f$_jquery = 'html'; f$_bootstrap_js = 'html';
        f$_NoMsg();
        if(f$_page('add/temoignage')) {
            f$_email_field1 = '#edit-field-t-email-0-value';
        }
        f$_footer = true;
    break;
    case 'wiki.framasoft':
        f$_jquery = 'fQuery';
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
    case 'lite.framapad' :          f$_piwik_id = '4';  break;
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
