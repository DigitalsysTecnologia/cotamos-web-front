<template>
    <div>
        <div class="container-fluid">
          <Header />

          <div class="row section">
              <div class="col-xs-12 text-center">
                  <h2>Preencha o seu cadastro</h2>
              </div>

              <article class="col-xs-12 text-center">
                  <BasicPartnerForm v-on:onSubmitPartner="createPartner"/>
              </article>
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
import ProductCard from "../components/product-card.vue";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "Home",
  methods: {
    createPartner: async function (partner) {
      
      await apiClientProvider.createPartner(partner);

      alert('uuuhuuu')

      
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
</style>
