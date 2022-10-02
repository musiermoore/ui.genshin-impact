<template>
  <div class="weapon-card" :style="styles">
    <div :class="['weapon-image-block']">
      <img
          :src="getWeaponImage(weapon)"
          :alt="weapon.name"
          :title="weapon.name"
          class="weapon-card-image"
          style="max-height: 200px; width: 200px"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "WeaponCard",
  props: {
    weapon: Object,
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
    getWeaponImage(weapon) {
      const images = weapon?.images

      const mainImage = images
          ? images.find(image => image.image_type.slug === 'main')
          : null

      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : `${this.$storageUrl}/images/shadow_weapon.png`
    }
  }
}
</script>

<style scoped>
.weapon-card {
  display: inline-block;
}

.weapon-image-block {
  display: flex;
  justify-content: center;
  max-height: 170px;
  max-width: 170px;

  border: 2px solid #fff;
  border-radius: 20px;
  overflow: hidden;
}

.weapon-card-image {
  object-fit: contain;
  overflow: hidden;
  max-width: 100%;
  max-height: 100%;
}
</style>
