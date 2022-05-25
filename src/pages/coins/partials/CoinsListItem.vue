<template>
  <tr
    v-for="(coin, index) in coinsList"
    :key="index"
    class="table-row"
  >
    <td class="table-cell table-img">
      <img
        :src="domain + coin.image"
        alt=""
      >
    </td>
    <td class="table-cell table-coin">
      {{ coin.name }}
    </td>
    <td class="table-cell table-coinName ">
      {{ coin.shotName }}
    </td>
    <td class="table-cell table-userFee">
      {{ coin.userFee }}
    </td>
    <td class="table-cell table-priceRound">
      {{ coin.priceRound }}
    </td>
    <td class="table-cell table-tradeRound">
      {{ coin.tradeRound }}
    </td>
    <td class="table-cell table-rating">
      {{ coin.rating }}
    </td>
    <td class="table-cell table-isTrue">
      <img
        v-if="coin.isMemo === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="coin.isMemo === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
    <td class="table-cell table-isTrue">
      <img
        v-if="coin.isActive === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="coin.isActive === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
    <td class="table-cell table-isTrue">
      <img
        v-if="coin.isDeposit === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="coin.isDeposit === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
    <td class="table-cell table-isTrue">
      <img
        v-if="coin.isWithdraw === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="coin.isWithdraw === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
    <td class="table-cell table-edit">
      <div class="info">
        <div
          class="info-edit"
          @click="coinInfo(coin)"
        >
          <img
            src="../../../assets/img/icons/edit-icon.svg"
            alt=""
          >
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
import {MAIN_DOMAIN} from "@/store/config";

export default {
  name: "CoinsListItem",
  props: {
    coinsList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isPopUp: null,
      search: null,
      domain: MAIN_DOMAIN
    }
  },
  methods: {
    coinInfo(coin) {
      this.$store.commit('setCoinData', coin);
    },
  },
}
</script>

<style lang="scss">

</style>
