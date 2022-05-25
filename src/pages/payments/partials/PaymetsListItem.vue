<template>
  <tr
    v-for="(payment, index) in paymentsList"
    :key="index"
    class="table-row"
  >
    <td class="table-cell table-login">
      {{ payment.login }}
    </td>
    <td class="table-cell table-createDate">
      {{ dataFormatting(payment.createDate) }}
    </td>
    <td class="table-cell table-address">
      {{ payment.address }}
    </td>
    <td class="table-cell table-amount">
      {{ payment.amount }}
    </td>
    <td
      class="table-cell table-status"
      :class="[currentIndex === payment.id ? statusClass: '']"
    >
      <SelectStatus
        v-if="PaymentStatusList"
        :options="PaymentStatusList"
        :value-input="payment.status"
        class="select"
        :data="payment"
        @change-select="changeStatus"
      />
    </td>
  </tr>
</template>

<script>
import moment from 'moment';
import PaymentService from '../../../services/payment.service'
import SelectStatus from "./SelectStatus";
import {mapGetters} from 'vuex';

export default {
  name: "PaymetsListItem",
  components: {
    SelectStatus,
  },
  props: {
    paymentsList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      dateFormat: 'DD.MM.YYYY hh:mm',
      statusClass: '',
      currentIndex: null,
      PaymentStatusList: [
        {
          name: 'Draft',
          status: 0
        },
        {
          name: 'Payment',
          status: 1
        },
        {
          name: 'Waiting',
          status: 2
        },
      ]
    }
  },
  computed: {
    ...mapGetters({
      Notification: 'getNotification',
    }),
  },
  mounted() {
    this.$store.dispatch('getAllPayments');
  },
  methods: {
    dataFormatting(value) {
      return moment(value).format(this.dateFormat);
    },
    setNotification(data) {
      let result = {};

      if (data.name) {
        result = {
          name: data.name,
          value: data.value,
        }
      }
      this.$store.commit('setNotification', result);
    },
    changeStatus(data) {
      this.setNotification({name: 'Update status', value: 'status: ' + data.option.name});
      this.emitter.on('update-notification', () => {
        if (this.Notification.name) {
          PaymentService.changePaymentStatus(data.data.id, data.option.status).then(() => {
            this.currentIndex = data.data.id;
            this.statusClass = 'status-success';
            setTimeout(() => {
              this.statusClass = '';
            }, 3000);
            this.setNotification({});
          }).catch(() => {
            this.statusClass = 'status-error';
            this.setNotification({name: 'Error', value: 'status: ' + data.option.name});
          });
        }
      });
    }
  }
}
</script>

<style lang="scss">
</style>