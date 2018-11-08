<template>
    <v-layout justify-top>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex v-for="(card, idx) in availablePlans" :key="`card_${idx}`" xs12 sm6 lg4>
            <OfferItem :card="card" :places="places" v-on:selectPlan="selectPlan"/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import apiClientProvider from "@/utils/apiClient";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import OfferItem from "@/components/OfferItem"

export default {
  name: "InsuranceOffers",
  data() {
    return {
      paymentMethod: 1,
      planCoverage: [],
      currentPlan: null,
      serviceArea: null,
      loading: true,
    };
  },
  props: {
    proposal: {
      required: true,
      type: Object
    }
  },
  methods: {
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
        return [{"id":"5bd128aab43fdd48f78151b5","name":" Centro Veterinário Grassi - Filial Mogi das Cruzes","state":"SP","city":"","street":"Rua Sérgio Plaza","neighborhood":"Vila Oliveira ","number":"449","zipCode":"08780-230","lat":-23.5201122,"long":-46.1763745,"distance":6.32752623850023,"phone":{"areaCode":"11","number":"23783519"},"correlationId":"H4P-1394"},{"id":"5bd128abb43fdd48f78151b6","name":" Centro Veterinário Grassi - Filial Mogi das Cruzes","state":"SP","city":"","street":"Rua Sérgio Plaza","neighborhood":"Vila Oliveira ","number":"449","zipCode":"08780-230","lat":-23.5201122,"long":-46.1763745,"distance":6.32752623850023,"phone":{"areaCode":"11","number":"23783519"},"correlationId":"H4P-1395"},{"id":"5bd128b3b43fdd48f78151c7","name":" Posto de Coleta - Centro Veterinário Grassi - Filial Mogi das Cruzes","state":"SP","city":"","street":"Rua Sérgio Plaza","neighborhood":"Vila Oliveira ","number":"449","zipCode":"08780-230","lat":-23.5201122,"long":-46.1763745,"distance":6.32752623850023,"phone":{"areaCode":"11","number":"23783519"},"correlationId":"H4P-1396"},{"id":"5bd128eab43fdd48f7815235","name":"Centro Veterinário GRASSI - Filial Mogi das Cruzes - Posto de atendimento Inicial","state":"SP","city":"","street":"Rua Sérgio Plaza","neighborhood":"Vila Oliveira","number":"449","zipCode":"08780-230","lat":-23.5201122,"long":-46.1763745,"distance":6.32752623850023,"phone":{"areaCode":"23783519","number":"23783519"},"correlationId":"H4P-1547"},{"id":"5bd129d9b43fdd48f781540d","name":"Zoo Análises Medicina Diagnóstica ","state":"SP","city":"","street":"Rua João Martins Abarca","neighborhood":"Vila  Mogilar","number":"99","zipCode":"08773-110","lat":-23.513501,"long":-46.1968094,"distance":7.6598175881517845,"phone":{"areaCode":"11","number":"26101514"},"correlationId":"H4P-1649"}]
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
    OfferItem:OfferItem
  }
};
</script>

<style scoped>

</style>