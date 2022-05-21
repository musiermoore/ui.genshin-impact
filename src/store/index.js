import {
    createStore
} from 'vuex'

const store = createStore({
    state () {
        return {
            user: null,
            mainLoaded: false,
            calculatorCharacters: {},
            calculatorCharacteristics: {},
            calculatorWeapons: []
        }
    },
    mutations: {
        user (state, user) {
            state.user = user
        },
        mainLoaded (state, status) {
            state.mainLoaded = status
        },
        calculatorCharacters (state, characters) {
            state.calculatorCharacters = characters
        },
        calculatorCharacteristics (state, characteristics) {
            state.calculatorCharacteristics = characteristics
        },
        calculatorWeapons (state, weapons) {
            state.calculatorWeapons = weapons
        }
    },
    getters: {
        user (state) {
            return state.user
        },
        mainLoaded (state) {
            return state.mainLoaded
        },
        calculatorCharacters (state) {
            return state.calculatorCharacters
        },
        calculatorCharacteristics (state) {
            return state.calculatorCharacteristics
        },
        calculatorWeapons (state) {
            return state.calculatorWeapons
        }
    }
})

export default store
