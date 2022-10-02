<template>
  <div class="d-flex flex-wrap flex-column" style="gap: 10px 10px">
    <div>
      <h4>
        Персонаж:
      </h4>
      <div>
        <CharacterCard
            ref="selected_character"
            :character="character"
            :pointer="true"
            @click="openCalculatorSelector"
        />
      </div>
    </div>

    <div v-if="character.id">
      <div>
        Имя: {{ character.name }}
      </div>
      <div>
        Элемент: {{ character.element.element }}
      </div>
      <div>
        Редкость: {{ character.rarity }}
      </div>
      <div>
        Тип оружия: {{ character.weapon_type.type }}
      </div>
      <div class="mb-3 range" v-if="character && character.character_levels">
        <label for="character-level" class="form-label">
          Уровень: {{ character.character_level.level }}/{{ character.character_level.max_level }}
        </label>
        <input
            type="range"
            id="character-level"
            class="form-range"
            :disabled="!character"
            v-model="selectedCalculatorCharacterLevel"
            min="0"
            :max="character.character_levels.length - 1"
        >
      </div>
    </div>
  </div>
</template>

<script>
import CharacterCard from "@/components/Character/CharacterCard"

export default {
  name: "SelectedCharacterInfo",
  components: {
    CharacterCard,
  },
  data() {
    return {
      selectorPositions: {
        right: '100px',
        top: null
      }
    }
  },
  mounted() {

  },
  computed: {
    characters() {
      return this.$store.getters.calculatorCharacters
    },
    character() {
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
  watch: {
    character: {
      handler() {

      },
      deep: true
    }
  },
  methods: {
    openCalculatorSelector() {
      this.$emit('change-calculator-selector-visible', true)
      this.$emit('change-calculator-selector-tab', 'character')
    },
  }
}
</script>

<style scoped>

</style>
