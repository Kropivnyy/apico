<template>
  <div class="app">
    <Header is-visible-search />
    <main class="main-content">
      <Nuxt />
      <ModalAddProduct v-if="isVisibleAddProductModal" />
    </main>
    <Footer />
    <div id="modal-root"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: 'user-store/user',
      isVisibleAddProductModal: 'products-store/isVisibleAddProductModal',
    }),
  },

  async mounted() {
    if (!Object.keys(this.user).length) {
      try {
        await this.fetchUser()
      } catch (error) {}
    }
  },
  methods: {
    ...mapActions({
      fetchUser: 'user-store/fetchUser',
    }),
  },
}
</script>

<style scoped>
.app {
  padding-top: 166px;
}

.main-content {
  padding-top: 19px;
  padding-bottom: 19px;
  flex-grow: 1;
}
</style>
