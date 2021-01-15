<template>
  <section class="container">
    <h2 class="visually-hidden">Favorites list</h2>
    <ProductsFilter @changeFilterFunction="changeFilterFunction" />
    <ProductsGrid :products="filteredProducts" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  //   async asyncData({ store }) {
  //     console.log('page')

  //     if (!store.getters['products-store/isProductsFetched']) {
  //       try {
  //         await store.dispatch('products-store/fetchProducts')
  //       } catch (error) {}
  //     }
  //   },
  fetch({ store, redirect }) {
    console.log('fetch favorites page')
    // try {
    //   await store.dispatch('user-store/fetchUser')
    //   if (!Object.keys(store.getters['user-store/user']).length) {
    //     redirect(HOME)
    //   }
    // } catch (error) {}
  },

  middleware: ['private-route-middleware'],
  data: () => ({
    favoritesProducts: [],
    filterFunction: () => true,
  }),
  computed: {
    ...mapGetters({
      products: 'products-store/products',
      isProductsFetched: 'products-store/isProductsFetched',
      favorites: 'user-store/favorites',
      isVisibleAddProductModal: 'products-store/isVisibleAddProductModal',
    }),
    filteredProducts() {
      return this.favoritesProducts.filter(this.filterFunction)
    },
  },
  mounted() {},
  methods: {
    changeFilterFunction(filterFunction) {
      this.filterFunction = filterFunction
    },
    selectFavorites() {
      if (this.isProductsFetched) {
      }
      this.favoritesProducts = this.products.filter((product) =>
        this.favorites.has(product.productId)
      )
      this.favoritesSelected = true
    },
  },
}
</script>
