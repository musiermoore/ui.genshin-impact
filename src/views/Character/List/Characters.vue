<template>
  <layout>
    <div class="lists-header">
      <h1>Персонажи:</h1>
      <div>
        <router-link
            :to="{ name: 'Create Character' }"
            class="btn btn-primary"
            tag="button"
        >
          Добавить персонажа
        </router-link>
      </div>
    </div>

    <div v-if="loaded">
      <div class="lists" v-if="characters && characters.length">
        <div class="list-item" v-for="character in characters" :key="character.id">
          <div :class="['list-item-image-block', getBackgroundColorByElement(character.element)]">
            <router-link :to="{ name: 'Edit Character', params: { id: character.id }}">
              <img
                  :src="getCharacterImage(character)"
                  :alt="character.name"
                  class="list-item-image"
              >
            </router-link>
          </div>
          <div class="list-item-info">
            {{ character.name }}
          </div>
        </div>
      </div>
      <div v-else>
        Нет результатов.
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
    },
    getBackgroundColorByElement(element) {
      return element.slug + '-background'
    }
  },
  mounted() {
    this.getCharacters()
  }
}
</script>
