var f$_config = 'local';

var f$_jquery = 'fQuery';

var f$_url = window.location.href;
if(f$_url.indexOf('svg-editor') > -1) {
// Si on n'est dans svg-editor
  if (f$_not_in_frame) {
    var f$_extra_css = true;
  } else {
     var f$_bootstrap_css = false;
  }

// Force la désactivation des fenêtres modales, du bandeau et du macaron
  var f$_alert_text = '';
  var f$_alert_modal_text = '';
  var f$_modal_don_liendl = '';
  var f$_donate = false;

} else {

// Si on est sur la page d'accueil
//  var f$_alert_type = 'info'; 
//  var f$_alert_text = '<p style="text-align:center"><strong>Information</strong> : Framavectoriel a été mis à jour (<a href="https://code.google.com/p/svg-edit/">version 2.6 de SVG-Edit</a>) et fonctionne de nouveau avec les versions récentes de Firefox.</p>';

  var f$_modal_don_txtdl1 = 'd\'utiliser';
  var f$_modal_don_txtdl2 = 'créer une image';
  var f$_modal_don_liendl = 'a.btn-large[href*="/svg-editor.html"]';
  
  var f$_video_js = true;
}

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "13"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
