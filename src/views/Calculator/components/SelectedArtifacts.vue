<template>
  <div>
    <h4>Артефакты (в разработке)</h4>
    <div class="artifacts">
      <div v-for="artifactType in artifactTypes" :key="artifactType.slug">
        <SelectedArtifact
            :slug="artifactType.slug"
            :pointer="true"
            @click="openCalculatorSelector"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectedArtifact from "./SelectedArtifact"
import getBaseArtifactInformation from "@/mixins/Calculator/getBaseArtifactInformation"

export default {
  name: "SelectedArtifacts",
  mixins: [
    getBaseArtifactInformation
  ],
  components: {
    SelectedArtifact,
  },
  data() {
    return {
      artifactTypes: this.getArtifactTypes()
    }
  },
  methods: {
    openCalculatorSelector() {
      this.$emit('change-calculator-selector-visible', true)
      this.$emit('change-calculator-selector-tab', 'artifacts')
    }
  }
}
</script>

<style scoped>
.artifacts {
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 10px;
}

.artifacts .artifact {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 90px;
  border: 2px solid #fff;
  border-radius: 20px;
  overflow: hidden;
}
</style>
