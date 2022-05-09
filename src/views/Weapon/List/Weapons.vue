<template>
  <layout>
    <div class="lists-header">
      <h1>Оружие:</h1>
      <div>
        <router-link
            :to="{ name: 'Create Weapon' }"
            class="btn btn-primary"
            tag="button"
        >
          Добавить оружие
        </router-link>
      </div>
    </div>

    <div v-if="loaded">
      <div class="lists" v-if="weapons && weapons.length">
        <div class="list-item" v-for="weapon in weapons" :key="weapon.id">
          <div :class="['list-item-image-block border-0']">
            <router-link :to="{ name: 'Edit Weapon', params: { id: weapon.id }}">
              <img
                  :src="getWeaponImage(weapon)"
                  :alt="weapon.name"
                  class="list-item-image"
              >
            </router-link>
          </div>
          <div class="list-item-info">
            {{ weapon.name }}
          </div>
        </div>
      </div>
      <div v-else>
        Нет результатов.
      </div>
    </div>
    <DataLoader v-else />
  </layout>
</template>

<script>
import Layout from "@/components/Layout"
import DataLoader from "@/components/Loaders/DataLoader"

export default {
  name: "Weapons",
  components: {
    'layout': Layout,
    DataLoader
  },
  data() {
    return {
      weapons: [],
      loaded: false
    }
  },
  methods: {
    getWeapons() {
      this.$axios.get('/admin/weapons')
          .then((response) => {
            if (response.status === 200) {
              this.weapons = response.data.data.weapons
            }
          })
          .finally(() => this.loaded = true)
    },
    getWeaponImage(weapon) {
      const images = weapon.images

      const mainImage = images.find(image => image.image_type.slug === 'main')

      return mainImage
          ? `${this.$storageUrl}/${mainImage.path}`
          : `${this.$defaultImageUrl}`
    }
  },
  mounted() {
    this.getWeapons()
  }
}
</script>

<style scoped>

</style>
