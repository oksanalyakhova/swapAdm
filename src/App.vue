<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    $route() {
      this.$route.name
    }
  },
  mounted() {
    this.$route.name;
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      const token = localStorage.token;
      const checkRouteNames = ['Login', 'Registration'];
      const routeName = this.$route.name;

      if (!checkRouteNames.includes(routeName) && !token) {
        this.$router.push({
          name: 'Login'
        });
      }

      if (token && checkRouteNames.includes(routeName)) {
        this.$router.push({
          name: 'Dashboard'
        });
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

body {
  background: #F7F8FC;
  font-family: 'Inter', sans-serif;
}

a {
  text-decoration: none !important;
}
</style>
