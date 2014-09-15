f$_config = 'local';

if(f$_page('/accueil')) {
    // Force la désactivation des fenêtres modales, du bandeau et du macaron
    f$_alert_type = 'info';
    f$_alert_text =
        '<div style="text-align:center"><a href="http://april.org/campagne">'+
        '<img width="580" height="76"'+
            'src="http://april.org/campagne/images/priorite-logiciel-libre-je-soutiens-april.png"'+
            'alt="Priorité au Logiciel Libre! Je soutiens l’April." />'+
        '</a></div>';
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
}

f$_footer = true;
