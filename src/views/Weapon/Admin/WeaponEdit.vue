<template>
  <Layout>
    <div v-if="loaded">
      <h1>Редактирование {{ weaponData.name }}</h1>
      <form class="col-12 col-md-5" @submit.prevent="updateWeapon($route.params.id)" enctype='multipart/form-data'>
        <div class="mb-3">
          <label for="name" class="form-label">Название оружия:</label>
          <input type="text" class="form-control" id="name" v-model="weaponData.name" required>
        </div>
        <div class="mb-3">
          <label for="slug" class="form-label">Уникальный идентификатор</label>
          <input type="text" class="form-control" id="slug" v-model="weaponData.slug">
          <small>Оставить пустым или название оружия на английском</small>
        </div>
        <div class="mb-3">
          <label for="stars" class="form-label">Редкость:</label>
          <select
              class="form-select"
              name="star_id"
              id="stars"
              v-model="weaponData.star_id"
              required
          >
            <option value="" disabled selected>Выберите звездочку</option>
            <option v-for="star in stars" :key="star.id" :value="star.star">
              {{ star.star }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="elements" class="form-label">Основная характеристика:</label>
          <select
              class="form-select"
              name="star_id"
              id="elements"
              v-model="weaponData.main_characteristic_id"
              required
          >
            <option value="" disabled selected>Выберите характеристику</option>
            <option v-for="characteristic in mainCharacteristics" :key="characteristic.id" :value="characteristic.id">
              {{ characteristic.name }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="stars" class="form-label">Тип оружия:</label>
          <select
              class="form-select"
              name="weapon_type_id"
              id="weapon_types"
              v-model="weaponData.weapon_type_id"
              required
          >
            <option value="" disabled selected>Выберите тип оружия</option>
            <option v-for="weaponType in weaponTypes" :key="weaponType.id" :value="weaponType.id">
              {{ weaponType.type }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <div class="mb-3">
            <label for="description" class="form-label">Описание:</label>
            <textarea
                class="form-control"
                id="description"
                rows="3"
                v-model="weaponData.description"
            ></textarea>
          </div>
        </div>

        <div class="mb-3">
          <label for="image" class="form-label">Изображение</label>
          <input
              class="form-control"
              type="file" id="image"
              :required="!weaponData.image_path"
              @change="onFileChange">
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
      weaponData: {
        name: '',
        star_id: '',
        main_characteristic_id: '',
        weapon_type_id: '',
        image: '',
        description: '',
        image_path: ''
      },
      character: {},
      stars: [],
      mainCharacteristics: [],
      weaponTypes: [],
      showDeleteModal: false,
      deletePassword: '',
      loaded: false
    }
  },
  mounted() {
    const id = this.$route.params.id

    this.getCharacter(id)
    console.log(this.weaponData)
  },
  methods: {
    updateWeapon(id) {
      const formData = new FormData()
      const data = this.weaponData

      for (let key in data) {
        formData.append(key, data[key]);
      }
      formData.append('_method', 'PATCH')

      this.$axios.post(`/admin/weapons/${id}`, formData)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: 'Weapons' })
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
      this.$axios.get(`/admin/weapons/${id}`)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.data

              this.stars = data.stars
              this.weaponTypes = data.weapon_types
              this.mainCharacteristics = data.main_characteristics

              this.weapon = data.weapon

              this.weaponData = {
                name: this.weapon.name,
                slug: this.weapon.slug,
                star_id: this.weapon.star_id,
                main_characteristic_id: this.weapon.main_characteristic_id,
                weapon_type_id: this.weapon.weapon_type_id,
                image_path: this.weapon.image,
                description: this.weapon.description
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

      this.weaponData.image = files[0]
    },
    deleteCharacter(id) {
      if (this.deletePassword !== process.env.VUE_APP_DELETE_PASSWORD) {
        alert('Неверный пароль.')
        this.deletePassword = ''
        return;
      }

      this.$axios.delete(`/admin/weapons/${id}`)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: 'Weapons' })
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
