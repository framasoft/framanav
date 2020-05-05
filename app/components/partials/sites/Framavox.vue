<template>
  <portal
    target-el="#fp-vox"
    target-class="f-bs4"
  >
    <div
      v-if="home"
      id="f-vox"
      class="container ombre"
    >
      <header
        role="banner"
        style="margin: 0 15px;"
      >
        <span class="pull-right">
          <a
            class="btn btn-primary"
            href="/dashboard"
            @click.prevent="dashboard()"
          >
            <icon
              name="user"
              :label="$t('vox.header.sign')"
            />
          </a>
        </span>
        <h1 v-html="$t('html.vox')"></h1>
        <p
          class="lead"
          v-html="$t('vox.header.lead')"
        ></p>
        <hr
          class="trait"
          role="presentation"
        />
      </header>
      <main>
        <div class="row">
          <div class="col-12 carousel-container">
            <b-carousel
              id="f-vox-carousel"
              ref="f-vox-carousel"
              fade
              :interval="interval"
              indicators
              :controls="false"
            >
              <b-carousel-slide
                :caption="$t('vox.carousel[0]')"
                :img-src="`${$t('baseurl')}/img/vox/01-creer-groupe.png`"
              />
              <b-carousel-slide
                :caption="$t('vox.carousel[1]')"
                :img-src="`${$t('baseurl')}/img/vox/02-inviter.png`"
              />
              <b-carousel-slide
                :caption="$t('vox.carousel[2]')"
                :img-src="`${$t('baseurl')}/img/vox/03-discuter.png`"
              />
              <b-carousel-slide
                :caption="$t('vox.carousel[3]')"
                :img-src="`${$t('baseurl')}/img/vox/04-voter.png`"
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

          <div class="col-12 text-center">
            <a
              class="btn btn-primary btn-lg"
              href="/dashboard"
              @click.prevent="dashboard()"
            >
              <icon
                name="user"
                :label="$t('vox.header.sign')"
              />
            </a>
          </div>
        </div>

        <hr role="presentation" />

        <div class="row">
          <div class="col-md">
            <h2
              class="h2"
              v-html="$t('vox.help.title')"
            ></h2>
            <icon
              name="question-circle"
              size="3x d-block text-center mb-3"
            />

            <div v-html="$t('vox.help.md')"></div>
            <b-button
              href="https://framatube.org/videos/watch/c6705be9-5a6e-4615-9522-147445dca210"
              variant="outline-primary"
            >
              <icon
                name="film"
                :label="$t('vox.help.btn')"
              />
            </b-button>
          </div>

          <div class="col-md">
            <h2
              class="h2"
              v-html="$t('vox.software.title')"
            ></h2>
            <icon
              name="cloud"
              size="3x d-block text-center mb-3"
            />
            <div v-html="$t('vox.software.md')"></div>
          </div>
          <div class="col-md">
            <h2
              class="h2"
              v-html="$t('vox.garden.title')"
            ></h2>
            <icon
              name="leaf"
              size="3x d-block text-center mb-3"
            />
            <div v-html="$t('vox.garden.md')"></div>
            <b-button
              :href="`${$t('link.cloud')}/${$t('cloud.vox')}`"
              variant="outline-success"
            >
              <icon
                name="leaf"
                label="framacloud.org"
              />
            </b-button>
          </div>
        </div>
      </main>
    </div>
  </portal>
</template>

<script>
export default {
  data() {
    return {
      home: true,
      interval: 5000,
    };
  },
  created() {
    document.querySelector('body')
      .insertAdjacentHTML('beforeend', '<div id="fp-vox" style="display: none;"></div>');

    setInterval(() => {
      if (/vox.org\/dashboard$/.test(window.location.href)
        && !!document.querySelector('.v-app-bar .navbar__sign-in')) {
        document.body.classList.add('logged-out');
      } else {
        document.body.classList.remove('logged-out');
      }

      document
        .querySelectorAll('a[href*="help.loomio.org"]')
        .forEach(a => Object.assign(a, {
          href: `https://docs.framasoft.org/${/^fr/.test(this.$i18n.locale) ? 'fr' : 'en'}/loomio/`,
        }));
    }, 1000);
  },
  methods: {
    dashboard() {
      this.home = false;
      document.body.classList.add('home-hidden');
    },
  },
};
</script>
