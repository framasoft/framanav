f$_config = 'local';

f$_jquery = 'fQuery';

f$_nav_static = true;

f$_audio_js = true;
f$_video_js = true;

// Sous-titres dans les vidéos (jQuery 1.4.2 est déjà présent sur le framablog)
jQuery(document).ready(function() {
    jQuery('video').each(function(){
        id = jQuery(this).attr('id').replace('k-','');
        if(jQuery(this).children('track').attr('src').indexOf('framatube.org') > -1) {
            jQuery(this).children('track').attr('src','http://www.framablog.org/public/playk/cache/'+id+'/fr.vtt');
        }
    });
});

// Opt-in
f$_email_field1 = '#c_mail';

f$_host = 'ovh';
