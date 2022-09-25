<template>
  <div>
    <h4>Артефакты</h4>
    <div class="artifacts">
      <div v-for="artifactType in artifactTypes" :key="artifactType.slug">
        <SelectedArtifact
            :slug="artifactType.slug"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectedArtifact from "./SelectedArtifact";

export default {
  name: "SelectedArtifactsInfo",
  components: {
    SelectedArtifact,
  },
  data() {
    return {
      artifactTypes: [
        {
          slug: 'flower-of-life'
        },
        {
          slug: 'plume-of-death'
        },
        {
          slug: 'sands-of-eon'
        },
        {
          slug: 'goblet-of-eonothem'
        },
        {
          slug: 'circlet-of-logos'
        },
      ]
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
  height: 80px;
  border: 2px solid #fff;
  border-radius: 50%;
  overflow: hidden;
}

.artifacts .artifact .artifact-image {
  width: auto;
  height: auto;
}
</style>
