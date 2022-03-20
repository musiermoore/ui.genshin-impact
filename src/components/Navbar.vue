<template>
  <nav class="navbar navbar-expand-lg navbar-light mb-2">
    <div class="container container-fluid collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link
              :class="['nav-link fw-bold ps-0']"
              :to="{ name: 'Home' }"
          >У меня инфаркт</router-link>
        </li>
        <li
            class="nav-item"
            v-for="route in routes" :key="route"
        >
          <router-link
              :class="['nav-link', { active: isActive(route) }]"
              :to="{ name: route.name }"
          >{{ getRouteName(route) }}</router-link>
        </li>
      </ul>
        <button
            class="btn btn-primary ml-auto"
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

</style>
