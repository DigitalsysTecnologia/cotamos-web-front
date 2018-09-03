<template>
    <div>
        <div class="container-fluid">
          <Header />

          <div class="row" style="display:block;">
              <div class="col-xs-12" style="padding-left:0px;padding-right:0px;">
                  <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                      <ol class="carousel-indicators">
                          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>
                          <li data-target="#carousel-example-generic" data-slide-to="1"/>
                      </ol>

                      <div class="carousel-inner" role="listbox">
                          <div class="item active">
                              <div class="carousel-caption">
                                  <h1>COTAMOS.COM</h1>
                                  <h2>VOCÊ, SEGURADO TODOS OS DIAS, O DIA TODO!</h2>
                              </div>
                          </div>

                          <div class="item">
                              <div class="carousel-caption">
                                  <h1></h1>
                                  <h2>A COTAMOS.COM é digital, mas a sua proteção é real!</h2>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="row section">
              <div class="col-xs-12 text-center">
                  <h2>Conheça Nossos Produtos!</h2>
              </div>

              <article class="col-xs-12 text-center">
                  <ProductCard 
                      name='Plano de Saúde Pet'
                      description="Segurança para o seu pet, com um plano de saúde sob medida"
                      callToActionText="Saiba Mais"
                      callToActionUrl="/plano-de-saude-pet"
                      imgUrl="/img/icons/health-for-pet.png"
                  />

                  <ProductCard 
                      name='Carro Por Assinatura'
                      description="Seu carro por assinatura, sob medida"
                      callToActionText="Saiba Mais"
                      callToActionUrl="/wl/carro-facil"
                      imgUrl="/img/icons/carro-facil.png"
                  />
                  
                  <ProductCard 
                      name="Seguro de Vida"
                      description="Proteção para quem você mais ama"
                      callToActionText="Saiba Mais"
                      callToActionUrl="/wl/seguro-vida"
                      imgUrl="/img/icons/seguro-vida.png"
                  />

                  <ProductCard 
                      name="Seguro Viagem"
                      description="Viaje com tranquilidade"
                      callToActionText="Saiba Mais"
                      callToActionUrl="/wl/seguro-viagem"
                      imgUrl="/img/icons/travel.png"
                  />

              </article>
          </div>

          <!-- <div class="row section">
              <div class="col-xs-12 text-center">
                  <h2>Seja nosso parceiro</h2>
              </div>

              <article class="col-xs-12 text-center">
                  <CallToAction v-on:click="GoToUrl('/parceiros')">Seja nosso parceiro </CallToAction>

              </article>
          </div> -->
          
          <Footer :hideLogo="true"/>
        </div>
  </div>

</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ProductCard from "./components/product-card.vue";
import CallToAction from "@/components/CallToAction";
export default {
  name: "Home",
  methods: {
    GoToUrl(path) {
      this.$router.push({
        path: path
      });
    }
  },
  components: {
    Footer: Footer,
    Header: Header,
    NavBar: NavBar,
    CallToAction: CallToAction,
    ProductCard: ProductCard
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
