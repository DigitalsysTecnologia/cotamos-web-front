<template>
  <div>
    <Header logoImage="/img/wl/a3/logo.png"/>
    <nuxt/>
    <Footer :hideLogo="true"/>
  </div>
</template>

<script>
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

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
