/* global n$:{} c$ f$ */
// Carousel et Modal manquants
+function(t){"use strict";function e(e){return this.each(function (){var s=t(this),o=s.data("bs.carousel"),n=t.extend({},i.DEFAULTS,s.data(),"object"==typeof e&&e),a="string"==typeof e?e:n.slide;o||s.data("bs.carousel",o=new i(this,n)),"number"==typeof e?o.to(e):a?o[a]():n.interval&&o.pause().cycle()})}var i=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};i.VERSION="3.3.6",i.TRANSITION_DURATION=600,i.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},i.prototype.keydown=function(t){if (!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},i.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},i.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},i.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e),s="prev"==t&&0===i||"next"==t&&i==this.$items.length-1;if (s&&!this.options.wrap)return e;var o="prev"==t?-1:1,n=(i+o)%this.$items.length;return this.$items.eq(n)},i.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));return t>this.$items.length-1||0>t?void 0:this.sliding?this.$element.one("slid.bs.carousel",function (){e.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",this.$items.eq(t))},i.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},i.prototype.next=function (){return this.sliding?void 0:this.slide("next")},i.prototype.prev=function (){return this.sliding?void 0:this.slide("prev")},i.prototype.slide=function(e,s){var o=this.$element.find(".item.active"),n=s||this.getItemForDirection(e,o),a=this.interval,r="next"==e?"left":"right",d=this;if (n.hasClass("active"))return this.sliding=!1;var l=n[0],h=t.Event("slide.bs.carousel",{relatedTarget:l,direction:r});if (this.$element.trigger(h),!h.isDefaultPrevented()){if (this.sliding=!0,a&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var c=t(this.$indicators.children()[this.getItemIndex(n)]);c&&c.addClass("active")}var u=t.Event("slid.bs.carousel",{relatedTarget:l,direction:r});return t.support.transition&&this.$element.hasClass("slide")?(n.addClass(e),n[0].offsetWidth,o.addClass(r),n.addClass(r),o.one("bsTransitionEnd",function (){n.removeClass([e,r].join(" ")).addClass("active"),o.removeClass(["active",r].join(" ")),d.sliding=!1,setTimeout(function (){d.$element.trigger(u)},0)}).emulateTransitionEnd(i.TRANSITION_DURATION)):(o.removeClass("active"),n.addClass("active"),this.sliding=!1,this.$element.trigger(u)),a&&this.cycle(),this}};var s=t.fn.carousel;t.fn.carousel=e,t.fn.carousel.Constructor=i,t.fn.carousel.noConflict=function (){return t.fn.carousel=s,this};var o=function(i){var s,o=t(this),n=t(o.attr("data-target")||(s=o.attr("href"))&&s.replace(/.*(?=#[^\s]+$)/,""));if (n.hasClass("carousel")){var a=t.extend({},n.data(),o.data()),r=o.attr("data-slide-to");r&&(a.interval=!1),e.call(n,a),r&&n.data("bs.carousel").to(r),i.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",o).on("click.bs.carousel.data-api","[data-slide-to]",o),t(window).on("load",function (){t('[data-ride="carousel"]').each(function (){var i=t(this);e.call(i,i.data())})})}(jQuery),+function(t){"use strict";function e(e,s){return this.each(function (){var o=t(this),n=o.data("bs.modal"),a=t.extend({},i.DEFAULTS,o.data(),"object"==typeof e&&e);n||o.data("bs.modal",n=new i(this,a)),"string"==typeof e?n[e](s):a.show&&n.show(s)})}var i=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function (){this.$element.trigger("loaded.bs.modal")},this))};i.VERSION="3.3.6",i.TRANSITION_DURATION=300,i.BACKDROP_TRANSITION_DURATION=150,i.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},i.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},i.prototype.show=function(e){var s=this,o=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(o),this.isShown||o.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function (){s.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(s.$element)&&(s.ignoreBackdropClick=!0)})}),this.backdrop(function (){var o=t.support.transition&&s.$element.hasClass("fade");s.$element.parent().length||s.$element.appendTo(s.$body),s.$element.show().scrollTop(0),s.adjustDialog(),o&&s.$element[0].offsetWidth,s.$element.addClass("in"),s.enforceFocus();var n=t.Event("shown.bs.modal",{relatedTarget:e});o?s.$dialog.one("bsTransitionEnd",function (){s.$element.trigger("focus").trigger(n)}).emulateTransitionEnd(i.TRANSITION_DURATION):s.$element.trigger("focus").trigger(n)}))},i.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(i.TRANSITION_DURATION):this.hideModal())},i.prototype.enforceFocus=function (){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},i.prototype.escape=function (){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},i.prototype.resize=function (){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},i.prototype.hideModal=function (){var t=this;this.$element.hide(),this.backdrop(function (){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},i.prototype.removeBackdrop=function (){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},i.prototype.backdrop=function(e){var s=this,o=this.$element.hasClass("fade")?"fade":"";if (this.isShown&&this.options.backdrop){var n=t.support.transition&&o;if (this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+o).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;n?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):e()}else if (!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function (){s.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},i.prototype.handleUpdate=function (){this.adjustDialog()},i.prototype.adjustDialog=function (){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},i.prototype.resetAdjustments=function (){this.$element.css({paddingLeft:"",paddingRight:""})},i.prototype.checkScrollbar=function (){var t=window.innerWidth;if (!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},i.prototype.setScrollbar=function (){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},i.prototype.resetScrollbar=function (){this.$body.css("padding-right",this.originalBodyPad)},i.prototype.measureScrollbar=function (){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var s=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=i,t.fn.modal.noConflict=function (){return t.fn.modal=s,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(i){var s=t(this),o=s.attr("href"),n=t(s.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,"")),a=n.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(o)&&o},n.data(),s.data());s.is("a")&&i.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function (){s.is(":visible")&&s.trigger("focus")})}),e.call(n,a,this)})}(jQuery); // eslint-disable-line

