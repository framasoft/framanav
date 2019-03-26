<template>
  <modal v-model="state.info"
    :style="(!state.info) ? 'display: none;' : ''"
    :title="config[0]"
    id="modal-finfo"
    aria-labelledby="modal-finfoLabel"
    >
    <div slot="header">
      <button type="button" class="close"
        @click="state.info = false; cookie('w', config[2], true);">
        <span aria-hidden="true">×</span>
        <span class="sr-only" v-html="$t('txt.close')"></span>
      </button>
      <h1 id="modal-finfoLabel"
        v-html="config[0]"
      ></h1>
    </div>

    <div class="clearfix"  id="modal-finfoBody" v-html="config[1]"></div>

    <div slot="footer">
      <button class="btn"
        v-html="$t('txt.close')"
        @click="state.info = false; cookie('w', config[2], true);"
      ></button>
      <button class="btn btn-primary"
        v-html="$t('txt.nevershow')"
        @click="state.info = false; cookie('w', config[2], true, config[3]);"
      ></button>
    </div>
  </modal>
</template>

<script>
import { Modal } from 'uiv';
export default {
  components: {
    Modal,
  },
  data() {
    return {
      config: ['', '', 'modal-info', 604800000],
      /** [title, text, cookie name, cookie duration] */
      state: {
        info: false,
      },
    }
  },
  mounted() {
    this.siteConfig(this.$root.site);

    if (this.config[0] !== '') {
      this.state.info = !this.cookie('r', this.config[2]);
    }
  },
  methods: {
    siteConfig(site) {
      let c = [];
      // Local config
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
            if (/(beta\.framapad)/.test(this.$root.host)) {
              c = [
                'Avertissement',
                `<p>Cette instance de Framapad (<b>beta</b>.framapad.org) est
                instable et ne doit servir que pour des tests.<p>
                <p>Pensez à utiliser régulièrement la fonction d’export pendant vos tests.</p>
                <p>Merci.<br>L’équipe technique</p>`,
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
  },
}
</script>
