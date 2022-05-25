<template>
  <div class="hover-info">
    <polygon-hover />
    <div class="hover-info-text">
      {{ option }}
    </div>
  </div>
</template>

<script>
    import PolygonHover from "../../../icons/polygonHover";

    export default {
        name: "HoverText",
        components: {PolygonHover},
        props: {
            tabindex: {
                type: Number,
                required: false,
                default: 0,
            },
            option: {
                type: [String, Number],
                default: '',
            }
        },
        data() {
            return {
                open: false,
            };
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/styles/components/hover";
</style>
