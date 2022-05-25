<template>
  <div
    class="exchange-info-form-inputs-block"
  >
    <div
      v-if="data.amount"
      class="exchange-info-form-inputs-block-item"
    >
      <div class="desc">
        Amount
      </div>
      <input
        type="text"
        disabled="disabled"
        :placeholder="data.amount"
      >
    </div>
    <div
      v-if="data.coin"
      class="exchange-info-form-inputs-block-item"
    >
      <div class="desc">
        Coin
      </div>
      <input
        type="text"
        disabled="disabled"
        :placeholder="data.coin.name"
      >
    </div>
    <div
      v-if="data.transactionId"
      class="exchange-info-form-inputs-block-item"
    >
      <div class="desc">
        Transaction id
      </div>
      <input
        type="text"
        disabled="disabled"
        :placeholder="data.transactionId"
      >
    </div>
  </div>
</template>

<script>
    export default {
        name: "ExchangeInfoDeposit",
        props: {
            data: {
                type: Object,
                default: null,
            },
        },
    }
</script>

<style scoped>

</style>