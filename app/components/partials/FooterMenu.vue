<template>
  <portal
    target-el="#fp-footer"
    target-class="f-bs4"
  >
    <footer
      v-show="$t('inframe') === 'false'"
      id="f-footer"
      class="clearfix d-print-none"
      :style="state.footer"
      role="contentinfo"
    >
      <div class="container">
        <div class="row  mx-2 mx-sm-0">
          <div class="col-md-8">
            <div class="row">
              <nav class="col">
                <h1 v-html="$t('txt.soft')"></h1>
                <ul class="list-unstyled">
                  <li
                    v-for="key in $t('fnav.footer.frama')"
                    :key="key"
                  >
                    <a
                      :href="!$te(`fnav.sites.${key}.link`)
                        ? $t(`link.${key}`)
                        : $t(`fnav.sites.${key}.link`)"
                      v-html="$t(`fnav.sites.${key}.name`)"
                    ></a>
                  </li>
                </ul>
              </nav>
              <nav class="col">
                <h1 v-html="$t('txt.community')"></h1>
                <ul class="list-unstyled">
                  <li>
                    <a
                      :href="$t('link.colibri')"
                      v-text="$t('txt.colibri')"
                    ></a>
                  </li>
                  <li
                    v-for="key in $t('fnav.footer.community')"
                    :key="key"
                  >
                    <a
                      :href="!$te(`fnav.sites.${key}.link`)
                        ? $t(`link.${key}`)
                        : $t(`fnav.sites.${key}.link`)"
                      v-html="$t(`fnav.sites.${key}.name`)"
                    ></a>
                  </li>
                </ul>
              </nav>
              <nav class="col">
                <h1 v-html="$t('Site')"></h1>
                <ul class="list-unstyled">
                  <li
                    v-for="key in $t('fnav.footer.site')"
                    :key="key"
                  >
                    <a
                      :href="!$te(`fnav.sites.${key}.link`)
                        ? $t(`link.${key}`)
                        : $t(`fnav.sites.${key}.link`)"
                      v-html="$t(`fnav.sites.${key}.name`)"
                    ></a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div class="col-md-4">
            <h1 v-html="$t('fnav.cat.follow.name')"></h1>
            <ul class="list-inline">
              <li
                v-for="key in $t('fnav.footer.follow')"
                :key="key"
                v-b-popover:f-footer.top.hover.focus.html="$t(`fnav.sites.${key}.d1`)"
                :class="`list-inline-item fs_${key}`"
                :title="text($t(`fnav.sites.${key}.t1`))"
              >
                <a
                  :href="!$te(`fnav.sites.${key}.link`)
                    ? $t(`link.${key}`)
                    : $t(`fnav.sites.${key}.link`)"
                >
                  <i
                    :class="`fa fa-fw fa-2x ${$t(`icon.${key}`)}`"
                    aria-hidden="true"
                  ></i>
                  <span
                    class="sr-only"
                    v-text="!$te(`fnav.sites.${key}.name`)
                      ? $t(`txt.${key}`)
                      : text($t(`fnav.sites.${key}.name`))"
                  ></span>
                </a>
              </li>
            </ul>
            <h2 v-html="$t('fnav.sites.newsletter.name')"></h2>
            <form
              action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2"
              method="post"
              name="subscribeform"
            >
              <b-input-group
                size="sm"
                class="mb-3"
              >
                <b-form-input
                  name="email"
                  type="email"
                  size="40"
                  :title="$t('txt.typeYourEmail')"
                  :placeholder="$t('txt.yourEmail')"
                />
                <b-input-group-append>
                  <b-button
                    variant="dark"
                    name="subscribe"
                    type="submit"
                    value="subscribe"
                  >
                    <span v-html="$t('txt.subscribe')"></span>
                    <span
                      class="sr-only"
                      v-html="$t('txt.toTheNewsletter')"
                    ></span>
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <input
                name="htmlemail"
                value="1"
                type="hidden"
              />
              <input
                name="list[5]"
                value="signup"
                type="hidden"
              />
              <input
                name="listname[5]"
                value="Newsletter"
                type="hidden"
              />
              <div style="display: none;">
                <input
                  name="VerificationCodeX"
                  size="20"
                  value=""
                  type="text"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  </portal>
</template>

<script>
export default {
  data() {
    return {
      state: {
        footer: 'position: relative',
      },
    };
  },
  created() {
    if (!window.vuefsPrerender) {
      document.querySelector('body')
        .insertAdjacentHTML('beforeend', '<div id="fp-footer" style="display: none"></div>');
    }
  },
  mounted() {
    // Footer position refresh on events
    window.addEventListener('click', this.footerPosition);
    window.addEventListener('load', this.footerPosition);
    window.addEventListener('resize', this.footerPosition);
    window.addEventListener('scroll', this.footerPosition);
  },
  methods: {
    footerPosition() {
      this.state.footer = (document.body.scrollHeight < window.innerHeight)
        ? 'position: absolute'
        : 'position: relative';
      setTimeout(() => { // au cas où une animation redimentionne le body
        this.state.footer = (document.body.scrollHeight < window.innerHeight)
          ? 'position: absolute'
          : 'position: relative';
      }, 800);
    },
  },
};
</script>