switch (c$.js.j$) {
  case 'noConflict': f$ = jQuery.noConflict(); break; // eslint-disable-line
  default: f$ = jQuery; break; // eslint-disable-line
}

let i18n = {};
if (n$.is.lang('en') || !n$.is.lang('fr', 'b')) {
  i18n = {
    header: {
      lead: 'Collaborative communication',
    },
    slides: {
      discuter: 'Communicate with your team over a chat on steroids',
      canaux: 'Create channels according to team\'s needs',
      pimpez: 'Markdown-powered messages',
      rechercher: 'Find colleagues messages and answer without getting lost',
    },
    diapos: {
      pause: 'Pause',
      prev: 'Previous slide',
      next: 'Next slide',
      play: 'Play',
    },
    create: 'Create an account',
    connect_framagit: 'Sign in with Framagit',
    create_framagit: 'Sign up with Framagit',
    email: 'Email address or User name',
    password: 'Password',
    presentation: {
      h2_1: 'Getting started',
      serviceby: '<b class="violet">Frama</b><b class="vert">team</b> is a free/libre <b>chat</b> service to communicate with a team providing colleagues\' notifications, conversation history and searching.',
      createyours: 'Create your team',
      invite: 'Invite members',
      newchans: 'Create channels (public or private)',
      aide: 'Help',
      learn: 'To learn how to format messages, use emoticons, share images and documents or manage <b class="violet">Frama</b><b class="vert">team</b>, checkout our help pages:',
      trad: '(official documentation translation by the team of <a href="https://participer.framasoft.org/traduction-rejoignez-framalang"><b class="violet">Frama</b><b class="rouge">lang</b></a>)',
      h2_2: 'The software',
      framaware: '<b class="violet">Frama</b><b class="vert">team</b> relies upon the free software <a href="https://about.mattermost.com/">Mattermost</a>.',
      licence: 'Mattermost is licensed under <a href="https://github.com/mattermost/platform/blob/master/LICENSE.txt">licence <abbr>MIT</abbr></a>.',
      h2_3: 'Cultivate your garden',
      contrib_upstream: 'To participate into the development of the software, suggest improvements or just download it, go to <a href="https://github.com/mattermost/platform">project website</a>.',
      home_install: 'If you wish to install your own instance of the software and increase your autonomy, we help you at:',
    },
    teams: {
      join: 'Join a new public team',
      create: 'Create a new team',
      close: 'Close',
      list: 'Public teams listing',
    },
  };
} else {
  i18n = {
    header: {
      lead: 'Communication collaborative',
    },
    slides: {
      discuter: 'Discutez avec votre équipe sur un tchat boosté aux stéroïdes',
      canaux: 'Créez des canaux de discussion selon les besoins de votre équipe',
      pimpez: 'Pimpez vos messages en utilisant la puissance du Markdown',
      rechercher: 'Retrouvez les messages de vos collègues et répondez sans perdre le fil',
    },
    diapos: {
      pause: 'Pause',
      prev: 'Diapo précédente',
      next: 'Diapo suivante',
      play: 'Lecture',
    },
    create: 'Créer un compte',
    connect_framagit: 'Se connecter avec Framagit',
    create_framagit: 'Créer un compte avec Framagit',
    email: 'Email address or User name',
    password: 'Mot de passe',
    presentation: {
      h2_1: 'Prise en main',
      serviceby: '<b class="violet">Frama</b><b class="vert">team</b> est un service de <b>tchat</b> libre qui permet de communiquer avec son équipe en notifiant ses collègues, de conserver ses conversations et d’y faire des recherches.',
      createyours: 'Créez votre équipe',
      invite: 'Invitez vos membres',
      newchans: 'Créez vos canaux de communication (publics ou privés)',
      aide: 'Aide',
      learn: 'Pour apprendre à mettre en page vos messages, utiliser des émoticônes, partager des images et documents et maîtriser <b class="violet">Frama</b><b class="vert">team</b>, consultez nos pages d’aide :',
      trad: '(traduction de la documentation officielle par l’équipe <a href="https://participer.framasoft.org/traduction-rejoignez-framalang"><b class="violet">Frama</b><b class="rouge">lang</b></a>)',
      h2_2: 'Le logiciel',
      framaware: '<b class="violet">Frama</b><b class="vert">team</b> repose sur le logiciel libre <a href="https://about.mattermost.com/">Mattermost</a>.',
      licence: 'Mattermost est sous <a href="https://github.com/mattermost/platform/blob/master/LICENSE.txt">licence <abbr>MIT</abbr></a>.',
      h2_3: 'Cultivez votre jardin',
      contrib_upstream: 'Pour participer au développement du logiciel, proposer des améliorations ou simplement le télécharger, rendez-vous sur <a href="https://github.com/mattermost/platform">le site de développement</a>..',
      home_install: 'Si vous souhaitez installer ce logiciel pour votre propre usage et ainsi gagner en autonomie, nous vous aidons sur :',
    },
    teams: {
      join: 'Rejoindre une équipe publique',
      create: 'Créer une équipe',
      close: 'Fermer',
      list: 'Liste des équipes publiques',
    },
  };
}

