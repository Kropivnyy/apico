<template>
  <article class="product-card">
    <div class="image-container">
      <img
        v-if="product.photo"
        class="image"
        :src="product.photo"
        :alt="product.description || `${product.title} photo`"
      />
      <img
        v-if="!product.photo"
        class="image fallback"
        :src="imageFallbackSrc"
        :alt="product.description || `${product.title} photo`"
      />
    </div>
    <h3 class="title">{{ product.title }}</h3>
    <div class="price">&#36;{{ product.price }}</div>
    <ProductCardFavoriteBtn
      v-if="isAuthenticated"
      :product-id="product.productId"
    />
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    imageFallbackSrc: require('~/assets/icons/image-fallback.svg'),
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth-store/isAuthenticated',
    }),
  },
}
</script>

<style scoped>
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 212px;
  padding: 3px;
  border-radius: 4px;
  border: 1px solid var(--grey-900);
  background-color: var(--white);
  box-shadow: var(--product-card-box-shadow);
  transition: box-shadow var(--main-transition);
}

.image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 148px;
  margin-bottom: 6px;
  background-color: var(--star-white);
  overflow: hidden;
}

.image {
  max-height: 100%;
  width: 100%;
  border-radius: 4px 4px 0 0;
  object-fit: cover;
  transition: transform var(--main-transition);
  user-select: none;
}

.fallback {
  width: 50px;
}

.product-card:hover {
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2),
    0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
}

.product-card:hover .image {
  transform: scale(1.2);
}

.title,
.price {
  padding-right: 12px;
  padding-left: 12px;
}

.title {
  margin-bottom: 7px;
  font-size: 15px;
  font-weight: 400;
  color: var(--dark-grey-400);
}

.price {
  font-size: 18px;
  line-height: 21px;
  color: var(--dark-grey-100);
  font-weight: 700;
}
</style>
