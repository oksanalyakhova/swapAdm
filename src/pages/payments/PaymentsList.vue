<template>
  <AccountLayout>
    <template #title>
      <h2>List of payments</h2>
    </template>
    <template #content>
      <div class="paymentsList main-block">
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              All payments
            </div>
            <div class="table-block-header-filters">
              <div
                v-if="logins.length"
                class="table-block-header-filters-block"
              >
                <div
                  v-for="(login, index) in logins"
                  :key="index"
                  class="table-block-header-filters-selected"
                >
                  {{ login }}
                  <div class="table-block-header-filters-selected-close">
                    <close-icon @click="removeLogin(login)" />
                  </div>
                </div>
              </div>
              <div class="table-block-header-filters-delimeter" />
              <div class="table-block-header-filters-filter">
                <div
                  class="table-block-header-filters-filter-btn eventBtn"
                  @click="searchToggle"
                >
                  <filter-icon class="filter" />
                  Partner login
                </div>
              </div>
              <div
                v-if="isLoginSearch"
                class="table-block-header-filters-dropsearch eventBlock"
                :class="{mobile: isMobile() === true}"
              >
                <div
                  v-if="isMobile()"
                  class="title"
                >
                  Partner login
                  <close-icon
                    class="close"
                    @click="isLoginSearch = !isLoginSearch"
                  />
                </div>
                <div class="input">
                  <input
                    type="text"
                    placeholder="Login search"
                    @keyup="searchLoginHandler"
                    @keyup.enter="searchLoginHandler"
                  >
                </div>

                <div
                  v-if="!isMobile()"
                  class="searchlist"
                >
                  <div v-if="searchList.length" />
                  <div
                    v-for="(item, index) in searchList"
                    :key="index"
                    class="table-block-header-filters-dropsearch-login"
                  >
                    <div class="table-block-header-filters-dropsearch-login-block">
                      <div
                        class="item"
                        @click="searchLoginItem(item)"
                      >
                        {{ item }}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="isMobile()"
                  class="searchlist-mob"
                >
                  <div
                    v-for="(item, index) in searchList"
                    :key="index"
                    class="table-block-header-filters-dropsearch-login"
                  >
                    <div class="table-block-header-filters-dropsearch-login-block">
                      <div class="item">
                        <label
                          :for="'item-checkbox' + index"
                          @change="searchLoginCheckbox()"
                        >
                          <input
                            :id="'item-checkbox' + index"
                            v-model="logins"
                            class="checkbox"
                            type="checkbox"
                            :value="item"
                          >
                          {{ item }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    :class="{'table-login': item.key === 'login', 'table-status': item.key === 'status'}"
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
                <PaymentsListItem
                  v-if="paymentsData.length"
                  :payments-list="paymentsData"
                />
              </tbody>
            </table>
          </div>
        </div>
        <custom-pagination
          v-if="paymentsData.length"
          :total="batch.length"
          :current="paymentsData.length"
          @change-page="changePerPageHandler"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
      </div>
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import PaymentsListItem from "./partials/PaymetsListItem";
import HoverText from "../coins/partials/hoverText";
import CloseIcon from "../../icons/closeIcon";
import filterMixin from "../../mixins/filter.mixin";
import helperMixin from "../../mixins/helper.mixin";
import SortPassive from "../../icons/sorting/sort-passive";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortZA from "../../icons/sorting/sort-z-a";
import FilterIcon from "../../icons/filterIcon";
import CustomPagination from "@/components/Pagination";
import {TABLE_TH} from "@/pages/payments/paymentData";

export default {
  name: "PaymentsList",
  components: {
    CustomPagination,
    FilterIcon,
    SortZA,
    SortAZ,
    SortPassive,
    CloseIcon,
    HoverText,
    AccountLayout,
    PaymentsListItem,
  },
  mixins: [
    filterMixin,
    helperMixin
  ],
  data() {
    return {
      search: null,
      originPayments: null,
      isLoginSearch: false,
      searchMobileModal: [],
      searchList: [],
      searchListOrigin: [],
      currentSorting: 'login',
      batch: [],
      paymentsData: [],
      options: {
        chunk: 4
      },
      currentPerPage: 8,
      isRows: false,
      currentIndex: null,
      logins: [],
      tableTh: TABLE_TH,
    }
  },
  computed: {
    Payments: {
      get() {
        return this.$store.state.paymentsList;
      },
      set(value) {
        this.$store.commit('setPaymentsAll', value);
      }
    },
  },
  mounted() {
    this.hideDropDownWhenClick();

    this.$store.dispatch('getAllPayments').then(() => {
      this.originPayments = [...this.Payments];
      const batch = this.batchData(this.Payments, this.currentPerPage);
      this.paymentsData = batch.current;
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
        case 'login':
          this.Payments = this.Payments.sort((a, b) => {
            const aCount = a.login.localeCompare(b.login);
            const bCount = b.login.localeCompare(a.login);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;

        case 'address':
          this.Payments = this.Payments.sort((a, b) => {
            const aCount = a.address.localeCompare(b.address);
            const bCount = b.address.localeCompare(a.address);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;
        case 'createDate':
          this.Payments = this.Payments.sort((a, b) => {
            const aDate = Date.parse(a.createDate);
            const bDate = Date.parse(b.createDate);

            return type.sort === 'asc' ? aDate - bDate : bDate - aDate;
          });
          break;
        case 'amount':
          this.Payments = this.Payments.sort((a, b) => {
            return type.sort === 'asc' ? a.amount - b.amount : b.amount - a.amount;
          });
          break;
        case 'status':
          this.Payments = this.Payments.sort((a, b) => {
            return type.sort === 'asc' ? a.status - b.status : b.status - a.status;
          });
          break;
      }
      this.paymentsData = this.batchData(this.Payments, this.currentPerPage).current;
    },
    searchToggle() {
      this.isLoginSearch = !this.isLoginSearch;

      const searchList = this.originPayments.map((item) => item.login);

      this.searchList = Array.from(new Set(searchList));
      this.searchListOrigin = this.searchList;
    },
    searchLoginHandler(el) {
      const isEnter = el.code === 'Enter';
      const value = el.target.value;

      if (value.length && !isEnter) {
        this.searchList = this.searchListOrigin.filter((item) => item.indexOf(value) > -1);
      }

      if (!value.length && !isEnter) {
        this.searchList = this.searchListOrigin;
      }

      if (isEnter) {
        this.searchLoginItem(value);
      }
    },
    searchLoginItem(searchValue) {
      const value = searchValue.toLowerCase();

      this.Payments = this.originPayments;

      if (value.length) {
        this.logins = this.logins.filter((item) => item !== value);
        this.logins = [...this.logins, value];
        this.Payments = this.Payments.filter((item) => this.logins.includes(item.login.toLowerCase()));
      }

      this.paymentsData = this.batchData(this.Payments, this.currentPerPage).current;
      this.isLoginSearch = false;
    },
    searchLoginCheckbox() {
      this.Payments = this.originPayments;

      if (this.logins.length) {
        this.Payments = this.Payments.filter((item) => this.logins.includes(item.login));
      }

      this.paymentsData = this.batchData(this.Payments, this.currentPerPage).current;
    },
    changePerPageHandler(item) {
      this.currentPerPage = item;
      this.paymentsData = this.batchData(this.Payments, this.currentPerPage).current;
    },
    pageHandler(page) {
      this.paymentsData = this.batch[page];
    },
    removeLogin(login) {
      this.logins = this.logins.filter((item) => item !== login);
      this.Payments = this.originPayments.filter((item) => item.login !== login);
      if (!this.logins.length) {
        this.Payments = this.originPayments;
      }
      this.paymentsData = this.batchData(this.Payments, this.currentPerPage).current;
    },
    hideDropDownWhenClick() {
      document.addEventListener('click', (event) => {
        const el = document.querySelector('.eventBlock');
        const elBtn = document.querySelector('.eventBtn');

        if (el && elBtn) {
          const isEl = el.contains(event.target);
          const isELBtn = elBtn.contains(event.target);

          if (!isEl && !isELBtn) {
            this.isLoginSearch = false;
          }
        }
      });
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/pages/payments/payments";
@import "../../assets/styles/components/filter-dropdown";
</style>
