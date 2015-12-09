var f$_version = '151112';
var f$_site = window.location.host
f$_site = f$_site.replace(/^(www|test)\./i,"");
f$_site = f$_site.replace(/\.(com|net|org|fr|pro)$/i,"");

var f$_url = window.location.href;

var f$_not_in_frame = (top.location==self.document.location); // Pas dans une Frame

// Détection du navigateur
var f$_isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var f$_isFirefox = typeof InstallTrigger !== 'undefined';
var f$_isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
var f$_isChrome = !!window.chrome && !f$_isOpera;
var f$_isIE = /*@cc_on!@*/false || !!document.documentMode;

// console n'existe pas sur IE8
(function() {
  if (!window.console) {
    window.console = {};
  }
  var m = [
    "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
  ];
  for (var i = 0; i < m.length; i++) {
    if (!window.console[m[i]]) {
      window.console[m[i]] = function() {};
    }
  }
})();

/**
 * f$() = jQuery() = $()
 * f$_  = variables ou fonctions
 * f$   = free $oftware = frama$oft :P
 **/

/*******************
 *  Config globale
 *******************/
var f$_start_config = function() {
    var f$_speed = (f$_nav_container) ? '☀' : '☁';
    if (f$_config == 'global') {
        var f$_hjQv = (window.jQuery === undefined) ? 'ø' : window.jQuery.fn.jquery;
        var f$_njQv  = '1.11.3';
        console.log('✔ '+f$_speed+' config.js '+f$_version+' | '+f$_njQv+' | '+f$_hjQv);

        if(f$_page('/nav/html/')) { // Si pages « À propos » on réinit la config
            f$_jquery = 'jQuery';
            f$_bootstrap_css = false;
            f$_bootstrap_js = true;
            f$_footer = true;
        }

        switch (f$_jquery) {
            case 'jQuery' :
                if (window.jQuery === undefined || window.jQuery.fn.jquery !== f$_njQv) {
                    console.log('✔ jQuery '+f$_njQv+' AJAX');
                    f$_loadScript(f$_nav+'lib/jquery/jquery.min.js', f$_start_jquery);
                } else {
                    console.log('✔ jQuery '+f$_hjQv+' HTML');
                    f$_start_jquery();
                }
            break;
            case 'noConflict' :
                console.log('✔ jQuery.noConflict '+f$_njQv+' AJAX');
                f$_loadScript(f$_nav+'lib/jquery/jquery.min.js', f$_start_jquery);
            break;
            default:
                if (window.jQuery === undefined) {
                    console.error('✘ jQuery');
                } else {
                    console.log('✔ jQuery '+window.jQuery.fn.jquery+' HTML');
                    f$_start_jquery();
                }
            break;
        }

    } else {
        console.error('✘ '+f$_speed+' config.js '+f$_version);
    }
}; // ---> jQuery

/*******************
 *     Nav init
 *******************/
var f$_scripts = document.getElementsByTagName('script');
var f$_nav = ''; // racine de la nav
var f$_nav_container = false;
var f$_nav_container_html = (f$_not_in_frame) ? '<div id="framanav_container" class="hidden-print" style="height:42px; opacity : 0"></div>' : '<div id="framanav_container" style="display:none"></div>';

var f$_nav_init = function() {
    for (var i = 0; i < f$_scripts.length; i++) {
        if (f$_scripts[i].getAttribute("src") && f$_scripts[i].getAttribute("src").indexOf("/nav.js") > -1) {
            // Emplacement de la nav ('/nav/', '/static/nav/, '../nav/' → 'http://'+f$_site+'/nav')
            f$_nav = f$_scripts[i].getAttribute("src").replace('nav.js','');
            f$_nav = f$_absolutePath(f$_nav);
            // On ajout une div vide de 42px qui contiendra la nav (évite les sauts de mise en page avant le chargement des fichiers)
            if (f$_scripts[i].parentNode.tagName.toLowerCase() == 'body' ) {
                // si nav.js est appelé en haut du body, c'est super rapide
                document.write(f$_nav_container_html);
                f$_nav_container = true;
            } // sinon c'est dans le head, il faut attendre document.ready (voir plus bas)
        }
    }

    f$_loadScript(f$_nav+'config.js?'+f$_version, f$_start_config);
}; // ---> config.js

