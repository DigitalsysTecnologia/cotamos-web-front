<template>
    <div>

  </div>

</template>

<script>
export default {
  name: "Pet",
  beforeMount() {
    this.$router.push({
      path: "/plano-de-saude-pet",
      query: {
        utm_source: "flyer",
        utm_campaign: "pet_flyer"
      }
    });
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
