<template>
  <div class="calculator-list weapon-list">
    <div v-for="weapon in weapons" v-bind:key="weapon.id" class="weapon-item">
      <WeaponCard
          :weapon="weapon"
          :pointer="true"
          @click="selectWeapon(weapon)"
      />
    </div>
  </div>
</template>

<script>
import WeaponCard from "@/components/Weapon/WeaponCard"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation";

export default {
  name: "WeaponList",
  components: {
    WeaponCard
  },
  mixins: [
    calculatorInformation
  ],
  data() {
    return {

    }
  },
  computed: {
    selectedCharacter() {
      return this.$store.getters.selectedCalculatorCharacter
    },
    selectedWeapon() {
      return this.$store.getters.selectedCalculatorWeapon
    },
    weapons() {
      return this.$store.getters.calculatorWeapons
          .filter(weapon => !this.selectedCharacter?.id || (weapon.weapon_type.slug === this.selectedCharacter.weapon_type.slug))
    }
  },
  methods: {
    selectWeapon(weapon) {
      if (weapon) {
        if (this.selectedWeapon?.id !== weapon?.id) {
          this.$store.commit('selectedCalculatorWeaponLevel', 0)
          weapon.selected_characteristics = this.getSelectedWeaponLevel(weapon, 0)
        }

        this.$store.commit('selectedCalculatorWeapon', weapon)
      }
    }
  }
}
</script>

<style scoped>

</style>
