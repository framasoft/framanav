var f$_config = 'local';

var f$_jquery = 'fQuery';

//var f$_alert_type = 'danger';
//var f$_alert_text = '<strong>Screugneugneu !</strong> On teste la nouvelle nav ici aussi.';

var f$_css_position = 'end';						

var f$_extra_css = true;

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "14"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
