<template>
  <modal id="modal-soutenir"
    v-model="state.don"
    :style="(!state.don) ? 'display: none;' : ''"
    :title="$t('fnav.modaldon.title')"
    aria-labelledby="modal-soutenirLabel"
    @hide="donClose();">
    <div slot="header">
      <button type="button" class="close" @click="state.don = false;">
        <span aria-hidden="true">×</span>
        <span class="sr-only" v-html="$t('txt.close')"></span>
      </button>
      <h1 id="modal-soutenirLabel"
        v-html="$t('fnav.modaldon.title')"
      ></h1>
    </div>

    <div class="clearfix" id="modal-soutenirBody"
      v-html="$t('fnav.modaldon.desc', { action: $t(config[1])})">
    </div>

    <div slot="footer">
      <div class="clearfix">
        <p class="col-md-12 text-center">
          <a target="_blank" :href="`${$root.link.soutenir}?f=modal`"
            class="btn btn-soutenir btn-block">
            <i :class="`fa fa-fw ${$root.icon.soutenir}`" aria-hidden="true"></i>
            <span v-html="$t('fnav.modaldon.b1')"></span>
            <span class="sr-only" v-html="`(${$t('txt.newWindow')})`"></span>
          </a>
        </p>
        <p class="col-md-6 text-center">
          <button id="modal-dl"
            :href="state.donTarget"
            class="btn btn-xs btn-default btn-block"
            @click="state.don = false;">
            <span
              v-if="config[2] === 'txt.actionBtn.use'"
              v-html="$t('fnav.modaldon.b3', { btn: `${$t(config[2])} ${$root.name}`})"
            ></span>
            <span
              v-else
              v-html="$t('fnav.modaldon.b3', { btn: `${$t(config[2])}`})"
            ></span>
          </button>
        </p>
        <p class="col-md-6 text-center">
          <button id="modal-dl2"
            class="btn btn-xs btn-default btn-block"
            style="line-height: 36px;"
            @click="state.don = false; storage.modal.don = [true, 31536000000]"
            v-html="$t('fnav.modaldon.b4')">
          </button>
        </p>
      </div>
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
      config: ['', '', '', 604800000],
      /** [querySelector or 'onstart', 'txt.action.*', 'txt.actionBtn.*', cookie duration (7 days)] */
      state: {
        don: false,
        donTarget: '#SoutenirFramasoft',
      },
      storage: this.$root.storage,
    }
  },
  mounted() {
    this.siteConfig(this.$root.site);

    if (this.config[0] !== '') {
      if (this.config[0] === 'onstart') {
        this.state.don = !this.cookie('r', this.$root.cookie.don);
      } else {
        document.querySelectorAll(this.config[0]).forEach(a =>
          a.onclick = (e) => {
            this.state.don = !this.cookie('r', this.$root.cookie.don);
            if (this.state.don) {
              this.state.donTarget = a.href;
              e.preventDefault();
            }
          }
        )
      }
    }
  },
  methods: {
    donClose() {
      this.cookie('w', this.$root.cookie.don, true, this.storage.modal.don[1]);
      this.storage.modal.don = [true, this.storage.modal.don[1]];
      this.globalStorage.minus('o', this.storage);
      window.location.href = this.state.donTarget;
    },
    siteConfig(site) {
      let c = [];
      // Local config
      try {
        if (l$.modal.don.constructor === Array) {
          c = l$.modal.don;
        }
      } catch (e) {
        // continue regardless of error
      }

      // Site config (< Local config)
      if (c[0] === undefined) {
        switch (site) {
          case 'book':
            c = ['a[href*="download-monitor/download.php?id="]'];
            break;
          case 'calc':
            if (/accueil\.framacalc\.org/.test(this.$root.host)) {
              c = ['a[href*="lite.framacalc.org/"]', 'txt.action.use', 'txt.actionBtn.calc'];
            }
            break;
          case 'carte':
            c = ['a.btn-primary[href*="/map/new/"]', 'txt.action.use', 'txt.actionBtn.map'];
            break;
          case 'date':
            c = ['a[href*="create_poll.php?"]', 'txt.action.use', 'txt.actionBtn.poll'];
            break;
          case 'dvd':
            c = ['a[href*="iso.framadvd.org"]'];
            break;
          case 'games':
            c = ['.play a', 'txt.action.use', 'txt.actionBtn.use'];
            break;
          case 'key':
            c = ['a[href*="framaclic.org"]'];
            break;
          case 'mindmap':
            if (/framindmap.org\/c\/maps\//.test(this.$root.url)
              && !/\/edit/.test(this.$root.url)) {
              c = ['onstart', 'txt.action.use', 'txt.actionBtn.use'];
            }
            break;
          case 'pad':
            c = ['a[href*=".framapad.org/p/"]', 'txt.action.use', 'txt.actionBtn.pad'];
            break;
          case 'vectoriel':
            if (!/svg-editor/.test(this.$root.url)) {
              c = ['a[href$="svg-editor.html"]', 'txt.action.use', 'txt.actionBtn.img'];
            }
            break;
          default: // all sites with 'onstart' + 'use'
            if (/(bin|link|pack|pic)/.test(site)) {
              c = ['onstart', 'txt.action.use', 'txt.actionBtn.use'];
            }
            break;
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
