<template>
  <div
    v-show="$t('inframe') === 'false'"
    id="f-header"
    class="d-print-none"
  >
    <b-navbar
      id="f-navbar"
      toggleable="md"
      style="display: none;"
    >
      <b-navbar-nav>
        <b-navbar-brand :href="$t('link.soft')">
          <img
            :src="`${$t('baseurl')}img/logo.png`"
            alt=""
          />
          <span
            class="d-md-none d-lg-inline"
            v-html="$t('color.soft')"
          ></span>
        </b-navbar-brand>

        <a
          href="#nav-end"
          class="sr-only sr-only-focusable"
          v-html="$t('txt.skip')"
        ></a>
      </b-navbar-nav>

      <b-navbar-toggle target="f-collapse" />

      <b-collapse
        id="f-collapse"
        is-nav
      >
        <b-navbar-nav class="mx-auto">
          <!-- Categories menu -->
          <b-nav-item-dropdown
            v-for="(cat, key) in $t('fnav.cat')"
            :id="`fs_${key}`"
            :key="key"
            :text="cat.name"
          >
            <b-dropdown-header
              v-if="key === 'about'"
              class="dropdown-header"
              v-html="$t('color.soft')"
            />
            <b-dropdown-item
              v-for="(l, index) in $t(`fnav.cat.${key}`)"
              :key="l"
              v-b-popover="popoverConfig(key, l, index)"
              :href="$te(`fnav.sites.${l}.link`) ? $t(`fnav.sites.${l}.link`) : $t(`link.${l}`)"
              target="_blank"
              :class="`fs_${l}`"
              :title="$te(`fnav.sites.${l}.t1`) ? $t(`fnav.sites.${l}.t1`, '-t') : ''"
            >
              <icon
                :name="$t(`icon.${l}`)"
                size="lg fa-fw"
                :label="$te(`fnav.sites.${l}.name`)
                  ? $t(`fnav.sites.${l}.name`, '-t')
                  : $t(`txt.${l}`)"
              />
              <icon
                name="external-link new-window"
                size="lg fa-fw"
                sr-only
                :label="`(${$t('txt.newWindow')})`"
              />
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav>
          <!-- Support button -->
          <b-nav-item
            v-show="!benevalo()"
            id="btn-soutenir"
            v-b-popover:f-nav.bottomleft.hover.focus.html="$t('fnav.soutenir.d1')"
            :href="`${$t('link.soutenir')}/?f=nav`"
            link-classes="btn btn-soutenir"
            target="_blank"
            :title="$t('fnav.soutenir.t1', '-t')"
          >
            <icon
              :name="$t('icon.soutenir')"
              size="lg fa-fw"
              :label="$t('fnav.soutenir.name', '-t')"
            />
          </b-nav-item>

          <!-- Benevalo button -->
          <b-nav-item
            v-show="benevalo()"
            id="btn-benevalo"
            v-b-popover:f-nav.bottomleft.hover.focus.html="$t('fnav.benevalo.d1')"
            :href="$t('link.benevalo')"
            link-classes="btn btn-info"
            target="_blank"
            :title="$t('fnav.benevalo.t1', '-t')"
          >
            <icon
              :name="$t('icon.benevalo')"
              size="lg fa-fw"
              :label="$t('fnav.benevalo.name', '-t')"
            />
          </b-nav-item>

          <!-- MyFrama button -->
          <b-nav-item
            id="btn-myframa"
            v-b-popover:f-nav.bottomleft.hover.focus.html="$t('fnav.myframa.d1')"
            :href="myframa"
            link-classes="btn btn-primary d-md-none d-lg-block"
            :title="$t('fnav.myframa.t1', '-t')"
            @click.prevent="openMyframa()"
            @mouseover="myFramaLabel = $t('txt.my')"
            @mouseout="myFramaLabel = $t('txt.bookmarkThisPage')"
          >
            <icon
              :name="$t('icon.my')"
              size="lg fa-fw"
              :label="myFramaLabel"
            />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myframa: [
        'https://my.framasoft.org/?post=', encodeURIComponent(this.$t('url')),
        '&title=', encodeURIComponent(document.title || this.$t('url')),
        '&description=', encodeURIComponent(document.getSelection()),
        '&source=bookmarklet',
      ].join(''),
      myFramaLabel: this.$t('txt.bookmarkThisPage'),
    };
  },
  methods: {
    benevalo() {
      const today = Math.floor(new Date().getTime() / 1000);
      const fullMoon = 1453603580; // 24/01/2016 02:46:20
      const moonRev = 2551443; // 29j 12h 44m 3s

      return ((today - fullMoon) % moonRev < 129600
        || (today - fullMoon) % moonRev > moonRev - 129600);
    },
    openMyframa() {
      window.open(this.myframa, 'myframa', 'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1');
    },
    popoverConfig(key, l, index) {
      const placement = /(services|about)/.test(key) && !(index % 2) ? 'rightbottom' : 'leftbottom';
      return {
        html: true,
        container: 'f-nav',
        trigger: 'hover focus',
        placement,
        title: this.$t(`fnav.sites.${l}.t1`),
        content: this.$t(`fnav.sites.${l}.d1`),
        disabled: !this.$te(`fnav.sites.${l}.d1`),
        customClass: 'd-none d-md-block',
      };
    },
  },
};
</script>
