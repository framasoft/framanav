<template>
  <portal
    target-el="#fp-alert-deframa"
    target-class="f-bs4"
  >
    <b-alert
      v-for="key in Object.keys($t('deframa'))"
      id="f-alert-deframa"
      :key="key"
      :show="state.alert && $t('site') === key && is.after($t(`deframa.${key}[0]`))"
      variant="warning"
      dismissible
      :dismiss-label="$t('txt.close')"
      @dismissed="state.alert = false; cookie('w', 'f-alert-deframa', true, 604800000);"
    >
      <div>
        <p
          v-html="$t('deframa.alert', {
            service: $t(`color.${key}`),
            date: date($t(`deframa.${key}[1]`)),
            link: `https://alt.framasoft.org/fr/${$t(`txt.${key}`, '-l')}`
          })"
        ></p>
      </div>
    </b-alert>
  </portal>
</template>

<script>
export default {
  data() {
    return {
      state: {
        alert: false,
      },
    };
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('#f-nav')
        .insertAdjacentHTML('beforebegin', '<div id="fp-alert-deframa"></div>');
    }
  },
  mounted() {
    this.state.alert = !this.cookie('r', 'f-alert-deframa');
  },
  methods: {
    date(date) {
      return new Date(date).toLocaleDateString(this.$t('lang'), {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
</script>
