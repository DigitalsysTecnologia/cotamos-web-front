<template>
  <v-card>
    <v-container fill-height fluid pa-2>
      <v-layout align-center row wrap justify-center>
        
        <v-flex xs12>
          <v-layout align-center row wrap justify-center>
            <p class="card-title" style="font-family: Roboto">Porto Seguro</p>
          </v-layout>
        </v-flex>


        <v-flex xs2>
          <v-img :src="card.logo" width="43" height="41"/>
        </v-flex>
        
        <v-flex xs7 offset-xs-1 flexbox justify-end>
          <p class="card-title" style="font-family: Roboto"> Health4Pet - {{ card.name }} </p>
          <div>
            <v-icon color="rgb(222, 209, 28)">{{ grade >= 1 ? 'fas' : 'far' }} fa-star </v-icon>
            <v-icon color="rgb(222, 209, 28)">{{ grade >= 2 ? 'fas' : 'far' }} fa-star </v-icon>
            <v-icon color="rgb(222, 209, 28)">{{ grade >= 3 ? 'fas' : 'far' }} fa-star </v-icon>
            <v-icon color="rgb(222, 209, 28)">{{ grade >= 4 ? 'fas' : 'far' }} fa-star </v-icon>
            <v-icon color="rgb(222, 209, 28)">{{ grade >= 5 ? 'fas' : 'far' }} fa-star </v-icon>            
          </div>
        </v-flex>
        
        <v-flex xs12>
          <v-card-text>
            
            <span style="display:block;">
              <span class="label-title">Tipo de cobertura: </span> 
              <span class="label-value"> {{ card.coverage }} </span> 
            </span>

            <span style="display:block;margin-top:20px;" v-if="places.length">
              <span class="label-title">Área de Atendimento: </span> 
              <span class="label-value" style="display:block;"> {{ places.length }} clínicas próximas a você </span> 
            </span>

          </v-card-text>

          <p class="text-left price">
              <span class="price-value">{{ formatCurrency(card.value.automaticDebit) }}</span> no débito automático
              <br/>
              <span class="price-value">{{ formatCurrency(card.value.creditCard) }}</span> no cartão de crédito
              <br/>
              <span class="price-value">{{ formatCurrency(card.value.bankSlip) }}</span> no boleto
          </p>

        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions class="card-actions">
      <v-btn flat @click="selectPlan" color="primary">Contratar</v-btn>
      <v-spacer></v-spacer>
      <v-btn flat @click="show = !show" >
        <v-icon>{{ !show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon> Detalhes
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        <p> {{ card.description }} </p>
        <v-btn color="primary" :block="true" @click="networkModalDialog = true">Ver Rede Credenciada</v-btn>
        <v-btn color="primary" :block="true" @click="serviceListModalDialog = true">Ver Cobertura</v-btn>
      </v-card-text>
    </v-slide-y-transition>    

    <v-dialog v-model="networkModalDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title color="primary" style="background-color: #00d886 !important;font-weight:bold;">
          Rede Credenciada
        </v-card-title>

        <v-card-text style="max-height:250px;overflow-y: scroll;overflow-x: hidden;">
          <v-list>
            <template v-for="(map,idx) in places">
              <v-list-tile-content  :key="idx" style="margin-bottom:15px;">
                <v-list-tile-title> <span style="font-weight: bold;">Nome:</span>  {{map.name}}</v-list-tile-title>
                <v-list-tile-sub-title> <span style="font-weight: bold;color:black;">Endereço:</span> {{ formatAddress(map) }} </v-list-tile-sub-title>
              </v-list-tile-content>

            </template>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error"  @click="networkModalDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="serviceListModalDialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title color="primary" style="background-color: #00d886 !important;font-weight:bold;">
          Cobertura
        </v-card-title>

        <v-card-text style="max-height:250px;overflow-y: scroll;overflow-x: hidden;">
          <v-list>
            <template v-for="(item,idx) in currentPlanCoverage">
              <v-list-tile-content  :key="idx" style="margin-bottom:15px;">
                <v-list-tile-title> 
                  <v-icon color="green" v-if="coverageContainsPlan(item)" >fas fa-check</v-icon>
                  <v-icon color="red" v-else >fas fa-times</v-icon>
                  <span style="font-weight: bold;padding-left:10px;">{{item.name}}</span> 
                </v-list-tile-title>
              </v-list-tile-content>
            </template>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error"  @click="serviceListModalDialog = false">
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
  </v-card>

  
</template>

<script>
import petInsuranceProvider from "@/utils/petInsuranceProvider";
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
    places: {
      type: Array,
      required: true
    }
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
.label-value {
}
.card-actions {
  background-color: #efefef;
}
.price {
  font-family: Roboto, sans-serif;
  color: #00899c;
  margin-bottom: 5px;
}
.price-value {
  font-weight: bold;
}
</style>