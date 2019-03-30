<template>
  <v-hover>

    <v-card style="margin-bottom:20px;" slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-container fill-height fluid pa-2>
        <v-layout align-center row wrap justify-center>
          <v-flex xs2>
            <v-img :src="card.logo" width="43" height="41" />

          </v-flex>
          <v-flex xs7 offset-xs-1 flexbox justify-end>
            <p class="card-title" style="font-family: Roboto;display:block;"> Health4Pet </p>
            <p class="card-title" style="font-family: Roboto;display:block;"> {{ card.name }} </p>
          </v-flex>

          <v-flex xs12>
            <v-card-text>
              <span style="display:block;">
                      <span class="label-title" style="display:block">Tipo de cobertura: </span>
              <span class="label-value"> {{ card.coverage }} </span>
              </span>
              <span style="display:block;margin-top:20px;" v-if="places.length">
                                              <span class="label-title">Área de Atendimento: </span>
              <span class="label-value" style="display:block;"> {{ places.length }} clínicas próximas a você </span>
              </span>
            </v-card-text>
            <p class="text-center price">
              <span class="price-value">{{ formatCurrency(card.value.creditCard) }}</span>/mês
            </p>
            <v-btn color="primary" :block="true" @click="networkModalDialog = true">Ver Rede Referenciada</v-btn>
            <v-btn color="primary" :block="true" @click="serviceListModalDialog = true">Ver Cobertura</v-btn>
            <CallToAction className='btn-block' v-on:click="selectPlan" v-if="!isSimulation">
              Contratar
            </CallToAction>
          </v-flex>

        </v-layout>
      </v-container>

      <v-card-actions class="card-actions">
        <v-btn flat @click="show = !show">
          <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon> Detalhes
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          <p> {{ card.description }} </p>
        </v-card-text>

      </v-slide-y-transition>

      <v-dialog v-model="networkModalDialog" width="500">
        <v-card>
          <v-card-title class="headline primary lighten-2" primary-title style="font-weight:bold;">
            Rede Referenciada
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

    <v-dialog v-model="serviceListModalDialog" width="500">
      <v-card>
        <v-card-title class="headline primary lighten-2" primary-title style="font-weight:bold;">
          Cobertura
        </v-card-title>

        <v-card-text style="max-height:250px;overflow-y: scroll;overflow-x: hidden;" v-if"!hideCoverage">
          <v-list>
<template v-for="(item,idx) in currentPlanCoverage">
  <v-list-tile-content :key="idx" style="margin-bottom:15px;">
    <v-list-tile-title>
      <v-icon color="primary lighten-3" v-if="coverageContainsPlan(item)">fas fa-check</v-icon>
      <v-icon color="red lighten-2" v-else>fas fa-times</v-icon>
      <span style="font-weight: bold;padding-left:10px;">{{item.name}}</span>
    </v-list-tile-title>
  </v-list-tile-content>
</template>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error lighten-3"  @click="serviceListModalDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</v-hover>
</template>

<script>
  import petInsuranceProvider from "@/utils/petInsuranceProvider";
  import CallToAction from "@/components/atoms/CallToAction";
  export default {
    name: "InsuranceOfferItem",
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
    computed: {
      currentPlanCoverage: {
        get() {
          return this.planCoverage;
        }
      },
      grade: {
        get() {
          switch (this.card.code) {
            case "pet_basic":
              return 1;
            case "pet_light":
              return 2;
            case "pet_plus":
              return 3;
            case "pet_total":
              return 4;
            case "pet_premium":
              return 5;
            default:
              return 1;
          }
        }
      }
    },
    methods: {
      selectPlan: function() {
        this.$emit("selectPlan", this.card);
      },
      formatCurrency(value) {
        value = value.toFixed(2);
        value = value.replace(".", ",");
        return `R$ ${value}`;
      },
      coverageContainsPlan(item) {
        return item[this.card.code];
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
      },
      formatPhone: function(proposal) {
        if (proposal.phoneAreaCode && proposal.phoneNumber) {
          return `(${proposal.phoneAreaCode}) ${proposal.phoneNumber}`;
        } else {
          return "-";
        }
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
      },
      places: {
        type: Array,
        required: true
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
    margin-bottom: 0px;
  }

  .label-title {
    font-weight: bold;
  }

  .label-value {}

  .card-actions {
    background-color: #efefef;
  }

  .price {
    font-family: Roboto, sans-serif;
    font-size: 24px;
    color: #00899c;
    margin-bottom: 5px;
  }

  .price-value {
    font-weight: bold;
  }
</style>
