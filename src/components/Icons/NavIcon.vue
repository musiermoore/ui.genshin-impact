<template>
  <div :style="styles"></div>
</template>

<script>
import icon from "@/assets/icons/nav-icon.png"

export default {
  name: 'NavIcon',
  props: {
    size: Number
  },
  computed: {
    styles() {
      return {
        width: this.width,
        height: this.height,
        background: `url(${icon}) no-repeat center center`,
        backgroundSize: 'cover',
        content: '1'
      }
    },
    width() {
      console.log(icon);
      return (this.size ? this.size : 20) + 'px'
    },
    height() {
      return (this.size ? this.size : 20) + 'px'
    }
  }
}
</script>

<style scoped>
.nav-icon {
  width: 20px;
  height: 20px;
  background: ;
}
</style>
