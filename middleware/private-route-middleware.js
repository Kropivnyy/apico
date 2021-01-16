import { LOGIN } from '~/utils/constants/routes'

export default function ({ store, redirect }) {
  const isAuthenticated = store.getters['auth-store/isAuthenticated']
  if (!isAuthenticated) {
    return redirect(LOGIN)
  }
}
