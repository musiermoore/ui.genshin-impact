<template>
  <div :class="['artifact', slug]" :style="styles">
    <img
        :src="getArtifactImage(artifact)"
        alt=""
        class="artifact-image"
    >
  </div>
</template>

<script>
export default {
  name: "SelectedArtifact",
  props: {
    slug: {
      type: String,
      default: 'flower-of-life'
    },
    pointer: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    artifact() {
      return Object.prototype.hasOwnProperty.call(this.$store.getters.selectedCalculatorArtifacts, this.slug)
        ? this.$store.getters.selectedCalculatorArtifacts[this.slug]
        : null
    },
    styles() {
      return {
        cursor: this.pointer ? 'pointer' : 'auto'
      }
    }
  },
  methods: {
    getArtifactImage(artifact) {

      const mainImage = artifact?.image_type_slug === 'main'
          ? artifact.image_path
          : null

      return mainImage
          ? `${this.$storageUrl}/${mainImage  }`
          : `${this.$publicAssetsUrl}/images/artifacts/icons/${this.slug}.png`
    }
  }
}
</script>

<style scoped>
.artifact-image {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}
</style>
