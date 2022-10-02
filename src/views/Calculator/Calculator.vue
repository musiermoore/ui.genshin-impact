<template>
  <Layout>
    <div v-if="loaded">
      <form method="GET">
        <div class="calculator">
          <div class="character-info">
            <div class="mb-3">
                <SelectedCharacterInfo
                  @change-calculator-selector-visible="changeCalculatorSelectorVisible($event)"
                  @change-calculator-selector-tab="changeCalculatorSelectorTab($event)"
                />
            </div>
            <div>
              <SelectedWeaponInfo
                @change-calculator-selector-visible="changeCalculatorSelectorVisible($event)"
                @change-calculator-selector-tab="changeCalculatorSelectorTab($event)"
              />

              <SelectedArtifacts
                  @change-calculator-selector-visible="changeCalculatorSelectorVisible($event)"
                  @change-calculator-selector-tab="changeCalculatorSelectorTab($event)"
              />
            </div>
          </div>

          <div v-if="character && character.id" class="character-characteristics">
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

    <CalculatorSelector
        v-show="showCalculatorSelector"
        :tab="calculatorSelectorTab"
        :character="character"
        :weapon="weapon"
        :artifacts="artifacts"
        @close-calculator-selector="changeCalculatorSelectorVisible(false)"
    />
  </Layout>
</template>

<script>
import _ from 'lodash'
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"
import CalculatorSelector from "./CalculatorSelector/CalculatorSelector"
import getBaseCharacterInformation from "@/mixins/Calculator/getBaseCharacterInformation"
import SelectedCharacterInfo from "./components/SelectedCharacterInfo"
import SelectedWeaponInfo from "./components/SelectedWeaponInfo"
import SelectedArtifacts from "./components/SelectedArtifacts"

export default {
  name: "Calculator",
  mixins: [getBaseCharacterInformation],
  components: {
    SelectedCharacterInfo,
    SelectedWeaponInfo,
    DataLoader,
    Layout,
    SelectedArtifacts,
    CalculatorSelector
  },
  data() {
    return {
      loaded: false,
      weaponLoaded: false,
      weapon: null,
      artifacts: {},
      calculatedCharacteristics: {},
      showCalculatorSelector: false,
      calculatorSelectorTab: 'character'
    }
  },
  mounted() {
    this.resetCalculatorCharacter()
    this.getCharacteristics()
    this.getCharacters()
    this.getWeapons()
  },
  computed: {
    characters() {
      return this.$store.getters.calculatorCharacters
    },
    weapons() {
      return this.$store.getters.calculatorWeapons
    },
    defaultCharacteristics: {
      cache: false,
      get() {
        return this.$store.getters.calculatorCharacteristics
      }
    },
    character() {
      return this.$store.getters.selectedCalculatorCharacter
    },
    weaponT() {
      return this.$store.getters.selectedCalculatorWeapon
    }
  },
  watch: {
    character: {
      handler() {
        this.calculateCharacteristics()
      },
      deep: true
    },
    weapon: {
      handler() {
        this.calculateCharacteristics()
      },
      deep: true
    }
  },
  methods: {
    resetCalculatorCharacter() {
      this.$store.commit('selectedCalculatorCharacter', this.getBaseCharacter())
      this.$store.commit('selectedCalculatorCharacterLevel', 0)
    },
    updateWeapon(weapon) {
      if (weapon?.id) {
        this.weapon = weapon
      } else {
        this.weapon = null
      }
    },
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
    calculateCharacteristics() {
      const calculatedCharacteristics = _.cloneDeep(this.defaultCharacteristics)

      const calculatedKeys = Object.keys(calculatedCharacteristics)

      calculatedKeys.forEach((key) => {
        calculatedCharacteristics[key]['value'] = this.calculate(key)
      })

      this.calculatedCharacteristics = calculatedCharacteristics
    },
    calculate(characteristicName) {
      if (!this.character?.character_level?.characteristics) {
        return
      }

      const characteristics = this.character.character_level.characteristics

      let additionalValue = Number(0.00)

      const percentCharacteristicName = this.getPercentCharacteristicName(characteristicName)

      const baseValue = this.getBaseCharacteristicValue(characteristicName)

      if (percentCharacteristicName) {
        const characteristic = characteristics.find((characteristic) => {
          return characteristic.slug === percentCharacteristicName
        })

        // a weapon
        if (this.weapon?.sub_stat?.slug === percentCharacteristicName && this.weapon.selected_level_characteristics?.sub_stat?.value) {
          const subStat = (
              this.weapon.selected_level_characteristics.sub_stat.value / 100
          ).toFixed(2)

          additionalValue += Number(Math.floor(baseValue * subStat))
        }

        // a character characteristic
        if (characteristic) {
          additionalValue += Number(Math.floor(baseValue * (characteristic['value'] / 100)).toFixed(2))
        }
      } else {
        if (this.weapon?.sub_stat?.slug === characteristicName && this.weapon.selected_level_characteristics?.sub_stat?.value) {
          const subStat = this.weapon.selected_level_characteristics.sub_stat.value

          additionalValue += Number(subStat)
        }
      }

      return baseValue + additionalValue
    },
    findCharacterCharacteristic(name) {
      return this.character.character_level.characteristics.find(characteristic => characteristic.slug === name)?.value
        ? this.character.character_level.characteristics.find(characteristic => characteristic.slug === name).value
        : 0
    },
    findDefaultCharacterCharacteristic(name) {
      const defaultCharacteristics = this.defaultCharacteristics

      return Object.prototype.hasOwnProperty.call(defaultCharacteristics, name) && ['energy-recharge'].includes(name)
        ? defaultCharacteristics[name].value
        : 0
    },
    getBaseCharacteristicValue(characteristicName) {
      const weaponAtk = characteristicName === 'atk' && this.weapon?.selected_level_characteristics?.base_atk
          ? this.weapon.selected_level_characteristics.base_atk
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
    changeCalculatorSelectorVisible(show = false) {
      this.showCalculatorSelector = show
    },
    changeCalculatorSelectorTab(tab = 'character') {
      this.calculatorSelectorTab = tab
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

table.table {
  color: #fff;
  width: 100%;
}
</style>
