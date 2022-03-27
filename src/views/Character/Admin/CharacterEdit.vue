<template>
  <Layout>
    <h1>Создание персонажа</h1>
    <form class="col-12 col-md-5" @submit.prevent="updateCharacter($route.params.id)" enctype='multipart/form-data'>
      <div class="mb-3">
        <label for="name" class="form-label">Имя персонажа:</label>
        <input type="text" class="form-control" id="name" v-model="characterData.name" required>
      </div>
      <div class="mb-3">
        <label for="slug" class="form-label">Уникальный идентификатор</label>
        <input type="text" class="form-control" id="slug" v-model="characterData.slug">
        <small>Оставить пустым или имя персонажа на английском</small>
      </div>
      <div class="mb-3">
        <label for="stars" class="form-label">Редкость:</label>
        <select
            class="form-select"
            name="star_id"
            id="stars"
            v-model="characterData.star_id"
            required
        >
          <option value="" disabled selected>Выберите звездочку</option>
          <option v-for="star in stars" :key="star.id" :value="star.star">
            {{ star.star }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="elements" class="form-label">Стихия:</label>
        <select
            class="form-select"
            name="star_id"
            id="elements"
            v-model="characterData.element_id"
            required
        >
          <option value="" disabled selected>Выберите стихию</option>
          <option v-for="element in elements" :key="element.id" :value="element.id">
            {{ element.element }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="stars" class="form-label">Тип оружия:</label>
        <select
            class="form-select"
            name="weapon_type_id"
            id="weapon_types"
            v-model="characterData.weapon_type_id"
            required
        >
          <option value="" disabled selected>Выберите тип оружия</option>
          <option v-for="weaponType in weaponTypes" :key="weaponType.id" :value="weaponType.id">
            {{ weaponType.type }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Изображение</label>
        <input class="form-control" type="file" id="image" @change="onFileChange">
      </div>

      <div class="mb-3">
        <button
            type="submit"
            class="btn btn-primary"
            id="submit"
        >Обновить</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"

export default {
  name: "CharacterEdit",
  components: {
    Layout
  },
  data() {
    return {
      characterData: {
        name: '',
        star_id: '',
        element_id: '',
        weapon_type_id: '',
        image: '',
      },
      stars: [],
      elements: [],
      weaponTypes: []
    }
  },
  mounted() {
    const id = this.$route.params.id

    this.getCharacter(id)
  },
  methods: {
    updateCharacter(id) {
      const formData = new FormData()
      const data = this.characterData

      for (let key in data) {
        formData.append(key, data[key]);
      }
      formData.append('_method', 'PATCH')

      this.$axios.post(`/admin/characters/${id}`, formData)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: 'Characters' })
            } else {
              alert(response.data.message)
            }
          })
          .catch(error => {
            if (error.response?.data?.message) {
              alert(error.response.data.message)
            }
          })
          .finally(() => this.loaded = true)
    },
    getCharacter(id) {
      this.$axios.get(`/admin/characters/${id}`)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.data

              this.stars = data.stars
              this.weaponTypes = data.weapon_types
              this.elements = data.elements

              const character = data.character

              this.characterData = {
                name: character.name,
                slug: character.slug,
                star_id: character.star_id,
                element_id: character.element_id,
                weapon_type_id: character.weapon_type_id,
                image_path: character.image
              }
            } else {
              this.$router.push({ name: 'Characters' })
            }

          })
          .finally(() => this.loaded = true)
    },
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files;

      if (!files.length) return;

      this.characterData.image = files[0]
    }
  }
}
</script>

<style scoped>

</style>
