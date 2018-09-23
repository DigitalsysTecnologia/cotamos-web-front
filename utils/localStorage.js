export default  {
  getItem(key) {
    return localStorage[key];
  },
  setItem(key, value) {
    localStorage[key] = value;
  }

}