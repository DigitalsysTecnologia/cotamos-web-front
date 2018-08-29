<template>
  <div style="overflow-x:hidden;">
    <div class="row">
      <div class="col-xs-12 carousel-container">
        <h3 style="margin-top:20px;" class="text-center">Suas Ofertas Disponíveis </h3>
                    
        <div class="plan-card" v-for="plan in availablePlans" :key="plan.logo" v-if="paymentMethod">
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

              <div class="col-sm-4 col-xs-12 text-center" v-if="plan.code != 'pet_senior'">
                <div class="col-xs-12">
                  <span class="card-subtitle">
                    Cobertura
                  </span>
                  
                    <div class="progress" style="margin-bottom:15px;margin-top:10px;">
                      <div class="progress-bar" :style="{
                          'backgroundColor': getCoverageProgressBarByPlan(plan).backgroundColor, 
                          'width': `${getCoverageProgressBarByPlan(plan).width}%`,
                          'color': 'black' }" 
                      role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                        {{ getCoverageProgressBarByPlan(plan).text}}
                      </div>
                    </div>
                  
                  <p>
                    <button class="btn btn-primary" href="#" v-on:click="showCoverageModal(plan)">Ver Detalhes</button>
                  </p>
                </div>
              </div>

              <div class="col-sm-4 col-xs-12 text-center health-network-container" v-if="plan.code != 'pet_senior'">
                <p>
                  <span class="card-subtitle">Rede Credenciada</span>
                  <span class="card-places-near">{{places.length}}</span>
                  <span class="card-info">clínicas próximas</span>
                </p>
                <button class="btn btn-primary" v-on:click="showNetworkModal(plan)" style="margin-top:10px;">Ver Clínicas</button>
              </div>

              <div class="col-sm-4 col-xs-12 text-center" :class="{'col-sm-offset-4' : (plan.code == 'pet_senior')}" style="margin-top:20px;">
                <span class="card-subtitle">
                  Preços
                </span>
                <div class="col-sm-offset-2 col-sm-12 text-left">
                <span>
                  <span class="card-featured-info"> {{formatCurrency(plan.value.bankSlip)}} </span>  (Boleto Bancário)
                  <br />
                  <span class="card-featured-info"> {{formatCurrency(plan.value.creditCard)}} </span> (Cartão de Crédito)
                  <br />
                  <span class="card-featured-info"> {{formatCurrency(plan.value.automaticDebit)}} </span> (Débito Automático)
                </span>
                </div>
              </div>                     

            </div>

            <div class="row">
              <div class="col-sm-4 col-xs-12 text-center" style="margin-top:30px;">
                <CallToAction v-on:click="selectPlan(plan)" textColor="#2f2f2f"> Quero contratar</CallToAction>
                </div>
            </div>

        </div>
        
        <!-- CoverageModal -->
        <div class="modal" id="coverageModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title card-subtitle text-center">Coberturas</h4>
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="max-height: 200px;overflow-x: hidden;overflow-y: scroll;">
                
                <div v-for="(item) in currentPlanCoverage" :key="JSON.stringify(item)">
                  
                  <p v-if="coverageContainsPlan(item)">
                    <i class="fas fa-check" style="color:green;"/>
                    <span style="font-weight:bold;">{{item.name}}</span>
                  </p>

                  <p v-else>
                    <i class="fas fa-times" style="color:red;"/>
                    <span style="color:gray;">{{item.name}}</span>
                  </p>
                </div>
                
              </div>

              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
              </div>

            </div>
          </div>
        </div>
        
        <!-- NetworkModal -->
        <div class="modal" id="networkModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title card-subtitle text-center">Clínicas Próximas a Você</h4>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body" style="max-height: 200px;overflow-x: hidden;overflow-y: scroll;">

                <div v-for="(map, idx) in places" :key="idx">
                  <div class="place-card">
                    <p>
                      <span style="font-weight: bold;"> Nome: </span> 
                      <span> {{map.name}}</span>
                      <br/>

                      <span style="font-weight: bold;"> Endereço: </span> 
                      <span v-if="map.neighborhood">{{formatAddress(map)}} </span>
                      <br/>

                      <span style="font-weight: bold;"> Telefone: </span> 
                      <span v-if="map.neighborhood">{{formatPhone(formatPhone)}} </span>
                      <br/>                      

                      <span style="font-weight: bold;"> Distância: </span> 
                      <span> {{formatDistance(map.distance)}} </span>
                      <br/>
                      
                    </p>
                  </div>
                </div>
              </div>

              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Fechar</button>
              </div>

            </div>
          </div>
        </div>
        
        <!-- ConfirmModal -->
        <div class="modal" id="confirmModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title card-subtitle text-center">Obrigado</h4>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body" style="overflow-x: hidden;overflow-y: scroll;">
                 <h3>Sua proposta foi enviada com sucesso</h3>
                  <p>
                    Em breve seu pet já estará com o plano de saúde. </p>
                  <p>
                    Entraremos em contato para confirmar seus dados e agendar a primeira consulta de seu pet.
                  </p>
                  <p>Você receberá um link por e-mail para efetuar o primeiro pagamento.</p>
                  <p>
                    Caso tenha alguma dúvida, você pode entrar em contato conosco através de:

                    <ul style="margin-top:10px;">
                      <li>
                        <span>Telefone: <i class="fab fa-whatsapp-square"/> (11) 3297-3864</span>
                      </li>
                      <li>
                        <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 94783-1054</span>
                      </li>
                      <li>
                        <span>E-mail: <i class="fas fa-envelope-square"/> contato@cotamos.com</span>
                      </li>
                    </ul>
                  </p>
                  <p>
                    Muito Obrigado - Equipe Cotamos
                  </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
    
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import apiClientProvider from "@/providers/apiClientProvider";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default {
  name: "InsuranceOffers",
  data() {
    return {
      paymentMethod: 1,
      planCoverage: [],
      currentPlan: null,
      serviceArea: null,
      loading: true
    };
  },
  props: {
    proposal: {
      required: true,
      type: Object
    }
  },
  methods: {
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
        if (!this.serviceArea || !this.serviceArea.plans) {
          return [];
        }

        return this.serviceArea.plans[0].places;
      }
    },
    currentPlanCoverage: {
      get() {
        return this.planCoverage;
      }
    },
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
    }
  },

  async beforeMount() {
    if (this.proposal.petInsuranceData.age <= 8) {
      this.serviceArea = await apiClientProvider.getServiceArea(
        this.proposal._id
      );
    }

    this.loading = false;
  },
  components: {
    Carousel: Carousel,
    Slide: Slide,
    CallToAction: CallToAction,
    Header: Header,
    Footer: Footer,
    Loading: Loading
  }
};
</script>

<style scoped>
.form-line {
  margin-left: 0px;
}

.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.place-card {
  border: solid 1px #148892;
  /* background-color: #e6e6e6; */
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 10px;
}

.card-item {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}

.health-network-container {
  margin-top: 10px;
  margin-bottom: 10px;
}
.card-subtitle {
  display: block;
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}
.card-featured-info {
  font-weight: bold;
}
.card-places-near {
  font-weight: bold;
  font-size: 18px;
}
.card-info {
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

/* @media (min-width: 500px) {
  .carousel-container {
    padding-left: 50px;
    padding-right: 50px;
  }
} */
</style>

