<template>
  <a
    v-show="btn"
    id="f-backtop"
    href="#"
    :title="$t('txt.backTop')"
    @click.prevent="backTop()"
  >
    <icon
      name="chevron-up fa-inverse"
      size="lg fa-fw"
      :label="$t('txt.backTop')"
      sr-only
    />
  </a>
</template>

<script>
export default {
  data() {
    return {
      btn: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.btn = window.pageYOffset > window.innerHeight;
    });
  },
  methods: {
    backTop() {
      document.body.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style>
#f-backtop {
  position: fixed;
  bottom: 0px;
  right: 42px;
  z-index: 1102;
  height: 26px;
  line-height: 30px;
  border-radius: 26px 26px 0 0;
  padding: 0 20px;
  background-color: #767676 !important;
  opacity: 0.4;
  border: none;
}

#f-backtop i {
  margin: 0 -7px;
}

#f-backtop:hover,
#f-backtop:focus {
  opacity: 1;
}

@media (max-width: 640px) {
  #f-backtop {
    right: 20px;
  }
}

/* Remove "top" links */
#back-to-top[style], /* dio */
#topcontrol[style], /* ~blog, ~book, ~zic */
.scroll-top-wrapper[style] { /* ~listes */
  display: none !important;
}
</style>
