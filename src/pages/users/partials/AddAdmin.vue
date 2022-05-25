<template>
  <div
    class="add-user"
    tabindex="0"
    @keydown.esc="closeAdminModal"
  >
    <div class="add-user-block">
      <div class="title-block">
        <div class="title-block-text">
          Add admin
        </div>
        <div class="title-block-close">
          <img
            src="../../../assets/img/close.svg"
            alt=""
            @click="closeAdminModal"
          >
        </div>
      </div>
      <div class="input-item">
        <div class="input-item-title">
          Login
        </div>
        <input
          v-model="form.login"
          type="text"
        >
        <div
          v-if="isLoginBusy"
          class="desc"
        >
          Error
        </div>
      </div>
      <div
        class="input-item"
        :class="{'errorPassword': isError}"
      >
        <div class="input-item-title">
          Password
        </div>
        <input
          v-model="form.password"
          type="password"
          class="input"
        >
      </div>
      <div
        class="input-item"
        :class="{'errorPassword': isError}"
      >
        <div class="input-item-title">
          Repeat password
        </div>
        <input
          v-model="form.repeatPassword"
          type="password"
          class="input"
          :class="{'errorPassword': isEqualPassword}"
          @keyup="repeatPasswordHandler"
        >
        <div
          v-if="isError"
          class="input-item-desc"
        >
          Passwords are not identical
        </div>
      </div>
      <div class="buttons">
        <div
          class="button cancel"
          @click="closeAdminModal"
        >
          Cancel
        </div>
        <div
          class="button confirm"
          @click="submitCreate"
        >
          Create
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import UserService from '../../../services/user.service'

    export default {
        name: "AddAdmin",
        data() {
            return {
                form: {
                    login: '',
                    password: '',
                    repeatPassword: '',
                },
                isLoginBusy: false,
                isError: false,
            }
        },
        methods: {
            closeAdminModal() {
                this.$store.commit('setIsAdminModal', false);
            },
            repeatPasswordHandler() {
                this.isError = this.form.password !== this.form.repeatPassword;
            },
            submitCreate() {
                UserService.checkLogin(this.form.login).then((result) => {
                    this.repeatPasswordHandler();

                    if (result.data.result === 'empty' && !this.isError) {
                        this.isLoginBusy = false;
                        UserService.registerAdmin(this.form).then(() => {
                            this.closeAdminModal();
                            this.successPopup();
                        }).catch(()=> {
                            this.errorPopup();
                        });
                    }

                    if (result.data.result === 'busy' ) {
                        this.isLoginBusy = true;
                    }
                })
            },
            successPopup() {
                this.$store.commit('setSuccess', {
                    name: 'Add admin success',
                    value: this.form,
                });
            },
            errorPopup() {
                this.$store.commit('setError', {
                    name: 'Add admin error',
                    value: this.form,
                });
            },
        }
    }
</script>

<style lang="scss">
</style>