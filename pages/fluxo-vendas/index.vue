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
            <div v-if="isLoading || stepName == 'carregando'">
              <Loading :messages="loadingMessages" />
            </div>
          </v-flex>
  
          <v-flex md10 offset-md1 v-else>
            <v-stepper-items>
              <v-stepper-content step="1" v-if="step==1">
                <h3 class="subtitle">Primeiro, vamos verificar a disponibilidade para sua região, tá bom?</h3>
                <BasicProposalData :proposal="proposal" v-on:submitProposal="generateBasicProposal" />
              </v-stepper-content>
  
              <v-stepper-content step="2" v-if="step==2">
                <Offers :proposal="proposal" v-on:selectPlan="selectPlan" />
              </v-stepper-content>
  
              <v-stepper-content step="3" v-if="step==3">
                <FullProposalData :proposal="proposal" v-on:submitProposal="finishPurchase" :loading="loading" />
              </v-stepper-content>
  
              <v-stepper-content step="4" v-if="step==4">
                <div v-if="stepName == 'finalizacao'">
                  <Finish :loading="loading" />
                </div>
  
                <div v-else-if="stepName == 'aguardando_disponibilidade'">
                  <WaitingForAvailability />
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
      stepName: {
        get() {
          const {
            query
          } = this.$route;
  
          if (query.step) {
            return query.step;
          } else if (!this.existingProposal) {
            return "carregando";
          } else if (this.existingProposal.state == 0) {
            return "cadastro_inicial";
          } else if (this.existingProposal.state == 11) {
            return "aguardando_disponibilidade";
          } else if (this.existingProposal.state == 20) {
            return "finalizacao";
          } else if (this.existingProposal.state == 21) {
            return "proposta_negada";
          } else if (
            this.existingProposal.state == 3 ||
            this.existingProposal.state == 10
          ) {
            return "ofertas";
          } else if (this.existingProposal.state == 2) {
            return "cadastro_completo";
          }
        }
      },
      step: {
        get() {
          if (!this.stepName) {
            return 1;
          }
  
          switch (this.stepName) {
            case "cadastro_inicial":
              return 1;
  
            case "ofertas":
              return 2;
  
            case "cadastro_completo":
              return 3;
  
            case "finalizacao":
            case "aguardando_disponibilidade":
            case "proposta_negada":
              return 4;
          }
        },
        set(newValue) {
          console.log('newValue', newValue)
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
  
        console.log('this.existingProposal', this.existingProposal)
        this.existingProposal.petInsuranceData.selectedPlan = {
          code: plan.code
        };
  
        await apiClientProvider.updateProposal(this.existingProposal);
        await apiClientProvider.setNextState(this.existingProposal, 4);
        this.existingProposal.state = 2;
      },
      generateBasicProposal: async function(proposal) {
        console.log("proposal", proposal);
  
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
        await apiClientProvider.setNextState(this.existingProposal, 0);
        this.existingProposal.state = 0;
        this.loading = false;
      },
      finishProposal: async function() {
        this.loadingMessage = [
          "Atualizando proposta",
          "Aguarde um instante por favor..."
        ];
        this.loading = true;
        await apiClientProvider.setNextState(this.existingProposal, 11);
        this.existingProposal.state = 11;
        this.loading = false;
      },
      finishPurchase: async function() {
        this.loadingMessage = [
          "Atualizando proposta",
          "Aguarde um instante por favor..."
        ];
        this.loading = true;
        await apiClientProvider.updateProposal(this.existingProposal);
        await apiClientProvider.setNextState(this.existingProposal, 2);
        this.existingProposal.state = 20;
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
      const {
        query
      } = this.$route;
  
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
