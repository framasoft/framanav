<template>
  <div class="container ombre">
    <header-component></header-component>
    <h1>{{ $t("home") }}</h1>
  </div>
</template>

<script>
import HeaderComponent from '../partials/Header.vue'

export default {
  components: {
    HeaderComponent,
  }
}
</script>
