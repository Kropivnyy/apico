<template>
  <label class="search-input-container">
    <slot name="icon"></slot>
    <slot name="input"></slot>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'SearchInputContainer',
}
</script>

<style scoped>
.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0 12px;
  background-color: var(--white);
  border-radius: 4px;
  font-size: 15px;
  line-height: 31px;
}

@media screen and (min-width: 768px) {
  .search-input-container {
    min-height: 50px;
  }
}
</style>
