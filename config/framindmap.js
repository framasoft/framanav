f$_config = 'local';

f$_jquery = 'fQuery';

if(f$_page('framindmap.html')) {
    // Si on n'est dans framindmap
    f$_extra_css = true;

    // Force la désactivation des fenêtres modales, du bandeau et du macaron
    f$_alert_text = '';
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
    f$_donate = false;

} else {

    // Si on est sur la page d'accueil
    f$_modal_don_txtdl1 = 'd’utiliser';
    f$_modal_don_txtdl2 = 'créer une carte mentale';
    f$_modal_don_liendl = 'a.btn-large[href*="/framindmap.html"]';

    f$_video_js = true;

}

// Piwik
f$_piwik_url = 'http://stats.framasoft.org/';
f$_piwik_id = '12';
