export default {
  getItem(key) {
    if (process.browser) {
      return localStorage.getItem(key);
    }
    else {
      return null
    }
  },
  setItem(key, value) {
    if (process.browser) {
      localStorage.setItem(key, value);
    }
  }

}