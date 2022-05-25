<template>
  <div
    class="payModal"
    tabindex="0"
    @keydown.esc="closeModal"
  >
    <div class="payModal-form">
      <div class="payModal-form-head">
        <div class="payModal-form-title">
          Partner pay | {{ PartnerData.login }}
        </div>
        <div class="payModal-form-close">
          <close-icon @click="closeModal" />
        </div>
      </div>
      <div class="payModal-form-inputs">
        <div class="payModal-form-inputs-item">
          <div class="desc">
            Address
          </div>
          <input
            v-model="payData.address"
            type="text"
          >
        </div>
        <div class="payModal-form-inputs-item">
          <div class="desc">
            Amount
          </div>
          <input
            v-model="payData.amount"
            type="text"
          >
        </div>
        <div class="payModal-form-inputs-item">
          <div class="desc">
            Status
          </div>
          <custom-select
            v-if="PaymentStatusList"
            :options="PaymentStatusList"
            :value-input="currentStatus"
            class="select"
            @change-select="changeStatus"
          />
        </div>
      </div>
      <div class="payModal-form-buttons">
        <div
          class="payModal-form-buttons-item cancel"
          @click="closeModal"
        >
          Cancel
        </div>
        <div
          class="payModal-form-buttons-item submit"
          @click="createPay"
        >
          Pay
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "../../../icons/closeIcon";
import CustomSelect from "../../../components/CustomSelect";
import PartnerService from "../../../services/partner.service";
import {mapGetters} from 'vuex';
import {STATUSES} from "../partnerData";

export default {
  name: "PayModal",
  components: {CustomSelect, CloseIcon},
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      payData: {
        address: '',
        amount: '',
        status: '',
        idUser: 0,
      },
      currentStatus: 'Draft',
      PaymentStatusList: STATUSES
    }
  },
  computed: {
    ...mapGetters({
      PartnerData: 'getPartnersStatsData',
    }),
  },
  methods: {
    changeStatus(res) {
      this.payData.status = res.option.status;
    },
    successPopup() {
      this.$store.commit('setSuccess', {
        name: 'Partner pay success',
        value: this.payData,
      });
    },
    errorPopup() {
      this.$store.commit('setError', {
        name: 'Partner pa error',
        value: this.payData,
      });
    },
    createPay() {
      console.log(this.payData);
      this.payData.idUser = this.PartnerData.id;

      PartnerService.createPartnerPayment(this.payData).then(() => {
        this.closeModal();
        this.successPopup();
      }).catch(() => {
        this.errorPopup();
      })
    },
    closeModal() {
      this.$store.commit('setPartnerStatPayData', null);
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/pages/partner-stat/partner-stat-modal";
</style>
