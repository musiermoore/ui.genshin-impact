<template>
  <div class="d-flex flex-column">
    <h4>Оружие:</h4>
    <div>
      <WeaponCard
          :weapon="selectedWeapon"
          :pointer="true"
          @click="openCalculatorSelector"
      />
    </div>

    <div v-if="selectedWeapon && selectedWeapon.id" class="d-flex flex-wrap" style="gap: 10px 10px">
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
            {{ selectedWeapon.selected_level_characteristics?.base_atk ? selectedWeapon.selected_level_characteristics?.base_atk : 0 }}
          </div>
          <div>
            {{ selectedWeapon.sub_stat.name }}:
            {{
              selectedWeapon.selected_level_characteristics?.sub_stat?.value
                  ? selectedWeapon.selected_level_characteristics.sub_stat.value
                  : 0
            }}{{ selectedWeapon.sub_stat?.in_percent ? '%' : '' }}
          </div>
          <div class="mb-3 range" v-if="selectedWeapon">
            <label for="selected-character" class="form-label">
              Уровень: {{ selectedWeapon.selected_level_characteristics.level.level }}/{{ selectedWeapon.selected_level_characteristics.ascension.max_level }}
            </label>
            <input
                type="range"
                class="form-range"
                :disabled="!selectedWeapon"
                v-model="selectedWeaponLevelIndex"
                @input="setSelectedWeaponLevel"
                min="0"
                :max="selectedWeapon.characteristics.length - 1"
            >
          </div>
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
      selectedWeaponId: 0,
      selectedWeaponLevelIndex: 0
    }
  },
  mounted() {

  },
  computed: {
    selectedWeapon() {
      return this.$store.getters.selectedCalculatorWeapon
    },
    character() {
      return this.$store.getters.selectedCalculatorCharacter
    },
    weapons() {
      return this.$store.getters.calculatorWeapons
    },
    characterWeapons() {
      return this.weapons.filter(weapon => weapon.weapon_type.slug === this.character?.weapon_type?.slug)
    },
  },
  watch: {

  },
  methods: {
    setSelectedWeaponLevel() {

    },
    openCalculatorSelector() {
      this.$emit('change-calculator-selector-visible', true)
      this.$emit('change-calculator-selector-tab', 'weapon')
    }
  }
}
</script>

<style scoped>

</style>
