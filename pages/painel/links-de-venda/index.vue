<template>
  <v-container>
    <v-layout row wrap align-center justify-center>
      
      <v-flex xs12>
        <h1 class="subtitle text-center">Links de Venda</h1>
      </v-flex>
      
      <v-flex xs12 v-if="loading">
        <Loading/>
      </v-flex>

      <v-flex xs12 v-else>
        <v-text-field label="Plano de Saúde Pet" :value="petInsuranceLink" box></v-text-field>
      </v-flex>
      
    </v-layout>
  </v-container>
</template>

<script>
import Loading from "@/components/Loading";
import apiClient from "@/utils/apiClient";
export default {
  layout: "panel",
  name: "SalesLink",

  async mounted() {
    const user = await apiClient.getCurrentUser();
    this.petInsuranceLink = `${
      window.location.origin
    }/plano-de-saude-pet?partnerId=${user.partnerId}`;
    this.loading = false;
  },
  data() {
    return {
      petInsuranceLink: "",
      loading: true
    };
  },
  components: {
    Loading
  }
};
</script>

<style scoped>
</style>
