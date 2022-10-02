<template>
  <div class="calculator-list character-list">
      <div v-for="character in characters" v-bind:key="character.id" class="character-item">
        <CharacterCard
            :character="character"
            :pointer="true"
            @click="selectCharacter(character)"
        />
      </div>
  </div>
</template>

<script>
import CharacterCard from "@/components/Character/CharacterCard"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation";

export default {
  name: "CharacterList",
  components: {
    CharacterCard
  },
  mixins: [
    calculatorInformation
  ],
  data() {
    return {
      selectedCharacterLevelIndex: 0,
    }
  },
  computed: {
    characters() {
      return this.$store.getters.calculatorCharacters
    },
    selectedCharacter() {
      return this.$store.getters.selectedCalculatorCharacter
    },
    selectedWeapon() {
      return this.$store.getters.selectedCalculatorWeapon
    }
  },
  methods: {
    selectCharacter(character) {
      if (character) {
        if (this.selectedCharacter?.id !== character?.id) {
          this.$store.commit('selectedCalculatorCharacterLevel', 0)
          character.character_level = this.getSelectedCharacterLevel(character, 0)
        }

        this.$store.commit('selectedCalculatorCharacter', character)

        if (this.selectedWeapon?.id && this.selectedWeapon.weapon_type.slug !== character.weapon_type.slug) {
          this.$store.commit('selectedCalculatorWeapon', null)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
