<template>
  <section id="ffb-participate">
    <div
      v-if="$root.txt[$root.site] !== undefined"
      v-html="`${$t('feedback.participate')} <b>${$root.txt[$root.site]}</b>`"
      class="subtitle">
    </div>
    <v-text :section="`participate.git`" />
    <div class="row">
      <div v-if="$root.src[$root.site]" class="col-xs-6">
        <a :href="$root.src[$root.site]"
          class="btn btn-default btn-block">
          <span class="fa-stack fa-2x" aria-hidden="true">
            <i class="fa fa-circle fa-stack-2x fc_b9"></i>
            <i class="fa fa-stack-1x fa-code-fork fa-inverse"></i>
          </span>
          <br>
          <span v-html="$root.soft[$root.site]"></span>
        </a>
      </div>
      <div v-if="$root.git[$root.site]" class="col-xs-6">
        <a :href="$root.git[$root.site]"
          class="btn btn-default btn-block">
          <span class="fa-stack fa-2x" aria-hidden="true">
            <i class="fa fa-circle fa-stack-2x fc_b9"></i>
            <i class="fa fa-stack-1x fa-git fa-inverse"></i>
          </span>
          <br>
          <span v-html="$root.color[$root.site]"></span>
        </a>
      </div>
    </div>

    <v-text :section="`participate.other`" />
    <div class="row">
      <div class="col-xs-12">
        <a :href="`${$root.link.contact}/#participer`"
          class="btn btn-default btn-block"
          onclick="return false;"
          @click="showContact()">
          <span class="fa-stack fa-2x" aria-hidden="true">
            <i class="fa fa-circle fa-stack-2x fc_o5"></i>
            <i class="fa fa-stack-1x fa-envelope fa-inverse"></i>
          </span>
          <span v-html="`${$t('feedback.contact')} ${$root.color.soft}`"></span>
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
  },*/
  data() {
    return {
      general: !(Object.keys(this.$root.txt).indexOf(this.$root.site) > -1),
      faq: [],
      state: {
        faq: false,
        toggle: 'all',
      },
    }
  },
  /* watch: {
    open: function (newValue) {
      if (newValue) {
        this.loadFaq();
      }
    }
  },*/
  methods: {
    showContact() {
      this.$parent.section = 'contact-participate';
      this.$parent.$refs['ffb-top'].scrollIntoView();
    },
  }
}
</script>