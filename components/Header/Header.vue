<template>
  <header class="header" :class="{ 'dark-header': !isAuthLayout }">
    <div class="header-inner" :class="{ 'visible-search': isVisibleSearch }">
      <Logo :dark="isAuthLayout" />
      <nav v-if="isAuthenticated" class="navigation">
        <NavigationTextBtn
          v-for="btn in authNav"
          :key="btn.text"
          v-bind="btn"
        />
        <NavigationIconBtn
          v-for="btn in authNavIcons"
          :key="btn.inactiveIconSrc"
          v-bind="btn"
        />
        <UserMenu />
      </nav>
      <nav v-if="!isAuthenticated" class="navigation">
        <NavigationTextBtn
          v-for="btn in unauthNav"
          :key="btn.text"
          v-bind="btn"
          :is-auth-layout="isAuthLayout"
        />
      </nav>
      <SearchFields v-if="isVisibleSearch" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import { FAVORITES, HOME, LOGIN, REGISTER } from '~/utils/constants/routes'

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
      unauthNav: [
        {
          text: 'Sell',
          action: () => this.$router.push(HOME),
          dark: false,
          accent: true,
        },
        {
          text: 'Login',
          action: () => this.$router.push(LOGIN),
          dark: true,
          accent: false,
        },
        {
          text: 'Register',
          action: () => this.$router.push(REGISTER),
          dark: true,
          accent: false,
        },
      ],
      authNav: [
        {
          text: '+ Add',
          action: () =>
            this.$store.commit('products-store/toggleAddProductModal'),
          dark: false,
          accent: true,
        },
        {
          text: 'Sell',
          action: () => this.$router.push(HOME),
          dark: false,
          accent: true,
        },
        {
          text: 'Logout',
          action: () => this.$store.dispatch('auth-store/logout'),
          dark: false,
          accent: false,
        },
      ],
      authNavIcons: [
        {
          route: FAVORITES,
          inactiveIconSrc: require('~/assets/icons/heart-white-icon.svg'),
          activeIconSrc: require('~/assets/icons/heart-filled-icon.svg'),
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth-store/isAuthenticated',
    }),
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

.dark-header {
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
