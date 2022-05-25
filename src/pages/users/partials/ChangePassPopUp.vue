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
            Change password
            <div class="popup-block-form-title-delimeter" />
            <div class="popup-block-form-title-login">
              {{ UserItem.login }}
            </div>
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

          <div class="popup-block-form-input">
            <div class="popup-block-form-input-title">
              New password
            </div>
            <input
              v-model="form.password"
              :type="passwordFieldType"
            >
            <div class="popup-block-form-input-desc ">
              Please enter new password
            </div>
            <div class="popup-block-form-input-title repeat">
              Repeat password
            </div>
            <input
              v-model="form.repeatPassword"
              :type="passwordFieldType"
              :class="{'errorPassword': isEqualPassword}"
              @keyup="repeatPasswordHandler"
            >
            <div class="popup-block-form-input-desc">
              Please repeat password
            </div>
            <div class="popup-block-form-buttons">
              <button
                class="cancel"
                @click="closePopup"
              >
                Cancel
              </button>
              <button
                class="save"
                @click="changePassword"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="closePopup">
      close
    </button>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import AdminService from '../../../services/admin.service'

    export default {
        name: "ChangePassPopUp",
        data() {
            return {
                passwordFieldType: "password",
                form: {
                    password: '',
                    repeatPassword: '',
                    isEqualPassword: false,
                }
            }
        },
        computed: {
            ...mapGetters({
                UserItem: 'getUserItem',
            }),
        },
        methods: {
            repeatPasswordHandler() {
                this.form.isEqualPassword = this.form.password !== this.form.repeatPassword;
            },
            closePopup() {
                this.$store.commit('setUserItem', null);
            },
            changePassword() {
                const query = {
                    id: this.UserItem.id,
                    password: this.form.password,
                };

                this.repeatPasswordHandler();

                if (!this.form.isEqualPassword) {
                    AdminService.resetPasswordAdmin(query).then(() => {
                        this.closePopup();
                        this.successPopup();
                    }).catch(() => {
                        this.errorPopup();
                    })
                }
            },
            successPopup() {
                this.$store.commit('setSuccess', {
                    name: 'Change password success',
                    value: this.form,
                });
            },
            errorPopup() {
                this.$store.commit('setError', {
                    name: 'Change password error',
                    value: this.form,
                });
            },
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/pages/users/change-password";
</style>
