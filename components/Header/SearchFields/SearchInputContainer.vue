<template>
  <label class="search-input-container">
    <slot name="icon"></slot>
    <slot name="input"></slot>
  </label>
</template>

<script>
export default {
  name: 'SearchInputContainer',
}
</script>

<style scoped>
.search-input-container {
  display: flex;
  align-items: center;
  margin-right: 7px;
  padding: 0 12px;
  background-color: var(--white);
  border-radius: 4px;
  font-size: 15px;
  line-height: 31px;
}
</style>
