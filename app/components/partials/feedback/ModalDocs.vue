<template>
  <modal id="modal-fsDocs"
    v-model="state.docs"
    size="lg">
    <div slot="header"></div>

    <div class="clearfix" id="modal-fsDocsBody">
      <div class="embed-responsive embed-responsive-4by3">
        <iframe
          v-if="state.docs === true"
          class="embed-responsive-item"
          :src="$root.link.docs + ($root.doc[$root.site] !== undefined ? `/${$root.doc[$root.site][0]}/index.html` : '')">
        </iframe>
      </div>
    </div>

    <div slot="footer" class="text-center">
      <button
        v-html="$t('txt.close')"
        class="btn btn-default"
        @click="close()"
      ></button>
    </div>
  </modal>
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
