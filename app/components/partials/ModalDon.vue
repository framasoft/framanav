<template>
  <b-modal id="f-modal-soutenir"
    v-model="state.don"
    :static="true"
    :lazy="true"
    :title="$t('fnav.modaldon.title')"
    :cancel-title-html="$t('txt.close')"
    cancel-variant="light"
    :ok-title-html="$t('txt.nevershow')"
    @hidden="donClose()">
    <div v-html="$t('fnav.modaldon.desc', { action: $t(config[1])})"></div>

    <template v-slot:modal-footer>
      <div class="row">
        <div class="col-md-12 mb-3">
          <a target="_blank"
            :href="`${$t('link.soutenir')}?f=modal`"
            class="btn btn-soutenir btn-block">
            <i :class="`fa fa-fw ${$t('icon.soutenir')}`" aria-hidden="true"></i>
            <span v-html="$t('fnav.modaldon.b1')"></span>
            <span class="sr-only" v-html="`(${$t('txt.newWindow')})`"></span>
          </a>
        </div>
        <div class="col pr-2">
          <button
            class="btn btn-sm btn-outline-secondary btn-block"
            @click="state.don = false;">
            <span
              v-if="config[2] === 'txt.actionBtn.use'"
              v-html="$t('fnav.modaldon.b3', { btn: `${$t(config[2])} ${$t('name')}`})"
            ></span>
            <span
              v-else
              v-html="$t('fnav.modaldon.b3', { btn: `${$t(config[2])}`})"
            ></span>
          </button>
        </div>
        <div class="col pl-2">
          <button
            class="btn btn-sm btn-outline-secondary btn-block h-100"
            @click="state.don = false; storage.modal.don = [true, 31536000000];"
            v-html="$t('fnav.modaldon.b4')">
          </button>
        </div>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {

  data() {
    return {
      config: ['', '', '', 604800000],
      /** [querySelector or 'onstart', 'txt.action.*', 'txt.actionBtn.*', cookie duration (7 days)] */
      state: {
        don: false,
        donTarget: '#SoutenirFramasoft',
      },
      storage: this.$t('storage'),
    }
  },
  mounted() {
    this.siteConfig(this.$t('site'));

    if (this.config[0] !== '') {
      if (this.config[0] === 'onstart') {
        this.state.don = !this.cookie('r', this.$t('cookie.don'));
      } else {
        document.querySelectorAll(this.config[0]).forEach(a =>
          a.onclick = (e) => {
            this.state.don = !this.cookie('r', this.$t('cookie.don'));
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
      this.cookie('w', this.$t('cookie.don'), true, this.storage.modal.don[1]);
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
            if (/accueil\.framacalc\.org/.test(this.$t('host'))) {
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
            if (/framindmap.org\/c\/maps\//.test(this.$t('url'))
              && !/\/edit/.test(this.$t('url'))) {
              c = ['onstart', 'txt.action.use', 'txt.actionBtn.use'];
            }
            break;
          case 'pad':
            c = ['a[href*=".framapad.org/p/"]', 'txt.action.use', 'txt.actionBtn.pad'];
            break;
          case 'vectoriel':
            if (!/svg-editor/.test(this.$t('url'))) {
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
