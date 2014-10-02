f$_config = 'local';

f$_jquery = 'html';
f$_bootstrap_js = 'html';

// Force la désactivation des fenêtres modales, du bandeau et du macaron
f$_alert_text = '';
f$_alert_modal_text = '';
f$_modal_don_liendl = '';
f$_donate = false;

// Opt-in
if(f$_page('add/temoignage')) {
    f$_email_field1 = '#edit-field-t-email-0-value';
}

f$_footer = true;
