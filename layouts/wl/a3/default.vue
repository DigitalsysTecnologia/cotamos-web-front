<template>
  <v-app>
    <Header logoImage="/img/wl/a3/logo.png"/>
    <nuxt/>
    <Footer :hideLogo="true"/>
  </v-app>
</template>

<script>
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

export default {
  name: "default",
  data() {
    return {};
  },
  components: {
    Header: Header,
    Footer: Footer
  }
};
</script>

<style>
</style>
