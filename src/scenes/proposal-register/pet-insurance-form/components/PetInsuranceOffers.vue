<template>
  <div>
    <h3>Ofertas Disponíveis para seu Pet</h3>

    <section class="container-fluid" >
      <div class="row">
        <div class="col-sm-offset-2 col-sm-8">
          <div class="col-sm-8 text-center">
            <h3>Escolha a forma de pagamento</h3>
          </div>
          <div class="col-sm-4 col-xs-12" style="margin-bottom:15px;">
            <FormSelect  label=""
                          icon="fas fa-money-check-alt" 
                          id="proposal.petInsuranceData.paymentMethod"
                          v-model="paymentMethod"
                          :options="paymentMethods" />
          </div>
        </div>
      </div>

      <div class="row" v-for="plan in availablePlans" :key="plan.logo" v-if="paymentMethod">
        <div class="plan-card col-sm-offset-2 col-sm-8">
          <div class="row">
            <div class="col-md-2 text-center">
              <img class="img-responsive center-block" :src="plan.logo" width="43" height="41" />
              <p :style="{color: plan.color, marginTop: '10px'}" class="hidden-xs hidden-sm">{{plan.name}}</p>
            </div>
            <div class="col-md-10">
              <p :style="{color: plan.color}" class="text-center hidden-md hidden-lg">{{plan.name}}</p>
              <p>{{plan.description}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-offset-2 col-md-8 text-center">
              <div class="col-xs-12 col-sm-4">
                <span class="plan-value">
                  {{ formatCurrency(plan.value) }}
                </span>
              </div>
              <div class="col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-2">
                <div>
                  <CallToAction v-on:click="selectPlan(plan)"> Quero contratar</CallToAction>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid"  v-if="mapData">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
            <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapseCoverage" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span class="hidden-xs">REDE CREDENCIADA</span>
            <span class="hidden-sm hidden-md hidden-lg hidden-xl">REDE CREDENCIADA</span>
          </a>
        </div>
      </div>
      <div class="collapse" id="collapseCoverage" style="padding-top:10px;">
        <div class="row">
          <div class="col-sm-offset-2 col-sm-8">
            <div style="max-height: 300px; overflow-y: scroll;">
              <div v-for="(map, idx) in places" :key="idx">
                <div class="place-card">
                  <p>
                    <span style="font-weight: bold;"> Nome: </span> 
                    <span> {{map.name}}</span>
                    <br/>
                    <span style="font-weight: bold;"> Bairro: </span> 
                    <span v-if="map.neighborhood">{{map.neighborhood}} </span>
                    <br/>
                    <span style="font-weight: bold;"> Cidade: </span> 
                    <span v-if="map.neighborhood">{{map.city}} </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="container-fluid" style="margin-top:15px;" v-if="mapData">
      <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
            <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapseMap" role="button" aria-expanded="false" aria-controls="collapseExample">
            <span class="hidden-xs">MAPA COBERTURA</span>
            <span class="hidden-sm hidden-md hidden-lg hidden-xl">MAPA COBERTURA</span>
          </a>
        </div>
      </div>
      <div class="collapse" id="collapseMap">
        <div class="row">
          <div class="col-sm-offset-2 col-sm-8 text-center">
            <googleMap :center="mapCenter" :zoom="10" style="width: 100%; height: 500px" v-if="mapData">
              <googleMarker v-for="(m,idx) in mapMarkers" 
                            :key="idx" 
                            :position="m.position" 
                            :clickable="false" 
                            :draggable="false"
                            @click="center=m.position">
                </googleMarker>
            </googleMap>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import CallToAction from "@/components/CallToAction";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import apiClientProvider from "@/providers/apiClientProvider";
import * as VueGoogleMaps from "vue2-google-maps";

export default {
  name: "PetInsuranceOffers",
  data() {
    return {
      paymentMethod: 0,
      serviceArea: null
    };
  },
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  computed: {
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
    },
    mapData: {
      get() {
        return this.serviceArea;
      }
    },
    places: {
      get() {
        if (!this.serviceArea || !this.serviceArea.plans) {
          return [];
        }

        return this.serviceArea.plans[0].places;
      }
    },
    mapMarkers: {
      get() {
        if (!this.serviceArea) {
          return [];
        }
        return this.serviceArea.plans[0].places.map(function(place) {
          return {
            position: {
              lat: place.location.coordinates[1],
              lng: place.location.coordinates[0]
            }
          };
        });
      }
    },
    mapCenter: {
      get() {
        const location = this.serviceArea.homeLocation;
        return {
          lat: location.latitude,
          lng: location.longitude
        };
      }
    }
  },
  methods: {
    nextStep: async function() {
      const isValid = await this.$validate();
      if (isValid) {
        this.$emit("nextStep", null);
      }
    },
    selectPlan: function(plan) {
      plan.selectedValue = this.formatCurrency(plan.value);
      switch (parseInt(this.paymentMethod)) {
        case 1:
          plan.paymentMethod = "Boleto Bancário";
          break;
        case 2:
          plan.paymentMethod = "Cartão de Crédito";
          break;
        case 3:
          plan.paymentMethod = "Débito Automático";
          break;
      }
      this.$emit("selectPlan", plan);
    },
    formatCurrency(petInsuranceValue) {
      let value = 0;
      switch (parseInt(this.paymentMethod)) {
        case 1:
          value = petInsuranceValue.bankSlip;
          break;
        case 2:
          value = petInsuranceValue.creditCard;
          break;
        case 3:
          value = petInsuranceValue.automaticDebit;
          break;
      }

      value = value.toFixed(2);
      value = value.replace(".", ",");

      return `R$ ${value}`;
    }
  },
  components: {
    FormInput: FormInput,
    FormSelect: FormSelect,
    CallToAction: CallToAction,
    googleMap: VueGoogleMaps.Map,
    googleMarker: VueGoogleMaps.Marker
  },
  async beforeMount() {
    if (this.proposal.petInsuranceData.age <= 8) {
      apiClientProvider.getServiceArea(this.proposal._id).then(area => {
        this.serviceArea = area;
      });
    }
  }
};
</script>

<style scoped>
.form-line {
  margin-left: 0px;
}
.place-card {
  border: solid 1px #d3d3d3;
  background-color: #e6e6e6;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 10px;
}
.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.plan-value {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}

.logo-plan-miniatures {
  margin-top: 10px;
}

.logo-plan-miniatures img {
  display: inline-block;
}
.form-group {
  margin-bottom: 0px !important;
}
</style>
