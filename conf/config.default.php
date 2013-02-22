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
define("FNAV_LOCAL_BOOTSTRAP_RESPONSIVE", true);

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


?>