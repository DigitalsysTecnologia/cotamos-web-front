<template >
    <div v-if="currentProduct == 5">
        <NavBar />
        <main class="container-fluid">
            <div class="row">
                <header class="col-xs-12 banner-pgs banner"
                        style="backgroundImage: url(../static/img/bg_outros.jpg)">
                    <div class="container">
                        <h1>{{currentProductName}}</h1>
                    </div>
                </header>
            </div>
        </main>
        <section class="container-fluid bg-outros">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <section class="col-xs-12 formulario-cotacao">
                            <div class="col-sm-12 col-xs-12 box-cotacao">
                                  <PetInsuranceForm />
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
    <div v-else-if="currentProduct == 6">
      <TravelInsuranceRegister />
    </div>
    <div v-else-if="currentProduct == 7">
      <PortoCarroFacil />
    </div>
</template>


<script>
import Footer from "@/components/Footer";
import PetInsuranceForm from "./pet-insurance-form/Index";
import TravelInsuranceRegister from "./travel-insurance/Index";
import PortoCarroFacil from "./porto-carro-facil/Index"
import NavBar from "@/components/NavBar";

export default {
  name: "ProposalRegister",
  data() {
    return {
      product: 0
    };
  },
  components: {
    Footer: Footer,
    PetInsuranceForm: PetInsuranceForm,
    TravelInsuranceRegister: TravelInsuranceRegister,
    PortoCarroFacil:PortoCarroFacil,
    NavBar: NavBar
  },
  computed: {
    currentProduct: function() {
      return parseInt(this.product);
    },
    currentProductName: function() {
      switch (parseInt(this.product)) {
        case 5:
          return "Saúde Pet";
        default:
          return "";
      }
    }
  },
  beforeMount() {
    this.product = this.$route.query.product;
  }
};
</script>

<style scoped>
.formulario-cotacao {
  margin-bottom: 20px;
}
.box-cotacao {
  padding-bottom: 20px;
}
@media (max-width: 500px) {
  .banner {
    background-position-x: -1000px;
    background-position-y: 0px;
  }
}
</style>
