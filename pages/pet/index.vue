<template>
  <div></div>
</template>

<script>
export default {
  name: "Pet",
  beforeMount() {
    let queryParams = this.$route.query;

    if (!queryParams.utm_source && !queryParams.utm_campaign) {
      queryParams.utm_source = "flyer";
      queryParams.utm_campaign = "pet_flyer";
    }

    this.$router.push({
      path: "/plano-de-saude-pet",
      query: queryParams
    });
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
