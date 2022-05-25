<template>
  <AccountLayout>
    <template #title>
      <h2>List of users</h2>
    </template>
    <template #content>
      <div class="usersList main-block">
        <div class="table-block">
          <div class="table-block-header">
            <div class="table-block-header-title">
              All users
            </div>
            <div class="table-block-header-filters">
              <div class="table-block-header-filters-search">
                <input
                  type="text"
                  placeholder="Login search"
                  @keyup="searchLogin"
                >
              </div>
              <div
                v-if="!isMobile()"
                class="table-block-header-filters-delimeter"
              />
              <div
                class="table-block-header-filters-add"
                @click="isAddMenu"
              >
                <div class="table-block-header-filters-add-btn">
                  <add-icon class="add" />
                  Add
                </div>
                <div
                  v-if="isAdd"
                  class="table-block-header-filters-add-dropdown"
                >
                  <div
                    class="item admin"
                    @click="openAdminModal"
                  >
                    Add admin
                  </div>
                  <div
                    class="item partner"
                    @click="openPartnerModal"
                  >
                    Add partner
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
                    :class="{'table-id': item.key === 'id', 'table-status': item.key === 'active'}"
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
                <UserListItem
                  v-if="usersData.length"
                  :users-list="usersData"
                />
              </tbody>
            </table>
          </div>
        </div>
        <custom-pagination
          v-if="usersData.length"
          :total="batch.length"
          :current="usersData.length"
          @change-page="changePerPageHandler"
          @prev-page="pageHandler"
          @next-page="pageHandler"
        />
        <ProfilePopUp v-if="Profile" />
        <ChangePassPopUp v-if="UserItem" />
      </div>
    </template>
  </AccountLayout>
</template>

<script>
import AccountLayout from "../../components/AccountLayout";
import UserListItem from "./partials/UserListItem";
import {mapGetters} from 'vuex';
import ChangePassPopUp from "./partials/ChangePassPopUp";
import ProfilePopUp from "./partials/ProfilePopUp";
import HoverText from "../coins/partials/hoverText";
import filterMixin from "../../mixins/filter.mixin";
import helperMixin from "../../mixins/helper.mixin";
import AddIcon from "../../icons/addIcon";
import SortZA from "../../icons/sorting/sort-z-a";
import SortAZ from "../../icons/sorting/sort-a-z";
import SortPassive from "../../icons/sorting/sort-passive";
import CustomPagination from "@/components/Pagination";
import {TABLE_TH} from "@/pages/users/userData";

export default {
  name: "UsersList",
  components: {
    CustomPagination,
    SortPassive,
    SortAZ,
    SortZA,
    AddIcon,
    HoverText,
    ProfilePopUp,
    ChangePassPopUp,
    UserListItem,
    AccountLayout,
  },
  mixins: [
    filterMixin,
    helperMixin
  ],
  data() {
    return {
      search: null,
      originUsers: null,
      currentSorting: 'id',
      isAdd: false,
      batch: [],
      usersData: [],
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
      UserItem: 'getUserItem',
      Profile: 'getProfile',
    }),
    Users: {
      get() {
        return this.$store.state.users;
      },
      set(value) {
        this.$store.commit('setUsers', value);
      }
    },
  },
  mounted() {
    this.$store.dispatch('getUsersList').then(() => {
      this.originUsers = [...this.Users];
      const batch = this.batchData(this.Users, this.currentPerPage);
      this.usersData = batch.current;
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
          this.Users = this.Users.sort((a, b) => {
            return type.sort === 'asc' ? a.id - b.id : b.id - a.id;
          });
          break;
        case 'login':
          this.Users = this.Users.sort((a, b) => {
            const aCount = a.login.localeCompare(b.login);
            const bCount = b.login.localeCompare(a.login);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;
        case 'role':
          this.Users = this.Users.sort((a, b) => {
            const aCount = a.role.localeCompare(b.role);
            const bCount = b.role.localeCompare(a.role);

            return type.sort === 'asc' ? aCount : bCount;
          });
          break;
        case 'active':
          this.Users = this.Users.sort((a, b) => {
            return type.sort === 'asc' ? a.isActive - b.isActive : b.isActive - a.isActive;
          });
          break;
        case 'createDate':
          this.Users = this.Users.sort((a, b) => {
            const aDate = Date.parse(a.createUser);
            const bDate = Date.parse(b.createUser);

            return type.sort === 'asc' ? aDate - bDate : bDate - aDate;
          });
          break;
        case 'program':
          this.Users = this.Users.sort((a, b) => {
            const aCount = parseInt(a.partnerProgramId);
            const bCount = parseInt(b.partnerProgramId);

            return type.sort === 'asc' ? aCount - bCount : bCount - aCount;
          });
          break;

      }
      this.usersData = this.batchData(this.Users, this.currentPerPage).current;
    },
    isAddMenu() {
      this.isAdd = !this.isAdd;
    },
    searchLogin(el) {
      const value = el.target.value.toLowerCase();

      this.Users = this.originUsers;

      if (value.length) {
        this.Users = this.Users.filter((item) => item.login.toLowerCase().indexOf(value) > -1);
      }

      this.usersData = this.batchData(this.Users, this.currentPerPage).current;
    },
    changePerPageHandler(item) {
      this.currentPerPage = item;
      this.usersData = this.batchData(this.Users, this.currentPerPage).current;
    },
    pageHandler(page) {
      this.usersData = this.batch[page];
    },
    openAdminModal() {
      this.$store.commit('setIsAdminModal', true);
    },
    openPartnerModal() {
      this.$store.commit('setIsPartnerModal', true);
    }
  },
}
</script>

<style lang="scss">
@import "../../assets/styles/components/search";
@import "../../assets/styles/pages/users/users";
</style>
