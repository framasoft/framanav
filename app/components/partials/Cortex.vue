<template>
  <iframe
    id="framanav_cortex" ref="framanav_cortex"
    v-if="!/cortex(.html)?$/.test(this.$root.url)"
    :src="src"
    aria-hidden="true"
    style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
  ></iframe>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    init: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.globalStorage.init(this.init);
    this.storageReady(() => { this.$parent.cortex.ready = true; });
  },
  methods: {
    storageReady(callback) {
      if (this.$refs.framanav_cortex) {
        if (Object.keys(this.$parent.storage).length > 0) {
          callback();
        } else {
          this.$parent.storage = JSON.parse(this.globalStorage.cortex('o'));
          callback();
        }
      }
    },
  }
}
</script>
