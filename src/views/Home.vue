<template>
  <layout>
    <div>
      Здесь будет информация по следующим фичам/багам, но пока ничего нет ¯\_(ツ)_/¯
    </div>
    <div>
      <img :src="`${homeUrl}/images/home.jpg`" alt="Королева" style="max-height: 500px">
    </div>
  </layout>
</template>

<script>
import Layout from "@/components/Layout";

export default {
  name: "Home",
  components: {
    'layout': Layout
  },
  data() {
    return {
      homeUrl: this.$storageUrl
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
