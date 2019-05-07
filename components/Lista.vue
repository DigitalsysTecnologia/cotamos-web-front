<template>
  <div class="all">
  
        <v-flex xs12 v-if="false">
          <v-card>
            <v-card-text>
              <v-layout row wrap>
                <v-flex sm4 xs12>
                  <v-text-field label="Idade do pet (em anos)" id="proposal.petInsuranceData.age" type="number" :error="!!(validation.firstError('proposal.petInsuranceData.age'))" :error-messages="validation.firstError('proposal.petInsuranceData.age')" v-model="proposal.petInsuranceData.age"
                  />
                </v-flex>
                <v-flex sm8 xs12>
                  <v-text-field label="CEP da sua residência" id="proposal.proposer.homeAddress.zipCode" :error="!!(validation.firstError('proposal.proposer.homeAddress.zipCode'))" :error-messages="validation.firstError('proposal.proposer.homeAddress.zipCode')" mask="#####-###"
                    v-model.trim="proposal.proposer.homeAddress.zipCode" />
                </v-flex>
                <v-flex xs12>
                  <v-btn color="primary" @click="getOffers" :block="true">Consultar Ofertas</v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
  
        <v-flex sm12 v-if="loadingOffers">
          <Loading :messages="['Obtendo ofertas,', 'Aguarde um instante por favor...']" />
        </v-flex>
        <div class="feature-column">
          <ul>
            <li><p>Urgência e emergência (48h após chipagem) </p></li>
            <li><p>Atendimento Ambulatorial (Carência de 30 dias)</p></li>
            <li><p>Vacinas¹ (Carência de 180 dias)</p></li>
            <li><p>Implantação do Microchip</p></li>
            <li><p>PetHome – atendimento domiciliar (Carência de 30 dias)</p></li>
            <li><p>PetPhone – teleatendimento com veterinários de plantão 24h</p></li>
            <li><p>PetNutri</p></li>
            <li><p>Passaporte eletrônico</p></li>
            <li><p>Exames laboratoriais (Carência de 30 dias)</p></li>
            <li><p>Consulta com especialistas (Carência de 60 dias)</p></li>
            <li><p>Atendimento Hospitalar (Carência de 30 dias)</p></li>
            <li><p>Internação (Carência de 60 dias)</p></li>
            <li><p>Cirurgia (Carência de 60 dias)</p></li>
            <li><p>Exames por Imagem (Carência de 60 dias)</p></li>
            <li><p>Castração (Carência de 360 dias)</p></li>
            <li><p>Farma4Pet</p></li>
            <li><p>Reembolso - Livre escolha³</p></li>
            <li><p>Limpeza de Tártaro (Carência de 360 dias)</p></li>
            <li><p>Concierge</p></li>
          </ul>
        </div>
        <div v-for="(card, idx) in availablePlans" :key="`card_${idx}`" class="item">
          <OfferItem :card="card" :places="places" v-on:selectPlan="selectPlan" :isSimulation="proposal.isSimulation" />
        </div>
  
      </div>
</template>

<script>
  import {
    Carousel,
    Slide
  } from "vue-carousel";
  import apiClientProvider from "@/utils/apiClient";
  import petInsuranceProvider from "@/utils/petInsuranceProvider";
  import CallToAction from "@/components/CallToAction";
  import validator from "@/utils/validator";
  import NavBar from "@/components/NavBar";
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  import Loading from "@/components/Loading";
  import OfferItem from "@/components/OfferItem";
  
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
          return [{
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
  .all{
    display: flex;
    justify-content: center;
    padding: 1vmin;
  }
  .item{
    padding: 1.5vmin;
    height: 100%;
  }
  .feature-column ul{
    width: 15vw;
    margin-top: 200px;
    box-shadow: 0px 0px 8px 0px #b3b3b3aa;
    padding: 0;
    margin-right: 1.5vh;
  }

  .feature-column ul li {
    display: flex;
    align-items: center;
    height: 45px;
    padding: 0 15px;
    list-style: none;
    border-bottom: 1px solid #b3b3b3aa;
  }
  .feature-column li p {
      font-size: 12px;
      padding: 0;
      margin: 0;
  }

  @media screen and (max-width: 1024px) {
    .feature-column{
      display: flex;
      justify-content: center;
      position: absolute;
    }
    .feature-column ul{
    width: 80%;
    
    margin-top: 100px;
    box-shadow: none;
    padding: 0;
    margin-right: 0;
  }

  .feature-column ul li {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 95px;
    padding: 0 15px;
    list-style: none;
    border-bottom: none;
  }
  .feature-column li p {
      font-size: 12px;
      text-align: center;
      justify-content: center;
      padding: 0;
      margin: 0;
  }
    .item{padding: 0}
    .all{padding: 0;
    margin-left: 0}
  }
</style>