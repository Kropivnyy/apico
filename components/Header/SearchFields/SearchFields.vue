<template>
  <form class="form" @submit.prevent="onSearch">
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
      <FilterSelect
        :options="availableLocations"
        :selected-option="location"
        :change-option="changeLocation"
        :prepend-icon-src="locationIconSrc"
        default-text="Location"
      />
    </SearchInputContainer>
    <button class="search-btn" type="submit">Search</button>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import defaultLocation from '~/utils/constants/locations'

export default {
  name: 'SearchFields',
  data: () => ({
    product: '',
    location: defaultLocation,
    searchIconSrc: require('~/assets/icons/search-icon.svg'),
    locationIconSrc: require('~/assets/icons/location-icon.svg'),
  }),
  computed: {
    ...mapGetters({
      products: 'products-store/products',
    }),
    availableLocations() {
      const products = this.$store.state['products-store'].products
      return [
        defaultLocation,
        ...products.map((product) => ({
          value: product.location,
          text: product.location,
        })),
      ]
    },
  },
  watch: {
    product(value) {
      if (!value && !this.location.value) this.onSearch()
    },
    'location.value'(value) {
      if (!value && !this.product) this.onSearch()
    },
  },
  methods: {
    ...mapMutations({
      setSearchInput: 'products-store/setSearchInput',
      setSearchingLocation: 'products-store/setSearchingLocation',
    }),
    changeLocation(location) {
      this.location = location
    },
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
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 8px;
}

.product-search-container {
  flex: 1 1 100%;
  margin-bottom: 8px;
}

.location-search-container {
  flex: 1 1 calc(60% - 8px);
  margin-right: 8px;
}

.input {
  flex-grow: 1;
}

.search-btn {
  min-height: 36px;
  flex: 1 1 40%;
  padding: 0 16px;
  border-radius: 4px;
  background-color: var(--indigo);
  color: var(--white);
  font-size: 14px;
  transition: background-color var(--main-transition);
}

@media screen and (min-width: 768px) {
  .form {
    flex-wrap: nowrap;
    padding-bottom: 0;
  }

  .product-search-container {
    flex: 1 1 465px;
    max-width: 465px;
    margin-right: 8px;
    margin-bottom: 0;
  }

  .location-search-container {
    flex: 1 1 198px;
    max-width: 198px;
  }

  .search-btn {
    min-height: 50px;
    flex: 1 1 176px;
    max-width: 176px;
  }
}
</style>
