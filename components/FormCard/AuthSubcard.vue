<template>
  <div class="subcard">
    <span v-if="isLoginPage">
      I have no account,
      <nuxt-link class="link" :to="REGISTER">Register now</nuxt-link>
    </span>
    <span v-if="!isLoginPage">
      I already have an account,
      <nuxt-link class="link" :to="LOGIN">Log in</nuxt-link>
    </span>
  </div>
</template>

<script>
import { LOGIN, REGISTER } from '~/utils/constants/routes'

export default {
  name: 'AuthSubcard',
  data: () => ({
    LOGIN,
    REGISTER,
  }),
  computed: {
    isLoginPage() {
      return this.$route.path === LOGIN
    },
  },
}
</script>

<style scoped>
.subcard {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 28px;
}

.link {
  color: var(--primary-green);
  text-transform: uppercase;
  text-decoration: none;
}
</style>
