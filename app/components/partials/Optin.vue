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
      const foptin = document.createElement('div');
      foptin.id = 'foptin';
      document.getElementsByTagName('body')[0].appendChild(foptin);
    }
  },
  props: {
    config: {
      type: Array,
      required: true,
    },
    storage: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      cfg: this.config,
      state: {
        optin: false,
        checked: false,
        email: '',
        sent: false,
      },
    }
  },
  mounted() {
    if (this.cfg[0] === '') { // Keep local config
      this.siteConfig(this.$root.site);
    }
    if (this.cfg[0] !== '') {
      if (this.storage[0]) {
        // Global cookie send locally
        this.cookie('w', this.cfg[1], true, this.storage[2]);
      }
      // Move box next to email input
      document.querySelector(this.cfg[0]).after(document.getElementById('foptin'));
      // Display checkbox
      this.state.optin = (!this.cookie('r', 'opt-in'));
    }
  },
  methods: {
    subscribe() {
      this.state.email
        = (this.cfg[0] !== '' && document.querySelector(this.cfg[0]) !== null)
        ? document.querySelector(this.cfg[0]).value
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
        this.cookie('w', this.cfg[1], true, this.cfg[2]);
        // this.storage = [true, this.cfg[2]];
        // this.minus('o', this.storage);
      }
      // Not a valid email
      this.state.checked = false;
    },
    siteConfig(site) {
      switch (site) {
        case 'blog':
          this.cfg = ['#commentform #email'];
          break;
        case 'board':
          if (!/\.framaboard/.test(this.$root.host)) {
            this.cfg = ['#registration #email'];
          }
          break;
        case 'date':
          this.cfg = /create_poll\.php\?/.test(this.$root.url) ? ['#formulaire input#email'] : [''];
          break;
        case 'mindmap':
          this.cfg = ['#user #email'];
          break;
        case 'localhost:8080':
          this.cfg = ['#email'];
          break;

        // no-default
      }
      this.config.forEach((v, i) => {
        if (this.cfg[i] === undefined) { this.cfg[i] = v; }
      });
    }
  },
}
</script>
