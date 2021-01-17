import { NAVIGATION } from '~/utils/constants/navigation'

export default {
  data() {
    return {
      authNav: NAVIGATION.call(this).filter((nav) => nav.auth && !nav.icon),
      authNavIcons: NAVIGATION.call(this).filter((nav) => nav.auth && nav.icon),
      unauthNav: NAVIGATION.call(this).filter((nav) => !nav.auth),
    }
  },
}
