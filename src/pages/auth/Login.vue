<template>
  <AuthLayout>
    <template #main>
      <form @submit.prevent="submitForm">
        <div class="form-input">
          <h2 class="title">
            Log in
          </h2>
          <div
            class="form-input-group"
            :class="{ 'form-group--error': v$.form.login.$error || error}"
          >
            <label
              for="login"
              class="input-title"
            >Login</label>
            <input
              id="login"
              v-model.trim="v$.form.login.$model"
              type="text"
              class="form-control"
              :class="{ 'no-valid': v$.form.login.$error, 'valid': !v$.form.login.$error, 'active-input': form.password.length }"
            >
            <div class="desc">
              <label
                v-if="!v$.form.login.isValidLogin || !v$.form.login.minLength"
                class="desc-text"
              >Please
                enter your
                login</label>
              <label
                v-if="error"
                class="desc-text"
              >Login or password invalid</label>
            </div>
          </div>
          <div
            class="form-input-group"
            :class="{ 'form-group--error': v$.form.password.$error || error}"
          >
            <label
              for="password"
              class="input-title"
            >Password</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-control"
              :class="{ 'active-input': form.password.length }"
            >
            <div
              class="desc"
              :class="{ 'right': form.password.length }"
            >
              <label
                v-if="!v$.form.password.minLength || !form.password.length"
                class="desc-text"
              >Please
                enter your
                password</label>
            </div>
          </div>
          <div class="buttons">
            <button
              class="col btn-submit"
              type="submit"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </template>
  </AuthLayout>
</template>

<script>
    import useVuelidate from '@vuelidate/core'
    import { required, minLength } from '@vuelidate/validators'
    import AuthLayout from "../../components/AuthLayout";

    export default {
        name: "Login",
        components: {AuthLayout},
        setup () {
            return { v$: useVuelidate() }
        },
        data() {
            return {
                form: {
                    login: '',
                    password: ''
                },
                submitStatus: null,
                error: ''
            }
        },
        validations: {
            form: {
                login: {
                    required,
                    minLength: minLength(4),
                    isValidLogin(login) {
                        const regex = /[A-Za-z]$/;
                        return regex.test(login);
                    }
                },
                password: {
                    required,
                    minLength: minLength(6)
                },
            }
        },
        methods: {
            submitForm() {
                this.v$.$touch();
                if (!this.v$.$invalid) {
                    const credential = {
                        login: this.form.login,
                        password: this.form.password
                    };
                    this.$store.dispatch('login', credential).then(() => {
                        this.$router.push({name: 'Dashboard'})
                    }).catch((error) => {
                        this.error = error.response.data.result
                    })
                }
            },
        }
    }
</script>

<style>

</style>