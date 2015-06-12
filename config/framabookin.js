f$_config = 'local';
f$_jquery = 'html';

f$_nav_static = true;

if (!f$_page('framabookin.org/b')) {
    f$_footer = true;
} else {
    f$_alert_text = '';
    f$_alert_modal_text = '';
    f$_modal_don_liendl = '';
    f$_donate = false;
}

// Fix décalage de la nav
f$_extra_css = true;
jQuery('document').ready(function() {
    jQuery('.ui-page').css('margin-top','-42px');
});

