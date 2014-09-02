var f$_config = 'local';

var f$_jquery = 'fQuery';

var f$_css_position = 'end';	

/*
var f$_modal_don_txtdl1 = 'd\'utiliser';
var f$_modal_don_txtdl2 = 'créer un pad';
var f$_modal_don_liendl = 'a[href*=".framapad.org/p/"]';
*/

var f$_alert_type = 'warning'; // warning = jaune ; danger = rouge ; info = bleu ; success = vert
var f$_alert_cookie = 24*60*60*1000;	// durée d'expiration du cookie en milliseconde
var f$_alert_text = '<p style="max-width:900px; font-weight:bold; margin:0 auto; text-align:center">Soutenez <a href="http://www.ulule.com/etherpad-framapad">la campagne de financement participatif « MyPads »</a>, lancée par Framasoft,<br />'+
                    ' pour la création d’un formidable plugin pour Etherpad/Framapad !<p>';	


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
