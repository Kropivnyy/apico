<template>
  <button class="button"><img class="icon" :src="heartIconSrc" /></button>
</template>

<script>
export default {
  name: 'ProductCardFavoriteBtn',
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    heartIconSrc: require('~/assets/icons/heart-icon.svg'),
  }),
}
</script>

<style scoped>
.button {
  position: absolute;
  bottom: 46px;
  right: 7px;
  width: 30px;
  height: 30px;
  background-color: var(--white);
  border-radius: 50%;
  box-shadow: var(--favorites-btn-box-shadow);
}

.icon {
  width: 17px;
  margin-top: 2px;
}
</style>
