import {
    createStore
} from 'vuex'

const store = createStore({
    state () {
        return {
            user: null,
            mainLoaded: false
        }
    },
    mutations: {
        user (state, user) {
            state.user = user
        },
        mainLoaded (state, status) {
            state.mainLoaded = status
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        mainLoaded (state) {
            return state.mainLoaded
        }
    }
})

export default store
