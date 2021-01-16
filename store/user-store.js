export const state = () => ({
  user: {},
  userFetched: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },

  setUserFetched(state, value) {
    state.userFetched = value
  },

  updateUserFavorites(state, favorites) {
    state.user.favorites = new Set(favorites)
  },
}

export const actions = {
  async fetchUser({ dispatch, commit }) {
    try {
      const uid = await dispatch('auth-store/getUid', null, {
        root: true,
      })

      const user = (
        await this.$fire.database.ref(`/users/${uid}/info`).once('value')
      ).val()
      commit('setUserFetched', true)
      if (user) {
        commit('auth-store/setIsAuthenticated', true, { root: true })
        commit('setUser', {
          ...user,
          favorites: new Set(JSON.parse(user.favorites)),
        })
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async updateUserFavorites({ dispatch, commit, getters }, productId) {
    try {
      const uid = await dispatch('auth-store/getUid', null, {
        root: true,
      })
      const { favorites } = getters
      if (!favorites.delete(productId)) {
        favorites.add(productId)
      }
      await this.$fire.database
        .ref(`/users/${uid}/info`)
        .update({ favorites: JSON.stringify([...favorites]) })
      commit('updateUserFavorites', favorites)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export const getters = {
  user: (state) => state.user,
  userFetched: (state) => state.userFetched,
  favorites: (state) => state.user.favorites || new Set(),
}
