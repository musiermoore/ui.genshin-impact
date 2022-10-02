<template>
  <div>
    <div>
      <WeaponCard
          :weapon="{ name: null }"
      />
    </div>

    <div v-if="selectedCalculatorWeapon && selectedCalculatorWeapon.id" class="d-flex flex-wrap" style="gap: 10px 10px">
      <div v-if="selectedCalculatorWeapon">
        <div>
          <div>
            Имя: {{ selectedCalculatorWeapon.name }}
          </div>
          <div>
            Редкость: {{ selectedCalculatorWeapon.rarity.rarity }}
          </div>
          <div>
            Тип оружия: {{ selectedCalculatorWeapon.weapon_type.type }}
          </div>
          <div>
            Базовая атака:
            {{ selectedCalculatorWeapon.selected_level_characteristics?.base_atk ? selectedCalculatorWeapon.selected_level_characteristics?.base_atk : 0 }}
          </div>
          <div>
            {{ selectedCalculatorWeapon.sub_stat.name }}:
            {{
              selectedCalculatorWeapon.selected_level_characteristics?.sub_stat?.value
                  ? selectedCalculatorWeapon.selected_level_characteristics.sub_stat.value
                  : 0
            }}{{ selectedCalculatorWeapon.sub_stat?.in_percent ? '%' : '' }}
          </div>
          <div class="mb-3 range" v-if="selectedCalculatorWeapon">
            <label for="selected-character" class="form-label">
              Уровень: {{ selectedCalculatorWeapon.selected_level_characteristics.level.level }}/{{ selectedCalculatorWeapon.selected_level_characteristics.ascension.max_level }}
            </label>
            <input
                type="range"
                class="form-range"
                :disabled="!selectedCalculatorWeapon"
                v-model="selectedCalculatorWeaponLevel"
                min="0"
                :max="selectedCalculatorWeapon.characteristics.length - 1"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeaponCard from "@/components/Weapon/WeaponCard"
import getBaseWeaponInformation from "@/mixins/Calculator/getBaseWeaponInformation"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation"

export default {
  name: "WeaponSection",
  components: {
    WeaponCard
  },
  mixins: [
    getBaseWeaponInformation,
    calculatorInformation
  ],
  data() {
    return {

    }
  },
  computed: {
    selectedCalculatorWeapon() {
      return this.$store.getters.selectedCalculatorWeapon
    },
    selectedCalculatorWeaponLevel: {
      get () {
        return this.$store.getters.selectedCalculatorWeaponLevel
      },
      set (level) {
        this.$store.commit('selectedCalculatorWeaponLevel', level)
      }
    }
  }
}
</script>

<style scoped>

</style>
