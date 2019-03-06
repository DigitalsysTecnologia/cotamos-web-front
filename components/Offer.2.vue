<template>
  <div class="card">
    <div class="card-image">
      <figure class="image has-text-centered">
        <img :src="card.insurancerLogo" style="width:50%;">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="card.logo">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ card.name }}</p>
          <p class="subtitle is-6">{{ formatCurrency(card.value.creditCard) }} / mês</p>
        </div>
      </div>

      <div class="content has-text-centered">
        <CallToAction :targetUrl="getDetailsUrl(card)">VER DETALHES</CallToAction>
      </div>
    </div>
  </div>
  
  <!-- <v-hover>
    <v-card
      style="margin-bottom:20px;"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <div
        style="padding-top:10px;padding-bottom:10px; margin-bottom:10px; background-color:rgb(241, 241, 241);"
      >
        <img :src="card.insurancerLogo" style="width:30%; margin-left: 35%"/>
      </div>

      <v-card-title primary-title style="padding-top:0;">
        <v-layout align-center row wrap justify-center>
          <v-flex xs2 offset-xs1 pb-3>
            <v-img :src="card.logo" width="43" height="41"/>
          </v-flex>

          <v-flex xs8 ml-3 flexbox justify-end>
            <p class="card-title" style="font-family: Roboto;display:block;">{{ card.name }}</p>
            <p class="price">
              <span class="price-value">{{ formatCurrency(card.value.creditCard) }}</span>/mês
            </p>
          </v-flex>

          <v-flex xs10 offset-xs-1 v-if="!hideCoverage">
            <hr>
            <div>
              <ul v-for="(item, idx) in planCoverage" :key="idx">
                <li
                  v-if="item[card.code]"
                  style="font-style:italic;font-size:16px;margin-bottom:15px;"
                >{{item.name}}</li>
              </ul>
            </div>

            <hr>
          </v-flex>

          <v-flex xs10 offset-xs-1>
            <v-btn color="primary" :block="true" v-if="!isSimulation" v-on:click="seeDetails(card)">
              <span style="font-weight:bold;">VER DETALHES</span>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-hover> -->
</template>

<script>
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
export default {
  name: "Offer_V2",
  data() {
    return {
      show: false,
      networkModalDialog: false,
      serviceListModalDialog: false,
      planCoverage: null
    };
  },
  beforeMount() {
    this.planCoverage = petInsuranceProvider.getCoverage();
  },
  methods: {
    seeDetails: function(product) {
      const { id } = this.$route.query;
      const insuranceProductCode = product.code;
      window.location = `/fluxo-vendas/detalhe-plano?id=${id}&insuranceProductCode=${insuranceProductCode}`
    },
    getDetailsUrl: function(product) {
      const { id } = this.$route.query;
      const insuranceProductCode = product.code;
      return `/fluxo-vendas/detalhe-plano?id=${id}&insuranceProductCode=${insuranceProductCode}`
    },
    selectPlan: function() {
      this.$emit("selectPlan", this.card);
    },
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    }
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    isSimulation: {
      type: Boolean,
      required: false,
      default: false
    },
    hideCoverage: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    CallToAction
  }
};
</script>

<style scoped>
.card-image .image{
    justify-content: center;
    display: flex;
}
.card-image img {
    width: 50%;
    height: 50%;
    margin-top: 1.25rem;
}
.card-image {
    padding-bottom: 15px;
    background-color: #f3f3f3;
}
</style>
