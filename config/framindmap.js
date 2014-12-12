f$_config = 'local';

if(f$_page('framindmap.org/mindmaps')) {
    /* Si on n'est dans Mindmaps */
    f$_jquery = 'fQuery';
    f$_extra_css = true;

    // Force la désactivation des fenêtres modales, du bandeau et du macaron
    f$_alert_text = '';
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
    f$_donate = false;

} else {
    // Sur les autres pages, Wisemapping utilise déjà bootstrap mais il manque certains composants.
    // Il faut remplacer en dur le fichier bootstrap.min.js de wisemapping (3.1.1) par celui de la nav (3.0.0)
    f$_bootstrap_js = 'html';
    f$_bootstrap_css = false;
    // jQuery est déjà présent en version 2.1.0 mais ça marche
    f$_jquery = 'html';

    f$_extra_css = true;

    f$_video_js = true;

    // Opt-in
    f$_email_field1 = '#user #email';

    if(!f$_page('framindmap.org/c/login') && !f$_page('framindmap.org/c/user/registration')) {
        // Force la désactivation des fenêtres modales, du bandeau et du macaron
        f$_alert_text = '';
        f$_alert_modal_text = '';
        f$_modal_don_liendl = '';
        f$_donate = false;
    }
    f$_footer = true;
}
