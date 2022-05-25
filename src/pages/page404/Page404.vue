<template>
  <div class="page404">
    <div class="page404-form">
      <div class="page404-form-title">
        404
      </div>
      <div class="page404-form-desc">
        Page not found <br>
        This page you are looking for no longer exist
      </div>
      <div class="page404-form-links">
        <div class="return">
          <router-link :to="{ name: 'Dashboard'}">
            Return to dashboard
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Page404"
    }
</script>

<style lang="scss">
    .page404 {
        text-align: center;
        min-height: 100vh;
        background: #1B1A1C;

        &-form {
            padding: 20% 0;
            background-image: url("../../assets/img/bg.svg");
            background-repeat: no-repeat;
            background-position: left center;

            &-title {
                font-size: 120px;
                font-weight: 800;
                line-height: 1;
                color: #F7F8FC;
            }

            &-desc {
                font-size: 14px;
                color: #9FA2B4;
                padding-bottom: 50px;
            }

            &-links {
                display: flex;
                flex-direction: row;
                justify-content: center;

                .return a {
                    padding: 20px 40px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #F7F8FC;
                    background: #02C076;
                    border-radius: 8px;
                }
            }
        }
    }
</style>