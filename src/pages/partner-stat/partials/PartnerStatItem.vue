<template>
  <tr
    v-for="(stat, index) in statsList"
    :key="index"
    class="table-row"
  >
    <td class="table-cell table-id">
      {{ stat.id }}
    </td>
    <td class="table-cell table-login">
      {{ stat.login }}
    </td>
    <td class="table-cell table-cnt">
      {{ stat.cnt }}
    </td>
    <td class="table-cell table-profit">
      {{ stat.profit }}
    </td>
    <td class="table-cell table-payments">
      {{ stat.payments }}
    </td>
    <td class="table-cell table-edit">
      <img
        src="../../../assets/img/icons/pay.svg"
        alt=""
        @click="payInfo(stat)"
      >
    </td>
  </tr>
</template>

<script>
export default {
  name: "PartnerStatItem",
  props: {
    statsList: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    this.$store.dispatch('getPartnersStats');
  },
  methods: {
    payInfo(stat) {
      this.$store.commit('setPartnerStatPayData', stat);
    },
  }
}
</script>

<style lang="scss">

</style>
