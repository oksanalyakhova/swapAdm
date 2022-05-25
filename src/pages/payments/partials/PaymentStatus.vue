<template>
  <div class="status">
    <div
      class="status-item pay"
      :class="currentStatus.cssClass"
    >
      {{ currentStatus.name }}
    </div>
  </div>
</template>

<script>
import {STATUSES} from "../paymentData";

export default {
  name: "PaymentsStatus",
  props: {
    status: {
      type: Number,
      default: null,
    }
  },
  data() {
    return {
      statusList: STATUSES,
      currentStatus: {}
    }
  },
  mounted() {
    this.currentStatus = this.statusList.find((item) => item.status === this.status)
  },
}
</script>

<style lang="scss">
@import "../../../assets/styles/pages/payments/partials/payment-status";
</style>
