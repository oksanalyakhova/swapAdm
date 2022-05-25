<template>
  <div class="avatar">
    <img
      v-if="img"
      :src="img"
    >
    <empty-logo v-else />
  </div>
</template>

<script>
    import EmptyLogo from "../icons/emptyLogo";

    export default {
        name: "Avatar",
        components: {EmptyLogo},
        props: {
            data: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
                img: '',
            }
        },
        mounted() {
            if (this.data) {
                this.img = this.data.avatar;
            }
        },
    }
</script>

<style scoped>

</style>