export default async function ({ store }) {
  if (!store.getters['user-store/userFetched']) {
    try {
      await store.dispatch('user-store/fetchUser')
    } catch (error) {}
  }
}
