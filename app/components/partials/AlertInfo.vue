<template>
  <portal
    target-el="#fp-alert"
    target-class="f-bs4"
  >
    <b-alert
      v-if="state.alert"
      id="f-alert"
      :show="state.alert"
      :variant="config[0]"
      dismissible
      :dismiss-label="$t('txt.close')"
      @dismissed="state.alert = false; cookie('w', config[2], true, config[3]);"
    >
      <div>
        <p
          class="text-center"
          v-html="config[1]"
        ></p>
      </div>
    </b-alert>
  </portal>
</template>

<script>
export default {
  data() {
    return {
      config: ['', '', 'f-alert', 604800000],
      /** [color (from bootstrap), text, cookie name, cookie duration] */
      countdown: {
        today: 0,
        end: new Date(1 * this.$t('year.next'), 0, 1).getTime(),
        diff: 0,
        d: 0,
        h: 0,
        m: 0,
        html: '',
      },
      state: {
        alert: false,
      },
    };
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('#f-nav')
        .insertAdjacentHTML('beforebegin', '<div id="fp-alert"></div>');
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
      /* global l$ */
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
                pour une durée n’excédant pas 24 heures. Prenez vos précautions&nbsp;!
                Plus d’infos&nbsp;: <a href="https://status.framasoft.org/incident/477">status.framasoft.org</a>`,
              ];
            }
            break;
          case 'board':
            if (this.is.before('2019/12/12')) {
              c = [
                'warning',
                `Mercredi 11 décembre, à partir de 22h, nous couperons l’accès au service
                Framaboard pour le migrer vers un serveur plus véloce.<br>
                La coupure devrait prendre fin jeudi matin.`,
              ];
            }
            break;
          case 'drive':
            if (this.is.before('2019/05/21')) {
              c = [
                'warning',
                `Afin de procéder à une mise à jour majeure et une migration de
                base de données, le service ${this.$t('color.drive')} sera interrompu le lundi 20 mai dès 9h,
                pour une durée n’excédant pas 24 heures. Prenez vos précautions&nbsp;!
                Plus d’infos&nbsp;: <a href="https://status.framasoft.org/incident/476">status.framasoft.org</a>`,
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
          case 'listes':
            if (this.is.before('2020/01/25')) {
              c = [
                'warning',
                `Framalistes est actuellement en train de traiter la file d'attente des emails créée à cause des soucis
                de blocage des mails par Yahoo. Nous estimons que cela sera achevé d'ici la fin de la journée.
                <b>Il est donc inutile de nous contacter à propos d'emails non délivrés pour le moment</b>.
              Plus d'infos sur <a href="https://status.framasoft.org/incident/581">status.framasoft.org</a>`,
              ];
            }
            break;
          case 'mindmap':
            if (navigator.userAgent.match('Chrome')) {
              c = [
                'warning',
                `Un bug avec le logiciel Wisemapping (qui n'est plus développé) empêche l'utilisation de ${this.$t('color.mindmap')} avec les versions récentes du navigateur Chrome (et dérivés). Nous vous conseillons d'utiliser Firefox en attendant qu'une solution à ce problème soit trouvée.`
              ];
            }
            break;
          default:
            // no-default
            break;
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
            <br />
            Si vous le pouvez, pensez à
            <a href="https://contributopia.org/fr/journal#soutenir">soutenir nos actions par un don</a>.`,
            'nav-alert-cuo',
          ];
        } else {
          c = [
            'info',
            `Framasoft publishes “<a href="https://contributopia.org/en/journal">Contributopia’s travel journals</a>”.
            From October to December of 2019, we will assess our many (donations-founded) actions,
            which are tax-deductible for French taxpayers.
            <br />
            <a href="https://contributopia.org/en/journal#soutenir">Donate here</a> if you can.`,
            'nav-alert-cuo',
          ];
        }
      }

      // Bandeau soutenir défiscalisation
      if (c[0] === undefined
        && this.is.after(`${this.$t('year.current')}/12/10`)
        && !this.is.after(`${this.$t('year.current')}/12/31`)
        && !/soutenir/.test(site)
        && this.$t('lang') === 'fr') {
        this.countdown.today = new Date().getTime();
        this.countdown.diff = (this.countdown.end - this.countdown.today) / 1000;
        this.countdown.d = Math.floor(this.countdown.diff / (60 * 60 * 24));
        if (this.countdown.d > 0) {
          this.countdown.html = `
            ${this.countdown.d}</b> jour${this.countdown.d > 1 ? 's' : ''}
          `;
        } else {
          this.countdown.h = Math.floor((this.countdown.diff % (60 * 60 * 24)) / (60 * 60));
          this.countdown.m = Math.floor((this.countdown.diff % (60 * 60)) / 60);

          if (this.countdown.h > 0) {
            this.countdown.html = `
              ${this.countdown.h}</b> heure${this.countdown.h > 1 ? 's' : ''}
              ${this.countdown.m}</b> minute${this.countdown.m > 1 ? 's' : ''}
            `;
          } else {
            this.countdown.html = `
              ${this.countdown.m}</b> minute${this.countdown.m > 1 ? 's' : ''}
            `;
          }
        }

        c = [
          'info',
          `Rappel&nbsp;: il vous reste
          <a href="${this.$t('link.soutenir')}" class="btn btn-sm btn-soutenir py-0">${this.countdown.html}</a> pour faire un
          <a href="${this.$t('link.blog')}/2018/11/22/impots-et-dons-a-framasoft-le-prelevement-a-la-source-en-2019/">
          don défiscalisé en ${this.$t('year.current')}</a> à Framasoft.<br>
          Merci pour <a href="${this.$t('link.soutenir')}">
            <b>votre soutien</b>
            <i class="fa fa-heart" aria-hidden="true"></i>
          </a>`,
        ];
      }

      // Merge + return config
      this.config.forEach((v, i) => {
        if (c[i] !== undefined) { this.config[i] = c[i]; }
      });
    },
  },
};
</script>
