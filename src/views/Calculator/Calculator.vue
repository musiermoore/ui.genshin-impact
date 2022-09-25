<template>
  <Layout>
    <div v-if="loaded">
      <form method="GET">
        <div class="calculator">
          <div class="character-info">
            <div class="mb-3">
              <h4>
                <label for="selected-character" class="form-label">Персонаж:</label>
              </h4>
              <div>
                <CharacterCard
                    ref="selected_character"
                    :character="selectedCharacter"
                    :pointer="true"
                    @click="openCharacterSelector"
                />
                <CharacterSelector
                    ref="character_selector"
                    :show="showCharacterSelectorModal"
                    :positions="selectorPositions"
                    @selectCharacter="updateSelectedCharacterId($event)"
                />
              </div>
            </div>
            <div v-if="selectedCharacterId">
              <SelectedCharacterInfo
                  :selectedCharacter="selectedCharacter"
                  :characterLevel="characterLevel"
                  :selectedCharacterLevelIndex="selectedCharacterLevelIndex"
                  @set-selected-character-level="setSelectedCharacterLevel($event)"
              />
              <div class="d-flex flex-column">
                <h4>Оружие:</h4>
                <select
                    name="selected-weapon"
                    id="selected-weapon"
                    class="form-control mb-2"
                    v-model="selectedWeaponId"
                    @change="updateSelectedWeapon"
                >
                  <option value="0">Без оружия</option>
                  <option
                      v-for="weapon in characterWeapons"
                      :key="weapon.id"
                      :value="weapon.id"
                  >
                    {{ weapon.name }}
                  </option>
                </select>
                <div v-if="selectedWeaponId" class="d-flex flex-wrap" style="gap: 10px 10px">
                  <div v-if="selectedWeapon && selectedWeaponId !== 0" class="d-flex justify-content-center list-item-image my-2">
                    <img
                        :src="getWeaponImage(selectedWeapon)"
                        :alt="selectedWeapon.name"
                        class=""
                        style="max-height: 200px; width: 200px"
                    >
                  </div>
                  <div v-if="selectedWeapon && selectedWeaponId !== 0">
                    <div>
                      <div>
                        Имя: {{ selectedWeapon.name }}
                      </div>
                      <div>
                        Редкость: {{ selectedWeapon.rarity.rarity }}
                      </div>
                      <div>
                        Тип оружия: {{ selectedWeapon.weapon_type.type }}
                      </div>
                      <div>
                        Базовая атака:
                        {{ selectedWeaponCharacteristics?.base_atk ? selectedWeaponCharacteristics?.base_atk : 0 }}
                      </div>
                      <div>
                        {{ selectedWeapon.sub_stat.name }}:
                        {{ selectedWeaponCharacteristics?.sub_stat?.value ? selectedWeaponCharacteristics.sub_stat.value : 0 }}
                      </div>
                      <div class="mb-3 range" v-if="selectedWeapon">
                        <label for="selected-character" class="form-label">
                          Уровень: {{ selectedWeaponCharacteristics.level.level }}/{{ selectedWeaponCharacteristics.ascension.max_level }}
                        </label>
                        <input
                            type="range"
                            class="form-range"
                            :disabled="!selectedWeapon"
                            v-model="selectedWeaponLevelIndex"
                            @input="getSelectedWeaponLevel"
                            min="0"
                            :max="selectedWeapon.characteristics.length - 1"
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="selectedCharacter" class="character-characteristics">
            <SelectedArtifactsInfo />

            <h4>Характеристики</h4>
            <div v-if="calculatedCharacteristics">
              <table class="table table-strip">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Значение</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                      v-for="characteristic in calculatedCharacteristics"
                      :value="characteristic.id"
                      :key="characteristic.id"
                  >
                    <td>
                      {{ characteristic.name }}
                    </td>
                    <td>
                      {{ Math.round((Number(characteristic.value) + Number.EPSILON) * 100) / 100 }}{{ characteristic.in_percent ? '%' : '' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
    <DataLoader v-else />
  </Layout>
</template>

<script>
import _ from 'lodash'
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"
import CharacterCard from "@/views/Character/List/components/CharacterCard"
import CharacterSelector from "./components/CharacterSelector"
import SelectedCharacterInfo from "./components/SelectedCharacterInfo"
import SelectedArtifactsInfo from "./components/SelectedArtifactsInfo"

export default {
  name: "Calculator",
  components: {
    SelectedCharacterInfo,
    CharacterSelector,
    CharacterCard,
    DataLoader,
    Layout,
    SelectedArtifactsInfo
  },
  data() {
    return {
      loaded: false,
      weaponLoaded: false,
      selectedCharacterId: '',
      selectedCharacter: null,
      selectedCharacterLevelIndex: "0",
      characterCharacteristics: [],
      calculatedCharacteristics: {},
      selectedWeaponId: 0,
      selectedWeaponLevelIndex: 0,
      selectedWeapon: {},
      selectedWeaponCharacteristics: {},
      selectorPositions: {
        right: '100px',
        top: null
      },
      showCharacterSelectorModal: false
    }
  },
  mounted() {
    this.getCharacteristics()
    this.getCharacters()
    this.getWeapons()
  },
  computed: {
    characters() {
      return this.$store.getters.calculatorCharacters
    },
    defaultCharacteristics: {
      cache: false,
      get() {
        return this.$store.getters.calculatorCharacteristics
      }
    },
    weapons() {
      return this.$store.getters.calculatorWeapons
    },
    characterWeapons() {
      return this.weapons.filter(weapon => weapon.weapon_type.slug === this.selectedCharacter.weapon_type.slug)
    },
    characterLevel() {
      return this.selectedCharacter?.character_levels && (this.selectedCharacterLevelIndex !== undefined)
          ? this.selectedCharacter.character_levels[this.selectedCharacterLevelIndex]
          : null
    }
  },
  watch: {
    characterLevel: {
      handler() {
        this.getSelectedCharacterLevel()
      },
      deep: true
    }
  },
  methods: {
    getCharacters() {
      if (this.characters?.length) {
        this.loaded = true
        return;
      }

      this.$axios.get('/characters/calculator')
          .then((response) => {
            if (response.status === 200) {
              this.$store.commit('calculatorCharacters', response.data.data.characters)
            }
          })
          .finally(() => this.loaded = true)
    },
    getWeapons() {
      if (this.weapons?.length) {
        this.weaponLoaded = true
        return;
      }

      this.$axios.get('/weapons/calculator')
          .then((response) => {
            if (response.status === 200) {
              this.$store.commit('calculatorWeapons', response.data.data.weapons)
            }
          })
          .finally(() => this.weaponLoaded = true)
    },
    getCharacteristics() {
      if (!_.isEmpty(this.defaultCharacteristics)) {
        return
      }

      this.$axios.get('/characters/calculator/characteristics')
          .then((response) => {
            if (response.status === 200) {
              this.$store.commit('calculatorCharacteristics', response.data.data.characteristics)
            }
          })
    },
    updateSelectedCharacterId(characterId) {
      this.selectedCharacterId = characterId
      this.showCharacterSelectorModal = false
      this.updateSelectedCharacter()
    },
    updateSelectedCharacter() {
      this.selectedCharacter = this.characters.find(character => character.id === this.selectedCharacterId)
      this.selectedCharacterLevelIndex = "0"
      this.getSelectedCharacterLevel()

      if (!this.findWeaponByCurrenCharacter()) {
        this.updateSelectedWeapon()
      }
    },
    findWeaponByCurrenCharacter() {
      return this.characterWeapons.find(weapon => weapon.id === this.selectedWeaponId)
    },
    updateSelectedWeapon() {
      this.selectedWeapon = this.findWeaponByCurrenCharacter()

      if (!this.selectedWeapon) {
        this.selectedWeaponId = 0
      }

      this.selectedWeaponLevelIndex = 0
      this.getSelectedWeaponLevel()
    },
    setSelectedCharacterLevel(index) {
      this.selectedCharacterLevelIndex = index
    },
    getSelectedCharacterLevel() {
      if (this.characterLevel?.characteristics) {
        this.characterCharacteristics = this.characterLevel.characteristics
        this.calculateCharacteristics()
      }
    },
    getSelectedWeaponLevel() {
      const weaponCharacteristic = this.selectedWeapon?.characteristics
          ? this.selectedWeapon.characteristics[this.selectedWeaponLevelIndex]
          : null
      if (_.isEmpty(weaponCharacteristic)) {
        this.selectedWeaponCharacteristics = null
      } else {
        this.selectedWeaponCharacteristics = weaponCharacteristic
      }
      this.calculateCharacteristics()
    },
    getCharacterImage(character) {
      const images = character.images

      if (!images) {
        return null
      }

      const mainImage = images.find(image => image.image_type.slug === 'main')

      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : null
    },
    getWeaponImage(weapon) {
      if (!weapon) {
        return null
      }

      const images = weapon.images

      if (!images) {
        return null
      }

      const mainImage = images.find(image => image.image_type.slug === 'main')

      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : null
    },
    getBackgroundColorByElement(element) {
      return element.slug + '-background'
    },
    calculateCharacteristics() {
      const calculatedCharacteristics = _.cloneDeep(this.defaultCharacteristics)

      const calculatedKeys = Object.keys(calculatedCharacteristics)

      calculatedKeys.forEach((key) => {
        calculatedCharacteristics[key]['value'] = this.calculate(key)
      })

      this.calculatedCharacteristics = calculatedCharacteristics
    },
    calculate(characteristicName) {
      const characteristics = this.characterLevel.characteristics

      let additionalValue = Number(0.00)

      const percentCharacteristicName = this.getPercentCharacteristicName(characteristicName)

      const baseValue = this.getBaseCharacteristicValue(characteristicName)

      if (percentCharacteristicName) {
        const characteristic = characteristics.find((characteristic) => {
          return characteristic.slug === percentCharacteristicName
        })

        // a weapon
        if (this.selectedWeapon?.sub_stat?.slug === percentCharacteristicName && this.selectedWeaponCharacteristics?.sub_stat?.value) {
          const subStat = (
              this.selectedWeaponCharacteristics.sub_stat.value / 100
          ).toFixed(2)

          additionalValue += Number(Math.floor(baseValue * subStat))
        }

        // a character characteristic
        if (characteristics) {
          if (characteristic) {
            additionalValue += Number(Math.floor(baseValue * (characteristic['value'] / 100)).toFixed(2))
          }
        }
      } else {
        if (this.selectedWeapon?.sub_stat?.slug === characteristicName && this.selectedWeaponCharacteristics?.sub_stat?.value) {
          const subStat = this.selectedWeaponCharacteristics.sub_stat.value

          additionalValue += Number(subStat)
        }
      }

      return baseValue + additionalValue
    },
    findCharacterCharacteristic(name) {
      return this.characterCharacteristics.find(characteristic => characteristic.slug === name)?.value
        ? this.characterCharacteristics.find(characteristic => characteristic.slug === name).value
        : 0
    },
    findDefaultCharacterCharacteristic(name) {
      const defaultCharacteristics = this.defaultCharacteristics

      return Object.prototype.hasOwnProperty.call(defaultCharacteristics, name) && ['energy-recharge'].includes(name)
        ? defaultCharacteristics[name].value
        : 0
    },
    getBaseCharacteristicValue(characteristicName) {
      const weaponAtk = characteristicName === 'atk' && this.selectedWeaponCharacteristics?.base_atk
          ? this.selectedWeaponCharacteristics.base_atk
          : 0

      const characteristicValue = this.findCharacterCharacteristic(characteristicName)
      const defaultCharacteristicValue = this.findDefaultCharacterCharacteristic(characteristicName)

      const baseValue = Number(characteristicValue) + Number(defaultCharacteristicValue) + Math.floor(weaponAtk)

      return baseValue ? baseValue : 0
    },
    getPercentCharacteristicName(characteristicName) {
      return ['atk', 'hp', 'def'].includes(characteristicName)
          ? `${characteristicName}-percent`
          : null
    },
    openCharacterSelector() {
      this.showCharacterSelectorModal = !this.showCharacterSelectorModal
      this.setModalPositions()
    },
    setModalPositions() {
      const $element = this.$refs.selected_character.$el

      this.selectorPositions = {
        'left': Number($element.offsetLeft) + 'px',
        'top': $element.offsetTop + $element.clientHeight + 25 + 'px'
      }
    }
  }
}
</script>

<style scoped>
.calculator {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem 2rem;
}

.calculator .character-info {
  flex-basis: 35%;
}

.calculator .character-characteristics {
  flex-basis: 50%;

}

.list-item-image {
  width: 200px;
  height: 200px;
  position: relative;
  border: 1px solid rgba(30, 30, 30, 0.5);
  border-radius: 3px;
}

table.table {
  color: #fff;
  width: 100%;
}
</style>
