<template>
  <section id="f-contact-form">
    <div v-if="success.status === ''">
      <div
        class="subtitle"
        v-html="`${$t('feedback.contact')} <b>${$t('txt.soft')}</b>`"
      ></div>

      <b-form @submit="sendMail">
        <div>
          <!-- Name -->
          <b-form-group
            id="f-cf-name-wrapper"
            label-for="f-cf-name"
            label-sr-only
            :label="`${$t('contact.form.name')} (${$t('contact.form.required')})`"
          >
            <b-input-group>
              <b-input-group-prepend>
                <icon
                  name="user"
                  size="lg fa-fw"
                />
              </b-input-group-prepend>
              <b-form-input
                id="f-cf-name"
                v-model="form['your-name']"
                :placeholder="$t('contact.form.name')"
                type="text"
                required
                trim
                :state="ok.name"
                @focusout="check('name')"
              />
            </b-input-group>
          </b-form-group>

          <!-- Email -->
          <b-form-group
            id="f-cf-email-wrapper"
            label-for="f-cf-email"
            label-sr-only
            :label="`${$t('contact.form.email')} (${$t('contact.form.required')})`"
          >
            <b-input-group>
              <b-input-group-prepend>
                <icon
                  name="envelope-o"
                  size="lg fa-fw"
                />
              </b-input-group-prepend>
              <b-form-input
                id="f-cf-email"
                v-model="form['your-email']"
                :placeholder="$t('contact.form.email')"
                type="email"
                required
                trim
                :state="ok.email"
                @focusout="check('email')"
              />
            </b-input-group>
            <p
              class="alert"
              v-html="$t('contact.alert.email')"
            ></p>
          </b-form-group>
        </div>
        <div>
          <!-- Subject -->
          <b-form-group
            id="f-cf-subject-wrapper"
            label-for="f-cf-subject"
            label-sr-only
            :label="`${$t('contact.form.subject')} (${$t('contact.form.required')})`"
          >
            <b-input-group>
              <b-input-group-prepend>
                <icon
                  name="question"
                  size="lg fa-fw"
                />
              </b-input-group-prepend>
              <b-form-input
                id="f-cf-subject"
                v-model="form['your-subject']"
                :placeholder="$t('contact.form.subject')"
                type="text"
                required
                trim
                :state="ok.subject"
                @focusout="check('subject')"
              />
            </b-input-group>
          </b-form-group>

          <!-- Concern -->
          <b-form-group
            v-show="section !== 'contact-participate'"
            id="f-cf-concerne-wrapper"
            label-for="f-cf-concerne"
            label-sr-only
            :label="`${$t('contact.form.concerne')} (${$t('contact.form.required')})`"
          >
            <b-input-group>
              <b-input-group-prepend>
                <icon
                  name="crosshairs"
                  size="lg fa-fw"
                />
              </b-input-group-prepend>
              <b-form-select
                id="f-cf-concerne"
                v-model="form.concerne"
                required
              >
                <option
                  v-if="!general && section === 'contact-faq'"
                  :value="this.$t(`txt.${this.$t('site')}`)"
                  v-text="this.$t(`txt.${this.$t('site')}`)"
                ></option>
                <option
                  v-if="section === 'contact-participate'"
                  :value="'Participer'"
                  v-text="'Participer'"
                ></option>
                <option
                  value="Annonce d'un événement libre"
                  v-text="$t('contact.concerne[0]')"
                ></option>
                <option
                  value="Invitation à un événement"
                  v-text="$t('contact.concerne[1]')"
                ></option>
                <option
                  value="Partenariat"
                  v-text="$t('contact.concerne[2]')"
                ></option>
                <option
                  value="Contact presse"
                  v-text="$t('contact.concerne[3]')"
                ></option>
                <option
                  value="Newsletter"
                  v-text="$t('contact.concerne[4]')"
                ></option>
                <option
                  value="Questions sur l'association"
                  v-text="$t('contact.concerne[5]')"
                ></option>
                <option
                  value="Prestation / Emploi : réponse ou candidature spontanée"
                  v-text="$t('contact.concerne[6]')"
                ></option>
              </b-form-select>
            </b-input-group>
          </b-form-group>

          <!-- Message -->
          <b-form-group
            id="f-cf-message-wrapper"
            label-for="f-cf-message"
            label-sr-only
            :label="`${$t('contact.form.message')} (${$t('contact.form.required')})`"
          >
            <b-input-group>
              <b-input-group-prepend>
                <icon
                  name="pencil"
                  size="lg fa-fw"
                />
              </b-input-group-prepend>
              <b-form-textarea
                id="f-cf-message"
                v-model="form['your-message']"
                :placeholder="$t('contact.form.message')"
                cols="40"
                rows="10"
                required
                @focusin="bienveillance = true"
                @focusout="check('message')"
              />
              <p
                v-show="bienveillance"
                class="alert alert-info"
                v-html="$t('contact.alert.kindness', icons)"
              ></p>
              <div v-if="section === 'contact-faq'">
                <p
                  v-for="(alert, id) in $t('contact.alert')"
                  v-show="form.concerne === $t(`txt.${id}`)"
                  :key="id"
                  class="alert alert-warning"
                  v-html="$t(`contact.alert.${id}`)"
                ></p>
                <p
                  class="alert alert-danger"
                  v-html="$t('contact.alert.mdp')"
                ></p>
              </div>
            </b-input-group>
          </b-form-group>

          <!-- File -->
          <b-form-group
            id="f-cf-file-wrapper"
            label-for="f-cf-file"
            label-sr-only
            :label="`${$t('contact.form.file')} (${$t('contact.form.optional')})`"
          >
            <b-input-group
              :title="`${$t('contact.form.fileHelp')} ${ext.join(', ')}`"
            >
              <b-input-group-prepend>
                <icon
                  name="paperclip"
                  size="lg fa-fw"
                />
              </b-input-group-prepend>
              <b-form-file
                id="f-cf-file"
                v-model="form['your-file']"
                plain
                :accept="ext.join()"
              />
            </b-input-group>
          </b-form-group>
        </div>

        <!-- Submit -->
        <b-button
          type="submit"
          block
          variant="outline-warning text-center mb-3 border border-warning"
          v-html="$t('contact.form.submit')"
        />
      </b-form>
    </div>

    <div
      v-if="success.status === 'mail_sent'"
      class="confirm"
    >
      <p class="text-center">
        <icon
          name="check fc_v5"
          name2="circle-thin fc_v5"
          size="5x"
        />
      </p>
      <p
        class="alert"
        v-html="$t('contact.alert.sent')"
      ></p>
    </div>

    <div
      v-if="/failed$/.test(success.status)"
      class="confirm"
    >
      <p class="text-center">
        <icon
          name="times fc_r5"
          name2="circle-thin fc_r5"
          size="5x"
        />
      </p>
      <p
        class="alert"
        v-html="$t('contact.alert.failed')"
      ></p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      bienveillance: false,
      icons: {
        gafam: `
          <span aria-hidden="true" title="Google, Apple, Facebook, Amazon, Microsoft">
            <i class="fa fa-google"></i>
            <i class="fa fa-apple"></i>
            <i class="fa fa-facebook"></i>
            <i class="fa fa-amazon"></i>
            <i class="fa fa-windows"></i>
          </span>
          <span class="sr-only">Google, Apple, Facebook, Amazon, Microsoft</span>
        `,
      },
      ext: [
        '.gif', '.png', '.jpg', '.jpeg', '.svg', '.pdf', '.txt', '.doc',
        '.docx', '.pps', '.ppt', '.pptx', '.odt', '.odg', '.odp', '.log',
        '.rtf', '.tex', '.csv', '.xls', '.xslx', '.vcf', '.xml', '.gpx',
        '.css', '.gz',
      ],
      form: {
        _wpcf7: '423',
        _wpcf7_version: '5.1.1',
        _wpcf7_locale: 'en_US',
        _wpcf7_unit_tag: 'wpcf7-f423-p5-o1',
        _wpcf7_container_post: '5',
        'g-recaptcha-response': '',
        'mailou-158': '',
        'your-name': '',
        'your-email': '',
        concerne: '',
        'your-subject': '',
        'your-message': '',
        'your-file': null,
        'your-referrer': `${document.referrer};${document.location.href}`,
        'your-languages': window.navigator.languages,
      },
      general: !(Object.keys(this.$t('txt')).indexOf(this.$t('site')) > -1),
      ok: {
        name: null,
        email: null,
        subject: null,
        message: null,
      },
      success: {
        into: '',
        message: '',
        status: '',
      },
      submit: false,
    };
  },
  watch: {
    section(newValue) {
      if (!this.general && newValue === 'contact-faq') {
        this.form.concerne = this.$t(`txt.${this.$t('site')}`);
      }
      if (newValue === 'contact-participate') {
        this.form.concerne = 'Participer';
      }
    },
  },
  methods: {
    check(input) {
      const el = document.getElementById(`f-cf-${input}`);
      switch (input) {
        case 'email':
          if (el.validity.valueMissing) {
            this.ok.email = false;
            el.setCustomValidity(this.$i18n.messages[this.$i18n.locale].contact.form.error_empty);
          } else if (el.validity.typeMismatch) {
            this.ok.email = false;
            el.setCustomValidity(this.$i18n.messages[this.$i18n.locale].contact.form.error_email);
          } else {
            this.ok.email = true;
            el.setCustomValidity('');
          }
          break;
        default:
          if (el.validity.valueMissing) {
            this.ok[input] = false;
            el.setCustomValidity(this.$i18n.messages[this.$i18n.locale].contact.form.error_empty);
          } else {
            this.ok[input] = true;
            el.setCustomValidity('');
          }
          break;
      }
    },
    sendMail(e) {
      if (!this.submit) {
        this.submit = true;
        const sendData = new FormData();
        Object.entries(this.form).map(([key, val]) => sendData.append(key, val));

        fetch('https://contact.framasoft.org/wp-json/contact-form-7/v1/contact-forms/423/feedback', {
          method: 'POST',
          body: sendData,
        }).then(res => res.json())
          .then((data) => { this.success = data; })
          .catch(err => console.error(err)); // eslint-disable-line
      }
      e.preventDefault();
    },
  },
};
</script>
