<template>
  <alert id="nav-alert"
    :type="config[0]"
    v-if="state.alert"
    dismissible
    @dismissed="state.alert = false; cookie('w', config[2], true, config[3]);">
    <div><p class="text-center" v-html="config[1]"></p></div>
  </alert>
</template>

<script>
import { Alert } from 'uiv';
export default {
  components: {
    Alert,
  },
  data() {
    return {
      config: ['', '', 'nav-alert', 604800000],
      /** [color (from bootstrap), text, cookie name, cookie duration] */
      state: {
        alert: false,
      },
    }
  },
  mounted() {
    this.siteConfig(this.$root.site);

    if (this.config[1] !== '') {
      this.state.alert = !this.cookie('r', this.config[2]);
    }
  },
  methods: {
    siteConfig(site) {
      let c = [];
      // Local config
      try {
        if (l$.alert.constructor === Array) {
          c = l$.alert;
        }
      } catch (e) {
        // continue regardless of error
      }

      // Site config (< Local config)
      if (c[0] === undefined) {
        switch (site) {
          case 'libre':
            c = [
              'info',
              `${this.$root.color.libre}, l’annuaire des logiciels libres de l’association
              ${this.$root.color.soft}
              <a href="https://framablog.org/2017/03/21/framalibre-lannuaire-du-libre-renait-entre-vos-mains/"
              >fait peau neuve</a>.<br>
              Certains liens prééxistants ne sont plus valides.
              <a href="${this.$root.link.contact}/fr/faq/#libre_v2">
              Vous avez du mal à vous y retrouver&nbsp;?</a>`,
            ];
            break;
          case 'site':
            c = [
              'info',
              `${this.$root.color.site} est en phase de test.
              Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque.
              C’est à l’écoute de vos retours que nous allons l’améliorer
              et le documenter au cours des semaines à venir.`,
            ];
            break;
          case 'wiki':
            if (/frama\.wiki/.test(this.$root.host)) {
              c = [
                'info',
                `${this.$root.color.wiki} est en phase de test.
                Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque.
                C’est à l’écoute de vos retours que nous allons l’améliorer
                et le documenter au cours des semaines à venir.`,
              ];
            }
            break;

          // no-default
        }
      }

      // Merge + return config
      this.config.forEach((v, i) => {
        if (c[i] !== undefined) { this.config[i] = c[i]; }
      });
    }
  }
}
</script>
