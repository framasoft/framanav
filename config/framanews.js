f$_config = 'local';

if(f$_page('framanews.org/ttrss')) {
    // Si on n'est dans ttrss
    f$_extra_css = true;
    f$_jquery = 'fQuery';

    // Force la désactivation des fenêtres modales, du bandeau et du macaron
    f$_alert_text = '';
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
    f$_donate = false;
}

f$_host = 'iniz';
