var f$_config = 'local';

var f$_url = window.location.href;
if(f$_url.indexOf('/accueil') > -1) {
// Sur la page d'accueil de test

}

if(f$_url.indexOf('/bot') > -1) {
	// Force la désactivation des fenêtres modales, du bandeau et du macaron
	var f$_alert_text = '';
  	var f$_alert_modal_text = '';
  	var f$_modal_don_liendl = '';
  	var f$_donate = false;
}
if(f$_url.indexOf('/accueil') > -1) {
	// Force la désactivation des fenêtres modales, du bandeau et du macaron
	var f$_alert_type = 'info';
	var f$_alert_text = 
		'<div style="text-align:center"><a href="http://april.org/campagne">'+
		'<img width="580" height="76"'+
			'src="http://april.org/campagne/images/priorite-logiciel-libre-je-soutiens-april.png"'+
			'alt="Priorité au Logiciel Libre! Je soutiens l’April." />'+
		'</a></div>';
  	var f$_alert_modal_text = '';
  	var f$_modal_don_liendl = '';
 // 	var f$_donate = false;
}

/** Piwik **/
var _paq = _paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);

(function() {
  var u=(("https:" == document.location.protocol) ? "https" : "http") + "://stats.framasoft.org/";
  _paq.push(["setTrackerUrl", u+"piwik.php"]);
  _paq.push(["setSiteId", "16"]);
  var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0]; g.type="text/javascript";
  g.defer=true; g.async=true; g.src=u+"piwik.js"; s.parentNode.insertBefore(g,s);
})();
/** Fin Piwik **/
