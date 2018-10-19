<template>
  <div class="container-fluid">
    <Header />
    <nuxt class="main-container"/>
    <Footer :hideLogo="true"/>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import apiClient from "@/utils/apiClient";
import localStorage from "@/utils/localStorage";
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

export default {
  components: {
    Header: Header,
    Footer: Footer
  }
};
</script>

<style scoped>
.main-container {
  margin-bottom: 50px;
  margin-top: 10px;
}
</style>