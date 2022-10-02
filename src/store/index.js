import { createStore } from 'vuex'

import getBaseWeaponInformation from "@/mixins/Calculator/getBaseWeaponInformation"
import getBaseCharacterInformation from "@/mixins/Calculator/getBaseCharacterInformation"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation"

const store = createStore({
    state () {
        return {
            user: null,
            mainLoaded: false,
            calculatorCharacters: {},
            calculatorCharacteristics: {},
            calculatorWeapons: [],
            selectedCalculatorWeapon: getBaseWeaponInformation.methods.getBaseWeapon(),
            selectedCalculatorWeaponLevel: 0,
            selectedCalculatorCharacter: getBaseCharacterInformation.methods.getBaseCharacter(),
            selectedCalculatorCharacterLevel: 0
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
        },
        selectedCalculatorCharacter (state, character) {
            state.selectedCalculatorCharacter = character
        },
        selectedCalculatorCharacterLevel (state, level) {
            state.selectedCalculatorCharacterLevel = level

            calculatorInformation.methods.setCharacterLevelToSelectedCharacter()
        },
        selectedCalculatorWeapon (state, weapon) {
            state.selectedCalculatorWeapon = weapon
        },
        selectedCalculatorWeaponLevel (state, level) {
            state.selectedCalculatorWeaponLevel = level

            calculatorInformation.methods.setWeaponLevelToSelectedWeapon()
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
        },
        selectedCalculatorCharacter (state) {
            return state.selectedCalculatorCharacter
        },
        selectedCalculatorCharacterLevel (state) {
            return state.selectedCalculatorCharacterLevel
        },
        selectedCalculatorWeapon (state) {
            return state.selectedCalculatorWeapon
        },
        selectedCalculatorWeaponLevel (state) {
            return state.selectedCalculatorWeaponLevel
        }
    }
})

export default store
