<template>
  <layout>
    <h1>Авторизация</h1>
    <form class="col-12 col-md-4" @submit.prevent="authorizeUser">
      <div class="mb-3">
        <label for="login" class="form-label">Логин</label>
        <input type="text" class="form-control" id="login" v-model="authData.login">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Пароль</label>
        <input type="password" class="form-control" id="password" v-model="authData.password">
      </div>
      <div class="mb-3">
        <button
            type="submit"
            class="btn btn-primary"
            id="submit"
        >Вход в хату</button>
      </div>
    </form>
  </layout>
</template>

<script>
import Layout from "@/components/Layout"

export default {
  name: "Login",
  components: {
    'layout': Layout
  },
  data() {
    return {
      authData: {
        login: null,
        password: null
      }
    }
  },
  methods: {
    authorizeUser() {
      this.$axios.post('/auth/login', this.authData)
        .then((response) => {
          if (response.status === 200) {
            const data = response.data?.data
            if (data?.token) {
              const token = data.token
              const user = data.user

              localStorage.setItem('token', token)
              this.$store.commit('user', user)
              this.$router.push({ name: 'Home' })
            }
          } else {
            console.log(response.data)
            alert(response.data.message)
          }
        }).catch(error => {
          if (error.response?.data?.message) {
            alert(error.response.data.message)
          }
        })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  mounted() {
    if (this.user) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>

</style>
