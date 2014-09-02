f$_config = 'local';

if(f$_page('framacalc.org/_start')) {
    // Si on est sur la page d'accueil
    f$_modal_don_txtdl1 = 'd’utiliser';
    f$_modal_don_txtdl2 = 'créer un calc';
    f$_modal_don_liendl = 'a.btn-large[href*="/_new"]';

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
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
    f$_donate = false;
}

// Piwik
f$_piwik_url = 'http://stats.framasoft.org/';
f$_piwik_id = '11';

f$_host = 'ovh';
