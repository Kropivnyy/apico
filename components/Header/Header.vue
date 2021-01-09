<template>
  <header class="header">
    <div class="container header-inner">
      <Logo />
      <nav class="navigation">
        <NavigationTextBtn
          v-for="btn in navButtons"
          :key="btn.text"
          v-bind="btn"
        />
      </nav>
    </div>
  </header>
</template>

<script>
import { HOME, LOGIN } from '~/utils/constants/routes'

export default {
  name: 'Header',
  props: {
    isAuthLayout: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      navButtons: [
        {
          text: 'Sell',
          action: () => this.$router.push(HOME),
          dark: false,
          accent: true,
        },
        {
          text: 'Login',
          action: () => this.$router.push(LOGIN),
          dark: false,
          accent: false,
        },
      ],
    }
  },
}
</script>

<style scoped>
.header {
  background: linear-gradient(180deg, #090810 0%, #171236 100%);
}

.header-inner {
  min-height: 77px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navigation {
  display: flex;
  align-items: center;
}
</style>