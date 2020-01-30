<template>
  <section id="f-fb-participate">
    <div
      v-if="$te(`txt.${$t('site')}`)"
      class="subtitle"
      v-html="`${$t('feedback.participate')} <b>${$t(`txt.${$t('site')}`)}</b>`"
    ></div>

    <div v-html="$t('participate.git')"></div>

    <div class="row">
      <div
        v-if="$te(`src.${$t('site')}`)"
        class="col-6"
      >
        <a
          :href="$t(`src.${$t('site')}`)"
          class="btn btn-block"
        >
          <icon
            name="code-fork fa-inverse"
            name2="circle bleu"
            size="2x d-block mx-auto"
            :label="$t(`soft.${$t('site')}`)"
          />
        </a>
      </div>
      <div
        v-if="$te(`git.${$t('site')}`)"
        class="col-6"
      >
        <a
          :href="$t(`git.${$t('site')}`)"
          class="btn btn-block"
        >
          <icon
            name="git fa-inverse"
            name2="circle bleu"
            size="2x d-block mx-auto"
            :label="$t(`color.${$t('site')}`)"
          />
        </a>
      </div>
    </div>

    <div v-html="$t('participate.other')"></div>

    <div class="row">
      <div class="col-12">
        <a
          :href="`${$t('link.contact')}/#participer`"
          class="btn btn-default btn-block"
          onclick="return false;"
          @click="showContact()"
        >
          <icon
            name="envelope fa-inverse"
            name2="circle orange"
            size="2x"
            :label="`${$t('feedback.contact')} ${$t('color.soft')}`"
          />
        </a>
      </div>
    </div>
  </section>
</template>
<script>
export default {
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
