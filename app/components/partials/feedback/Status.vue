<template>
  <b-badge v-if="status.length > 0" pill :variant="status[0].variant">{{ status.length }}</b-badge>
</template>

<script>
export default {
  created() {
    this.checkStatus();
  },
  data() {
    return {
      state: {
        status: false,
      },
      id: this.$te(`status.${this.$t('site')}`) ? this.$t(`status.${this.$t('site')}`) : '0',
      status: [],
    }
  },
  methods: {
    checkStatus() {
      /* Status */
      if (this.id !== '0' && !this.state.status) {
        fetch(`https://status.framasoft.org/api/v1/components?id=${this.id}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            if (data.data[0].status > 1) { // There is a incident
              const variant = data.data[0].status < 4 ? 'warning' : 'danger';
              this.loadLastIncident(this.id, variant);
            }
            this.state.status = true;
          }).catch(function (err) {
            console.error(err); // eslint-disable-line
          });
      }
      this.loadScheduledIncidents();
      /*
        Bad: status send to
          => b-modal => portal => feedback
        and then imported in faq
      */
      this.$parent.$parent.$parent.status = this.status;
    },
    loadLastIncident(id, variant) {
      fetch(`https://status.framasoft.org/api/v1/incidents?component_id=${id}&sort=id&order=desc`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.data.length > 0) {
            this.status.unshift({
              id: 'incident_0',
              question: data.data[0].name,
              answer: `<p>${data.data[0].message.replace('\r\n', '<br>')}</p>`,
              variant: variant,
            });
          }
        }).catch(function (err) {
          console.error(err); // eslint-disable-line
        });
    },
    loadScheduledIncidents() {
      fetch(`https://status.framasoft.org/api/v1/incidents?component_id=0&sort=id&order=desc`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          for (let i = 0; i < data.data.length; i += 1) {
            if (this.is.before(data.data[i].scheduled_at.replace(/\-/g, '/').substr(0, 10))
              && this.$te(`txt.${this.$t('site')}`)) {
              const reg = new RegExp(`(${this.text(this.$t(`txt.${this.$t('site')}`), 'latin').toLowerCase()})`, 'g');
              const content = this.text(`${data.data[i].message} ${data.data[i].name}`, 'latin').toLowerCase();
              if (reg.test(content)) {
                this.status.unshift({
                  id: `maintenance_${i + 1}`,
                  question: data.data[i].name,
                  answer: `<p>${data.data[i].message.replace('\r\n', '<br>')}</p>`,
                  variant: 'info',
                });
              }
            }
          }
        }).catch(function (err) {
          console.error(err); // eslint-disable-line
        });
    },
  },
}
</script>