//----------------------------------------------------------------------
const f$header = `
  <header role="banner" class="col-xs-12 framateam">
    <h1><a href="/"><b class="frama">Frama</b><b class="services">team</b></a></h1>
    <p class="lead">${i18n.header.lead}</p>
    <hr class="trait" role="presentation" />
  </header>`;

const f$slides = {
  '01-discuter': i18n.slides.discuter,
  '02-canaux': i18n.slides.canaux,
  '03-pimpez': i18n.slides.pimpez,
  '04-rechercher': i18n.slides.rechercher,
};

let f$screen = `
  <div class="text-center framateam">
    <div id="carousel-team" data-interval="7000" class="carousel slide" role="presentation">
      <div class="carousel-inner">`;
Object.keys(f$slides).forEach((k) => {
  const active = (k === '01-discuter') ? ' active' : '';
  f$screen += `
        <div class="item ${active}">
          <img src="https://framasoft.org/nav/ext/team-${k}.jpg" alt="" />
          <div class="carousel-caption">
            <p class="h3">${f$slides[k]}</p>
          </div>
        </div>`;
});
f$screen += `
      </div>
      <p class="text-center" id="play-pause">
        <a href="#play-pause" class="carousel-control" title="${i18n.diapos.pause}">
          <i class="glyphicon glyphicon-pause" aria-hidden="true"></i>
          <span class="sr-only">${i18n.diapos.pause}</span>
        </a>
      </p>
      <a class="left carousel-control" href="#carousel-team" role="button" data-slide="prev" title="${i18n.diapos.prev}">
        <i class="glyphicon glyphicon-chevron-left" aria-hidden="true"></i>
        <span class="sr-only">${i18n.diapos.prev}</span>
      </a>
      <a class="right carousel-control" href="#carousel-team" role="button" data-slide="next" title="${i18n.diapos.next}">
        <i class="glyphicon glyphicon-chevron-right" aria-hidden="true"></i>
        <span class="sr-only">${i18n.diapos.next}</span>
      </a>,
    </div>,
  </div>`;

