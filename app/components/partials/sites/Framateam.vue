<template>
  <div>
    <portal target-el="#fteam_header">
      <header role="banner" class="clearfix framateam">
        <h1 v-html="$root.html.team"></h1>
        <p class="lead" v-html="$t('team.header.lead')"></p>
        <hr class="trait" role="presentation" />
      </header>
    </portal>

    <portal target-el="#fteam_screen">
      <div class="carousel-container text-center framateam">
        <carousel :indicators="false" :controls="true" :interval="interval" ref="carousel">
          <slide>
            <img src="https://framasoft.org/nav/ext/team-01-discuter.jpg" alt="" />
            <div class="carousel-caption">
              <p class="h3" v-html="$t('team.carousel[0]')"></p>
            </div>
          </slide>
          <slide>
            <img src="https://framasoft.org/nav/ext/team-02-canaux.jpg" alt=""/>
            <div class="carousel-caption">
              <p class="h3" v-html="$t('team.carousel[1]')"></p>
            </div>
          </slide>
          <slide>
            <img src="https://framasoft.org/nav/ext/team-03-pimpez.jpg" alt="" />
            <div class="carousel-caption">
              <p class="h3" v-html="$t('team.carousel[2]')"></p>
            </div>
          </slide>
          <slide>
            <img src="https://framasoft.org/nav/ext/team-04-rechercher.jpg" alt="" />
            <div class="carousel-caption">
              <p class="h3" v-html="$t('team.carousel[3]')"></p>
            </div>
          </slide>
        </carousel>
        <p class="text-center play-pause" v-if="interval === 5000">
          <button class="carousel-control" :title="$t('carousel.pause')"
            @click="interval=0">
            <i class="fa fa-fw fa-pause" aria-hidden="true"></i>
            <span class="sr-only" v-html="$t('carousel.pause')"></span>
          </button>
        </p>
        <p class="text-center play-pause" v-else>
          <button class="carousel-control" :title="$t('carousel.play')"
            @click="interval=5000">
            <i class="fa fa-fw fa-play" aria-hidden="true"></i>
            <span class="sr-only" v-html="$t('carousel.play')"></span>
          </button>
        </p>
      </div>
    </portal>

    <portal target-el="#fteam_prez">
      <div class="col-md-5 text-center h1 framateam">
        <a href="/signup_user_complete" class="btn btn-lg btn-success">
          <i class="fa fa-fw fa-lg fa-user" aria-hidden="true"></i>
          <span v-html="$t('team.create')"></span>
        </a>
      </div>
      <div class="col-md-12 framateam">
        <hr role="presentation" />
        <div class="row">
          <div class="col-md-4" id="tuto-faq">
            <h2 v-html="$t('team.presentation.h2_1')"></h2>
            <p class="text-center" role="presentation" aria-hidden="true">
              <i class="fa fa-question-circle"></i>
            </p>
            <p v-html="$t('team.presentation.serviceby')"></p>
            <ol>
              <li v-html="$t('team.presentation.createyours')"></li>
              <li v-html="$t('team.presentation.invite')"></li>
              <li v-html="$t('team.presentation.newchans')"></li>
            </ol>
            <p v-html="$t('team.presentation.learn')"></p>
            <p class="text-center">
              <a
                href="https://docs.framasoft.org/fr/mattermost/index.html"
                class="btn btn-primary"
                v-html="$t('team.presentation.aide')"
              ></a>
            </p>
            <p v-html="$t('team.presentation.trad')"></p>
          </div>
          <div class="col-md-4" id="le-logiciel">
            <h2 v-html="$t('team.presentation.h2_2')"></h2>
            <p class="text-center" role="presentation" aria-hidden="true">
              <i class="fa fa-cloud"></i>
            </p>
            <p v-html="$t('team.presentation.framaware')"></p>
            <p v-html="$t('team.presentation.license')"></p>
          </div>
          <div class="col-md-4" id="jardin">
            <h2 v-html="$t('team.presentation.h2_3')"></h2>
            <p class="text-center" role="presentation" aria-hidden="true">
              <i class="glyphicon glyphicon-tree-deciduous"></i>
            </p>
            <p v-html="$t('team.presentation.contrib_upstream')"></p>
            <br>
            <p v-html="$t('team.presentation.home_install')"></p>
            <p class="text-center">
              <a href="https://framacloud.org/fr/cultiver-son-jardin/gitlab.html" class="btn btn-success">
                <i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i> framacloud.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </portal>

    <portal target-el="#fteam_public">
      <div class="text-center framateam" id="Options">
        <p>
          <button id="ListBtn" class="btn btn-primary btn-block"
            @click="state.publicList ^= true">
            <i class="fa fa-fw fa-user-plus" aria-hidden="true"></i>
            <span v-html="$t('team.teams.join')"></span>
          </button>
        </p>
        <p>
          <a href="/create_team" class="btn btn-success btn-block">
            <i class="fa fa-fw fa-lg fa-group" aria-hidden="true"></i>
            <span v-html="$t('team.teams.create')"></span>
          </a>
        </p>
      </div>
    </portal>

    <modal v-model="!!state.publicList"
      :title="$t('team.teams.list')"
      id="modal-publicList"
      aria-labelledby="modal-publicListLabel">
      <div slot="header">
        <button type="button" class="close"
          @click="state.publicList ^= true">
          <span aria-hidden="true">×</span>
          <span class="sr-only" v-html="$t('txt.close')"></span>
        </button>
        <h1
          class="modal-title"
          id="modal-publicListLabel"
          v-html="$t('team.teams.list')"></h1>
      </div>

      <div class="clearfix"  id="ListImport"></div>

      <div slot="footer">
        <button class="btn"
          v-html="$t('txt.close')"
          @click="state.publicList ^= true"
        ></button>
      </div>
    </modal>
  </div>
