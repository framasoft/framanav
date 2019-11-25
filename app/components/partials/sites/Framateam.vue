<template>
  <div>
    <div id="fp-team-header" style="display:none;" class="f-bs4">
      <header role="banner" class="clearfix f-team">
        <h1 v-html="$t('html.team')"></h1>
        <p class="lead" v-html="$t('team.header.lead')"></p>
        <hr class="trait" role="presentation" />
      </header>
    </div>

    <portal target-el="#fp-team-screen" target-class="f-bs4">
      <div class="row f-team">
        <div class="col-12 carousel-container">
          <b-carousel
            id="f-team-carousel"
            ref="f-team-carousel"
            fade
            :interval="interval"
            indicators
            :controls="false">
            <b-carousel-slide
              :caption="$t('team.carousel[0]')"
              :img-src="`${$t('baseurl')}/img/team/01-discuter.jpg`">
            </b-carousel-slide>
            <b-carousel-slide
              :caption="$t('team.carousel[1]')"
              :img-src="`${$t('baseurl')}/img/team/02-canaux.jpg`">
            </b-carousel-slide>
            <b-carousel-slide
              :caption="$t('team.carousel[2]')"
              :img-src="`${$t('baseurl')}/img/team/03-pimpez.jpg`">
            </b-carousel-slide>
            <b-carousel-slide
              :caption="$t('team.carousel[3]')"
              :img-src="`${$t('baseurl')}/img/team/04-rechercher.jpg`">
            </b-carousel-slide>
          </b-carousel>
          <p class="text-center play-pause" v-if="interval === 5000">
            <button class="carousel-control" :title="$t('carousel.pause')"
              @click="interval = 0">
              <i class="fa fa-fw fa-pause" aria-hidden="true"></i>
              <span class="sr-only" v-html="$t('carousel.pause')"></span>
            </button>
          </p>
          <p class="text-center play-pause" v-else>
            <button class="carousel-control" :title="$t('carousel.play')"
              @click="interval = 5000">
              <i class="fa fa-fw fa-play" aria-hidden="true"></i>
              <span class="sr-only" v-html="$t('carousel.play')"></span>
            </button>
          </p>
        </div>
      </div>
    </portal>

    <div id="fp-team-prez" style="display:none;" class="f-bs4">
      <div class="row">
        <div class="col-md-5 text-center h1 f-team">
          <a href="/signup_user_complete" class="btn btn-lg btn-success">
            <i class="fa fa-fw fa-lg fa-user" aria-hidden="true"></i>
            <span v-html="$t('team.create')"></span>
          </a>
        </div>
        <div class="row f-team">
          <hr role="presentation" />
          <div class="row">
            <div class="col-md" id="tuto-faq">
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
            <div class="col-md" id="le-logiciel">
              <h2 v-html="$t('team.presentation.h2_2')"></h2>
              <p class="text-center" role="presentation" aria-hidden="true">
                <i class="fa fa-cloud"></i>
              </p>
              <p v-html="$t('team.presentation.framaware')"></p>
              <p v-html="$t('team.presentation.license')"></p>
            </div>
            <div class="col-md" id="jardin">
              <h2 v-html="$t('team.presentation.h2_3')"></h2>
              <p class="text-center" role="presentation" aria-hidden="true">
                <i class="fa fa-leaf"></i>
              </p>
              <p v-html="$t('team.presentation.contrib_upstream')"></p>
              <br>
              <p v-html="$t('team.presentation.home_install')"></p>
              <p class="text-center">
                <a class="btn btn-success" :href="$t('cloud.team')">
                  <i class="fa fa-leaf" aria-hidden="true"></i> framacloud.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <portal target-el="#fp-team-public" target-class="f-bs4">
      <div class="text-center f-team" id="Options"
        :style="(!state.selectTeam) ? 'display: none;' : ''">
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
      <b-modal id="f-modal-publicList"
        v-model="state.publicList"
        :static="true"
        :lazy="true"
        :style="(!state.selectTeam) ? 'display: none;' : ''"
        :title="$t('team.teams.list')"
        :header-close-label="$t('txt.close')"
        :cancel-title-html="$t('txt.close')"
        cancel-variant="light"
        :ok-disabled="true">
        <div class="clearfix"  id="ListImport"></div>
      </b-modal>
    </portal>
  </div>
</template>

<script>

