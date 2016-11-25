jQuery(document).ready(function(){
  // Liste des projets
  var list = [
    {col: 0, f:"Frama",   s:"libre",      c:"b", fa:"fa-linux",                 title:"Annuaire de logiciels libres"},
    {col: 0, f:"Frama",   s:"key",        c:"b", fa:"fa-usb",                   title:"Clé usb"},
    {col: 0, f:"Frama",   s:"dvd",        c:"b", fa:"fa-play-circle-o",         title:"DVD"},
    {col: 0, f:"Frama",   s:"pack",       c:"b", fa:"fa-download",              title:"Installateur de logiciels",
                                          git:  "framasoft/framapack"},
    {col: 0, f:"Frama",   s:"blog",       c:"r", fa:"fa-pencil",                title:"Blog"},
    {col: 0, f:"Frama",   s:"book",       c:"r", fa:"fa-book",                  title:"Livres"},
    {col: 0, f:"Frama",   s:"bookin",     c:"r", fa:"fa-coffee",                title:"Bibliothèque",
                                          git:  "framasoft/framabookin",
                                          soft: "BicBucStriim",
                                          site: "https://github.com/rvolz/BicBucStriim"},
    {col: 0, f:"Frama",   s:"tube",       c:"r", fa:"fa-film",                  title:"Vidéos"},
    {col: 0, f:"Frama",   s:"zic",        c:"r", fa:"fa-music",                 title:"Musique"},
    {col: 0, f:"Fram",    s:"agora",      c:"j", fa:"fa-comments",              title:"Forum"},
    {col: 0, f:"EnVente", s:"Libre",      c:"j", fa:"fa-shopping-cart",         title:"Boutique"},
    {col: 1, f:"Frama",   s:"pad",        c:"v", fa:"fa-align-left",            title:"Traitement de texte",
                                          git:  "framasoft/framapad",
                                          soft: "Etherpad",
                                          site: "https://github.com/ether/etherpad-lite"},
    {col: 1, f:"Frama",   s:"calc",       c:"v", fa:"fa-th",                    title:"Tableur",
                                          git:  "framasoft/framacalc",
                                          soft: "Ethercalc",
                                          site: "https://github.com/audreyt/ethercalc"},
    {col: 1, f:"Frama",   s:"forms",      c:"v", fa:"fa-list-ul",               title:"Questionnaires",
                                          git:  "framasoft/framaforms",
                                          soft: "Webform",
                                          site: "https://www.drupal.org/project/webform"},
    {col: 1, f:"Fram",    s:"agenda",     c:"v", fa:"fa-calendar",              title:"Calendrier",
                                          git:  "framasoft/framagenda",
                                          soft: "Nextcloud",
                                          site: "https://github.com/nextcloud/"},
    {col: 1, f:"Frama",   s:"date",       c:"v", fa:"fa-calendar",              title:"Alternative à Doodle",
                                          git:  "framasoft/framadate"},
    {col: 1, f:"Frama",   s:"board",      c:"v", fa:"fa-dashboard",             title:"Alternative à Trello",
                                          git:  "framasoft/framaboard",
                                          soft : "Kanboard",
                                          site: "https://github.com/fguillot/kanboard"},
    {col: 1, f:"Fra",     s:"mindmap",    c:"v", fa:"fa-sitemap fa-rotate-270", title:"Cartes mentales",
                                          git:  "framasoft/framindmap",
                                          soft: "Wisemapping",
                                          site: "https://bitbucket.org/wisemapping/wisemapping-open-source"},
    {col: 1, f:"Frama",   s:"vectoriel",  c:"v", fa:"fa-paint-brush",           title:"Dessin",
                                          git:  "framasoft/framavectoriel",
                                          soft: "SVG-Edit",
                                          site: "https://github.com/SVG-Edit/svgedit"},
    {col: 1, f:"Frama",   s:"bee",        c:"v", fa:"fa-search",                title:"Moteur de recherche",
                                          soft: "Searx",
                                          site: "https://github.com/asciimoo/searx"},
    {col: 1, f:"Frama",   s:"carte",      c:"v", fa:"fa-map",                   title:"Cartes géographiques personnalisées",
                                          git:  "framasoft/framacarte",
                                          soft: "uMap",
                                          site: "https://github.com/umap-project"},
    {col: 1, f:"Frama",   s:"sphere",     c:"v", fa:"fa-asterisk",              title:"Réseau social Diaspora*",
                                          git:  "framasoft/framasphere",
                                          soft: "Diaspora*",
                                          site: "https://github.com/diaspora"},
    {col: 1, f:"Frama",   s:"team",       c:"v", fa:"fa-comments-o",            title:"Communication collaborative",
                                          soft: "Mattermost",
                                          site: "https://github.com/mattermost"},
    {col: 1, f:"Frama",   s:"listes",     c:"v", fa:"fa-group",                 title:"Liste de diffusion",
                                          soft: "Sympa",
                                          site: "https://sourcesup.renater.fr/tracker/?group_id=23"},
    {col: 1, f:"Frama",   s:"talk",       c:"v", fa:"fa-video-camera",          title:"Visioconférence",
                                          git:  "framasoft/framatalk",
                                          soft: "Jitsi Meet",
                                          site: "https://github.com/jitsi/jitsi-meet/"},
    {col: 2, f:"Frama",   s:"vox",        c:"v", fa:"fa-bullhorn",              title:"Prise de décision",
                                          git:  "framasoft/framavox",
                                          soft: "Loomio",
                                          site: "https://github.com/loomio"},
    {col: 2, f:"Frama",   s:"petitions",  c:"v", fa:"fa-balance-scale",         title:"Pétitions",
                                          //git:  "framasoft/framapetitions",
                                          soft: "Webform",
                                          site: "https://www.drupal.org/project/webform"},
    {col: 2, f:"Fra",     s:"memo",       c:"v", fa:"fa-object-group",          title:"Brainstorming",
                                          git:  "framasoft/framemo",
                                          soft: "Scrumblr",
                                          site: "https://github.com/aliasaria/scrumblr"},
    {col: 2, f:"Frama",   s:"notes",      c:"v", fa:"fa-sticky-note",           title:"Notes",
                                          git:  "framasoft/framanotes",
                                          soft: "Turtl",
                                          site: "https://github.com/turtl"},
    {col: 2, f:"Frama",   s:"bag",        c:"v", fa:"fa-briefcase",             title:"Alternative à Pocket",
                                          git:  "framasoft/framabag",
                                          soft: "Wallabag",
                                          site: "https://github.com/wallabag"},
    {col: 2, f:"Frama",   s:"news",       c:"v", fa:"fa-newspaper-o",           title:"Lecteur de flux RSS",
                                          git:  "framasoft/framanews",
                                          soft: "TTRSS",
                                          site: "https://tt-rss.org/gitlab/fox/tt-rss/wikis/home"},
    {col: 2, f:"Frama",   s:"games",      c:"v", fa:"fa-gamepad",               title:"Compilation de jeux en ligne",
                                          git:  "framasoft/framagames"},
    {col: 2, f:"Fra",     s:"minetest",   c:"v", fa:"fa-cube",                  title:"Alternative à Minecraft",
                                          git:  "framasoft/framinetest",
                                          soft: "Minetest",
                                          site: "https://github.com/minetest"},
    {col: 2, f:"Frama",   s:"drive",      c:"v", fa:"fa-cloud-upload",          title:"Alternative à Dropbox",
                                          git:  "framasoft/framadrive",
                                          soft: "Owncloud",
                                          site: "https://github.com/owncloud/"},
    {col: 2, f:"Frama",   s:"drop",       c:"v", fa:"fa-send",                  title:"Alternative à WeTransfer",
                                          git:  "framasoft/framadrop",
                                          soft: "Lufi",
                                          site: "https://framagit.org/luc/lufi"},
    {col: 2, f:"Frama",   s:"bin",        c:"v", fa:"fa-paste",                 title:"Alternative à Pastebin",
                                          git:  "framasoft/framabin",
                                          soft: "Zerobin",
                                          site: "https://github.com/sebsauvage/ZeroBin"},
    {col: 2, f:"Frama",   s:"pic",        c:"v", fa:"fa-photo",                 title:"Partage d’images",
                                          git:  "framasoft/framapic",
                                          soft: "Lutim",
                                          site: "https://framagit.org/luc/lutim"},
    {col: 2, f:"Frama",   s:"link",       c:"v", fa:"fa-link",                  title:"Raccourcisseur d’URL",
                                          git:  "framasoft/framalink",
                                          soft: "LSTU",
                                          site: "https://framagit.org/luc/lstu"},
    {col: 2, f:"My",      s:"Frama",      c:"v", fa:"fa-star",                  title:"Marque-pages en ligne",
                                          git:  "framasoft/myframa",
                                          soft: "Shaarli",
                                          site: "https://github.com/shaarli/Shaarli"},
    {col: 2, f:"Frama",   s:"git",        c:"v", fa:"fa-git",                   title:"Alternative à Github",
                                          soft: "Gitlab",
                                          site: "https://about.gitlab.com/contributing/"},
    {col: 2, f:"Dégooglisons",   s:" Internet",        c:"o", fa:"fa-shield",   title:"Campagne de sensibilitation",
                                          git: "framasoft/degooglisons"}
  ];

  // Menu projets
  var aideList       = ['<div class="list-group col-sm-4">', '<div class="list-group col-sm-4">', '<div class="list-group col-sm-4">'];
  var partList = ['<div class="col-sm-6"><table class="table table-bordered" role="presentation">', '', '<div class="col-sm-6"><table class="table table-bordered" role="presentation">'];
  var projetId  = [];

  list.forEach(function(projet) {
    var fc = 'orange';
    switch (projet.c)   {
      case 'r': fc = 'rouge';  break;
      case 'b': fc = 'bleu';   break;
      case 'v': fc = 'vert';   break;
      case 'j': fc = 'jaune';  break;
      case 'o': fc = 'orange'; break;
    }
    projet.id = projet.f.toLowerCase()+projet.s;
    projetId.push(projet.id);
    if(projet.f != 'Dégooglisons') {
      aideList[projet.col] += '<button type="button" class="list-group-item '+projet.id+'" title="'+projet.title+'"><i class="fa fa-fw fa-lg '+projet.fa+'"></i>&nbsp;<b class="violet">'+projet.f+'</b><b class="'+fc+'">'+projet.s+'</b></button>';
    }
    if(projet.git || projet.soft) {
      partList[projet.col] += '<tr><td class="'+projet.id+'"><i class="fa fa-fw fa-lg '+projet.fa+'"></i>&nbsp;<b class="violet">'+projet.f+'</b><b class="'+fc+'">'+projet.s+'</b>';
      if(projet.git) {
        partList[projet.col] += ' <a href="https://framagit.org/'+projet.git+'/issues" class="pull-right"><i class="fa fa-fw fa-lg fa-git"></i><span class="sr-only">git</span></a></td>';
      }
      if(projet.soft) {
        partList[projet.col] += ' </td><td>'+projet.soft+' <a href="'+projet.site+'" class="pull-right"><i class="fa fa-fw fa-lg fa-code-fork"></i><span class="sr-only">source</span></a></td></tr>';
      } else {
        partList[projet.col] += ' </td><td></td></tr>';
      }
    }

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
    jQuery('.wpcf7 form .alert-warning,.faq .alert-warning').hide();

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
      jQuery('#general .faq h3').after(jQuery('#faq_export #faq_contact-press'));
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
      jQuery('#aide .list-group-item').removeClass('fb_g2'); jQuery('#aide .list-group-item .fa-check').remove();
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
