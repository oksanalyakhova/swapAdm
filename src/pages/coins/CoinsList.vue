<template>
  <AccountLayout>
    <template #title>
      <h2>List of coins</h2>
    </template>
    <template #content>
      <div class="coinsList main-block">
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              All coins
            </div>
            <div class="table-block-header-filters">
              <div class="table-block-header-filters-search">
                <input
                  type="text"
                  placeholder="Coin search"
                  @keyup="searchCoin"
                >
              </div>
              <div
                v-if="!isMobile()"
                class="table-block-header-filters-delimeter"
              />
              <div
                v-if="!isMobile()"
                class="table-block-header-filters-add"
                @click="addCoinInfo"
              >
                <div class="table-block-header-filters-add-btn">
                  <add-icon class="add" />
                  Add
                </div>
              </div>
            </div>
          </div>
          <div class="table-block-table">
            <table class="table">
              <thead>
                <tr class="table-headers">
                  <th scope="col">
                    <div class="text">
                      Img
                    </div>
                  </th>
                  <th
                    v-for="(item, index) in tableTh"
                    :key="index"
                    scope="col"
                    :class="{'table-headers-isTrue': (item.key === 'memo') ||
                      (item.key === 'active') ||
                      (item.key === 'deposit') ||
                      (item.key === 'withdraw')}"
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
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                <CoinsListItem
                  v-if="coinsData.length"
                  :coins-list="coinsData"
                />
              </tbody>
            </table>
          </div>
        </div>
        <custom-pagination
          v-if="coinsData.length"
          :total="batch.length"
          :current="coinsData.length"
          @change-page="changePerPageHandler"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
      </div>
      <div
        v-if="isMobile()"
        class="addButton"
      >
        <add-plus @click="addCoinInfo" />
      </div>
      <CoinsEditModal
        v-if="CoinData"
        :data="CoinData"
      />
      <coins-add-modal
        v-if="AddCoinData"
        :data="CoinData"
      />
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import CoinsEditModal from "./partials/CoinEditModal";
import CoinsListItem from "./partials/CoinsListItem";
import {mapGetters} from 'vuex';
import HoverText from "./partials/hoverText";
import CoinsAddModal from "./partials/CoinAddModal";
import filterMixin from "../../mixins/filter.mixin";
import helperMixin from "../../mixins/helper.mixin";
import SortPassive from "../../icons/sorting/sort-passive";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortZA from "../../icons/sorting/sort-z-a";
import AddIcon from "../../icons/addIcon";
import AddPlus from "../../icons/addPlus";
import {TABLE_TH} from "./coinData";
import CustomPagination from "@/components/Pagination";

export default {
  name: "CoinsList",
  components: {
    CustomPagination,
    AddPlus,
    AddIcon,
    SortZA,
    SortAZ,
    SortPassive,
    CoinsAddModal,
    HoverText,
    CoinsListItem,
    CoinsEditModal,
    AccountLayout,
  },
  mixins: [
    filterMixin,
    helperMixin
  ],
  data() {
    return {
      search: null,
      originCoins: null,
      currentSorting: 'code',
      batch: [],
      coinsData: [],
      currentPerPage: 8,
      options: {
        chunk: 4
      },
      currentIndex: false,
      tableTh: TABLE_TH
    }
  },
  computed: {
    ...mapGetters({
      CoinData: 'getCoinData',
      AddCoinData: 'getAddCoinData',
    }),
    Coins: {
      get() {
        return this.$store.state.coins;
      },
      set(value) {
        this.$store.commit('setCoins', value);
      }
    },
  },
  mounted() {
    this.$store.dispatch('getCoinsList').then(() => {
      this.originCoins = [...this.Coins];
      const batch = this.batchData(this.Coins, this.currentPerPage);
      this.coinsData = batch.current;
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
        case 'code':
          this.Coins = this.Coins.sort((a, b) => {
            const aCount = a.shortName.localeCompare(b.shortName);
            const bCount = b.shortName.localeCompare(a.shortName);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;

        case 'name':
          this.Coins = this.Coins.sort((a, b) => {
            const aCount = a.shotName.localeCompare(b.shotName);
            const bCount = b.shotName.localeCompare(a.shotName);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;

        case 'userFee':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.userFee - b.userFee : b.userFee - a.userFee;
          });
          break;

        case 'priceRound':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.priceRound - b.priceRound : b.priceRound - a.priceRound;
          });
          break;

        case 'tradeRound':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.tradeRound - b.tradeRound : b.tradeRound - a.tradeRound;
          });
          break;

        case 'rating':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.rating - b.rating : b.rating - a.rating;
          });
          break;

        case 'memo':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.isMemo - b.isMemo : b.isMemo - a.isMemo;
          });
          break;

        case 'active':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.isActive - b.isActive : b.isActive - a.isActive;
          });
          break;

        case 'deposit':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.isDeposit - b.isDeposit : b.isDeposit - a.isDeposit;
          });
          break;

        case 'withdraw':
          this.Coins = this.Coins.sort((a, b) => {
            return type.sort === 'asc' ? a.isWithdraw - b.isWithdraw : b.isWithdraw - a.isWithdraw;
          });
          break;
      }
      this.coinsData = this.batchData(this.Coins, this.currentPerPage).current;
    },
    addCoinInfo(coin) {
      this.$store.commit('setAddCoinData', coin);
    },
    isRowsLength() {
      this.isRows = !this.isRows;
    },
    searchCoin(el) {
      const value = el.target.value.toLowerCase();

      this.Coins = this.originCoins;

      if (value.length) {
        this.Coins = this.Coins.filter((coin) => {
          const isName = coin.name.toLowerCase().indexOf(value) > -1;
          const isShotName = coin.shotName.toLowerCase().indexOf(value) > -1;

          return isName || isShotName;
        });
      }

      this.coinsData = this.batchData(this.Coins, this.currentPerPage).current;
    },
    changePerPageHandler(item) {
      this.currentPerPage = item;
      this.coinsData = this.batchData(this.Coins, this.currentPerPage).current;
    },
    pageHandler(page) {
      this.coinsData = this.batch[page];
    },
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/components/search";
@import "../../assets/styles/pages/coins/coins";
</style>
