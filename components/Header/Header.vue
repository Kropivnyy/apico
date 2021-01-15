<template>
  <header class="header" :class="{ dark: !isAuthLayout }">
    <div class="header-inner" :class="{ 'visible-search': isVisibleSearch }">
      <Logo :dark="isAuthLayout" />
      <nav class="navigation">
        <NavigationTextBtn
          v-for="btn in navButtons"
          :key="btn.text"
          v-bind="btn"
        />
      </nav>
      <SearchFields v-if="isVisibleSearch" />
    </div>
  </header>
</template>

<script>
import { FAVORITES, HOME, LOGIN } from '~/utils/constants/routes'

export default {
  name: 'Header',
  props: {
    isAuthLayout: {
      type: Boolean,
      default: false,
      required: false,
    },
    isVisibleSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      isVisibleModal: false,
      navButtons: [
        {
          text: 'Sell',
          action: () => this.$router.push(HOME),
          dark: false,
          accent: true,
        },
        {
          text: '+ Add',
          action: () =>
            this.$store.commit('products-store/toggleAddProductModal'),
          dark: false,
          accent: true,
        },
        {
          text: 'Login',
          action: () => this.$router.push(LOGIN),
          dark: false,
          accent: false,
        },
        {
          text: 'Favorites',
          action: () => this.$router.push(FAVORITES),
          dark: false,
          accent: false,
        },
        {
          text: 'Logout',
          action: () => this.$store.dispatch('auth-store/logout'),
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
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: transparent;
}

.dark {
  background: linear-gradient(180deg, #090810 0%, #171236 100%);
}

.header-inner {
  min-height: var(--header-height);
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.visible-search {
  min-height: var(--header-extra-height);
}

.navigation {
  display: flex;
  align-items: center;
}
</style>
