<template>
  <div class="products-filter">
    <FilterContainer class="filter-container select">
      <FilterSelect
        :options="categories"
        :selected-option="selectedCategory"
        :change-option="changeCategory"
        :prepend-icon-src="gridIconSrc"
        default-text="Choose category"
      />
    </FilterContainer>
    <FilterContainer class="filter-container filter-price-from price">
      <input
        v-model.trim="priceFrom"
        class="number-input"
        type="number"
        placeholder="Price from (USD)"
        autocomplete="off"
      />
    </FilterContainer>
    <FilterContainer class="filter-container price">
      <input
        v-model.trim="priceTo"
        class="number-input"
        type="number"
        placeholder="Price to (USD)"
        autocomplete="off"
      />
    </FilterContainer>
  </div>
</template>

<script>
import categories from '~/utils/constants/categories'
export default {
  name: 'ProductsFilter',
  data: () => ({
    categories,
    selectedCategory: categories[0],
    priceFrom: '',
    priceTo: '',
    gridIconSrc: require('~/assets/icons/grid-icon.svg'),
  }),
  updated() {
    const filterFunction = (product) =>
      (this.priceFrom
        ? product.price >= Number.parseFloat(this.priceFrom)
        : true) &&
      (this.priceTo
        ? product.price <= Number.parseFloat(this.priceTo)
        : true) &&
      this.selectedCategory.filterCondition(product)
    this.$emit('changeFilterFunction', filterFunction)
  },
  methods: {
    changeCategory(category) {
      this.selectedCategory = category
    },
  },
}
</script>

<style scoped>
.products-filter {
  margin-bottom: 15px;
  padding: 12px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: var(--white);
  box-shadow: var(--products-filter-box-shadow);
  border-radius: 4px;
  color: var(--dark-grey-500);
  font-size: 14px;
}

.select {
  flex: 1 1 100%;
  width: 100%;
  margin-bottom: 12px;
}

.price {
  flex: 1 1 50%;
  max-width: calc(50% - 12px);
}

.filter-price-from {
  margin-right: 24px;
}

.filter-price-from::after {
  content: '';
  width: 12px;
  height: 2px;
  background-color: var(--grey-800);
  position: absolute;
  right: -19px;
}

.number-input {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .filter-container:not(:last-child) {
    margin-right: 24px;
  }

  .select {
    flex: 0 1 285px;
    margin-bottom: 0;
  }

  .price {
    flex: 0 1 143px;
    max-width: 143px;
  }
}
</style>
