<template>
  <div
    v-if="exchangeData"
    class="exchange-info"
    tabindex="0"
    @keyup.esc="closeModal"
  >
    <div class="exchange-info-form">
      <div class="exchange-info-form-info">
        <div class="exchange-info-form-info-head">
          <div class="id">
            ID {{ exchangeData.id }}
          </div>
          <div class="status">
            <SelectStatusExchange
              v-if="statuses"
              :options="statuses"
              :value-input="data.status"
              class="select"
              :data="data"
              @change-select="changeStatus"
            />
          </div>
        </div>
        <div class="exchange-info-form-info-block">
          <div class="exchange-info-form-info-block-item">
            <div class="exchange-info-form-info-block-item-main coin">
              <div class="desc">
                From
              </div>
              <div class="data">
                {{ data.from.name }} <span v-if="data.addressFromNetwork">({{ data.addressFromNetwork }})</span>
              </div>
            </div>
            <div class="arrow">
              <arrow-exchange />
            </div>
            <div class="exchange-info-form-info-block-item-main">
              <div class="desc">
                To
              </div>
              <div class="data">
                {{ data.to.name }} <span v-if="data.addressToNetwork">({{ data.addressToNetwork }})</span>
              </div>
            </div>
          </div>
          <div class="exchange-info-form-info-block-item">
            <div class="exchange-info-form-info-block-item-main">
              <div class="desc">
                Curs 1
              </div>
              <div
                class="data"
                @mouseover="currentCurs1 = data.curs1"
                @mouseleave="currentCurs1 = null"
              >
                {{ numbersFormatting(data.curs1) }}
                <transition name="fade">
                  <hover-text
                    v-if="currentCurs1 === data.curs1"
                    :option="data.curs1"
                  />
                </transition>
              </div>
            </div>
            <div class="exchange-info-form-info-block-item-main">
              <div class="desc">
                Curs 2
              </div>
              <div
                class="data"
                @mouseover="currentCurs2 = data.curs2"
                @mouseleave="currentCurs2 = null"
              >
                {{ numbersFormatting(data.curs2) }}
                <transition name="fade">
                  <hover-text
                    v-if="currentCurs2 === data.curs2"
                    :option="data.curs2"
                  />
                </transition>
              </div>
            </div>
          </div>
          <div
            class="exchange-info-form-info-block-item"
          >
            <div class="exchange-info-form-info-block-item-main">
              <div class="desc">
                Amount
              </div>
              <div class="data inputs">
                <input
                  v-model="exchangeData.amount"
                  type="text"
                >
                <!--                {{ data.amount }}-->
              </div>
            </div>
            <div
              v-if="exchangeData.amountHistory"
              class="exchange-info-form-info-block-item-main amount-result"
            >
              <div
                class="desc"
              >
                Amount Result
              </div>
              <div class="data inputs">
                <input
                  v-model="exchangeData.amountResult"
                  type="text"
                >
                <div
                  v-if="exchangeData.amountHistory.length"
                  class="inputs-block"
                  @mouseover="currentAmountResult = exchangeData.amountResult"
                  @mouseleave="currentAmountResult = null"
                >
                  <up-icon-big
                    v-if="isAmountUp"
                    class="desc-icon"
                  />
                  <down-iconbig
                    v-else
                    class="desc-icon"
                  />
                  <transition name="fade">
                    <amount-history
                      v-if="currentAmountResult === exchangeData.amountResult"
                      :options="exchangeData.amountHistory"
                    />
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="exchange-info-form-info-block">
          <div
            v-if="data.addressFrom"
            class="exchange-info-form-info-block-item"
          >
            <div class="exchange-info-form-info-block-item-block">
              <div class="desc">
                Address
              </div>
              <div
                v-if="data.addressFrom !== null"
                class="data address"
                v-clipboard:copy="data.addressFrom"
                v-clipboard:success="onCopyAddress"
                @mouseover="currentAddress = data.addressFrom"
                @mouseleave="currentAddress = null"
              >
                {{ formattingData(data.addressFrom) }}
                <transition name="fade">
                  <hover-text
                    v-if="currentAddress === data.addressFrom && !isMobile()"
                    :option="data.addressFrom"
                  />
                </transition>
              </div>
              <div
                v-if="data.addressFrom === null"
                class="data"
              >
                Empty
              </div>
            </div>
          </div>
          <div
            v-if="data.memoTo"
            class="exchange-info-form-info-block-item"
          >
            <div class="exchange-info-form-info-block-item-block">
              <div class="desc">
                Memo
              </div>
              <div
                v-if="data.memoTo !== null"
                class="data"
                @mouseover="currentMemo = data.memoTo"
                @mouseleave="currentMemo = null"
              >
                {{ formattingData(data.memoTo) }}
                <transition name="fade">
                  <hover-text
                    v-if="currentMemo === data.memoTo"
                    :option="data.memoTo"
                  />
                </transition>
              </div>
              <div
                v-if="data.memoTo === null"
                class="data"
              >
                -
              </div>
            </div>
          </div>
        </div>
        <div class="exchange-info-form-info-block">
          <div
            v-if="data.partnerFee"
            class="exchange-info-form-info-block-item"
          >
            <div class="exchange-info-form-info-block-item-block">
              <div class="desc">
                Partner fee
              </div>
              <div
                class="data"
                @mouseover="currentPartnerFee = data.partnerFee"
                @mouseleave="currentPartnerFee = null"
              >
                {{ numbersFormatting(data.partnerFee) }}
                <transition name="fade">
                  <hover-text
                    v-if="currentPartnerFee === data.partnerFee"
                    :option="data.partnerFee"
                  />
                </transition>
              </div>
            </div>
            <div
              v-if="data.companyFee"
              class="exchange-info-form-info-block-item-block"
            >
              <div class="desc">
                Company fee
              </div>
              <div
                class="data"
                @mouseover="currentCompanyFee = data.companyFee"
                @mouseleave="currentCompanyFee = null"
              >
                {{ numbersFormatting(data.companyFee) }}
                <transition name="fade">
                  <hover-text
                    v-if="currentCompanyFee === data.companyFee"
                    :option="data.companyFee"
                  />
                </transition>
              </div>
            </div>
          </div>
          <div
            v-if="data.partnerName"
            class="exchange-info-form-info-block-item"
          >
            <div class="exchange-info-form-info-block-item-block">
              <div class="desc">
                Partner login
              </div>
              <div class="data">
                {{ data.partnerName }}
              </div>
            </div>
          </div>
          <div
            v-if="exchangeData.amount"
            class="save"
            @click="updateOrder"
          >
            Save changes
          </div>
        </div>
      </div>
      <div class="exchange-info-form-inputs">
        <div class="exchange-info-form-inputs-controls">
          <div
            v-if="exchangeData.deposit"
            class="exchange-info-form-inputs-controls-item"
            :class="{active: tab === 'deposit'}"
            @click="tab = 'deposit'"
          >
            deposit
          </div>
          <div
            v-if="exchangeData.allTransaction.length"
            class="exchange-info-form-inputs-controls-item"
            :class="{active: tab === 'transactions'}"
            @click="tab = 'transactions'"
          >
            transactions
          </div>
          <div
            v-if="exchangeData.withdrawalHistory.length"
            class="exchange-info-form-inputs-controls-item"
            :class="{active: tab === 'withdrawal'}"
            @click="tab = 'withdrawal'"
          >
            withdrawal
          </div>
          <div
            v-if="exchangeData.uuid2"
            class="exchange-info-form-inputs-controls-item"
            :class="{active: tab === 'user'}"
            @click="tab = 'user'"
          >
            User
          </div>
        </div>
        <exchange-info-deposit
          v-if="tab === 'deposit' && exchangeData.deposit"
          :data="exchangeData.deposit"
        />
        <exchange-info-transactions
          v-if="tab === 'transactions'"
          :data="exchangeData.allTransaction"
        />
        <exchange-info-withdrawal
          v-if="tab === 'withdrawal'"
          :data="exchangeData.withdrawalHistory"
        />
        <exchange-info-user
          v-if="tab === 'user'"
          :data="exchangeData"
        />
      </div>
      <div
        class="exchange-info-form-close"
        @click="closeModal"
      >
        <close-icon v-if="!isMobile()" />
        <close-mob v-if="isMobile()" />
      </div>
    </div>
    <CopyNotification
      v-if="isSuccessCopy"
      :text="copyText"
    />
  </div>