const f$3Cols = `
  <div class="col-md-5 text-center h1 framateam">
    <a href="/signup_user_complete" class="btn btn-lg btn-success">
      <i class="fa fa-fw fa-lg fa-user" aria-hidden="true"></i> ${i18n.create}
    </a>
  </div>
  <div class="col-md-12 framateam">
    <hr role="presentation" />
    <div class="row">
      <div class="col-md-4" id="tuto-faq">
        <h2>${i18n.presentation.h2_1}</h2>
        <p class="text-center" role="presentation">
          <i class="glyphicon glyphicon-question-sign" aria-hidden="true"></i>
        </p>
        <p>${i18n.presentation.serviceby}</p>
        <ol>
          <li>${i18n.presentation.createyours}</li>
          <li>${i18n.presentation.invite}</li>
          <li>${i18n.presentation.newchans}</li>
        </ol>
        <p>${i18n.presentation.learn}</p>
        <p class="text-center">
          <a href="https://docs.framasoft.org/fr/mattermost/index.html" class="btn btn-primary">${i18n.presentation.aide} »</a>
        </p>
        <p>${i18n.presentation.trad}</p>
      </div>
      <div class="col-md-4" id="le-logiciel">
        <h2>${i18n.presentation.h2_2}</h2>
        <p class="text-center" role="presentation">
          <i class="glyphicon glyphicon-cloud" aria-hidden="true"></i>
        </p>
        <p>${i18n.presentation.framaware}</p>
        <p>${i18n.presentation.licence}</p>
      </div>
      <div class="col-md-4" id="jardin">
        <h2>${i18n.presentation.h2_3}</h2>
        <p class="text-center" role="presentation">
          <i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i>
        </p>
        <p>${i18n.presentation.contrib_upstream}</p>
        <br>
        <p>${i18n.presentation.home_install}</p>
        <p class="text-center">
          <a href="https://framacloud.org/fr/cultiver-son-jardin/gitlab.html" class="btn btn-success">
            <i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i> framacloud.org
          </a>
        </p>
      </div>
    </div>`;

