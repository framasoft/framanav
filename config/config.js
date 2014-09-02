var f$_config = 'global';                           // Paramètre pour vérifier si la config est chargée
                                                    // ("global" ici, "local" sur config par site)
var f$_jquery = 'jQuery';                           // jQuery = jQuery de la nav ; fQuery = jQuery de la nav avec variables renommées pour éviter les conflits ; html = jQuery (1.10.2 ou +) présent dans la page
var f$_jquery_noconflict = false;                                               // Pas utile normalement

var f$_cache = true;                                // Obligatoire en prod

var f$_bootstrap_js = true;                         // true ; false ; html
var f$_bootstrap_css = true;
var f$_css_position = 'start';                      // 'start' = head > bootstrap.css > ... /head body > nav.js ;
                                                    // 'end'   = head > ... > bootstrap.css /head body > nav.js ;
var f$_responsive = true;
var f$_accessible = true;

var f$_nav_static = false;                          // Pas encore implémenté correctement
var f$_extra_css = false;                           // nav/config/nom-de-domaine_extra.css
var f$_extra_js = false;                            // nav/config/nom-de-domaine_extra.js

// Popup de don
var f$_modal_don_txtdl1 = 'de télécharger';
var f$_modal_don_txtdl2 = 'télécharger';
var f$_modal_don_liendl = '';
var f$_modal_don_cookie = 3*24*60*60*1000;          // Expire au bout de 3 jours

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

// Piwik
var f$_piwik_url = '';                              // ex: https://framasphere.org/piwik/ ou http://stats.framasoft.org/
var f$_piwik_id = '';

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
    case 'full1.framapad' : f$_site = 'instances.framapad'; break;
    case 'full2.framapad' : f$_site = 'instances.framapad'; break;
    case 'quotidien.framapad' : f$_site = 'instances.framapad'; break;
    case 'hebdo.framapad' : f$_site = 'instances.framapad'; break;
    case 'mensuel.framapad' : f$_site = 'instances.framapad'; break;
    case 'annuel.framapad' : f$_site = 'instances.framapad'; break;
    case 'education.framapad' : f$_site = 'instances.framapad'; break;
    case 'sciences.framapad' : f$_site = 'instances.framapad'; break;
    case 'noenaute' : f$_site = 'pouhiou'; break;
}

// À propos
var f$_host = 'hetzner';
var f$_credits = f$_site;
