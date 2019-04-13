<template>
  <div>
    <div class="columns is-multiline">
      <div
        v-for="(card, idx) in availablePlans"
        :key="`card_${idx}`"
        class="column is-full-mobile is-half-tablet is-one-quarter-widescreen is-one-fifth-fullhd"
      >
        <OfferItem
          :card="card"
          :places="places"
          v-on:selectPlan="selectPlan"
          :isSimulation="proposal.isSimulation"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import apiClientProvider from "@/utils/apiClient";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/atoms/CallToAction";
import validator from "@/utils/validator";
import NavBar from "@/components/organisms/NavBar";
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import Loading from "@/components/molecules/Loading";
import OfferItem from "@/components/molecules/Offer.2";

export default {
  name: "InsuranceOffers",
  data() {
    return {
      paymentMethod: 1,
      planCoverage: [],
      currentPlan: null,
      serviceArea: null,
      loading: true,
      availablePlans: [],
      loadingOffers: false
    };
  },
  props: {
    proposal: {
      required: true,
      type: Object
    }
  },
  methods: {
    getOffers: async function() {
      this.loadingOffers = true;

      if (this.proposal.petInsuranceData.age <= 8) {
        this.serviceArea = await apiClientProvider.getServiceArea(
          this.proposal._id
        );
      }

      this.availablePlans = petInsuranceProvider.getPlansByPetAge(
        this.proposal.petInsuranceData.age
      );

      this.loadingOffers = false;
    },
    formatDistance: function(distance) {
      let result = distance.toFixed(2);
      result = result.replace(".", ",");
      return result + " Km";
    },
    selectPlan: function(plan) {
      this.$emit("selectPlan", plan);
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
    formatPhone: function(proposal) {
      if (proposal.phoneAreaCode && proposal.phoneNumber) {
        return `(${proposal.phoneAreaCode}) ${proposal.phoneNumber}`;
      } else {
        return "-";
      }
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
    proposalId: {
      get() {
        return this.$route.query.id;
      }
    },
    places: {
      get() {
        if (!this.serviceArea) {
          return [];
        }

        return this.serviceArea;
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
          {
            id: 1,
            text: "Boleto"
          },
          {
            id: 2,
            text: "Cartão de Crédito"
          },
          {
            id: 3,
            text: "Débito em Conta"
          }
        ];
      }
    }
  },
  validators: {
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.petInsuranceData.age": value => validator.validatePetAge(value)
  },
  async beforeMount() {
    if (this.proposal.petInsuranceData.age <= 8) {
      this.serviceArea = await apiClientProvider.getServiceArea(
        this.proposal._id
      );
    }

    this.availablePlans = petInsuranceProvider.getPlansByPetAge(
      this.proposal.petInsuranceData.age
    );

    this.loading = false;
  },
  components: {
    Carousel: Carousel,
    Slide: Slide,
    CallToAction: CallToAction,
    Header: Header,
    Footer: Footer,
    Loading: Loading,
    OfferItem: OfferItem
  }
};
</script>

<style scoped>
</style>
