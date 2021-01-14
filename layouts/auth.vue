<template>
  <div class="app">
    <Header is-auth-layout />
    <main class="auth-content">
      <section class="form-card">
        <Nuxt />
      </section>
      <AuthSubcard class="form-card" />
    </main>
    <Footer />
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
.auth-content {
  padding: 60px 12px;
  flex-grow: 1;
}

.form-card {
  width: 100%;
  max-width: 425px;
  margin: 0 auto;
  padding: 12px;
}

.form-card:not(:last-child) {
  margin-bottom: 24px;
}

@media screen and (min-width: 768px) {
  .form-card {
    padding: 24px;
  }
}
</style>
