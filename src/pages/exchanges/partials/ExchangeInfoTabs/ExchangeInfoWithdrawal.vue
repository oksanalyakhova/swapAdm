<template>
  <div
    class="exchange-info-form-inputs-block"
  >
    <div
      v-for="(item, index) in data"
      :key="index"
      class="withdrawal"
    >
      <div class="exchange-info-form-inputs-block-item">
        <div class="desc">
          Amount
        </div>
        <input
          type="text"
          disabled="disabled"
          :placeholder="item.amountUser"
        >
      </div>
      <div class="exchange-info-form-inputs-block-item">
        <div class="desc">
          Transaction id
        </div>
        <input
          type="text"
          disabled="disabled"
          :placeholder="item.transactionId"
        >
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ExchangeInfoWithdrawal",
        props: {
            data: {
                type: Array,
                default: null,
            },
        },
    }
</script>

<style scoped>

</style>