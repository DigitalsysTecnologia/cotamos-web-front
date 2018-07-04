<template>
    <div>
        <Carousel :per-page="1" 
                  :mouse-drag="true" 
                  :navigationEnabled="false" 
                  paginationActiveColor="#42b983" 
                  paginationColor="#b2ebd1"
                  easing="linear"
                  :loop="true"                  
                  style="margin-top:50px;">
            <Slide v-for="plan in availablePlans" :key="plan.logo" v-if="paymentMethod">
                <div class="plan-card">
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
                        <span class="plan-value" style="display:block;">
                          Preços:
                        </span>
                        <span>
                          <span class="price"> {{formatCurrency(plan.value.bankSlip)}} </span>  (Boleto Bancário)
                          <br />
                          <span class="price"> {{formatCurrency(plan.value.creditCard)}} </span> (Cartão de Crédito)
                          <br />
                          <span class="price"> {{formatCurrency(plan.value.automaticDebit)}} </span> (Débito Automático)
                        </span>
                        </div>
                        <div class="col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-2" style="margin-top:10px;">
                        <div>
                            <CallToAction v-on:click="selectPlan(plan)"> Quero contratar</CallToAction>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </Slide>
        </Carousel>

        <Footer />
    </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
import apiClientProvider from "@/providers/apiClientProvider";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default {
  name: "InsuranceOffers",
  data() {
    return {
      paymentMethod: 1,
      proposal: null
    };
  },
  methods: {
    formatCurrency(value) {
      // let value = 0;
      // switch (parseInt(this.paymentMethod)) {
      //   case 1:
      //     value = petInsuranceValue.bankSlip;
      //     break;
      //   case 2:
      //     value = petInsuranceValue.creditCard;
      //     break;
      //   case 3:
      //     value = petInsuranceValue.automaticDebit;
      //     break;
      // }

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
    this.proposal = await apiClientProvider.getProposalById(
      this.$route.query.id
    );
  },
  components: {
    Carousel: Carousel,
    Slide: Slide,
    CallToAction: CallToAction,
    NavBar: NavBar,
    Footer: Footer
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
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
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
.price {
  font-weight: bold;
}
</style>
