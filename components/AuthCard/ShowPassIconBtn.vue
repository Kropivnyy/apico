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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 0;
  outline: 0;
  border: none;
  background-color: transparent;
  user-select: none;
  cursor: pointer;
}
</style>
