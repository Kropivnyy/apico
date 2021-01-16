<template>
  <form class="container form" @submit.prevent="onSearch">
    <SearchInputContainer class="product-search-container">
      <template v-slot:icon>
        <SearchInputIcon :src="searchIconSrc" />
      </template>
      <template v-slot:input>
        <input
          v-model.trim="product"
          class="input"
          type="text"
          placeholder="Search products by name"
          autocomplete="off"
        />
      </template>
    </SearchInputContainer>
    <SearchInputContainer class="location-search-container">
      <template v-slot:icon>
        <SearchInputIcon :src="locationIconSrc" />
      </template>
      <template v-slot:input>
        <input
          v-model.trim="location"
          class="input"
          type="text"
          placeholder="Location"
          autocomplete="off"
        />
      </template>
    </SearchInputContainer>
    <button class="search-btn" type="submit">Search</button>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'SearchFields',
  data: () => ({
    product: '',
    location: '',
    searchIconSrc: require('~/assets/icons/search-icon.svg'),
    locationIconSrc: require('~/assets/icons/location-icon.svg'),
  }),
  computed: {
    ...mapGetters({
      products: 'products-store/products',
    }),
  },
  watch: {
    product(value) {
      if (!value && !this.location) this.onSearch()
    },
    location(value) {
      if (!value && !this.product) this.onSearch()
    },
  },
  methods: {
    ...mapMutations({
      setSearchInput: 'products-store/setSearchInput',
      setSearchingLocation: 'products-store/setSearchingLocation',
    }),
    onSearch() {
      this.setSearchInput(this.product)
      this.setSearchingLocation(this.location)
    },
  },
}
</script>

<style scoped>
.form {
  display: flex;
  align-items: stretch;
  min-height: 50px;
}

.product-search-container {
  flex: 1 1 467px;
}

.location-search-container {
  flex: 1 1 198px;
}

.input {
  flex-grow: 1;
}

.search-btn {
  flex: 1 1 176px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: var(--indigo);
  color: var(--white);
  font-size: 14px;
  transition: background-color var(--main-transition);
}
</style>
