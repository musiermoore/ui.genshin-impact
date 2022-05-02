<template>
  <Layout>
    <h1 class="mb-3">Калькулятор</h1>
    <div v-if="loaded">
      <form method="GET">
        <div class="calculator">
          <div class="character-info">
            <div class="mb-3">
              <h4>
                <label for="selected-character" class="form-label">Персонаж:</label>
              </h4>
              <select
                  name="selected-character"
                  id="selected-character"
                  class="form-control"
                  v-model="selectedCharacterId"
                  @change="updateSelectedCharacter"
              >
                <option value="" disabled>Выберите персонажа</option>
                <option v-for="character in characters" :key="character.id" :value="character.id">
                  {{ character.name }}
                </option>
              </select>
            </div>
            <div class="mb-3 range" v-if="selectedCharacter && selectedCharacter.character_levels">
              <label for="selected-character" class="form-label">
                Уровень: {{ characterLevel.level.level }}/{{ characterLevel.ascension.max_level }}
              </label>
              <input
                  type="range"
                  class="form-range"
                  :disabled="!selectedCharacter"
                  v-model="selectedLevelIndex"
                  @input="getSelectedLevel"
                  min="0"
                  :max="selectedCharacter.character_levels.length - 1"
              >
            </div>
            <div v-if="selectedCharacterId">
              <h4>О персонаже:</h4>
              <div class="d-flex" style="gap: 10px 10px" v-if="selectedCharacter">
                <div
                    :class="['list-item-image-block', getBackgroundColorByElement(selectedCharacter.element)]"
                    style="width: 200px; border: 1px solid rgba(0, 0, 0, 0.3); border-radius: 3px"
                >
                  <img
                      :src="getCharacterImage(selectedCharacter)"
                      :alt="selectedCharacter.name"
                      class="list-item-image"
                      style="width: 198px"
                  >
                </div>
                <div>
                  <div>
                    Имя: {{ selectedCharacter.name }}
                  </div>
                  <div>
                    Элемент: {{ selectedCharacter.element.element }}
                  </div>
                  <div>
                    Редкость: {{ selectedCharacter.star.star }}
                  </div>
                  <div>
                    Тип оружия: {{ selectedCharacter.weapon_type.type }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="character-characteristics">
            <h4>Характеристики</h4>
            <div v-if="characterCharacteristics">
              <div
                  v-for="characteristic in characterCharacteristics"
                  :value="characteristic.id"
                  :key="characteristic.id"
              >
                {{ characteristic.name }}: {{ characteristic.pivot.value }}{{ characteristic.in_percent ? '%' : '' }}
              </div>
            </div>
          </div>
      </div>
      </form>
    </div>
    <DataLoader v-else />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"

export default {
  name: "Calculator",
  components: {
    DataLoader,
    Layout
  },
  data() {
    return {
      loaded: false,
      characters: [],
      selectedCharacterId: '',
      selectedCharacter: null,
      selectedLevelIndex: 0,
      characterLevel: null,
      characterCharacteristics: []
    }
  },
  mounted() {
    this.getCharacters()
  },
  computed: {

  },
  methods: {
    getCharacters() {
      this.$axios.get('/characters/calculator')
          .then((response) => {
            if (response.status === 200) {
              this.characters = response.data.data.characters
            }
          })
          .finally(() => this.loaded = true)
    },
    updateSelectedCharacter() {
      this.selectedCharacter = this.characters.find(character => character.id === this.selectedCharacterId)
      this.selectedLevelIndex = 0
      this.getSelectedLevel()
    },
    getSelectedLevel() {
      this.characterLevel = this.selectedCharacter.character_levels[this.selectedLevelIndex]
      if (this.characterLevel?.characteristics) {
        this.characterCharacteristics = this.characterLevel.characteristics
      }
    },
    getCharacterImage(character) {
      const images = character.images

      const mainImage = images.find(image => image.image_type.slug === 'main')


      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : null
    },
    getBackgroundColorByElement(element) {
      return element.slug + '-background'
    }
  }
}
</script>

<style scoped>
.calculator {
  display: flex;
  width: 100%;
  gap: 1rem 2rem;
}

.calculator .character-info {
  flex-basis: 40%;
  max-width: 40%;
}

.calculator .character-characteristics {
  flex-basis: 60%;
  max-width: 60%;
}
</style>
