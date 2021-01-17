<template>
  <span class="required-star">*</span>
</template>

<script>
export default {
  name: 'RequiredStar',
}
</script>

<style scoped>
.required-star {
  display: inline-block;
  margin-left: 8px;
  color: var(--error);
}
</style>
