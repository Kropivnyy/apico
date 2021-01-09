<template>
  <img :src="dark ? darkLogoSrc : lightLogoSrc" alt="Apico logo" />
</template>

<script>
export default {
  name: 'Logo',
  props: {
    dark: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data: () => ({
    lightLogoSrc: require('~/assets/Logo/logo-light.svg'),
    darkLogoSrc: require('~/assets/Logo/logo-dark.svg'),
  }),
}
</script>
