jQuery(document).ready(function(){
    // Referrer
    jQuery('input[name="your-referrer"]').val(document.referrer);
    // Languages
    jQuery('input[name="your-languages"]').val(window.navigator.languages);
    // Liste des projets
    var cols = [
        ["libre","key","dvd","pack","blog","book","bookin","tube",
         "zic","agora","evl","dio"],
        // Ordre alphabétique pour tout ce qui est en vert
        ["agenda","bag","bee","bin","board","calc","carte","date","drive",
         "drop","forms","games","git","link","listes","maestro"],
        ["memo","mindmap","minetest","news","notes","pad","petitions",
         "piaf","pic","slides","sphere","talk","team","vectoriel","vox"]
    ];

    // Menu projets
    var aideList = [
        '<div class="list-group col-sm-4">',
        '<div class="list-group col-sm-4">',
        '<div class="list-group col-sm-4">'
    ];
    var partList = [
        '<div class="col-sm-6"><table class="table table-bordered" role="presentation">',
        '',
        '<div class="col-sm-6"><table class="table table-bordered" role="presentation">'
    ];
    var projetId = [];

    cols.forEach(function(col, index) {
        col.forEach(function(projet) {
            var fc = 'orange';
            switch (d$.f[projet].c)   {
                case 'r': fc = 'rouge';  break;
                case 'b': fc = 'bleu';   break;
                case 'v': fc = 'vert';   break;
                case 'j': fc = 'jaune';  break;
                case 'o': fc = 'orange'; break;
            }
            if(projet == "evl" || projet == "agora") {
                fc = 'jaune';
            }

            pid = d$.f[projet].p.toLowerCase()+d$.f[projet].s.replace('è','e'); // pid = "frama"+"libre"
            projetId.push(pid);

            if(projet != 'dio') {
                aideList[index] += '<button type="button" class="list-group-item '+pid+'" title="'+d$.f[projet].d0+'"><i class="fa fa-fw fa-lg '+d$.f[projet].i+'"></i>&nbsp;<b class="violet">'+d$.f[projet].p+'</b><b class="'+fc+'">'+d$.f[projet].s+'</b></button>';
            }
            if(d$.f[projet].git || d$.f[projet].soft) {
                partList[index] += '<tr><td class="'+pid+'"><i class="fa fa-fw fa-lg '+d$.f[projet].i+'"></i>&nbsp;<b class="violet">'+d$.f[projet].p+'</b><b class="'+fc+'">'+d$.f[projet].s+'</b>';
              if(d$.f[projet].git) {
                partList[index] += ' <a href="'+d$.f[projet].git+'/issues" class="pull-right"><i class="fa fa-fw fa-lg fa-git"></i><span class="sr-only">git</span></a></td>';
              }
              if(d$.f[projet].soft) {
                partList[index] += ' </td><td>'+d$.f[projet].soft+' <a href="'+d$.f[projet].src+'" class="pull-right"><i class="fa fa-fw fa-lg fa-code-fork"></i><span class="sr-only">source</span></a></td></tr>';
              } else {
                partList[index] += ' </td><td></td></tr>';
              }
            }
        })
    })

  aideList[0] += '</div>'; aideList[1] += '</div>'; aideList[2] += '</div>';
  partList[1] += '</table></div>'; partList[2] += '</table></div>';

    /** Accueil **/
    if (jQuery('body').hasClass('home')) {
        // Nettoyage Wordpress
        jQuery('#menu br:not("[data-f]"), p:empty').remove();

        // Init avec JS
        jQuery('.faq[id],.formContact').hide();
        jQuery('#menu').show(); jQuery('#msgCom').removeClass('col-sm-offset-3');
        jQuery('#aide h2').after('<div class="row col-xs-12">'+aideList[0]+aideList[1]+aideList[2]+'</div>');
        jQuery('#participer .well').after('<div class="row col-xs-12">'+partList[0]+partList[1]+partList[2]+'</div>');

        // Alertes
        jQuery('.wpcf7 form .your-message').before(
            '<p class="alert alert-warning framalibre"><b class="label label-warning">Attention</b> Il ne sera donné <b>aucune réponse aux questions concernant le fonctionnement de logiciels libres</b>. Nous ne connaissons pas tous les logiciels qui figurent dans notre annuaire. Pour cela, merci d’utiliser <a href="https://forum.framasoft.org">nos forums</a> ou les réseaux sociaux.</p>'+
            '<p class="alert alert-warning framapad">N’oubliez pas de <b>nous donner l’adresse complète du pad</b> qui vous pose problème dans votre message.</p>'+
            '<p class="alert alert-warning framacalc">N’oubliez pas de <b>nous donner l’adresse du calc</b> qui vous pose problème dans votre message.</p>'+
            '<p class="alert alert-warning framadate">N’oubliez pas de <b>nous donner l’adresse du sondage</b> qui vous pose problème dans votre message.</p>'+
            '<p class="alert alert-warning framamemo">N’oubliez pas de <b>nous donner l’adresse du memo</b> qui vous pose problème dans votre message.</p>'+
            '<p class="alert alert-warning framaforms">N’oubliez pas de <b>nous donner l’adresse du formulaire</b> qui vous pose problème dans votre message.</p>'+
            '<p class="alert alert-warning framaboard">N’oubliez pas de <b>nous donner l’adresse de votre espace</b> <b class="violet">Frama</b><b class="vert">board</b> ainsi que <b>votre identifiant</b> dans votre message.</p>'+
            '<p class="alert alert-warning framadrive">N’oubliez pas de <b>nous donner l’identifiant de votre compte</b> dans votre message.</p>'+
            '<p class="alert alert-warning framagenda">N’oubliez pas de <b>nous donner l’identifiant de votre compte</b> dans votre message.</p>'+
            '<p class="alert alert-warning framalistes">N’oubliez pas de <b>nous donner le nom de votre liste</b> dans votre message.</p>'+
            '<p class="alert alert-warning framateam">N’oubliez pas de <b>nous donner votre identifiant</b> ainsi que <b>les équipes où vous êtes inscrits</b> dans votre message.</p>'
        );
        jQuery('.wpcf7 form .your-message').before(
            '<p class="alert alert-danger">Ne nous donnez <b>jamais vos mots de passe</b>, nous n’en avons pas besoin. N’oubliez pas qu’<a href="https://framablog.org/2016/11/23/10-trucs-que-jignorais-sur-internet-et-mon-ordi-avant-de-my-interesser/">un email est une carte postale</a>.</p>'
        );
        jQuery('.wpcf7 form .alert-warning,.faq .alert-warning').hide();

        jQuery('.wpcf7 form .your-message textarea').after(
            '<p class="alert alert-info bienveillance" style="display:none"><b>Votre message est-il bienveillant ?</b><br>Nous sommes '+
            '<a href="https://soutenir.framasoft.org">une petite association vivant exclusivement des dons</a> et '+
            'nous faisons de notre mieux pour <a href="https://degooglisons-internet.org">résister aux 5 plus grosses entreprises du monde</a> (<i class="fa fa-fw fa-google" aria-hidden="true" title="Google"></i><i class="fa fa-fw fa-apple" aria-hidden="true" title="Apple"></i><i class="fa fa-fw fa-facebook" aria-hidden="true" title="Facebook"></i><i class="fa fa-fw fa-amazon" aria-hidden="true" title="Amazon"></i><i class="fa fa-fw fa-windows" aria-hidden="true" title="Microsoft"></i><span class="sr-only">Google, Apple, Facebook, Amazon et Microsoft</span>).<br>'+
            'Améliorer les services que nous proposons et vous aider demande <b>du temps et de l’énergie bénévole</b>.<br>'+
            'Merci d’en tenir compte lorsque vous rédigez votre message.</p>'
        ).on('focusin', function(){ jQuery('.bienveillance').show() });

        // FAQ : Import et formatage
        if(jQuery('#faq_import').length < 1) {
            jQuery('#content').prepend('<div id="faq_export" class="hidden"></div>');
            jQuery('#content').prepend('<div id="faq_import" class="hidden"></div>');
        }

        jQuery('#faq_import').load("https://contact.framasoft.org/foire-aux-questions/ #content .list-group", function() {
            // On crée les listes
            jQuery('#faq_import .list-group').each(function() {
                jQuery('#faq_export').append('<ul id="faq_'+jQuery(this).attr('id')+'"></ul>');
            });
            // On remplit avec les liens
            jQuery('#faq_import .list-group h3').each(function(){
                jQuery('#faq_'+jQuery(this).parent().parent().attr('id'))
                .append('<li><a href="https://contact.framasoft.org/foire-aux-questions/#'+jQuery(this).children('a').attr('id')+'">'+
                    jQuery(this).text()+
                '</a></li>');
            });
            // On injecte avant le formulaire
            jQuery('#general .faq h3').after(jQuery('#faq_export #faq_asso'));
            jQuery('#aide .faq h3').after(jQuery('#faq_export #faq_framacloud_autre'));
            jQuery('#participer .faq h3').after(jQuery('#faq_export #faq_benevolat'));
            jQuery('#soutenir .faq h3').after(jQuery('#faq_export #faq_les_dons'));
            jQuery('#faq_export ul[id^="faq_fra"]').each(function(){
                var framaId = jQuery(this).attr('id').replace('faq_','');
                jQuery('#aide #div_'+framaId+'.faq h4').after(jQuery('#faq_export #faq_'+framaId));
            });
        });

        // Menu aiguillage
        var cOpt = jQuery('#concerne').html();
        jQuery('#menu a').click(function () {

            jQuery(this).tab('show');
            jQuery('.formContact').show();
            jQuery('#concerne').html(cOpt);

            var f$_target = jQuery(this).attr('href');
            switch (f$_target) {
                case '#general'  :
                    jQuery('#concerne option:gt(6)').remove();
                    jQuery('#concerne').parent().parent().show();
                break;
                case '#aide'     :
                    jQuery('#concerne').parent().parent().hide();
                    jQuery('.formContact').hide();
                break;
                case '#soutenir' :
                    jQuery('#concerne option').prop('selected', false);
                    jQuery('#concerne option[value^="Soutiens"]').prop('selected', true)
                    jQuery('#concerne').parent().parent().hide();
                break;
                case '#participer' :
                    jQuery('#concerne option').prop('selected', false);
                    jQuery('#concerne option[value^="Participer"]').prop('selected', true)
                    jQuery('#concerne').parent().parent().hide();
                break;
            }

            jQuery('html, body').animate({
                scrollTop: jQuery(f$_target).offset().top-50
            }, 'slow');
            jQuery(f$_target).focus();

        })

        // Sélection projet onclick
        jQuery('#aide .list-group-item').click(function() {
            jQuery('.formContact').show();
            f$_projet = jQuery(this).text();
            f$_projetId = f$_projet.substr(1).toLowerCase();
            jQuery('.wpcf7 form .alert-warning').hide();
            jQuery('.faq[id]').hide();
            if (projetId.indexOf(f$_projetId)>-1) {
                jQuery('#div_'+f$_projetId).show();
                jQuery('.wpcf7 form .alert-warning.'+f$_projetId).show();
            }
            jQuery('#aide .list-group-item').removeClass('fb_g2');
            jQuery('#aide .list-group-item .fa-check').remove();
            jQuery(this).addClass('fb_g2').prepend('<i class="fa fa-check pull-right"></i>');
            jQuery('#concerne option').prop('selected', false);
            jQuery('#concerne option[value$="'+f$_projet.substr(2)+'"]').prop('selected', true);

            jQuery('html, body').animate({
                scrollTop: jQuery('#aide .fa-question-circle').offset().top-50
            }, 'slow');
        })

        // Pré-sélection
        if (window.location.hash) {
            var f$_hash=window.location.hash;
            switch(f$_hash) {
                case '#general' : jQuery('#menu a[href="#general"]').trigger('click'); break;
                case '#participer' : jQuery('#menu a[href="#participer"]').trigger('click'); break;
                case '#soutenir' : jQuery('#menu a[href="#soutenir"]').trigger('click'); break;
                case '#aide' : jQuery('#menu a[href="#aide"]').trigger('click'); break;
                case '#presse' :
                    jQuery('#menu a[href="#general"]').trigger('click');
                    jQuery('#concerne option').prop('selected', false);
                    jQuery('#concerne option[value$="presse"]').prop('selected', true);
                break;
                // Framaprojets
                default :
                if(f$_hash.indexOf('#frama')>-1) {
                    jQuery('#menu a[href="#aide"]').trigger('click');
                    jQuery('#aide .list-group-item.'+f$_hash.substr(1)).trigger('click');
                }
            }
        }
    }

    /** FAQ **/
    if(jQuery('body').hasClass('foire-aux-questions')) {
        jQuery('.list-group-item-text').hide();
        jQuery('.list-group-item > p,.list-group-item-heading > p').remove();

        jQuery('.list-group-item-heading')
            .prepend('<i class="fa fa-chevron-down pull-right"></i>')
            .toggle(function() {
                // masque tout
                jQuery('.list-group-item-text').hide();
                jQuery('.list-group .fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                jQuery('.list-group-item').removeClass('fb_j0');
                // affiche la réponse
                jQuery(this).next().show();
                jQuery(this).children('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
                jQuery(this).parent().addClass('fb_j0');
            }, function() {
                // masque la réponse
                jQuery(this).next().hide();
                jQuery(this).children('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
                jQuery(this).parent().removeClass('fb_j0');
            });

        jQuery('.list-group-item').each(function(){
            jQuery(this).find('.list-group-item-text').append('<p class="text-right" style="margin:-12px 0 5px"><a href="#'+jQuery(this).find('h3 a[id]').attr('id')+'" class="fc_g4"><i class="fa fa-link"></i></a></p>');
        })

        if (window.location.hash) {
            var f$_hash=window.location.hash;
            jQuery('html, body').animate({
                scrollTop: jQuery(f$_hash).offset().top
            }, 'fast');
            jQuery(f$_hash).parent('.list-group-item-heading').trigger('click');
        }
    }
})