<template>
    <div>
    </div>
</template>

<script>

export default {
  name: "InsuranceOffers",
  data() {
    return {
      isLoading: true,
      loadingMessages: [],
      loadingCompletePercent: 0,
      offers: [ ],
      loadingInteractions: [
        {
          messages: ["Validando as informações de proposta, aguarde..."],
          percent: 1,
          timeToWait: 5000
        },
        {
          messages: ["Salvando as informações em nosso banco de dados..."],
          percent: 33,
          timeToWait: 4000
        },
        {
          messages: ["Obtendo resultados..."],
          percent: 100,
          timeToWait: 1000
        }
      ]
    };
  },
  beforeMount() {},
  async mounted() {

  },
  components: {

  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>

</style>
