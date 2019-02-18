<template>
  <portal target-el="#fvox">
    <div id="framavox_container" class="container ombre" v-if="home">
      <header role="banner" style="margin: 0 15px;">
        <span class="pull-right">
          <a class="btn btn-primary" href="/dashboard"
            @click.prevent="dashboard()">
            <i class="fa fa-user fa-lg" aria-hidden="true"></i>
            <span v-html="$t('vox.header.sign')"></span>
          </a>
        </span>
        <h1 class="h1" v-html="$root.html.vox"></h1>
        <p class="lead" v-html="$t('vox.header.lead')"></p>
        <hr class="trait" role="presentation">
      </header>
      <main>
        <div class="col-md-12 text-center">

          <div class="carousel-container">
            <carousel :indicators="false" :controls="true" :interval="interval" ref="carousel">
              <slide>
                <img src="https://framasoft.org/nav/ext/vox-01-creer-groupe.png" alt="" />
                <div class="carousel-caption">
                  <p class="h3" v-html="$t('vox.carousel[0]')"></p>
                </div>
              </slide>
              <slide>
                <img src="https://framasoft.org/nav/ext/vox-02-inviter.png" alt=""/>
                <div class="carousel-caption">
                  <p class="h3" v-html="$t('vox.carousel[1]')"></p>
                </div>
              </slide>
              <slide>
                <img src="https://framasoft.org/nav/ext/vox-03-discuter.png" alt="" />
                <div class="carousel-caption">
                  <p class="h3" v-html="$t('vox.carousel[2]')"></p>
                </div>
              </slide>
              <slide>
                <img src="https://framasoft.org/nav/ext/vox-04-voter.png" alt="" />
                <div class="carousel-caption">
                  <p class="h3" v-html="$t('vox.carousel[3]')"></p>
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

          <div class="col-md-12 text-center">
            <a class="btn btn-primary btn-lg" href="/dashboard"
              @click.prevent="dashboard()">
              <i class="fa fa-user fa-lg" aria-hidden="true"></i>
            <span v-html="$t('vox.header.sign')"></span>
            </a>
          </div>

        </div>

        <hr role="presentation">

        <div class="col-md-4" id="tuto-faq">
          <h2 class="h2" v-html="$t('vox.presentation.h2_1')"></h2>
          <p class="text-center" role="presentation">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
          </p>
          <p v-html="$t('vox.presentation.serviceby')"></p>
          <ol>
            <li
              v-for="(text, i) in $t('vox.carousel')"
              v-html="$t(`vox.carousel[${i}]`)"
            ></li>
          </ol>
          <p  v-html="$t('vox.presentation.docs')"></p>
          <p v-html="$t('vox.presentation.video')"></p>
          <p class="text-center">
            <a
              class="btn btn-primary"
              href="https://framatube.org/videos/watch/c6705be9-5a6e-4615-9522-147445dca210">
              <i class="glyphicon glyphicon-film" aria-hidden="true"></i>
              <span v-html="$t('vox.presentation.play_video')"></span>
            </a>
          </p>
        </div>
        <div class="col-md-4" id="le-logiciel">
          <h2 class="h2" v-html="$t('vox.presentation.h2_2')"></h2>
          <p class="text-center" role="presentation">
            <i class="fa fa-cloud" aria-hidden="true"></i>
          </p>
          <p v-html="$t('vox.presentation.framaware')"></p>
          <p v-html="$t('vox.presentation.instance')"></p>
          <p v-html="$t('vox.presentation.license')"></p>
        </div>
        <div class="col-md-4" id="jardin">
          <h2 class="h2" v-html="$t('vox.presentation.h2_3')"></h2>
          <p class="text-center" role="presentation">
            <i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i>
          </p>
          <p v-html="$t('vox.presentation.contrib_upstream')"></p>
          <p v-html="$t('vox.presentation.home_install')"></p>
          <p class="text-center">
            <a class="btn btn-success" href="http://framacloud.org/cultiver-son-jardin/installation-de-loomio/">
              <i class="glyphicon glyphicon-tree-deciduous"></i> framacloud.org
            </a>
          </p>
        </div>

      </main>
    </div>
  </portal>
</template>

<script>
import { Carousel, Slide } from 'uiv';

export default {
  components: {
    Carousel, Slide,
  },
  created() {
    const fvox = document.createElement('div');
    Object.assign(fvox, {
      id: 'fvox',
    });
    document.getElementsByTagName('body')[0].appendChild(fvox);

    const hidden = document.querySelectorAll('.md-dialog-container, .md-scroll-mask, .md-dialog-backdrop, .lmo-navbar');
    hidden.forEach((el) => { el.style = "display: none"; });
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
      const hidden = document.querySelectorAll('.md-dialog-container, .md-scroll-mask, .md-dialog-backdrop, .lmo-navbar');
      hidden.forEach((el) => { el.style = "display: block"; });
    }
  },
};
</script>

<style>
  html { background: #eee; }
</style>
