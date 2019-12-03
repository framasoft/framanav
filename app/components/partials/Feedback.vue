<template>
  <div id="f-feedback">
    <Moveable
      ref="f-fb-drag"
      :class="`moveable f-fb-toggle ${menu.visited === 1 ? 'visited' : ''} ${show ? 'active' : ''}`"
      :style="menu.position"
      v-bind="moveable"
      @drag="handleDrag"
      @dragEnd="cookie('w', 'f-fb-drag', JSON.stringify(menu));">
      <b-button @click="show = !drag ? true : show; drag = false;">
        <i class="fa fa-fw fa-lg fa-inverse fa-map-signs" aria-hidden="true"
          @click="show = !drag ? true : show; drag = false;"
        ></i>
        <i class="fa fa-fw fa-lg fa-inverse fa-arrows" aria-hidden="true"></i>
        <span class="d-none" v-text="$t('fnav.sites.aide.name')"
          @click="show = !drag ? true : show; drag = false;"></span>
        <span class="sr-only" v-text="$t('fnav.sites.aide.name')"></span>
        <i class="fa fa-lg fa-arrows" aria-hidden="true"></i>
      </b-button>
    </Moveable>

    <portal target-el="#fp-feedback" target-class="f-bs4">
      <b-modal id="f-fb-menu"
        v-model="show"
        size="md"
        :static="true"
        :lazy="true"
        :cancel-title-html="$t('txt.close')"
        :style="`position: fixed; ${menu.position}`"
        @shown="menu.visited = 1"
        hide-backdrop>
        <template v-slot:modal-header>
          <!-- Header -->
          <div class="col-2 h5 pl-0">
            <button v-show="section !== 'main'"
              class="btn-link"
              @click="section = 'main'">
              <i class="fa fa-chevron-left fa-inverse" aria-hidden="true"></i>
              <span v-text="$t('txt.back')" class="sr-only"></span>
            </button>
          </div>
          <div class="col-8 h5 text-center px-0">
            <b v-html="$t('fnav.sites.aide.name')"></b>
          </div>
          <div class="col-2 h5 text-right pr-0">
            <button class="btn-link" @click="close()">
              <i class="fa fa-close fa-inverse" aria-hidden="true"></i>
              <span v-text="$t('txt.close')" class="sr-only"></span>
            </button>
          </div>
        </template>

        <!-- Body -->
        <template v-slot:default>
          <a id="f-fb-top" ref="f-fb-top"></a>
          <section v-show="section === 'main'" id="f-fb-main-menu">
            <!-- Service documentation opened in a modal -->
            <a :href="$t('link.docs') + (doc ? `/${$t(`doc.${$t('site')}[0]}`)}/index.html` : '')"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="modal.docs = true;">
              <span class="fa-stack fa-2x">
                <i class="fa fa-circle fa-stack-2x fc_j6"></i>
                <i class="fa fa-stack-1x fa-graduation-cap fa-inverse"></i>
              </span>
              <span v-html="$t('feedback.menu.docs')"></span>
            </a>
            <!-- Faq of the service, then contact form -->
            <a :href="`${$t('link.contact')}/faq/#${$t('lname')}`"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="section = 'faq'">
              <status />
              <span class="fa-stack fa-2x">
                <i class="fa fa-circle fa-stack-2x fc_v5"></i>
                <i class="fa fa-stack-1x fa-question fa-inverse"></i>
              </span>
              <span v-html="$t('feedback.menu.faq')"></span>
            </a>
            <!-- Git of the service, then contact (rt+participer) form -->
            <a href="#feedback"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="section = 'feedback'">
              <span class="fa-stack fa-2x">
                <i class="fa fa-circle fa-stack-2x fc_b9"></i>
                <i class="fa fa-stack-1x fa-paw fa-inverse"></i>
              </span>
              <span v-html="$t('feedback.menu.participate')"></span>
            </a>
            <!-- About page of the service opened in a modal
            <a href="#about"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="modal.about = true">
              <span class="fa-stack fa-2x">
                <i class="fa fa-circle fa-stack-2x fc_o5"></i>
                <i class="fa fa-stack-1x fa-info fa-inverse"></i>
              </span>
              <span v-html="$t('feedback.menu.about')"></span>
            </a> -->
          </section>

          <FAQ v-show="section === 'faq'"
            :open="section === 'faq'"
            :search="search"
            :status="status"
          />

          <Participate  v-show="section === 'feedback'" />

          <ContactForm v-show="/^contact\-/.test(section)" :section="section" />
        </template>

        <template v-slot:modal-footer>
          <!-- Search -->
          <div v-show="section === 'faq'" class="search-form">
            <b-input-group size="lg">
              <b-form-input v-model="search"
                :aria-label="$t('txt.search')"
                :placeholder="$t('txt.search')"
                type="text" size="40">
              </b-form-input>
              <b-input-group-append>
                <b-button variant="light text-muted" @click="search = ''">
                  <i :class="`fa fa-${search === '' ? 'search': 'times'}`"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </template>
      </b-modal>

      <ModalDocs :open="modal.docs" />
    </portal>
  </div>
</template>

<script>
import Moveable from 'vue-moveable';

import Status from './feedback/Status.vue';
import FAQ from './feedback/FAQ.vue';
import ModalDocs from './feedback/ModalDocs.vue';
import Participate from './feedback/Participate.vue';
import ContactForm from './feedback/ContactForm.vue';

export default {
  components: {
    Moveable,
    Status, FAQ, ModalDocs, Participate, ContactForm,
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', '<div id="fp-feedback"></div>');
    }
  },
  data() {
    let menu = {
      x: 'right',
      y: 'up',
      position: '',
      visited: 0,
    };

    if (this.cookie('r', 'f-fb-drag')) {
      Object.assign(menu, JSON.parse(this.cookie('r', 'f-fb-drag')));
    };

    return {
      show: false,
      section: 'main',
      doc: this.$te(`doc.${this.$t('site')}`),
      modal: {
        docs: false,
        about: false,
      },
      search: '',
      status: [],
      drag: false,
      menu,
      moveable: {
        draggable: true,
        throttleDrag: 0,
        resizable: false,
        throttleResize: 0,
        keepRatio: true,
        scalable: false,
        throttleScale: 0,
        rotatable: false,
        throttleRotate: 0,
        pinchable: false,
      }
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.show = false;
      this.section = 'main';
    },
    handleDrag({ target, top, right, bottom, left}) {
      this.drag = true;

      const display = {
        x: '',
        y: '',
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
      }
      if (left < window.innerWidth / 2) {
        display.left = `${left > 0 ? left: 0}px`;
        display.x = 'left';
      } else {
        display.right = `${right > 0 ? right: 0}px`;
        display.x = 'right';
      }

      if (top < window.innerHeight / 2) {
        display.top = `${top > 0 ? top: 0}px`;
        display.y = 'down';
      } else {
        display.bottom = `${bottom > 0 ? bottom : 0}px`;
        display.y = 'up';
      }

      this.menu.x = display.x;
      this.menu.y = display.y;
      this.menu.position = `inset: ${display.top} ${display.right} ${display.bottom} ${display.left}`;
    },
  }
}
</script>