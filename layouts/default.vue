<template>
  <div>
    <nuxt/>
  </div>
</template>

<script>
import Vue from 'vue';

import SimpleVueValidation from 'simple-vue-validator';
Vue.use(SimpleVueValidation)

import VueMask from 'v-mask';
Vue.use(VueMask)

import VueLocalStorage from 'vue-localstorage';
Vue.use(VueLocalStorage)

import VueScrollTo from 'vue-scrollto';
Vue.use(VueScrollTo)

export default {
  
};
</script>

<style>
</style>