<template>
  <div id="f-feedback">
    <Moveable
      ref="f-fb-drag"
      :class="`moveable f-fb-toggle ${menu.visited === 1 ? 'visited' : ''} ${show ? 'active' : ''}`"
      :style="menu.position"
      v-bind="moveable"
      @dragStart="menu.start = menu.position"
      @drag="handleDrag"
      @dragEnd="dragEnd()"
    >
      <b-button>
        <i
          class="fa fa-fw fa-lg fa-inverse fa-map-signs"
          aria-hidden="true"
        ></i>
        <i
          class="fa fa-fw fa-lg fa-inverse fa-arrows"
          aria-hidden="true"
        ></i>
        <span
          class="d-none"
          v-text="$t('fnav.sites.aide.name')"
        ></span>
        <span
          class="sr-only"
          v-text="$t('fnav.sites.aide.name')"
        ></span>
        <i
          class="fa fa-lg fa-arrows"
          aria-hidden="true"
        ></i>
      </b-button>
    </Moveable>

    <portal
      target-el="#fp-feedback"
      target-class="f-bs4"
    >
      <b-modal
        id="f-fb-menu"
        v-model="show"
        size="md"
        :static="true"
        :lazy="true"
        :cancel-title-html="$t('txt.close')"
        :style="`position: fixed; ${menu.position}`"
        hide-backdrop
        @shown="shown()"
      >
        <template v-slot:modal-header>
          <!-- Header -->
          <div class="col-2 h5 pl-0">
            <b-button
              v-show="section !== 'main'"
              variant="link"
              @click="section = 'main'"
            >
              <icon
                name="chevron-left fa-inverse"
                :label="$t('txt.back')"
                sr-only
              />
            </b-button>
          </div>
          <div class="col-8 h5 text-center px-0">
            <b v-html="$t('fnav.sites.aide.name')"></b>
          </div>
          <div class="col-2 h5 text-right pr-0">
            <b-button
              variant="link"
              @click="close()"
            >
              <icon
                name="close fa-inverse"
                :label="$t('txt.close')"
                sr-only
              />
            </b-button>
          </div>
        </template>

        <!-- Body -->
        <template v-slot:default>
          <a
            id="f-fb-top"
            ref="f-fb-top"
          ></a>
          <section
            v-show="section === 'main'"
            id="f-fb-main-menu"
          >
            <!-- Service documentation opened in a modal -->
            <a
              :href="$t('link.docs') + (doc ? `/${$t(`doc.${$t('site')}[0]`)}/index.html` : '')"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="modal.docs = true;"
            >
              <icon
                name="graduation-cap fa-inverse"
                name2="circle fc_j6"
                size="2x"
                :label="$t('feedback.menu.docs')"
              />
            </a>
            <!-- Faq of the service, then contact form -->
            <a
              :href="`${$t('link.contact')}/faq/#${$t('lname')}`"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="section = 'faq'"
            >
              <status />
              <icon
                name="question fa-inverse"
                name2="circle fc_v5"
                size="2x"
                :label="$t('feedback.menu.faq')"
              />
            </a>
            <!-- Git of the service, then contact (rt+participer) form -->
            <a
              href="#feedback"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="section = 'feedback'"
            >
              <icon
                name="paw fa-inverse"
                name2="circle fc_b9"
                size="2x"
                :label="$t('feedback.menu.participate')"
              />
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

          <FAQ
            v-show="section === 'faq'"
            :open="section === 'faq'"
            :search="search"
            :status="status"
          />

          <Participate v-show="section === 'feedback'" />

          <ContactForm
            v-show="/^contact\-/.test(section)"
            :section="section"
          />
        </template>

        <template v-slot:modal-footer>
          <!-- Search -->
          <div
            v-show="section === 'faq'"
            class="search-form"
          >
            <b-input-group size="lg">
              <b-form-input
                v-model="search"
                :aria-label="$t('txt.search')"
                :placeholder="$t('txt.search')"
                type="text"
                size="40"
              />
              <b-input-group-append>
                <b-button
                  variant="light text-muted"
                  @click="search = ''"
                >
                  <icon :name="search === '' ? 'search': 'times'" />
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
    Status,
    FAQ,
    ModalDocs,
    Participate,
    ContactForm,
  },
  data() {
    const menu = {
      position: 'inset: auto 100px 100px auto',
      start: '',
      visited: 0,
    };

    if (this.cookie('r', 'f-fb-drag')) {
      Object.assign(menu, JSON.parse(this.cookie('r', 'f-fb-drag')));
    }

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
      },
    };
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', '<div id="fp-feedback"></div>');
    }
  },
  mounted() {
  },
  methods: {
    close() {
      this.show = false;
      this.section = 'main';
    },
    handleDrag({
      target, top, right, bottom, left,
    }) {
      const display = {
        target,
        top: 'auto',
        right: 'auto',
        bottom: 'auto',
        left: 'auto',
      };

      if (left < window.innerWidth / 2) {
        display.left = `${left > 0 ? left : 0}px`;
      } else {
        display.right = `${right > 0 ? right : 0}px`;
      }

      if (top < window.innerHeight / 2) {
        display.top = `${top > 0 ? top : 0}px`;
      } else {
        display.bottom = `${bottom > 0 ? bottom : 0}px`;
      }

      this.menu.position = `inset: ${display.top} ${display.right} ${display.bottom} ${display.left}`;
    },
    dragEnd() {
      this.cookie('w', 'f-fb-drag', JSON.stringify(this.menu));
      /* It looks like a @drag, but it’s just a @click */
      if (this.menu.start === this.menu.position && !this.show) {
        this.show = true;
      }
    },
    shown() {
      this.menu.visited = 1;
      document.body.classList.remove('modal-open');
    },
  },
};
</script>
