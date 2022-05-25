<template>
  <AccountLayout>
    <template #title>
      <h2>List of partner program</h2>
    </template>
    <template #content>
      <div class="programsList main-block">
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              All partner program
            </div>
            <div class="table-block-header-filters">
              <div class="table-block-header-filters-search">
                <input
                  type="text"
                  placeholder="Program search"
                  @keyup="searchLogin"
                >
              </div>
              <div
                v-if="!isMobile()"
                class="table-block-header-filters-delimeter"
              />
              <div
                v-if="!isMobile()"
                class="table-block-header-filters-add"
              >
                <div
                  class="table-block-header-filters-add-btn"
                  @click="addTariffModal"
                >
                  <add-icon class="add" />
                  Add tariff
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
                    :class="{
                      'table-name': item.key === 'name',
                      'table-value': item.key === 'partnerValue',
                      'table-id': item.key === 'id',
                      'table-status': item.key === 'active'
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
                <ProgramsListIem
                  v-if="programsData.length"
                  :programs-list="programsData"
                />
              </tbody>
            </table>
          </div>
        </div>
        <custom-pagination
          v-if="programsData.length"
          :total="batch.length"
          :current="programsData.length"
          @change-page="changePerPageHandler"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
      </div>
      <div
        v-if="isMobile()"
        class="addButton"
      >
        <add-plus @click="addTariffModal" />
      </div>
      <AddTariff v-if="IsAddTariffModal" />
      <EditTariff v-if="EditTariffData" />
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import ProgramsListIem from "./partials/ProgramsListIem";
import AddTariff from "./partials/AddTariff";
import {mapGetters} from 'vuex';
import EditTariff from "./partials/EditTariff";
import HoverText from "../coins/partials/hoverText";
import filterMixin from "../../mixins/filter.mixin";
import helperMixin from "../../mixins/helper.mixin";
import SortPassive from "../../icons/sorting/sort-passive";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortZA from "../../icons/sorting/sort-z-a";
import AddIcon from "../../icons/addIcon";
import AddPlus from "../../icons/addPlus";
import {TABLE_TH} from "./programData";
import CustomPagination from "@/components/Pagination";

export default {
  name: "ProgramsList",
  components: {
    CustomPagination,
    AddPlus,
    AddIcon,
    SortZA,
    SortAZ,
    SortPassive,
    HoverText,
    EditTariff,
    AddTariff,
    ProgramsListIem,
    AccountLayout,
  },
  mixins: [
    filterMixin,
    helperMixin
  ],
  props: {
    data: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      search: null,
      originPrograms: null,
      currentSorting: 'name',
      batch: [],
      programsData: [],
      currentIndex: null,
      currentPerPage: 8,
      options: {
        chunk: 4
      },
      tableTh: TABLE_TH
    }
  },
  computed: {
    ...mapGetters({
      IsAddTariffModal: 'getIsAddTariffModal',
      EditTariffData: 'getEditTariffData',
    }),
    Programs: {
      get() {
        return this.$store.state.programsList;
      },
      set(value) {
        this.$store.commit('setProgramAll', value);
      }
    },
  },
  mounted() {
    this.$store.dispatch('getPartnersProgram').then(() => {
      this.originPrograms = [...this.Programs];
      const batch = this.batchData(this.Programs, this.currentPerPage);
      this.programsData = batch.current;
      this.batch = batch.total;
    });
  },
  methods: {
    addTariffModal() {
      this.$store.commit('setIsAddTariffModal', true);
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
        case 'id':
          this.Programs = this.Programs.sort((a, b) => {
            return type.sort === 'asc' ? a.id - b.id : b.id - a.id;
          });
          break;
        case 'partnerValue':
          this.Programs = this.Programs.sort((a, b) => {
            return type.sort === 'asc' ? a.partnerValue - b.partnerValue : b.partnerValue - a.partnerValue;
          });
          break;
        case 'name':
          this.Programs = this.Programs.sort((a, b) => {
            const aCount = a.name.localeCompare(b.name);
            const bCount = b.name.localeCompare(a.name);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;

        case 'active':
          this.Programs = this.Programs.sort((a, b) => {
            return type.sort === 'asc' ? a.isActive - b.isActive : b.isActive - a.isActive;
          });
          break;
      }
      this.programsData = this.batchData(this.Programs, this.currentPerPage).current;
    },
    searchLogin(el) {
      const value = el.target.value.toLowerCase();

      this.Programs = this.originPrograms;

      if (value.length) {
        this.Programs = this.Programs.filter((item) => item.name.toLowerCase().indexOf(value) > -1);
      }

      this.programsData = this.batchData(this.Programs, this.currentPerPage).current;
    },
    changePerPageHandler(item) {
      this.currentPerPage = item;
      this.programsData = this.batchData(this.Programs, this.currentPerPage).current;
    },
    pageHandler(page) {
      this.programsData = this.batch[page];
    },
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/components/search";
@import "../../assets/styles/pages/tariffs/programs";
</style>
