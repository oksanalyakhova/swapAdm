<template>
  <div class="">
    <div
      class="popup"
      tabindex="0"
      @keydown.esc="closePopup"
    >
      <div class="popup-block">
        <div class="popup-block-form">
          <div class="popup-block-form-title">
            Partner info
          </div>

          <div
            class="close"
            @click="closePopup"
          >
            <img
              src="../../../assets/img/close.svg"
              alt=""
            >
          </div>


          <div class="popup-block-form-info-main">
            <div class="avatar">
              <img
                src="../../../assets/img/avatar-big.png"
                alt=""
              >
            </div>
            <div class="title">
              {{ Profile.login }}
            </div>
          </div>
          <div
            v-if="Profile.partnerProfile"
            class="popup-block-form-info-profile"
          >
            <div class="popup-block-form-info-profile-item">
              <div class="item-title">
                Email
              </div>
              {{ Profile.partnerProfile.email || empty }}
            </div>
            <div class="popup-block-form-info-profile-item">
              <div class="item-title">
                Telegram
              </div>
              {{ Profile.partnerProfile.telegramm || empty }}
            </div>
            <div class="popup-block-form-info-profile-item">
              <div class="item-title">
                BTC Address
              </div>
              {{ Profile.partnerProfile.address || empty }}
            </div>
            <div class="popup-block-form-info-profile-item">
              <div class="item-title">
                Min pay
              </div>
              {{ empty }}
            </div>
            <div class="popup-block-form-info-profile-button">
              <button class="login">
                Login as partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';


    export default {
        name: "ProfilePopUp",
        data() {
            return {
                empty: '-'
            }
        },
        computed: {
            ...mapGetters({
                Profile: 'getProfile',
            }),
        },
        methods: {
            closePopup() {
                this.$store.commit('setProfile', null);
            }
        },
    }
</script>

<style lang="scss">
 @import "../../../assets/styles/pages/users/user-profile";
</style>