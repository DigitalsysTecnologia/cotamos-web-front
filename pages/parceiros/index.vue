<template>
    <div>
        <div class="container-fluid">
          <Header />

          <div class="row section">
              <div class="col-xs-12 text-center">
                  <h2>Preencha o seu cadastro</h2>
              </div>
        </div>
        <div class="form-container">
          <BasicPartnerForm v-on:onSubmitPartner="createPartner"/>
        </div>

          <Footer :hideLogo="true"/>
        </div>
  </div>

</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import BasicPartnerForm from "./components/BasicPartnerForm";
import ProductCard from "@/components/ProductCard";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "Home",
  methods: {
    createPartner: async function(partner) {
      await apiClientProvider.createPartner(partner);
    }
  },
  components: {
    Footer: Footer,
    Header: Header,
    NavBar: NavBar,
    CallToAction: CallToAction,
    ProductCard: ProductCard,
    BasicPartnerForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  padding-top: 20px;
  padding-bottom: 20px;
}

.carousel-inner {
  background: #00d886;
  background: -moz-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: -webkit-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: linear-gradient(to right, #00d886 0%, #00d6e7 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
}

.form-container {
  border: 2px solid rgb(5, 62, 66);
  border-radius: 5px;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
