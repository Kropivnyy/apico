<template>
  <label class="filter-container">
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'FilterContainer',
}
</script>

<style scoped>
.filter-container {
  position: relative;
  min-height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: var(--grey-1000);
  border: 1px solid var(--grey-800);
  border-radius: 5px;
}
</style>
