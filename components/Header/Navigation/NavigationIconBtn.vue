<template>
  <button class="button" @click="onClick">
    <img class="icon" :src="iconSrc" />
  </button>
</template>

<script>
import { HOME } from '~/utils/constants/routes'
export default {
  name: 'NavigationIconBtn',
  props: {
    route: {
      type: String,
      required: true,
    },
    inactiveIconSrc: {
      type: String,
      required: true,
    },
    activeIconSrc: {
      type: String,
      default: '',
      required: false,
    },
  },
  computed: {
    iconSrc() {
      return this.isActiveRoute
        ? this.activeIconSrc || this.inactiveIconSrc
        : this.inactiveIconSrc
    },
    isActiveRoute() {
      return this.$route.path === this.route
    },
  },
  methods: {
    onClick() {
      this.isActiveRoute
        ? this.$router.push(HOME)
        : this.$router.push(this.route)
    },
  },
}
</script>

<style scoped>
.button {
  height: 31px;
  width: 31px;
  border-radius: 50%;
  background-color: transparent;
  color: var(--white);
}

.icon {
  width: 20px;
}
</style>
