f$_config = 'local';

f$_modal_don_txtdl1 = 'd’utiliser';
f$_modal_don_txtdl2 = 'créer un sondage';
f$_modal_don_liendl = 'a[href*="infos_sondage.php?choix_sondage="]';

f$_jquery = 'html';
f$_bootstrap_js = 'html';

// Opt-in
if(f$_page('infos_sondage.php?choix_sondage')) {
    f$_email_field1 = '#formulaire input[name="adresse"]';
}

f$_footer = true;

// Somme des votes (fonctionnalité de la branche develop)
if(window.location.host == 'framadate.org') {
    jQuery(document).ready(function(){
        if(jQuery('html').attr('lang')=='fr') {
            jQuery('tr#addition td:eq(0)').append('<br/>'+(jQuery('#tableContainer tbody tr').length-2)+' votants');
            jQuery.getScript('/_charts/resultats.js');
        }
        jQuery('tr#addition td').each(function(index) {
            countIfneedbe = jQuery('#tableContainer tbody td.bg-warning[headers]').filter('[headers$="S'+(index-1)+'"],[headers$="H'+(index-1)+'"]').length;
            if(countIfneedbe>0) {
                jQuery(this).append('<br/><span class="small text-muted">(+'+countIfneedbe+')</span>');
            }
        });
    });
}