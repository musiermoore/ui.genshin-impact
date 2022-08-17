<template>
  <Layout>
    <div v-if="loaded">
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
          <label for="rarities" class="form-label">Редкость:</label>
          <select
              class="form-select"
              name="rarity_id"
              id="rarities"
              v-model="characterData.rarity_id"
              required
          >
            <option value="" disabled selected>Выберите звездочку</option>
            <option v-for="rarity in rarities" :key="rarity.id" :value="rarity.rarity">
              {{ rarity.rarity }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="elements" class="form-label">Стихия:</label>
          <select
              class="form-select"
              name="rarity_id"
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
          <label for="rarities" class="form-label">Тип оружия:</label>
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
              class="btn btn-primary me-2"
              id="submit"
          >Обновить</button>
          <a
              class="btn btn-danger"
              id="delete"
              @click="showDeleteModal = true"
          >Удалить</a>
        </div>
      </form>

      <div class="delete-modal" v-if="showDeleteModal">
        <div class="modal-content">
          <div class="modal-text mb-1">
            Введите пароль, для удаления персонажа:
          </div>
          <div class="modal-password mb-2">
            <input type="text" class="form-control" v-model="deletePassword">
          </div>
          <div class="modal-buttons">
            <a
                class="btn btn-outline-danger me-2"
                @click="deleteCharacter($route.params.id)"
            >Удалить</a>
            <a
                type="submit"
                class="btn btn-primary"
                @click="showDeleteModal = false"
            >Закрыть</a>
          </div>
        </div>
      </div>

      <div class="levels">
        <h2>Уровни персонажа:</h2>
        <div class="character-levels" v-if="character.character_levels && character.character_levels.length > 0">
          <div v-for="characterLevel in character.character_levels" :key="characterLevel.id">
            <router-link
                :to="{ name: 'Character Characteristics', params: { characterId: character.id, levelId: characterLevel.id }}"
                class="character-level"
                tag="div"
            >
              {{ characterLevel.level.level }}/{{ characterLevel.ascension.max_level }}
            </router-link>
          </div>
        </div>
        <h3 v-else>Результатов нет.</h3>
      </div>
    </div>
    <DataLoader v-else />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader";

export default {
  name: "CharacterEdit",
  components: {
    Layout,
    DataLoader
  },
  data() {
    return {
      characterData: {
        name: '',
        rarity_id: '',
        element_id: '',
        weapon_type_id: '',
        image: '',
      },
      character: {},
      rarities: [],
      elements: [],
      weaponTypes: [],
      showDeleteModal: false,
      deletePassword: '',
      loaded: false
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

              this.rarities = data.rarities
              this.weaponTypes = data.weapon_types
              this.elements = data.elements

              this.character = data.character

              this.characterData = {
                name: this.character.name,
                slug: this.character.slug,
                rarity_id: this.character.rarity_id,
                element_id: this.character.element_id,
                weapon_type_id: this.character.weapon_type_id,
                image_path: this.character.image
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
    },
    deleteCharacter(id) {
      if (this.deletePassword !== process.env.VUE_APP_DELETE_PASSWORD) {
        alert('Неверный пароль.')
        this.deletePassword = ''
        return;
      }

      this.$axios.delete(`/admin/characters/${id}`)
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
          .finally(() => {
            this.showDeleteModal = false
            this.deletePassword = ''
          })
    }
  }
}
</script>

<style scoped>
.delete-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
}

.delete-modal .modal-content {
  z-index: 1002;
  width: 500px;
  padding: 20px;
}
.delete-modal .modal-buttons {
  display: flex;
  justify-content: center;
}

.character-levels {
  display: flex;
  flex-wrap: wrap;
  width: 750px;
  justify-content: flex-start;
}

.character-levels .character-level {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 6px 6px 0;
  border: 1px solid #666;
  border-radius: 15px;
  width: 80px;
  height: 40px;
  cursor: pointer;
  text-decoration: none;
  color: rgba(3, 56, 141, 0.8);
}
.character-levels .character-level:hover {
  background-color: #0d6efd;
  border: 0;
  color: #fff;
  transition-duration: 0.2s;
}
</style>
