var f$_config = 'local';

var f$_modal_don_txtdl1 = 'd\'utiliser';
var f$_modal_don_txtdl2 = 'créer un sondage';
var f$_modal_don_liendl = 'a[href*="./infos_sondage.php?choix_sondage="]';

// Opt-in
var f$_url = window.location.href;
if(f$_url.indexOf('infos_sondage.php?choix_sondage') > -1) {
  f$_email_field1 = '#formulaire input[name="adresse"]';
  
  var f$_extra_css = true;
}

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "10"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
