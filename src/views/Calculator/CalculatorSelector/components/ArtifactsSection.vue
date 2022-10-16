<template>
  <div class="section-content">
    <div class="selected-artifacts">
      <div v-for="artifactType in artifactTypes" v-bind:key="artifactType.slug">
        <ArtifactCard
            class="artifact-card-small"
            :class="{ 'selected-artifact-type': selectedArtifactSlug === artifactType.slug }"
            :pointer="true"
            :artifact="getArtifact(artifactType.slug)"
            :artifactType="artifactType"
            @click="filterArtifacts(artifactType.slug, $event)"
        />
      </div>
    </div>

    <div v-if="selectedArtifactSlug && getArtifact(selectedArtifactSlug)" class="artifact-characteristics">
      <ArtifactCharacteristics
        :artifactSlug="selectedArtifactSlug"
      />
    </div>

    <div class="section-content-list">
      <h5>Список артефактов:</h5>
      <ArtifactList />
    </div>
  </div>
</template>

<script>
import ArtifactCard from "@/components/Artifact/ArtifactCard"
import getBaseArtifactInformation from "@/mixins/Calculator/getBaseArtifactInformation"
import ArtifactList from "./ArtifactList"
import ArtifactCharacteristics from "./ArtifactCharacteristics"

export default {
  name: "ArtifactsSection",
  components: {
    ArtifactCard,
    ArtifactList,
    ArtifactCharacteristics
  },
  mixins: [
    getBaseArtifactInformation
  ],
  data() {
    return {
      artifactTypes: this.getArtifactTypes(),
      selectedArtifactSlug: null
    }
  },
  computed: {
    selectedCalculatorArtifacts() {
      return this.$store.getters.selectedCalculatorArtifacts
    },
    artifacts() {
      return this.$store.getters.calculatorArtifacts
    }
  },
  methods: {
    getArtifact(slug) {
      return this.selectedCalculatorArtifacts[slug]
    },
    filterArtifacts(slug) {
      const artifacts = !slug || this.selectedArtifactSlug === slug
        ? this.artifacts
        : this.artifacts.filter(artifact => artifact.artifact_type_slug === slug)

      this.$store.commit('filteredCalculatorArtifacts', artifacts)

      this.selectedArtifactSlug = this.selectedArtifactSlug === slug ? null : slug
    }
  }
}
</script>

<style scoped>
.selected-artifacts {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0;
  gap: 10px;
}
.selected-artifact-type {
  box-shadow: 0 0 6px #05fff7;
  border-radius: 20px
}
</style>
