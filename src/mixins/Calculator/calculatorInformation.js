import store from '@/store'

export default {
    methods: {
        setCharacterLevelToSelectedCharacter() {
            const character = store.getters.selectedCalculatorCharacter

            if (character) {
                const selectedCharacterLevel = store.getters.selectedCalculatorCharacterLevel

                character.character_level = this.getSelectedCharacterLevel(character, selectedCharacterLevel)
            }

            store.commit('selectedCalculatorCharacter', character)
        },
        getSelectedCharacterLevel(character, level = 0) {
            return character?.character_levels?.length > 0 && character?.character_levels[level]
                ? character.character_levels[level]
                : null
        },
        setWeaponLevelToSelectedWeapon() {
            const weapon = store.getters.selectedCalculatorWeapon

            if (weapon) {
                const selectedWeaponLevel = store.getters.selectedCalculatorWeaponLevel

                weapon.selected_characteristics = this.getSelectedWeaponLevel(weapon, selectedWeaponLevel)
            }

            store.commit('selectedCalculatorWeapon', weapon)
        },
        getSelectedWeaponLevel(weapon, level = 0) {
            return weapon?.characteristics?.length > 0 && weapon?.characteristics[level]
                ? weapon.characteristics[level]
                : null
        }
    }
}
