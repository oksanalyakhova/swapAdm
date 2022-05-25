<template>
  <div class="AuthLayout">
    <div class="form-info-mob d-md-none">
      <div class="logo">
        <img
          alt="Vue logo"
          src="~@/assets/img/logo.svg"
        >
      </div>
    </div>
    <div class="form">
      <div class="form-info">
        <div class="logo">
          <img
            alt="Vue logo"
            src="~@/assets/img/logo.svg"
          >
        </div>
        <div class="copyrights">
          <h5>The short descriptor here</h5>
          <h5>Copyright © 2020 - 2021 Swapuz!</h5>
        </div>
      </div>
      <slot name="main" />
    </div>
    <div class="form-info-mob-copyrights d-md-none">
      <div class="copyrights">
        <h5>The short descriptor here</h5>
        <h5>Copyright © 2020 - 2021 Swapuz!</h5>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AuthLayout"
    }
</script>

<style lang="scss" >
    .AuthLayout {
        padding-top: 100px;

        @media (max-width: 800px) {
            padding-top: 40px;
        }

        h5 {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.38);
            line-height: 18px;
            margin-bottom: 0;
        }

        h2 {
            font-weight: 700;
            margin-bottom: 0;
        }

        input:active {
            background: rgba(103, 61, 253, 0.03);
        }

        input:focus {
            outline: none !important;
            border: none;
            box-shadow: inset 0 0 0 1.5px #673DFD;
            transition: .3s ease-in-out;
        }

        .btn-submit {
            background: #673DFD;
            color: white;
            padding: 14px 0;
            border: none;
            border-radius: 4px;
        }

        .btn-link {
            padding: 14px 0;
            color: #673DFD;
            text-align: center;
        }

        .form {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            background: white;
            max-width: 776px;
            border-radius: 8px;

            &-control {
                background: white;
            }

            form {
                width: 100%;
            }

            &-info {
                background-image: url('~@/assets/img/bg_layout.svg');
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                padding: 40px 45px 28px 28px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                border-top-left-radius: 8px;

                @media (max-width: 810px) {
                    display: none !important;
                }

                &-mob {
                    background-image: url('~@/assets/img/bg_layout.svg');
                    background-position: top;
                    background-repeat: no-repeat;
                    background-size: cover;
                    padding: 20px;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;

                    &-copyrights {
                        background-image: url('~@/assets/img/bg_layout.svg');
                        background-position: bottom;
                        background-repeat: no-repeat;
                        background-size: cover;
                        padding: 20px;
                        border-bottom-left-radius: 10px;
                        border-bottom-right-radius: 10px;
                    }
                }
            }

            &-input {
                width: 100%;
                padding: 40px 48px 48px 48px;
                border-top-right-radius: 8px;
                border-bottom-right-radius: 8px;
                border: 1px solid #DFE0EB;

                @media (max-width: 800px) {
                    width: 100%;
                    padding: 40px 20px;
                    border-top-right-radius: 8px;
                    border-bottom-right-radius: 8px;
                }

                &-group {
                    padding-bottom: 24px;

                    .error {

                    }

                    .active-input {
                        background: rgba(103, 61, 253, 0.03);
                    }

                    .input-title {
                        font-size: 14px;
                        color: #673DFD;
                        padding-bottom: 8px;
                        line-height: 1;
                    }

                    .desc {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;

                        &-text {
                            font-size: 12px;
                            color: #9FA2B4;
                            padding-top: 6px;
                            line-height: 1;
                        }

                        .errors {
                            display: none;
                        }

                        .forgot {
                            font-size: 12px;
                            color: #673DFD;
                            padding-top: 6px;
                            line-height: 1;
                        }
                    }
                    .right {
                        justify-content: end;
                    }
                }

                .title {
                    padding-bottom: 24px;
                    font-size: 20px;

                    &-desc {
                        font-size: 14px;
                        line-height: 20px;
                        letter-spacing: 0.2px;
                        margin-bottom: 32px;
                    }
                }

                .buttons {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    align-items: center;
                    padding-top: 32px;
                }

                .form-group--error {

                    .input-title {
                        color: #FF783E;
                    }

                    .form-control {
                        box-shadow: inset 0 0 0 1.5px #FF783E;
                        transition: .3s ease-in-out;
                        border: none;
                    }

                    .errors {
                        display: block;
                        color: #FF783E;
                        font-size: 12px;
                        padding-top: 6px;
                        line-height: 1;
                    }

                    .desc-text {
                        color: #FF783E;
                    }
                }
            }
        }
    }
</style>