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
          <CharacterCard :character="character" />
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
import CharacterCard from "./components/CharacterCard"

export default {
  name: "Characters",
  components: {
    CharacterCard,
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
    }
  },
  mounted() {
    this.getCharacters()
  }
}
</script>

<style scoped>
/*.character-shadow {*/
/*  -webkit-filter: drop-shadow(1px 0 4px var(--geo-color));*/
/*  filter: drop-shadow(1px 0 4px var(--geo-color));*/
/*}*/
</style>
