<template>
  <layout>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h1>Персонажи:</h1>
      <div>
        <router-link
            :to="{ name: 'Create Character' }"
            class="btn btn-primary"
            tag="button"
        >
          Создать персонажа
        </router-link>
      </div>

    </div>

    <div class="characters d-flex flex-wrap">
      <div class="character" v-for="character in characters" :key="character.id">
        <div class="character-image-block">
          <img
              :src="getCharacterImage(character)"
              :alt="character.name"
              class="character-image"
          >
        </div>
        <div class="character-info">
          {{ character.name }}
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@/components/Layout"

export default {
  name: "Characters",
  components: {
    'layout': Layout
  },
  data() {
    return {
      characters: [],
      loaded: false
    }
  },
  methods: {
    getCharacters() {
      this.$axios.get('/admin/characters')
          .then((response) => {
            if (response.status === 200) {
              this.characters = response.data.data.characters
            }
          })
          .finally(() => this.loaded = true)
    },
    getCharacterImage(character) {
      const images = character.images

      const mainImage = images.find(image => image.image_type.slug === 'main')


      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : null
    }
  },
  mounted() {
    this.getCharacters()
  }
}
</script>

<style scoped>
.character {
  width: 200px;
  height: 200px;
  position: relative;
  margin-right: 20px;
}
.character:last-of-type {
  margin-right: 0;
}

.character-image-block {
  width: 200px;
  height: 200px;
  position: relative;
  border: 2px solid #666;
}
.character-image {
  width: 198px;
  height: 198px;
  padding: 0;
  margin: 0;
}
.character-info {
  display: flex;
  justify-content: center;
}

</style>
