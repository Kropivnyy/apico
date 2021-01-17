<template>
  <div class="input-error-text" :class="{ visible: isInvalidValue }">
    {{ errorText }}
  </div>
</template>

<script>
export default {
  name: 'InputErrorText',
  props: {
    errorText: {
      type: String,
      required: true,
    },
    isInvalidValue: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style scoped>
.input-error-text {
  color: var(--error);
  opacity: 0;
  font-size: 12px;
  transition: opacity var(--main-transition);
}

.input-error-text.visible {
  opacity: 1;
}
</style>
