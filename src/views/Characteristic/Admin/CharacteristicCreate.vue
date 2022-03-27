<template>
  <Layout>
    <h1>Создание характеристики:</h1>
    <form class="col-12 col-md-5" @submit.prevent="createCharacteristic">
      <div class="mb-3">
        <label for="name" class="form-label">Название:</label>
        <input type="text" class="form-control" id="name" v-model="characteristicData.name" required>
      </div>
      <div class="mb-3">
        <label for="slug" class="form-label">Уникальный идентификатор</label>
        <input type="text" class="form-control" id="slug" v-model="characteristicData.slug">
        <small>Оставить пустым или название характеристики на английском</small>
      </div>

      <div class="mb-3">
        <label for="in_percent" class="form-label">Значение:</label>
        <select
            class="form-select"
            name="in_percent"
            id="in_percent"
            v-model="characteristicData.in_percent"
            required
        >
          <option value="0" selected>Числовое</option>
          <option value="1" selected>В процентах</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="character_type" class="form-label">Тип оружия:</label>
        <select
            class="form-select"
            name="character_type_id"
            id="character_type"
            v-model="characteristicData.characteristic_type_id"
            required
        >
          <option value="" disabled selected>Выберите тип характеристики</option>
          <option v-for="characteristicType in characteristicTypes" :key="characteristicType.id" :value="characteristicType.id">
            {{ characteristicType.type }}
          </option>
        </select>
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
import Layout from "@/components/Layout"

export default {
  name: "CharacterCreate",
  components: {
    Layout
  },
  data() {
    return {
      characteristicData: {
        name: '',
        slug: '',
        in_percent: 0,
        characteristic_type_id: ''
      },
      characteristicTypes: []
    }
  },
  mounted() {
    this.getBasicData()
  },
  methods: {
    createCharacteristic() {
      const data = this.characteristicData

      this.$axios.post('/admin/characteristics', data)
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ name: 'Characteristics' })
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
      this.$axios.get('/admin/characteristics/create')
          .then((response) => {
            const data = response.data.data

            this.characteristicTypes = data.characteristic_types
          })
          .finally(() => this.loaded = true)
    }
  }
}
</script>

<style scoped>

</style>
