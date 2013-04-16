<?php
define("FNAV_CONFIG", true);
define("FNAV_PATH", realpath($_SERVER["DOCUMENT_ROOT"])."/framanav");
define("FNAV_RPATH", "/framanav");

# La barre doit-elle rester statique en haut de page (true/false) ?
define("FNAV_STATIC", true);

define("FNAV_DONATE_BLINK_TIME", 30000);

define("FNAV_LOCAL_JQUERY", true); // Doit-on charger le jQuery local ?
define("FNAV_LOCAL_BOOTSTRAP_JS", true);
define("FNAV_LOCAL_BOOTSTRAP_CSS", true);
define("FNAV_LOCAL_BOOTSTRAP_RESPONSIVE_CSS", true);

# Doit-on charger un fichier CSS supplémentaire ?
# Par défaut à false
# Sinon, chemin du fichier. ex: define("FNAV_EXTEND_CSS", FNAV_RPATH."/extra.css");
define("FNAV_EXTRA_CSS", false);

define("FNAV_EXTRA_START", false);

define("FNAV_EXTRA_END", false);

define("FNAV_EXTRA_ALERT", false);

define("FNAV_EXTRA_ALERT_MODAL", false);
$fnav_extra_alert_modal_force = "true";
$alert_cookie_time = 0.05; // durée du cookie, en heures.
$fnav_extra_alert_txt_title = "bla";


/** Doit-on lire le contenu de l'alerte depuis les fichiers "/conf/alert_title.txt" et "/conf/alert_content.txt" ? **/
define("FNAV_EXTRA_ALERT_TXT_FILES", false);
$fnav_extra_alert_txt_files_title = dirname(__FILE__)."/alert_title.txt";
$fnav_extra_alert_txt_files_content = dirname(__FILE__)."/alert_content.txt";



# === contenu des variables ========

$fnav_extra_start = <<<EOD
<!-- Il est possible ici d'ajouter du HTML (ou CSS ou JS...) 
sur plusieurs lignes, qui sera ajoute en DEBUT d'appel de la Framanav.
Pour l'inclure, il suffit de passer la constante FNAV_EXTRA_START a "true" -->
EOD;

$fnav_extra_end = <<<EOT
<!-- Il est possible ici d'ajouter du HTML (ou CSS ou JS...) 
sur plusieurs lignes, qui sera ajoute en FIN d'appel de la Framanav.
Pour l'inclure, il suffit de passer la constante FNAV_EXTRA_END a "true" -->
EOT;

$alert_modal_link = '<a href="#framanavModalAlert" role="button" class="btn btn-danger btn-small" data-toggle="modal">Alerte</a>';

$fnav_extra_alert_modal_content = <<<EOA
<!-- Modal -->
<div id="framanavModalAlert" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button>
      <h3 id="myModalLabel">Information importante</h3>
    </div>
  <div class="modal-body">
      <p>Le service framapad.org sera en maintenance le mardi 11 mars 2013, de 20H &agrave; 23H environ.</p>
      <p>Durant cette p&eacute;riode, le site pourra etre inaccessible.</p>
      <p>Il est recommand&eacute;, durant cette p&eacute;riode de ne pas utiliser le service, car les donn&eacute;es pourront &ecirc;tre perdues.</p>
  </div>
  <div class="modal-footer">
      <button class="btn" data-dismiss="modal" aria-hidden="true">Fermer</button>
      <button class="btn btn-primary" onclick="return fnavSetAlertCookie()">Ne plus afficher pendant $alert_cookie_time heures</button>
    </div>
</div>

EOA;

$fnav_extra_alert_cookie = <<<EOAB
<!-- Lien d alerte -->
<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
     if ( (document.cookie.indexOf('wanttohide=true') == -1) && (navigator.cookieEnabled) ) {
		// cookie non détecté
		jQuery('#framanavModalAlert').modal({
			show: $fnav_extra_alert_modal_force
			});
     } else {
		 //cookie détécté
		jQuery('.sub_alert').hide(); 
	 }
 });
  function fnavSetAlertCookie() {
	 var customDelay = 1000*60*60*$alert_cookie_time;  // 1000*60*60*24*2 = 2j
         var expires = new Date((new Date()).valueOf() + customDelay);
         document.cookie = "wanttohide=true;expires=" + expires.toUTCString();
	jQuery('#framanavModalAlert').modal('hide'); 
	 return true;
 }

</script>
EOAB;


if ( FNAV_EXTRA_ALERT_TXT_FILES==true ) {
    $fnav_extra_alert_txt_title = @file_get_contents($fnav_extra_alert_txt_files_title);
    $fnav_extra_alert_modal_content = @file_get_contents($fnav_extra_alert_txt_files_content);
}

?>
