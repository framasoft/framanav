<template>
  <div>
    <!--
      => prepend #root (cloned)
      {} Mattermost’s Bootstrap 3
    -->
    <div
      id="fp-team-header"
      style="display:none;"
    >
      <header
        role="banner"
        class="clearfix f-team"
      >
        <h1 v-html="$t('html.team')"></h1>
        <p
          class="lead"
          v-html="$t('team.header.lead')"
        ></p>
        <hr
          class="trait"
          role="presentation"
        />
      </header>
    </div>

    <!--
      => prepend #login_section (vue-portal)
      {} Nav’s Bootstrap 4
    -->
    <portal
      target-el="#fp-team-screen"
      target-class="f-bs4"
    >
      <div class="row f-team">
        <div class="col-12 carousel-container">
          <b-carousel
            id="f-team-carousel"
            ref="f-team-carousel"
            fade
            :interval="interval"
            indicators
            :controls="false"
          >
            <b-carousel-slide
              :caption="$t('team.carousel[0]')"
              :img-src="`${$t('baseurl')}/img/team/01-discuter.jpg`"
            />
            <b-carousel-slide
              :caption="$t('team.carousel[1]')"
              :img-src="`${$t('baseurl')}/img/team/02-canaux.jpg`"
            />
            <b-carousel-slide
              :caption="$t('team.carousel[2]')"
              :img-src="`${$t('baseurl')}/img/team/03-pimpez.jpg`"
            />
            <b-carousel-slide
              :caption="$t('team.carousel[3]')"
              :img-src="`${$t('baseurl')}/img/team/04-rechercher.jpg`"
            />
          </b-carousel>
          <p
            v-if="interval === 5000"
            class="text-center play-pause"
          >
            <button
              class="carousel-control"
              @click="interval = 0"
            >
              <icon
                name="pause"
                size="fw"
                sr-only
                :label="$t('carousel.pause')"
              />
            </button>
          </p>
          <p
            v-else
            class="text-center play-pause"
          >
            <button
              class="carousel-control"
              :title="$t('carousel.play')"
              @click="interval = 5000"
            >
              <icon
                name="play"
                size="fw"
                sr-only
                :label="$t('carousel.play')"
              />
            </button>
          </p>
        </div>
      </div>
    </portal>

    <!--
      => after #login_section
      {} Mattermost’s Bootstrap 3
    -->
    <div
      id="fp-team-prez"
      style="display:none;"
    >
      <div class="clearfix">
        <div class="col-md-5 text-center h1 f-team">
          <a
            href="/signup_user_complete"
            class="btn btn-lg btn-success"
          >
            <icon
              name="user"
              size="lg fa-fw"
              :label="$t('team.create')"
            />
          </a>
        </div>
        <div class="col-md-12 f-team">
          <hr role="presentation" />
          <div class="row">
            <div
              id="tuto-faq"
              class="col-md-4"
            >
              <h2 v-html="$t('team.presentation.h2_1')"></h2>
              <p
                class="text-center"
                role="presentation"
                aria-hidden="true"
              >
                <icon 
                  name="question-circle"
                  size="5x"
                />
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
            <div
              id="le-logiciel"
              class="col-md-4"
            >
              <h2 v-html="$t('team.presentation.h2_2')"></h2>
              <p
                class="text-center"
                role="presentation"
                aria-hidden="true"
              >
                <icon 
                  name="cloud"
                  size="5x"
                />
              </p>
              <p v-html="$t('team.presentation.framaware')"></p>
              <p v-html="$t('team.presentation.license')"></p>
            </div>
            <div
              id="jardin"
              class="col-md-4"
            >
              <h2 v-html="$t('team.presentation.h2_3')"></h2>
              <p
                class="text-center"
                role="presentation"
                aria-hidden="true"
              >
                <icon 
                  name="leaf" 
                  size="5x"
                />
              </p>
              <p v-html="$t('team.presentation.contrib_upstream')"></p>
              <br />
              <p v-html="$t('team.presentation.home_install')"></p>
              <p class="text-center">
                <a
                  class="btn btn-success"
                  :href="`${$t('link.cloud')}/${$t('cloud.team')}`"
                >
                  <icon
                    name="leaf"
                    label="framacloud.org"
                  />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
      => after #site_description (vue-portal)
      {} Nav’s Bootstrap 4
    -->
    <portal
      target-el="#fp-team-public"
      target-class="f-bs4"
    >
      <div
        id="Options"
        class="text-center f-team"
        :style="!state.selectTeam ? 'display: none;' : ''"
      >
        <p>
          <button
            id="ListBtn"
            class="btn btn-primary btn-block"
            @click="state.publicList ^= true"
          >
            <icon
              name="user-plus"
              size="fw"
              :label="$t('team.teams.join')"
            />
          </button>
        </p>
        <p>
          <a
            href="/create_team"
            class="btn btn-success btn-block"
          >
            <icon
              name="group"
              size="fw"
              :label="$t('team.teams.create')"
            />
          </a>
        </p>
      </div>
      <b-modal
        id="f-modal-publicList"
        v-model="state.publicList"
        :static="true"
        :lazy="true"
        :style="!state.selectTeam ? 'display: none;' : ''"
        :title="$t('team.teams.list')"
        :header-close-label="$t('txt.close')"
        :cancel-title-html="$t('txt.close')"
        cancel-variant="light"
        :ok-disabled="true"
        @shown="copyList()"
      >
        <div
          id="ListImport"
          class="clearfix"
        ></div>
      </b-modal>
    </portal>
  </div>
</template>

<script>

export default {
  data() {
    return {
      interval: 5000,
      state: {
        publicList: false,
        selectTeam: false,
      },
    };
  },
  created() {
    const portals = ['header', 'screen', 'prez', 'public'];

    portals.forEach((k) => {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', `<div id="fp-team-${k}"></div>`);
    });

    // Court-circuiter ReactJS sur l'accès aux teams
    document
      .querySelectorAll('a[href*="/channels"]')
      .forEach((a) => {
        const link = a;
        link.onclick = (e) => {
          window.location.href = link.href;
          e.preventDefault();
        };
      });
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

      if (ctId === 'ct-') {
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
          href: a.href.replace('docs.mattermost.com', 'docs.framasoft.org/fr/mattermost'),
        }));
    }, 1000);
  },
  methods: {
    updateDisplay(currentId) {
      const body = document.getElementsByTagName('body')[0];
      const title = document.querySelector('.tutorial__steps h1');
      const vname = document.getElementById('valid_name');

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
          if (title) { title.innerHTML = this.$t('color.team'); }
          break;
        case 'ct-select_team':
          if (!document.querySelector('#root #fp-team-public')) {
            this.state.selectTeam = true;
            // ⚠️ vue-portal #fp-team-public
            document.getElementById('site_description')
              .insertAdjacentElement('afterend', document.getElementById('fp-team-public'));
          }
          break;
        case 'ct-signup_user_complete':
          document
            .querySelector('.signup-team__container .gitlab span span span')
            .innerHTML = this.$i18n.t('team.create_framagit');
          break;
        case 'ct-signup_email':
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
    copyList() {
      if (document.getElementById('ListImport').children.length === 0) {
        document.getElementById('ListImport')
          .insertAdjacentElement('afterbegin',
            document.getElementById('teamsYouCanJoinContent'));
      }
    },
  },
};
</script>
