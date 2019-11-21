<template>
  <div id="f-nav" class="f-bs4">
    <Nav />
  </div>
</template>

<script>
import Nav from './components/partials/Nav.vue'
export default {
  name: 'f-nav',
  components: {
    Nav,
  },
  data() {
    return {
      i18n: process.env.NODE_ENV === 'development' ? this.$i18n.messages : ''
    }
  },
}
</script>
