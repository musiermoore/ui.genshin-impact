import {
    createRouter,
    createWebHistory
} from "vue-router";
import Home from "@/views/Home"
import Register from "@/views/User/Auth/Register"
import Login from "@/views/User/Auth/Login"
import Characters from "@/views/Character/List/Characters"
import Weapons from "@/views/Weapon/List/Weapons"
import Characteristics from "@/views/Characteristic/List/Characteristics"
import CharacterCreate from "@/views/Character/Admin/CharacterCreate"
import CharacteristicCreate from "@/views/Characteristic/Admin/CharacteristicCreate"

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
    },
    {
        path: '/characters',
        name: 'Characters',
        displayName: 'Персонажи',
        component: Characters,
        meta: {
            requiresAuth: true,
            showInNavbar: true
        }
    },
    {
        path: '/characters/create',
        name: 'Create Character',
        displayName: 'Создание персонажа',
        component: CharacterCreate,
        meta: {
            requiresAuth: true,
            showInNavbar: false
        }
    },
    {
        path: '/weapons',
        name: 'Weapons',
        displayName: 'Оружие',
        component: Weapons,
        meta: {
            requiresAuth: true,
            showInNavbar: true
        }
    },
    {
        path: '/characteristics',
        name: 'Characteristics',
        displayName: 'Характеристики',
        component: Characteristics,
        meta: {
            requiresAuth: true,
            showInNavbar: true
        }
    },
    {
        path: '/characteristics/create',
        name: 'Create Characteristic',
        displayName: 'Создание характеристики',
        component: CharacteristicCreate,
        meta: {
            requiresAuth: true,
            showInNavbar: false
        }
    }
]

const router = createRouter({
    history: createWebHistory('/'),
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
