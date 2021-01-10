export const state = () => ({
  user: {},
  isAuthenticated: false,
  isLoading: false,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
    state.isLoading = false
  },

  resetUser(state) {
    state.user = {}
    state.isAuthenticated = false
    state.isLoading = false
  },

  setIsAuthenticated(state, value) {
    state.isAuthenticated = value
  },

  setIsLoading(state, value) {
    state.isLoading = value
  },

  authSuccess(state) {
    state.isAuthenticated = true
    state.isLoading = false
  },
}

export const actions = {
  getUid() {
    return this.$fire.auth?.currentUser?.uid || null
  },

  async registerUser({ commit, dispatch }, { email, password, fullName }) {
    try {
      commit('setIsLoading', true)
      await this.$fire.auth.createUserWithEmailAndPassword(email, password)
      const uid = await dispatch('getUid')
      await this.$fire.database.ref(`/users/${uid}/info`).set({
        email,
        name: fullName,
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
      commit('resetUser')
    } catch (error) {
      commit('setIsLoading', false)
      throw error
    }
  },

  async fetchUser({ dispatch, commit }) {
    try {
      const uid = await dispatch('getUid')
      if (uid) {
        const user = (
          await this.$fire.database.ref(`/users/${uid}/info`).once('value')
        ).val()
        commit('setUser', user)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export const getters = {
  user: (state) => state.user,
  isAuthenticated: (state) => state.isAuthenticated,
  isLoading: (state) => state.isLoading,
}
