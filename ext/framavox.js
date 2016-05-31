jQuery('.lmo-navbar__logo').html('<b class="violet">Frama</b><b class="vert">vox</b>');

if(jQuery('meta[property="og:locale"]').attr('content').indexOf('fr')>-1) {

    // Traductions manquantes
    jQuery('.comment-form textarea').attr('placeholder','Dites quelque chose…');
    jQuery('.email-settings-page__learn-more-link').attr('href','#lien-vers-la-doc').text('En savoir plus sur les réglages de courriel…');
    jQuery('.membership-requests-page__previous-request-response span').text(function(){return jQuery(this).text().replace('Approved', 'Approuvée') });

    // Aide
    jQuery('a[href*="//loomio.gitbooks.io"]').attr('href','#lien-vers-la-doc');
    // On masque le tuto vidéo
    jQuery('.group-welcome-modal__close-button').trigger('click');
    jQuery('.group-help-card__video-wrapper').hide();
    jQuery('iframe[src="https://www.youtube.com/embed/CoYYNthNxOY"]').attr({
        'src':'https://framatube.org/media/tutoriel-framapad/embed_player',
        'ng-src':'https://framatube.org/media/tutoriel-framapad/embed_player'
    });
    
    setInterval(function() {
 
        // Traductions manquantes
        jQuery('title:contains("Loomio")').text(function(){return jQuery(this).text().replace('Loomio', 'Framavox') });

        // Dates en anglais
        jQuery('.timeago span').each(function(){
            var timeago = jQuery(this).text();
            
            if(timeago.indexOf('in a few') >-1) {
                timeago = timeago.replace('in a few', 'dans quelques');
            } else {
                timeago = timeago.replace('a ', '1 ').replace('an ', '1 ');
                if(timeago.indexOf('Fermé') >-1) {
                    timeago = 'Fermé depuis '+timeago.replace(' ago', '');
                } else if(timeago.indexOf(' ago') >-1) {
                    timeago = 'depuis '+timeago.replace(' ago', '');
                }
                if(timeago.indexOf('in ') >-1) {
                    timeago = timeago.replace('in ', 'dans ');
                }
            }
            
            timeago = timeago.replace('second', 'second').replace('hour', 'heure')
                   .replace('day', 'jour').replace('months', 'mois').replace('month', 'mois')
                   .replace('year', 'année')
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
