f$_config = 'local';

// Opt-in
f$_email_field1 = '#email_auteur';

// Bandeau
if(window.location.href != 'http://www.framasoft.net/' && !f$_page('framasoft.net/accueil')) {
    // Mise en forme « Juste une image »
    flickr_t = jQuery('img[src$="_t.jpg"]').attr('src');
    flickr_m = flickr_t.replace('_t.jpg', '_m.jpg');
    jQuery('img[src$="_t.jpg"]').attr('src', flickr_m).css('width', '90%');

    f$_credits = 'framalibre';
}

// Piwik
f$_piwik_url = 'http://stats.framasoft.org/';
f$_piwik_id = '1';

