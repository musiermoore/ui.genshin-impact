import { createApp } from 'vue'
import App from './App.vue'

import store from "./store"
import router from "./router"

import 'bootstrap'
import '@/assets/css/app.css'

// mixins
import updateMainStyles from "@/mixins/updateMainStyles"

const app = createApp(App)

app
    .use(store)
    .use(router)

app.mixin(updateMainStyles)

app.mount('#app')
