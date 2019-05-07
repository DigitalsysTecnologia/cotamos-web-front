<template>
  <v-hover>
  
    <div class="card">
      <v-container fill-height fluid pa-2>
        <v-layout column align-center wrap justify-center>
          <v-flex xs2>
            <v-img :src="card.logo" width="86" height="82" />
            
          </v-flex>
          <v-flex xs7 offset-xs-1 flexbox justify-end>
            <p class="card-title" style="font-family: Roboto;display:block; font-size: 25px"> Health4Pet </p>
            <p style="font-family: Roboto;display:block;font-size: 25px; font-weight: 900; margin-bottom: 0px"> {{ card.name }} </p>
          </v-flex>

          <v-flex>
            <v-card-text>
              <span style="display:block; padding-right: 100px;">
                      <span class="label-title" style="display:flex;">Tipo de cobertura: </span>
              <span class="label-value"> {{ card.coverage }} </span>
              </span>
            </v-card-text>
            <p class="text-center price">
              <span class="price-value">{{ formatCurrency(card.value.creditCard) }}</span><span style="color: gray;"> /mês </span>
            </p>
            <CallToAction style="font-size: 18px; color: black; margin-bottom: 30px; height: 40px" className='btn-block' v-on:click="selectPlan" v-if="!isSimulation">
              Ver mais
            </CallToAction>
          </v-flex>
          
        </v-layout>
      </v-container>
  </div>
</v-hover>
</template>

<script>
  import petInsuranceProvider from "@/utils/petInsuranceProvider";
  import CallToAction from "@/components/CallToAction";
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
  .card{
    margin-bottom:20px;
    border-radius: 20px; 
    width: 100%;
    box-shadow: 0px 4px 8px #dadada86;
  }

  @media(min-width: 768px){
    .card{
    margin-bottom:20px;
    border-radius: 20px; 
    width: 90%;
    box-shadow: 0px 4px 8px #dadada86;
  }
  }
  .card-title {
    margin-bottom: 0px;
  }
  
  .label-title {
    text-align: left;
  }
  
  .label-value {
    font-weight: 500;
  }
  
  .card-actions {
    background-color: #efefef;
  }
  
  .price {
    font-family: Roboto, sans-serif;
    font-size: 24px;
    color: black;
    margin-bottom: 5px;
  }
  
  .price-value {
    font-size: 32px;
    font-weight: bold;
  }
</style>