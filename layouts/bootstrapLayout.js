import Vue from "vue";
import Vuetify from "vuetify";
Vue.use(Vuetify, {
  theme: {
    primary: "#00456a",
    secondary: "#00456a",
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