if( i$('https://framavox.org/dashboard') && jQuery('.lmo-navbar .navbar__sign-in:visible' ).length) {
    jQuery('body').append('<div id="framahome_container"></div>');
    jQuery('#framahome_container').load('https://framasoft.org/nav/ext/vox.html #framahome', function(){
        jQuery('.md-dialog-container, .md-scroll-mask,.md-dialog-backdrop,.lmo-navbar').hide();
        jQuery("#play-pause a").on('click', function() {
            if(jQuery(this).children('.glyphicon').hasClass('glyphicon-pause')) {
                jQuery(this).children('.glyphicon').addClass('glyphicon-play').removeClass('glyphicon-pause');
                jQuery(this).attr('title','Lecture');
                jQuery(this).children('.sr-only').text('Lecture');
                jQuery('#carousel-vox').carousel('pause');
            } else {
                jQuery(this).children('.glyphicon').addClass('glyphicon-pause').removeClass('glyphicon-play');
                jQuery(this).attr('title','Pause');
                jQuery(this).children('.sr-only').text('Pause');
                jQuery('#carousel-vox').carousel('cycle');
            }
            return false;
        });
        jQuery('#carousel-vox').carousel({'cycle' :true, 'interval': 7000});

        jQuery('#framahome a[href="/dashboard"]').on('click', function(){
            jQuery('.md-dialog-container, .md-scroll-mask,.md-dialog-backdrop,.lmo-navbar').show();
            jQuery('#framahome_container').remove();
            return false;
        });
    }); 
}

/*
if(jQuery('meta[property="og:locale"]').attr('content') && jQuery('meta[property="og:locale"]').attr('content').indexOf('fr')>-1) {

    setInterval(function() {
        // Traductions manquantes
        jQuery('.comment-form textarea').attr('placeholder','Dites quelque chose…');
        jQuery('.email-settings-page__learn-more-link').attr('href','https://docs.framasoft.org/fr/loomio/').text('En savoir plus sur les réglages de courriel…');
        jQuery('.membership-requests-page__previous-request-response span').text(function(){return jQuery(this).text().replace('Approved', 'Approuvée') });

        // Aide
        jQuery('a[lmo-href*="//loomio.gitbooks.io"], a[href="https://framavox.org/docs/"], a[href*="//loomio.gitbooks.io"]')
            .attr({
                'lmo-href':'https://docs.framasoft.org/fr/loomio/',
                'href':'https://docs.framasoft.org/fr/loomio/'
            });

        // Traductions manquantes
        jQuery('title:contains("Loomio")').text(function(){return jQuery(this).text().replace('Loomio', 'Framavox') });

        // Dates en anglais
        jQuery('.timeago span').each(function(){
            var timeago = jQuery(this).text();

            if( timeago.indexOf('few sec') < 0 ) {
                if(timeago.indexOf('in a few') >-1) {
                    timeago = timeago.replace('in a few', 'dans quelques');
                } else {
                    timeago = timeago.replace('a ', '1 ').replace('an ', '1 ');
                    if(timeago.indexOf(' ago') >-1) {
                        timeago = 'depuis '+timeago.replace(' ago', '');
                    }
                    timeago = timeago.replace('depuis Fermée', 'Fermée depuis').replace('in ', 'dans ');
                }

                timeago = timeago.replace('second', 'second').replace('hour', 'heure')
                       .replace('day', 'jour').replace('months', 'mois').replace('month', 'mois')
                       .replace('year', 'année')
            }
            if(jQuery(this).text() != timeago ) { jQuery(this).text(timeago) };
        });


        jQuery('.timeago span, .smart-time span').each(function(){
            var date = jQuery(this).attr('title').split(' ');

            if(date.length == 6) { // Si date en anglais

                date[0] = date[0].replace('Monday', 'Lundi').replace('Tuesday', 'Mardi')
                    .replace('Wednesday','Mercredi').replace('Thursday','Jeudi')
                    .replace('Friday','Vendredi').replace('Saturday','Samedi')
                    .replace('Sunday','Dimanche')

                date[1] = date[1].replace('January','Janvier').replace('February','Février')
                    .replace('March','Mars').replace('April','Avril')
                    .replace('May','Mai').replace('June','Juin')
                    .replace('July','Juillet').replace('August','Août')
                    .replace('September','Septembre').replace('October','Octobre')
                    .replace('November','Novembre').replace('December','Décembre');

                date[2] = date[2].replace(/\D/g,'');

                if(date[5] == 'pm') {
                    var hours = parseInt(date[4].substr(0, 2));
                    if(hours < 12) {
                        date[4] = date[4].replace(hours+':', hours+12+':');
                    }
                } else {
                    date[4] = date[4].replace('12:','0:');
                }

                jQuery(this).attr('title', date[0]+' '+date[2]+' '+date[1]+' à '+date[4]);
            }

        });

        jQuery('.smart-time span').each(function() {
            var time = jQuery(this).text();
            var hours = parseInt(time.substr(0, 2));
            if(time.indexOf(' pm') > -1) {
                if(hours < 12) {
                    time = time.replace(hours+':', hours+12+':');
                } else {
                    time = time.replace('12:','0:');
                }
                time = time.substr(0, 5);
            }
            if(time.indexOf(' am') > -1) {
                time = time.substr(0, 5);
            }
            time = time.replace('Mon','Lun').replace('Tue','Mar')
		       .replace('Wed','Mer').replace('Thu','Jeu')
                       .replace('Fri','Ven').replace('Sat','Sam')
                       .replace('Sun','Dim')
                       .replace('January','Janvier').replace('February','Février')
                       .replace('March','Mars').replace('April','Avril')
                       .replace('May','Mai').replace('June','Juin')
                       .replace('July','Juillet').replace('August','Août')
                       .replace('September','Septembre').replace('October','Octobre')
                       .replace('November','Novembre').replace('December','Décembre');
            jQuery(this).text(time);
        });

    }, 1000);

};
*/