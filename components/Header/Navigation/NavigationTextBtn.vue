<template>
  <button class="button" :class="{ dark, accent }" @click="action">
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
  },
}
</script>

<style scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 31px;
  min-width: 64px;
  padding: 0 16px;
  outline: 0;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  font-size: 14px;
  color: var(--white);
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;
}

.button::before {
  content: '';
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background-color: currentColor;
  border-radius: inherit;
  color: inherit;
  pointer-events: none;
  position: absolute;
  transition: opacity var(--main-transition);
}

.button:hover::before {
  opacity: 0.1;
}

.dark {
  color: var(--dark-grey-200);
}

.accent {
  background-color: var(--primary-green);
}
</style>
