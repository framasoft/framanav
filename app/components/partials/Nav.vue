<template>
  <div id="framanav_container" class="hidden-print" style="'height:42px;" v-show="!inframe">
    <navbar id="framanav" role="menubar">
      <a class="navbar-brand" :href="data.meta.baseURL">
        <img :src="data['/img/'] + 'logo.png'" alt="" />
        <span class="hidden-sm" v-html="data.meta.framaname"></span>
      </a>
      <a href="#nav-end" id="nav-skip">{{ $t('txt.skip') }}</a>
      <template slot="collapse">
        <navbar-nav>
          <dropdown
            ref="dropdown" tag="li"
            :id="'fs_' + key"
            v-for="(cat, key) in $t('fnav.cat')"
            :key="key"
          >
            <a class="dropdown-toggle" role="button">
              {{ cat.name }} <b class="caret"></b>
            </a>
            <template slot="dropdown">
              <li :class="'fs_' + l"
                v-for="(site, l) in cat.sites"
                :key="l">
                <a :href="site.link"
                  v-popover.left.hover-focus="{ title: $t('fnav.cat.' + key + '.sites.' + l + '.t1'), content: $t('fnav.cat.' + key + '.sites.' + l + '.d1') }"
                >
                  <i :class="'fa fa-lg ' + data.fnav.cat[key].sites[l].icon" aria-hidden="true"></i>
                  {{
                    data.fnav.cat[key].sites[l].name
                    ? text(data.fnav.cat[key].sites[l].name)
                    : text($t('fnav.cat.' + key + '.sites.' + l + '.name'))
                  }}
                </a>
              </li>
            </template>
          </dropdown>
          <li id="btn-soutenir" v-show="!benevalo()">
            <a :href="$t('fnav.soutenir.link') + '/?f=nav'"
              class="btn-soutenir"
              v-popover.bottom.hover-focus="{ title: $t('fnav.soutenir.t1'), content: $t('fnav.soutenir.d1') }"
            >
              <i :class="'fa fa-lg ' + data.fnav.soutenir.icon" aria-hidden="true"></i>
              {{ text($t('fnav.soutenir.name')) }}
            </a>
          </li>
          <li id="btn-benevalo" v-show="benevalo()">
            <a :href="$t('fnav.benevalo.link')"
              class="btn-info"
              v-popover.bottom.hover-focus="{ title: $t('fnav.benevalo.t1'), content: $t('fnav.benevalo.d1') }"
            >
              <i :class="'fa fa-lg ' + data.fnav.benevalo.icon" aria-hidden="true"></i>
              {{ text($t('fnav.benevalo.name')) }}
            </a>
          </li>
          <li id="btn-myframa">
            <a :href="myframa"
              class="btn-primary"
              v-popover.bottom.hover-focus="{ title: $t('fnav.myframa.t1'), content: $t('fnav.myframa.d1') }"
              @click="window.open(myframa, 'myframa', 'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1'); return false;"
            >
              <i :class="'fa fa-lg ' + data.fnav.myframa.icon" aria-hidden="true"></i>
              {{ text($t('data.fnav.cat.services.sites.my.name')) }}
            </a>
          </li>
        </navbar-nav>
      </template>
    </navbar>
    <a :href="$t('fnav.soutenir.link') + '/?f=macaron'"
      id="framanav_donation"
      class="hidden-xs">
      <span class="sr-only">{{ text($t('fnav.soutenir.name')) }}</span>
    </a>
    <footer>

    </footer>
  </div>
</template>

<script>
import { Btn, Dropdown, Navbar, NavbarNav, Popover } from 'uiv';
import { text } from '../../tools';
export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover,
  },
  data() {
    return {
      data: this.$i18n.messages.data,
      inframe: window.top.location !== window.self.document.location,
      myframa: 'https://my.framasoft.org',
    };
  },
  mounted() {
    if (!this.inframe) {
      const bookmarkURL = window.location.href;
      const bookmarkTitle = document.title || bookmarkURL;
      this.myframa = [
        'https://my.framasoft.org/?post=', encodeURIComponent(bookmarkURL),
        '&title=', encodeURIComponent(bookmarkTitle),
        '&description=', encodeURIComponent(document.getSelection()),
        '&source=bookmarklet',
      ].join('');
    }
  },
  methods: {
    text(html) {
      return text(html)
    },
    benevalo() {
      const today = Math.floor(new Date().getTime() / 1000);
      const fullMoon = 1453603580; // 24/01/2016 02:46:20
      const moonRev = 2551443; // 29j 12h 44m 3s

      return ((today - fullMoon) % moonRev < 129600
        || (today - fullMoon) % moonRev > moonRev - 129600);
    },
  }
}
</script>
