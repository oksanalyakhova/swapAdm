<template>
  <AccountLayout>
    <template #title>
      <h2>List of exchanges</h2>
    </template>
    <template #content>
      <div class="exchangesList main-block">
        <loading
          v-model:active="isLoading"
          :can-cancel="true"
          :is-full-page="fullPage"
          color="#0A68F7"
        />
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              All exchanges
            </div>
            <div class="table-block-header-filters-container">
              <div class="table-block-header-filters">
                <div
                    v-if="statuses.length"
                    class="table-block-header-filters-block"
                >
                  <div
                      v-for="(status, index) in statuses"
                      :key="index"
                      class="table-block-header-filters-selected"
                  >
                    {{ getExchangeStatus(status).name }}
                    <div class="table-block-header-filters-selected-close">
                      <close-icon @click="statusHandler(status)" />
                    </div>
                  </div>
                </div>

                <div v-if="uid && isShowUid">
                  <div
                      class="table-block-header-filters-selected"
                  >
                    {{ uid }}
                    <div class="table-block-header-filters-selected-close">
                      <close-icon @click="uidHandler()" />
                    </div>
                  </div>
                </div>

                <div class="table-block-header-filters-delimeter" />
                <div class="table-block-header-filters-filter">
                  <div
                      class="table-block-header-filters-filter-btn eventBtn"
                      @click="searchStatusToggle"
                  >
                    <filter-icon class="filter" />
                    Status filter
                  </div>
                  <div
                      class="table-block-header-filters-filter-search"
                  >
                    <div class="input">
                      <input
                          v-model="uid"
                          v-maska="{ mask: 'HHHHHHHH', tokens: { 'H': { pattern: /[0-9a-fA-F]/, uppercase: false }}}"
                          type="text"
                          :placeholder="searchPlaceHolder"
                          @keyup.enter="searchLoginHandler"
                          @mouseover="searchPlaceHolder = 'xxxxxxxx'"
                          @mouseleave="searchPlaceHolder = 'search uid'"
                      >
                    </div>
                  </div>
                </div>
                <div
                    v-if="isStatusSearch && isMobile()"
                    class="table-block-header-filters-mobile"
                    @click="searchStatusToggle"
                >
                  <div
                      class="table-block-header-filters-mobile-select"
                  >
                    <div class="title">
                      Status filter
                    </div>
                    <div class="searchlist">
                      <div
                          v-for="(item, index) in ExchangeStatusList"
                          :key="index"
                          class="table-block-header-filters-dropsearch-login"
                      >
                        <div class="table-block-header-filters-dropsearch-login-block">
                          <div class="item">
                            <label
                                :for="'item-checkbox' + index"
                                @change="statusHandler"
                            >
                              <input
                                  :id="'item-checkbox' + index"
                                  v-model="statuses"
                                  class="checkbox"
                                  type="checkbox"
                                  :value="item.status"
                              >
                              <span class="item-text">
                              {{ getExchangeStatus(item.status).name }}
                            </span>
                            </label>
                            <div
                                class="circle"
                                :class="{
                              remaining: getExchangeStatus(item.status).className === 'remaining to send funds',
                              pay: getExchangeStatus(item.status).className === 'pay',
                              exchange: getExchangeStatus(item.status).className === 'exchange',
                              completed: getExchangeStatus(item.status).className === 'completed',
                              overdue: getExchangeStatus(item.status).className === 'overdue',
                              returned: getExchangeStatus(item.status).className === 'returned',
                            }"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                    v-if="isStatusSearch && !isMobile()"
                    class="table-block-header-filters-dropsearch eventBlock"
                >
                  <div class="searchlist">
                    <div
                        v-for="(item, index) in ExchangeStatusList"
                        :key="index"
                        class="table-block-header-filters-dropsearch-login"
                    >
                      <div class="table-block-header-filters-dropsearch-login-block">
                        <div class="item">
                          <label
                              :for="'item-checkbox' + index"
                              @change="statusHandler"
                          >
                            <input
                                :id="'item-checkbox' + index"
                                v-model="statuses"
                                class="checkbox"
                                type="checkbox"
                                :value="item.status"
                            >
                            <span class="item-text">
                            {{ getExchangeStatus(item.status).name }}
                          </span>
                          </label>
                          <div
                              class="circle"
                              :class="{
                            remaining: getExchangeStatus(item.status).className === 'remaining',
                            pay: getExchangeStatus(item.status).className === 'pay',
                            exchange: getExchangeStatus(item.status).className === 'exchange',
                            completed: getExchangeStatus(item.status).className === 'completed',
                            overdue: getExchangeStatus(item.status).className === 'overdue',
                            returned: getExchangeStatus(item.status).className === 'returned',
                          }"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="table-block-table"
          >
            <table
              class="table"
            >
              <thead>
                <tr class="table-headers">
                  <th
                    class="table-buttons"
                    scope="col"
                  />
                  <th
                    v-for="(item, index) in tableTh"
                    :id="item.id"
                    :key="index"
                    scope="col"
                    :class="{'table-id': item.key === 'id', 'table-status': item.key === 'status'}"
                  >
                    <div
                      class="text"
                      @click="sortData(item)"
                      @mouseover="tokenTo = index"
                      @mouseleave="tokenTo = null"
                    >
                      {{ item.name }}
                      <span v-if="item.isSortable">
                        <sort-passive v-if="!item.sort" />
                        <sort-a-z v-if="item.sort === 'ASC'" />
                        <sort-z-a v-if="item.sort === 'DESC'" />
                        <transition name="fade">
                          <hover-text
                            v-if="tokenTo === index"
                            :option="item.description"
                          />
                        </transition>
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <ExchangesListItem
                  v-if="exchangesData.length"
                  :exchanges-list="exchangesData"
                />
              </tbody>
            </table>
          </div>
        </div>

        <paged-pagination
          v-if="exchangesData.length && !isLoading"
          :total="Exchanges.maxPage"
          :current="page"
          @change-page="pageHandler"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
      </div>
      <exchange-info
        v-if="ExchangeData"
        :data="ExchangeData"
      />
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import HoverText from "../coins/partials/hoverText";
import ExchangesListItem from "./partials/ExchangesListItem";
import filterMixin from "../../mixins/filter.mixin";
import SortZA from "../../icons/sorting/sort-z-a";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortPassive from "../../icons/sorting/sort-passive";
import FilterIcon from "../../icons/filterIcon";
import {mapGetters} from 'vuex';
import ExchangeInfo from "./partials/ExchangeInfo";
import CloseIcon from "../../icons/closeIcon";
import {STATUSES, TABLE_TH} from "./exchangeData";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import OrderService from "@/services/order.service";
import PagedPagination from "../../components/PagedPagiantion";
import helperMixin from "../../mixins/helper.mixin";

