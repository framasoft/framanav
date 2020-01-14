<template>
  <b-modal
    id="f-modal-info"
    v-model="state.info"
    :static="true"
    :lazy="true"
    :title="config[0]"
    :header-close-label="$t('txt.close')"
    :cancel-title-html="$t('txt.close')"
    cancel-variant="light"
    :ok-title-html="$t('txt.nevershow')"
    @esc="cookie('w', config[2], true, config[3])"
    @backdrop="cookie('w', config[2], true, config[3])"
    @headerclose="cookie('w', config[2], true, config[3])"
    @cancel="cookie('w', config[2], true, config[3])"
    @ok="cookie('w', config[2], true)"
  >
    <div v-html="config[1]"></div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      config: ['', '', 'modal-info', 604800000],
      /** [title, text, cookie name, cookie duration (7×24×60×60×1000)] */
      state: {
        info: false,
      },
    };
  },
  mounted() {
    this.siteConfig(this.$t('site'));

    if (this.config[0] !== '') {
      this.state.info = !this.cookie('r', this.config[2]);
    }
  },
  methods: {
    siteConfig(site) {
      let c = [];
      // Local config
      /* global l$ */
      try {
        if (l$.modal.info.constructor === Array) {
          c = l$.modal.info;
        }
      } catch (e) {
        // continue regardless of error
      }

      // Site config (< Local config)
      if (c[0] === undefined) {
        switch (site) {
          case 'etherpad':
            if (/(beta\.framapad)/.test(this.$t('host'))) {
              c = [
                'Avertissement',
                `<p>Cette instance de Framapad (<b>beta</b>.framapad.org) est
                instable et ne doit servir que pour des tests.<p>
                <p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>
                <p>Merci.<br>L’équipe technique</p>`,
              ];
            }
            break;
          case 'date':
            if (/(beta\.framadate)/.test(this.$t('host'))) {
              c = [
                'Avertissement',
                `<p>Cette instance de Framadate (<b>beta</b>.framadate.org) est
                instable et ne doit servir que pour des tests.<p>
                <p>Passez plutôt par <a href="https://framadate.org">framadate.org</a>
                pour créer vos sondages.</p>
                <p>Merci.<br>L’équipe technique</p>`,
              ];
            }
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
