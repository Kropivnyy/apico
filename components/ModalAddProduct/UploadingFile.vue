<template>
  <div class="wrapper">
    <img v-if="file" class="image" :src="previewUrl" />
    <span v-if="!file" class="plus">+</span>
    <button v-if="file" class="remove-btn" @click.stop="onRemove">+</button>
  </div>
</template>

<script>
export default {
  name: 'UploadingFile',
  props: {
    // eslint-disable-next-line vue/require-prop-types
    file: {
      default: () => null,
    },
    onRemove: {
      type: Function,
      default: () => null,
    },
  },
  computed: {
    previewUrl() {
      return this.file ? URL.createObjectURL(this.file) : null
    },
  },
}
</script>

<style scoped>
.wrapper {
  height: 92px;
  width: 92px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grey-900);
  border-radius: 4px;
}

.image {
  object-fit: cover;
  border-radius: inherit;
}

.plus {
  color: var(--primary-green);
  font-size: 65px;
}

.remove-btn {
  position: absolute;
  top: -6px;
  right: -6px;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: var(--black);
  color: var(--white);
  font-size: 20px;
  transform: rotate(45deg);
}
</style>
