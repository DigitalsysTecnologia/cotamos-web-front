<template>
  <div class="container-fluid" >
    <div class="row">
      <Header />
    </div>

    <div class="row">
        <div class="container">
                <div class="row">
                    <section class="col-xs-12 formulario-cotacao" style="margin-top:25px;margin-bottom:25px;">
                        <div class="col-sm-12 col-xs-12 box-cotacao" style="padding-bottom:25px;">
                            <Loading :messages="loadingMessages" v-if="isLoading || stepName == 'carregando'"/>
                            <BasicProposalData :proposal="proposal" v-on:submitProposal="generateBasicProposal" v-else-if="stepName == 'cadastro_inicial'"/>
                            <DeniedProposal :proposal="proposal" v-on:previousStep="backToBasicProposalForm" v-on:nextStep="finishProposal" :loading="loading" v-else-if="stepName == 'proposta_negada'" />
                            <Offers :proposal="proposal" v-on:selectPlan="selectPlan" v-else-if="stepName == 'ofertas'" />
                            <FullProposalData :proposal="proposal" v-on:submitProposal="finishPurchase" :loading="loading" v-else-if="stepName == 'cadastro_completo'" />
                            <Finish  :loading="loading" v-else-if="stepName == 'finalizacao'" />
                            <WaitingForAvailability  v-else-if="stepName == 'aguardando_disponibilidade'" />
                        </div>
                    </section>
            </div>
        </div>
    </div>

    <div class="row">
      <Footer :hideLogo="true"/>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BasicProposalData from "./components/BasicProposalData";
import DeniedProposal from "./components/DeniedProposal";
import Offers from "./components/Offers";
import Loading from "@/components/Loading";
import FullProposalData from "./components/FullProposalData";
import Finish from "./components/Finish";
import WaitingForAvailability from "./components/WaitingForAvailability";
import factory from "../../utils/factory";
import apiClientProvider from "@/providers/apiClientProvider";
import utils from "../../utils/index";
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
        const { query } = this.$route;

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
    isLoading: {
      get() {
        return this.loading;
      }
    },
    loadingMessages: {
      get() {
        return this.loadingMessage;
      }
    }
  },
  methods: {
    selectPlan: async function(plan) {
      this.existingProposal.petInsuranceData.selectedPlan = {
        code: plan.code
      };
      
      await apiClientProvider.updateProposal(this.existingProposal);
      await apiClientProvider.setNextState(this.existingProposal, 2);
      this.existingProposal.state = 2;
    },
    generateBasicProposal: async function(proposal) {
      this.loadingMessage = [
        "Verificando sua área de cobertura...",
        "Aguarde um instante por favor..."
      ];
      this.loading = true;

      if (!proposal._id) {
        let newProposal = await apiClientProvider.generateProposal(5);
        this.existingProposal = Object.assign(newProposal, proposal);
      }

      await apiClientProvider.updateProposal(this.existingProposal);
      const product = await apiClientProvider.checkAvailabilityForProduct(
        5,
        this.existingProposal.proposer.homeAddress.zipCode
      );

      if (!product.isAvailable) {
        await apiClientProvider.setNextState(this.existingProposal, 21);
        this.existingProposal.state = 21;
      } else {
        await apiClientProvider.setNextState(this.existingProposal, 3);
        this.existingProposal.state = 3;
      }

      router.push({ name: "/fluxo-vendas", query: { id: this.existingProposal._id } });

      this.loading = false;
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
      await apiClientProvider.setNextState(this.existingProposal, 20);
      this.existingProposal.state = 20;
      this.loading = false;
    },
  },
  async mounted() {
    // const { query } = this.$route;
    // if (query && query.id) {
    // }
    // this.loadingMessage = [
    //   "Carregando sua proposta",
    //   "Aguarde um instante por favor..."
    // ];
    // console.log("mounted");
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
    Header: Header,
    Footer: Footer,
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
