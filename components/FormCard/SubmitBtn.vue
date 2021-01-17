<template>
  <button class="submit-btn" :class="{ disabled }" type="submit">
    {{ isSubmitLoading ? 'Loading...' : submitText }}
  </button>
</template>

<script>
export default {
  name: 'SubmitBtn',
  props: {
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    submitText: {
      type: String,
      required: true,
    },
    isSubmitLoading: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

<style scoped>
.submit-btn {
  min-height: 45px;
  width: 100%;
  padding: 0 16px;
  border-radius: 5px;
  background-color: var(--primary-green);
  color: var(--white);
  letter-spacing: 0.4px;
  transition: background-color var(--main-transition);
}

.submit-btn.disabled {
  background-color: var(--grey-500);
  cursor: default;
}

@media screen and (min-width: 768px) {
  .submit-btn {
    min-height: 58px;
  }
}
</style>
