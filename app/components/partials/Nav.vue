<template>
  <div id="framanav_container" class="hidden-print" style="'height:42px;" v-show="!inframe">
    <nav class="navbar navbar-default" id="framanav" role="menubar">
      <button type="button"
        class="navbar-toggle text-muted"
        data-toggle="collapse" data-target=".navbar-ex1-collapse">
          n.html.sr(d$.t.toggle),
          n.html.i('fa-bars'),
      </button>
      <div class="nav-container">
        <div class="navbar-header">
          <a class="navbar-brand" :href="data.meta.baseURL">
            <img :src="data['/img/'] + 'logo.png'" alt="" />
            <span class="hidden-sm" v-html="data.meta.framaname"></span>
          </a>
          <a href="#nav-end" id="nav-skip">{{ $t('fnav.txt.skip') }}</a>
        </div>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
          <ul class="nav navbar-nav">
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
   data() {
    return {
      data: this.$i18n.messages.data,
      inframe: window.top.location !== window.self.document.location,
    };
  },
}
</script>
