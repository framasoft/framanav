f$_config = 'local';

f$_nav_static = true;

// Opt-in
f$_email_field1 = '#email_auteur';

if(f$_url != 'http://www.framasoft.net/'
   && f$_url != 'http://framasoft.net/'
   && !f$_page('framasoft.net/accueil')
   && f$_url != 'http://www.framasoft.org/'
   && f$_url != 'http://framasoft.org/'
   && !f$_page('framasoft.org/accueil')) {
    // Mise en forme « Juste une image »
    flickr_t = jQuery('img[src$="_t.jpg"]').attr('src');
    flickr_m = flickr_t.replace('_t.jpg', '_m.jpg');
    jQuery('img[src$="_t.jpg"]').attr('src', flickr_m).css('width', '90%');

    if (!f$_not_in_frame) {
        jQuery('body').css('font-size', '100%');
    }
    
    f$_credits = 'framalibre';
} else {
    f$_footer = true;
}