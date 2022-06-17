<template>
  <div class="d-flex flex-wrap mb-2" style="gap: 10px 10px" v-if="selectedCharacter">
    <div>
      <div>
        Имя: {{ selectedCharacter.name }}
      </div>
      <div>
        Элемент: {{ selectedCharacter.element.element }}
      </div>
      <div>
        Редкость: {{ selectedCharacter.star }}
      </div>
      <div>
        Тип оружия: {{ selectedCharacter.weapon_type.type }}
      </div>
      <div class="mb-3 range" v-if="selectedCharacter && selectedCharacter.character_levels">
        <label for="character-level" class="form-label">
          Уровень: {{ characterLevel.level }}/{{ characterLevel.max_level }}
        </label>
        <input
            type="range"
            id="character-level"
            class="form-range"
            :disabled="!selectedCharacter"
            v-model="levelIndex"
            @input="setSelectedCharacterLevel"
            min="0"
            :max="selectedCharacter.character_levels.length - 1"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectedCharacterInfo",
  props: {
    selectedCharacter: Object,
    characterLevel: Object,
    selectedCharacterLevelIndex: {
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      levelIndex: 0
    }
  },
  watch: {
    selectedCharacterLevelIndex: {
      handler() {
        this.levelIndex = this.selectedCharacterLevelIndex
            ? this.selectedCharacterLevelIndex
            : 0
      }
    }
  },
  methods: {
    setSelectedCharacterLevel() {
      this.$emit('set-selected-character-level', this.levelIndex)
    }
  }
}
</script>

<style scoped>

</style>