f$_nav_init();

/*******************
 *     jQuery
 *******************/
function f$_start_jquery() {
    /*
     * CSS
     */
    // Bootstrap
    if (f$_bootstrap_css) {
        f$_loadCSS(f$_nav+'lib/bootstrap/css/bootstrap.min.css', f$_css_position, 'all');
    }

    // Font-awesome
    f$_loadCSS(f$_nav+'lib/font-awesome/css/font-awesome.min.css','end','all');

    // Nav.css
    f$_loadCSS(f$_nav+'css/nav.css?'+f$_version);

    // Frama.css
    if(f$_frama_css) {
        f$_loadCSS(f$_nav+'css/frama.css?'+f$_version, 'end', 'all');
    }

    // Extra.css
    if(f$_extra_css) {
        f$_loadCSS(f$_nav+'css/extra/'+f$_site+'.css?'+f$_version);
    }

    /*
     * Nav
     */
    switch (f$_jquery) {
        case 'noConflict': var f$ = jQuery.noConflict(); break;
        default          : var f$ = jQuery;break;
    }

    f$(document).ready(function() {
        if (f$_url === 'https://framacalc.org/_start' && f$('html').attr('manifest') !== 'manifest.appcache') {
            console.log('Reloading https://framacalc.org/_start because of bad _start version');
            window.location.href = 'https://framacalc.org/_start?reload=1';
        }

        f$.ajaxSetup({ cache: f$_cache });

        if(!f$_nav_container) {
            f$('body').prepend(f$_nav_container_html);
        }

        // On charge ensuite le code HTML
        f$.ajax({
            url: f$_nav+'html/nav.html?'+f$_version
        })
        .fail(function() {
            console.error('✘ nav.html');
        })
        .done(function(html) {
            // On affiche le code html
            f$('#framanav_container').prepend(html);
            // Correctif sur les url relatives (les images) dans le code html
            f$('img[src^="nav/"]').each(function(){
                link=f$(this).attr('src');
                f$(this).attr('src',link.replace('nav/',f$_nav));
            });
            f$('#framanav .navbar-brand img').attr('src',f$_nav+'img/logo.png');

            // On ajoute le viewport si Responsive
            var f$_btn_desktop = f$('.framanav-desktop');
            var f$_btn_mobile = f$('.framanav-mobile');

            function f$_mobile() {
                var f$_viewport = f$('meta[name="viewport"]');
                if (f$_viewport.length==0) {
                    f$('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
                } else {
                    f$_viewport.attr('content','width=device-width, initial-scale=1.0');
                }
                f$_btn_desktop.addClass('visible-xs-inline').show();
                f$_btn_mobile.hide();
            };

            function f$_desktop() {
                var f$_viewport = f$('meta[name="viewport"]');
                if (f$_viewport.length) {
                    f$_viewport.attr('content','width=1024');
                }
                f$_btn_desktop.removeClass('visible-xs-inline').hide();
                f$_btn_mobile.show();
            }

            if (f$_responsive) {
            // Viewport mobile si Responsive dans la config
            // Boutons « Désactiver mode mobile » par défaut
                f$_mobile();
            } else if (f$('meta[name="viewport"]').length==0) {
            // Bouton « Activer mode mobile » par défaut
                f$_desktop();
            }
            // Si (Dés)Activation mannuel, le cookie prend la main le temps de la session
            switch (getCookie('nav_viewport')) {
                case 'mobile' : f$_mobile(); break;
                case 'desktop': f$_desktop(); break;
            }
            // Boutons (Dés)Activer le mode mobile
            f$_btn_mobile.on('click', function() {
                f$_mobile();
                document.cookie = 'nav_viewport=mobile;expire=0';
            });
            f$_btn_desktop.on('click', function() {
                f$_desktop();
                document.cookie = 'nav_viewport=desktop;expire=0';
            });

            f$('#framanav_container').css('opacity','1');

            /*******************
             *   BootStrap JS
             *******************/
            if (f$_bootstrap_js) {
                if (typeof f$().modal == 'function' || f$_bootstrap_js == 'html') {
                    console.log('✔ Bootstrap HTML');
                    go_BootStrap();
                } else {
                    f$.getScript(f$_nav+'lib/bootstrap/js/bootstrap.min.js', function() {
                        console.log('✔ Bootstrap Ajax');
                        go_BootStrap();
                    });
                }
            } else {
                console.info('✘ Bootstrap');
            }


            // Audio JS
            if (f$_audio_js) {
                f$('audio').each(function() {
                    f$(this).wrap('<div class="audio" />');
                        var outer = this.outerHTML;
                    var regex = new RegExp('<' + this.tagName, 'i');
                        var newTag = outer.replace(regex, '<video');
                        regex = new RegExp('</' + this.tagName, 'i');
                        newTag = newTag.replace(regex, '</video');
                    f$(this).replaceWith(newTag);
                });
            }

            // Video JS
            if (f$_video_js) {
                f$('link[href*="/nav/css/nav.css"]').before('<link rel="stylesheet" type="text/css" href="'+f$_nav+'lib/video-js/video-js.css" />');
                 // Paramètres à ajouter à la vidéo pour appliquer VideoJS en surcouche
                f$('video').attr({
                    'class':'video-js vjs-default-skin',
                    'data-setup':'{}'});
                // Numérotation des vidéos (pour pouvoir utiliser l'API : videojs('id').ready() )
                f$('video').each(function(index) {
                    if(f$(this).has('source[type*="webm"]').length && (f$_isFirefox || f$_isOpera || f$_isChrome)) {
                        f$(this).children('source[type*="mp4"]').remove();
                    }
                    f$(this).attr('id','f_video_'+index);
                });

                f$.getScript(f$_nav+'lib/video-js/video.js', function() {
                    console.log('✔ video.js');
                    videojs.options.flash.swf = f$_nav+'lib/video-js/video-js.swf';
                    // On "clique" sur les sous-titres Français
                    // pour chaque vidéo dès que VideoJS est prêt
                    f$('video').each(function(index) {
                            videojs('f_video_'+index).ready(function() { f$("li.vjs-menu-item:contains('Français')").trigger('click'); });
                    });
                });
            }

            // Bloqueur d'iframe style Flashblock
            /* Vidéos Youtube */
            var f$_yt_i=0;
            f$('a[href*="youtube.com/watch"],a[href*="youtu.be/"]').has('img').click(function() {
                // Si lien youtube <a> on l'ajoute le code au clic + ajout d'un Id à l'iframe
                var f$_yt_iframe = f$(this).attr('href').replace(
                    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w\-]{10,12})\b[?=&\w]*(?!['"][^<>]*>|<\/a>)/ig,
                    '<iframe id="youtube'+ f$_yt_i +'" src="https://www.youtube.com/embed/$1?autoplay=1" width="560" height="315" frameborder="0" allowfullscreen ></iframe>');
                f$(this).after(f$_yt_iframe);
                // On supprime <a><img/></a>
                f$(this).remove();
                f$_yt_i++;
                return false;
            });
            /* Même chose à faire pour Soundcloud, Dailymotion, Vimeo */

            // Flux RSS Global
            f$('head').append('<link rel="alternate" type="application/rss+xml" title="Flux global de Framasoft" href="http://rss.framasoft.org/" />');

            // Favicon et Apple touch icon
            if (!f$_keep_icons) {
                f$('link[rel*=icon]').remove();
                f$_favicon = (!f$_favicon) ? 'favicon-violet.png' : f$_favicon;
                f$_apple_touch_icon = (!f$_apple_touch_icon) ? 'apple-violet.png' : f$_apple_touch_icon;
                f$('head').append('<link rel="icon" type="image/png" href="'+f$_nav+'img/icons/'+f$_favicon+'" />');
                f$('head').append('<link rel="apple-touch-icon" href="'+f$_nav+'img/icons/'+f$_apple_touch_icon+'" />');
            }

            // Opt-in
            var f$_optin_dejavu = getCookie('opt-in');
            if (f$_email_field1!='' && !f$_optin_dejavu) {
                f$(f$_email_field1).after(
                    '<div class="alert alert-info fade in" id="fs_opt-in">'+
                    '<input type="checkbox" id="fs_opt-in_checkbox" value="false" />'+
                    '<label for="fs_opt-in_checkbox">J’accepte que Framasoft m’envoie à cette adresse des informations importantes</label>'+
                    '<br /><small>(Promis, nous ne revendons pas nos fichiers, même à la NSA&nbsp;! '+
                    '<a href="https://contact.framasoft.org/newsletter" id="link-opt-in" target="_blank" >Pourquoi m’inscrire&nbsp;?&nbsp;<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span></a>)</small></div>'
                );

                f$(f$_email_field1).focusin(function() {
                    f$('#fs_opt-in_error').remove();
                    // Ajout du cookie (expire au bout d'un an)
                    setCookie(f$_optin_cookie_name,true,f$_optin_cookie);
                });

                // Requête ajax crossdomain lorsque la case est cochée
                f$('#fs_opt-in input, #fs_opt-in label').on('click', function() {
                    f$('#fs_opt-in_error').remove();
                    f$_email = f$(f$_email_field1).val();
                    if(f$_email_field2!='' && f$(f$_email_field1).val()!=f$(f$_email_field2).val()) { // Cas où il y a un champs pour confirmer email
                        f$(f$_email_field1).after(
                            '<div class="alert alert-danger fade in" id="fs_opt-in_error">'+
                            'Les adresses emails ne correspondent pas.</div>'
                        );
                        return false;
                    } else if( !f$_isValidEmail(f$(f$_email_field1).val())) {
                        f$(f$_email_field1).after(
                            '<div class="alert alert-danger fade in" id="fs_opt-in_error">'+
                            'L’adresse email '+f$_email+' n’est pas valide.</div>'
                        );
                        return false;
                    } else {
                        f$('#fs_opt-in input').attr('checked', true);
                        f$.ajax({
                            type: "POST",
                            url: 'https://contact.framasoft.org/php_list/lists/?p=subscribe&id=2', // URL d'abonnement à la liste
                            crossDomain:true,
                            data: 'makeconfirmed=1&htmlemail=1&list%5B5%5D=signup&listname%5B5%5D=Newsletter&email='+f$_email.replace('@','%40')+'&VerificationCodeX=&subscribe=Abonnement' // Paramètres habituellement passés dans le formulaire
                        });
                        // On supprime la case à cocher (pas possible de décocher ; l'annulation se fait depuis le mail reçu)
                        f$('#fs_opt-in').remove();
                        // Message d'alert pour confirmer l'inscription
                        f$(f$_email_field1).after(
                            '<div class="alert alert-success fade in" id="fs_opt-in_confirm" aria-live="polite">'+
                            '<button type="button" class="close" data-dismiss="alert" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                            'Votre adresse email <strong>'+f$_email+'</strong> a été ajoutée à notre liste. Vous devriez avoir reçu un email de confirmation.</div>'
                        );
                    }
                });
            }

            // Footer
            if(f$_footer && f$_not_in_frame) {
                f$.ajax({
                    url: f$_nav+'html/footer.html'
                })
                .fail(function() {
                    console.error('✘ footer.html');
                })
                .done(function(html) {
                    f$('body').append(html);
                    if(f$('body').height() < f$(window).height()) {
                        f$('#framafooter').css('position','absolute');
                    } else {
                        f$('#framafooter').css('position','relative');
                    }
                    f$('#framafooter a[href^="/nav/html/"]').attr('href', function() {
                        return f$(this).attr('href')
                                       .replace('/nav/html/', f$_nav+'html/')
                                       .replace('credits.html', 'credits.html#'+f$_credits)
                                       .replace('legals.html', 'legals.html#'+f$_host);
                    });
                });
                f$(window).on('resize, scroll', function() {
                    f$('#framafooter').css('position','relative');
                    if(f$('body').height() < f$(window).height()) {
                        f$('#framafooter').css('position','absolute');
                    } else {
                        f$('#framafooter').css('position','relative');
                    }
                });
            }

            // Macaron
            if(f$_donate && f$_not_in_frame) {
                f$('#framanav_donation').show().delay(Math.random() * (29000 - 1000) + 1000).fadeOut(600).fadeIn(600);
            }

            // Liens À propos
            f$('nav a[href^="/nav/html/"]').attr('href', function() {
                return f$(this).attr('href')
                               .replace('/nav/html/', f$_nav+'html/')
                               .replace('credits.html', 'credits.html#'+f$_credits)
                               .replace('legals.html', 'legals.html#'+f$_host);
            });

            // Crédits
            if(f$_page('/html/credits.html') && location.hash) {
                f$('#site-credits').load(f$_nav+'html/credits/'+location.hash.replace('#','')+'.html');
            };

            // Hébergeur et Iframe Piwik sur Mentions légales
            if(f$_page('/html/legals.html')) {
                if(location.hash) {
                    f$('#modal-legals-host').load(f$_nav+'html/host/'+location.hash.replace('#','')+'.html');
                }
                f$('#piwik-iframe').html('<iframe style="border: 0; height: 200px; width: 600px;" src="'+f$_piwik_url+'/index.php?module=CoreAdminHome&action=optOut&language=fr"></iframe>')
            }

            /** On peut ajouter des scripts jQuery "génériques" ici mais... **/

            function go_BootStrap() {
                // Redéfini f$ pour Bootstrap en mode noConflict si nécessaire
                switch (f$_jquery) {
                    case 'noConflict': var f$ = jQuery.noConflict(); break;
                    default          : var f$ = jQuery; break;
                }

                /**
                 *  Accessibilité
                 *  code issu de https://github.com/paypal/bootstrap-accessibility-plugin
                 **/
                // Alert
                f$('.close').removeAttr('aria-hidden').wrapInner('<span aria-hidden="true"></span>').append('<span class="sr-only">Fermer</span>');
                // Modal
                if(typeof f$().modal == 'function') {
                    var modalhide =   f$.fn.modal.Constructor.prototype.hide;
                    f$.fn.modal.Constructor.prototype.hide = function(){
                        var modalOpener = this.$element.parent().find('[data-target="#' + this.$element.attr('id') + '"]');
                        modalhide.apply(this, arguments);
                        modalOpener.focus();
                    }
                }
                /** Fin accessibilité **/

                if (f$_not_in_frame) { // Pas de bandeau, nav, modale et macaron en mode iframe

                    if(f$_nav_static || f$_page('/nav/html/')) {
                        f$('#framanav_container ~ *:not(script):first').css('margin-top', '+=42');
                        f$('#framanav_container').css({
                            'position':'fixed',
                            'width':'100%',
                            'top':'0',
                            'z-index':'1000'
                        });
                    }

                    // Liens de la nav à ouvrir dans un onglet
                    if(!f$_page('/nav/html/')) {
                        f$('#framanav .dropdown-menu a').attr('target','_blank').append('<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span>');
                    }

                    /** ... on ajoute surtout les scripts qui font appel à BootStrap et jQuery ici **/
                    // Activation des popovers
                    if(typeof f$().popover == 'function') {
                        f$('a[rel="popover"]').each(function() {
                            f$(this).popover({
                                html: true,
                                trigger: 'focus hover',
                                // utilisation de 'template' pour ajout du lien sur la popover en mode tactile
                                //template: '<div class="popover" role="tooltip"><div class="arrow"></div><a href="'+f$(this).attr('href')+'"><h3 class="popover-title"></h3><div class="popover-content"></div></a></div>'
                            });
                            f$(this).removeAttr('title');
                        });
                    }

                    // Fenêtre modale et bandeau d'alerte
                    var f$_alert_dejavu = getCookie('nav-alert');
                    var f$_alert_modal_dejavu = getCookie(f$_alert_modal_cookie_name);

                    // Ajout de la fenêtre modale
                    if (f$_alert_modal_text!='') {
                        f$('body').append(
                        '<div class="modal fade" lang="fr" id="modal-alert" tabindex="-1" role="dialog" aria-labelledby="modal-alertLabel" aria-hidden="true">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                        '<button type="button" class="close" data-dismiss="modal" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                                        '<h1 id="modal-alertLabel">'+f$_alert_modal_title+'</h1>'+
                                    '</div>'+
                                    '<div class="modal-body">'+f$_alert_modal_text+'</div>'+
                                    '<div class="modal-footer">'+
                                        '<button class="btn" id="modal-close" data-dismiss="modal">Fermer</button>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');

                        if(!f$_alert_modal_dejavu && f$_alert_modal_onstart) {
                            f$('#modal-close').after('<button class="btn btn-primary" id="modal-set-cookie" >Ne plus afficher</button>')
                            f$('#modal-alert').modal('show');
                            f$('#modal-set-cookie').click(function() {
                                setCookie(f$_alert_modal_cookie_name,true,f$_alert_modal_cookie); // cookie pour 7 jours par défaut (cf config.js)
                                f$('#modal-alert').modal('hide');
                            });
                        }
                        f$('#modal-alert .close, #modal-close').click(function() {
                            setCookie(f$_alert_modal_cookie_name,true); // cookie pour la session
                            f$('#modal-alert').modal('hide');
                        });
                    }

                    // Ajout du bandeau d'alerte
                    if (f$_alert_text!='' && !f$_alert_dejavu) {

                        f$_alert_margin_top = '';
                        if (f$_nav_static || f$_page('/nav/html/')) {
                            f$('#framanav_container ~ *:not(script):first').css('margin-top', '-=42');
                            f$_alert_margin_top = ' padding-top:52px;';
                        }

                        f$('#framanav_container').after(
                            '<div id="nav-alert" lang="fr" class="alert alert-'+f$_alert_type+' fade in" style="border-radius:0;'+f$_alert_margin_top+'">'+
                                '<button type="button" class="close" data-dismiss="alert" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                                '<p style="text-align:center">'+f$_alert_text+'</p>'+
                            '</div>'
                        );

                        // Cookie enregistré en fermant (7 jours par défaut cf config.js)
                        f$('#nav-alert').bind('closed.bs.alert', function () {
                            setCookie(f$_alert_cookie_name,true,f$_alert_cookie);
                        });

                    }

                    // Fenêtre modal pour dons sur téléchargements
                    if (f$_modal_don_liendl!='') {
                        f$('body').append(
                        '<div class="modal fade" lang="fr" id="modal-soutenir" tabindex="-1" role="dialog" aria-labelledby="modal-soutenirLabel" aria-hidden="true">'+
                            '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                    '<div class="modal-header">'+
                                        '<button type="button" class="close" data-dismiss="modal" title="Fermer"><span aria-hidden="true">&times;</span><span class="sr-only">Fermer</span></button>'+
                                        '<h1 id="modal-soutenirLabel">Soutenez Framasoft</h1>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<div id="lldemars-framasoft"></div>'+
                                        '<p>Vous êtes sur le point '+f$_modal_don_txtdl1+' une ressource <b>libre</b> issue de la vingtaine de projets du réseau Framasoft.</p>'+
                                        '<p>Cette ressource est <b>gratuite</b> (et le sera tant que nous existerons) parce que <b>Framasoft est une association d’intérêt général à but non lucratif</b> dont l’objectif est justement la diffusion du logiciel libre et sa culture au plus large public.'+
                                        '<p>Mais tout ceci est rendu possible parce que Framasoft est <b>soutenue par les dons (défiscalisables) de ses utilisateurs</b>.</p>'+
                                        '<p>Merci de prendre quelques minutes en nous aidant à pérenniser et développer notre action.</p>'+
                                    '</div>'+
                                    '<div class="modal-footer">'+
                                        '<p class="col-md-6 text-center"><a target="_blank" id="modal-don" href="https://soutenir.framasoft.org/?f=modal&s='+f$_site+'" class="btn btn-soutenir btn-block"><span class="fa fa-fw fa-lg fa-heart"></span> Je veux faire un don<br /> à l’association Framasoft&nbsp;<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span></a></p>'+
                                        '<p class="col-md-6 text-center"><a target="_blank" id="modal-contact" href="https://participer.framasoft.org" class="btn btn-info btn-block"><span class="fa fa-fw fa-lg fa-paw"></span> Je veux participer.<br />Par où on commence ?&nbsp;<span class="fa fa-external-link new-window"></span><span class="sr-only"> (nouvelle fenêtre)</span></a></p>'+
                                        '<p class="clearfix text-right"><a id="modal-dl" href="javascript:void(0);" class="text-primary" >Non merci, je souhaite seulement '+f$_modal_don_txtdl2+'</a></p>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                        '</div>');

                        if(f$_modal_don_liendl=='onstart') {
                            var dejavu = getCookie('dondl');
                            if(!dejavu) {
                                f$('#modal-soutenir').modal('show');
                                f$('#modal-soutenir').css('display','block'); // bugfix
                                f$('#modal-contact, #modal-don, #modal-dl, #modal-soutenir .close').click(function() {
                                    setCookie('dondl',true,f$_modal_don_cookie);
                                    f$('#modal-soutenir').modal('hide');
                                });
                            }
                        } else {
                            f$(f$_modal_don_liendl).click(function() {
                                var dejavu = getCookie('dondl');
                                if(!dejavu) {
                                    link=f$(this).attr('href');
                                    f$('#modal-soutenir').modal('show');
                                    f$('#modal-contact, #modal-don, #modal-dl').click(function() {
                                        setCookie('dondl',true,f$_modal_don_cookie);
                                        f$('#modal-soutenir').modal('hide');
                                        window.location.href = link;
                                    });
                                return false;
                                }
                            });
                        }
                    }
                }// </f$_not_in_frame>
            } // </go_BootStrap>
        }); // </nav.html>
    }); // </document.ready>
}   // </start_jQuery>

/************** Fonctions globales ****************/
// Cookies
function setCookie(sName, sValue, sTime) {
    sTime = typeof sTime !== 'undefined' ? sTime : 365*24*60*60*1000;
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + sTime);
    document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
}

function getCookie(sName) {
    var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    } else {
        return null;
    }
}

