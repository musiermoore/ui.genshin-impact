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

    <div class="characters d-flex flex-wrap" v-if="characters.length">
      <div class="character" v-for="character in characters" :key="character.id">
        <div class="character-image-block">
          <router-link :to="{ name: 'Edit Character', params: { id: character.id }}">
            <img
                :src="getCharacterImage(character)"
                :alt="character.name"
                class="character-image"
            >
          </router-link>
        </div>
        <div class="character-info">
          {{ character.name }}
        </div>
      </div>
    </div>
    <DataLoader v-else />
  </layout>
</template>

<script>
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"

export default {
  name: "Characters",
  components: {
    'layout': Layout,
    DataLoader
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
  position: relative;
  margin-right: 20px;
  margin-bottom: 20px;
}
.character:last-of-type {
  margin-right: 0;
}

.character-image-block {
  width: 200px;
  height: 200px;
  position: relative;
  border: 1px solid #666;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.character-image {
  max-width: 198px;
  max-height: 198px;
  padding: 0;
  margin: 0;
}
.character-info {
  display: flex;
  justify-content: center;
}

</style>
