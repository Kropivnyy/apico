<template>
  <button class="button" @mousedown="onMousedown" @mouseup="onMouseup">
    <img class="icon" :src="iconSrc" alt="Show pass" />
  </button>
</template>

<script>
export default {
  name: 'ShowPassIconBtn',
  props: {
    onMousedown: {
      type: Function,
      required: true,
    },
    onMouseup: {
      type: Function,
      required: true,
    },
  },
  data: () => ({
    iconSrc: require('~/assets/icons/eye-icon.svg'),
  }),
}
</script>

<style scoped>
.button {
  align-self: center;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: transparent;
}
</style>
