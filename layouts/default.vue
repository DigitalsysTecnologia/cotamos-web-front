<template>
  <v-app>
    <v-toolbar color="#00d886">
      <v-toolbar-title>
        <a class="brand" href="/">
          <img class="img-responsive center-block" src="/img/logo_branco.png" alt="Cotamos.com" style="padding-left:15px;" />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :nuxt="true" v-for="(link, idx) in links" :key="idx" :to="link.url">
          {{ link.text }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
    <Footer :hideLogo="true" />
  </v-app>
</template>

<script>
import Vue from "vue";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
  },
  computed: {
    links: {
      get() {
        if (process.browser) {
          const url = window.location.href;

          if (
            url.indexOf("/painel") >= 0 &&
            url.indexOf("/painel/login") == -1
          ) {
            return [
              {
                url: "/painel/usuarios",
                text: "Usuários"
              },
              {
                url: "/painel/propostas",
                text: "Propostas"
              },
              {
                url: "/painel/conta-corrente",
                text: "Conta Corrente"
              },
              {
                url: "/painel/sair",
                text: "Sair"
              }
            ];
          }
        }

        return [];
      }
    }
  }
};
</script>

<style>
.outer-container {
  margin-top: 20px;
  margin-bottom: 40px;
}

.brand {
  float: left;
  height: 50px;
  font-size: 18px;
  line-height: 20px;
}

.brand > img {
  width: 200px;
  display: block;
}
</style>