<template>
  <div :class="['artifact', slug]">
    <img
        :src="`${this.$publicAssetsUrl}/images/artifacts/icons/${slug}.png`"
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
    }
  }
}
</script>

<style scoped>

</style>
