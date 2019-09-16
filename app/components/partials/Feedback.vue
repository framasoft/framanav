<template>
  <div id="ffeedback">
    <Moveable
      ref="ffb-drag"
      :class="`moveable drop${menu.y} ${show ? 'open' : ''}`"
      :style="menu.position"
      v-bind="moveable"
      @drag="handleDrag"
      @dragEnd="cookie('w', 'ffb-drag', JSON.stringify(menu));"
    >
      <a class="dropdown-toggle" @click="show = !drag ? !show : show; drag = false; section = 'main'" role="button">
        <i :class="`fa fa-fw fa-lg fa-inverse ${!show ? $root.icon.aide : 'fa-close'}`" aria-hidden="true"></i>

        <span v-if="!show" v-text="$t('fnav.sites.aide.name')"></span>
        <span v-else class="sr-only" v-text="$t('txt.close')"></span>

        <i v-if="!show" class="fa fa-lg fa-drag-handle" aria-hidden="true"></i>
      </a>
      <div :class="`dropdown-menu dropdown-menu-${menu.x}`">
        <div class="dropdown-header text-center clearfix">
          <div class="col-xs-1 h4">
            <button v-show="section !== 'main'"
              class="btn-link"
              @click="section = 'main'">
              <i class="fa fa-lg fa-chevron-left fa-inverse" aria-hidden="true"></i>
              <span v-text="$t('txt.back')" class="sr-only"></span>
            </button>
          </div>
          <div class="col-xs-10 h4 text-center">
            <b v-html="$t('fnav.sites.aide.name')"></b>
          </div>
          <div class="col-xs-1 h4">
            <i class="fa fa-lg fa-drag-handle" aria-hidden="true"></i>
            <button
              v-text="$t('txt.close')"
              class="sr-only"
              @click="close()">
            </button>
          </div>
        </div>

        <div class="dropdown-body">
          <a id="ffb-top" ref="ffb-top"></a>
          <section v-show="section === 'main'" id="ffb-main-menu">
            <!-- Service documentation opened in a modal -->
            <a :href="$root.link.docs + (doc ? `/${$root.doc[$root.site][0]}/index.html` : '')"
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
            <a :href="`${$root.link.contact}/faq/#${$root.lname}`"
              class="btn btn-default btn-block"
              onclick="return false;"
              @click="section = 'faq'">
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

          <FAQ v-show="section === 'faq'" :open="section === 'faq'" :search="search" />

          <Participate  v-show="section === 'feedback'" />

          <ContactForm v-show="/^contact\-/.test(section)" :section="section" />
        </div>

        <div class="dropdown-footer">
          <!-- Search -->
          <div v-show="section === 'faq'" class="search-form">
            <div class="input-group input-group-lg">
              <label for="search"
                class="sr-only"
                v-html="$t('txt.search')">
              </label>
              <input id="search"
                v-model="search"
                :placeholder="$t('txt.search')"
                type="text" size="40"
                class="form-control"
              >
              <span class="input-group-addon" aria-hidden="true">
                <i v-if="search === ''" class="fa fa-search text-muted"></i>
                <i v-else class="fa fa-times text-muted" @click="search = ''"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <ModalDocs :open="modal.docs" />
    </Moveable>
  </div>
</template>

<script>
import Moveable from 'vue-moveable';
import FAQ from './feedback/FAQ.vue';
import ModalDocs from './feedback/ModalDocs.vue';
import Participate from './feedback/Participate.vue';
import ContactForm from './feedback/ContactForm.vue';

export default {
  components: {
    Moveable,
    FAQ, ModalDocs, Participate, ContactForm,
  },
  data() {
    let menu = {
      x: 'right',
      y: 'up',
      position: '',
    };

    if (this.cookie('r', 'ffb-drag')) {
      Object.assign(menu, JSON.parse(this.cookie('r', 'ffb-drag')));
    };

    return {
      show: false,
      section: 'main',
      doc: this.$root.doc[this.$root.site] !== undefined,
      modal: {
        docs: false,
        about: false,
      },
      search: '',
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

      if (left < window.innerWidth / 2) {
        target.style.right = 'auto';
        target.style.left = `${left > 0 ? left: 0}px`;
        this.menu.x = 'left';
      } else {
        target.style.left = 'auto';
        target.style.right = `${right > 0 ? right: 0}px`;
        this.menu.x = 'right';
      }

      if (top < window.innerHeight / 2) {
        target.style.bottom = 'auto';
        target.style.top = `${top > 0 ? top: 0}px`;
        this.menu.y = 'down';
      } else {
        target.style.top = 'auto';
        target.style.bottom = `${bottom > 0 ? bottom : 0}px`;
        this.menu.y = 'up';
      }

      this.menu.position = `inset: ${target.style.top} ${target.style.right} ${target.style.bottom} ${target.style.left}`;
    },
  }
}
</script>