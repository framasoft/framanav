<template>
  <portal target-el="#foptin">
    <div class="alert alert-danger fade in"
      id="fs_opt-in_error"
      v-if="state.email !== '' && !isEmail(state.email)">
      <p v-html="$t('fnav.optin.e2').replace('%f$Email%', '<b>' + state.email + '</b>')"></p>
    </div>
    <div class="alert alert-success fade in"
      id="fs_opt-in_confirm"
      v-if="state.sent">
      <p v-html="$t('fnav.optin.s1').replace('%f$Email%', state.email)"></p>
    </div>
    <div class="alert alert-info fade in"
      id="fs_opt-in"
      v-if="state.optin && !state.sent">
      <input type="checkbox" id="fs_opt-in_checkbox" v-model="state.checked" :value="state.checked" @change="subscribe()">
      <label for="fs_opt-in_checkbox" v-html="$t('fnav.optin.t')"></label>
      <br>
      <small>
        <span v-html="$t('fnav.optin.d1')"></span>&nbsp;
        <a :href="$root.link.newsletter" id="link-opt-in" target="_blank" >
          <span v-html="$t('fnav.optin.d2')"></span>
          <span class="sr-only" v-html="'(' + $t('txt.newWindow') + ')'"></span>
        </a>
      </small>
    </div>
  </portal>
</template>

<script>
import { Alert } from 'uiv';
import { isEmail, cookie } from '../../tools';
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
      state: {
        optin: false,
        checked: false,
        email: '',
        sent: false,
      },
    }
  },
  mounted() {
    if (this.config[0] !== '') {
      if (this.storage[0]) {
        // Global cookie send locally
        this.cookie('w', this.config[1], true, this.storage[2]);
      }
      // Move box next to email input
      document.querySelector(this.config[0]).after(document.getElementById('foptin'));
      // Display checkbox
      this.state.optin = (!this.cookie('r', 'opt-in'));
    }
  },
  methods: {
    cookie, isEmail,
    subscribe() {
      this.state.email
        = (this.config[0] !== '' && document.querySelector(this.config[0]) !== null)
        ? document.querySelector(this.config[0]).value
        : '';
      if (this.isEmail(this.state.email)) {
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
  },
}
</script>
