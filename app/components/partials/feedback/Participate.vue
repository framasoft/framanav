<template>
  <section id="f-fb-participate">
    <div
      v-if="$te(`txt.${$t('site')}`)"
      class="subtitle"
      v-html="`${$t('feedback.participate')} <b>${$t(`txt.${$t('site')}`)}</b>`"
    ></div>
    <v-text :section="`participate.git`" />
    <div class="row">
      <div
        v-if="$te(`src.${$t('site')}`)"
        class="col-6"
      >
        <a
          :href="$t(`src.${$t('site')}`)"
          class="btn btn-default btn-block"
        >
          <span
            class="fa-stack fa-2x"
            aria-hidden="true"
          >
            <i class="fa fa-circle fa-stack-2x bleu"></i>
            <i class="fa fa-stack-1x fa-code-fork fa-inverse"></i>
          </span>
          <br />
          <span v-html="$t(`soft.${$t('site')}`)"></span>
        </a>
      </div>
      <div
        v-if="$te(`git.${$t('site')}`)"
        class="col-6"
      >
        <a
          :href="$t(`git.${$t('site')}`)"
          class="btn btn-default btn-block"
        >
          <span
            class="fa-stack fa-2x"
            aria-hidden="true"
          >
            <i class="fa fa-circle fa-stack-2x bleu"></i>
            <i class="fa fa-stack-1x fa-git fa-inverse"></i>
          </span>
          <br />
          <span v-html="$t(`color.${$t('site')}`)"></span>
        </a>
      </div>
    </div>

    <v-text :section="`participate.other`" />
    <div class="row">
      <div class="col-12">
        <a
          :href="`${$t('link.contact')}/#participer`"
          class="btn btn-default btn-block"
          onclick="return false;"
          @click="showContact()"
        >
          <span
            class="fa-stack fa-2x"
            aria-hidden="true"
          >
            <i class="fa fa-circle fa-stack-2x orange"></i>
            <i class="fa fa-stack-1x fa-envelope fa-inverse"></i>
          </span>
          <span v-html="`${$t('feedback.contact')} ${$t('color.soft')}`"></span>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
import VText from '../V-Text.vue';

export default {
  components: {
    VText,
  },
  /* props: {
    open: {
      type: Boolean,
      required: true,
    }
  }, */
  data() {
    return {
      general: !(Object.keys(this.$t('txt')).indexOf(this.$t('site')) > -1),
      faq: [],
      state: {
        faq: false,
        toggle: 'all',
      },
    };
  },
  /* watch: {
    open: function (newValue) {
      if (newValue) {
        this.loadFaq();
      }
    }
  }, */
  methods: {
    showContact() {
      this.$parent.$parent.$parent.section = 'contact-participate';
      this.$parent.$parent.$parent.$refs['f-fb-top'].scrollIntoView();
    },
  },
};
</script>
