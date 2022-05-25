<template>
  <div class="status-modal">
    <div class="status-modal-form">
      <div
        class="close"
        @click="closePopup"
      >
        <img
          src="../../assets/img/close.svg"
          alt=""
        >
      </div>
      <div class="status-modal-form-icon">
        <img
          src="../../assets/img/icons/erroricon.svg"
          alt=""
        >
      </div>
      <div class="status-modal-form-title">
        {{ ErrorModal.name }}
      </div>
      <div class="status-modal-form-desc">
        {{ ErrorModal.value }}
      </div>
      <div class="status-modal-form-submit">
        <button
          class="status-modal-form-submit-close"
          @click="closePopup"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "ErrorModal",
        computed: {
            ...mapGetters({
                ErrorModal: 'getError',
            }),
        },
        methods: {
            closePopup() {
                this.$store.commit('setError', {});
            },
        }
    }
</script>

<style lang="scss">
    @import "../../assets/styles/notifications/status-modal";
</style>