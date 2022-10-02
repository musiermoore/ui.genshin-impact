<template>
  <div>
    <loader v-if="!loaded" />
    <router-view></router-view>
  </div>

</template>

<script>
import { getCurrentInstance } from "vue"
import axios from "axios"
import PageLoader from "@/components/Loaders/PageLoader"

export default {
  name: 'App',
  components: {
    'loader': PageLoader
  },
  data() {
    return {}
  },
  methods: {
    init() {
      const { appContext } = getCurrentInstance()

      appContext.config.globalProperties.$storageUrl = process.env.VUE_APP_STORAGE_URL
      appContext.config.globalProperties.$publicAssetsUrl = process.env.VUE_APP_PUBLIC_ASSETS_URL
      appContext.config.globalProperties.$defaultImageUrl = process.env.VUE_APP_DEFAULT_IMAGE_URL
      appContext.config.globalProperties.$api = process.env.VUE_APP_API_URL

      const base = axios.create({
        baseURL: this.$api,
      })

      appContext.config.globalProperties.$axios = base
      appContext.config.globalProperties.$axios.interceptors.request.use(
          config => {
            let accessToken = localStorage.getItem('token')
            if (accessToken) {
              config.headers = Object.assign({
                Authorization: `Bearer ${accessToken}`
              }, config.headers);
            }
            return config
          },
          error => {
            return Promise.reject(error)
          }
      )
    },
    authenticateUser() {
      const token = localStorage.getItem('token')

      if (this.user || !token) {
        this.$store.commit('mainLoaded', true)
        return;
      }

      this.$axios.get('/auth/user')
        .then((response) => {
          if (response.status === 200) {
            const user = response.data.data.user

            this.$store.commit('user', user)
          } else {
            localStorage.removeItem('token')
            this.$store.commit('user', null)
            this.$router.push({ name: 'Login' })
          }
        }).catch(() => {
        localStorage.removeItem('token')
        this.$store.commit('user', null)
        this.$router.push({ name: 'Login' })
      }).finally(() => this.$store.commit('mainLoaded', true))
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    loaded() {
      return this.$store.getters.mainLoaded
    }
  },
  mounted() {
    this.init()
    this.authenticateUser()
  }
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

body {
  font-family: Verdana, serif;
}
</style>
