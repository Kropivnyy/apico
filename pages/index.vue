<template>
  <section class="container">
    <h2 class="visually-hidden">Products list</h2>
    <ProductsFilter @changeFilterFunction="changeFilterFunction" />
    <ProductsGrid :products="filteredProducts" />
    <EmptyGridFallback
      v-if="!filteredProducts.length"
      text="There are no products yet"
    />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  transition: 'main-fade',
  middleware: ['fetch-user-middleware'],
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
    }),
    filteredProducts() {
      return this.products.filter(this.filterFunction)
    },
  },

  methods: {
    changeFilterFunction(filterFunction) {
      this.filterFunction = filterFunction
    },
  },
}
</script>
