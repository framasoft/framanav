<template>
  <portal target-el="#ffooter">
    <footer id="framafooter"
      class="clearfix hidden-print"
      :style="state.footer"
      role="contentinfo"
      v-show="!$root.inframe">
      <div class="container">
        <div class="clearfix col-sm-8">
          <nav class="col-xs-4">
            <h1 v-html="$root.txt.soft"></h1>
            <ul class="list-unstyled">
              <li v-for="key in $root.fnav.footer.frama">
                <a
                  :href="/^fnav/.test($t(`fnav.sites.${key}.link`)) ? $root.link[key] : $t(`fnav.sites.${key}.link`)"
                  v-html="$t(`fnav.sites.${key}.name`)"
                ></a>
              </li>
            </ul>
          </nav>
          <nav class="col-xs-4">
            <h1>{{ $t('txt.community') }}</h1>
            <ul class="list-unstyled">
              <li>
                <a :href="$root.link.colibri">
                  {{ text($root.txt.colibri) }}
                </a>
              </li>
              <li v-for="key in $root.fnav.footer.community">
                <a
                  :href="/^fnav/.test($t(`fnav.sites.${key}.link`)) ? $root.link[key] : $t(`fnav.sites.${key}.link`)"
                  v-html="$t(`fnav.sites.${key}.name`)"
                ></a>
              </li>
            </ul>
          </nav>
          <nav class="col-xs-4">
            <h1 v-html="$t('txt.site')"></h1>
            <ul class="list-unstyled">
              <li v-for="key in $root.fnav.footer.site">
                <a
                  :href="/^fnav/.test($t(`fnav.sites.${key}.link`)) ? $root.link[key] : $t(`fnav.sites.${key}.link`)"
                  v-html="$t(`fnav.sites.${key}.name`)"
                ></a>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-sm-4">
          <div class="col-xs-12">
            <h1 v-html="$t('fnav.cat.follow.name')"></h1>
            <ul class="list-inline">
              <popover tag="li" :class="`fs_${key}`"
                v-for="key in $root.fnav.footer.follow" :key="key"
                placement="top" trigger="hover-focus" append-to="#framanav"
                :title="text($t(`fnav.sites.${key}.t1`))"
              >
                <a :href="/^fnav/.test($t(`fnav.sites.${key}.link`)) ? $root.link[key] : $t(`fnav.sites.${key}.link`)">
                  <i :class="`fa fa-fw fa-2x ${$root.icon[key]}`" aria-hidden="true"></i>
                  <span class="sr-only">{{
                    /^fnav/.test($t(`fnav.sites.${key}.name`))
                    ? $root.txt[key]
                    : text($t(`fnav.sites.${key}.name`)) }}</span>
                </a>
                  <template slot="popover">
                  <div v-html="$t(`fnav.sites.${key}.d1`)"></div>
                </template>
              </popover>
            </ul>
            <h2 v-html="$t('fnav.sites.newsletter.name')"></h2>
            <form action="https://contact.framasoft.org/php_list/lists/?p=subscribe&amp;id=2"
              method="post" name="subscribeform">
              <div class="input-group input-group-sm">
                <input class="form-control" :title="$t('txt.typeYourEmail')" name="email" size="40" :placeholder="$t('txt.yourEmail')" type="text">
                <span class="input-group-btn">
                  <button class="btn btn-default" name="subscribe" type="submit" value="subscribe">
                    {{ $t('txt.subscribe') }}<span class="sr-only" v-html="$t('txt.toTheNewsletter')"></span>
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
  </portal>
</template>

<script>
import { Popover, Tooltip } from 'uiv';
export default {
  components: {
    Popover, Tooltip,
  },
  created() {
    // Footer
    if (!window.vuefsPrerender) {
      const ffooter = document.createElement('div');
      Object.assign(ffooter, {
        id: 'ffooter',
        style: 'display: none;',
      });
      document.getElementsByTagName('body')[0].appendChild(ffooter);
    }
  },
  data() {
    return {
      state: {
        footer: 'position: relative',
      }
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
      this.state.footer = (document.body.scrollHeight < window.innerHeight )
        ? 'position: absolute'
        : 'position: relative';
      setTimeout(() => { // au cas où une animation redimentionne le body
        this.state.footer = (document.body.scrollHeight < window.innerHeight )
          ? 'position: absolute'
          : 'position: relative';
      }, 800);
    },
  },
}
</script>
