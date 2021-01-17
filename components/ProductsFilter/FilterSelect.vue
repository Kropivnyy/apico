<template>
  <div
    class="filter-select-container"
    @click="isVisibleDropdown = !isVisibleDropdown"
  >
    <div :ref="`chosenOption-${excludeRefId}`" class="chosen-option">
      <img class="prepend-input-icon" :src="prependIconSrc" />
      <span
        class="text-overflow-ellipsis"
        :class="{ 'default-value': !selectedOption.value }"
        >{{ selectedOption.value ? selectedOption.text : defaultText }}</span
      >
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
        exclude: [`chosenOption-${excludeRefId}`],
        handler: 'onClickOutsideDropdown',
      }"
      class="options-list"
    >
      <li
        v-for="option in options"
        :key="option.value"
        class="option-item"
        :class="{ active: option.value === selectedOption.value }"
        @click.stop="() => onClickOption(option)"
      >
        <span class="text-overflow-ellipsis">{{ option.text }}</span>
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
    defaultText: {
      type: String,
      default: '',
    },
  },
  data: () => ({
    chevronDownIconSrc: require('~/assets/icons/chevron-down-icon.svg'),
    isVisibleDropdown: false,
    excludeRefId: Date.now(),
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
  min-height: inherit;
  border-radius: inherit;
  cursor: pointer;
}

.chosen-option {
  align-self: stretch;
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
  min-height: inherit;
  padding: 0;
  border-radius: 5px;
  list-style: none;
}

.option-item {
  min-height: inherit;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: var(--grey-900);
  transition: background-color var(--main-transition);
  cursor: pointer;
}

.option-item.active {
  background-color: var(--grey-800);
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
  background-color: var(--grey-700);
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

.default-value {
  color: var(--grey-half-opacity);
}
</style>
