<template>
  <v-app>
    <Header :links="links" homeLink="/painel/propostas"/>
    <v-container fluid>
      <v-content>
        <nuxt/>
      </v-content>
    </v-container>
    <Footer/>
  </v-app>
</template>

<script>
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

export default {
  name: "panel",
  data() {
    return {
      links: [
        {
          url: "/painel/usuarios",
          text: "Usuários",
          icon: "fas fa-user"
        },
        {
          url: "/painel/propostas",
          text: "Propostas",
          icon: "fas fa-file-alt"
        },
        {
          url: "/painel/simulador/pet",
          text: "Simulador",
          icon: "fas fa-laptop-code"
        },
        {
          url: "/painel/links-de-venda",
          text: "Links de Venda",
          icon: "fas fa-link"
        },
        {
          url: "/painel/sair",
          text: "Sair",
          icon: "fas fa-sign-out-alt"
        }
      ]
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style>
</style>
