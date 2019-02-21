<template>
  <modal v-model="state.don"
    :title="$t('fnav.modaldon.title')"
    id="modal-soutenir"
    aria-labelledby="modal-soutenirLabel"
    v-if="cfg[1] !== ''"
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
      v-html="$t('fnav.modaldon.desc', { action: $t(cfg[1])})">
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
              v-if="cfg[2] === 'txt.actionBtn.use'"
              v-html="$t('fnav.modaldon.b3', { btn: `${$t(cfg[2])} ${$root.name}`})"
            ></span>
            <span
              v-else
              v-html="$t('fnav.modaldon.b3', { btn: `${$t(cfg[2])}`})"
            ></span>
          </button>
        </p>
        <p class="col-md-6 text-center">
          <button id="modal-dl2"
            class="btn btn-xs btn-default btn-block"
            style="line-height: 36px;"
            @click="state.don = false; storage = [true, 31536000000]"
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
  props: {
    config: {
      type: Array,
      required: true,
    },
    storage: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      cfg: this.config,
      state: {
        don: false,
        donTarget: '#SoutenirFramasoft',
      },
    }
  },
  mounted() {
    if (this.cfg[0] === '') { // Keep local config
      this.siteConfig(this.$root.site);
    }
    if (this.cfg[0] !== '') {
      if (this.storage[0]) {
        // Global cookie send locally
        this.cookie('w', this.cfg[1], true, this.storage[2]);
      }
      this.state.don = !this.cookie('r', 'dondl');
    }
  },
  methods: {
    donClose() {
      this.cookie('w', 'dondl', true, this.storage[1]);
      window.location.href = this.state.donTarget;
    },
    siteConfig(site) {
      switch (site) {
        case 'book':
          this.cfg = ['a[href*="download-monitor/download.php?id="]'];
          break;
        case 'calc':
          if (/accueil\.framacalc\.org/.test(this.$root.host)) {
            this.cfg = ['a[href*="lite.framacalc.org/"]', 'txt.action.use', 'txt.actionBtn.calc'];
          }
          break;
        case 'carte':
          this.cfg = ['a.btn-primary[href*="/map/new/"]', 'txt.action.use', 'txt.actionBtn.map'];
          break;
        case 'date':
          this.cfg = ['a[href*="create_poll.php?"]', 'txt.action.use', 'txt.actionBtn.poll'];
          break;
        case 'dvd':
          this.cfg = ['a[href*="iso.framadvd.org"]'];
          break;
        case 'games':
          this.cfg = ['.play a', 'txt.action.use', 'txt.actionBtn.use'];
          break;
        case 'key':
          this.cfg = ['a[href*="framaclic.org"]'];
          break;
        case 'mindmap':
          if (/framindmap.org\/c\/maps\//.test(this.$root.url)
            && !/\/edit/.test(this.$root.url)) {
            this.cfg = ['onstart', 'txt.action.use', 'txt.actionBtn.use'];
          }
          break;
        case 'pad':
          this.cfg = ['a[href*=".framapad.org/p/"]', 'txt.action.use', 'txt.actionBtn.pad'];
          break;
        case 'vectoriel':
          if (!/svg-editor/.test(this.$root.url)) {
            this.cfg = ['a[href$="svg-editor.html"]', 'txt.action.use', 'txt.actionBtn.img'];
          }
          break;
        default: // all sites with 'onstart' + 'use'
          if (/(bin|link|pack|pic)/.test(site)) {
            this.cfg = ['onstart', 'txt.action.use', 'txt.actionBtn.use'];
          }
          break;
      }
      this.config.forEach((v, i) => {
        if (this.cfg[i] === undefined) { this.cfg[i] = v; }
      });
    }
  },
}
</script>
