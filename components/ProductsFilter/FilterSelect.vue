<template>
  <div
    class="filter-select-container"
    @click="isVisibleDropdown = !isVisibleDropdown"
  >
    <div ref="chosenCategory" class="chosen-category">
      <img class="prepend-input-icon" :src="prependIconSrc" />
      <span>{{
        selectedCategory.value ? selectedCategory.text : 'Choose category'
      }}</span>
      <div class="spacer"></div>
      <img
        class="append-input-icon"
        :class="{ rotate: isVisibleDropdown }"
        :src="chevronDownIconSrc"
      />
    </div>
    <ul
      v-if="isVisibleDropdown"
      v-click-outside="{
        exclude: ['chosenCategory'],
        handler: 'onClickOutsideDropdown',
      }"
      class="options-list"
    >
      <li
        v-for="category in options"
        :key="category.value"
        class="category-item"
        :class="{ active: category.value === selectedCategory.value }"
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
    options: {
      type: Array,
      required: true,
    },
    selectedOption: {
      type: Object,
      required: true,
    },
    changeOption: {
      type: Function,
      required: true,
    },
    prependIconSrc: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    chevronDownIconSrc: require('~/assets/icons/chevron-down-icon.svg'),
    isVisibleDropdown: false,
  }),
  methods: {
    onClickOption(option) {
      this.changeOption(option)
      this.isVisibleDropdown = false
    },
    onClickOutsideDropdown() {
      this.isVisibleDropdown = false
    },
  },
}
</script>

<style scoped>
.filter-select-container {
  align-self: stretch;
  display: flex;
  align-items: center;
  flex-grow: 1;
  cursor: pointer;
}

.chosen-option {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.spacer {
  flex-grow: 1;
}

.options-list {
  position: absolute;
  z-index: var(--filter-category-list-z-index);
  top: -1px;
  left: -1px;
  width: calc(100% + 2px);
  padding: 0;
  border-radius: 5px;
  list-style: none;
}

.option-item {
  min-height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: var(--grey-1000);
  transition: background-color var(--main-transition);
  cursor: pointer;
}

.option-item.active {
  background-color: var(--grey-900);
}

.option-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.option-item:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.option-item:hover {
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