const f$pteams = `
  <div class="text-center framateam" id="Options">
    <p><a href="javascript:void(0)" id="ListBtn" class="btn btn-primary btn-block">
      <i class="fa fa-fw fa-user-plus" aria-hidden="true"></i> ${i18n.teams.join}
    </a></p>
    <p><a href="/create_team" class="btn btn-success btn-block">
      <i class="fa fa-fw fa-lg fa-group" aria-hidden="true"></i> ${i18n.teams.create}
    </a></p>
    <div class="modal fade" id="ListModal" tabindex="-1" role="dialog" aria-labelledby="ListModalLabel">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="${i18n.teams.close}">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="ListModalLabel">${i18n.teams.list}</h4>
          </div>
          <div class="modal-body" id="ListImport"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">${i18n.teams.close}</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
//----------------------------------------------------------------------

const f$origin = n$.url.split('/');
let f$current = window.location.href.split('/');
let f$bodyId = f$('body').attr('id');

// Juste pour savoir d'où on vient
if (f$origin[4] === 'channels' || f$origin[4] === 'tutorial') {
  f$('body').addClass(`og-${f$origin[4]}`);
} else {
  f$('body').addClass(`og-${f$origin[3]}`);
}

const updateDisplay = function updateDisplay(currentId) {
  switch (currentId) {
    case 'ct-channels':
      f$('body').removeClass('inMM outMM').addClass('inMM');
      break;
    case 'ct-admin-console':
      f$('body').removeClass('inMM outMM').addClass('inMM');
      break;
    case 'ct-tutorial':
      f$('body').removeClass('inMM outMM').addClass('inMM');
      f$('.tutorial__steps h1').html('<b class="violet">Frama</b><b class="vert">team</b>');
      break;
    case 'ct-select_team':
      f$('body').removeClass('inMM outMM').addClass('outMM');
      if (f$('#Options').length === 0) {
        f$('.signup-team__container .signup__content:first .signup-team-all:first').after(f$pteams);
        f$('#ListImport').prepend(f$('.signup-team__container .signup__content:eq(0) .signup-team-all'));
        f$('#ListBtn').on('click', () => {
          f$('#ListModal').modal('show');
        });
        f$('a[href*="signup_user_complete"]').on('click', () => {
          f$('#ListModal').modal('hide');
          window.location.href = f$(this).attr('href');
          return false;
        });
        f$('.margin--extra, .signup__content > h4').hide();
      }
      break;
    case 'ct-reset_password':
      f$('body').removeClass('inMM outMM').addClass('outMM');
      break;
    case 'ct-create_team':
      f$('body').removeClass('inMM outMM').addClass('outMM');
      break;
    case 'ct-signup_user_complete':
      f$('body').removeClass('inMM outMM').addClass('outMM');

      f$('.signup-team__container .gitlab')
        .removeClass('btn-custom-login')
        .addClass('btn-link')
        .css('width', '100%')
        .html(`<i class="fa fa-fw fa-gitlab" aria-hidden="true"></i> ${i18n.create_framagit}`);
      f$('.signup-team__container form').after(f$('.signup-team__container > div:first'));
      break;
    case 'ct-login':
      f$('body').removeClass('inMM outMM').addClass('outMM');

      f$('.signup-team__container').after(f$3Cols);

      if (!f$('.signup-team__container').parent().hasClass('col-md-6')) {
        f$('.signup-team__container').wrap('<div class="col-md-6">');
      }

      if (f$('#carousel-team').length === 0) {
        f$('.signup-team__container').parent().before(f$screen);
      }
      f$('.signup__content .form-group:has(a[href$="reset_password"])')
        .addClass('pull-right').css('margin-top', '7px');
      f$('.signup__content .form-group:has(button.btn-primary)')
        .before(f$('.form-group:has(a[href$="reset_password"])'));
      f$('.signup__email-container input[name="loginId"]').attr('placeholder', i18n.email);
      f$('.signup__email-container input[name="loginPassword"]').attr('placeholder', i18n.password);

      f$('.signup__content .gitlab')
        .removeClass('btn-custom-login')
        .addClass('btn-link')
        .css('width', '100%')
        .html(`<i class="fa fa-fw fa-gitlab" aria-hidden="true"></i> ${i18n.connect_framagit}`);

      f$('#play-pause a').on('click', function playPause() {
        if (f$(this).children('.glyphicon').hasClass('glyphicon-pause')) {
          f$(this).children('.glyphicon').addClass('glyphicon-play').removeClass('glyphicon-pause');
          f$(this).attr('title', i18n.diapos.play);
          f$(this).children('.sr-only').text(i18n.diapos.play);
          f$('#carousel-team').carousel('pause');
        } else {
          f$(this).children('.glyphicon').addClass('glyphicon-pause').removeClass('glyphicon-play');
          f$(this).attr('title', i18n.diapos.pause);
          f$(this).children('.sr-only').text(i18n.diapos.pause);
          f$('#carousel-team').carousel('cycle');
        }
        return false;
      });

      f$('#carousel-team').carousel('cycle');
      f$('.signup-team__container h5').hide();
      break;
    default:
      // no default
      break;
  }

  f$('.inMM .framateam').hide();
  f$('.outMM .framateam').show();

  if (f$('.outMM').length > 0 && f$('header.col-xs-12').length === 0) {
    f$('.container-fluid').prepend(f$header);
  }
};

// Ajout d'un id pour savoir sur quelle page on est
setInterval(() => {
  f$current = window.location.href.split('/');
  f$bodyId = f$('body').attr('id');

  const f$currentId = (f$current[4] === 'channels' || f$origin[4] === 'tutorial')
    ? `ct-${f$current[4].split('?')[0]}`
    : `ct-${f$current[3].split('?')[0]}`;

  if (f$bodyId !== f$currentId) {
    f$('body').attr('id', f$currentId);
    updateDisplay(f$currentId);
  }

  // Fix duplicate modal-backdrop
  f$('body .modal-backdrop:eq(1)').remove();
  // Idem au cas où…
  if (f$('.modal:visible').length === 0) {
    f$('body .modal-backdrop').remove();
  }
}, 1000);

// Court-circuiter ReactJS sur l'accès aux teams
f$('a[href*="/channels"]').on('click', function teamAccess() {
  window.location.href = f$(this).attr('href');
  return false;
});

// Lien https://docs.framasoft.org/fr/mattermost/index.html
setInterval(() => {
  f$('a[href*="docs.mattermost.com/help"], a[href*="docs.mattermost.com/index"]')
    .attr('href', function replaceDocsURL() {
      return f$(this).attr('href').replace('docs.mattermost.com', 'docs.framasoft.org/fr/mattermost');
    });
}, 1000);
