<template>
  <div>
    <div v-if="isLoading">
      <Loading :messages="loadingMessages"/>
    </div>

    <section class="section" v-else>
      <div step="1" v-if="step==1">
        <h3 class="subtitle">Primeiro, vamos verificar a disponibilidade para sua região, tá bom?</h3>
        <BasicProposalData v-on:submitProposal="generateBasicProposal"/>
      </div>
      <div step="2" v-if="step==2">
        <h2 class="subtitle has-text-centered">Veja abaixo o que temos para você</h2>
        <Offers :proposal="proposal" v-on:selectPlan="selectPlan"/>
      </div>
      <div step="3" v-if="step==3">
        <FullProposalData
          :proposal="proposal"
          v-on:submitProposal="finishPurchase"
          :loading="loading"
          v-on:goBack="previousStep"
        />
      </div>
      <div step="4" v-if="step==4">
        <div v-if="proposal.state == 11">
          <WaitingForAvailability/>
        </div>
        <div v-else>
          <Finish :loading="loading"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import BasicProposalData from "@/components/organisms/BasicPetInsuranceData";
import DeniedProposal from "./components/DeniedProposal";
import Offers from "@/components/organisms/Offers";
import Loading from "@/components/molecules/Loading";
import FullProposalData from "./components/FullProposalData";
import Finish from "./components/Finish";
import WaitingForAvailability from "./components/WaitingForAvailability";
import factory from "@/utils/factory";
import apiClientProvider from "@/utils/apiClient";
import utils from "@/utils/index";
let router = null;

export default {
  name: "SalesFlow",
  data() {
    return {
      loading: true,
      existingProposal: null,
      loadingMessage: null,
      finishedProposal: false,
      step: 0
    };
  },
  computed: {
    proposal: {
      get() {
        return this.existingProposal;
      }
    },
    isLoading: {
      get() {
        return this.loading;
      }
    },
    loadingMessages: {
      get() {
        return (
          this.loadingMessage || [
            "Carregando...",
            "Aguarde um instante por favor..."
          ]
        );
      }
    }
  },
  methods: {
    selectPlan: async function(plan) {
      this.existingProposal.petInsuranceData.selectedPlan = {
        code: plan.code
      };

      await apiClientProvider.updateProposal(this.existingProposal);
      this.existingProposal = await apiClientProvider.setNextState(
        this.existingProposal,
        4
      );
      this.nextStep();
    },
    generateBasicProposal: async function(proposal) {
      console.log("caiu no generateBasicProposal", router);
      window.location = `/fluxo-vendas?id=${proposal._id}`;

      // this.loading = false;
      // this.existingProposal = proposal;
    },
    backToBasicProposalForm: async function() {
      this.loadingMessage = [
        "Atualizando proposta",
        "Aguarde um instante por favor..."
      ];
      this.loading = true;
      this.existingProposal = await apiClientProvider.setNextState(
        this.existingProposal,
        0
      );
      this.loading = false;
    },
    finishProposal: async function() {
      this.loadingMessage = [
        "Atualizando proposta",
        "Aguarde um instante por favor..."
      ];
      this.loading = true;
      this.existingProposal = await apiClientProvider.setNextState(
        this.existingProposal,
        11
      );
      this.loading = false;
    },
    getStep: function() {
      const { query } = this.$route;
      if (query.step) return query.step;

      switch (this.existingProposal.state) {
        case 0:
          return 1;

        case 3:
          return 2;

        case 4:
          return 3;

        case 2:
        case 20:
        case 11:
        case 21:
          return 4;

        default:
          return 1;
      }
    },
    finishPurchase: async function() {
      this.loadingMessage = [
        "Atualizando proposta",
        "Aguarde um instante por favor..."
      ];
      this.loading = true;
      await apiClientProvider.updateProposal(this.existingProposal);
      this.existingProposal = await apiClientProvider.setNextState(
        this.existingProposal,
        2
      );
      this.loading = false;
      this.nextStep();
    },
    nextStep: async function() {
      this.step++;
    },
    previousStep: async function() {
      const { query, step } = this.$route;
      console.log("this.step ", this.step);
      this.step--;
      this.existingProposal = await apiClientProvider.getProposalById(query.id);
    }
  },
  async mounted() {},
  async beforeMount() {
    router = this.$router;
    const { query, step } = this.$route;

    if (query && query.id) {
      this.loadingMessage = [
        "Carregando sua proposta",
        "Aguarde um instante por favor..."
      ];
      this.existingProposal = await apiClientProvider.getProposalById(query.id);
    } else {
      this.loadingMessage = [
        "Carregando...",
        "Aguarde um instante por favor..."
      ];
      this.existingProposal = factory.generateEmptyProposal();
    }

    this.step = this.getStep();
    this.loading = false;
  },
  components: {
    Loading: Loading,
    BasicProposalData: BasicProposalData,
    DeniedProposal: DeniedProposal,
    FullProposalData: FullProposalData,
    WaitingForAvailability: WaitingForAvailability,
    Offers: Offers,
    Finish: Finish
  }
};
</script>

<style scoped>
@media (max-width: 500px) {
  .box-cotacao {
    padding-left: 0px;
    padding-right: 0px;
  }
}
</style>
