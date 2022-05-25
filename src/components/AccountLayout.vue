<template>
  <div class="AccountLayout">
    <div class="container-fluid">
      <div class="row">
        <AddPartner v-if="IsPartnerModal" />
        <AddAdmin v-if="IsAdminModal" />
        <SuccessModal v-if="SuccessModal.name" />
        <ErrorModal v-if="ErrorModal.name" />
        <div class="mobNav d-xl-none">
          <div class="mobNav-block">
            <div
              class="burger"
              @click="toggleNav"
            >
              <menu-burger />
            </div>
            <router-link :to="{ name: 'Dashboard'}">
              <logo-mob />
            </router-link>
          </div>
          <div class="account-mob">
            <div class="account-mob-icon">
              <div class="btn-link">
                <!--                                        <img v-if="User.partnerProfile.avatar == null" :src="User.partnerProfile.avatar" alt="">-->
                <empty-logo class="avatar" />
                <!--                                        <avatar v-if="User.partnerProfile.avatar !== null" :img="User.partnerProfile.avatar"/>-->
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-2 col-10 no-padding">
          <div
            v-if="mobNav"
            class="dashboard-nav-mob d-block d-xl-none"
            :class="{ 'mob': mobNav = true }"
          >
            <div class="logo">
              <div class="close">
                <close-menu @click="toggleNav" />
              </div>
              <router-link :to="{ name: 'Dashboard'}">
                <logo-mob />
              </router-link>
            </div>
            <div class="nav-menu">
              <div
                v-for="(item, index) in $router.options.routes"
                :key="index"
                class="nav-menu-item"
              >
                <router-link
                  v-if="item.meta.isMenu"
                  :to="{ name: item.name }"
                  class="btn-link"
                >
                  <img :src="item.meta.icon">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <div class="logout">
              <a
                href="#"
                class="btn-link"
                @click="logout"
              >
                <log-out />
                Logout
              </a>
            </div>
          </div>
          <div class="dashboard-nav d-none d-xl-block">
            <div class="logo">
              <router-link :to="{ name: 'Dashboard'}">
                <logo />
              </router-link>
            </div>
            <div class="nav-menu">
              <div
                v-for="(item, index) in $router.options.routes"
                :key="index"
                class="nav-menu-item"
              >
                <router-link
                  v-if="item.meta.isMenu"
                  :to="{ name: item.name }"
                  class="btn-link"
                >
                  <img :src="item.meta.icon">
                  {{ item.name }}
                </router-link>
              </div>
            </div>
            <div class="logout">
              <a
                href="#"
                class="btn-link"
                @click="logout"
              >
                <log-out class="logout-icon" />
                Logout
              </a>
            </div>
          </div>
        </div>
        <div
          class="col-xl-10 content"
          :class="{ 'blur': mobNav }"
        >
          <div class="row justify-content-between block-margin">
            <div class="col">
              <div class="title">
                <slot name="title" />
              </div>
            </div>
            <div class="col-3 d-none d-xl-block">
              <div class="account">
                <div class="account-title">
                  <div class="name">
                    {{ User.login }}
                  </div>
                </div>
                <div class="account-icon">
                  <div class="btn-link">
                    <!--                                        <img v-if="User.partnerProfile.avatar == null" :src="User.partnerProfile.avatar" alt="">-->
                    <empty-logo class="avatar" />
                    <!--                                        <avatar v-if="User.partnerProfile.avatar !== null" :img="User.partnerProfile.avatar"/>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <slot name="content" />
        </div>
        <update-notification v-if="Notification.name" />
      </div>
    </div>
  </div>
</template>

<script>
    import AddPartner from "../pages/users/partials/AddPartner";
    import AddAdmin from "../pages/users/partials/AddAdmin";
    import SuccessModal from "../pages/notification/SuccessModal";
    import ErrorModal from "../pages/notification/ErrorModal";
    import UpdateNotification from "../pages/notification/UpdateNotification";
    import {mapGetters} from 'vuex';
    import MenuBurger from "../icons/menuBurger";
    import LogoMob from "../icons/logoMob";
    import CloseMenu from "../icons/closeMenu";
    import LogOut from "../icons/logOut";
    import Logo from "../icons/logo";
    import EmptyLogo from "../icons/emptyLogo";

    export default {
        name: "AccountLayout",
        components: {
            EmptyLogo,
            Logo,
            LogOut,
            CloseMenu, LogoMob, MenuBurger, UpdateNotification, ErrorModal, SuccessModal, AddAdmin, AddPartner
        },
        data() {
            return {
                isActive: false,
                mobNav: false
            }
        },
        computed: {
            ...mapGetters({
                IsAdminModal: 'getIsAdminModal',
                IsPartnerModal: 'getIsPartnerModal',
                SuccessModal: 'getSuccess',
                ErrorModal: 'getError',
                Notification: 'getNotification',
            }),
            User: {
                get() {
                    return this.$store.state.user;
                },
                set(value) {
                    this.$store.commit('setUser', value);
                }
            },
        },
        mounted() {
            this.$store.dispatch('getProfile')
        },
        methods: {
            logout() {
                this.$store.dispatch('logout');
            },
            toggleNav() {
                this.mobNav = !this.mobNav;
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/styles/layout/layout";
    @import "../assets/styles/layout/table";
</style>