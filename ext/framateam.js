/** Pas dans le tchat **/
if(!(f$_page('/channel')||f$_page('/admin_console')||f$_page('/pl/'))) {
    f$_header = '<header role="banner">'+
                '    <h1><a href="/"><span class="frama">Frama</span><span class="services">team</span></a></h1>'+
                '    <p class="lead">Communication collaborative</p>'+
                '    <hr class="trait" role="presentation" />'+
                '</header>';

    f$_screen = '<div class="text-center">'+
                '    <div id="carousel-team" data-interval="7000" class="carousel slide" role="presentation">'+
                '        <div class="carousel-inner">'+
                '            <div class="item active">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-01-discuter.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p class="h3">Discutez avec votre équipe sur un tchat boosté aux stéroïdes</p>'+
                '                </div>'+
                '            </div>'+
                '            <div class="item">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-02-canaux.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p class="h3">Créez des canaux de discussion selon les besoins de votre équipe.</p>'+
                '                </div>'+
                '            </div>'+
                '            <div class="item">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-03-pimpez.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p class="h3">Pimpez vos messages en utilisant la puissance du Markdown.</p>'+
                '                </div>'+
                '            </div>'+
                '            <div class="item">'+
                '                <img src="'+f$_nav+'ext/'+f$_site+'-04-rechercher.jpg" alt="" />'+
                '                <div class="carousel-caption">'+
                '                    <p class="h3">Retrouvez les messages de vos collègues et répondez sans perdre le fil.</p>'+
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
                '        <p><b class="violet">Frama</b><b class="vert">team</b> est un service de <b>tchat</b> libre qui permet de communiquer avec son équipe en notifiant ses collègues, de conserver ses conversations et d’y faire des recherches.</p>'+
                '        <ol><li>Créez votre équipe</li><li>Invitez vos membres</li><li>Créez vos canaux de communication (publiques ou privés)</li></ol>'+
                '        <p>Pour apprendre à mettre en page vos messages, utiliser des émoticônes, partager des images et documents et maîtriser <b class="violet">Frama</b><b class="vert">team</b>, consultez nos pages d’aide :</p>'+
                '        <p class="text-center"><a href="http://docs.framateam.org" class="btn btn-primary">Aide »</a></p>'+
                '        <p>(traduction de la documentation officielle par l’équipe <a href="https://participer.framasoft.org/traduction-rejoignez-framalang"><b class="violet">Frama</b><b class="rouge">lang</b></a>)</p>'+
                '    </div>'+
                '    <div class="col-md-4" id="le-logiciel">'+
                '        <h2>Le logiciel</h2>'+
                '        <p class="text-center" role="presentation"><span class="glyphicon glyphicon-cloud"></span></p>'+
                '        <p><b class="violet">Frama</b><b class="vert">team</b> repose sur le logiciel libre <a href="https://about.mattermost.com/">Mattermost</a>.</p>'+
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
    jQuery('.row.footer,.signup-team__container h1,.signup-team__container h4.color--light,#signup-team h4:eq(1),.signup-team-logo, .signup-header, #signup-user-complete .signup-team__subdomain').remove();


    /**
     * Formulaire de connexion
     * jQuery('#login')
     **/
    jQuery('#login .form-group:has(a[href$="reset_password"])').addClass('pull-right').css('margin-top','7px');
    jQuery('#login .form-group:has(button.btn-primary)').before(jQuery('.form-group:has(a[href$="reset_password"])'));

    // Connexion uniquement par Nom d'utilisateur
    jQuery('#login .or__container, #login form:eq(0)').hide();
    jQuery('#login form:eq(1)').addClass('well').css('margin-bottom','20px');

    // Gitlab passe après
    jQuery('#login .gitlab')
        .removeClass('btn-custom-login btn-full')
        .addClass('btn-link')
        .css('width','100%')
        .html('<i class="fa fa-fw fa-gitlab"></i>Se connecter avec Framagit');
    jQuery('#login .form-group:has(button.btn-primary)').after(jQuery('#login .gitlab'));
    jQuery('#login .signup__email-container').css('margin-left','0');

    // Créer un compte
    var signUp = jQuery('a[href*="signup_user_complete"]');
    if(jQuery('a[href*="signup_user_complete"]').length > 0) {
        signUp.parent().hide();
        jQuery('.form-group.margin--extra').prepend(signUp);
        signUp
            .html('<i class="fa fa-fw fa-user"></i>Créer un compte')
            .addClass('btn btn-success')
            .after('<hr>');
    } else {
        jQuery('.form-group.margin--extra').prepend('<p class="alert alert-warning">Si vous n’avez pas de compte, il faut demander au(x) responsable(s) de l’équipe '+jQuery('.signup-team__name').text()+' de vous envoyer un <b>lien d’invitation</b></p><hr>');
    }
    // Trouver ses teams
    jQuery('a[href="/find_team"]').addClass('btn btn-warning').prepend('<i class="fa fa-fw fa-search"></i>');
    // Créer une nouvelle team
    jQuery('#login a.signup-team-login[href="/"]').addClass('btn btn-default').prepend('<i class="fa fa-fw fa-users"></i>');

    /**
     * Formulaire de connexion
     * jQuery('#signup-user-complete')
     **/
    jQuery('#signup-user-complete .or__container').hide();
    jQuery('#signup-user-complete .inner__content').addClass('well');
    // Gitlab passe après
    jQuery('#signup-user-complete .gitlab')
        .removeClass('btn-custom-login btn-full')
        .addClass('btn-link')
        .css('width','100%')
        .html('<i class="fa fa-fw fa-gitlab"></i>Ouvrir un compte avec Framagit');
    jQuery('#signup-user-complete .inner__content')
        .append(jQuery('#signup-user-complete .margin--extra:has(button.btn-primary)'))
        .after(jQuery('#signup-user-complete .gitlab'));

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
        jQuery('#carousel-team').carousel('cycle');

        // Gitlab après Email
        jQuery('#signup-team .email').after(jQuery('#signup-team .gitlab'));
        jQuery('#signup-team .gitlab .icon').remove();
        jQuery('#signup-team .gitlab').removeClass('btn-custom-login btn-full').addClass('btn-link');

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

    jQuery('#channel_view').css('margin-top','-=42').css('padding-top','42px');
    jQuery('head').append('<style> .sidebar--left .dropdown-menu {width:250px; max-width:250px}.navbar-right .dropdown-menu{right:-100px}.error-bar{display:none}</style>');

    jQuery('.tutorial__step h1').html('<b class="violet">Frama</b><b class="vert">team</b>');

    // Si page en anglais et première visite
    var f$_stepDejavu = getCookie('stepDejavu');

    if(!f$_stepDejavu) {
        if(window.mm_user.locale == 'en') {

            // Framatheme + langue fr par défaut
            var newUser = window.mm_user;
            newUser.locale = "fr";
            newUser.theme_props = {"awayIndicator":"#c05827","buttonBg":"#6A5687","buttonColor":"#FFFFFF","centerChannelBg":"#ffffff","centerChannelColor":"#333333","codeTheme":"github","linkColor":"#6A5687","mentionBj":"#6A5687","mentionColor":"#ffffff","mentionHighlightBg":"#fff2bb","mentionHighlightLink":"#9876cc","newMessageSeparator":"#eb7239","onlineIndicator":"#52632a","sidebarBg":"#fafafa","sidebarHeaderBg":"#635182","sidebarHeaderTextColor":"#ffffff","sidebarText":"#333333","sidebarTextActiveBorder":"#9876cc","sidebarTextActiveColor":"#111111","sidebarTextHoverBg":"#EDE6F5","sidebarUnreadText":"#333333","type":"custom"};
            jQuery.ajax({
              async: false,
              type: "POST",
              contentType: "application/json",
              url: 'https://framateam.org/api/v1/users/update',
              data: JSON.stringify(newUser),
              dataType: 'json',
              success: function() {setCookie('stepDejavu',true,365*24*60*60*1000); window.location.reload()}
            });
            setCookie('stepDejavu',true,365*24*60*60*1000);
        }
    }
}
