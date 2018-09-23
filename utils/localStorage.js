import Vue from 'vue'
import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);


export default  {
  getItem(key) {
    console.log('Vue.localStorage', Vue.localStorage)
    console.log('Vue.localStorage.get', Vue.localStorage.get)
    
    return Vue.localStorage.get(key,"");
  },
  setItem(key, value) {
    Vue.localStorage.set(key, value);
  }

}