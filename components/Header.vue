<template>
  <v-layout justify-center row wrap align-center>
    <v-toolbar color="primary lighten-1">
      <v-toolbar-title>
        <a class="brand" href="/">
          <img class="img-responsive center-block" src="/img/logo_branco.png" alt="Cotamos.com" style="padding-left:15px;" />
        </a>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :nuxt="true" v-for="(link, idx) in links" :key="idx" :to="link.url">
          <span class="menu-item"> {{ link.text }} </span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-layout>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {};
    },
    props: {
      links: {
        type: Array,
        required: false,
        default: null
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .brand {
    float: left;
    height: 50px;
    font-size: 18px;
    line-height: 20px;
  }
  
  .brand>img {
    width: 200px;
    display: block;
        padding-top: 4px;
  }
  .menu-item {
    font-weight: bold;
    color: white;
  }
</style>