export default {

  obterItem(key) {
    return localStorage.getItem(key);
  },

  setarItem(key, value) {
    
      localStorage.setItem(key, value);
    
  }
}