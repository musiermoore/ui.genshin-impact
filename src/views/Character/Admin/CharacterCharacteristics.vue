<template>
  <Layout>
    <div v-if="loaded">
      <h1>
        Характеристики персонажа <router-link
          :to="{ name: 'Edit Character', params: { id: characterLevel.character.id }}"
          class="text-decoration-none"
        >{{ characterLevel.character.name }}</router-link>
        - {{ characterLevel.level.level }}/{{ characterLevel.ascension.max_level }}
      </h1>
      <table class="table table-borderless table-bordered characteristics mb-3">
        <thead>
          <tr>
            <th>Характеристика</th>
            <th>Значение</th>
          </tr>
        </thead>
        <tbody>
          <tr class="characteristic" v-for="characteristic in characterLevel.characteristics" :key="characteristic.id">
            <td>
              {{ characteristic.name }}
            </td>
            <td>
              {{ characteristic.pivot.value }}{{ showPercent(characteristic) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="add-characteristic">
        <h3>Добавить/изменить характеристику:</h3>
        <form @submit.prevent="createCharacteristic">
          <div class="mb-3">
            <label for="characteristic" class="form-label">Характерестика:</label>
            <select
                class="form-select"
                name="characteristic_id"
                id="characteristic"
                v-model="characteristicSaveData.characteristic_id"
                @change="fillValue()"
                required
            >
              <option value="" disabled selected>Выберите характеристику</option>
              <option v-for="characteristic in characteristics" :key="characteristic.id" :value="characteristic.id">
                {{ characteristic.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="characteristic-value" class="form-label">Значение:</label>
            <input type="number" step="any" class="form-control" id="characteristic-value" v-model="characteristicSaveData.value" required>
          </div>

          <div class="mb-3">
            <button type="submit" class="btn btn-primary" id="add-characteristic">
              {{ getSubmitText() }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <DataLoader v-else />
  </Layout>
</template>

<script>
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"

export default {
  name: "CharacterCharacteristics",
  components: {
    DataLoader,
    Layout
  },
  data() {
    return {
      characterLevel: {},
      characteristics: [],
      characteristicSaveData: {
        characteristic_id: '',
        value: '',
        characteristic_name: '',
        in_percent: false
      },
      loaded: false
    }
  },
  mounted() {
    this.getBasicData()
  },
  methods: {
    createCharacteristic() {
      const formData = new FormData()
      const data = this.characteristicSaveData

      for (let key in data) {
        formData.append(key, data[key]);
      }

      this.$axios.post(
          `/admin/characters/${this.$route.params.characterId}/levels/${this.$route.params.levelId}/characteristics`,
          formData
      ).then((response) => {
          if (response.status === 200) {
            const index = this.characterLevel.characteristics.findIndex((characteristic) => {
              return characteristic.id === data.characteristic_id
            })
            if (index === -1) {
              this.characterLevel.characteristics.push({
                id: data.characteristic_id,
                name: data.characteristic_name,
                pivot: {
                  value: data.value
                },
                in_percent: data.in_percent
              })
            } else {
              this.characterLevel.characteristics[index].pivot.value = data.value
            }
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
      this.$axios.get(`/admin/characters/${this.$route.params.characterId}/levels/${this.$route.params.levelId}/characteristics`)
          .then((response) => {
            const data = response.data.data
            console.log(data);
            this.characterLevel = data.character_level
            this.characteristics = data.characteristics
          })
          .finally(() => this.loaded = true)
    },
    showPercent(characteristic) {
      return characteristic.in_percent ? '%' : ''
    },
    fillValue() {
      const characteristicId = this.characteristicSaveData.characteristic_id
      const characteristic = this.characteristics.find(characteristic => {
        return characteristic.id === characteristicId
      })
      this.characteristicSaveData.characteristic_name = characteristic.name
      this.characteristicSaveData.in_percent = characteristic.in_percent === 1

      if (!characteristicId) {
        this.characteristicSaveData.value = ''
      } else {
        const characteristic = this.characterLevel.characteristics.find((characteristic) => {
          return characteristic.id === characteristicId
        })
        console.log(characteristic);
        if (characteristic?.pivot?.value) {
          this.characteristicSaveData.value = characteristic.pivot.value
        } else {
          this.characteristicSaveData.value = ''
        }
      }
    },
    getSubmitText() {
      const characteristicId = this.characteristicSaveData.characteristic_id

      if (!characteristicId) {
        return 'Создать'
      } else {
        const characteristic = this.characterLevel.characteristics.find((characteristic) => {
          return characteristic.id === characteristicId
        })
        return characteristic ? 'Редактировать' : 'Создать'
      }
    }
  }
}
</script>

<style scoped>

</style>
