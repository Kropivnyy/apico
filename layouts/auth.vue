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
import { HOME } from '~/utils/constants/routes'
export default {
  async fetch({ store, redirect }) {
    console.log('fetch auth layout')
    try {
      await store.dispatch('user-store/fetchUser')
      if (Object.keys(store.getters['user-store/user']).length) {
        redirect(HOME)
      }
    } catch (error) {}
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
