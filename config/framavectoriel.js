f$_config = 'local';

f$_jquery = 'fQuery';

if(f$_page('svg-editor')) {
// Si on n'est dans svg-editor
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

} else {

    f$_modal_don_txtdl1 = 'd’utiliser';
    f$_modal_don_txtdl2 = 'créer une image';
    f$_modal_don_liendl = 'a.btn-large[href*="/svg-editor.html"]';

    f$_video_js = true;
}

// Piwik
f$_piwik_url = 'http://stats.framasoft.org/';
f$_piwik_id = '13';

f$_host = 'ovh';
