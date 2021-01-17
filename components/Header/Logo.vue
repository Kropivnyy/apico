<template>
  <img
    class="logo"
    :src="dark ? darkLogoSrc : lightLogoSrc"
    alt="Apico logo"
    @click="() => $router.push(HOME)"
  />
</template>

<script>
import { HOME } from '~/utils/constants/routes'
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
    HOME,
  }),
}
</script>

<style scoped>
.logo {
  cursor: pointer;
}
</style>
