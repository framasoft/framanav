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
$fnav_extra_start = <<<EOD
<!-- Il est possible ici d'ajouter du HTML (ou CSS ou JS...) 
sur plusieurs lignes, qui sera ajoute en DEBUT d'appel de la Framanav.
Pour l'inclure, il suffit de passer la constante FNAV_EXTRA_START a "true" -->
EOD;



define("FNAV_EXTRA_END", false);
$fnav_extra_end = <<<EOT
<!-- Il est possible ici d'ajouter du HTML (ou CSS ou JS...) 
sur plusieurs lignes, qui sera ajoute en FIN d'appel de la Framanav.
Pour l'inclure, il suffit de passer la constante FNAV_EXTRA_END a "true" -->
EOT;


define("FNAV_EXTRA_ALERT", false);
$fnav_extra_alert = <<<EOA
<!-- Lien d alerte -->

<script type="text/javascript">
jQuery.noConflict();
jQuery(document).ready(function() {
     if ( (document.cookie.indexOf('visited=true') == -1) && (navigator.cookieEnabled) ) {
	jQuery('#framanavModalAlert').modal();
     }	
 });
 
  function fnavSetAlertCookie() {
	 var customDelay = 1000*60*60*24*0.25;  // 1000*60*60*24*1 = 2j
         var expires = new Date((new Date()).valueOf() + customDelay);
         document.cookie = "visited=true;expires=" + expires.toUTCString();
	jQuery('#framanavModalAlert').modal('hide'); 
	 return true;
 }

</script>

<div>
<a href="#framanavModalAlert" role="button" class="btn btn-danger btn-small" data-toggle="modal">Alerte</a>
</div>
 
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
      <button class="btn btn-primary" onclick="return fnavSetAlertCookie()">Ne plus afficher pendant 6H</button>
    </div>
</div>

EOA;


?>