import marked from 'marked';
import deburr from 'lodash/deburr';

export default {
  install(Vue) {
    Object.defineProperty(Vue.prototype, 'text', {
      value: (html, options) => { // eslint-disable-line
        let text = '';
        const tmp = new DOMParser().parseFromString(marked(html.replace(/  \n/g, '  \n')), 'text/html'); // eslint-disable-line no-irregular-whitespace
        text = tmp.body.textContent || '';
        if (options) {
          if (/latin/.test(options) || /^-.*?L.*?$/.test(options)) {
            text = deburr(text);
          }
          if (/^-.*?l.*?$/.test(options)) {
            text = text.toLowerCase();
          }
          if (/^-.*?U.*?$/.test(options)) {
            text = text.toUpperCase();
          }
          if (/^-.*?K.*?$/.test(options)) {
            text = text.replace(/^./, v => v.toUpperCase());
          }
          if (/sanitize/.test(options) || /^-.*?@.*?$/.test(options)) {
            text = text.toLowerCase().trim()
              .replace(/@:[.a-z]+ /g, '') // remove vue-i18n var
              .replace(/[ '’]/g, '-')
              .replace(/[^a-zA-Z0-9-_.]/g, '');
          }
          if (/noframa/.test(options) || /^-.*?~.*?$/.test(options)) {
            text = text.replace('framand', 'and')
              .replace('framage', 'age')
              .replace('framae', 'mae')
              .replace('framin', 'min')
              .replace('frame', 'me')
              .replace('frama', '')
              .replace('.', '')
              .replace('my', 'myframa');
          }
          if (html === 'random' || html === '?') {
            const length = Number.isInteger(options) ? options : 10;
            text = [...Array(length)].map(() => Math.random().toString(36)[3]).join('')
              .replace(/(.|$)/g, c => c[!Math.round(Math.random()) ? 'toString' : 'toUpperCase']());
          }
        }
        return text;
      },
    });
  },
};
