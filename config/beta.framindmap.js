var f$_config = 'local';

var f$_url = window.location.href;
if(f$_url.indexOf('framindmap.org/mindmaps') > -1) {
/* Si on n'est dans Mindmaps */
  var f$_jquery = 'fQuery';
  var f$_extra_css = true;

// Force la désactivation des fenêtres modales, du bandeau et du macaron
  var f$_alert_text = '';
  var f$_alert_modal_text = '';
  var f$_modal_don_liendl = '';
  var f$_donate = false;

} else {
// Sur les autres pages, Wisemapping utilise déjà bootstrap mais il manque certains composants.
// Il faut remplacer en dur le fichier bootstrap.min.js de wisemapping (3.1.1) par celui de la nav (3.0.0)
  var f$_bootstrap_js = 'html'; 
  var f$_bootstrap_css = false;
// jQuery est déjà présent en version 2.1.0 mais ça marche
  var f$_jquery = 'html';
  
  var f$_extra_css = true;

// Opt-in
  var f$_email_field1 = '#user #email';

// Popup « faire un don » pour utiliser Mindmaps
  var f$_modal_don_txtdl1 = 'd\'utiliser';
  var f$_modal_don_txtdl2 = 'créer une carte mentale';
  var f$_modal_don_liendl = 'a.btn[href*="/framindmap.html"]';
  
  var f$_video_js = true;

}

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "12"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
