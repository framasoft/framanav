var f$_config = 'local';

var f$_jquery = 'fQuery';

var f$_extra_css = true;

// Force la désactivation des fenêtres modales, du bandeau et du macaron
var f$_alert_text = '';
var f$_modal_don_liendl = '';
var f$_donate = false;


// Message arrêt de la création des pads
var f$_alert_modal_title = 'Création des pads désactivée';
var f$_alert_modal_text = '<p>Nous vous informons que cette instance de Framapad (<b>lite</b>.framapad.org) ne peut plus accueillir de nouveaux pads.<p>'+
    '<br /><p>Il reste bien évidement possible de travailler sur les pads déjà existants (ils ne seront pas supprimés)'+
    ' mais pour en créer de nouveaux, veuillez passer par la page d\'accueil du site :<br />'+
    '<a href="http://www.framapad.org">www.framapad.org</a></p>'+
    '<br /><p>Merci.<br />L\'équipe technique</p>';

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "4"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
