<template>
  <tr
    v-for="(exchange, index) in exchangesList"
    :key="index"
    class="table-row"
  >
    <td
      ref="startColumn"
      class="table-cell table-buttons"
    >
      <div class="info">
        <div
          v-if="allowStatuses.includes(exchange.status)"
          class="info-refresh"
          @click="recalculateOrder(exchange)"
        >
          <start-icon />
        </div>
        <div
          class="info-deposit"
          @click="exchangeInfo(exchange.id)"
        >
          <info-icon />
        </div>
      </div>
    </td>
    <td
      class="table-cell table-id"
    >
      {{ exchange.id }}
    </td>
    <td class="table-cell table-uid">
      {{ exchange.uid }}
    </td>
    <td class="table-cell table-from">
      {{ exchange.from.name }}
    </td>
    <td class="table-cell table-to">
      {{ exchange.to.name }}
    </td>
    <td class="table-cell table-mode">
      {{ exchange.modeCurs }}
      <span v-if="exchange.modeCurs === null">floating</span>
    </td>
    <td class="table-cell table-amount">
      <div
        class="amountData"
        :class="{'amount-save': exchange.id + 'a' === currentExchangeId}"
      >
        <label :for="'amount' + exchange.id">
          <input
            :id="'amount' + exchange.id"
            v-model="exchange.amount"
            type="number"
            @keydown="amountHandler($event, exchange.id + 'a')"
            @click="amountHandler($event, exchange.id + 'a')"
          >
        </label>
        <span
          class="save"
          @click="updateOrder(exchange)"
        >
          OK
        </span>
      </div>
    </td>
    <td class="table-cell table-userAmount">
      <div
        class="amountData"
        :class="{'amount-save': exchange.id + 'r' === currentExchangeId}"
      >
        <label :for="'amountResult' + exchange.id">
          <input
            :id="'amountResult' + exchange.id"
            v-model="exchange.amountResult"
            type="number"
            @keydown="amountHandler($event, exchange.id + 'r')"
            @click="amountHandler($event, exchange.id + 'r')"
          >

        </label>
        <span
          class="save"
          @click="updateOrder(exchange, false)"
        >
          OK
        </span>
      </div>
    </td>
    <td
      class="table-cell table-ip"
    >
      {{ exchange.ipAddress }}
    </td>
    <td class="table-cell table-login">
      {{ exchange.partnerName }}
    </td>
    <td
      class="table-cell table-partnerProfit"
    >
      {{ dataFormatting(exchange.finishPayment) }}
    </td>
    <td
      class="table-cell table-status"
      :class="[currentIndex === exchange.id ? statusClass: '']"
    >
      <div class="status-btns">
        <SelectStatusExchange
          v-if="ExchangeStatusList"
          :options="ExchangeStatusList"
          :value-input="exchange.status"
          class="select"
          :data="exchange"
          @change-select="changeStatus"
        />
      </div>
    </td>
  </tr>
</template>

<script>
import SelectStatusExchange from "./SelectStatusExchange";
import moment from 'moment';
import OrderService from "../../../services/order.service";
import {mapGetters} from 'vuex';
import {ALLOW_STATUS, STATUSES} from "../exchangeData";
import helperMixin from "../../../mixins/helper.mixin";
import InfoIcon from "../../../icons/infoIcon";
import StartIcon from "../../../icons/startIcon";

export default {
  name: "ExchangesListItem",
  components: {StartIcon, InfoIcon, SelectStatusExchange},
  mixins: [
    helperMixin
  ],
  props: {
    exchangesList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      dateFormat: 'DD.MM.YY hh:mm',
      currentProfit: null,
      currentPartnerProfit: null,
      currentIndex: null,
      currentExchangeId: null,
      statusClass: '',
      allowStatuses: ALLOW_STATUS,
      isRecalcLoader: false,
      ExchangeStatusList: STATUSES,
      scrollPosition: false,
    }
  },
  computed: {
    ...mapGetters({
      Notification: 'getNotification',
    }),
  },
  mounted() {
    this.hideSaveButton();
    this.scrollHandler();
  },
  methods: {
    scrollHandler() {
      const table = document.querySelector('.table-block-table');

      table.addEventListener('scroll', () => {
        const tds = document.querySelectorAll('.table-id');

        tds.forEach((el) => {
          el.classList.add('sticky');

          if (table.scrollLeft < 100) {
            el.classList.remove('sticky');
          }
        });
      });
    },
    inputResize(el) {
      el.target.style.width = (el.target.value.length + 9 ) + 'ch';
    },
    exchangeInfo(exchangeId) {
      OrderService.getOrderAdminById(exchangeId).then((res) => {
        this.$store.commit('setExchangeData', res.data.result);
        this.$router.push({
          path: `/exchanges/${exchangeId}`,
        })
      })
    },
    amountHandler(el, exchangeId) {
      this.inputResize(el);
      this.currentExchangeId = exchangeId;
    },
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
      this.setNotification({name: 'ID ' + data.data.id + ', status has been changed from ' + data.option.name, value: data.option.name});
      this.emitter.on('update-notification', () => {
        if (this.Notification.name) {
          OrderService.updateOrderStatusById(data.data.id, {status: data.option.status}).then(() => {
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
    },
    updateOrder(exchange, isAmount = true) {
      this.currentExchangeId = exchange.id;

      const order = {
        amount: exchange.amount,
        amountResult: exchange.amountResult,
        status: exchange.status,
        partnerFee: exchange.partnerFee,
        companyFee: exchange.companyFee,
      };
      const currentValue = isAmount ? exchange.amount : exchange.amountResult;
      this.setNotification({name: 'Update amount', value: currentValue});
      this.emitter.on('update-notification', () => {
        if (this.Notification.name) {
          OrderService.editOrderById(exchange.id, order).then(() => {
            this.currentExchangeId = null;
            this.currentIndex = exchange.id;
            this.statusClass = 'status-success';
            setTimeout(() => {
              this.statusClass = '';
              this.closeModal();
            }, 3000);
            this.setNotification({});
          }).catch(() => {
            this.statusClass = 'status-error';
            this.setNotification({name: 'Error'});
          });
        }
      });
    },
    closeModal() {
      this.$store.commit('setExchangeData', null);
    },
    recalculateOrder(data) {
      this.setNotification({name: 'Update', value: 'Recalc '});
      this.isRecalcLoader = true;

      OrderService.orderRecalc(data.id).then((res) => {
        setTimeout(() => {
          if (res.data.result === 'OK') {
            this.isRecalcLoader = false;
            this.setNotification({});
          }
        }, 3000);

      }).catch(() => {
        this.setNotification({name: 'Error', value: 'status: '});
      })
    },
    hideSaveButton() {
      document.addEventListener('click', (event) => {
        const el = document.querySelectorAll('.amountData');
        let isEl = false;

        if (el) {
          el.forEach((item) => {
            let isContainsEl = item.contains(event.target);

            if (isContainsEl) {
              isEl = true;
            }
          });
          if (!isEl) {
            this.currentExchangeId = null;
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
</style>
