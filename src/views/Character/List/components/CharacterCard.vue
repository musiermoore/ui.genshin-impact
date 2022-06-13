<template>
  <div class="character-card">
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
    character: Object
  },
  data() {
    return {

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
          : `${this.$storageUrl}/images/shadow_character.png`
    },
    getBackgroundColorByElement(element) {
      return element.slug + '-background'
    }
  }
}
</script>

<style scoped>
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