</template>

<script>
import { Carousel, Slide, Modal } from 'uiv';

export default {
  components: {
    Carousel, Slide, Modal,
  },
  created() {
    const portals = ['header', 'screen', 'prez', 'public'];
    const fteam = {};

    portals.forEach((k) => {
      fteam[k] = document.createElement('div');
      Object.assign(fteam[k], {
        id: `fteam_${k}`,
      });
      document.getElementsByTagName('body')[0].appendChild(fteam[k]);
    });

    // Court-circuiter ReactJS sur l'accès aux teams
    document
      .querySelectorAll('a[href*="/channels"]')
      .forEach(a => a.onclick = (e) => { window.location.href = a.href; e.preventDefault(); });

    // Lien https://docs.framasoft.org/fr/mattermost/index.html
    setInterval(() => {
      document
        .querySelectorAll('a[href*="docs.mattermost.com/help"], a[href*="docs.mattermost.com/index"]')
        .forEach(a => Object.assign(a, {
          href: a.href.replace('docs.mattermost.com', 'docs.framasoft.org/fr/mattermost')
        }));
    }, 1000);
  },
  data() {
    return {
      interval: 5000,
      state: {
        publicList: false,
      },
    };
  },
  methods: {
    updateDisplay(currentId) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('inMM', 'outMM');
      if (/ct-(channels|admin-console|tutorial)/.test(currentId)) {
        body.classList.add('inMM');
      } else {
        body.classList.add('outMM');
      }
      switch (currentId) {
        case 'ct-tutorial':
          const title = document.querySelector('.tutorial__steps h1');
          if (title) { title.innerHTML = this.$root.color.team; }
          break;
        case 'ct-select_team':
          if (!document.getElementbyId('Options').length) {
            // /!\ Portal  jQuery('.signup-team__container .signup__content:first .signup-team-all:first').after(f$pteams);
            // jQuery('#ListImport').prepend(jQuery('.signup-team__container .signup__content:eq(0) .signup-team-all'));
          }
          break;
        case 'ct-signup_user_complete':
          document
            .querySelector('.signup-team__container .gitlab')
            .innerHTML = this.$i18n.t('team.create_framagit');
          // jQuery('.signup-team__container form').after(jQuery('.signup-team__container > div:first'));
          break;
        case 'ct-login':
          // /!\ Portal jQuery('.signup-team__container').after(f$3Cols);

          const stc = document.querySelector('.signup-team__container');
          if (stc && !stc.parent().classList.contains('col-md-6')) {
            wrap = document.createElement('div');
            wrap.classList.add('col-md-6');
            stc.parentNode.insertBefore(wrap, stc);
            wrap.appendChild(stc);
          }

          /* /!\ Portal
            if (jQuery('#carousel-team').length === 0) {
              jQuery('.signup-team__container').parent().before(f$screen);
            }
          */
          /* jQuery('.signup__content .form-group:has(button.btn-primary)')
            .before(jQuery('.form-group:has(a[href$="reset_password"])')); */
          document.getElementbyId('loginId').placeholder = this.$i18n.t('team.email');
          document.getElementbyId('loginPassword').placeholder = this.$i18n.t('team.password');

          document.querySelector('.signup__content .gitlab').innerHTML = this.$i18n.t('team.connect_framagit');
          break;

        default:
          // no default
          break;
      }

      if (!!document.querySelectorAll('.outMM').length
        && !document.querySelectorAll('header.clearfix').length) {
        /* /!\ Portal jQuery('.container-fluid').prepend(f$header); */
      }
    },
  }
};
</script>

<style>
.inMM .framateam {
  display: none;
}

.outMM .framateam {
  display: block;
}

#ct-select_team .margin--extra,
#ct-select_team .signup__content > h4 {
  display: none;
}

#ct-login .signup__content #login_forgot {
  float:right;
  margin-top: 7px;
}
</style>
