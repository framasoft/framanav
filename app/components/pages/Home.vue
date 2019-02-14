<template>
  <div class="container ombre">
    <header-component></header-component>
    <h1>Tests</h1>
    <ul>
      <li><a :href="$root['/'] + 'test/home.html'">home</a></li>
      <li><a :href="$root['/'] + 'test/index.html'">index</a></li>
      <li><a :href="$root['/'] + 'test/jQuery.html'">jQuery</a></li>
      <li><a :href="$root['/'] + 'test/verbose.html'">verbose</a></li>
      <li><a :href="$root['/'] + 'test/verbose-en.html'">verbose-en</a></li>
      <li><a :href="$root['/'] + 'test/verbose-fixed.html'">verbose fixed</a></li>
      <li><a :href="$root['/'] + 'test/verbose-iframe.html'">verbose iframe</a></li>
    </ul>
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
