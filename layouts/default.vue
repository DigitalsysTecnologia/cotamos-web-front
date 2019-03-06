<template>
  <v-app>
    <Header />
    <nuxt/>
    <Footer :hideLogo="true" />
  </v-app>
</template>

<script>
import bootstrapLayout from "./bootstrapLayout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
