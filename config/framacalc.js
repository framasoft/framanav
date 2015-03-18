f$_config = 'local';

if(f$_page('framacalc.org/_start')) {
    // Si on est sur la page d'accueil
    f$_modal_don_txtdl1 = 'd’utiliser';
    f$_modal_don_txtdl2 = 'créer un calc';
    f$_modal_don_liendl = 'a.btn-large[href*="/_new"]';
    
    f$_footer = "true";

    f$_footer = "true";

} else {
    f$_jquery ='fQuery';
    // Si on n'est dans ethercalc
    if (f$_not_in_frame) {
        f$_extra_css = true;
    } else {
        f$_bootstrap_css = false;
    }

    // Force la désactivation des fenêtres modales, du bandeau et du macaron
    f$_alert_text = '';
    f$_alert_modal_title = 'Avertissement';
    f$_alert_modal_text = "<h2>Attention travaux !</h2>Framacalc vient de rouvrir ce 19 mars en version potentiellement instable ! Nous allons procéder à des tests jusqu'au 26 mars. Jusqu'à cette date, partez du principe que vos données peuvent être perdues à tout instant.<br/><h3>Suppression automatique</h3>Votre calc sera supprimé au bout d'un an d'inactivité (aucun accès, aucune modification pendant un an).<br/>Ceci nous permet d'éviter de faire grossir indéfiniment la base de données.<br/><h3>Information</h3>Nous avons changé d'instance de Framacalc le 11 février 2015 suite à des bugs répétés. Pour retrouver votre calc, il vous faudra vous rendre sur <span style='white-space: nowrap;'>http://old.framacalc.org/le_nom_de_mon_calc</span><br/>Pour exporter votre calc au format CSV, il suffit d'ajouter \".csv\" à la fin de l'adresse du calc (<span style='white-space: nowrap;'>https://framacalc.org/le_nom_de_mon_calc.csv</span>, <span style='white-space: nowrap;'>http://old.framacalc.org/le_nom_de_mon_calc.csv</span> pour l'ancienne instance)";
    f$_modal_don_liendl = '';
    f$_donate = false;
}

f$_host = 'ovh';

