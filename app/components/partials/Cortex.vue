<template>
  <iframe v-if="!/cortex(.html)?$/.test(this.$t('url'))"
    id="f-cortex" ref="f-cortex"
    src="https://framasoft.org/nav/lib/cortex.html"
    aria-hidden="true"
    style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"    >
  </iframe>
</template>

<script>
export default {
  data() {
    return {
      storage: {},
    }
  },
  mounted() {
    this.globalStorage.minus('o', this.storage);

    const eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
    const eventer = window[eventMethod];
    const messageEvent = (eventMethod === 'attachEvent') ? 'onmessage' : 'message';
    eventer(messageEvent, e => { this.storage = this.globalStorage.minus('i', e.data) }, false);

    this.storageReady(() => {
      // state sent to $parent to delay the rendering of the component
      this.$parent.cortexReady = true;
      // Global cookie send locally
      if (this.storage.modal.don[0]) {
        this.cookie('w', this.$t('cookie.don'), true, this.storage.modal.don[1]);
      }
      if (this.storage.optin[0]) {
        this.cookie('w', this.$t('cookie.optin'), true, this.storage.optin[1]);
      }
    });
  },
  methods: {
    storageReady(callback) {
      if (document.getElementById('f-cortex')) {
        if (Object.keys(this.storage).length > 0) {
          callback();
        } else {
          window.setTimeout(this.storageReady.bind(null, callback), 100);
        }
      }
    },
  }
}
</script>