<template>
  <nav class="navbar-side">
    <div>
      <div class="navbar-side-home">
        <nav-icon :size="18" />
        <router-link
            :class="['']"
            :to="{ name: 'Home' }"
        >Главная</router-link>
      </div>
      <ul class="navbar-side-list">
        <li
            class="navbar-side-item"
            v-for="route in routes" :key="route"
        >
          <nav-icon :size="15" />
          <router-link
              :class="['', { active: isActive(route) }]"
              :to="{ name: route.name }"
          >{{ getRouteName(route) }}</router-link>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
import NavIcon from "@/components/Icons/NavIcon"

export default {
  name: "Navbar",
  components: {
      'nav-icon': NavIcon
  },
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
.navbar-side {
  padding: calc(1.5rem + var(--navbar-top-height)) 2.5rem;
  min-width: 270px;
  max-width: 350px;
  position: fixed;
  height: 100%;
  background-color: var(--main-color);
}

.navbar-side-home {
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
}

.navbar-side-home,
.navbar-side-item {
  display: flex;
  align-items: center;
  gap: 0 10px;
}

.navbar-side-list {
  margin: 0;
  padding: 0 0 0 1.5rem;
  list-style: none;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.navbar-side-item {
  font-size: 0.9rem;
  gap: 0 8px;
  margin-bottom: 0.4rem;
}
</style>