</template>

<script>
import CloseIcon from "../../../icons/closeIcon";
import ArrowExchange from "../../../icons/arrowExchange";
import HoverText from "../../coins/partials/hoverText";
import {STATUSES} from "@/pages/exchanges/exchangeData";
import SelectStatusExchange from "./SelectStatusExchange";
import OrderService from "../../../services/order.service";
import {mapGetters} from 'vuex';
import ExchangeInfoDeposit from "./ExchangeInfoTabs/ExchangeInfoDeposit";
import ExchangeInfoTransactions from "./ExchangeInfoTabs/ExchangeInfoTransactions";
import ExchangeInfoWithdrawal from "./ExchangeInfoTabs/ExchangeInfoWithdrawal";
import ExchangeInfoUser from "./ExchangeInfoTabs/ExchangeInfoUser";
import UpIconBig from "../../../icons/UpIconBig";
import DownIconbig from "../../../icons/downIconbig";
import AmountHistory from "./AmountHistory";
import helperMixin from "@/mixins/helper.mixin";
import CloseMob from "@/icons/CloseMob";
import CopyNotification from "@/pages/notification/CopyNotification";

export default {
  name: "ExchangeInfo",
  components: {
    CopyNotification,
    CloseMob,
    AmountHistory,
    DownIconbig,
    UpIconBig,
    ExchangeInfoUser,
    ExchangeInfoWithdrawal,
    ExchangeInfoTransactions, ExchangeInfoDeposit, SelectStatusExchange, HoverText, ArrowExchange, CloseIcon
  },
  mixins: [
    helperMixin
  ],
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      exchangeData: null,
      currentAddress: null,
      currentMemo: null,
      currentCurs1: null,
      currentCurs2: null,
      currentPartnerFee: null,
      currentCompanyFee: null,
      currentAmountResult: null,
      tab: 'deposit',
      statuses: STATUSES,
      statusClass: '',
      currentStatus: {},
      maxTextLength: 30,
      maxNumberLength: 11,
      statusId: null,
      amountResult: '',
      isAmountUp: false,
      copyText: '',
      isSuccessCopy: true,
    }
  },
  computed: {
    ...mapGetters({
      Notification: 'getNotification',
    }),
  },
  mounted() {
    this.exchangeData = this.data;
    this.setCurrentStatus();
    this.statusId = this.currentStatus.status;
    this.tabSelect();
    this.calcAmount();
  },
  methods: {
    onCopyAddress() {
      this.copyText = 'Copied to clipboard!';

      this.isSuccessCopy = true;

      setTimeout(() => {
        this.isSuccessCopy = false
      }, 2000);
    },
    calcAmount() {
      let options = this.exchangeData.amountHistory;

      if (options) {
        let history = options.sort((a, b) => a.createDate - b.createDate);

        history = history.pop();
        if (history) {
          this.isAmountUp = (this.exchangeData.amountResult - history.oldAmount) > 0;
        }
      }
    },
    tabSelect() {
      let deposit = this.exchangeData.deposit;
      let transactions = this.exchangeData.allTransaction.length;
      let withdrawal = this.exchangeData.withdrawalHistory.length;

      if (deposit === null) {
        this.tab = 'transactions';
      }

      if (!transactions) {
        this.tab = 'withdrawal';
      }

      if (!withdrawal) {
        this.tab = 'user';
      }

      return this.tab
    },
    setCurrentStatus() {
      let status = this.data.status;
      const exchangeStatuses = [2, 3, 5, 4];

      if (exchangeStatuses.includes(status)) {
        status = 5;
      }

      this.currentStatus = this.statuses.find((item) => item.status === status)
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
      this.emitter.on('update-notification', () => {
        this.statusId = data.option.status;
      });
    },
    updateOrder() {
      const order = {
        amount: this.exchangeData.amount,
        amountResult: this.exchangeData.amountResult,
        status: this.statusId,
        partnerFee: this.data.partnerFee,
        companyFee: this.data.companyFee,
      };
      this.setNotification({name: 'Update amount'});
      this.emitter.on('update-notification', () => {
        if (this.Notification.name) {
          OrderService.editOrderById(this.data.id, order).then(() => {
            this.currentIndex = this.data.id;
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
      this.$router.push({name: 'Exchanges'})
    },
    formattingData(data) {
      const text = data;

      if (text.length >= this.maxTextLength && !this.isMobile()) {
        return text.slice(0, this.maxTextLength) + '...';
      }

      return text;
    },
    numbersFormatting(data) {
      return data.toFixed(this.maxNumberLength) + '...';
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/pages/exchanges/exchanges-modal";
</style>
