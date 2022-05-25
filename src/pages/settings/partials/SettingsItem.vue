<template>
  <tr
    v-for="(setting, index) in settingsList"
    :key="index"
    class="table-row"
  >
    <td class="table-cell table-userKey">
      {{ setting.userKey }}
    </td>
    <td class="table-cell table-value">
      {{ setting.userValue }}
    </td>
    <td class="table-cell table-status">
      <true-status v-if="setting.isActive === true" />
      <false-status v-if="setting.isActive === false" />
    </td>
    <td class="table-cell table-edit">
      <img
        src="../../../assets/img/icons/edit-icon.svg"
        alt=""
        @click="settingInfo(setting)"
      >
    </td>
  </tr>
</template>

<script>
import TrueStatus from "../../../icons/trueStatus";
import FalseStatus from "../../../icons/falseStatus";

export default {
  name: "SettingsItem",
  components: {FalseStatus, TrueStatus},
  props: {
    settingsList: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    this.$store.dispatch('getSettings');
  },
  methods: {
    settingInfo(setting) {
      this.$store.commit('setSettingsData', setting);
    },
  }
}
</script>

<style scoped>

</style>
