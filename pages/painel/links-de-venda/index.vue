<template>
  <div>
    <section class="section is-medium has-text-centered" v-if="loading">
      <Loading/>
    </section>

    <section class="section is-medium has-text-centered" v-else>
      <h3 class="subtitle">Links de Venda</h3>
      <label>{{petInsuranceLink}}</label>
    </section>
  </div>
</template>

<script>
import Loading from "@/components/molecules/Loading";
import VInput from "@/components/atoms/VInput";
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
    Loading,
    VInput
  }
};
</script>

<style scoped>
</style>
