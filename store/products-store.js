export const state = () => ({
  isVisibleAddProductModal: false,
})

export const mutations = {
  toggleAddProductModal(state) {
    state.isVisibleAddProductModal = !state.isVisibleAddProductModal
  },
}

export const actions = {
  async addProduct({ commit }, product) {
    try {
      const { database, storage } = this.$fire
      const { key } = await database.ref('/products').push(product)

      const imageRef = storage.ref(`/products/${key}`)
      await imageRef.put(product.photo)
      const downloadURL = await imageRef.getDownloadURL()
      await database.ref(`/products/${key}`).update({ photo: downloadURL })
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export const getters = {
  isVisibleAddProductModal: (state) => state.isVisibleAddProductModal,
}
