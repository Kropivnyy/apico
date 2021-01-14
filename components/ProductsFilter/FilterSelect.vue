<template>
  <div
    class="filter-select-container"
    @click="isVisibleDropdown = !isVisibleDropdown"
  >
    <div class="chosen-category">
      <img class="prepend-input-icon" :src="gridIconSrc" />
      <span>{{ selectedCategory.text }}</span>
      <div class="spacer"></div>
      <img
        class="append-input-icon"
        :class="{ rotate: isVisibleDropdown }"
        :src="chevronDownIconSrc"
      />
    </div>
    <ul v-if="isVisibleDropdown" class="categories-list">
      <li
        v-for="category in categories"
        :key="category.value"
        class="category-item"
        @click.stop="() => onClickCategory(category)"
      >
        {{ category.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilterSelect',
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selectedCategory: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    gridIconSrc: require('~/assets/icons/grid-icon.svg'),
    chevronDownIconSrc: require('~/assets/icons/chevron-down-icon.svg'),
    isVisibleDropdown: false,
  }),
}
</script>

<style scoped>
.filter-select-container {
  align-self: stretch;
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.chosen-category {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-grow: 1;
}

.spacer {
  flex-grow: 1;
}

.categories-list {
  position: absolute;
  z-index: var(--filter-category-list-z-index);
  top: -1px;
  left: -1px;
  width: calc(100% + 2px);
  padding: 0;
  border-radius: 5px;
  list-style: none;
}

.category-item {
  min-height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: var(--grey-1000);
  transition: background-color var(--main-transition);
  cursor: pointer;
}

.category-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.category-item:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.category-item:hover {
  background-color: var(--grey-800);
}

.prepend-input-icon {
  margin-right: 11px;
}

.append-input-icon {
  margin-left: 11px;
  transition: transform var(--main-transition);
}

.append-input-icon.rotate {
  transform: rotate(180deg);
}
</style>
