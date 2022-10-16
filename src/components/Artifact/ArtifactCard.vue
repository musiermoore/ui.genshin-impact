<template>
  <div class="artifact-card" :style="styles">
    <div :class="['artifact-image-block']">
      <img
          :src="getArtifactImage()"
          :alt="artifact ? artifact.name : ''"
          :title="artifact ? artifact.name : ''"
          :class="['artifact-card-image']"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ArtifactCard",
  props: {
    artifact: Object,
    artifactType: Object,
    pointer: Boolean
  },
  data() {
    return {

    }
  },
  computed: {
    styles() {
      return {
        cursor: this.pointer ? 'pointer' : 'auto'
      }
    }
  },
  mounted() {

  },
  methods: {
    getArtifactImage() {
      return this.artifact?.artifact_id
          ? `${this.$storageUrl}/${this.artifact.image_path}`
          : `${this.$publicAssetsUrl}/images/artifacts/icons/${this.artifactType.slug}.png`
    }
  }
}
</script>

<style scoped>
.artifact-card {
  display: block;
  height: 100%;
  align-self: stretch;
}

.artifact-image-block {
  height: 100%;
  display: flex;
  justify-content: center;
  max-height: 170px;
  max-width: 170px;

  border: 2px solid #fff;
  border-radius: 20px;
  overflow: hidden;
}

.artifact-card-image {
  object-fit: contain;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
}

.artifact-card.artifact-card-medium .artifact-image-block {
  width: 110px;
  height: 125px;
}
.artifact-card.artifact-card-small .artifact-image-block {
  width: 80px;
  height: 90px;
}
</style>
