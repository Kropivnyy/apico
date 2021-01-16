import { getFromLS, setToLS, deleteFromLS } from '~/utils/helpers/LSHelper'

export const state = () => ({
  isAuthenticated: false,
  isLoading: false,
})

export const mutations = {
  setIsLoading(state, value) {
    state.isLoading = value
  },

  setIsAuthenticated(state, value) {
    state.isAuthenticated = value
  },

  authSuccess(state) {
    state.isAuthenticated = true
    state.isLoading = false
  },
}

export const actions = {
  getUid() {
    const currentUserId = getFromLS('currentUserId')
    if (currentUserId) return currentUserId
    const uid = this.$fire.auth?.currentUser?.uid || null
    if (uid) {
      setToLS('currentUserId', uid)
    }
    return uid
  },

  async registerUser({ commit, dispatch }, { email, password, fullName }) {
    try {
      commit('setIsLoading', true)
      await this.$fire.auth.createUserWithEmailAndPassword(email, password)
      const uid = await dispatch('getUid')
      await this.$fire.database.ref(`/users/${uid}/info`).set({
        email,
        name: fullName,
        favorites: JSON.stringify([]),
      })
      commit('authSuccess')
    } catch (error) {
      commit('setIsLoading', false)
      throw error
    }
  },

  async login({ commit }, { email, password }) {
    try {
      commit('setIsLoading', true)
      await this.$fire.auth.signInWithEmailAndPassword(email, password)
      commit('authSuccess')
    } catch (error) {
      commit('setIsLoading', false)
      throw error
    }
  },

  async logout({ commit }) {
    try {
      commit('setIsLoading', true)
      await this.$fire.auth.signOut()
      deleteFromLS('currentUserId')
      commit('setIsAuthenticated', false)
      commit('user-store/setUser', {}, { root: true })
    } catch (error) {
      console.error(error)
      throw error
    }
    commit('setIsLoading', false)
  },
}

export const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  isLoading: (state) => state.isLoading,
}
