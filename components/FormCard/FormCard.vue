<template>
  <section class="form-card">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'FormCard',
}
</script>

<style scoped>
.form-card {
  width: 100%;
  margin: 0 auto;
  border-radius: 7px;
  background-color: var(--white);
  box-shadow: var(--form-card-box-shadow);
  color: var(--dark-grey-300);
}
</style>
