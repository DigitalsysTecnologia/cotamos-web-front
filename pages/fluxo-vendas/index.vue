<template>
  <v-layout row wrap>
    <v-flex sm12 xs12>
      <v-stepper v-model="step">
        <v-stepper-header>
  
          <v-stepper-step :complete="step > 1" step="1">Verificar Disponibilidade</v-stepper-step>
          <v-divider></v-divider>
  
          <v-stepper-step :complete="step > 2" step="2">Escolha de ofertas</v-stepper-step>
          <v-divider></v-divider>
  
          <v-stepper-step :complete="step > 3" step="3">Cadastro Completo</v-stepper-step>
          <v-divider></v-divider>
  
          <v-stepper-step :complete="step > 4" step="4">Finalização</v-stepper-step>
          <v-divider></v-divider>
  
        </v-stepper-header>
        <v-layout row wrap>
                    
          <v-flex md10 offset-md1 v-if="isLoading" style="padding-top:30px;">
            <div v-if="isLoading">
              <Loading :messages="loadingMessages" />
            </div>
          </v-flex>
  
          <v-flex md10 offset-md1 v-else>
            <v-stepper-items>
              <v-stepper-content step="1" v-if="step==1">
                <h3 class="subtitle">Primeiro, vamos verificar a disponibilidade para sua região, tá bom?</h3>
                <BasicProposalData v-on:submitProposal="generateBasicProposal" />
              </v-stepper-content>
  
              <v-stepper-content step="2" v-if="step==2">
                <OffersV2 :proposal="proposal" v-on:selectPlan="selectPlan" />
              </v-stepper-content>
  
              <v-stepper-content step="3" v-if="step==3">
                <FullProposalData :proposal="proposal" v-on:submitProposal="finishPurchase" :loading="loading" />
              </v-stepper-content>
  
              <v-stepper-content step="4" v-if="step==4">
                <div v-if="proposal.state == 11">
                  <WaitingForAvailability />
                </div>
                <div v-else>
                  <Finish :loading="loading" />
                </div>                
              </v-stepper-content>
            </v-stepper-items>
          </v-flex>
        </v-layout>
      </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import BasicProposalData from "@/components/Forms/BasicPetInsuranceData";
import DeniedProposal from "./components/DeniedProposal";
import Offers from "@/components/Offers";
import OffersV2 from "@/components/OffersV2";
import Loading from "@/components/Loading";
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
      finishedProposal: false
    };
  },
  computed: {
    proposal: {
      get() {
        return this.existingProposal;
      }
    },
    step: {
      get() {
        if (!this.existingProposal) {
          return 1;
        }

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
      set() {
       
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
      console.log("this.existingProposal", this.existingProposal);
      this.existingProposal.petInsuranceData.selectedPlan = {
        code: plan.code
      };

      await apiClientProvider.updateProposal(this.existingProposal);
      this.existingProposal = await apiClientProvider.setNextState(
        this.existingProposal,
        4
      );
    },
    generateBasicProposal: async function(proposal) {
      router.push({
        path: "/fluxo-vendas",
        query: {
          id: proposal._id
        }
      });

      this.loading = false;
      this.existingProposal = proposal;
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
    }
  },
  async mounted() {
    // const { query } = this.$route;
    // if (query && query.id) {
    // }
    // this.loadingMessage = [
    //   "Carregando sua proposta",
    //   "Aguarde um instante por favor..."
    // ];
  },
  async beforeMount() {
    router = this.$router;
    const { query } = this.$route;

    this.loadingMessage = ["Carregando...", "Aguarde um instante por favor..."];

    if (query && query.id) {
      this.loadingMessage = [
        "Carregando sua proposta",
        "Aguarde um instante por favor..."
      ];

      this.existingProposal = await apiClientProvider.getProposalById(query.id);
    } else {
      this.existingProposal = factory.generateEmptyProposal();
    }

    this.loading = false;
  },
  components: {
    Loading: Loading,
    BasicProposalData: BasicProposalData,
    DeniedProposal: DeniedProposal,
    FullProposalData: FullProposalData,
    WaitingForAvailability: WaitingForAvailability,
    Offers: Offers,
    OffersV2: OffersV2,
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