export default {
  name: "ExchangesList",
  components: {
    PagedPagination,
    CloseIcon,
    Loading,
    ExchangeInfo,
    FilterIcon,
    SortPassive,
    SortAZ,
    SortZA,
    AccountLayout,
    ExchangesListItem,
    HoverText,
  },
  mixins: [
    filterMixin,
    helperMixin
  ],
  data() {
    return {
      isStatusSearch: false,
      exchangesData: [],
      tokenTo: false,
      statuses: [],
      uid: null,
      tableTh: TABLE_TH,
      ExchangeStatusList: STATUSES,
      page: 1,
      isLoading: false,
      fullPage: true,
      searchPlaceHolder: 'search uid',
      isShowUid: false,
    }
  },
  computed: {
    ...mapGetters({
      ExchangeData: 'getExchangeData',
      IsExchangeModal: 'getIsExchangeModal',
    }),
    Exchanges: {
      get() {
        return this.$store.state.exchangesList;
      },
      set(value) {
        this.$store.commit('setExchangesAll', value);
      }
    },
  },
  mounted() {
    this.mountList();
    this.mountSort();
    this.mountStatus();
    this.hideDropDownWhenClick();

    if (this.$route.params.id) {
      this.getOrderAdminById();
    }
  },
  methods: {
    getOrderAdminById() {
      OrderService.getOrderAdminById(this.$route.params.id).then((res) => {
        this.$store.commit('setExchangeData', res.data.result);
      })
    },
    getList(query) {
      this.isLoading = true;

      this.$store.dispatch('getOrderList', query).then(() => {
        this.exchangesData = this.Exchanges.result;
        this.isLoading = false;
      });
    },
    searchLoginHandler(el) {
      let query = {page: 1};

      if (el.target.value) {
        query.uid = el.target.value;
      }

      if (this.$route.query.status) {
        query.status = this.statuses;
      }

      this.$router.push({query: query}).then(() => {
        this.uid = el.target.value;
        this.isShowUid = true;

        this.getList(query);
      });
    },
    searchStatusToggle() {
      this.isStatusSearch = !this.isStatusSearch;
    },
    uidHandler() {
      const query = {page: 1};
      this.uid = null;
      this.isShowUid = false;

      this.$router.push({query: query}).then(() => {
        this.getList(query);
      });
    },
    statusHandler(status = null) {
      this.page = 1;
      let query = {page: this.page};

      if (status !== null) {
        this.statuses = this.statuses.filter((item) => item !== status);
      }

      if (this.statuses.length) {
        query = {page: this.page, status: this.statuses}
      }

      this.$router.push({query: query}).then(() => {
        this.getList(this.$route.query);
      });
    },
    toggleSort(currentSort = {}) {
      this.tableTh = this.tableTh.map((item) => {
        if (currentSort.key === item.key) {
          item.sort = currentSort.sort === 'ASC' ? 'DESC' : 'ASC';
        }

        return item;
      });
    },
    sortData(type) {
      this.toggleSort(type);

      if (type.key === 'id' || type.key === 'date' || type.key === 'status' || type.key === 'partner') {
        let query = {
          page: this.page,
          orderMode: type.sort,
          orderColumn: type.key,
        };
        const status = this.getStatuses();

        if (status) {
          query.status = status;
        }

        this.$router.push({query: query}).then(() => {
          this.getList(this.$route.query);
        });
      }

      this.exchangesData = this.Exchanges.result;
    },
    pageHandler(page) {
      this.page = page;

      this.$router.push({query: {page: this.page, status: this.statuses}}).then(() => {
        this.getList(this.$route.query);
      });
    },
    mountSort() {
      if (this.$route.query.orderMode) {
        this.toggleSort({
          key: this.$route.query.orderColumn,
          sort: this.$route.query.orderMode === 'ASC' ? 'DESC' : 'ASC',
        });
      }
    },
    mountList() {
      if (this.$route.query.uid) {
        this.uid = this.$route.query.uid;
        this.isShowUid = true;
      }

      if (this.$route.query.page) {
        this.page = parseInt(this.$route.query.page);
        this.getList(this.$route.query);
      } else {
        const query = this.$route.query;
        query.page = this.page;
        this.getList(query);
      }
    },
    mountStatus() {
      let status = this.getStatuses();

      if (status) {
        this.statuses = status.map((e) => parseInt(e));
      }
    },
    getStatuses() {
      let status = this.$route.query.status;

      if (!status) {
        return null;
      }

      return Array.isArray(status) ? status : [status];
    },
    hideDropDownWhenClick() {
      document.addEventListener('click', (event) => {
        const el = document.querySelector('.eventBlock');
        const elBtn = document.querySelector('.eventBtn');

        if (el && elBtn) {
          const isEl = el.contains(event.target);
          const isELBtn = elBtn.contains(event.target);
          if (!isEl && !isELBtn) {
            this.isStatusSearch = false;
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/pages/exchanges/exchanges";
@import "../../assets/styles/components/filter-dropdown";
</style>
