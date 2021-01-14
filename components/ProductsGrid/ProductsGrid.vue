<template>
  <div class="products-grid">
    <ProductCard
      v-for="product in products"
      :key="product.productId"
      :product="product"
    />
  </div>
</template>

<script>
export default {
  name: 'ProductsGrid',
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(209px, 1fr));
  grid-gap: 10px 6px;
}
</style>
