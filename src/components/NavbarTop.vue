<template>
  <nav class="navbar-top">
    <div class="d-flex justify-content-between" style="padding: 0rem 1.5rem">
      <ul class="navbar-nav">
      </ul>
      <button
          class="btn btn-primary my-2"
          v-if="user"
          @click="logout"
      >Выход</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    getRouteName(route) {
      return route.displayName ? route.displayName : route.name
    },
    isActive(route) {
      return this.currentRoute === route.name
    },
    showForCurrentUser(route) {
      if (this.user) {
        return (route.meta.showForAuthUser === undefined) || route.meta.showForAuthUser
      } else if (!this.user && (route.meta.showForAuthUser || route.meta.requiresAuth)) {
        return false
      } else {
        return true
      }
    },
    logout() {
      this.$axios.post('/auth/logout')
        .then((response) => {
          if (response.status === 200) {
            localStorage.removeItem('token')
            this.$store.commit('user', null)
            this.$router.push({ name: 'Login' })
          }
        })
    }
  },
  computed: {
    currentRoute() {
      return this.$route.name
    },
    routes() {
      return this.$router.options.routes.filter(route => {
        return route.meta.showInNavbar && this.showForCurrentUser(route)
      })
    },
    user() {
      return this.$store.getters.user
    }
  }
}
</script>

<style scoped>
nav.navbar-top {
  width: 100%;
  min-height: var(--navbar-top-height);
  border-bottom: 2px solid #fff;
  position: fixed;
  background-color: var(--main-color);
  z-index: 10001;
}
</style>
