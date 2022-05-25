<template>
  <tr
    v-for="(network, index) in coinNetworkList"
    :key="index"
    class="chains-block-table-row"
  >
    <td class="table-cell name">
      {{ network.name }}
    </td>
    <td class="table-cell isActive">
      <Toggle v-model="network.isActive" />
    </td>
    <td class="table-cell isDefault">
      <Toggle v-model="network.isDefault" />
    </td>
    <td class="table-cell isDeposit">
      <img
        v-if="network.isDeposit === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="network.isDeposit === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
    <td class="table-cell isMemo">
      <img
        v-if="network.isMemo === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="network.isMemo === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
    <td class="table-cell isWithdraw">
      <img
        v-if="network.isWithdraw === true"
        src="../../../assets/img/icons/true.svg"
        alt=""
      >
      <img
        v-if="network.isWithdraw === false"
        src="../../../assets/img/icons/false.svg"
        alt=""
      >
    </td>
  </tr>
</template>

<script>
import Toggle from '@vueform/toggle'
import CoinsService from '../../../services/coins.service'

export default {
  name: "ChainsList",
  components: {Toggle},
  props: {
    coinNetworkList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isActive: true,
      isDefault: false,
    }
  },
  methods: {
    changeCoinInfo() {
      const id = this.coinData.id;
      delete this.coinData.id;

      CoinsService.editCoin(id, this.coinData).then(() => {
        this.closePopup();
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@vueform/toggle/themes/default.css";
@import "../../../assets/styles/pages/coins/chains";
</style>