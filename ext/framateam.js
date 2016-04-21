/** Pas dans le tchat **/
if(!(f$_page('channel')||f$_page('admin_console')||f$_page('/pl/'))) {
    f$_header = '<header role="banner">'+
                '    <h1><a href="/"><span class="frama">Frama</span><span class="services">team</span></a></h1>'+
                '    <p class="lead">Communication collaborative</p>'+
                '    <hr class="trait" role="presentation" />'+
                '</header>';

    f$_screen = '<div class="text-center">'+
                '    <div id="carousel-team" class="carousel slide" role="presentation">'+
                '        <div class="carousel-inner">'+
                '            <div class="item active">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-slide-1.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p>Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.</p>'+
                '                </div>'+
                '            </div>'+
                '            <div class="item">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-slide-1.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato.</p>'+
                '                </div>'+
                '            </div>'+
                '            <div class="item">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-slide-1.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p>Dandelion cucumber earthnut pea peanut soko zucchini.</p>'+
                '                </div>'+
                '            </div>'+
                '        </div>'+
                '        <p class="text-center" id="play-pause"><a href="#play-pause" class="carousel-control" title="Pause"><span class="glyphicon glyphicon-pause"></span><span class="sr-only">Pause</span></a></p>'+
                '        <a class="left carousel-control" href="#carousel-team" role="button" data-slide="prev" title="Diapo précédente">'+
                '            <i class="glyphicon glyphicon-chevron-left"></i><span class="sr-only">Diapo précédente</span>'+
                '        </a>'+
                '        <a class="right carousel-control" href="#carousel-team" role="button" data-slide="next" title="Diapo suivante">'+
                '            <i class="glyphicon glyphicon-chevron-right"></i><span class="sr-only">Diapo suivante</span>'+
                '        </a>'+
                '    </div>'+
                '</div>';

    f$_3_cols = '<hr role="presentation" />'+
                '<div class="row">'+
                '    <div class="col-md-4" id="tuto-faq">'+
                '        <h2>Prise en main</h2>'+
                '        <p class="text-center" role="presentation"><span class="glyphicon glyphicon-question-sign"></span></p>'+
                '        <p>Blablabla</p>'+
                '        <p>Blablabla</p>'+
                '        <p class="text-center"><a href="#doc" class="btn btn-primary">Aide »</a></p>'+
                '    </div>'+
                '    <div class="col-md-4" id="le-logiciel">'+
                '        <h2>Le logiciel</h2>'+
                '        <p class="text-center" role="presentation"><span class="glyphicon glyphicon-cloud"></span></p>'+
                '        <p><b class="violet">Frama</b><b class="vert">calc</b> repose sur le logiciel libre <a href="https://about.mattermost.com/">Mattermost</a>.</p>'+
                '        <p>Mattermost est sous <a href="https://github.com/mattermost/platform/blob/master/LICENSE.txt">licence <abbr>MIT</abbr></a>.</p>'+
                '    </div>'+
                '    <div class="col-md-4" id="jardin">'+
                '        <h2>Cultivez votre jardin</h2>'+
                '        <p class="text-center" role="presentation"><span class="glyphicon glyphicon-tree-deciduous"></span></p>'+
                '        <p>Pour participer au développement du logiciel, proposer des améliorations'+
                '            ou simplement le télécharger, rendez-vous sur <a href="https://github.com/mattermost/platform">le site de développement</a>.</p>'+
                '        <!--<br>'+
                '        <p>Si vous souhaitez installer ce logiciel pour votre propre usage et ainsi gagner en autonomie, nous vous aidons sur :</p>'+
                '        <p class="text-center"><a href="http://framacloud.org/cultiver-son-jardin/installation-d-ethercalc/" class="btn btn-primary">framacloud.org</a></p>-->'+
                '    </div>';

    //jQuery('head').append(f$_style);

    jQuery('.container-fluid')
        .addClass('container ombre')
        .removeClass('container-fluid')
        .prepend(f$_header);

    jQuery('body').removeClass('white');
    jQuery('.row.footer,.signup-team__container h1,.signup-team__container h4.color--light,#signup-team h4:eq(1),.signup-team-logo, .signup-header').remove();

    jQuery('a[href="/find_team"]').addClass('btn btn-warning').prepend('<i class="fa fa-fw fa-search"></i>');
    jQuery('#login a.signup-team-login[href="/"]').addClass('btn btn-success').prepend('<i class="fa fa-fw fa-users"></i>');
    jQuery('#login .form-group:has(a[href$="reset_password"])').addClass('pull-right').css('margin-top','7px');
    jQuery('#login .form-group:has(button.btn-primary)').before(jQuery('.form-group:has(a[href$="reset_password"])'));

    /** Accueil  **/
    if(window.location.href == 'https://framateam.org/') {
        // 3 Colonnes du bas
        jQuery('.container.ombre').append(f$_3_cols);

        // Carousel
        jQuery('.signup-team__container').addClass('col-sm-6').before(f$_screen);
        jQuery("#play-pause a").on('click', function() {
            if(jQuery(this).children('.glyphicon').hasClass('glyphicon-pause')) {
                jQuery(this).children('.glyphicon').addClass('glyphicon-play').removeClass('glyphicon-pause');
                jQuery(this).attr('title','Lecture');
                jQuery(this).children('.sr-only').text('Lecture');
                jQuery('#carousel-team').carousel('pause');
            } else {
                jQuery(this).children('.glyphicon').addClass('glyphicon-pause').removeClass('glyphicon-play');
                jQuery(this).attr('title','Pause');
                jQuery(this).children('.sr-only').text('Pause');
                jQuery('#carousel-team').carousel('cycle');
            };
            return false;
        });

        // Où sont mes équipes ?
        jQuery('#carousel-team').after('<div class="col-sm-6 text-center" id="Options"></p>');
        jQuery('#Options').prepend(jQuery('a[href="/find_team"]'));
        jQuery('a[href="/find_team"]').wrap('<p></p>');

        // Liste des équipes publiques
        jQuery('#Options').append(
                '<p><a href="javascript:void(0)" id="ListBtn" class="btn btn-default">'+
                '    <i class="fa fa-fw fa-user-plus"></i> Rejoindre une équipe publique'+
                '</a></p>'+
                '<div class="modal fade" id="ListModal" tabindex="-1" role="dialog" aria-labelledby="ListModalLabel">'+
                    '<div class="modal-dialog modal-lg">'+
                        '<div class="modal-content">'+
                            '<div class="modal-header">'+
                                '<button type="button" class="close" data-dismiss="modal" aria-label="Fermer"><span aria-hidden="true">&times;</span></button>'+
                                '<h4 class="modal-title" id="ListModalLabel"></h4>'+
                            '</div>'+
                            '<div class="modal-body" id="ListImport"></div>'+
                            '<div class="modal-footer">'+
                                '<button type="button" class="btn btn-default" data-dismiss="modal">Fermer</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'
        );
        jQuery('#ListModalLabel').prepend(jQuery('#signup-team h4:eq(0)'));
        jQuery('#ListImport').prepend(jQuery('#signup-team .signup-team-all'));
        jQuery('#ListBtn').click(function() { jQuery('#ListModal').modal('show') });
    }

/** Dans le tchat **/
} else {

    jQuery('.container-fluid').css('padding-top','42px');
    jQuery('#channel_view').css('margin-top','-=42');

}
