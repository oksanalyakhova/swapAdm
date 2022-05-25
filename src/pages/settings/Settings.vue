<template>
  <AccountLayout>
    <template #title>
      <h2>Settings</h2>
    </template>
    <template #content>
      <div class="settings main-block">
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              Settings
            </div>
            <div class="table-block-header-filters">
              <div class="table-block-header-filters-search">
                <input
                  type="text"
                  placeholder="Search"
                  @keyup="searchLogin"
                >
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
                    :class="{
                      'table-userKey': item.key === 'userKey',
                      'table-value': item.key === 'value',
                      'table-status': item.key === 'active',
                    }"
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
                  <th
                    class="table-edit"
                    scope="col"
                  />
                </tr>
              </thead>
              <tbody>
                <SettingsItem
                  v-if="settingsData.length"
                  :settings-list="settingsData"
                />
              </tbody>
            </table>
          </div>
        </div>
        <custom-pagination
          v-if="settingsData.length"
          :total="batch.length"
          :current="settingsData.length"
          @change-page="changePerPageHandler"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
      </div>
      <SettingsEdit
        v-if="SettingsData"
        :data="SettingsData"
      />
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import {mapGetters} from 'vuex';
import filterMixin from "../../mixins/filter.mixin";
import helperMixin from "../../mixins/helper.mixin";
import SortPassive from "../../icons/sorting/sort-passive";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortZA from "../../icons/sorting/sort-z-a";
import HoverText from "../coins/partials/hoverText";
import SettingsItem from "./partials/SettingsItem";
import SettingsEdit from "./partials/SettingsEdit";
import CustomPagination from "@/components/Pagination";
import {TABLE_TH} from "@/pages/settings/settingsData";

export default {
  name: "Settings",
  components: {
    CustomPagination,
    SettingsEdit,
    SettingsItem,
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
      originSettings: null,
      currentSorting: 'userKey',
      batch: [],
      settingsData: [],
      options: {
        chunk: 4
      },
      currentPerPage: 8,
      currentIndex: null,
      tableTh: TABLE_TH,
    }
  },
  computed: {
    ...mapGetters({
      SettingsData: 'getSettingsData',
      IsEditSettings: 'getIsEditSettings',
    }),
    Settings: {
      get() {
        return this.$store.state.settingsList;
      },
      set(value) {
        this.$store.commit('setSettings', value);
      }
    },
  },
  mounted() {
    this.$store.dispatch('getSettings').then(() => {
      this.originSettings = [...this.Settings];
      const batch = this.batchData(this.Settings, this.currentPerPage);
      this.settingsData = batch.current;
      this.batch = batch.total;
    });
  },
  methods: {
    searchLogin(el) {
      const value = el.target.value.toLowerCase();

      this.Settings = this.originSettings;

      if (value.length) {
        this.Settings = this.Settings.filter((item) => item.userKey.toLowerCase().indexOf(value) > -1);
      }

      this.settingsData = this.batchData(this.Settings, this.currentPerPage).current;
    },
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
        case 'userKey':
          this.Settings = this.Settings.sort((a, b) => {
            const aCount = a.userKey.localeCompare(b.userKey);
            const bCount = b.userKey.localeCompare(a.userKey);

            return type.sort === 'asc' ? bCount : aCount;
          });
          break;
        case 'value':
          this.Settings = this.Settings.sort((a, b) => {
            return type.sort === 'asc' ? a.userValue - b.userValue : b.userValue - a.userValue;
          });
          break;
        case 'active':
          this.Settings = this.Settings.sort((a, b) => {
            return type.sort === 'asc' ? b.isActive - a.isActive : a.isActive - b.isActive;
          });
          break;

      }
      this.settingsData = this.batchData(this.Settings, this.currentPerPage).current;
    },
    changePerPageHandler(item) {
      this.currentPerPage = item;
      if (this.batch.length > 1) {
        this.settingsData = this.batchData(this.Settings, this.currentPerPage).current;
      }
    },
    pageHandler(page) {
      if (this.batch.length > 1) {
        this.settingsData = this.batch[page];
      }
    },
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/pages/settings/settings";
</style>
