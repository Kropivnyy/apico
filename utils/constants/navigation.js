import { FAVORITES, HOME, LOGIN, REGISTER } from '~/utils/constants/routes'

export function NAVIGATION() {
  return [
    {
      text: 'Sell',
      action: () => {
        if (this.$store.getters['products-store/isVisibleAddProductModal']) {
          this.$store.commit('products-store/toggleAddProductModal')
        }
        this.$router.push(HOME)
      },
      dark: false,
      accent: true,
      auth: false,
      icon: false,
    },
    {
      text: 'Login',
      action: () => this.$router.push(LOGIN),
      dark: true,
      accent: false,
      auth: false,
      icon: false,
    },
    {
      text: 'Register',
      action: () => this.$router.push(REGISTER),
      dark: true,
      accent: false,
      auth: false,
      icon: false,
    },
    {
      text: '+ Add',
      action: () => this.$store.commit('products-store/toggleAddProductModal'),
      dark: false,
      accent: true,
      auth: true,
      icon: false,
    },
    {
      text: 'Favorites',
      action: () => {
        if (this.$store.getters['products-store/isVisibleAddProductModal']) {
          this.$store.commit('products-store/toggleAddProductModal')
        }
        this.$router.push(FAVORITES)
      },
      route: FAVORITES,
      inactiveIconSrc: require('~/assets/icons/heart-white-icon.svg'),
      activeIconSrc: require('~/assets/icons/heart-filled-icon.svg'),
      dark: false,
      accent: false,
      auth: true,
      icon: true,
    },
  ]
}

export const ADDITIONAL_IN_SIDEBAR = [NAVIGATION()[0]]
