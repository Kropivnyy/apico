<template>
  <div class="app">
    <Header is-visible-search />
    <main class="main-content">
      <Nuxt v-if="!isFetchProductsLoading" />
      <h3 v-if="isFetchProductsLoading">Loading...</h3>
      <ModalAddProduct v-if="isVisibleAddProductModal" />
    </main>
    <Footer />
    <div id="modal-root"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    isFetchProductsLoading: true,
  }),
  computed: {
    ...mapGetters({
      user: 'auth-store/user',
      isVisibleAddProductModal: 'products-store/isVisibleAddProductModal',
    }),
  },

  async mounted() {
    if (!Object.keys(this.user).length) {
      await this.fetchUser()
    }
    try {
      await this.fetchProducts()
    } catch (error) {}
    this.isFetchProductsLoading = false
  },
  methods: {
    ...mapActions({
      fetchUser: 'auth-store/fetchUser',
      fetchProducts: 'products-store/fetchProducts',
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
