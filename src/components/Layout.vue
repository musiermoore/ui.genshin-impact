<template>
  <main class="container-fluid flex-grow-1 d-flex bg-lighter">
    <div class="row flex-grow-1">
      <navbar />

      <section>
        <div class="container">
          <slot></slot>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import Navbar from "./Navbar";

export default {
  name: "Layout",
  components: {
    navbar: Navbar
  }
}
</script>

<style scoped>

</style>
