<template>
  <iframe
    :id="`${key}_cortex`" :ref="`${key}_cortex`"
    :src="src"
    aria-hidden="true"
    style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;"
  ></iframe>
</template>

<script>
export default {
  props: {
    key: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    init: {
      type: Object,
      required: true,
    },
    storage: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    if (/cortex(.html)?$/.test(window.location.href)) {
      this.cortex();
    } else {
      this.minus();
    }
  },
  methods: {
    cortex(action, msg) {
      const m = msg;
      switch (action) {
        case 'o': // output to Minus
          try {
            window.parent.postMessage(localStorage.framanav, '*');
          } catch (e) {
            window.parent.postMessage(JSON.stringify(this.init), '*');
          }
          break;
        case 'i': // input in localStorage
          try {
            localStorage.setItem(key, JSON.stringify(m));
          } catch (e) {
            // Pas accès au localStorage
          }
          break;
        default: // init
          try {
            if (localStorage[key] === undefined) {
              this.cortex('i', this.init);
            }
          } catch (e) {
            // Pas accès au localStorage
          }
          this.cortex('o');

          window.onmessage = function listenMinus(event) {
            /* if(event.origin !== 'frama.web') {
              return;
            } */
            try {
              const payload = JSON.parse(event.data);
              if (payload.framanav !== this.init
                && Object.keys(payload[key]).length) {
                mergeObj(this.storage, payload[key]);
                this.cortex('i', this.storage);
              }
              this.cortex('o');
            } catch (e) {
              // Pas du JSON ?
            }
          };
          break;
      }
    },
    minus(action, msg) {
      const m = msg; const c = document.getElementById('framanav_cortex');
      if (c) {
        switch (action) {
          case 'i': { // input in this.storage
            try {
              this.storage = JSON.parse(m);
            } catch (e) {
              // Pas du JSON
            }
            break;
          }
          case 'o': { // output to Cortex
            c.contentWindow.postMessage(JSON.stringify({ framanav: m }), '*');
            break;
          }
          default: { // init
            this.minus('o', this.storage);

            const eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
            const eventer = window[eventMethod];
            const messageEvent = (eventMethod === 'attachEvent') ? 'onmessage' : 'message';
            eventer(messageEvent, e => this.minus('i', e.data), false);
            break;
          }
        }
      }
    }
  }
}
</script>
