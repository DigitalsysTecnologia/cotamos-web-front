import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify, {
  theme: {
    primary: "#00899c",
    secondary: "#00899c",
    accent: "#8c9eff",
    error: "#FF0000"
  }
});

import SimpleVueValidation from "simple-vue-validator";
Vue.use(SimpleVueValidation);

import VueMask from "v-mask";
Vue.use(VueMask);

import VueLocalStorage from "vue-localstorage";
Vue.use(VueLocalStorage);

import VueScrollTo from "vue-scrollto";
Vue.use(VueScrollTo);

// import * as VueGoogleMaps from 'vue2-google-maps'
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyAMF279fS7pB-90qXpBSCt4XU463dV18mI'
//   }
// })
