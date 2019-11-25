<template>
  <portal target-el="#fp-vox" target-class="f-bs4">
    <div id="f-vox" class="container ombre"  v-if="home">
      <header role="banner" style="margin: 0 15px;">
        <span class="pull-right">
          <a class="btn btn-primary" href="/dashboard"
            @click.prevent="dashboard()">
            <i class="fa fa-user fa-lg" aria-hidden="true"></i>
            <span v-html="$t('vox.header.sign')"></span>
          </a>
        </span>
        <h1 v-html="$t('html.vox')"></h1>
        <p class="lead" v-html="$t('vox.header.lead')"></p>
        <hr class="trait" role="presentation">
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
              :controls="false">
              <b-carousel-slide
                :caption="$t('vox.carousel[0]')"
                :img-src="`${$t('baseurl')}/img/vox/01-creer-groupe.png`">
              </b-carousel-slide>
              <b-carousel-slide
                :caption="$t('vox.carousel[1]')"
                :img-src="`${$t('baseurl')}/img/vox/02-inviter.png`">
              </b-carousel-slide>
              <b-carousel-slide
                :caption="$t('vox.carousel[2]')"
                :img-src="`${$t('baseurl')}/img/vox/03-discuter.png`">
              </b-carousel-slide>
              <b-carousel-slide
                :caption="$t('vox.carousel[3]')"
                :img-src="`${$t('baseurl')}/img/vox/04-voter.png`">
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

          <div class="col-12 text-center">
            <a class="btn btn-primary btn-lg" href="/dashboard"
              @click.prevent="dashboard()">
              <i class="fa fa-user fa-lg" aria-hidden="true"></i>
            <span v-html="$t('vox.header.sign')"></span>
            </a>
          </div>

        </div>

        <hr role="presentation">
        <div class="row">
          <div class="col-md" id="tuto-faq">
            <h2 class="h2" v-html="$t('vox.presentation.h2_1')"></h2>
            <p class="text-center" role="presentation" aria-hidden="true">
              <i class="fa fa-question-circle"></i>
            </p>
            <p v-html="$t('vox.presentation.serviceby')"></p>
            <ol>
              <li
                v-for="(text, i) in $t('vox.carousel')"
                :key="i"
                v-html="$t(`vox.carousel[${i}]`)">
              </li>
            </ol>
            <p  v-html="$t('vox.presentation.docs')"></p>
            <p v-html="$t('vox.presentation.video')"></p>
            <p class="text-center">
              <a
                class="btn btn-primary"
                href="https://framatube.org/videos/watch/c6705be9-5a6e-4615-9522-147445dca210">
                <i class="fa fa-film" aria-hidden="true"></i>
                <span v-html="$t('vox.presentation.play_video')"></span>
              </a>
            </p>
          </div>
          <div class="col-md" id="le-logiciel">
            <h2 class="h2" v-html="$t('vox.presentation.h2_2')"></h2>
            <p class="text-center" role="presentation" aria-hidden="true">
              <i class="fa fa-cloud"></i>
            </p>
            <p v-html="$t('vox.presentation.framaware')"></p>
            <p v-html="$t('vox.presentation.instance')"></p>
            <p v-html="$t('vox.presentation.license')"></p>
          </div>
          <div class="col-md" id="jardin">
            <h2 class="h2" v-html="$t('vox.presentation.h2_3')"></h2>
            <p class="text-center" role="presentation" aria-hidden="true">
              <i class="fa fa-leaf"></i>
            </p>
            <p v-html="$t('vox.presentation.contrib_upstream')"></p>
            <p v-html="$t('vox.presentation.home_install')"></p>
            <p class="text-center">
              <a class="btn btn-success" :href="$t('cloud.vox')">
                <i class="fa fa-leaf"></i> framacloud.org
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  </portal>
</template>

<script>
export default {
  created() {
    document.querySelector('body')
      .insertAdjacentHTML('beforeend', '<div id="fp-vox" style="display: none;"></div>');

    setInterval(() => {
      if (/vox.org\/dashboard$/.test(window.location.href)
        && !!document.querySelector('.lmo-navbar .navbar__sign-in')) {
        document.body.classList.add('logged-out');
      } else {
        document.body.classList.remove('logged-out');
      }

      document
        .querySelectorAll('a[href*="help.loomio.org"]')
        .forEach(a => Object.assign(a, {
          href: `https://docs.framasoft.org/${/^fr/.test(this.$i18n.locale) ? 'fr' : 'en'}/loomio/`
        }));
    }, 1000);
  },
  data() {
    return {
      home: true,
      interval: 5000,
    };
  },
  methods: {
    dashboard() {
      this.home = false;
      document.body.classList.add('home-hidden');
    }
  },
};
</script>
