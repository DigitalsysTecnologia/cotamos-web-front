export default {
  get(key) {
    if (process.browser) {
      return localStorage.getItem(key);
    }
    else {
      return null
    }
  },
  set(key, value) {
    if (process.browser) {
      localStorage.setItem(key, value);
    }
  }
}