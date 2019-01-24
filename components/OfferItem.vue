<template>
  <section class="container">
    <div class="plans-column">
      <div class="square" :class="classLigth">
        <div class="title" :class="classDark">
          <h4>
            <strong><span class="titulo">Health4Pet</span>
              <br>
              {{ card.name }}
            </strong>
          </h4>
        </div>
        <div class="subtitle">
          <p>Cobertura:
            <br>
            {{ card.coverage }}
          </p>
        </div>
        <div class="algn">
          <div class="price" :class="classDark">
            <p>
              <strong>
                {{ formatCurrency(card.value.creditCard) }}
                <br>/mês
              </strong>
            </p>
          </div>
        </div>
      </div>
      <template v-for="(item,idx) in currentPlanCoverage">
        <v-list-tile-content :key="idx" class="checkItem">
          <v-list-tile-title>
            <v-icon color="#44e47d" v-if="coverageContainsPlan(item)">fas fa-check-circle</v-icon>
            <v-icon color="#dd4b5e" v-else>fas fa-times-circle</v-icon>
          </v-list-tile-title>
        </v-list-tile-content>
      </template>
      <div class="label">
        <div :block="true" @click="networkModalDialog = true">Ver Rede <span class="quebra"><br></span>Referenciada
          <i class="fas fa-caret-right"></i>
        </div>
        <v-dialog v-model="networkModalDialog" width="500">
          <v-card>
            <v-card-title
              class="headline primary lighten-2"
              primary-title
              style="font-weight:bold;"
            >Rede Referenciada</v-card-title>

            <v-card-text style="max-height:250px;overflow-y: scroll;overflow-x: hidden;">
              <v-list>
                <template v-for="(map,idx) in places">
                  <v-list-tile-content :key="idx" style="margin-bottom:15px;">
                    <v-list-tile-title>
                      <span style="font-weight: bold;">Nome:</span>
                      {{map.name}}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                      <span style="font-weight: bold;color:black;">Endereço:</span>
                      {{ formatAddress(map) }}
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                      <span style="font-weight: bold;color:black;">Distância:</span>
                      {{ formatDistance(map.distance) }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </template>
              </v-list>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error lighten-3" @click="networkModalDialog = false">Fechar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <CallToAction class="btn-block" v-on:click="selectPlan" v-if="!isSimulation">Contratar</CallToAction>
      </div>
    </div>
  </section>
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
      planCoverage: null,
    };
  },
  beforeMount() {
    this.planCoverage = petInsuranceProvider.getCoverage();
  },
  computed: {
    classLigth: function (){
      switch (this.card.code) {
          case "pet_basic":
            return {primLight:true };
          case "pet_light":
            return {secLight:true};
          case "pet_plus":
            return {terLight:true};
          case "pet_total":
            return {quarLight:true};
          case "pet_premium":
            return {quinLight:true};
          default:
            return {defaltLight:true};
        }
    },
    classDark: function (){
      switch (this.card.code) {
          case "pet_basic":
            return {primDark:true };
          case "pet_light":
            return {secDark:true};
          case "pet_plus":
            return {terDark:true};
          case "pet_total":
            return {quarDark:true};
          case "pet_premium":
            return {quinDark:true};
          default:
            return {defaltDark:true};
        }
    },
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
    },
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
.container {
  box-shadow: 0px 0px 8px 0px #b3b3b3aa;
  width: 11vw;
  margin: 0;
  padding: 0;
}

.plans-column {
  width: 11vw;
}

.square {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.primLight{background-color: #83E8A0}
.secLight{background-color: #75DDD8}
.terLight{background-color: #4483C1}
.quarLight{background-color: #52CFE8}
.quinLight{background-color: #F65B70}
.defaltLight{background-color: #414141}

.primDark{background-color: #49DF79}
.secDark{background-color: #44CAC6}
.terDark{background-color: #3672AA}
.quarDark{background-color: #1FBADA}
.quinDark{background-color: #DD4B5D}
.defaltDark{background-color: #252525}

.square .title {
  font-size: 12px;
  color: white;
  text-align: center;
  height: 50px;
}
.square .subtitle {
  font-size: 10px;
  height: 90px;
  padding-left: 5px;
  color: #fff;
}
.square .algn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.square .algn .price {
  position: absolute;
  color: #fff;
  width: 80px;
  height: 50px;
  text-align: center;
  border-style: solid;
  border-width: 3px;
  font-size: 15px;
  padding-bottom: 2px;
}
.checkItem {
  padding: 10px 0px 10px calc(50% - 12px);
  border-bottom: 1px solid #b3b3b3aa;
}

.label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 80px;
}

.fa-caret-right {
  font-size: 11px;
  color: #4d4d4d;
}

.label div {
  padding-left: 50%;
  font-size: 11px;
  color: #4d4d4d;
  cursor: pointer;
  margin-bottom: 5px;
}
.label button {
  border-radius: 15px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 5px;
  margin-left: 30px;
  width: 80px;
}

.quebra{
  display: none;
}

@media screen and (max-width: 1024px) {
  .container {
    box-shadow: none;
    width: 18vw;
  }
  .plans-column {
    width: 18vw;
  }
  .plans-column .square {
    width: 18vw;
  }

  .square .title {
    height: 40px;
  }

  .checkItem{
    padding: 60px 0px 10px calc(50% - 12px);
  }
  
  .plans-column .square .title .titulo{
    display: none;
  }
  .plans-column .square .title h4 {
    font-size: 9px;
  }
  .plans-column .square .subtitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 7px;
    text-align: center;
    height: 30px;
    padding: 0 25% 35px 25%; 
    color: #fff;  
  }
  .plans-column .square .algn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .plans-column .square .algn .price {
    position: absolute;
    color: #fff;
    width: 50px;
    height: 30px;
    text-align: center;
    border-style: solid;
    border-width: 3px;
    border-bottom: none;
    font-size: 9px;
    padding-bottom: 10px;
}
.label{
  display: flex;
  flex-direction: column;
  margin: 0;
  padding-left: 50%;
  padding-right: 50%;
  justify-content: center;
  align-items: center;
  width: 60px;
  margin-top: 5px;
}
.label div {
  font-size: 9px;
  color: #4d4d4d;
  margin: 0;
  padding: 0;
  width: 55px;
  height: 30px;
  overflow: hidden;
  margin-bottom: 0;
}
.label button {
  border-radius: 15px;
  color: #fff;
  font-size: 10px;
  padding: 0;
  width: 50px;
  margin-left: 0;
}
.quebra{
  display: block;
}
}
</style>