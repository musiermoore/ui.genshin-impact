<template>
  <div v-if="show" class="character-selector" :style="positions">
    <div class="selector-characters" v-for="character in characters" :key="character.id">
      <CharacterCard
          :character="character"
          :pointer="true"
          @click="selectCharacter(character)"
      />
    </div>
  </div>
</template>

<script>
import CharacterCard from "@/views/Character/List/components/CharacterCard"

export default {
  name: "CharacterSelector",
  components: {
    CharacterCard
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    positions: {
      type: Object,
      default() {
        return {
          'left': '200px',
          'top': '200px'
        }
      }
    }
  },
  data() {
    return {
      selectedCharacter: {}
    }
  },
  computed: {
    characters() {
      return this.$store.getters.calculatorCharacters
    }
  },
  methods: {
    selectCharacter(character) {
      this.$emit('selectCharacter', character.id)
    }
  }
}
</script>

<style scoped>
.character-selector {
  padding: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px 10px;
  position: absolute;
  width: 390px;
  height: 200px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 3px;
  z-index: 20;
  overflow-y: scroll;
}

.selector-characters {
  cursor: pointer;
}
</style>
