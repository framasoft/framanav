<template>
  <alert id="nav-alert"
    :type="cfg[0]"
    v-if="cfg[1] !== '' && state.alert"
    dismissible
    @dismissed="state.alert = false; cookie('w', cfg[2], true, cfg[3]);">
    <div><p class="text-center" v-html="cfg[1]"></p></div>
  </alert>
</template>

<script>
import { Alert } from 'uiv';
export default {
  components: {
    Alert,
  },
  props: {
    config: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cfg: this.config,
      state: {
        alert: false,
      },
    }
  },
  mounted() {
    if (this.cfg[1] === '') { // Keep local config
      this.siteConfig(this.$root.site);
    }
    if (this.cfg[1] !== '') {
      this.state.alert = !this.cookie('r', this.cfg[2]);
    }
  },
  methods: {
    siteConfig(site) {
      switch (site) {
        case 'libre':
          this.cfg = [
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
          this.cfg = [
            'info',
            `${this.$root.color.site} est en phase de test.
            Le service fonctionne, mais n’est pas encore facile à utiliser par quiconque.
            C’est à l’écoute de vos retours que nous allons l’améliorer
            et le documenter au cours des semaines à venir.`,
          ];
          break;
        case 'wiki':
          if (/frama\.wiki/.test(this.$root.host)) {
            this.cfg = [
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
      this.config.forEach((v, i) => {
        if (this.cfg[i] === undefined) { this.cfg[i] = v; }
      });
    }
  }
}
</script>
