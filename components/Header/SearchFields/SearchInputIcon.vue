<template>
  <img class="icon" :src="src" />
</template>

<script>
export default {
  name: 'SearchInputIcon',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.icon {
  margin-right: 12px;
}
</style>
