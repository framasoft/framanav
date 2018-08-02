<template>
  <div id="framanav_container" class="hidden-print" style="'height:42px;" v-show="!inframe">
    <navbar id="framanav" role="menubar">
      <span slot="brand">
        <a class="navbar-brand" slot="brand" :href="data.meta.baseURL">
          <img :src="data['/img/'] + 'logo.png'" alt="" />
          <span class="hidden-sm" v-html="data.meta.framaname"></span>
        </a>
        <a href="#nav-end" id="nav-skip">{{ $t('txt.skip') }}</a>
      </span>
      <template slot="collapse">
        <navbar-nav>
          <dropdown
            ref="dropdown" tag="li" :id="'fs_' + key"
            v-for="(cat, key) in $t('fnav.cat')" :key="key"
          >
            <a class="dropdown-toggle" role="button">
              {{ cat.name }} <b class="caret"></b>
            </a>
            <template slot="dropdown">
              <li class="dropdown-header" v-if="key === 'about'" v-html="data.meta.framaname"></li>
              <popover tag="li" :class="'fs_' + l"
                :enable="$i18n.messages[$t('lang')].fnav.cat[key].sites[l].t1 ? true : false"
                :placement="((key === 'services' || key === 'about') && !(index % 2)) ? 'left' : 'right'"
                :auto-placement="false" trigger="hover-focus" append-to="#framanav"
                :title="text($t('fnav.cat.' + key + '.sites.' + l + '.t1'))"
                v-for="(site, l, index) in cat.sites" :key="l"
              >
                <a :href="site.link">
                  <i :class="'fa fa-fw fa-lg ' + data.fnav.cat[key].sites[l].icon" aria-hidden="true"></i>
                  {{
                    data.fnav.cat[key].sites[l].name
                    ? text(data.fnav.cat[key].sites[l].name)
                    : text($t('fnav.cat.' + key + '.sites.' + l + '.name'))
                  }}
                  <span class="sr-only">({{ $t('txt.newWindow') }})</span>
                  <i class="fa new-window fa-external-link" aria-hidden="true"></i>
                </a>
                <template slot="popover">
                  <div v-html="$t('fnav.cat.' + key + '.sites.' + l + '.d1')"></div>
                </template>
              </popover>
            </template>
          </dropdown>
          <popover tag="li" id="btn-soutenir" v-show="!benevalo()"
            placement="bottom" trigger="hover-focus" append-to="#framanav"
            :title="text($t('fnav.soutenir.t1'))"
          >
            <a :href="$t('fnav.soutenir.link') + '/?f=nav'" class="btn-soutenir">
              <i :class="'fa fa-fw fa-lg ' + data.fnav.soutenir.icon" aria-hidden="true"></i>
              {{ text($t('fnav.soutenir.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.soutenir.d1')"></div>
            </template>
          </popover>
          <popover tag="li" id="btn-benevalo" v-show="benevalo()"
            placement="bottom" trigger="hover-focus" append-to="#framanav"
            :title="text($t('fnav.benevalo.t1'))"
          >
            <a :href="$t('fnav.benevalo.link')" class="btn-info">
              <i :class="'fa fa-fw fa-lg ' + data.fnav.benevalo.icon" aria-hidden="true"></i>
              {{ text($t('fnav.benevalo.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.benevalo.d1')"></div>
            </template>
          </popover>
          <popover tag="li" id="btn-myframa"
            placement="bottom" trigger="hover-focus" append-to="#framanav"
            :title="text($t('fnav.myframa.t1'))"
          >
            <a :href="myframa" class="btn-primary"
              @click="window.open(myframa, 'myframa', 'menubar=no,height=500,width=600,toolbar=no,scrollbars=yes,status=no,dialog=1'); return false;"
            >
              <i :class="'fa fa-fw fa-lg ' + data.fnav.myframa.icon" aria-hidden="true"></i>
              {{ text($t('data.fnav.cat.services.sites.my.name')) }}
            </a>
            <template slot="popover">
              <div v-html="$t('fnav.myframa.d1')"></div>
            </template>
          </popover>
        </navbar-nav>
      </template>
    </navbar>
    <a :href="$t('fnav.soutenir.link') + '/?f=macaron'"
      id="framanav_donation"
      class="hidden-xs">
      <span class="sr-only">{{ text($t('fnav.soutenir.name')) }}</span>
    </a>
    <footer id="framafooter" class="clearfix hidden-print" role="contentinfo">
      <div class="container">
        <div class="clearfix col-sm-8">
          <nav class="col-xs-4">
            <h1>{{ data.meta.name }}</h1>
            <ul class="list-unstyled">
              <li v-for="key in data.fnav.footer.frama">
                <a
                  :href="$t('fnav.cat.about.sites.' + key + '.link')"
                  v-html="$t('fnav.cat.about.sites.' + key + '.name')"
                ></a>
              </li>
            </ul>
          </nav>
          <nav class="col-xs-4">
            <h1>{{ $t('txt.community') }}</h1>
            <ul class="list-unstyled">
              <li>
                <a :href="data.fnav.cat.follow.sites.colibri.link">
                  {{ text(data.fnav.cat.follow.sites.colibri.name) }}
                </a>
              </li>
              <li v-for="key in data.fnav.footer.community">
                <a
                  :href="$t('fnav.cat.about.sites.' + key + '.link')"
                  v-html="$t('fnav.cat.about.sites.' + key + '.name')"
                ></a>
              </li>
            </ul>
          </nav>
          <nav class="col-xs-4">
            <h1>{{ $t('txt.site') }}</h1>
            <ul class="list-unstyled">
              <li v-for="key in data.fnav.footer.site">
                <a
                  :href="$t('fnav.cat.about.sites.' + key + '.link')"
                  v-html="$t('fnav.cat.about.sites.' + key + '.name')"
                ></a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-sm-4">
          <div class="col-xs-12">
            <h1>{{ $t('fnav.cat.follow.name') }}</h1>
            <ul class="list-inline">
              <popover tag="li" :class="'fs_' + key"
                v-for="key in data.fnav.footer.follow" :key="key"
                placement="top" trigger="hover-focus" append-to="#framanav"
                :title="text($t('fnav.cat.follow.sites.' + key + '.t1'))"
              >
                <a :href="data.fnav.cat.follow.sites[key].link"
                  data-toggle="popover" data-content="Notre compte sur le réseau social libre Diaspora*"
                  data-placement="top"
                  data-original-title="Framasoft sur Diaspora*">
                  <i :class="'fa fa-fw fa-2x ' + data.fnav.cat.follow.sites[key].icon" aria-hidden="true"></i>
                  <span class="sr-only" v-html="$t('fnav.cat.follow.sites.' + key + '.name')"></span>
                </a>
                  <template slot="popover">
                  <div v-html="$t('fnav.cat.follow.sites.' + key + '.d1')"></div>
                </template>
              </popover>
            </ul>
            <h2 v-html="$t('fnav.cat.follow.sites.newsletter.name')"></h2>
            <form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2"
              method="post" name="subscribeform">
              <div class="input-group input-group-sm">
                <input class="form-control" :title="$t('txt.typeYourEmail')" name="email" size="40" :placeholder="$t('txt.yourEmail')" type="text">
                <span class="input-group-btn">
                  <button class="btn btn-default" name="subscribe" type="submit" value="subscribe">
                    {{ $t('txt.subscribe') }}<span class="sr-only"> {{ $t('txt.toTheNewsletter') }}</span>
                  </button>
                </span>
              </div>
              <input name="htmlemail" value="1" type="hidden">
              <input name="list[5]" value="signup" type="hidden">
              <input name="listname[5]" value="Newsletter" type="hidden">
              <div style="display: none;"><input name="VerificationCodeX" size="20" value="" type="text"></div>
            </form>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip } from 'uiv';
import { text } from '../../tools';
export default {
  components: {
    Btn, Dropdown, Navbar, NavbarNav, Popover, Tooltip
  },
  directives: {
    Popover, Tooltip
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
    divider(key) {
      return ([
        'start', 'zic', ' evl', ' dio', 'maestro', ' carte', ' minetest',
        ' news', 'git', 'wiki', ' petitions', ' wikipedia', ' status',
        ' credits'].indexOf(key) > -1);
    }
  }
}
</script>
