<template>
  <div class="products-filter">
    <FilterContainer class="filter-container select">
      <FilterSelect
        :categories="categories"
        :selected-category="selectedCategory"
      />
    </FilterContainer>
    <FilterContainer class="filter-container filter-price-from price">
      <input
        v-model.trim="priceFrom"
        class="input"
        type="number"
        placeholder="Price from (USD)"
        autocomplete="off"
      />
    </FilterContainer>
    <FilterContainer class="filter-container price">
      <input
        v-model.trim="priceTo"
        class="input"
        type="number"
        placeholder="Price to (USD)"
        autocomplete="off"
      />
    </FilterContainer>
  </div>
</template>

<script>
import { WITHOUT_PHOTO, WITH_PHOTO } from '~/utils/constants/categories'
export default {
  name: 'ProductsFilter',
  data: () => ({
    selectedCategory: {
      value: '',
      text: 'Choose Category',
      filterCondition: () => true,
    },
    categories: [
      {
        value: '',
        text: 'Choose Category',
        filterCondition: () => true,
      },
      {
        value: WITH_PHOTO,
        text: 'With photo',
        filterCondition: (product) => product.photo,
      },
      {
        value: WITHOUT_PHOTO,
        text: 'Without photo',
        filterCondition: (product) => !product.photo,
      },
    ],
    priceFrom: '',
    priceTo: '',
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
}
</script>

<style scoped>
.products-filter {
  min-height: 59px;
  margin-bottom: 15px;
  padding-right: 11px;
  padding-left: 11px;
  display: flex;
  align-items: center;
  background-color: var(--white);
  box-shadow: var(--products-filter-box-shadow);
  border-radius: 4px;
  color: var(--dark-grey-500);
  font-size: 14px;
}

.filter-container:not(:last-child) {
  margin-right: 24px;
}

.select {
  flex: 0 1 285px;
}

.price {
  flex: 0 1 143px;
}

.input {
  -moz-appearance: textfield;
}

.input::-webkit-outer-spin-button,
.input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.filter-price-from::after {
  content: '';
  width: 12px;
  height: 2px;
  background-color: var(--grey-800);
  position: absolute;
  right: -19px;
}
</style>
