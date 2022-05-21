<template>
  <Layout>
    <h1>Добавление оружия</h1>
    <form class="col-12 col-md-5" @submit.prevent="createWeapon" enctype='multipart/form-data'>
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
              required
          ></textarea>
        </div>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Изображение</label>
        <input class="form-control" type="file" id="image" required @change="onFileChange">
      </div>

      <div class="mb-3">
        <button
            type="submit"
            class="btn btn-primary"
            id="submit"
        >Создать</button>
      </div>
    </form>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";

export default {
  name: "WeaponCreate",
  components: {
    Layout
  },
  data() {
    return {
      weaponData: {
        name: '',
        slug: '',
        star_id: '',
        sub_stat_id: '',
        weapon_type_id: '',
        image: '',
        description: ''
      },
      stars: [],
      mainCharacteristics: [],
      weaponTypes: []
    }
  },
  mounted() {
    this.getBasicData()
  },
  methods: {
    createWeapon() {
      const formData = new FormData()
      const data = this.weaponData

      for (let key in data) {
        formData.append(key, data[key]);
      }

      this.$axios.post('/admin/weapons', formData)
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
    getBasicData() {
      this.$axios.get('/admin/weapons/create')
          .then((response) => {
            const data = response.data.data

            this.stars = data.stars
            this.weaponTypes = data.weapon_types
            this.subStats = data.sub_stats
          })
          .finally(() => this.loaded = true)
    },
    onFileChange(event) {
      const files = event.target.files || event.dataTransfer.files;

      if (!files.length) return;

      this.weaponData.image = files[0]
    }
  }
}
</script>

<style scoped>

</style>
