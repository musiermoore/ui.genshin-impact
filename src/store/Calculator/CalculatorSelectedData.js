import getBaseWeaponInformation from "@/mixins/Calculator/getBaseWeaponInformation"
import getBaseCharacterInformation from "@/mixins/Calculator/getBaseCharacterInformation"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation"

export default {
    state () {
        return {
            selectedCalculatorWeapon: getBaseWeaponInformation.methods.getBaseWeapon(),
            selectedCalculatorWeaponLevel: 0,
            selectedCalculatorCharacter: getBaseCharacterInformation.methods.getBaseCharacter(),
            selectedCalculatorCharacterLevel: 0,
            selectedCalculatorArtifacts: {
                'flower-of-life': {},
                'plume-of-death': {},
                'sands-of-eon': {},
                'goblet-of-eonothem': {},
                'circlet-of-logos': {}
            },
            selectedCalculatorArtifactCharacteristics: {
                'flower-of-life': {},
                'plume-of-death': {},
                'sands-of-eon': {},
                'goblet-of-eonothem': {},
                'circlet-of-logos': {}
            }
        }
    },
    mutations: {
        selectedCalculatorCharacter (state, character) {
            state.selectedCalculatorCharacter = character
        },
        selectedCalculatorCharacterLevel (state, level) {
            state.selectedCalculatorCharacterLevel = level

            calculatorInformation.methods.setCharacterLevelToSelectedCharacter()
        },
        selectedCalculatorWeapon (state, weapon) {
            state.selectedCalculatorWeapon = weapon?.id
                ? weapon
                : getBaseWeaponInformation.methods.getBaseWeapon()
        },
        selectedCalculatorWeaponLevel (state, level) {
            state.selectedCalculatorWeaponLevel = level

            calculatorInformation.methods.setWeaponLevelToSelectedWeapon()
        },
        selectedCalculatorArtifacts (state, artifacts) {
            state.selectedCalculatorArtifacts = artifacts
        },
        selectedCalculatorArtifact (state, artifact) {
            if (
                artifact?.artifact_type_slug
                && Object.prototype.hasOwnProperty.call(state.selectedCalculatorArtifacts, artifact.artifact_type_slug)
            ) {
                state.selectedCalculatorArtifacts[artifact.artifact_type_slug] = artifact
            }
        },
        addArtifactCharacteristic (state, { artifact, characteristic }) {
            if (
                artifact?.artifact_type_slug
                && Object.prototype.hasOwnProperty.call(state.selectedCalculatorArtifacts, artifact.artifact_type_slug)
                && Object.prototype.hasOwnProperty.call(state.selectedCalculatorArtifacts, 'characteristics')
            ) {
                state.selectedCalculatorArtifacts[artifact.artifact_type_slug].characteristics.push(characteristic)
            }
        },
        setMainArtifactCharacteristic (state, { artifact, characteristic }) {
            if (
                characteristic &&
                artifact?.artifact_type_slug
                && Object.prototype.hasOwnProperty.call(state.selectedCalculatorArtifacts, artifact.artifact_type_slug)
            ) {
                console.log(characteristic.name)
                state.selectedCalculatorArtifactCharacteristics[artifact.artifact_type_slug] = characteristic
            }
        }
    },
    getters: {
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
        },
        selectedCalculatorArtifacts (state) {
            return state.selectedCalculatorArtifacts
        }
    }
}
