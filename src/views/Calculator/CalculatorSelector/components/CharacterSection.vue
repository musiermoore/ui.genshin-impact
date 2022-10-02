<template>
  <div>
    <div class="selected-character">
      <CharacterCard
          ref="selected_character"
          :character="selectedCalculatorCharacter"
      />

      <div v-if="selectedCalculatorCharacter">
        <div>
          Имя: {{ selectedCalculatorCharacter.name }}
        </div>
        <div>
          Элемент: {{ selectedCalculatorCharacter.element.element }}
        </div>
        <div>
          Редкость: {{ selectedCalculatorCharacter.rarity }}
        </div>
        <div>
          Тип оружия: {{ selectedCalculatorCharacter.weapon_type.type }}
        </div>
        <div class="mb-3 range" v-if="selectedCalculatorCharacter && selectedCalculatorCharacter.character_level">
          <label for="character-level" class="form-label">
            Уровень: {{ selectedCalculatorCharacter.character_level.level }}/{{ selectedCalculatorCharacter.character_level.max_level }}
          </label>
          <input
              type="range"
              id="character-level"
              class="form-range"
              :disabled="!selectedCalculatorCharacter"
              v-model="selectedCalculatorCharacterLevel"
              min="0"
              :max="selectedCalculatorCharacter.character_levels.length - 1"
          >
        </div>
      </div>
    </div>

    <h5>Список персонажей:</h5>
    <CharacterList

    />
  </div>
</template>

<script>
import getBaseCharacterInformation from "@/mixins/Calculator/getBaseCharacterInformation"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation"
import CharacterCard from "@/components/Character/CharacterCard"
import CharacterList from "./CharacterList"

export default {
  name: "CharacterSection",
  components: {
    CharacterList,
    CharacterCard
  },
  mixins: [
    getBaseCharacterInformation,
    calculatorInformation
  ],
  data() {
    return {

    }
  },
  computed: {
    selectedCalculatorCharacter() {
      return this.$store.getters.selectedCalculatorCharacter
    },
    selectedCalculatorCharacterLevel: {
      get () {
        return this.$store.getters.selectedCalculatorCharacterLevel
      },
      set (level) {
        this.$store.commit('selectedCalculatorCharacterLevel', level)
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.selected-character {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
