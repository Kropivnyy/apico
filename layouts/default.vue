<template>
  <div class="app">
    <Header />
    <main class="main-content">
      <Nuxt />
    </main>
    <Footer />
    <div id="modal-root"></div>
  </div>
</template>

<script>
export default {
  async mounted() {
    if (!Object.keys(this.$store.getters['auth-store/user']).length) {
      await this.$store.dispatch('auth-store/fetchUser')
    }
  },
}
</script>

<style scoped>
.main-content {
  padding: 60px 12px;
  flex-grow: 1;
}
</style>
