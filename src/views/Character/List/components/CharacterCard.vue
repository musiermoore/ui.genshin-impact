<template>
  <div class="character-card" :style="styles">
    <div :class="['character-image-block']">
      <img
          :src="getCharacterImage(character)"
          :alt="character ? character.name : ''"
          :class="['character-card-image', character ? `${character.element.slug}-shadow` : '']"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "CharacterCard",
  props: {
    character: Object,
    pointer: Boolean
  },
  data() {
    return {

    }
  },
  computed: {
    styles() {
      return {
        cursor: this.pointer ? 'pointer' : 'auto'
      }
    }
  },
  mounted() {

  },
  methods: {
    getCharacterImage(character) {
      const images = character?.images

      const mainImage = images
          ? images.find(image => image.image_type.slug === 'main')
          : null

      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : `${this.$publicAssetsUrl}/images/shadow_character.png`
    },
    getBackgroundColorByElement(element) {
      return element.slug + '-background'
    }
  }
}
</script>

<style scoped>
.character-card {
  display: inline-block;
}

.character-image-block {
  display: flex;
  justify-content: center;
  max-height: 170px;
  max-width: 170px;

  border: 2px solid #fff;
  border-radius: 20px;
  overflow: hidden;
}

.character-card-image {
  max-width: 100%;
  max-height: 100%;
}
</style>
