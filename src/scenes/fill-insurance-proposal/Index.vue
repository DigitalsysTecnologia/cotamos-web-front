<template>
  <div style="overflow-x:hidden;">
    <Header />
    <div class="row" v-if="isLoading">
      <Loading :messages="['Carregando informações...', 'Aguarde um instante por favor']"/>
    </div>
    <div class="row form-container" v-else>
        <div class="col-md-8 col-md-offset-2 col-xs-12">
          <PetInsuranceForm :proposal="proposal" v-on:submitProposal="submitProposal" />
        </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import apiClientProvider from "@/providers/apiClientProvider";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import PetInsuranceForm from "./components/PetInsuranceForm.vue";

export default {
  name: "InsuranceOffers",
  data() {
    return {
      paymentMethod: 1,
      proposal: null,
      planCoverage: [],
      currentPlan: null,
      serviceArea: null,
      loading: true
    };
  },
  methods: {
    submitProposal: function(proposal) {
      console.log('proposal',JSON.stringify(proposal))
    },
    formatDistance: function(distance) {
      let result = distance.toFixed(2);
      result = result.replace(".", ",");
      return result + " Km";
    },
    selectPlan: function(plan) {
      plan.selectedValue = plan.value;
      switch (parseInt(this.paymentMethod)) {
        case 1:
          plan.paymentMethod = "Boleto Bancário";
          break;
        case 2:
          plan.paymentMethod = "Cartão de Crédito";
          break;
        case 3:
          plan.paymentMethod = "Débito Automático";
          break;
      }

      this.proposal.petInsuranceData.selectedPlan = plan;
      $("#confirmModal").modal();
      apiClientProvider.setNextState(this.proposal, 20);
    },
    formatAddress: function(mapItem) {
      return (
        mapItem.street +
        ", " +
        mapItem.number +
        ", " +
        mapItem.neighborhood +
        " - " +
        mapItem.city +
        ", " +
        mapItem.state
      );
    },
    coverageContainsPlan(item) {
      return item[this.currentPlan.code];
    },
    showCoverageModal(plan) {
      this.planCoverage = petInsuranceProvider.getCoverage();
      this.currentPlan = plan;
      $("#coverageModal").modal();
    },
    showNetworkModal(plan) {
      $("#networkModal").modal();
    },
    showCarouselNavigation() {
      if (window.document.body.clientWidth >= 500) {
        return true;
      } else {
        return false;
      }
    },
    getCoverageProgressBarByPlan(plan) {
      const planName = plan.name.toUpperCase();

      if (planName.indexOf("BASIC") != -1) {
        return {
          text: "Regular",
          backgroundColor: "#f0ad4e",
          width: 60
        };
      } else if (planName.indexOf("LIGHT") != -1) {
        return {
          text: "Regular",
          backgroundColor: "#f0ad4e",
          width: 60
        };
      } else if (planName.indexOf("PLUS") != -1) {
        return {
          text: "Bom",
          backgroundColor: "#5bc0de",
          width: 80
        };
      } else if (planName.indexOf("TOTAL") != -1) {
        return {
          text: "Ótimo",
          backgroundColor: "#5bc0de",
          width: 90
        };
      } else if (planName.indexOf("PREMIUM") != -1) {
        return {
          text: "Completo",
          backgroundColor: "#5cb85c",
          width: 100
        };
      }
    },
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    }
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      }
    },
    proposalId: {
      get() {
        return this.$route.query.id;
      }
    },
    places: {
      get() {
        if (!this.serviceArea || !this.serviceArea.plans) {
          return [];
        }

        return this.serviceArea.plans[0].places;
      }
    },
    currentPlanCoverage: {
      get() {
        return this.planCoverage;
      }
    },
    paymentMethods: {
      get() {
        return [
          { id: 1, text: "Boleto" },
          { id: 2, text: "Cartão de Crédito" },
          { id: 3, text: "Débito em Conta" }
        ];
      }
    },
    availablePlans: {
      get() {
        if (this.proposal) {
          return petInsuranceProvider.getPlansByPetAge(
            this.proposal.petInsuranceData.age
          );
        }
      }
    }
  },

  async beforeMount() {
    this.proposal = await apiClientProvider.getProposalById(
      this.$route.query.id
    );

    if (this.proposal.petInsuranceData.age <= 8) {
      this.serviceArea = await apiClientProvider.getServiceArea(
        this.proposal._id
      );
    }

    this.loading = false;
  },
  components: {
    Carousel: Carousel,
    Slide: Slide,
    CallToAction: CallToAction,
    Header: Header,
    Footer: Footer,
    Loading: Loading,
    PetInsuranceForm: PetInsuranceForm
  }
};
</script>

<style scoped>
.form-container {
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 30px;
}

.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.place-card {
  border: solid 1px #148892;
  /* background-color: #e6e6e6; */
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 10px;
}

.card-item {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}

.health-network-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
.card-subtitle {
  display: block;
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}
.card-featured-info {
  font-weight: bold;
}
.card-info {
}
.logo-plan-miniatures {
  margin-top: 10px;
}
.logo-plan-miniatures img {
  display: inline-block;
}
.form-group {
  margin-bottom: 0px !important;
}

@media (min-width: 500px) {
  .carousel-container {
    padding-left: 50px;
    padding-right: 50px;
  }
}
</style>

