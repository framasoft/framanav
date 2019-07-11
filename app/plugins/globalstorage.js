export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, 'globalStorage', {
      value: {
        init(msg) {
          if (/cortex(.html)?$/.test(window.location.href)) {
            /* Init cortex in cortex.html */
            try {
              if (localStorage.framanav === undefined) {
                this.cortex('i', msg);
              }
            } catch (e) {
              // Pas accès au localStorage
            }
            this.cortex('o');

            window.cortex = this.cortex;

            window.onmessage = function listenMinus(event) {
              try {
                const payload = JSON.parse(event.data);
                if (payload.framanav !== msg
                  && Object.keys(payload.framanav).length) {
                  this.cortex('i', payload.framanav);
                }
                this.cortex('o');
              } catch (e) {
                // Pas du JSON ?
              }
            };
          } else {
            /* Init minus in generic nav.js call */
            this.minus('o', {});

            const eventMethod = (window.addEventListener) ? 'addEventListener' : 'attachEvent';
            const eventer = window[eventMethod];
            const messageEvent = (eventMethod === 'attachEvent') ? 'onmessage' : 'message';
            eventer(messageEvent, e => this.minus('i', e.data), false);
          }
        },
        cortex(action, msg) {
          const m = msg;
          const storage = {};
          switch (action) {
            case 'o': // output to Minus
              try {
                window.parent.postMessage(localStorage.framanav, '*');
              } catch (e) {
                window.parent.postMessage(JSON.stringify(storage), '*');
              }
              break;
            case 'i': // input in localStorage
              try {
                localStorage.setItem('framanav', JSON.stringify(m));
              } catch (e) {
                // Pas accès au localStorage
              }
              break;
            default:
              // no-default
              break;
          }
          return storage;
        },
        minus(action, msg) {
          const m = msg;
          const c = document.getElementById('framanav_cortex');
          let storage = {};
          if (c) {
            switch (action) {
              case 'i': { // return for storage
                try {
                  storage = JSON.parse(m);
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
                // no-default
                break;
              }
            }
          }
          return storage;
        },
      },
    });
  },
};
