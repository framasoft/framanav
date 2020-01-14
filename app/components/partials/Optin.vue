<template>
  <portal
    target-el="#fp-optin"
    target-class="f-bs4"
  >
    <!-- Success -->
    <b-alert
      id="f-optin"
      :show="state.optin && !state.sent"
      variant="info"
    >
      <input
        id="f-optin-checkbox"
        v-model="state.checked"
        type="checkbox"
        :value="state.checked"
        @change="subscribe()"
      />
      <label
        for="f-optin-checkbox"
        v-html="$t('fnav.optin.t')"
      ></label>
      <br />
      <small>
        <span v-html="$t('fnav.optin.d1')"></span>&nbsp;
        <a
          :href="$t('link.newsletter')"
          target="_blank"
        >
          <span v-html="$t('fnav.optin.d2')"></span>
          <span
            class="sr-only"
            v-html="`(${$t('txt.newWindow')})`"
          ></span>
        </a>
      </small>
    </b-alert>

    <!-- Error -->
    <b-alert
      id="f-optin-error"
      :show="state.email !== '' && !is.email(state.email)"
      variant="danger"
    >
      <p v-html="$t('fnav.optin.e2', { email: `<b>${state.email}</b>`})"></p>
    </b-alert>

    <!-- Success -->
    <b-alert
      id="f-optin-success"
      :show="state.sent"
      variant="success"
    >
      <p v-html="$t('fnav.optin.s1', { email: `<b>${state.email}</b>`})"></p>
    </b-alert>
  </portal>
</template>

<script>
export default {
  data() {
    return {
      config: ['', this.$t('cookie.optin'), 604800000],
      /** [email selector, cookie name, cookie duration] */
      state: {
        optin: false,
        checked: false,
        email: '',
        sent: false,
      },
      storage: this.$t('storage'),
    };
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', '<div id="fp-optin"></div>');
    }
  },
  mounted() {
    this.siteConfig(this.$t('site'));

    if (this.config[0] !== '') {
      if (this.storage.optin[0]) {
        // Global cookie send locally
        this.cookie('w', this.config[1], true, this.storage.optin[2]);
      }
      // Move box next to email input
      if (document.querySelector(this.config[0])) {
        document.querySelector(this.config[0]).after(document.getElementById('fp-optin'));
      } else {
        document.getElementById('fp-optin').style.display = 'none';
      }
      // Display checkbox
      this.state.optin = (!this.cookie('r', this.config[1]));
    }
  },
  methods: {
    subscribe() {
      this.state.email = (this.config[0] !== ''
        && document.querySelector(this.config[0]) !== null)
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
            '&VerificationCodeX=&subscribe=Abonnement',
          ].join(''), // Paramètres habituellement passés dans le formulaire
        }).catch((err) => {
          console.error(err); // eslint-disable-line
        });
        this.state.sent = true;

        // Never ask again
        this.cookie('w', this.config[1], true, this.config[2]);
        this.storage.optin = [true, this.config[2]];
        this.globalStorage.minus('o', this.storage);
      }
      // Not a valid email
      this.state.checked = false;
    },
    siteConfig(site) {
      let c = [];
      // Local config
      /* global l$ */
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
            if (!/\.framaboard/.test(this.$t('host'))) {
              c = ['#registration #email'];
            }
            break;
          case 'date':
            c = /create_poll\.php\?/.test(this.$t('url')) ? ['#formulaire input#email'] : [''];
            break;
          case 'mindmap':
            c = ['#user #email'];
            break;
          default:
            // no-default
            break;
        }
      }

      // Merge + return config
      this.config.forEach((v, i) => {
        if (c[i] !== undefined) { this.config[i] = c[i]; }
      });
    },
  },
};
</script>
