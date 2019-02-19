<template>
  <modal v-model="state.faq"
    :title="`${$t('fnav.sites.faq.name')} ${name}`"
    id="modal-fsFAQ"
    aria-labelledby="modal-fsFAQLabel"
    ><!-- v-show="this.$root.f.faq.l.indexOf(this.lname) > -1" -->
    <div slot="header">
      <button type="button" class="close" @click="state.faq = false;">
        <span aria-hidden="true">×</span>
        <span class="sr-only" v-html="$t('txt.close')"></span>
      </button>
      <h1 id="modal-fsFAQLabel" v-html="`${$t('fnav.sites.faq.name')} ${name}`"></h1>
    </div>

    <div class="clearfix" id="modal-fsFAQBody">
      <!--
        Import from
        https://contact.framasoft.org/foire-aux-questions/ #this.lname  .list-group-item
      -->
    </div>

    <div slot="footer">
      <span class="pull-left">{{ $t('another-question') }}
        <a :href="$t('f.contact.l')" v-html="$t('contact-us')"></a>
      </span>
      <button class="btn"
        v-html="$t('txt.close')"
        @click="state.faq = false;"
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
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      state: {
        faq: false,
      },
    }
  },
  methods: {
    cookie,
  },
}
</script>
