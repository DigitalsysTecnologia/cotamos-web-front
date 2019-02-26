<template>
  <v-container fluid>
    <v-layout row wrap justify-center v-if="isLoading">
      <v-flex xs12 style="margin-top:15px;">
        <Loading :messages="loadingMessages"/>
      </v-flex>
    </v-layout>

    <v-layout align-center justify-center row wrap v-else>
      <v-flex sm10 offset-sm1 class="wrapper elevation-8">
        <v-layout row wrap>
          <v-flex sm12 class="section">
            <h3>PLANO DE SAÚDE PET - {{product.name}}</h3>
          </v-flex>

          <v-flex sm12 style="margin-top:20px;display:flex;">
            <v-flex sm2 offset-sm1 offset-xs0 xs12 class="section">
              <img :src="product.logo" class="product-container">
            </v-flex>
            <v-flex sm9 offset-xs0 xs12 class="section">
              <h3>Preço:</h3>
              <span style="display: block;color: #37a3b7;font-size: 24px;">
                a partir de
                <span>{{ formatCurrency(product.value.creditCard) }} / mês</span>
              </span>
              <v-btn color="primary" v-on:click="selectPlan">COMPRAR</v-btn>
            </v-flex>
          </v-flex>

          <v-flex sm12 class="section">
            <hr>
            <h3>Descrição</h3>
            <p>{{product.description}}</p>
          </v-flex>

          <v-flex sm12 xs12 offset-xs0 class="section">
            <hr>
            <h3>Rede Referenciada</h3>
            <v-layout row wrap>
              <v-flex sm6 xs12>
                <div id="map" style="width: 100%; height:500px;"></div>
              </v-flex>
              <v-flex sm6 xs12>
                <div style="width: 100%; height:500px; overflow: scroll">
                  <p v-for="(map,idx) in serviceArea" :key="idx">
                    <span style="display:block;">
                      <span style="font-weight: bold;">Nome:</span>
                      {{map.name}}
                    </span>

                    <span style="display:block;">
                      <span style="font-weight: bold;color:black;">Endereço:</span>
                      {{ formatAddress(map) }}
                    </span>

                    <span style="display:block;">
                      <span style="font-weight: bold;color:black;">Distância:</span>
                      {{ formatDistance(map.distance) }}
                    </span>
                  </p>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex sm12 xs12 class="section">
            <hr>
            <h3>Cobertura</h3>
            <div>
              <p v-for="(coverageItem, idx) in coverage" :key="idx">
                <span v-if="coverageItem[product.code]">{{ coverageItem.name }}</span>
              </p>
            </div>
          </v-flex>

          <!-- <v-flex sm12 class="section">
            <hr>
            <h3>Processo de Contratação</h3>
            <p>{{product.description}}</p>
          </v-flex>-->
          <!-- <v-flex sm12 class="section">
            <hr>
            <h3>Demais Produtos</h3>
            <p>{{product.description}}</p>
          </v-flex>-->
        </v-layout>
      </v-flex>

      <v-flex sm10 offset-sm1 class="wrapper elevation-8" style="margin-top:30px;">
        <v-layout row wrap>
          <v-flex sm12 class="section">
            <h3>DEMAIS PRODUTOS</h3>

            <Carousel :navigationEnabled="true" class="hidden-xs">
              <Slide v-for="(card, idx) in availablePlans" :key="`card_${idx}`">
                <div style="margin-right: 15px;margin-left: 15px;">
                  <OfferItem
                    :card="card"
                    v-on:selectPlan="selectPlan"
                    :isSimulation="proposal.isSimulation"
                    :hideCoverage="true"
                  />
                </div>
              </Slide>
            </Carousel>

            <v-layout row wrap class="hidden-sm-and-up">
              <v-flex
                v-for="(card, idx) in availablePlans"
                :key="`card_${idx}`"
                xs12
                sm4
                lg4
                offset-sm1
              >
                <OfferItem
                  :card="card"
                  v-on:selectPlan="selectPlan"
                  :isSimulation="proposal.isSimulation"
                  :hideCoverage="true"
                />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import Loading from "@/components/Loading";
import apiClientProvider from "@/utils/apiClient";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import OfferItem from "@/components/Offer.2";
import utils from "@/utils/index";
import { Carousel, Slide } from "vue-carousel";
let router = null;

export default {
  name: "InsurancePlanDetail",
  methods: {
    submitOffer() {
      console.log("Teste");
    },
    selectPlan: async function(plan) {
      this.proposal.petInsuranceData.selectedPlan = {
        code: this.product.code
      };

      await apiClientProvider.updateProposal(this.proposal);
      this.proposal = await apiClientProvider.setNextState(this.proposal, 4);
      this.$router.push({
        path: "/fluxo-vendas",
        query: { id: this.proposal._id }
      });
    },
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    },
    formatDistance: function(distance) {
      let result = distance.toFixed(2);
      result = result.replace(".", ",");
      return result + " Km";
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
    }
  },
  data() {
    return {
      isLoading: true,
      loadingMessages: ["Carregando o plano"],
      proposal: null,
      product: null,
      coverage: null,
      serviceArea: null,
      mapCreated: false,
      availablePlans: []
    };
  },

  async updated() {
    if (this.mapCreated) return;

    const { latitude, longitude } = this.proposal.proposer.homeAddress.location;
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 12
    });

    this.serviceArea.forEach(serviceAreaItem => {
      new google.maps.Marker({
        position: {
          lat: serviceAreaItem.lat,
          lng: serviceAreaItem.long
        },
        map: map
      });
    });

    this.mapCreated = true;
  },

  async mounted() {
    const { id, insuranceProductCode } = this.$route.query;
    this.coverage = await petInsuranceProvider.getCoverage();

    this.proposal = await apiClientProvider.getProposalById(id);
    this.serviceArea = await apiClientProvider.getServiceArea(id);

    this.availablePlans = await petInsuranceProvider.getPlansByPetAge(
      this.proposal.petInsuranceData.age
    );

    const products = this.availablePlans.filter(
      plan => plan.code === insuranceProductCode
    );

    this.product = products[0];
    this.isLoading = false;
  },
  components: {
    Loading,
    OfferItem,
    Carousel,
    Slide
  }
};
</script>

<style scoped>
.product-container {
  border: 1px solid #aaa;
  border-radius: 10px;
  padding: 25px;
}
.section {
  justify-content: center;
  text-align: center;
  display: inline-block;
  margin-bottom: 35px;
}
.section h3 {
  color: #37a3b7;
  font-size: 30px;
  font-weight: bold;
}
.section p {
  font-size: 16px;
  text-align: justify;
}
.wrapper {
  border: 1px solid #aaa;
  padding-left: 60px;
  padding-right: 60px;
  border-radius: 30px;
}
</style>
