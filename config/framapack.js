var f$_config = 'local';

var f$_jquery = 'fQuery';

var f$_extra_css = true;

var f$_alert_type = 'danger';
var f$_alert_text = '<p style="text-align:center; font-weight:bold">Framapack est en panne depuis la migration du serveur fin juin 2013.<br />Nous ne savons pas quand nous pourrons résoudre le problème. Désolé... :-(</p>';

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "24"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
