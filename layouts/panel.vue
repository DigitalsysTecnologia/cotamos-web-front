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
import bootstrapLayout from "./bootstrapLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "panel",
  data() {
    return {
      links: [
        {
          url: "/painel/usuarios",
          text: "Usuários"
        },
        {
          url: "/painel/propostas",
          text: "Propostas"
        },
        {
          url: "/painel/simulador/pet",
          text: "Simulador"
        },
        {
          url: "/painel/conta-corrente",
          text: "Conta Corrente"
        },
        {
          url: "/painel/links-de-venda",
          text: "Links de Venda"
        },
        {
          url: "/painel/sair",
          text: "Sair"
        }
      ]
    };
  },
  components: {
    Header: Header,
    Footer: Footer
  }
};
</script>

<style>
</style>