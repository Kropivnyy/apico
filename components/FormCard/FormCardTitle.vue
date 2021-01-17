<template>
  <h2 class="form-card-title">{{ title }}</h2>
</template>

<script>
export default {
  name: 'FormCardTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.form-card-title {
  margin-bottom: 16px;
  font-size: 22px;
  font-weight: 400;
  text-align: center;
}

@media screen and (min-width: 768px) {
  .form-card-title {
    margin-bottom: 32px;
  }
}
</style>
