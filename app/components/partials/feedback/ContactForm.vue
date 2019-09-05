<template>
  <section id="ffb-contact-form">
    <div v-if="success.status === ''">
      <div class="subtitle"
        v-html="`${$t('feedback.contact')} <b>${$root.txt.soft}</b>`">
      </div>
      <form role="form" action="#" @submit="sendMail">
        <div>
          <!-- Name -->
          <div id="name_wrapper" :class="`form-group ${ok.name}`">
            <div class="input-group">
              <label for="name"
                class="sr-only"
                v-html="`${$t('contact.form.name')} (${$t('contact.form.required')})`">
              </label>
              <span class="input-group-addon" aria-hidden="true">
                <i class="fa fa-user fa-fw fa-lg"></i>
              </span>
              <input id="name"
                v-model="form['your-name']"
                :placeholder="$t('contact.form.name')"
                type="text" required
                size="40"
                class="form-control"
                @focusout="check('name')">
            </div>
          </div>

          <!-- Email -->
          <div id="email_wrapper" :class="`form-group ${ok.email}`">
            <div class="input-group">
              <label for="email"
                class="sr-only"
                v-html="`${$t('contact.form.email')} (${$t('contact.form.required')})`">
              </label>
              <span class="input-group-addon" aria-hidden="true">
                <i class="fa fa-envelope-o fa-fw fa-lg"></i>
              </span>
              <input id="email"
                v-model="form['your-email']"
                :placeholder="$t('contact.form.email')"
                type="email" size="40" required
                class="form-control"
                @focusout="check('email')">
            </div>
            <p v-html="$t('contact.alert.email')" class="alert"></p>
          </div>
        </div>
        <div>
          <!-- Subject -->
          <div id="subject_wrapper" :class="`form-group ${ok.subject}`">
            <div class="input-group">
              <label for="subject"
                class="sr-only"
                v-html="`${$t('contact.form.subject')} (${$t('contact.form.required')})`">
              </label>
              <span class="input-group-addon" aria-hidden="true">
                <i class="fa fa-question fa-fw fa-lg"></i>
              </span>
              <input id="subject"
                v-model="form['your-subject']"
                :placeholder="$t('contact.form.subject')"
                type="text" size="40" required
                class="form-control"
                @focusout="check('subject')">
            </div>
          </div>

          <!-- Concern -->
          <div v-show="section !== 'contact-participate'"
            id="concerne_wrapper"
            :class="`form-group ${ok.concerne}`">
            <div class="input-group" :title="$t('contact.form.concerne')">
              <label for="concerne"
                class="sr-only"
                v-html="`${$t('contact.form.concerne')} (${$t('contact.form.required')})`">
              </label>
              <span class="input-group-addon" aria-hidden="true">
                <i class="fa fa-crosshairs fa-fw fa-lg"></i>
              </span>
              <select id="concerne"
                v-model="form.concerne"
                required
                class="form-control"
                @focusout="check('concerne')">
                <option
                  v-if="!general && section === 'contact-faq'"
                  v-text="this.$root.txt[this.$root.site]"
                  :value="this.$root.txt[this.$root.site]">
                </option>
                <option
                  v-if="section === 'contact-participate'"
                  v-text="'Participer'"
                  :value="'Participer'">
                </option>
                <option v-text="$t('contact.concerne[0]')" value="Annonce d'un événement libre">Annonce d’un événement libre</option>
                <option v-text="$t('contact.concerne[1]')" value="Invitation à un événement">Invitation à un événement</option>
                <option v-text="$t('contact.concerne[2]')" value="Partenariat">Partenariat</option>
                <option v-text="$t('contact.concerne[3]')" value="Contact presse">Contact presse</option>
                <option v-text="$t('contact.concerne[4]')" value="Newsletter">Newsletter</option>
                <option v-text="$t('contact.concerne[5]')" value="Questions sur l'association">Questions sur l’association</option>
                <option v-text="$t('contact.concerne[6]')" value="Prestation / Emploi : réponse ou candidature spontanée">Prestation / Emploi : réponse ou candidature spontanée</option>
              </select>
            </div>
          </div>

          <!-- Message -->
          <div id="message_wrapper" :class="`form-group ${ok.message}`">
            <div class="input-group">
              <label for="message"
                class="sr-only"
                v-html="`${$t('contact.form.message')} (${$t('contact.form.required')})`">
              </label>
              <span class="input-group-addon" aria-hidden="true">
                <i class="fa fa-pencil fa-fw fa-lg"></i>
              </span>
              <textarea id="message"
                v-model="form['your-message']"
                :placeholder="$t('contact.form.message')"
                cols="40" rows="10" required
                class="form-control"
                @focusin="bienveillance = true;"
                @focusout="check('message')">
              </textarea>
              <p v-show="bienveillance"
                class="alert alert-info"
                v-html="$t('contact.alert.kindness', icons)">
              </p>
              <div v-if="section === 'contact-faq'">
                <p v-for="(alert, id) in $t('contact.alert')"
                  v-show="form.concerne === $root.txt[id]"
                  :key="id"
                  class="alert alert-warning"
                  v-html="$t(`contact.alert.${id}`)">
                </p>
                <p class="alert alert-danger" v-html="$t('contact.alert.mdp')"></p>
              </div>
            </div>
          </div>

          <!-- File -->
          <div id="file_wrapper" class="form-group">
            <div class="input-group" :title="`${$t('contact.form.fileHelp')} ${ext.join(', ')}`">
              <label for="file"
                class="sr-only"
                v-html="`${$t('contact.form.file')} (${$t('contact.form.optional')})`">
              </label>
              <span class="input-group-addon" aria-hidden="true">
                <i class="fa fa-paperclip fa-fw fa-lg"></i>
              </span>
              <input ref="file"
                type="file" size="40"
                :accept="ext.join()"
                class="form-control"
                @change="fileUpload()">
            </div>
          </div>
        </div>

        <!-- Submit -->
        <p class="text-center">
          <input :value="$t('contact.form.submit')"
            type="submit"
            class="btn btn-primary">
        </p>
      </form>
    </div>

    <div v-if="success.status === 'mail_sent'" class="confirm">
      <p class="text-center">
        <span class="fa-stack fa-5x">
          <i class="fa fa-circle-thin fa-stack-2x fc_v5"></i>
          <i class="fa fa-stack-1x fa-check fc_v5"></i>
        </span>
      </p>
      <p v-html="$t('contact.alert.sent')" class="alert"></p>
    </div>

    <div v-if="/failed$/.test(success.status)" class="confirm">
      <p class="text-center">
        <span class="fa-stack fa-5x">
          <i class="fa fa-circle-thin fa-stack-2x fc_r5"></i>
          <i class="fa fa-stack-1x fa-times fc_r5"></i>
        </span>
      </p>
      <p v-html="$t('contact.alert.failed')" class="alert"></p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    section: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      bienveillance: false,
      icons: {
        gafam: `
          <i class="fa fa-google" aria-hidden="true" title="Google"></i>
          <i class="fa fa-apple" aria-hidden="true" title="Apple"></i>
          <i class="fa fa-facebook" aria-hidden="true" title="Facebook"></i>
          <i class="fa fa-amazon" aria-hidden="true" title="Amazon"></i>
          <i class="fa fa-windows" aria-hidden="true" title="Microsoft"></i>
          <span class="sr-only">Google, Apple, Facebook, Amazon, Microsoft</span>
        `,
      },
      ext: [
        '.gif', '.png', '.jpg', '.jpeg', '.svg', '.pdf', '.txt', '.doc',
        '.docx', '.pps', '.ppt', '.pptx', '.odt', '.odg', '.odp', '.log',
        '.rtf', '.tex', '.csv', '.xls', '.xslx', '.vcf', '.xml', '.gpx',
        '.css', '.gz'
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
        'your-file': '',
        'your-referrer': document.referrer,
        'your-languages': window.navigator.languages,
      },
      general: !(Object.keys(this.$root.txt).indexOf(this.$root.site) > -1),
      ok: {
        name: '',
        email: '',
        subject: '',
        message: '',
        concerne: '',
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
    section: function (newValue) {
      if (!this.general && newValue === 'contact-faq') {
        this.form.concerne = this.$root.txt[this.$root.site];
      }
      if (newValue === 'contact-participate') {
        this.form.concerne = 'Participer';
      }
    }
  },
  methods: {
    fileUpload(){
      this.form['your-file'] = this.$refs.file.files[0];
    },
    check(input) {
      switch (input) {
        case 'email':
          const email = document.getElementById('email');
          if (email.validity.valueMissing) {
            this.ok.email = ' has-error';
            email.setCustomValidity(this.$i18n.messages[this.$i18n.locale].contact.form.error_empty);
          } else if (email.validity.typeMismatch) {
            this.ok.email = ' has-error';
            email.setCustomValidity(this.$i18n.messages[this.$i18n.locale].contact.form.error_email);
          } else {
            this.ok.email = ' has-success';
            email.setCustomValidity('');
          }
          break;
        default:
          const el = document.getElementById(input);
          if (el.validity.valueMissing) {
            this.ok[input] = ' has-error';
            el.setCustomValidity(this.$i18n.messages[this.$i18n.locale].contact.form.error_empty);
          } else {
            this.ok[input] = ' has-success';
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
        }).then(response => response.json())
          .then((data) => {
            this.success = data;
        }).catch(function (err) {
          console.error(err); // eslint-disable-line
        });
      }
      e.preventDefault();
    }
  }
}
</script>