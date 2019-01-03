<template>
  <div class="container ombre">
    <header-component></header-component>
    <h1>Tests</h1>
    <ul>
      <li><a href="/test/home.html">home</a></li>
      <li><a href="/test/index.html">index</a></li>
      <li><a href="/test/index-fixed.html">index fixed</a></li>
      <li><a href="/test/jQuery.html">jQuery</a></li>
      <li><a href="/test/noConflict.html">jQuery noConflict</a></li>
      <li><a href="/test/media.html">media</a></li>
      <li><a href="/test/verbose.html">verbose</a></li>
      <li><a href="/test/verbose-en.html">verbose-en</a></li>
      <li><a href="/test/verbose-fixed.html">verbose fixed</a></li>
      <li><a href="/test/verbose-iframe.html">verbose iframe</a></li>
      <li><a href="/test/verbose-slow.html">verbose slow</a></li>
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
