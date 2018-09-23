import Vue from 'vue'

class LocalStorage {
  constructor() {
    this._userSession = '';
  }

  get userToken() {
    return Vue.localStorage.get("userToken","");
  }

  set userToken(newToken) {
    Vue.localStorage.set("userToken", newToken);
  }
}

export default new LocalStorage();