<template>
  <div class="">
    <div
      class="addTariff"
      tabindex="0"
      @keydown.esc="closePopup"
    >
      <div class="addTariff-block">
        <div class="addTariff-block-form">
          <div
            class="close"
            @click="closePopup"
          >
            <img
              src="../../../assets/img/close.svg"
              alt=""
            >
          </div>
          <div class="addTariff-block-form-title">
            Add tariff
          </div>
          <div class="addTariff-block-form-inputs">
            <div class="addTariff-block-form-inputs">
              <div class="input">
                <div class="input-title">
                  Name
                </div>
                <input
                  v-model="programData.name"
                  type="text"
                >
              </div>
              <div class="input">
                <div class="input-title">
                  Partner
                </div>
                <input
                  v-model="programData.partnerValue"
                  type="text"
                >
              </div>
              <div class="toggles">
                <div class="toggles-item">
                  <div class="text">
                    Is Active
                  </div>
                  <Toggle v-model="programData.isActive" />
                </div>
              </div>
            </div>
          </div>
          <div class="addTariff-block-form-submit">
            <button
              class="cancel"
              @click="closePopup"
            >
              Cancel
            </button>
            <button
              class="save"
              @click="addPartnerProgram"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import PartnerService from '../../../services/partner.service'
    import Toggle from '@vueform/toggle'

    export default {
        name: "AddTariff",
        components: {Toggle},
        data() {
            return {
                programData: {
                    name: '',
                    partnerValue: '',
                    isActive: true,
                },
            }
        },
        computed: {
            ...mapGetters({
                AddTariffModal: 'getSuccess',
            }),
        },
        methods: {
            closePopup() {
                this.$store.commit('setIsAddTariffModal', false);
            },
            successPopup() {
                this.$store.commit('setSuccess', {
                    name: 'Add tariff success',
                    value: this.programData,
                });
            },
            errorPopup() {
                this.$store.commit('setError', {
                    name: 'Add tariff error',
                    value: this.programData,
                });
            },
            addPartnerProgram() {
                PartnerService.addPartnerProgram(this.programData).then(() => {
                    this.closePopup();
                    this.successPopup();
                }).catch(() => {
                    this.errorPopup();
                })
            }
        }
    }
</script>

<style lang="scss">
    .addTariff {
        &-block {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            max-width: 100%;
            height: 100vh;
            z-index: 99;
            background: rgba(67, 40, 164, 0.54);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            overflow: auto;

            @media (max-width: 1079px) {
                height: 100%;
            }

            &-form {
                background: #FFFFFF;
                box-shadow: 0 6px 24px rgba(27, 26, 28, 0.16);
                border-radius: 16px;
                margin: 58px auto;
                padding: 24px;
                max-width: 384px;
                position: relative;

                @media (max-width: 1079px) {
                    margin: 0;
                    height: 100vh;
                    padding-bottom: 20px;
                    border-radius: 0;
                    overflow: auto;
                }

                &-title {
                    font-size: 24px;
                    line-height: 28px;
                    color: #1B1A1C;
                    font-weight: 700;
                }

                &-inputs {
                    width: 100%;
                    margin-top: 24px;

                    .input {
                        margin-bottom: 24px;

                        &-title {
                            font-size: 14px;
                            line-height: 16px;
                            color: #0A68F7;
                            font-weight: 400;
                            margin-bottom: 8px;
                        }
                    }

                    input {
                        width: 100%;
                        border: 1px solid #DFE0EB;
                        border-radius: 4px;
                        padding: 11px 16px;
                        font-size: 14px;
                        line-height: 18px;
                        color: #1B1A1C;
                    }
                }

                .toggles {
                    display: flex;
                    justify-content: space-between;
                    flex-wrap: wrap;
                    width: 100%;
                    margin: 24px 0;


                    &-item {
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        padding: 23px 0;
                        border-top: 1px solid #DFE0EB;

                        @media (max-width: 1079px) {
                            max-width: 100%;
                        }

                        .text {
                            font-size: 14px;
                            line-height: 18px;
                            color: #1B1A1C;
                            font-weight: 600;
                        }

                        .toggle {
                            width: var(--toggle-width, 34px);
                            height: var(--toggle-height, 12px);
                            outline: none;

                            &-container {
                                &:focus {
                                    box-shadow: none;
                                }
                            }
                        }

                        .toggle-on {
                            background: var(--toggle-bg-on, rgba(10, 104, 247, 0.32));
                            border-color: transparent;
                        }

                        .toggle-handle-on {
                            transform: translateX(-91%);
                            background: #0A68F7;
                            box-shadow: 0 1px 2px rgba(27, 26, 28, 0.16);;
                        }

                        .toggle-handle-off {
                            left: -2px;
                        }

                        .toggle-handle {
                            width: 20px;
                            height: 20px;
                            top: -3.5px;
                            box-shadow: 0 1px 1px rgba(27, 26, 28, 0.14), 0px 1px 3px rgba(27, 26, 28, 0.2);
                        }
                    }
                }

                &-submit {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    margin-top: 24px;

                    @media (max-width: 1079px) {
                        justify-content: space-between;
                    }

                    button {
                        outline: none;
                        border: none;
                        padding: 18px 60px;
                    }

                    .cancel {
                        background: none;
                        color: #0A68F7;
                        font-size: 16px;
                        line-height: 24px;
                        font-weight: 700;
                        border-radius: 8px;
                        margin-right: 16px;

                        @media (max-width: 1079px) {
                            margin-right: 0;
                        }

                        &:hover {
                            background: rgba(27, 26, 28, 0.03);
                            transition: 0.3s ease-in-out;
                        }
                    }

                    .save {
                        background: #0A68F7;
                        border-radius: 8px;
                        color: white;
                        font-size: 16px;
                        line-height: 24px;
                        font-weight: 700;

                        &:hover {
                            opacity: 0.9;
                            transition: 0.3s ease-in-out;
                        }
                    }
                }
            }

            .close {
                position: absolute;
                z-index: 3;
                right: 21px;
                top: 21px;
                cursor: pointer;
            }
        }
    }
</style>
