import Home from "@/views/Home"
import Register from "@/views/User/Auth/Register"
import Login from "@/views/User/Auth/Login"
import {
    createRouter,
    createWebHistory
} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        displayName: 'У меня инфаркт',
        component: Home,
        meta: {
            requiresAuth: true,
            showInNavbar: false
        }
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        displayName: 'Регистрация',
        meta: {
            requiresAuth: false,
            showInNavbar: false
        }
    },
    {
        path: '/auth/login',
        name: 'Login',
        displayName: 'Авторизация',
        component: Login,
        meta: {
            requiresAuth: false,
            showInNavbar: true,
            showForAuthUser: false
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth
    const isLoggedIn = localStorage.getItem('token')

    if (requiresAuth && !isLoggedIn) {
        next({ name: 'Login' })
    } else if (isLoggedIn && (to.name === 'Login' || to.name === 'Register')) {
        next({ name: 'Home' })
    } else {
        next()
    }
})

export default router
