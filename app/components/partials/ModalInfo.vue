<template>
  <modal v-model="state.info"
    :title="cfg[0]"
    id="modal-finfo"
    aria-labelledby="modal-finfoLabel"
    v-if="cfg[0] !== ''">
    <div slot="header">
      <button type="button" class="close"
        @click="state.info = false; cookie('w', cfg[2], true);">
        <span aria-hidden="true">×</span>
        <span class="sr-only" v-html="$t('txt.close')"></span>
      </button>
      <h1 id="modal-finfoLabel"
        v-html="cfg[0]"
      ></h1>
    </div>

    <div class="clearfix"  id="modal-finfoBody" v-html="cfg[1]"></div>

    <div slot="footer">
      <button class="btn"
        v-html="$t('txt.close')"
        @click="state.info = false; cookie('w', cfg[2], true);"
      ></button>
      <button class="btn btn-primary"
        v-html="$t('txt.nevershow')"
        @click="state.info = false; cookie('w', cfg[2], true, cfg[3]);"
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
        info: false,
      },
    }
  },
  mounted() {
    if (this.cfg[0] === '') { // Keep local config
      this.siteConfig(this.$root.site);
    }
    if (this.cfg[0] !== '') {
      this.state.info = !this.cookie('r', this.cfg[2]);
    }
  },
  methods: {
    siteConfig(site) {
      switch (site) {
        case 'localhost:8080':
          this.cfg = [
            'Fermeture de Framagora', `
            <p>
              Après 15 années d’existence, le forum historique de Framasoft,
              ferme ses portes.
              Pour les nostalgiques et les curieux, il reste toujours possible
              de consulter les discussions mais c’est maintenant le forum
              ${this.$root.html.colibri} qui prend la relève.
            </p>
            <p>
              Nous avions mis en place ${this.$root.html.colibri} en 2015
              pour permettre aux bénévoles souhaitant
              participer aux projets de Framasoft de s’organiser sur un
              forum vierge et moderne. Aujourd’hui, la dynamique est bien là.
            </p>
            <p>
              Nous y avons donc reporté les quelques catégories de Framagora
              qui étaient encore un peu actives&nbsp;:
            <p>
            <ul>
              <li><a href="${this.$root.link.colibri}/c/framasoft-vous/cherche-logiciel-libre-pour">Cherche logiciel libre pour…</a></li>
              <li><a href="${this.$root.link.colibri}/c/framasoft-vous/ask-frama">Questions / réponses</a></li>
              <li><a href="${this.$root.link.colibri}/c/qualite/framakey">Framakey</a></li>
              <li><a href="${this.$root.link.colibri}/c/qualite">Améliorons ensemble les outils Framasoft</a></li>
              <li><a href="${this.$root.link.colibri}/c/framasoft-vous/presentations">Présentation des membres</a></li>
            </ul>
            <p>
              Si vous avez des questions, on se retrouve là-bas… ${this.$root.emoji.wink}
            </p>
            <p class="text-center">
              <a href="${this.$root.link.colibri}" class="btn btn-default">
                <b>https://</b>${this.$root.color.colibri.toLowerCase()}<b>.org</b>
              </a>
            </p>`,
          ];
          break;
        case 'etherpad':
          if (/(beta\.framapad)/.test(this.$root.host)) {
            this.cfg = [
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
      this.config.forEach((v, i) => {
        if (this.cfg[i] === undefined) { this.cfg[i] = v; }
      });
    }
  },
}
</script>
