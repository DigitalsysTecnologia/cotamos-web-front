<template>
  <v-hover>
    <v-card
      style="margin-bottom:20px;"
      slot-scope="{ hover }"
      :class="`elevation-${hover ? 12 : 2}`"
    >
      <div
        style="padding-top:10px;padding-bottom:10px; margin-bottom:10px; background-color:rgb(241, 241, 241);"
      >
        <v-img :src="card.insurancerLogo" style="width:30%; margin-left: 35%"/>
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
  </v-hover>
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
      // this.$router.push({
      //   path: "/fluxo-vendas/detalhe-plano",
      //   query: { id, insuranceProductCode }
      // });
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
.card-title {
  font-weight: bold;
  font-size: 24px !important;
  margin-bottom: 0px;
  font-size: 16px;
  color: #757272;
}

.label-title {
  font-weight: bold;
}

.label-value {
}

.card-actions {
  background-color: #efefef;
}

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