// Fonction d'ajout de scripts
function f$_loadScript(url, callback, forceCallback) {
    if (!this.loadedScript) {
        this.loadedScript = new Array();
    }

    // indexOf n'existe pas pour IE8
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(elt /*, from*/) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
             ? Math.ceil(from)
             : Math.floor(from);
        if (from < 0)
          from += len;
        for (; from < len; from++) {
          if (from in this &&
              this[from] === elt)
            return from;
        }
        return -1;
        };
    }
    // fin teste indexOf

    if (this.loadedScript.indexOf(url) == -1) {
        this.loadedScript.push(url);
        var head = document.getElementsByTagName("head")[0];
        var e = document.createElement("script");
        e.src = url;
        e.type = "text/javascript";
        e.charset ="utf-8";

        var done = false;
        e.onload = e.onreadystatechange = function() {
            if ( !done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;
                callback();
                // Handle memory leak in IE
                e.onload = e.onreadystatechange = null;
            }
        };

        head.appendChild(e);
    } else {
        if (forceCallback) { // pas utilisé
            callback();
        }
    }
}

// Ajout de CSS
function f$_loadCSS(url, position, media) {
    if (position==undefined) position='end';
    if (media==undefined) media='screen';
    var f$_link = document.createElement('link');
        f$_link.rel = "stylesheet";
        f$_link.media=media;
        f$_link.href= url;

    if (position == 'start') {
        document.getElementsByTagName('head')[0].insertBefore(f$_link, document.getElementsByTagName('head')[0].firstChild);
    } else {
        document.getElementsByTagName('head')[0].appendChild(f$_link);
    }
}

function f$_isValidEmail(emailAddress) {
    var pattern = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    if (pattern.test(emailAddress)==true) {
        return true;
    } else {
       return false;
    }
}

function f$_page(string) {
    return (f$_url.indexOf(string) > -1);
}

function f$_absolutePath(href) {
    var link = document.createElement("a");
    link.href = href;
    return (link.protocol+"//"+link.host+link.pathname+link.search+link.hash);
}