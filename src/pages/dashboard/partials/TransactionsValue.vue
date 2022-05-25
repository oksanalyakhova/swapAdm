<template>
  <div class="transactions_value">
    <div class="transactions_value-block">
      <Chart />
      <div class="transactions_value-chart transactions_value-chart-info">
        <div class="transactions_value-chart-title-block">
          <div class="title">
            Transactions and value
          </div>
        </div>
        <div class="transactions_value-chart-info-table">
          <table class="table">
            <thead>
              <tr class="table-headers">
                <th>
                  <div class="text table-cell-title" />
                </th>
                <th
                  v-for="(th,index) in tableTH"
                  :key="index"
                >
                  <div
                    class="text"
                    :class="th.cssClass"
                  >
                    {{ th.name }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody v-if="Object.keys(StatsList).length">
              <tr class="table-row">
                <td class="table-cell table-cell-title">
                  Operations
                </td>
                <td class="table-cell table-cell-today">
                  {{ StatsList.today.item1 }}
                </td>
                <td class="table-cell table-cell-yesterday">
                  {{ StatsList.yesterday.item1 }}
                </td>
                <td class="table-cell table-cell-week">
                  {{ StatsList.week.item1 }}
                </td>
                <td class="table-cell table-cell-month">
                  {{ StatsList.month.item1 }}
                </td>
                <td class="table-cell table-cell-total">
                  {{ StatsList.year.item1 }}
                </td>
              </tr>
              <tr class="table-row bottom">
                <td class="table-cell table-cell-title">
                  Value
                </td>
                <td class="table-cell table-cell-today">
                  {{ StatsList.today.item2 }}
                  <b> BTC</b>
                </td>
                <td class="table-cell table-cell-yesterday">
                  {{ StatsList.yesterday.item2 }}
                  <b> BTC</b>
                </td>
                <td class="table-cell table-cell-week">
                  {{ StatsList.week.item2 }}
                  <b> BTC</b>
                </td>
                <td class="table-cell table-cell-month">
                  {{ StatsList.month.item2 }}
                  <b> BTC</b>
                </td>
                <td class="table-cell table-cell-total">
                  {{ StatsList.year.item2 }}
                  <b> BTC</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "./Chart";
import {mapGetters} from 'vuex';
import {TRANSACTION_DATES, TRANSACTION_TABLE_TH} from "@/pages/dashboard/dashboardData";

export default {
  name: "TransactionsValue",
  components: {Chart},
  data() {
    return {
      statsData: [],
      originStats: null,
      dates: TRANSACTION_DATES,
      tableTH: TRANSACTION_TABLE_TH,
    }
  },
  computed: {
    ...mapGetters({
      StatsList: 'getStatsAll',
    }),
  },
  mounted() {
    this.$store.dispatch('getStatTotal');
  },
}
</script>

<style lang="scss">
@import "../../../assets/styles/pages/dashboard/_transactions-value.scss";
</style>
