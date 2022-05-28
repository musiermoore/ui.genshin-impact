<template>
  <main class="d-flex flex-column">
    <navbar-top />

    <section class="d-flex">
      <navbar-side />
      <div class="content">
        <slot></slot>
      </div>
    </section>
  </main>
</template>

<script>
import NavbarTop from "./NavbarTop"
import NavbarSide from "./NavbarSide"

export default {
  name: "Layout",
  components: {
    'navbar-top': NavbarTop,
    'navbar-side': NavbarSide
  }
}
</script>

<style scoped>
.content {
  padding: 1rem 1.5rem;
  width: 100%;
}
</style>
