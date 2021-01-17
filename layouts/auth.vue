<template>
  <div class="app">
    <Sidebar />
    <Header is-auth-layout />
    <main class="auth-content">
      <Nuxt />
    </main>
    <Footer />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.auth-content {
  padding: 60px 12px;
  flex-grow: 1;
}
</style>
