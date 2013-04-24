<?php
function myDefine($name, $value) {
    if !(defined($name)) define($name, $value));
}

# Flag de config
myDefine("FNAV_CONFIG", true);

# chemin absolu de la Framanav
myDefine("FNAV_PATH", realpath($_SERVER["DOCUMENT_ROOT"])."/framanav");

# chemin relatif de la framanav
myDefine("FNAV_RPATH", "/framanav");

# Chemin du zip sur github
myDefine("FNAV_ZIP_URL", "https://github.com/framasoft/framanav/archive/master.zip");

# user/group de la nav (utilisé par le script deploy-git uniquement
myDefine("FNAV_USER", "fsoft");
myDefine("FNAV_GROUP", "users");

# La barre doit-elle rester statique en haut de page (true/false) ?
myDefine("FNAV_STATIC", true);

# Temps maximum de blinking du badge "Don" (en ms)
myDefine("FNAV_DONATE_BLINK_TIME", 30000);

# Doit on charger le jquery local ?
myDefine("FNAV_LOCAL_JQUERY", true);

# Doit-on charger le JS de Bootstrap ?
myDefine("FNAV_LOCAL_BOOTSTRAP_JS", true);

# Doit-on charger le CSS de Bootstrap ?
myDefine("FNAV_LOCAL_BOOTSTRAP_CSS", true);

# Doit-on charger le CSS Responsive de Bootstrap ?
myDefine("FNAV_LOCAL_BOOTSTRAP_RESPONSIVE_CSS", true);

# ========= Système d'extras =======

# Doit-on charger un fichier CSS supplémentaire ?
# Par défaut à false
# Sinon, chemin du fichier. ex: define("FNAV_EXTEND_CSS", FNAV_RPATH."/extra.css");
myDefine("FNAV_EXTRA_CSS", false);

# Ajout de code spécifique en début de nav (cf $fnav_extra_start)
myDefine("FNAV_EXTRA_START", false);

# Ajout de code spécifique en fin de nav (cf $fnav_extra_end)
myDefine("FNAV_EXTRA_END", false);

# ========= Système d'alerte =======

# Doit-on afficher une alerte ?
myDefine("FNAV_EXTRA_ALERT", false);

# Doit-on afficher une fenetre modale ?
myDefine("FNAV_EXTRA_ALERT_MODAL", false);
$fnav_extra_alert_modal_force = "true"; //forcer l'affichage de la fenetre à la première visite
$alert_cookie_time = 0.05; // durée du cookie, en heures.
$fnav_extra_alert_txt_title = "Attention, ce site sera bientot mis-à-jour !"; // contenu par défaut du contenu de l'alerte sous la nav.


# Doit-on lire le contenu de l'alerte depuis des fichiers (locaux ou distants)  ?
myDefine("FNAV_EXTRA_ALERT_TXT_FILES", false);
# Chemin du fichier pour le contenu de l'alerte sous la nav
# Par défaut : dirname(__FILE__)."/alert_title.txt"; 
# Mais il est possible d'envisager un chemin distant type "http://framasite.org/nav/alert_title.txt
$fnav_extra_alert_txt_files_title = dirname(__FILE__)."/alert_title.txt"; 
# Chemin du fichier pour le contenu de la fenetre modale
# Par défaut : dirname(__FILE__)."/alert_content.txt"; 
# Mais il est possible d'envisager un chemin distant type "http://framasite.org/nav/alert_content.txt
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

# Si on a défini FNAV_EXTRA_ALERT_TXT_FILES a "true", on charge les fichiers distants
if ( FNAV_EXTRA_ALERT_TXT_FILES==true ) {
    $fnav_extra_alert_txt_title = @file_get_contents($fnav_extra_alert_txt_files_title);
    $fnav_extra_alert_modal_content = @file_get_contents($fnav_extra_alert_txt_files_content);
}

?>
