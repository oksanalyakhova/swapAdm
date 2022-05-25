<template>
  <div class="changeModal">
    <div class="changeModal-timer">
      <div class="single-chart">
        <circleIcon
          :timer-count="timer"
          :stroke="stroke"
        />
      </div>
    </div>
    <div class="changeModal-text">
      {{ Notification.name }}
      <b>
        "{{ Notification.value }}"
      </b>
      <!--      has been changed-->
    </div>
    <div
      class="changeModal-cancel"
      @click="cancelUpdate"
    >
      <img
        v-if="!isMobile()"
        src="../../assets/img/icons/cancelx.svg"
        alt=""
      >
      Cancel
    </div>
  </div>
</template>

<script>
import CircleIcon from "../../icons/circleIcon";
import {mapGetters} from 'vuex';
import helperMixin from "@/mixins/helper.mixin";

export default {
  name: "UpdateNotification",
  components: {CircleIcon},
  mixins: [
    helperMixin
  ],
  data() {
    return {
      timer: 0,
      stroke: '0, 100'
    }
  },
  computed: {
    ...mapGetters({
      Notification: 'getNotification',
    }),
  },
  mounted() {
    this.updateHandler();
  },
  methods: {
    updateHandler() {
      let strokeCount = 0;

      const counter = setInterval(() => {
        this.timer++;
        this.stroke = `${strokeCount + 33}, 100`;
        strokeCount += 33;

        if (this.timer === 3) {
          this.emitter.emit('update-notification');
          clearInterval(counter);
        }
      }, 1000);

    },
    cancelUpdate() {
      this.$store.commit('setNotification', {})
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/notifications/status-popup";
@import "../../assets/styles/notifications/status-change";
</style>