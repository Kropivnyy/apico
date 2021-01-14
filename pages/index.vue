<template>
  <section class="container">
    <h2 class="visually-hidden">Products list</h2>
    <ProductsFilter @changeFilterFunction="changeFilterFunction" />
    <ProductsGrid :products="filteredProducts" />
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    filterFunction: () => true,
  }),
  computed: {
    ...mapGetters({
      products: 'products-store/products',
      isVisibleAddProductModal: 'products-store/isVisibleAddProductModal',
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
