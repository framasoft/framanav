<template>
  <div>
    <header role="banner" id="framabin_header">
      <a :href="$root.link.bin"><h1 v-html="$root.color.bin"></h1></a>
      <p class="lead" v-html="$t('bin.header.lead')"></p>
      <hr class="trait" role="presentation" />
    </header>

    <section  id="framabin_presentation">
      <hr role="presentation" />
      <div class="row">
        <div class="col-md-4" id="tuto-faq">
          <h2 v-html="$t('bin.presentation.h2_1')"></h2>
          <p class="text-center" role="presentation" aria-hidden="true">
            <i class="fa fa-question-circle"></i>
          </p>
          <div id="aboutbox">
            <p v-html="$t('bin.presentation.serviceby')"></p>
            <ol>
              <li v-html="$t('bin.presentation.paste')"></li>
              <li v-html="$t('bin.presentation.config')"></li>
              <li v-html="$t('bin.presentation.share')"></li>
            </ol>
            <p v-html="$t('bin.presentation.crypto')"></p>
          </div>
         </div>
         <div class="col-md-4" id="le-logiciel">
          <h2 v-html="$t('bin.presentation.h2_2')"></h2>
          <p class="text-center" role="presentation" aria-hidden="true">
            <i class="fa fa-cloud"></i>
          </p>
          <p v-html="$t('bin.presentation.framaware')"></p>
          <p v-html="$t('bin.presentation.license')"></p>
          <p v-html="$t('bin.presentation.browsers')"></p>
          <ul>
            <li><a href="http://www.mozilla.org/firefox/">Firefox</a>,</li>
            <li>Opera,</li>
            <li>Chrome,</li>
            <li>Safari…</li>
          </ul>
          <p v-html="$t('bin.presentation.noie')"></p>
         </div>
         <div class="col-md-4" id="jardin">
          <h2 v-html="$t('bin.presentation.h2_3')"></h2>
          <p class="text-center" role="presentation" aria-hidden="true">
            <i class="glyphicon glyphicon-tree-deciduous"></i>
          </p>
          <p v-html="$t('bin.presentation.contrib_upstream')"></p>
          <p v-html="$t('bin.presentation.home_install')"></p>
          <p class="text-center">
            <a href="http://framacloud.org/fr/cultiver-son-jardin/pastebin.html" class="btn btn-success">
              <i class="glyphicon glyphicon-tree-deciduous" aria-hidden="true"></i>
              framacloud.org
            </a>
          </p>
         </div>
       </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    const container = document.querySelector('.container.ombre');
    if (container) {
      container
        .insertBefore(document.getElementById('framabin_header'),
          container.firstChild);
      container
        .appendChild(document.getElementById('framabin_presentation'));
    }
    if (document.getElementById('sendbutton')) {
      document.getElementById('sendbutton').classList.add('btn-primary');
    }
  }
}
</script>
