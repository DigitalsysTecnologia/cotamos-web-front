<template>
  <v-app>
    <v-content>
      <nuxt/>
    </v-content>
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
