<template>
  <div
    v-if="history.length"
    class="hover-info"
  >
    <polygon-hover />
    <div class="hover-info-text">
      <div
        class="hover-info-block"
      >
        <div
          v-for="(item, index) in history"
          :key="index"
          class="hover-info-block-item"
        >
          {{ item.newAmount }}
          <up-icon
            v-if="item.isUp"
            class="icon"
          />
          <down-icon
            v-else
            class="icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import PolygonHover from "../../../icons/polygonHover";
    import UpIcon from "../../../icons/upIcon";
    import DownIcon from "../../../icons/downIcon";

    export default {
        name: "AmountHistory",
        components: {DownIcon, UpIcon, PolygonHover},
        props: {
            tabindex: {
                type: Number,
                required: false,
                default: 0,
            },
            options: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                open: false,
                amountResult: '',
                history: [],
            };
        },
      mounted() {
          this.sortAmountHistory();
      },
      methods: {
        sortAmountHistory() {
          let options = this.options;

          if (options) {
            this.history = options.map((item) => {
              item.isUp = (item.newAmount - item.oldAmount) > 0;
              return item;
            }).sort((a, b) => a.createDate - b.createDate);
          }
        },
      }
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/components/hover";
</style>
