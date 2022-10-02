<template>
  <layout>
    <div class="characteristics d-flex justify-content-between align-items-center mb-3">
      <h1>Характеристики:</h1>
      <div>
        <router-link
            :to="{ name: 'Create Characteristic' }"
            class="btn btn-primary"
            tag="button"
        >
          Создать характеристику
        </router-link>
      </div>
    </div>

    <table class="table table-borderless table-bordered my-3 text-white" v-if="loaded">
      <thead>
      <tr>
        <th>Название</th>
        <th>Уникальный идентификатор</th>
        <th>Тип характеристики</th>
        <th>Значение</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="characteristic in characteristics" :key="characteristic.id">
        <td>{{ characteristic.name }}</td>
        <td>{{ characteristic.slug }}</td>
        <td>{{ characteristic.characteristic_type.type }}</td>
        <td>{{ getPercentValue(characteristic.in_percent) }}</td>
      </tr>
      </tbody>
    </table>
    <DataLoader v-else />
  </layout>
</template>

<script>
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"

export default {
  name: "Characteristics",
  components: {
    DataLoader,
    'layout': Layout
  },
  data() {
    return {
      characteristics: [],
      loaded: false
    }
  },
  mounted() {
    this.getCharacteristics()
  },
  methods: {
    getCharacteristics() {
      this.$axios.get('/admin/characteristics')
          .then((response) => {
            if (response.status === 200) {
              this.characteristics = response.data.data.characteristics
            }
          })
          .finally(() => this.loaded = true)
    },
    getPercentValue(value) {
      return value ? 'В процентах' : 'Числовое'
    }
  }
}
</script>

<style scoped>

</style>
