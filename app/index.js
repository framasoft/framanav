import Vue from 'vue';
import VueRouter from 'vue-router';
import VueI18n from 'vue-i18n';
import vueHeadful from 'vue-headful';
import PortalVue from 'portal-vue';

import App from './App.vue';

import './assets/scss/bootstrap.scss';
import '../node_modules/fork-awesome/css/fork-awesome.css';
import './assets/scss/main.scss';

import text from './plugins/text';
import is from './plugins/is';
import cookie from './plugins/cookie';
import merge from './plugins/merge';

Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.component('vue-headful', vueHeadful);
Vue.use(PortalVue);

Vue.use(text);
Vue.use(is);
Vue.use(cookie);
Vue.use(merge);

const defaultLocale = 'fr';
const locales = [];
const pages = [];
const commons = [];
const dataLocales = [];

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
// Import commons data list
req = require.context('./data/commons/', false, /\.yml$/);
req.keys().forEach((key) => {
  commons.push(key.replace(/\.\/(.*)\.yml/, '$1'));
});
// Import dataLocales list
req = require.context('./data/locales/', false, /\.yml$/);
req.keys().forEach((key) => {
  dataLocales.push(key.replace(/\.\/(.*)\.yml/, '$1'));
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
const data = {};
let project = {};
const scripts = document.getElementsByTagName('script');
for (let i = 0; i < commons.length; i += 1) {
  data[commons[i]] = require(`./data/commons/${commons[i]}.yml`); // eslint-disable-line
}
project = require('./data/project.yml'); // eslint-disable-line
Object.assign(data, project);

Object.assign(data, {
  host: window.location.host,
  url: window.location.href,
  '/': `/${process.env.BASE_URL.replace(/(.+)/, '$1/')}`,
  inframe: window.top.location !== window.self.document.location,
  hash: window.location.hash.replace('#', ''),
  browser: {
    agent: navigator.userAgent,
    opera: !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    firefox: typeof InstallTrigger !== 'undefined',
    safari: Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
    chrome: !!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0),
    ie: /*@cc_on!@*/false || !!document.documentMode, // eslint-disable-line
  },
});
data.self = new URL(scripts[scripts.length - 1].src, data.url).href;
data.baseurl = `${data.self.split('/').slice(0, -1).join('/')}/`;

/** Only for nav */
data.site = data.host.replace(/^(www|test)\./i, '').replace(/\.(com|net|org|fr|pro)$/i, '');
data.name = data.site[0].toUpperCase() + data.site.slice(1).replace('.framasoft', ''); // Nom du service
data.lname = data.name.toLowerCase();

// [site] Cleaning (shortest name for config)
data.site = data.site.replace(/framand/i, 'and') // TODO : remplacer par noFrama ?
  .replace(/framage/i, 'age')
  .replace(/framae/i, 'mae')
  .replace(/(\.framasoft|frama\.)/i, '')
  .replace(/framin/i, 'min')
  .replace(/frame/i, 'me')
  .replace(/frama/i, '');

// [site] Aliases
if (/(tontonroger|trouvons)/.test(data.host)) { data.site = 'bee'; }
if (/huit.re/.test(data.host)) { data.site = 'link'; }

// [site] Subdomains
if (/framaboard/.test(data.host)) { data.site = 'board'; }
if (/framadate/.test(data.host)) { data.site = 'date'; }
if (/framacalc/.test(data.host)) { data.site = 'calc'; }

// [site] Exceptions Framapad
if (/(mypads|beta3).framapad.org/.test(data.host)) {
  data.site = 'mypads';
  data.name = 'Framapad';
}
if ((/.framapad/.test(data.host) && !/mypads./.test(data.host))
  || (/(mypads|beta3).framapad/.test(data.host) && /\/p\//.test(data.url))) {
  data.site = 'etherpad';
  data.name = 'Framapad';
}
/** </> */

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

const routes = [];
for (let i = 0; i < locales.length; i += 1) {
  messages[locales[i]] = {};
  // Locales import
  /* eslint-disable */
  messages[locales[i]] = require(`./locales/${locales[i]}.yml`);
  messages[locales[i]].data = data;
  messages[locales[i]].lang = locales[i];

  if (dataLocales.includes(locales[i])) {
    const dataLocale = require(`./data/locales/${locales[i]}.yml`);
    Object.keys(dataLocale).forEach((k) => {
      if (messages[locales[i]][k] === undefined) {
        messages[locales[i]][k] = dataLocale[k];
      } else {
        Object.assign(messages[locales[i]][k], dataLocale[k]);
      }
    });
  }
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

// Redirections
for (let i = 0; i < pages.length; i += 1) {
  if (!window.vuefsPrerender) {
    routes.push({
      path: `/${pages[i].toLowerCase().replace('home', '')}`,
      redirect: `/${defaultRouteLang}/${pages[i].toLowerCase().replace('home', '')}`,
    });
  } else {
    // Component needed for SEO
    const component = require(`./components/pages/${pages[i]}.vue`); // eslint-disable-line
    routes.push({
      path: `/${pages[i].toLowerCase().replace('home', '')}`,
      component: component.default,
    });
  }
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: defaultLocale,
  messages,
  silentTranslationWarn: true,
});

// Routes
const router = new VueRouter({
  routes,
  mode: 'history',
  base: `${__dirname}${process.env.BASE_URL}`,
});

document.addEventListener('DOMContentLoaded', () => {
  /** <framanav> */
  if (document.getElementById('fnav') === null) {
    // Framanav
    const fnav = document.createElement('div');
    fnav.id = 'fnav';
    document.getElementsByTagName('body')[0].insertBefore(fnav, document.getElementsByTagName('body')[0].children[0]);
  }
  /** </framanav> */

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
}, false);
