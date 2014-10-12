f$_config = 'local';

f$_jquery = 'html';

f$_css_position = 'end';

f$_bootstrap_js = 'html';

jQuery(document).ready(function() {
    jQuery('link[href*=bootstrap-complete]').remove();

    jQuery('footer').remove();

    // A11y inscription-framasphere@framalistes.org
    jQuery('a[href="/users/sign_up"]').attr('aria-describeby','inscription-email');
    jQuery('a[href="/users/sign_up"]').after('<p id="inscription-email" class="alert text-left" style="font-size:smaller; max-width:250px; margin:10px auto; padding:10px; background:#eee; color:#555; border-color:#999">Si vous rencontrez des difficultés pour vous inscrire, notamment à cause du captcha, envoyez un email à inscription-framasphere@framalistes.org contenant l’identifiant que vous souhaitez utiliser.</p>');
});

f$_footer = true;
