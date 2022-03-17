import {
    createStore
} from 'vuex'

const store = createStore({
    state () {
        return {
            user: null
        }
    },
    mutations: {
        user (state, user) {
            state.user = user
        }
    },
    getters: {
        user (state) {
            return state.user
        }
    }
})

export default store
