<template>
  <b-modal id="f-modal-docs"
    v-model="state.docs"
    size="lg"
    :static="true"
    :lazy="true"
    :title="$t('feedback.menu.docs')"
    :title-sr-only="true"
    :hide-header="true"
    :cancel-title-html="$t('txt.close')"
    cancel-variant="light"
    button-size="sm"
    @hidden="close()">

    <div class="clearfix">
      <div class="embed-responsive embed-responsive-1by1">
        <iframe
          v-if="state.docs === true"
          class="embed-responsive-item"
          :src="$te(`doc.${$t('site')}`) ? `${$t('link.docs')}/${$t(`doc.${$t('site')}[0]`)}/index.html` : $t('link.docs')">
        </iframe>
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      state: {
        docs: false,
      },
    }
  },
  watch: {
    open: function (newValue) {
      if (newValue) {
        this.state.docs = true;
      }
    }
  },
  methods: {
    close() {
      this.state.docs = false;
      this.$parent.modal.docs = false;
    }
  }
}
</script>
