<template>
  <section
    id="ffb-faq"
    :class="state.toggle === 'all' ? 'all' : ''">
    <!-- Spinner -->
    <div v-if="!state.faq" class="h4 text-center">
      <i class="fa fa-spinner fa-spin fa-2x fa-fw" aria-hidden="true"></i>
    </div>

    <!-- Answers -->
    <div v-else>

      <div v-if="$root.txt[$root.site] !== undefined"
        v-html="`${$t('feedback.faq')} <b>${$root.txt[$root.site]}</b>`"
        class="subtitle">
      </div>
      <div v-else
        v-html="$t('feedback.mainFaq')"
        class="subtitle">
      </div>

      <div v-for="(item, index) in faq"
        :key="index"
        :class="`list-group-item ${state.toggle === item.id ? 'active' : ''}`">
        <a v-show="state.toggle === item.id"
          href="#!"
          class="pull-right close"
          aria-hidden="true"
          style="margin: -5px -10px 5px 10px"
          onclick="return false"
          @click="state.toggle = 'all'">
          ×
        </a>
        <a
          :id="item.id"
          :href="`${$root.link.contact}/faq/#${item.id}`"
          class="toggle"
          onclick="return false"
          @click="toggleAnswer(item.id)">
        </a>
        <h3 v-html="item.question"
          class="list-group-item-heading">
        </h3>
        <div v-html="item.answer" class="list-group-item-text">
        </div>
        <p class="text-center">
          <a v-show="state.toggle === item.id"
            href="#!"
            v-text="$t('txt.close')"
            class="btn btn-xs btn-default"
            onclick="return false"
            @click="state.toggle = 'all'">
          </a>
        </p>
      </div>
      <p v-if="!state.mainFaq && state.faq">
        <button
          v-html="$t('feedback.more')"
          class="btn btn-default btn-xs btn-block"
          @click="addMainFaq()">
        </button>
      </p>
    </div>

    <!-- No answer ? -->
    <div v-show="state.toggle === 'all'" class="no-answer">
      <p v-show="state.faq" v-html="$t('feedback.noanswer')"></p>
      <div class="row">
        <div class="col-xs-6">
          <a :href="$root.link.colibri"
            class="btn btn-default btn-block">
            <span class="fa-stack fa-2x" aria-hidden="true">
              <i class="fa fa-circle fa-stack-2x fc_o5"></i>
              <i class="fa fa-stack-1x fa-comment fa-inverse"></i>
            </span>
            <br>
            <span v-html="$t('feedback.forum')"></span>
          </a>
        </div>
        <div class="col-xs-6">
          <a :href="`${$root.link.contact}/#${$root.lname}`"
            class="btn btn-default btn-block"
            onclick="return false;"
            @click="showContact()">
            <span class="fa-stack fa-2x" aria-hidden="true">
              <i class="fa fa-circle fa-stack-2x fc_o5"></i>
              <i class="fa fa-stack-1x fa-envelope fa-inverse"></i>
            </span>
            <br>
            <span v-html="`${$t('feedback.contact')} ${$root.color.soft}`"></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      general: !(Object.keys(this.$root.txt).indexOf(this.$root.site) > -1),
      mainFaq: [],
      faq: [],
      state: {
        mainFaq: false,
        faq: false,
        toggle: 'all',
      },
    }
  },
  watch: {
    open: function (newValue) {
      if (newValue) {
        this.loadFaq();
      }
    }
  },
  methods: {
    loadFaq() {
      if (!this.state.faq && this.$parent.section === 'faq') {
        fetch('https://contact.framasoft.org/fr/faq/index.html')
          .then((res) => {
            return res.text();
          })
          .then((data) => {
            const parser = new DOMParser();
            let html = null;

            /* Main Faq */
            html = parser.parseFromString(data, "text/html").querySelector('#autre');
            if (html) {
              for (let i = 1; i < html.children.length; i += 1) { // .list-group-item only (first node is h2)
                this.mainFaq[i - 1] = {
                  id: html.children[i].querySelector('h3 a').id,
                  question: html.children[i].querySelector('h3 span').innerHTML,
                  answer: html.children[i].querySelector('.list-group-item-text').innerHTML,
                }
              }
            }

            /* Site Faq */
            if (!this.general) {
              html = parser.parseFromString(data, "text/html").querySelector(`#${this.text(this.$root.txt[this.$root.site], 'latin sanitize')}`);
              if (html) {
                for (let i = 1; i < html.children.length; i += 1) { // .list-group-item only (first node is h2)
                  this.faq[i - 1] = {
                    id: html.children[i].querySelector('h3 a').id,
                    question: html.children[i].querySelector('h3 span').innerHTML,
                    answer: html.children[i].querySelector('.list-group-item-text').innerHTML,
                  }
                }
              }
            }
            if (this.faq.length === 0) {
              this.faq = this.mainFaq;
              this.state.mainFaq = true;
            }
            this.state.faq = true;
        }).catch(function (err) {
          console.error(err); // eslint-disable-line
        });
      }
    },
    toggleAnswer(id) {
      this.state.toggle = this.state.toggle === 'all' ? id : 'all';
      window.location.href= "#ffb-top";
    },
    showContact() {
      this.$parent.section = 'contact-faq';
      window.location.href= "#ffb-top";
    },
    addMainFaq() {
      this.faq = this.faq.concat(this.mainFaq);
      this.state.mainFaq = true;
    }
  }
}
</script>