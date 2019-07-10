<template>
  <div id="fnav">
    <Nav />
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
import Nav from './components/partials/Nav.vue'
export default {
  name: 'fnav',
  components: {
    Nav,
  }
}
</script>
