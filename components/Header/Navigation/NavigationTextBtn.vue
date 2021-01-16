<template>
  <button
    class="button"
    :class="{ dark: dark && isAuthLayout, accent }"
    @click="action"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'NavigationTextBtn',
  props: {
    text: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },
    accent: {
      type: Boolean,
      default: false,
      required: false,
    },
    dark: {
      type: Boolean,
      default: false,
      required: false,
    },
    isAuthLayout: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
}
</script>

<style scoped>
.button {
  height: 31px;
  min-width: 64px;
  padding: 0 16px;
  border-radius: 4px;
  background-color: transparent;
  font-size: 14px;
  color: var(--white);
}

.dark {
  color: var(--dark-grey-200);
}

.accent {
  min-width: 131px;
  background-color: var(--primary-green);
}
</style>
