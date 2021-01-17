<template>
  <h3 class="text">{{ text }}</h3>
</template>

<script>
export default {
  name: 'EmptyGridFallback',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.text {
  padding: 16px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
}
</style>