export default {
  created() {
    const portals = ['header', 'screen', 'prez', 'public'];

    portals.forEach((k) => {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', `<div id="fp-team-${k}"></div>`);
    });

    // Court-circuiter ReactJS sur l'accès aux teams
    document
      .querySelectorAll('a[href*="/channels"]')
      .forEach(a => a.onclick = (e) => { window.location.href = a.href; e.preventDefault(); });
  },
  data() {
    return {
      interval: 5000,
      state: {
        publicList: false,
        selectTeam: false,
      },
    };
  },
  mounted() {
    let ct = window.location.href.split('/');
    let bodyId = document.body.id || '';

    // Ajout d'un id pour savoir sur quelle page on est
    setInterval(() => {
      ct = window.location.href.split('/');
      bodyId = document.body.id || '';

      const debug = !/login/.test(ct[4]) ? 'login' : 'select_team';

      const ctId = (ct[4] === 'channels' || ct[4] === 'tutorial')
        ? `ct-${ct[4].split('?')[0]}`
        : `ct-${ct[3].split('?')[0]}`;

      if(ctId === 'ct-') {
        document.body.classList.add('outMM');
      }

      if (bodyId !== ctId.replace('test', debug)) {
        document.body.id = ctId.replace('test', debug);
      }

      if (bodyId !== ctId.replace('test', debug)
        || (document.querySelector('.outMM') && !document.querySelector('#root header.f-team'))
        || (document.querySelector('#ct-login.outMM') && !document.querySelector('#root #fpteam-screen') && !document.querySelector('#root #jardin'))
        || (document.querySelector('#ct-select_team.outMM') && !document.querySelector('#root #fp-team-public'))) {
        this.updateDisplay(ctId.replace('test', debug));
      }

      // Lien https://docs.framasoft.org/fr/mattermost/index.html
      document
        .querySelectorAll('a[href*="docs.mattermost.com/help"], a[href*="docs.mattermost.com/index"]')
        .forEach(a => Object.assign(a, {
          href: a.href.replace('docs.mattermost.com', 'docs.framasoft.org/fr/mattermost')
        }));
    }, 1000);
  },
  methods: {
    updateDisplay(currentId) {
      const body = document.getElementsByTagName('body')[0];
      if (/ct-(channels|admin-console|tutorial)/.test(currentId)) {
        body.classList.remove('inMM', 'outMM');
        body.classList.add('inMM');
      }
      if (/ct-(select_team|reset_password|create_team|signup_user_complete|signup_email|login)/.test(currentId)) {
        body.classList.remove('inMM', 'outMM');
        body.classList.add('outMM');
      }
      switch (currentId) {
        case 'ct-tutorial':
          const title = document.querySelector('.tutorial__steps h1');
          if (title) { title.innerHTML = this.$t('color.team'); }
          break;
        case 'ct-select_team':
          if (!document.querySelector('#root #fp-team-public')) {
            this.state.selectTeam = true;
            // ⚠️ vue-portal #fp-team-screen
            document.getElementById('site_description')
              .insertAdjacentElement('afterend', document.getElementById('fp-team-public'));

            document.getElementById('ListImport')
              .insertAdjacentElement('afterbegin',
                document.querySelectorAll('.signup-team__container .signup__content .signup-team-all')[0]);
          }
          break;
        case 'ct-signup_user_complete':
          document
            .querySelector('.signup-team__container .gitlab span span span')
            .innerHTML = this.$i18n.t('team.create_framagit');
          break;
        case 'ct-signup_email':
          const vname = document.getElementById('valid_name');
          if (vname) {
            vname.innerHTML = vname.innerHTML.replace('des symboles \'.\', \'-\' et \'_\'', 'symboles <kbd>.</kbd>, <kbd>-</kbd> ou <kbd>_</kbd>');
          }
          break;
        case 'ct-login': {
          const stc = document.querySelector('.signup-team__container');
          if (stc) {
            if (!stc.parentNode.classList.contains('col-md-6')) {
              const wrap = document.createElement('div');
              wrap.classList.add('col-md-6');
              stc.parentNode.insertBefore(wrap, stc);
              wrap.appendChild(stc);
            }
            // ⚠️ vue-portal #fp-team-screen
            if (!document.querySelector('#root #fp-team-screen')) {
              stc.parentNode
                .insertAdjacentElement('beforebegin', document.getElementById('fp-team-screen'));
            }

          }
          if (document.getElementById('login_section')) {
            // ⚠️ vue-portal #fp-team-prez
            if (!document.querySelector('#root #jardin')) {
              document.getElementById('login_section')
                .insertAdjacentHTML('afterend', document.getElementById('fp-team-prez').innerHTML);

              stc.parentNode.insertAdjacentElement('afterend',
                document.querySelector('#fp-team-prez .col-md-5'));
            }
            document.getElementById('loginId').placeholder = this.$i18n.t('team.email');
            document.getElementById('loginPassword').placeholder = this.$i18n.t('team.password');
            document.querySelector('.signup__content .gitlab span span span').innerHTML = this.$i18n.t('team.connect_framagit');

            document.querySelector('.signup__content .form-group:nth-of-type(3)')
              .insertAdjacentElement('beforebegin',
                document.getElementById('login_forgot'));
          }

          break;
        }
        default:
          // no default
          break;
      }

      // ⚠️ vue-portal #fp-team-header
      if (document.querySelector('.outMM')
        && !document.querySelector('#root header.f-team')) {
        document.getElementById('root').insertAdjacentHTML('afterbegin', document.getElementById('fp-team-header').innerHTML);
      }

      body.id = currentId;
    },
  }
};
</script>
