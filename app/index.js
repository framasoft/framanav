import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import vueHeadful from 'vue-headful';
import PortalVue from 'portal-vue';

import App from './App.vue';
import Home from './components/pages/Home.vue';

import './assets/scss/bootstrap.scss';
import '../node_modules/fork-awesome/css/fork-awesome.css';
import './assets/scss/main.scss';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.component('vue-headful', vueHeadful);
Vue.use(PortalVue);

const defaultLocale = 'fr';
const locales = [];
const pages = [];

// Import locales list
let req = require.context('./locales/', false, /\.yml$/);
req.keys().forEach((key) => {
  locales.push(key.replace(/\.\/(.*)\.yml/, '$1'));
});
// Import pages list
req = require.context('./components/pages', false, /\.vue$/);
req.keys().forEach((key) => {
  pages.push(key.replace(/\.\/(.*)\.vue/, '$1'));
});

let lang = '';
const html = document.getElementsByTagName('html');
const meta = document.getElementsByTagName('script');

if (window.location.href.indexOf('framabin.org/p/') > -1 // Contournement de PrivateBin
  && document.getElementById('language')
  && document.getElementById('language').innerHTML.indexOf('> français <') > -1) {
  lang = 'fr';
} else if (window.location.host.indexOf('framindmap.org') > -1 // Contournement de Wisemapping
  && document.getElementById('userSettingsBtn')
  && document.getElementById('userSettingsBtn').innerHTML === 'Compte') {
  lang = 'fr';
} else if (html[0].getAttribute('xml:lang')) {
  lang = html[0].getAttribute('xml:lang');
} else if (html[0].getAttribute('lang')) {
  lang = html[0].getAttribute('lang');
} else if (html[0].getAttribute('locale')) {
  lang = html[0].getAttribute('locale');
} else {
  for (let i = 0; i < meta.length; i += 1) {
    if ((meta[i].getAttribute('http-equiv') && meta[i].getAttribute('content')
      && meta[i].getAttribute('http-equiv').indexOf('Language') > -1)
      || (meta[i].getAttribute('property') && meta[i].getAttribute('content')
          && meta[i].getAttribute('property').indexOf('locale') > -1)) {
      lang = meta[i].getAttribute('content');
    }
  }
}
const userLang = navigator.languages
  || [navigator.language || navigator.userLanguage];
let defaultRouteLang = '';

const messages = {};
messages.locales = require('./lang.yml'); // eslint-disable-line
messages.locales.avalaible = Object.keys(messages.locales).filter(n => locales.indexOf(n) > -1);

// Data import
let data = {};
data = require('./data.yml'); // eslint-disable-line
data['/'] = `/${process.env.BASE_URL.replace(/(.+)/, '$1/')}`;
data.hash = window.location.hash.replace('#', '');
data.txt = data.txt || {};
data.html = data.html || {};
Object.keys(data.color).forEach((k) => {
  if (data.txt[k] === undefined) {
    const tmp = document.createElement('div');
    tmp.innerHTML = data.color[k];
    data.txt[k] = tmp.textContent || tmp.innerText;
  }
});

Object.keys(data.link).forEach((k) => {
  if (data.html[k] === undefined) {
    if (data.color[k] !== undefined) {
      data.html[k] = `<a href="${data.link[k]}">${data.color[k]}</a>`;
    } else if (data.txt[k] !== undefined) {
      data.html[k] = `<a href="${data.link[k]}">${data.txt[k]}</a>`;
    }
  }
});

const routes = [
  { path: '/', component: Home, meta: { id: 'home', lang: defaultLocale } },
];

for (let i = 0; i < locales.length; i += 1) {
  messages[locales[i]] = {};
  // Locales import
  /* eslint-disable */
  messages[locales[i]] = require(`./locales/${locales[i]}.yml`);
  messages[locales[i]].data = data;
  messages[locales[i]].lang = locales[i];
  /* eslint-enable */

  // Localized routes
  for (let j = 0; j < pages.length; j += 1) {
    const component = require(`./components/pages/${pages[j]}.vue`); // eslint-disable-line
    routes.push({
      path: `/${locales[i]}${pages[j].toLowerCase().replace(/^/, '/').replace('/home', '')}`,
      component: component.default,
      meta: { id: pages[j].toLowerCase(), lang: locales[i] },
    });
  }
}

// define defaultRouteLang
for (let j = 0; j < userLang.length; j += 1) { // check if user locales
  for (let i = 0; i < locales.length; i += 1) { // matches with app locales
    if (defaultRouteLang === '' && userLang[j].substring(0, 2).toLowerCase() === locales[i]) {
      defaultRouteLang = locales[i];
    }
  }
}

// Home redirection
const currentURL = window.location.href.replace(/\/+$/, '');
if ((currentURL.split('/')[3] === undefined || currentURL.split('/')[3] === process.env.BASE_URL)
  && (currentURL.split('/')[4] === undefined)) {
  if (defaultRouteLang === '') {
    defaultRouteLang = defaultLocale;
  }
  window.location.href = `${currentURL}/${defaultRouteLang}/`;
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: defaultLocale,
  messages,
  silentTranslationWarn: true,
});

/** <framanav> */
if (document.getElementById('fnav') === null) {
  // Framanav
  const fnav = document.createElement('div');
  fnav.id = 'fnav';
  document.getElementsByTagName('body')[0].insertBefore(fnav, document.getElementsByTagName('body')[0].children[0]);
}
/** </framanav> */

// Routes
const router = new VueRouter({
  routes,
  mode: 'history',
  base: `${__dirname}${process.env.BASE_URL}`,
});

new Vue({ // eslint-disable-line no-new
  el: '#fnav',
  router,
  i18n,
  data,
  mounted() {
    // You'll need this for renderAfterDocumentEvent.
    document.dispatchEvent(new Event('render-event'));
  },
  render: h => h(App),
});
