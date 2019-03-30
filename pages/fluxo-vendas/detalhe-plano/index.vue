<template>
  <div>
    <div v-if="isLoading">
      <section class="section is-medium">
        <Loading :messages="loadingMessages"/>
      </section>
    </div>
    <div v-else>
      <section class="section is-medium has-text-dark has-text-justified">
        <h2 class="is-size-2 subtitle has-text-centered">PLANO DE SAÚDE PET</h2>
        <div class="columns" style="margin-top: 2rem;">
          <div class="column is-half has-text-centered">
            <img src="/img/dr_dog_and_cat.jpg">
          </div>
          <div class="column is-half has-text-centered" style="padding-top: 3rem;">
            <h2 class="is-size-2 subtitle has-text-centered">{{product.name}}</h2>
            <div class="columns">
              <div class="column has-text-centered">
                <span style="display: block; font-size: 24px;font-weight:bold;">
                  <span>{{ formatCurrency(product.value.creditCard) }} / mês</span>
                </span>
              </div>
              <div class="column has-text-left-desktop" v-if="false">
                <div class="payment-condition">
                  <div class="select is-rounded">
                    <select>
                      <option>Cartão de Crédito</option>
                      <option>Débito em Conta</option>
                      <option>Boleto</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="call-to-action-container">
              <CallToAction v-on:click="selectPlan" :isLoading="btnIsLoading">COMPRAR</CallToAction>
            </div>
          </div>
        </div>
      </section>

      <section class="section primary-color-background has-text-light">
        <p class="is-size-3 has-text-justified">{{product.description}}</p>
      </section>

      <section class="section has-text-dark">
        <h2
          class="is-size-2 subtitle has-text-centered"
        >Rede Referenciada ({{serviceArea.length}} clínicas próximas a você)</h2>
        <accredited-network
          :serviceArea="serviceArea"
          :homeLocation="proposal.proposer.homeAddress.location"
        />
        <div class="call-to-action-container">
          <CallToAction v-on:click="selectPlan" :isLoading="btnIsLoading">COMPRAR</CallToAction>
        </div>
      </section>

      <section class="section primary-color-background has-text-light">
        <h2 class="is-size-2 subtitle has-text-centered">Cobertura</h2>
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr class="has-text-centered">
              <th colspan="2">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(coverageItem, idx) in coverage"
              :key="idx"
              v-bind:class="{'hasCoverage': coverageItem[product.code], 'notHasCoverage': !coverageItem[product.code]}"
            >
              <td style="font-weight: bold;">{{ coverageItem.name }}</td>
              <td class="has-text-centered">
                <span class="icon coverage-icon">
                  <i
                    v-bind:class="{'fas fa-check': coverageItem[product.code], 'fas fa-times': !coverageItem[product.code]}"
                  ></i>
                </span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="border-radius: 15px;">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="section has-text-dark">
        <h2 class="is-size-2 subtitle has-text-centered">Processo de contratação</h2>

        <div class="columns">
          <div class="column" v-for="(hiringStep, idx) in hiringSteps" :key="idx">
            <div class="step-container">
              <div class="columns">
                <div class="column is-narrow">
                  <div class="centered-index">{{idx+1}}</div>
                </div>
                <div class="column">
                  <span>{{hiringStep.description}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section has-text-dark">
        <h2 class="is-size-2 subtitle has-text-centered">Demais Produtos</h2>
        <Offers :proposal="proposal"/>
      </section>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/molecules/Loading";
import CallToAction from "@/components/atoms/CallToAction";
import AccreditedNetwork from "@/components/molecules/AccreditedNetwork";
import apiClientProvider from "@/utils/apiClient";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import Offers from "@/components/organisms/Offers";
import utils from "@/utils/index";
import { Carousel, Slide } from "vue-carousel";
let router = null;

export default {
  name: "InsurancePlanDetail",
  methods: {
    submitOffer() {},
    selectPlan: async function(plan) {
      try {
        this.btnIsLoading = true;
        this.proposal.petInsuranceData.selectedPlan = {
          code: this.product.code
        };
        await apiClientProvider.updateProposal(this.proposal);
        this.proposal = await apiClientProvider.setNextState(this.proposal, 4);
        this.$router.push({
          path: "/fluxo-vendas",
          query: { id: this.proposal._id }
        });
      } finally {
        this.btnIsLoading = false;
      }
    },
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    }
  },
  data() {
    return {
      isLoading: true,
      btnIsLoading: false,
      loadingMessages: ["Carregando o plano"],
      proposal: null,
      product: null,
      coverage: null,
      serviceArea: null,
      mapCreated: false,
      availablePlans: [],
      hiringSteps: [
        {
          description:
            "Faça a contratação através da nossa plataforma (totalmente on-line)"
        },
        {
          description:
            "Efetue o pagamento através de cartão de crédito, boleto ou depósito em conta"
        },
        {
          description:
            "Agende com a Health4Pet a avaliação de saúde e implantação do microchip"
        }
      ]
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
    Offers,
    AccreditedNetwork,
    CallToAction
  }
};
</script>

<style scoped>
.accredited-network {
  max-height: 300px;
  overflow-y: scroll;
}
.hasCoverage {
  color: rgb(6, 115, 123);
}
.notHasCoverage {
  color: #e44747;
}
.coverage-icon {
  font-size: 20px;
}
.table {
  border-radius: 12px;
}
.call-to-action-container {
  margin-top: 1.5rem;
}
.centered-index {
  width: 50px;
  height: 50px;
  background-color: #00d887;
  border-radius: 50px;
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  justify-content: center;
}

.step-container {
  border: 1px solid #00d887;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
}

.step-container span {
  color: #00899c;
  font-weight: bold;
}
</style>
