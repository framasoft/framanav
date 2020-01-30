<template>
  <div>
    <header
      id="f-bin-header"
      role="banner"
      class="f-bs4"
    >
      <a :href="$t('link.bin')">
        <h1 v-html="$t('color.bin')"></h1>
      </a>
      <p
        class="lead"
        v-html="$t('bin.header.lead')"
      ></p>
      <hr
        class="trait"
        role="presentation"
      />
    </header>

    <section
      id="f-bin-presentation"
      class="f-bs4"
    >
      <hr role="presentation" />

      <div class="row">
        <div class="col-md">
          <h2 v-html="$t('bin.help.title')"></h2>
          <icon
            name="question-circle"
            size="3x d-block text-center mb-3"
          />
          <div v-html="$t('bin.help.md')"></div>
        </div>

        <div class="col-md">
          <h2 v-html="$t('bin.software.title')"></h2>
          <icon
            name="cloud"
            size="3x d-block text-center mb-3"
          />
          <div v-html="$t('bin.software.md')"></div>
        </div>

        <div class="col-md">
          <h2 v-html="$t('bin.garden.title')"></h2>
          <icon
            name="leaf"
            size="3x d-block text-center mb-3"
          />

          <div v-html="$t('bin.garden.md')"></div>
          <b-button
            :href="`${$t('link.cloud')}/${$t('cloud.bin')}`"
            variant="outline-success"
          >
            <icon
              name="leaf"
              label="framacloud.org"
            />
          </b-button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  mounted() {
    const html = document.getElementsByTagName('html');
    if (document.getElementById('language')
      && /> français </.test(document.getElementById('language').innerHTML)
      && html[0].getAttribute('lang') !== 'fr') {
      html[0].lang = 'fr';
      this.$i18n.locale = 'fr';
    } else {
      html[0].lang = 'en';
      this.$i18n.locale = 'en';
    }
    const container = document.querySelector('.container.ombre');
    if (container) {
      container
        .insertAdjacentElement('afterbegin', document.getElementById('f-bin-header'));
      container
        .insertAdjacentElement('beforeend', document.getElementById('f-bin-presentation'));
    }
    if (document.getElementById('sendbutton')) {
      document.getElementById('sendbutton').classList.add('btn-primary');
    }
  },
};
</script>
