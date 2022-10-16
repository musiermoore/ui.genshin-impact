import { createStore } from 'vuex'

import CalculatorLists from "./Calculator/CalculatorLists"
import CalculatorSelectedData from "./Calculator/CalculatorSelectedData"

const store = createStore({
    modules: {
        calculatorLists: CalculatorLists,
        calculatorSelectedData: CalculatorSelectedData
    },
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
