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
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false
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
    console.log('test');
    if (requiresAuth && !isLoggedIn) {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
