import { HOME } from '~/utils/constants/routes'

export default function ({ store, redirect }) {
  localStorage.setItem('qwe', JSON.stringify('142141'))

  const isAuthenticated = store.getters['auth-store/isAuthenticated']
  if (isAuthenticated) {
    redirect(HOME)
  }
}
