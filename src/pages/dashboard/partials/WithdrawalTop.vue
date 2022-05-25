<template>
  <div class="rating_list">
    <div class="rating_list-block">
      <div class="rating_list-block-title">
        <div class="title">
          Withdrawal top
        </div>
        <div class="dates">
          <div
            v-for="(item, index) in dates"
            :key="index"
            class="dates-item"
            :class="{active: item.status === 'active'}"
            @click="datesPicker(item.status)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="rating_list-block-table">
        <table class="table">
          <thead>
            <tr class="table-headers">
              <th class="text table-cell-img">
                Coin
              </th>
              <th class="text" />
              <th class="text">
                Operations
              </th>
              <th class="text text-total">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="table-row">
              <td class="table-cell table-cell-img">
                <img
                  src="../../../assets/img/coinimg.png"
                  alt=""
                >
              </td>
              <td class="table-cell table-cell-name">
                CHESS
              </td>
              <td class="table-cell table-cell-operations">
                234
              </td>
              <td class="table-cell table-cell-total">
                1.5678 <b>BTC</b>
              </td>
            </tr>
            <tr class="table-row bottom">
              <td class="table-cell table-cell-img">
                <img
                  src="../../../assets/img/coinimg.png"
                  alt=""
                >
              </td>
              <td class="table-cell table-cell-name">
                BETA
              </td>
              <td class="table-cell table-cell-operations">
                145
              </td>
              <td class="table-cell table-cell-total">
                1.5678 <b>BTC</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "WithdrawalTop",
        data() {
            return {
                dates: [
                    {
                        name: 'Today',
                        key: 'today',
                        status: null
                    },
                    {
                        name: 'Week',
                        key: 'week',
                        status: null
                    },
                    {
                        name: 'Month',
                        key: 'month',
                        status: null
                    },
                    {
                        name: 'Total',
                        key: 'total',
                        status: 'active'
                    }
                ],

            }
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/pages/dashboard/top-list";
</style>