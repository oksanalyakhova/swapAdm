<template>
  <div
    v-if="text"
    class="changeModal"
  >
    <div class="changeModal-text">
      {{ text }}
    </div>
  </div>
</template>

<script>

export default {
  name: "CopyNotification",
  props: {
    text: {
      type: String,
      default: null,
    },
  },
}
</script>

<style lang="scss">
@import "../../assets/styles/notifications/status-popup";
@import "../../assets/styles/notifications/status-change";
</style>