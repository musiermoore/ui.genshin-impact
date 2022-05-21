<template>
  <Layout>
    <div v-if="loaded">
      <h1>Редактирование {{ weaponData.name }}</h1>
      <div class="d-flex flex-wrap" style="gap: 10px">
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
                v-model="weaponData.sub_stat_id"
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
        <form class="col-12 col-md-6" @submit.prevent="saveCharacteristics($route.params.id)">
          <div class="mb-3">
            <label for="levels" class="form-label">Характерестика:</label>
            <select
                class="form-select"
                id="levels"
                name="level_ascension"
                @change="setLevelAscension()"
                v-model="selectedLevel"
                required
            >
              <option value="" disabled selected>Выберите характеристику</option>
              <option
                  v-for="level in levels"
                  :key="level.id"
                  :value="level"
                  :data-level_id="level.level_id"
                  :data-ascension_id="level.ascension_id"
              >
                {{ level.level }}/{{ level.max_level }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Базовая атака:</label>
            <input type="text" class="form-control" id="base_atk" v-model="characteristic.base_atk" required>
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Доп. характеристика:</label>
            <input type="text" class="form-control" id="sub_stat" v-model="characteristic.sub_stat" required>
          </div>

          <div class="mb-3">
            <button
                type="submit"
                class="btn btn-primary me-2"
                id="save-characteristic"
            >Обновить</button>
          </div>

          <div class="mb-3" v-if="weaponData.sub_stat && weaponData.characteristics">
            <table class="table">
              <thead>
              <tr>
                <th>Уровень</th>
                <th>Базовая атака</th>
                <th>{{ weaponData.sub_stat.name }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="characteristic in weaponData.characteristics" :key="characteristic.id">
                <td>{{ characteristic.level.level }}/{{ characteristic.ascension.max_level }}</td>
                <td>{{ characteristic.base_atk }}</td>
                <td>{{ characteristic.sub_stat }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </form>
      </div>


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
        sub_stat_id: '',
        weapon_type_id: '',
        image: '',
        description: '',
        image_path: '',
        characteristics: []
      },
      character: {},
      stars: [],
      levels: [],
      mainCharacteristics: [],
      weaponTypes: [],
      showDeleteModal: false,
      deletePassword: '',
      loaded: false,
      characteristic: {
        id: null,
        level_id: null,
        ascension_id: null,
        base_atk: null,
        sub_stat: null
      },
      selectedLevel: ''
    }
  },
  mounted() {
    const id = this.$route.params.id

    this.getWeapon(id)
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
    getWeapon(id) {
      this.$axios.get(`/admin/weapons/${id}`)
          .then((response) => {
            if (response.status === 200) {
              const data = response.data.data

              this.stars = data.stars
              this.weaponTypes = data.weapon_types
              this.mainCharacteristics = data.sub_stats
              this.levels = data.levels

              this.weapon = data.weapon

              this.weaponData = {
                name: this.weapon.name,
                slug: this.weapon.slug,
                star_id: this.weapon.star_id,
                sub_stat_id: this.weapon.sub_stat_id,
                weapon_type_id: this.weapon.weapon_type_id,
                image_path: this.weapon.image,
                description: this.weapon.description,
                characteristics: this.weapon.characteristics,
                sub_stat: this.weapon.sub_stat
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
    },
    setLevelAscension() {
      this.characteristic.ascension_id = this.selectedLevel.ascension_id
      this.characteristic.level_id = this.selectedLevel.level_id

      const characteristic = this.getCharacteristic()

      if (characteristic) {
        this.characteristic.base_atk = characteristic.base_atk
        this.characteristic.sub_stat = characteristic.sub_stat
      }
    },
    saveCharacteristics(id) {
      const formData = new FormData()
      const data = this.characteristic

      for (let key in data) {
        formData.append(key, data[key]);
      }

      this.$axios.post(`/admin/weapons/${id}/characteristics`, formData)
        .then(response => {
          if (response?.data.code === 200) {
            const characteristicIndex = this.getCharacteristicIndex()

            if (characteristicIndex === -1) {
              this.weaponData.characteristics.push({
                id: response.data.data.id,
                ascension_id: this.selectedLevel.ascension_id,
                ascension: {
                  id: this.selectedLevel.ascension_id,
                  ascension: this.selectedLevel.ascension,
                  max_level: this.selectedLevel.max_level
                },
                level_id: this.selectedLevel.level_id,
                level: {
                  id: this.selectedLevel.level_id,
                  level: this.selectedLevel.level
                },
                base_atk: this.characteristic.base_atk,
                sub_stat: this.characteristic.sub_stat
              })
            } else {
              this.weaponData.characteristics[characteristicIndex].base_atk = this.characteristic.base_atk
              this.weaponData.characteristics[characteristicIndex].sub_stat = this.characteristic.sub_stat
            }
          } else {
            alert('Ошибка сохранения')
          }
        })
        .catch(error => {
          alert(error)
        })
    },
    getCharacteristic() {
      return this.weapon.characteristics.find(characteristic => {
        return characteristic.level_id === this.selectedLevel.level_id &&
            characteristic.ascension_id === this.selectedLevel.ascension_id
      })
    },
    getCharacteristicIndex() {
      return this.weapon.characteristics.findIndex(characteristic => {
        return characteristic.level_id === this.selectedLevel.level_id &&
            characteristic.ascension_id === this.selectedLevel.ascension_id
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
</style>
