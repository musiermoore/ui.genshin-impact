export default {
    state () {
        return {
            calculatorCharacters: {},
            calculatorCharacteristics: {},
            calculatorWeapons: [],
            calculatorArtifacts: {},
            artifactTypeCharacteristics: {},
            baseArtifactCharacteristics: {},
            extraArtifactCharacteristics: {},
            artifactCharacteristics: {},
            filteredCalculatorArtifacts: {}
        }
    },
    mutations: {
        calculatorCharacters (state, characters) {
            state.calculatorCharacters = characters
        },
        calculatorCharacteristics (state, characteristics) {
            state.calculatorCharacteristics = characteristics
        },
        calculatorWeapons (state, weapons) {
            state.calculatorWeapons = weapons
        },
        calculatorArtifacts (state, artifacts) {
            state.calculatorArtifacts = state.filteredCalculatorArtifacts = artifacts
        },
        baseArtifactCharacteristics (state, characteristics) {
            state.baseArtifactCharacteristics = characteristics
        },
        extraArtifactCharacteristics (state, characteristics) {
            state.extraArtifactCharacteristics = characteristics
        },
        artifactTypeCharacteristics (state, artifactTypes) {
            state.artifactTypeCharacteristics = artifactTypes
        },
        filteredCalculatorArtifacts (state, artifacts) {
            state.filteredCalculatorArtifacts = !state.filteredCalculatorArtifacts && !artifacts
                ? state.calculatorArtifacts
                : artifacts
        }
    },
    getters: {
        calculatorCharacters (state) {
            return state.calculatorCharacters
        },
        calculatorCharacteristics (state) {
            return state.calculatorCharacteristics
        },
        calculatorWeapons (state) {
            return state.calculatorWeapons
        },
        calculatorArtifacts (state) {
            return state.calculatorArtifacts
        },
        baseArtifactCharacteristics (state) {
            return state.baseArtifactCharacteristics
        },
        extraArtifactCharacteristics (state) {
            return state.extraArtifactCharacteristics
        },
        artifactTypeCharacteristics (state) {
            return state.artifactTypeCharacteristics
        },
        artifactCharacteristics (state) {
            return state.artifactCharacteristics
        },
        filteredCalculatorArtifacts (state) {
            return state.filteredCalculatorArtifacts
        }
    }
}
