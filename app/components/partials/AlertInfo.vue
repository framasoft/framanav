<template>
  <portal target-el="#fp-alert" target-class="f-bs4">
    <b-alert id="f-alert"
      :show="state.alert"
      :variant="config[0]"
      v-if="state.alert"
      dismissible
      :dismiss-label="$t('txt.close')"
      @dismissed="state.alert = false; cookie('w', config[2], true, config[3]);">
      <div><p class="text-center" v-html="config[1]"></p></div>
    </b-alert>
  </portal>
</template>

<script>
export default {
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('#f-nav')
        .insertAdjacentHTML('beforebegin', '<div id="fp-alert"></div>');
    }
  },
  data() {
    return {
      config: ['', '', 'f-alert', 604800000],
      /** [color (from bootstrap), text, cookie name, cookie duration] */
      state: {
        alert: false,
      },
    }
  },
  mounted() {
    this.siteConfig(this.$t('site'));

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
                base de données, le service ${this.$t('color.agenda')} sera interrompu le lundi 27 mai dès 9h,
                pour une durée n’excédant pas 24 heures. Prenez vos précautions !
                Plus d’infos : <a href="https://status.framasoft.org/incident/477">status.framasoft.org</a>`,
              ];
            }
            break;
        case 'drive':
            if (this.is.before('2019/05/21')) {
              c = [
                'warning',
                `Afin de procéder à une mise à jour majeure et une migration de
                base de données, le service ${this.$t('color.drive')} sera interrompu le lundi 20 mai dès 9h,
                pour une durée n’excédant pas 24 heures. Prenez vos précautions !
                Plus d’infos : <a href="https://status.framasoft.org/incident/476">status.framasoft.org</a>`,
              ];
            }
            break;
          case 'forms':
            if (this.is.before('2019/11/04')) {
              if (this.$t('lang') === 'fr') {
                c = [
                  'warning',
                  `Le service ${this.$t('color.forms')} sera inaccessible le 4 novembre à partir de 8h pour
                  la mise à jour du système d'exploitation du serveur.
                  Plus d’infos sur <a href="https://status.framasoft.org/incident/550">status.framasoft.org</a>`,
                ];
              } else {
                c = [
                  'warning',
                  `The ${this.$t('color.forms')} service will be unavailable on November 4th from 8am
                  for the update of the server operating system.
                  More informations on <a href="https://status.framasoft.org/incident/550">status.framasoft.org</a>`,
                ];
              }
            }
            break;

          // no-default
        }
      }

      /* Campaign 2019 */
      if (c[0] === undefined
        && !/(contributopia|soutenir)/.test(site)
        && this.is.after('2019/10/14')
        && this.is.before('2019/11/04')) {
        if (this.$t('lang') === 'fr') {
          c = [
            'info',
            `Pour sa nouvelle campagne de don, Framasoft vous ouvre
            <a href="https://contributopia.org/fr/journal">les carnets de voyage de Contributopia</a>
            pour partager avec vous 2 ans de découvertes, d’observations et de collaborations
            (lire nos explications
            <a href="https://framablog.org/2019/10/15/les-carnets-de-voyage-de-contributopia/">sur le Framablog</a>).
            <br>
            Si vous le pouvez, pensez à
            <a href="https://contributopia.org/fr/journal#soutenir">soutenir nos actions par un don</a>.`,
            'nav-alert-cuo'
          ];
        } else {
          c = [
            'info',
            `Framasoft publishes “<a href="https://contributopia.org/en/journal">Contributopia’s travel journals</a>”.
            From October to December of 2019, we will assess our many (donations-founded) actions,
            which are tax-deductible for French taxpayers.
            <br>
            <a href="https://contributopia.org/en/journal#soutenir">Donate here</a> if you can.`,
            'nav-alert-cuo'
          ];
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
