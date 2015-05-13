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
var f$_frama_css = true;

var f$_nav_static = false;
var f$_extra_css = false;                           // nav/config/nom-de-domaine_extra.css
var f$_extra_js = false;                            // nav/config/nom-de-domaine_extra.js

var f$_footer = false;                              // charger le fichier footer.html

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

// Piwik
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
    case 'git.framasoft' :          f$_piwik_id = '36'; break;
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
