<template>
  <section id="f-fb-faq">
    <!-- Spinner -->
    <div v-if="!state.faq" class="text-center mb-3">
      <b-spinner v-for="n in 3" :key="n"
        type="grow" variant="warning"
        :label="n === 1 ? $t('Loading…') : ''"
        class="mx-1">
      </b-spinner>
    </div>

    <!-- Answers -->
    <div v-else
      :class="`${/^all$/.test(state.toggle) ? 'all' : ''} ${search !== '' ? 'filter' : 'nofilter'}`">

      <div v-if="this.$te(`txt.${this.$t('site')}`)"
        class="subtitle"
        v-html="`${$t('feedback.faq')} <b>${$t(`txt.${$t('site')}`)}</b>`">
      </div>
      <div v-else
        class="subtitle"
        v-html="$t('feedback.mainFaq')">
      </div>

      <b-list-group>
        <b-list-group-item v-for="(item, index) in faq"
          :key="index"
          :active="state.toggle === item.id"
          :variant="item.variant">
          <a v-show="state.toggle === item.id"
            href="#!"
            class="pull-right close"
            aria-hidden="true"
            onclick="return false"
            @click="state.toggle = 'all'">
            ×
          </a>
          <a
            :id="item.id"
            :href="`${$t('link.contact')}/faq/#${item.id}`"
            class="toggle"
            onclick="return false"
            @click="toggleAnswer(item.id)">
          </a>
          <h3 class="list-group-item-heading"
            @click="state.toggle = 'all'"
            v-html="item.question">
          </h3>
          <div class="list-group-item-text" v-html="item.answer">
          </div>
          <p class="text-center mb-0">
            <b-button v-show="state.toggle === item.id"
              variant="light"
              size="sm"
              @click="state.toggle = 'all'"
              v-text="$t('txt.close')">
            </b-button>
          </p>
        </b-list-group-item>
      </b-list-group>
      <p v-if="!state.mainFaq && state.faq && state.toggle === 'all'" class="mb-0 mt-3">
        <b-button block variant="outline-warning text-center"
          @click="addMainFaq()"
          v-html="$t('feedback.more')">
        </b-button>
      </p>
    </div>

    <!-- No answer ? -->
    <div v-show="state.toggle === 'all'" class="no-answer">
      <p v-show="state.faq" v-html="$t('feedback.noanswer')"></p>
      <div class="row">
        <div class="col-6">
          <a :href="$t('link.colibri')"
            class="btn btn-block">
            <span class="fa-stack fa-2x" aria-hidden="true">
              <i class="fa fa-circle fa-stack-2x orange"></i>
              <i class="fa fa-stack-1x fa-comment fa-inverse"></i>
            </span>
            <br>
            <span v-html="$t('feedback.forum')"></span>
          </a>
        </div>
        <div class="col-6">
          <a :href="`${$t('link.contact')}/#${$t('lname')}`"
            class="btn btn-block"
            onclick="return false;"
            @click="showContact()">
            <span class="fa-stack fa-2x" aria-hidden="true">
              <i class="fa fa-circle fa-stack-2x orange"></i>
              <i class="fa fa-stack-1x fa-envelope fa-inverse"></i>
            </span>
            <br>
            <span v-html="`${$t('feedback.contact')} ${$t('color.soft')}`"></span>
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
    },
    search: {
      type: String,
    },
    status: {
      type: Array,
    }
  },
  data() {
    return {
      general: !(Object.keys(this.$t('txt')).indexOf(this.$t('site')) > -1),
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
    },
    search: function (newValue) {
      if (newValue !== '') {
        this.searchUpdate();
      }
    }
  },
  methods: {
    loadFaq() {
      if (!this.state.faq) {
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
                  variant: '',
                }
              }
            }

            /* Site Faq */
            if (!this.general) {
              html = parser.parseFromString(data, "text/html").querySelector(`#${this.text(this.$t(`txt.${this.$t('site')}`), '-L@')}`);
              if (html) {
                for (let i = 1; i < html.children.length; i += 1) { // .list-group-item only (first node is h2)
                  this.faq[i - 1] = {
                    id: html.children[i].querySelector('h3 a').id,
                    question: html.children[i].querySelector('h3 span').innerHTML,
                    answer: html.children[i].querySelector('.list-group-item-text').innerHTML,
                    variant: '',
                  }
                }
              }
            }
            if (this.faq.length === 0) {
              this.faq = this.mainFaq;
              this.state.mainFaq = true;
            }
            if (this.status.length > 0) {
              this.faq = this.status.concat(this.faq);
            }
            this.state.faq = true;
          }).catch(function (err) {
            console.error(err); // eslint-disable-line
          });
      }
    },
    toggleAnswer(id) {
      this.state.toggle = this.state.toggle === 'all' ? id : 'all';
      this.$parent.$parent.$parent.$refs['f-fb-top'].scrollIntoView();
    },
    showContact() {
      this.$parent.$parent.$parent.section = 'contact-faq';
      this.$parent.$parent.$parent.$refs['f-fb-top'].scrollIntoView();
    },
    addMainFaq() {
      this.faq = this.faq.concat(this.mainFaq);
      this.state.mainFaq = true;
    },
    searchUpdate() {
      if (!this.state.mainFaq) { /* search = more results */
        this.addMainFaq();
      }
      this.state.toggle = 'all';

      for (let i = 1; i < this.faq.length; i += 1) {
        const words = this.text(this.search, '-Ll').replace(', ', ',').split(',');
        const reg = new RegExp(`(${words.join('|')})`, 'g');
        const content = this.text(`${this.faq[i].question} ${this.faq[i].answer}`, '-Ll');
        if (reg.test(content)) {
          this.faq[i].variant = `${this.faq[i].variant.replace(/search/g, '')} search`;
        } else {
          this.faq[i].variant = this.faq[i].variant.replace(/search/g, '');
        }
      }
    }
  }
}
</script>