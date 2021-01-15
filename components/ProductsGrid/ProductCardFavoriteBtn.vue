<template>
  <button class="button" @click="onClick">
    <img
      class="icon"
      :src="isProductInFavorites ? heartFilledIconSrc : heartIconSrc"
    />
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
    heartFilledIconSrc: require('~/assets/icons/heart-filled-icon.svg'),
  }),
  computed: {
    ...mapGetters({
      favorites: 'user-store/favorites',
    }),
    isProductInFavorites() {
      return this.favorites.has(this.productId)
    },
  },
  methods: {
    ...mapActions({
      updateUserFavorites: 'user-store/updateUserFavorites',
    }),
    async onClick() {
      try {
        await this.updateUserFavorites(this.productId)
      } catch (error) {}
    },
  },
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
