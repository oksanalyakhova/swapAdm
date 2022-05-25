<template>
  <div class="transactions_value-chart">
    <div class="transactions_value-chart-title-block">
      <div class="transactions_value-chart-title-block-title">
        Transactions and value
      </div>
      <div class="dates">
        <div
          v-for="(item, index) in dates"
          :key="index"
          class="dates-item"
          :class="{active: item.status === 'active'}"
          @click="filterDate(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="transactions_value-chart-chart">
      <div class="chart">
        <vue-highcharts
          v-if="chartOptions.series[0].data.length"
          :options="chartOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VueHighcharts from 'vue3-highcharts/src/vue3-highcharts';
import moment from 'moment'
import OrderService from "@/services/order.service";
import {TRANSACTION_DATES} from "@/pages/dashboard/dashboardData";
import {CHART_DATA, FILTER_DATA} from "@/pages/dashboard/chartData";

export default {
  name: "Chart",
  components: {
    VueHighcharts,
  },
  props: {
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      moment: moment,
      dates: TRANSACTION_DATES,
      dateFormat: 'YYYY-MM-DD',
      chartDateFormat: 'DD MMM YYYY',
      chartOptions: CHART_DATA,
      filterData: FILTER_DATA,
    }
  },
  mounted() {
    this.generateChartData();
  },
  methods: {
    generateChartData(startDate = this.filterData.year) {
      const date = new Date();
      const start = this.moment(date).subtract(startDate, 'days').format(this.dateFormat);
      const end = this.moment(date).format(this.dateFormat);
      const company = [];
      const partners = [];
      const total = [];
      const dates = [];

      OrderService.orderMainChart('/?start='+ start +'&end='+ end).then((res) => {
        const data = res.data.result;

        data.forEach((item) => {
          dates.push(this.moment(item.day).format(this.chartDateFormat));
          company.push(item.company);
          partners.push(item.partner);
          total.push(item.total);
        });

        this.chartOptions.xAxis.categories = dates;
        this.chartOptions.series[0].data = company;
        this.chartOptions.series[1].data = partners;
        this.chartOptions.series[2].data = total;
      });
    },
    filterDate(item) {
      this.dates = this.dates.map((el) => {
        el.status = item.key === el.key ? 'active' : '';
        return el;
      });

      this.generateChartData(this.getFilterDate(item));
    },
    getFilterDate(item) {
      let result = 360;

      switch (item.key) {
        case 'today':
          result = this.filterData.today;
          break;
        case 'week':
          result = this.filterData.week
          break;
        case 'month':
          result = this.filterData.month
          break;
        case 'total':
          result = this.filterData.total
          break;
      }

      return result;
    }
  }
}
</script>

<style lang="scss">
.chart {
  display: flex;
  width: 100%;

  .vue-highcharts {
    width: 100%;
  }

  @media (max-width: 1079px) {
    padding: 0;
  }

  img {
    width: 100%;
  }
}
</style>
