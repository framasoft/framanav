<template>
  <portal target-el="#foptin">
    <div class="alert alert-danger fade in"
      id="fs_opt-in_error"
      v-if="state.email !== '' && !is.email(state.email)">
      <p v-html="$t('fnav.optin.e2', { email: `<b>${state.email}</b>`})"></p>
    </div>
    <div class="alert alert-success fade in"
      id="fs_opt-in_confirm"
      v-if="state.sent">
      <p v-html="$t('fnav.optin.s1', { email: `<b>${state.email}</b>`})"></p>
    </div>
    <div class="alert alert-info fade in"
      id="fs_opt-in"
      v-if="state.optin && !state.sent">
      <input
        id="fs_opt-in_checkbox"
        type="checkbox"
        v-model="state.checked"
        :value="state.checked"
        @change="subscribe()">
      <label for="fs_opt-in_checkbox" v-html="$t('fnav.optin.t')"></label>
      <br>
      <small>
        <span v-html="$t('fnav.optin.d1')"></span>&nbsp;
        <a :href="$root.link.newsletter" id="link-opt-in" target="_blank" >
          <span v-html="$t('fnav.optin.d2')"></span>
          <span class="sr-only" v-html="`(${$t('txt.newWindow')})`"></span>
        </a>
      </small>
    </div>
  </portal>
</template>

<script>
import { Alert } from 'uiv';
export default {
  components: {
    Alert,
  },
  created() {
    // Optin
    if (!window.vuefsPrerender) {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', '<div id="foptin"></div>');
    }
  },
  props: {
    storage: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      config: ['', 'opt-in', 604800000],
      /** [email selector, cookie name, cookie duration] */
      state: {
        optin: false,
        checked: false,
        email: '',
        sent: false,
      },
    }
  },
  mounted() {
    this.siteConfig(this.$root.site);

    if (this.config[0] !== '') {
      if (this.storage[0]) {
        // Global cookie send locally
        this.cookie('w', this.config[1], true, this.storage[2]);
      }
      // Move box next to email input
      if (document.querySelector(this.config[0])) {
        document.querySelector(this.config[0]).after(document.getElementById('foptin'));
      } else {
        document.getElementById('foptin').style.display = 'none';
      }
      // Display checkbox
      this.state.optin = (!this.cookie('r', 'opt-in'));
    }
  },
  methods: {
    subscribe() {
      this.state.email
        = (this.config[0] !== '' && document.querySelector(this.config[0]) !== null)
        ? document.querySelector(this.config[0]).value
        : '';
      if (this.is.email(this.state.email)) {
        // Subscribe
        fetch('https://contact.framasoft.org/php_list/lists/?p=subscribe&id=2', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: [
            'makeconfirmed=1&htmlemail=1&list%5B5%5D=signup&listname%5B5%5D=Newsletter&email=',
            this.state.email.replace('@', '%40'),
            '&VerificationCodeX=&subscribe=Abonnement'
          ].join(''), // Paramètres habituellement passés dans le formulaire
        }).catch((err) => {
          console.error(err); // eslint-disable-line
        });
        this.state.sent = true;

        // Never ask again
        this.cookie('w', this.config[1], true, this.config[2]);
        // this.storage = [true, this.config[2]];
        // this.minus('o', this.storage);
      }
      // Not a valid email
      this.state.checked = false;
    },
    siteConfig(site) {
      let c = [];
      // Local config
      try {
        if (l$.optin.constructor === Array) {
          c = l$.optin;
        }
      } catch (e) {
        // continue regardless of error
      }

      // Site config (< Local config)
      if (c[0] === undefined) {
        switch (site) {
          case 'blog':
            c = ['#commentform #email'];
            break;
          case 'board':
            if (!/\.framaboard/.test(this.$root.host)) {
              c = ['#registration #email'];
            }
            break;
          case 'date':
            c = /create_poll\.php\?/.test(this.$root.url) ? ['#formulaire input#email'] : [''];
            break;
          case 'mindmap':
            c = ['#user #email'];
            break;

          // no-default
        }
      }

      // Merge + return config
      this.config.forEach((v, i) => {
        if (c[i] !== undefined) { this.config[i] = c[i]; }
      });
    }
  },
}
</script>
