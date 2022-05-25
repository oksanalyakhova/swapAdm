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
            Edit tariff
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
                  :placeholder="Tariff.name"
                >
              </div>
              <div class="input">
                <div class="input-title">
                  Partner
                </div>
                <input
                  v-model="programData.partnerValue"
                  type="text"
                  :placeholder="Tariff.partnerValue"
                >
              </div>
              <div class="input">
                <div class="input-title">
                  ID
                </div>
                <input
                  v-model="programData.id"
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
              @click="changePartnerProgramData"
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
        name: "EditTariff",
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
                Tariff: 'getEditTariffData',
            }),
        },
        mounted(){
            this.programData = this.Tariff;
        },
        methods: {
            closePopup() {
                this.$store.commit('setEditTariffData', null);
            },
            successPopup() {
                this.$store.commit('setSuccess', {
                    name: 'Edit tariff success',
                    value: this.programData,
                });
            },
            errorPopup() {
                this.$store.commit('setError', {
                    name: 'Edit tariff error',
                    value: this.programData,
                });
            },
            changePartnerProgramData() {
                const id = this.programData.id;
                delete this.programData.id;

                PartnerService.editPartnerProgram(id, this.programData).then(() => {
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
    @import "../../../assets/styles/pages/tariffs/partials/edit-tariff";
</style>
