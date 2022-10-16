<template>
  <div v-if="artifact && artifact.artifact_id">
    <div>
      Название: {{ artifact.artifact_name }}
    </div>
    <div>
      <div>
        Основная характеристика:
        <select
            name="main_characteristic"
            id="main_characteristic"
            :value="getArtifactCharacteristic()"
        >
          <option
              v-for="characteristic in artifactCharacteristics"
              v-bind:key="characteristic.id"
              :value="characteristic.id"
              @click="setSelectedMainCharacteristic(characteristic.id)"
          >{{ characteristic.name }}</option>
        </select>
      </div>
    </div>
    <div class="d-flex gap-1">
      Редкость:
      <div v-for="rarity in artifact.artifact_set.rarities" v-bind:key="rarity.id" class="d-flex gap-1">
        <input
            :id="`rarity-${rarity.id}`"
            type="radio"
            :value="rarity.id"
            v-model="selectedRarity"
            @click="selectedRarity = rarity.id"
        >
        <label :for="`rarity-${rarity.id}`">
          {{ rarity.rarity}}
        </label>
      </div>
    </div>
    <div>
      <div>Характеристики:</div>
      <div class="artifact-characteristics">
        <div v-for="(characteristic, index) in artifact.characteristics" v-bind:key="index" class="artifact-characteristic">
          {{ characteristic?.id ? index : index }}
        </div>
      </div>
      <div v-if="characteristicCanBeAdded">
        <button class="btn btn-primary" @click="addArtifactCharacteristic()">
          Добавить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: "ArtifactCharacteristics",
  props: {
    artifactSlug: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      selectedRarity: null,
      mainArtifactCharacteristicId: null
    }
  },
  computed: {
    artifact() {
      return this.$store.getters.selectedCalculatorArtifacts[this.artifactSlug]
    },
    artifactTypeCharacteristics() {
      return this.$store.getters.artifactTypeCharacteristics
    },
    artifactCharacteristics() {
      return this.artifactTypeCharacteristics
          && this.artifact?.artifact_type_slug
          && Object.prototype.hasOwnProperty.call(this.artifactTypeCharacteristics, this.artifact.artifact_type_slug)
        ? this.artifactTypeCharacteristics[this.artifact.artifact_type_slug].main_characteristics
        : null
    },
    mainArtifactCharacteristic() {
      const characteristics = this.$store.getters.selectedCalculatorArtifactCharacteristics

      return characteristics
        && this.artifact?.artifact_type_slug
        && Object.prototype.hasOwnProperty.call(characteristics, this.artifact.artifact_type_slug)
          ? characteristics[this.artifact.artifact_type_slug]
          : null
    },
    baseArtifactCharacteristics() {
      return this.$store.getters.baseArtifactCharacteristics
    },
    extraArtifactCharacteristics() {
      return this.$store.getters.extraArtifactCharacteristics
    },
    maximumNumberOfCharacteristics() {
      let numberOfCharacteristics = 4

      if (this.selectedRarity === 1) {
        numberOfCharacteristics = 1
      } else if (this.selectedRarity === 2) {
        numberOfCharacteristics = 2
      }

      return numberOfCharacteristics
    },
    characteristicCanBeAdded() {
      return this.artifact
          && Object.prototype.hasOwnProperty.call(this.artifact, 'characteristics')
          && this.artifact.characteristics.length < this.maximumNumberOfCharacteristics
    }
  },
  mounted() {
    // this.setSelectedMainCharacteristic()
    // this.setSelectedRarity()
  },
  updated() {
    // this.setSelectedMainCharacteristic()
    // this.setSelectedRarity()
  },
  watch: {
    artifact: {
      handler() {
        this.setSelectedMainCharacteristic()
        this.setSelectedRarity()
      },
      deep: true
    }
  },
  methods: {
    addArtifactCharacteristic() {
      this.$store.commit('addArtifactCharacteristic', {
        artifact: this.artifact,
        characteristic: this.getRandomCharacteristic()
      })
    },
    setMainArtifactCharacteristic(id = 0) {
      this.$store.commit('setMainArtifactCharacteristic', {
        artifact: this.artifact,
        characteristic: this.artifactCharacteristics.find(characteristic => characteristic.id === id)
      })
    },
    getRandomCharacteristic() {
      const artifactType = this.artifactTypeCharacteristics[this.artifact.artifact_type_slug]

      let characteristic = null
      if (artifactType?.main_characteristics) {
        characteristic = _.sample(artifactType.main_characteristics)
      }

      return characteristic
    },
    setSelectedRarity() {
      if (!this.selectedRarity && this.artifact?.artifact_set?.rarities) {
        this.selectedRarity = this.artifact.artifact_set.rarities[0].id
      }
    },
    setSelectedMainCharacteristic() {
      if (
          !this.mainArtifactCharacteristic?.id
      ) {
        this.mainArtifactCharacteristicId = this.getArtifactCharacteristic()
        this.setMainArtifactCharacteristic()
      }
    },
    getArtifactCharacteristic() {
      return this.mainArtifactCharacteristic?.id ? this.mainArtifactCharacteristic.id : 0
    }
  }
}
</script>

<style scoped>

</style>
