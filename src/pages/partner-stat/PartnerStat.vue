<template>
  <AccountLayout>
    <template #title>
      <h2>Partner stat</h2>
    </template>
    <template #content>
      <div class="partnerStat main-block">
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              Partner stat
            </div>
          </div>
          <div class="table-block-table">
            <table class="table">
              <thead>
                <tr class="table-headers">
                  <th
                    v-for="(item, index) in tableTh"
                    :key="index"
                    scope="col"
                    :class="{'table-id': item.key === 'id', 'table-status': item.key === 'status'}"
                  >
                    <div
                      class="text"
                      @click="sortData(item)"
                      @mouseover="currentIndex = index"
                      @mouseleave="currentIndex = null"
                    >
                      {{ item.name }}
                      <sort-passive v-if="!item.sort" />
                      <sort-a-z v-if="item.sort === 'asc'" />
                      <sort-z-a v-if="item.sort === 'desc'" />
                      <transition name="fade">
                        <hover-text
                          v-if="currentIndex === index && item.description !== null"
                          :option="item.description"
                        />
                      </transition>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <PartnerStatItem
                  v-if="partnerStatsData.length"
                  :stats-list="partnerStatsData"
                />
              </tbody>
            </table>
          </div>
        </div>
        <custom-pagination
          v-if="partnerStatsData.length"
          :total="batch.length"
          :current="partnerStatsData.length"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
      </div>
      <PayModal
        v-if="PartnersStatsData"
        :data="PartnersStatsData"
      />
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import SortPassive from "../../icons/sorting/sort-passive";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortZA from "../../icons/sorting/sort-z-a";
import HoverText from "../coins/partials/hoverText";
import PartnerStatItem from "./partials/PartnerStatItem";
import filterMixin from "../../mixins/filter.mixin";
import helperMixin from "../../mixins/helper.mixin";
import PayModal from "./partials/PayModal";
import {mapGetters} from 'vuex';
import {TABLE_TH} from "./partnerData";
import CustomPagination from "@/components/Pagination";

export default {
  name: "PartnerStat",
  components: {
    CustomPagination,
    PayModal,
    PartnerStatItem,
    HoverText,
    SortZA,
    SortAZ,
    SortPassive,
    AccountLayout,
  },
  mixins: [
    filterMixin,
    helperMixin
  ],
  data() {
    return {
      search: null,
      originPartnerStats: null,
      isLoginSearch: false,
      searchList: [],
      searchListOrigin: [],
      currentSorting: 'login',
      batch: [],
      partnerStatsData: [],
      options: {
        chunk: 4
      },
      currentPerPage: 8,
      isRows: false,
      currentIndex: null,
      tableTh: TABLE_TH
    }
  },
  computed: {
    ...mapGetters({
      PartnersStatsData: 'getPartnersStatsData',
      IsPayModal: 'getIsPayModal',
    }),
    PartnerStats: {
      get() {
        return this.$store.state.partnersStats;
      },
      set(value) {
        this.$store.commit('setPartnersStats', value);
      }
    },
  },
  mounted() {
    this.$store.dispatch('getPartnersStats').then(() => {
      this.originPartnerStats = [...this.PartnerStats];
      const batch = this.batchData(this.PartnerStats, this.currentPerPage);
      this.partnerStatsData = batch.current;
      this.batch = batch.total;
    });
  },
  methods: {
    sortData(type) {
      this.tableTh = this.tableTh.map((item) => {
        if (item.key === type.key) {
          item.sort = type.sort === 'asc' ? 'desc' : 'asc';
        } else {
          item.sort = '';
        }

        return item;
      });
      switch (type.key) {
        case 'id':
          this.PartnerStats = this.PartnerStats.sort((a, b) => {
            return type.sort === 'asc' ? a.id - b.id : b.id - a.id;
          });
          break;
        case 'login':
          this.PartnerStats = this.PartnerStats.sort((a, b) => {
            const aCount = a.login.localeCompare(b.login);
            const bCount = b.login.localeCompare(a.login);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;
        case 'ctn':
          this.PartnerStats = this.PartnerStats.sort((a, b) => {
            return type.sort === 'asc' ? b.cnt - a.cnt : a.cnt - b.cnt;
          });
          break;
        case 'profit':
          this.PartnerStats = this.PartnerStats.sort((a, b) => {
            return type.sort === 'asc' ? b.profit - a.profit : a.profit - b.profit;
          });
          break;
        case 'payments':
          this.PartnerStats = this.PartnerStats.sort((a, b) => {
            return type.sort === 'asc' ? b.payments - a.payments : a.payments - b.payments;
          });
          break;

      }
      this.partnerStatsData = this.batchData(this.PartnerStats, this.currentPerPage).current;
    },
    pageHandler(page) {
      this.partnerStatsData = this.batch[page];
    },
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/pages/partner-stat/partner-stat";
</style>
