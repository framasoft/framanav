<template>
  <div id="ffeedback" :class="`dropup ${show ? 'open' : ''}`">
    <a class="dropdown-toggle" @click="show = !show; section = 'main'" role="button">
      <i :class="`fa fa-fw fa-lg fa-${!show ? 'life-ring' : 'close'}`" aria-hidden="true"></i>
      <span v-if="!show" v-text="$t('fnav.sites.aide.name')"></span>
      <span v-else class="sr-only" v-text="$t('txt.close')"></span>
    </a>
    <div class="dropdown-menu dropdown-menu-right">
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
          <b v-html="$t('feedback.title')"></b>
        </div>
        <div class="col-xs-1">
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
  </div>
</template>

<script>
import FAQ from './feedback/FAQ.vue';
import ModalDocs from './feedback/ModalDocs.vue';
import Participate from './feedback/Participate.vue';
import ContactForm from './feedback/ContactForm.vue';

export default {
  components: {
    FAQ, ModalDocs, Participate, ContactForm,
  },
  data() {
    return {
      show: false,
      section: 'main',
      doc: this.$root.doc[this.$root.site] !== undefined,
      modal: {
        docs: false,
        about: false,
      },
      search: '',
    }
  },
  methods: {
    close() {
      this.show = false;
      this.section = 'main';
    },
  }
}
</script>