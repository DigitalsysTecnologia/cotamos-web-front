export default {

  obterItem(key) {
    if (process.browser) {
      return localStorage.getItem(key);
    }
    else {
      return null
    }
  },

  setarItem(key, value) {
    if (process.browser) {
      localStorage.setItem(key, value);
    }
  }
}