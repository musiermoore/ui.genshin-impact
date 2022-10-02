<template>
  <div class="calculator-selector">
    <div
        class="calculator-selector__overlay"
        @click="closeModal()"
    ></div>
    <div class="selectors">
      <div class="tabs">
        <div
            :class="{ 'tab': true, 'active': activeTab === 'character' }"
            @click="setActiveTab('character')"
        >Персонаж</div>
        <div
            :class="{ 'tab': true, 'active': activeTab === 'weapon' }"
            @click="setActiveTab('weapon')"
        >Оружие</div>
        <div
            :class="{ 'tab': true, 'active': activeTab === 'artifacts' }"
            @click="setActiveTab('artifacts')"
        >Артефакты</div>
      </div>
      <div class="sections">
        <div v-if="activeTab === 'character'" class="section-body character">
          <CharacterSection

          />
        </div>
        <div v-else-if="activeTab === 'weapon'" class="section-body weapon">
          <WeaponSection />
        </div>
        <div v-else-if="activeTab === 'artifacts'" class="section-body artifacts">
          В разработке
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CharacterSection from "./components/CharacterSection"
import WeaponSection from "./components/WeaponSection"

export default {
  name: "CalculatorSelector",
  components: {
    CharacterSection,
    WeaponSection
  },
  props: {
    tab: {
      type: String,
      default: 'character'
    }
  },
  data() {
    return {
      activeTab: 'character'
    }
  },
  watch: {
    tab(tab) {
      this.setActiveTab(tab)
    }
  },
  mounted() {

  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab
    },
    closeModal() {
      this.$emit('close-calculator-selector')
    }
  }
}
</script>

<style scoped>
.calculator-selector__overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20;
}
.calculator-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 21;

}
.calculator-selector .selectors {
  width: 100%;
  height: 100%;
  max-width: 750px;
  max-height: 750px;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: var(--main-color);
  z-index: 20;
  overflow: hidden;
}

.calculator-selector .selectors .tabs {
  padding-bottom: 5px;
  position: relative;
  display: flex;
  justify-content: stretch;
  align-self: stretch;
}
.calculator-selector .selectors .tabs .tab {
  display: flex;
  padding: 10px;
  border-bottom: 2px solid #fff;
  cursor: pointer;
  background-color: #555b97;
  transition-duration: .25s;
}
.calculator-selector .selectors .tabs .tab:hover {
  background-color: var(--main-color);
}
.calculator-selector .selectors .tabs:after {
  content: "";
  width: 100%;
  padding: 10px;
  background-color: #555b97;
  border-bottom: 2px solid #fff;
}
.calculator-selector .selectors .tabs .tab.active {
  border-right: 2px solid #fff;
  border-left: 2px solid #fff;
  background-color: revert !important;
}
.calculator-selector .selectors .tabs .tab:last-of-type {
  border-right-color: transparent;
}
.calculator-selector .selectors .tabs .tab:first-of-type {
  border-left-color: transparent;
}
.calculator-selector .selectors .tabs .tab.active:last-of-type {
  border-right: 2px solid #fff;
}
.calculator-selector .selectors .sections {
  display: flex;
  height: 100%;
  overflow: hidden;
}
.calculator-selector .selectors .sections .section-body  {
  padding: 5px 10px;
}
</style>
<style>
.calculator-selector .calculator-list {
  max-height: 100%;
  /*height: 100%;*/
  overflow: hidden;
}
</style>
