<template>
  <div>
    <section class="section is-medium has-text-centered">
      <h3 class="subtitle">Simulador Plano Pet</h3>
      <BasicPetInsuranceData
        :isSimulation="true"
        v-on:submitProposal="submitProposal"
        v-if="step == 0"
      />
      <Offers :proposal="proposal" v-else-if="step == 1"/>
    </section>
  </div>
</template>

<script>
import apiClient from "@/utils/apiClient";
import BasicPetInsuranceData from "@/components/organisms/BasicPetInsuranceData";
import Offers from "@/components/organisms/Offers";

export default {
  layout: "panel",
  name: "PetSimulator",
  async mounted() {},
  data() {
    return {
      proposal: null,
      step: 0
    };
  },
  methods: {
    async submitProposal(proposal) {
      this.proposal = await apiClient.getProposalById(proposal._id);
      this.step++;
    }
  },
  components: {
    BasicPetInsuranceData: BasicPetInsuranceData,
    Offers: Offers
  },
  async beforeMount() {},
  async created() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
