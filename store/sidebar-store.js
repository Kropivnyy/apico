export const state = () => ({
  isVisibleSidebar: false,
})

export const mutations = {
  toggleIsVisibleSidebar(state) {
    state.isVisibleSidebar = !state.isVisibleSidebar
  },
}

export const getters = {
  isVisibleSidebar: (state) => state.isVisibleSidebar,
}
