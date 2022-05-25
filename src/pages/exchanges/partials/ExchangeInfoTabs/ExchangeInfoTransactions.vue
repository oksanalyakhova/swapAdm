<template>
  <div
    class="transactions"
  >
    <div
      v-for="(item, index) in data"
      :key="index"
      class="exchange-info-form-inputs-block"
    >
      <div class="exchange-info-form-inputs-block-row">
        <div
          v-if="item.from"
          class="exchange-info-form-inputs-block-item"
        >
          <div class="desc">
            From
          </div>
          <div class="test" />
          <input
            type="text"
            disabled="disabled"
            :placeholder="item.from.name"
          >
        </div>
        <div
          v-if="item.to"
          class="exchange-info-form-inputs-block-item"
        >
          <div class="desc">
            To
          </div>
          <input
            type="text"
            disabled="disabled"
            :placeholder="item.to.name"
          >
        </div>
      </div>
      <div
        v-if="item.amount"
        class="exchange-info-form-inputs-block-item"
      >
        <div class="desc">
          Amount in BTC
        </div>
        <input
          type="text"
          disabled="disabled"
          :placeholder="item.amount"
        >
      </div>
      <div
        v-if="item.price"
        class="exchange-info-form-inputs-block-item"
      >
        <div class="desc">
          Curs
        </div>
        <input
          type="text"
          disabled="disabled"
          :placeholder="item.price"
        >
      </div>
      <div
        v-if="item.id"
        class="exchange-info-form-inputs-block-item"
      >
        <div class="desc">
          Transaction id
        </div>
        <input
          type="text"
          disabled="disabled"
          :placeholder="item.id"
        >
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "ExchangeInfoTransactions",
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