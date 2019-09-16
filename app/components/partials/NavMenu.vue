<template>
  <div id="framanav_container"
    v-show="!$root.inframe"
    class="hidden-print"
    style="height:42px;">
    <navbar id="framanav" style="display: none;" role="menubar">
      <span slot="brand">
        <a class="navbar-brand" slot="brand" :href="$root.link.soft">
          <img :src="`${$root.baseurl}img/logo.png`" alt="" />
          <span class="hidden-sm" v-html="$root.color.soft"></span>
        </a>
        <a href="#nav-end" id="nav-skip" v-html="$t('txt.skip')"></a>
      </span>
      <template slot="collapse">
        <navbar-nav>
          <dropdown :id="`fs_${key}`"
            ref="dropdown" tag="li"
            v-for="(cat, key) in $t('fnav.cat')" :key="key"
          >
            <a class="dropdown-toggle" role="button">
              {{ cat.name }} <b class="caret"></b>
            </a>
            <template slot="dropdown">
              <li v-if="key === 'about'" class="dropdown-header" v-html="$root.color.soft"></li>
              <popover
                v-for="(l, index) in $root.fnav.cat[key]" :key="l"
                tag="li" :class="`fs_${l}`"
                :enable="!/^fnav/.test($t(`fnav.sites.${l}.t1`))"
                :placement="/(services|about)/.test(key) && !(index % 2) ? 'right' : 'left'"
                :auto-placement="false" trigger="hover-focus" append-to="#framanav"
                :title="text($t(`fnav.sites.${l}.t1`))">
                <a :href="/^fnav/.test($t(`fnav.sites.${l}.link`)) ? $root.link[l] : $t(`fnav.sites.${l}.link`)"
                  target="_blank">
                  <i :class="`fa fa-fw fa-lg ${$root.icon[l]}`" aria-hidden="true"></i>
                  <span
                    v-if="/^fnav/.test($t(`fnav.sites.${l}.name`))"
                    v-text="$root.txt[l]">
                  </span>
                  <span
                    v-else
                    v-text="text($t(`fnav.sites.${l}.name`))">
                  </span>
                  <span class="sr-only" v-html="`(${$t('txt.newWindow')})`"></span>
                  <i class="fa new-window fa-external-link" aria-hidden="true"></i>
                </a>
                <template slot="popover">
                  <div v-html="$t(`fnav.sites.${l}.d1`)"></div>
                </template>
              </popover>
            </template>
          </dropdown>
          <popover
            v-show="!benevalo()"
            id="btn-soutenir"
            tag="li"
            placement="bottom"
            trigger="hover-focus"
            append-to="#framanav"
            :title="text($t('fnav.soutenir.t1'))">
            <a :href="`${$root.link.soutenir}/?f=nav`" class="btn-soutenir">
              <i :class="`fa fa-fw fa-lg ${$root.icon.soutenir}`" aria-hidden="true"></i>
              {{ text($t('fnav.soutenir.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.soutenir.d1')"></div>
            </template>
          </popover>
          <popover
            v-show="benevalo()"
            id="btn-benevalo"
            tag="li"
            placement="bottom"
            trigger="hover-focus"
            append-to="#framanav"
            :title="text($t('fnav.benevalo.t1'))">
            <a :href="$root.link.benevalo" class="btn-info">
              <i :class="`fa fa-fw fa-lg ${$root.icon.benevalo}`" aria-hidden="true"></i>
              {{ text($t('fnav.benevalo.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.benevalo.d1')"></div>
            </template>
          </popover>
          <popover
            id="btn-myframa"
            tag="li"
            placement="bottom"
            trigger="hover-focus"
            append-to="#framanav"
            :title="text($t('fnav.myframa.t1'))">
            <a
              :href="myframa"
              class="btn-primary"
              @click.prevent="openMyframa()"
              @mouseover="myFramaLabel = $root.txt.my"
              @mouseout="myFramaLabel = $t('txt.bookmarkThisPage')">
              <i :class="`fa fa-fw fa-lg ${$root.icon.my}`" aria-hidden="true"></i>
              <span v-html="myFramaLabel"></span>
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.myframa.d1')"></div>
            </template>
          </popover>
        </navbar-nav>
      </template>
    </navbar>
  </div>
</template>

<script>
import { Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip} from 'uiv';

export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip,
  },
  directives: {
    Popover, Tooltip
  },
  data() {
    return {
      myframa: [
          'https://my.framasoft.org/?post=', encodeURIComponent(this.$root.url),
          '&title=', encodeURIComponent(document.title || this.$root.url),
          '&description=', encodeURIComponent(document.getSelection()),
          '&source=bookmarklet',
        ].join(''),
      myFramaLabel: this.$t('txt.bookmarkThisPage'),
    }
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
    divider(key) {
      return ([
        'start', 'zic', ' evl', ' dio', 'maestro', ' carte', ' minetest',
        ' news', 'git', 'wiki', ' petitions', ' wikipedia', ' status',
        ' credits'].indexOf(key) > -1);
    },
  }
}
</script>
