module.exports = {

  // userToken
  get userToken() {
    if (process.browser) {
      return localStorage.getItem('userToken')
    }
    else {
      return null
    }
  },
  set userToken(value) {
    if (process.browser) {
      localStorage.setItem('userToken', value);
    }
  },

  // userId
  get userId() {
    if (process.browser) {
      return localStorage.getItem('userId')
    }
    else {
      return null
    }
  },
  set userId(value) {
    if (process.browser) {
      localStorage.setItem('userId', value);
    }
  }

}