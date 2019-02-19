<template>
  <modal v-model="state.don"
    :title="$t('fnav.modaldon.title')"
    id="modal-soutenir"
    aria-labelledby="modal-soutenirLabel"
    v-if="config[1] !== ''"
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
      v-html="$t('fnav.modaldon.desc').replace('%modal.don[1]%', $t(config[1]))">
    </div>

    <div slot="footer">
      <div class="clearfix">
        <p class="col-md-12 text-center">
          <a target="_blank" :href="`${$root.link.soutenir}?f=modal`"
            class="btn btn-soutenir btn-block">
            <i :class="'fa fa-fw ' + $root.icon.soutenir" aria-hidden="true"></i>
            <span v-html="$t('fnav.modaldon.b1')"></span>
            <span class="sr-only" v-html="'(' + $t('txt.newWindow') + ')'"></span>
          </a>
        </p>
        <p class="col-md-6 text-center">
          <button id="modal-dl"
            :href="state.donTarget"
            class="btn btn-xs btn-default btn-block"
            @click="state.don = false;">
            <span
              v-if="config[2] === 'txt.actionBtn.use'"
              v-html="$t('fnav.modaldon.b3').replace('%modal.don[2]%', `${$t(config[2])} ${name}`)"
            ></span>
            <span
              v-else
              v-html="$t('fnav.modaldon.b3').replace('%modal.don[2]%', $t(config[2]))"
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
import { cookie } from '../../tools';
export default {
  components: {
    Modal,
  },
  props: {
    name: {
      type: String,
    },
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
      state: {
        don: false,
        donTarget: '#SoutenirFramasoft',
      },
    }
  },
  mounted() {
    if (this.config[0] !== '') {
      if (this.storage[0]) {
        // Global cookie send locally
        this.cookie('w', this.config[1], true, this.storage[2]);
      }
      this.state.don = !this.cookie('r', 'dondl');
    }
  },
  methods: {
    cookie,
    donClose() {
      this.cookie('w', 'dondl', true, this.storage[1]);
      window.location.href= this.state.donTarget;
    },
  },
}
</script>
