module.exports = {
  userToken: {
    get() {
      if (process.browser) {
        localStorage.getItem('userToken')
      }
      else {
        return null
      }
    },
    set(value) {
      if (process.browser) {
        localStorage.setItem('userToken', value);
      }
    }
  }  
}