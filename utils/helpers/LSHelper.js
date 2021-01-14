export default {
  getFromLS(key) {
    try {
      const items = localStorage.getItem(key)
      return items ? JSON.parse(items) : null
    } catch (error) {
      throw new Error(error)
    }
  },

  setToLS(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      throw new Error(error)
    }
  },
  deleteFromLS(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      throw new Error(error)
    }
  },
}
