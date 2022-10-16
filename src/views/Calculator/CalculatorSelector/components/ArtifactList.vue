<template>
  <div class="calculator-list artifact-list">
    <div v-for="artifact in artifacts" v-bind:key="artifact.id" class="artifact-item">
      <ArtifactCard
          class="artifact-card-medium"
          :artifact="artifact"
          :artifactType="{ 'slug': artifact.artifact_type_slug }"
          :pointer="true"
          @click="selectArtifact(artifact)"
      />
    </div>
  </div>
</template>

<script>
import ArtifactCard from "@/components/Artifact/ArtifactCard"
import calculatorInformation from "@/mixins/Calculator/calculatorInformation";

export default {
  name: "WeaponList",
  components: {
    ArtifactCard
  },
  mixins: [
    calculatorInformation
  ],
  data() {
    return {

    }
  },
  computed: {
    artifacts() {
      return this.$store.getters.filteredCalculatorArtifacts
    }
  },
  methods: {
    selectArtifact(artifact) {
      if (artifact?.artifact_id) {
        if (!artifact.characteristics) {
          artifact.characteristics = []
          artifact.main_characteristic = {}
        }

        this.$store.commit('selectedCalculatorArtifact', artifact)
      }
    }
  }
}
</script>

<style scoped>
.artifact-list {
  display: grid !important;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  padding: 5px 0;
}
</style>
