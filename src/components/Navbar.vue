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
      const user = this.$store.getters.user
      console.log(user)
      if (user) {
        console.log(route.meta.showForAuthUser)
        return route.meta.showForAuthUser
      } else {
        return true
      }
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
    }
  }
}
</script>

<style scoped>

</style>
