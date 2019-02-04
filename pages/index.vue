<template>
  <div>
    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Quem Somos</h2>
      </div>

      <article class="col-sm-6 text-right">
        <img class="responsive-img img-rounded" src="/img/corretor.jpg">
      </article>

      <article class="col-sm-6 text-left article-text">
        <p>A Cotamos é uma corretora de seguros, especializada nos ramos de vida e previdência.</p>
        <p>
          Também oferecemos produtos inovadores como o
          <span class="featured-text">Carro Fácil</span> e
          <span class="featured-text">Health For Pet</span>.
        </p>
      </article>
    </div>

    <div class="productCard">
      
      <div class="rotulo">
        <Span>Serviços</Span>
      </div>
      <div class="circulos">
        <div class="circle c1"></div>
        <div class="circle c2"></div>
        <div class="circle c3"></div>
        <div class="circle c4"></div>
      </div> 
      <div class="cards">
        <div class="card">
        <ProductCard
          name="Plano de Saúde Pet"
          description="Segurança para o seu pet, com um plano de saúde sob medida"
          callToActionText="Saiba Mais"
          callToActionUrl="/plano-de-saude-pet"
          imgUrl="/img/icons/health-for-pet.png"
        />
        </div>
         <div class="card">
          <ProductCard
          name="Carro Por Assinatura"
          description="O seu serviço de carro por assinatura,sob medida"
          callToActionText="Saiba Mais"
          callToActionUrl="/wl/carro-facil"
          imgUrl="/img/icons/carro-facil.png"
        />
        </div>
         <div class="card">
          <ProductCard
          name="Seguro de Vida"
          description="Proteger quem você ama é mais fácil e rápido do que você imagina."
          callToActionText="Saiba Mais"
          callToActionUrl="/wl/seguro-vida"
          imgUrl="/img/icons/seguro-vida.png"
        />
        </div>
         <div class="card">
          <ProductCard
          name="Seguro Viagem"
          description="Uma viagem mais tranquila começa aqui."
          callToActionText="Saiba Mais"
          callToActionUrl="/wl/seguro-viagem"
          imgUrl="/img/icons/travel.png"
        />
        </div>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Seja Parceiro</h2>
      </div>

      <article class="col-xs-12 text-center">
        <p>Seja parceiro da Cotamos, tenha uma renda extra vendendo nossos produtos.</p>
        <v-btn color="primary" round href="/seja-parceiro">Saiba Mais</v-btn>
      </article>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";
import CallToAction from "@/components/CallToAction";
import ApiClient from "@/utils/apiClient";

export default {
  name: "Home",
  computed: {
    carouselItems: {
      get() {
        return [
          {
            src: "/img/carousel-img-2.png"
          }
        ];
      }
    }
  },
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

<style scoped>
.article-text {
  margin-top: 20px;
}
.section {
  padding-top: 20px;
  padding-bottom: 20px;
}
.carousel-container {
  padding-left: 0px;
  padding-right: 0px;
  min-height: 300px;
}
.featured-text {
  font-weight: bold;
}

.productCard{
  display: flex;
}
.cards{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.productCard .rotulo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 15vh;
  background-color:#15bfc1;
  margin-top: 30px;
  height: 20vh;
  z-index: 1;
}
.productCard span{
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.productCard::before{
  content: "";
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #e0e0e0ad;
  position: absolute;
  z-index: 0;
  margin-top: 70px;
}
.circulos{
  display: none;
}
.productCard span{
  color: #fff;
  font-size: 20px;
}
.productCard::before{
  height: 90px;
}
@media (max-width: 700px){
.productCard{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  
}
.cards{
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
}
.card{
  flex-grow: 1;
}
.productCard .rotulo{
  width: 120px;
  height: 30px;
  border-radius: 5px;
  left: 0;
}
.productCard .rotulo span{
  font-size: 15px;
}
.productCard::before{
  width: 1px;
  height: 1400px;
  top: 425px;
  left: 5px;
}
.circulos{
  display: block;
  position: absolute;
  height: 1120px;
  width: 200px;
  left: 0;
}
.circle{
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #15bfc1;
  margin-bottom: 350px;
}
}
@media (max-width: 840px){
  
  .cards{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
  .card{
  display: flex; 
  flex-basis:40%;
  justify-content: center;
  flex-direction: column;
}
}
</style>
