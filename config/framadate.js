f$_config = 'local';

f$_modal_don_txtdl1 = 'd’utiliser';
f$_modal_don_txtdl2 = 'créer un sondage';
f$_modal_don_liendl = 'a[href*="./infos_sondage.php?choix_sondage="]';

// Opt-in
if(f$_page('infos_sondage.php?choix_sondage')) {
    f$_email_field1 = '#formulaire input[name="adresse"]';
    f$_extra_css = true;
}

f$_host = 'online';
