import defaultLocation from '~/utils/constants/locations'

export const state = () => ({
  isVisibleAddProductModal: false,
  products: [],
  productsFetched: false,
  searchInput: '',
  searchingLocation: defaultLocation,
})

export const mutations = {
  toggleAddProductModal(state) {
    state.isVisibleAddProductModal = !state.isVisibleAddProductModal
  },

  setProducts(state, products) {
    state.products = products
  },

  setProductsFetched(state, value) {
    state.productsFetched = value
  },

  setSearchInput(state, value) {
    state.searchInput = value
  },

  setSearchingLocation(state, value) {
    state.searchingLocation = value
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
      commit('setProductsFetched', true)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}

export const getters = {
  isVisibleAddProductModal: (state) => state.isVisibleAddProductModal,
  searchInput: (state) => state.searchInput,
  searchingLocation: (state) => state.searchingLocation.value,
  products: (state, getters) => {
    const normalizedSearchValue = getters.searchInput?.toLowerCase()
    const searchingLocation = getters.searchingLocation
    return state.products.filter(
      (product) =>
        (normalizedSearchValue
          ? product?.title?.toLowerCase().includes(normalizedSearchValue)
          : true) &&
        (searchingLocation ? product?.location === searchingLocation : true)
    )
  },
  productsFetched: (state) => state.productsFetched,
}
