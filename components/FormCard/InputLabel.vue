<template>
  <span class="input-label" :class="{ invalid: isInvalidValue }">
    {{ label }}
    <RequiredStar v-if="isRequiredField" />
  </span>
</template>

<script>
export default {
  name: 'InputLabel',
  props: {
    label: {
      type: String,
      required: true,
    },
    isRequiredField: {
      type: Boolean,
      default: false,
      required: false,
    },
    isInvalidValue: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.input-label {
  margin-bottom: 4px;
  font-size: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
  cursor: text;
  transition: color var(--main-transition);
}

.input-label.invalid {
  color: var(--error);
}
</style>
