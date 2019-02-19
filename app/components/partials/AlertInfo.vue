<template>
  <alert id="nav-alert"
    :type="config[0]"
    v-if="config[1] !== '' && state.alert"
    dismissible
    @dismissed="state.alert = false; cookie('w', config[2], true, config[3]);">
    <div><p class="text-center" v-html="config[1]"></p></div>
  </alert>
</template>

<script>
import { Alert } from 'uiv';
import { cookie } from '../../tools';
export default {
  components: {
    Alert,
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
        alert: false,
      },
    }
  },
  mounted() {
    if (this.config[1] !== '') {
      this.state.alert = !this.cookie('r', this.config[2]);
    }
  },
  methods: {
    cookie,
  },
}
</script>
