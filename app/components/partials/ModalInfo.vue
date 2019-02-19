<template>
  <modal v-model="state.info"
    :title="config[0]"
    id="modal-finfo"
    aria-labelledby="modal-finfoLabel"
    v-if="config[0] !== ''">
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
import { cookie } from '../../tools';
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
      state: {
        info: false,
      },
    }
  },
  mounted() {
    if (this.config[0] !== '') {
      this.state.info = !this.cookie('r', this.config[2]);
    }
  },
  methods: {
    cookie,
  },
}
</script>
