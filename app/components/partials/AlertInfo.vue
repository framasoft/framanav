<template>
  <portal target-el="#falert">
    <alert id="nav-alert"
      :style="(!state.alert) ? 'display: none;' : ''"
      :type="config[0]"
      v-if="state.alert"
      dismissible
      @dismissed="state.alert = false; cookie('w', config[2], true, config[3]);">
      <div><p class="text-center" v-html="config[1]"></p></div>
    </alert>
  </portal>
</template>

<script>
import { Alert } from 'uiv';
export default {
  components: {
    Alert,
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('#fnav')
        .insertAdjacentHTML('beforebegin', '<div id="falert"></div>');
    }
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
        case 'agenda':
            if (this.is.after('2019/05/21') && this.is.before('2019/05/28')) {
              c = [
                'warning',
                `Afin de procéder à une mise à jour majeure et une migration de
                base de données, le service ${this.$root.color.agenda} sera interrompu le lundi 27 mai dès 9h, 
                pour une durée n’excédant pas 24 heures. Prenez vos précautions ! 
                Plus d’infos : <a href="https://status.framasoft.org/incident/476">status.framasoft.org</a>`,
              ];
            }
            break;
        case 'drive':
            if (this.is.before('2019/05/21')) {
              c = [
                'warning',
                `Afin de procéder à une mise à jour majeure et une migration de
                base de données, le service ${this.$root.color.drive} sera interrompu le lundi 20 mai dès 9h, 
                pour une durée n’excédant pas 24 heures. Prenez vos précautions ! 
                Plus d’infos : <a href="https://status.framasoft.org/incident/477">status.framasoft.org</a>`,
              ];
            }
            break;
          case 'forms':
            if (this.is.before('2019/04/08')) {
              c = [
                'warning',
                `Le service ${this.$root.color.forms} sera inaccessible le 8 avril au matin pour
                une mise à jour qui permettra d’améliorer ses performances.
                Plus d’infos sur <a href="https://status.framasoft.org/incident/470">status.framasoft.org</a>`,
              ];
            }
            break;

          // no-default
        }
      }

      /* Save Your Internet */
      if (c[0] === undefined
        && this.is.after('2019/03/20')
        && this.is.before('2019/03/22')) {
        c = [
          'info black',
          `<a href="https://pledge2019.eu/fr" class="saveyourinternet">
            <img src="${this.$root.baseurl}img/com/saveyourinternet.png" alt=""/>
          </a>`,
          'nav-alert-syi'
        ];
      }

      // Merge + return config
      this.config.forEach((v, i) => {
        if (c[i] !== undefined) { this.config[i] = c[i]; }
      });
    }
  }
}
</script>
