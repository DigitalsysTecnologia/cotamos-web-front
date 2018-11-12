<template>
    <v-layout justify-top>
      <v-container fluid grid-list-md>
        <h3 class="subtitle" style="font-size:24px;" v-if="places.length > 0 && availablePlans.length > 1">Rede Referenciada</h3>
        <v-layout row wrap>

          <v-flex xs12 v-if="places.length > 0 && availablePlans.length > 1">      
            <v-card style="margin-bottom:20px;">
              <v-container fill-height fluid pa-2>
                <v-layout row wrap >
                  <v-flex xs12>
                    Encontramos {{ places.length }} clínicas e hospitais próximos a sua residência
                    <v-btn color="primary" @click="networkModalDialog=true" :block="true">Ver rede referenciada</v-btn>
                  </v-flex>
                  <v-flex xs12>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>

          <h3 class="subtitle" style="font-size:24px;">Planos para você</h3>

          <v-flex v-for="(plan, idx) in availablePlans" :key="`card_${idx}`" xs12>
            <v-card style="margin-bottom:20px;">
              <v-card-title style="padding-bottom: 8px;padding-top: 8px;font-size: 14px;background-color: rgb(232, 232, 232);font-weight: bold;" class="text-center">
                <img :src="plan.logo" width="43" height="41" />
                <p class="text-center" style="margin-left:20px;margin-top: 16px;font-family: Roboto;"> HEALTH 4 PET - {{ plan.name }} </p>
              </v-card-title>
              <v-container fill-height fluid pa-2>
                <v-layout row wrap >
                  <v-flex xs12>
                    <p style="font-size: 18px;font-weight: bold;">Coberturas: </p>
                    <div v-if="idx > 0">
                      <p style="font-weight:bold;">- Todas as coberturas do plano {{ availablePlans[idx -1].name }}, mais: </p>
                    </div>
                    <p v-for="(coverage,cvrgIdx) in planCoverage" :key="cvrgIdx" v-if="coverage[plan.code] && (idx == 0 || ! coverage[availablePlans[idx -1].code]) ">
                      <span>- {{ coverage.name }} </span>
                    </p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="text-center price">
                      <span>A partir de </span>
                      <span class="price-value">{{ formatCurrency(plan.value.creditCard) }}</span>/mês
                      <CallToAction v-on:click="selectPlan(plan)" style="display:block;" class="btn-block">
                        Contratar
                    </CallToAction>
                    </p>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
           <v-dialog v-model="networkModalDialog" width="800">
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title style="font-weight:bold;">
          Rede Referenciada ({{ places.length }} clínicas encontradas)
        </v-card-title>
  
        <v-card-text style="max-height:250px;overflow-y: scroll;overflow-x: hidden;">
          <v-list>
            <template v-for="(map,idx) in places">
                  <v-list-tile-content  :key="idx" style="margin-bottom:15px;">
                  <v-list-tile-title> <span style="font-weight: bold;">Nome:</span>  {{map.name}}</v-list-tile-title>
                  <v-list-tile-sub-title> <span style="font-weight: bold;color:black;">Endereço:</span> {{ formatAddress(map) }} </v-list-tile-sub-title>
                  <v-list-tile-sub-title> <span style="font-weight: bold;color:black;">Distância:</span> {{ formatDistance(map.distance) }} </v-list-tile-sub-title>
                  </v-list-tile-content>
              </template>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error lighten-3"  @click="networkModalDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import Loading from "@/components/Loading";

export default {
  name: "OffersInTable",
  data() {
    return {
      paymentMethod: 1,
      planCoverage: [],
      currentPlan: null,
      networkModalDialog: false,
      serviceArea: null,
      loading: true,
      pageIndex: 0
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

    this.planCoverage = petInsuranceProvider.getCoverage();
    this.loading = false;
  },
  components: {
    Carousel: Carousel,
    Slide: Slide,
    CallToAction: CallToAction,
    Loading: Loading
  }
};
</script>

<style scoped>
.price {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  color: #00899c;
  margin-bottom: 5px;
}

.price-value {
  font-weight: bold;
}
</style>