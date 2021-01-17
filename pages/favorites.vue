<template>
  <section class="container">
    <h2 class="visually-hidden">Favorites list</h2>
    <ProductsFilter @changeFilterFunction="changeFilterFunction" />
    <ProductsGrid :products="filteredProducts" />
    <EmptyGridFallback
      v-if="!filteredProducts.length"
      text="You can add favorite products from the homepage"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  transition: 'main-fade',
  middleware: ['fetch-user-middleware', 'private-route-middleware'],
  async fetch({ store, dispatch }) {
    if (!store.getters['products-store/productsFetched']) {
      try {
        await store.dispatch('products-store/fetchProducts')
      } catch (error) {}
    }
  },
  data: () => ({
    filterFunction: () => true,
  }),
  computed: {
    ...mapGetters({
      products: 'products-store/products',
      isProductsFetched: 'products-store/isProductsFetched',
      favorites: 'user-store/favorites',
    }),
    favoriteProducts() {
      return this.products.filter((product) =>
        this.favorites.has(product.productId)
      )
    },
    filteredProducts() {
      return this.favoriteProducts.filter(this.filterFunction)
    },
  },
  methods: {
    changeFilterFunction(filterFunction) {
      this.filterFunction = filterFunction
    },
  },
}
</script>
