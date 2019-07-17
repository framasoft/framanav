export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, 'globalStorage', {
      value: {
        minus(action, msg) {
          const m = msg;
          const c = document.getElementById('framanav_cortex');
          let storage = {};
          if (c) {
            if (action === 'i') { // input in this.storage
              try {
                storage = JSON.parse(m);
              } catch (e) {
                // not a valid JSON
              }
            } else { // 'o' = output to Cortex
              c.contentWindow.postMessage(JSON.stringify({ framanav: m }), '*');
            }
          }
          return storage;
        },
      },
    });
  },
};
