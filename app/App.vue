<template>
  <div id="app">
    <vue-headful
      :title="$t('meta.title')"
    />
    <Nav />
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/partials/Nav.vue'
export default {
  name: 'app',
  components: {
    Nav,
  }
}
</script>
