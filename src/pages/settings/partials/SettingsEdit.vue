<template>
  <div
    class="settingModal"
    tabindex="0"
    @keydown.esc="closeModal"
  >
    <div class="settingModal-form">
      <div class="settingModal-form-head">
        <div class="settingModal-form-title">
          Edit settings
        </div>
        <div class="settingModal-form-close">
          <close-icon @click="closeModal" />
        </div>
      </div>
      <div class="settingModal-form-inputs">
        <div class="settingModal-form-inputs-item">
          <div class="desc">
            User key
          </div>
          <input
            v-if="data.userKey !== null"
            class="disabled"
            type="text"
            disabled="disabled"
            :value="settingsData.userKey"
            :placeholder="data.userKey"
          >
          <input
            v-if="data.userKey === null"
            type="text"
            placeholder="Empty"
          >
        </div>
        <div class="settingModal-form-inputs-item">
          <div class="desc">
            User value
          </div>
          <input
            v-if="data.userValue !== null"
            v-model="settingsData.userValue"
            type="text"
            :placeholder="data.userValue"
          >
          <input
            v-if="data.userValue === null"
            type="text"
            placeholder="Empty"
          >
        </div>
        <div class="toggles">
          <div class="toggles-item">
            <div class="text">
              Is Active
            </div>
            <Toggle v-model="settingsData.isActive" />
          </div>
        </div>
      </div>
      <div class="settingModal-form-buttons">
        <div
          class="settingModal-form-buttons-item cancel"
          @click="closeModal"
        >
          Cancel
        </div>
        <div
          class="settingModal-form-buttons-item submit"
          @click="updateSettings"
        >
          Save
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from "../../../icons/closeIcon";
import Toggle from '@vueform/toggle'
import SettingService from '../../../services/settings.service'

export default {
  name: "SettingsEdit",
  components: {Toggle, CloseIcon},
  props: {
    data: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      settingsData: [],
    }
  },
  mounted() {
    this.settingsData = this.data;
  },
  methods: {
    closeModal() {
      this.$store.commit('setSettingsData', null);
    },
    updateSettings() {
      SettingService.updateSettings(this.settingsData).then(() => {
        this.successPopup();
        this.closeModal();
      }).catch(() => {
        this.errorPopup();
      });
    },
    successPopup() {
      this.$store.commit('setSuccess', {
        name: 'Setting edit success',
        value: this.settingsData,
      });
    },
    errorPopup() {
      this.$store.commit('setError', {
        name: 'Setting edit error',
        value: this.settingsData,
      });
    },
  }
}
</script>

<style lang="scss">
@import "../../../assets/styles/pages/settings/settings-edit";
</style>
