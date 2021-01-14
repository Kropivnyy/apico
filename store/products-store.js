export const state = () => ({
  isVisibleAddProductModal: false,
  products: [],
})

export const mutations = {
  toggleAddProductModal(state) {
    state.isVisibleAddProductModal = !state.isVisibleAddProductModal
  },

  setProducts(state, products) {
    state.products = products
  },

  addProduct(state, product) {
    state.products = [...state.products, product]
  },
}

export const actions = {
  async addProduct({ commit }, { title, location, description, photo, price }) {
    try {
      const { database, storage } = this.$fire
      const { key } = await database
        .ref('/products')
        .push({ title, location, description, price })

      let downloadURL = null
      if (photo) {
        const imageRef = storage.ref(`/products/${key}`)
        await imageRef.put(photo)
        downloadURL = await imageRef.getDownloadURL()
        await database.ref(`/products/${key}`).update({ photo: downloadURL })
      }
      commit('addProduct', {
        title,
        location,
        description,
        price,
        productId: key,
        photo: downloadURL,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  async fetchProducts({ commit }) {
    try {
      const { database } = this.$fire
      const products = (await database.ref('/products').once('value')).val()
      commit(
        'setProducts',
        Object.keys(products).map((key) => ({
          ...products[key],
          productId: key,
        }))
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export const getters = {
  isVisibleAddProductModal: (state) => state.isVisibleAddProductModal,
  products: (state) => state.products,
}
