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
  min-height: 33px;
  display: flex;
  align-items: center;
  padding: 0 5px;
  background-color: var(--grey-1000);
  border: 1px solid var(--grey-800);
  border-radius: 5px;
}

@media screen and (min-width: 768px) {
  .filter-container {
    padding: 0 10px;
  }
}
</style>
