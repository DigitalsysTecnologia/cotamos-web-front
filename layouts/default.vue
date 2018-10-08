<template>
  <div class="container-fluid">
    <Header :links="links"/>
    <nuxt/>
    <Footer :hideLogo="true"/>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    Footer:Footer
  },
  computed: {
    links: {
      get() {
        return [
          // {
          //   url: "/",
          //   text: "Contato",
          //   icon: "far fa-envelope"
          // }
        ];
      }
    }
  }
};
</script>

<style>
</style>