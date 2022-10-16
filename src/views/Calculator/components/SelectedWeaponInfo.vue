<template>
  <div class="d-flex flex-column">
    <h4>Оружие:</h4>
    <div class="d-flex flex-wrap gap-2">
      <WeaponCard
          :weapon="selectedWeapon"
          :pointer="true"
          @click="openCalculatorSelector"
      />

      <div v-if="selectedWeapon && selectedWeapon.id">
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
          {{ selectedWeapon.selected_characteristics?.base_atk ? selectedWeapon.selected_characteristics?.base_atk : 0 }}
        </div>
        <div>
          {{ selectedWeapon.sub_stat.name }}:
          {{
            selectedWeapon.selected_characteristics?.sub_stat?.value
                ? selectedWeapon.selected_characteristics.sub_stat.value
                : 0
          }}{{ selectedWeapon.sub_stat?.in_percent ? '%' : '' }}
        </div>
        <div class="mb-3 range" v-if="selectedWeapon">
          <label class="form-label">
            Уровень: {{ selectedWeapon.selected_characteristics.level.level }}/{{ selectedWeapon.selected_characteristics.ascension.max_level }}
          </label>
          <input
              type="range"
              class="form-range"
              :disabled="!selectedWeapon"
              v-model="selectedCalculatorWeaponLevel"
              min="0"
              :max="selectedWeapon.characteristics.length - 1"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WeaponCard from "@/components/Weapon/WeaponCard"

export default {
  name: "SelectedWeaponInfo",
  components: {
    WeaponCard
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  computed: {
    selectedWeapon() {
      return this.$store.getters.selectedCalculatorWeapon
    },
    selectedCalculatorWeaponLevel: {
      get () {
        return this.$store.getters.selectedCalculatorWeaponLevel
      },
      set (level) {
        this.$store.commit('selectedCalculatorWeaponLevel', level)
      }
    },
    character() {
      return this.$store.getters.selectedCalculatorCharacter
    },
    weapons() {
      return this.$store.getters.calculatorWeapons
    }
  },
  watch: {

  },
  methods: {
    openCalculatorSelector() {
      this.$emit('change-calculator-selector-visible', true)
      this.$emit('change-calculator-selector-tab', 'weapon')
    }
  }
}
</script>

<style scoped>

</style>
