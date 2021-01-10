export const state = () => ({
  isVisibleAddProductModal: false,
})

export const mutations = {
  toggleAddProductModal(state) {
    state.isVisibleAddProductModal = !state.isVisibleAddProductModal
  },
}

export const actions = {}

export const getters = {
  isVisibleAddProductModal: (state) => state.isVisibleAddProductModal,
}
