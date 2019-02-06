<template>
  <div>
    <section class="descricao">
      <div class="box-2">
        <div class="about-title-wrapper"> 
          
          <div class="about-upper">
            <div class="about-title">
              Sobre nós
            </div>
            <div class="about-img">
            </div>
          </div>
          <div class="about-footer">
          </div>

        </div>
        <div class="texto">
          <h2>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit</h2>
          <div class="line-2"></div>
          <p>  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          </p>
        </div>
        <div class="line"></div>
      </div>
    </section>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Conheça Nossos Produtos</h2>
      </div>
    </section>

      <article class="col-xs-12 text-center">
        <ProductCard
          name="Plano de Saúde Pet"
          description="Segurança para o seu pet, com um plano de saúde sob medida"
          callToActionText="Saiba Mais"
          callToActionUrl="/plano-de-saude-pet"
          imgUrl="/img/icons/health-for-pet.png"
        />

        <ProductCard
          name="Carro Por Assinatura"
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
    <section class="descricao">
      <div class="box-2">
        <div class="texto">
          <h2>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit</h2>
          <div class="line-2"></div>
          <p>  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          </p>
        </div>
        <div class="line"></div>
        <div class="desc-wrapper"> 
          
          <div class="desc-upper">
            <div class="desc-title">
            </div>
            <div class="desc-img">
            </div>
          </div>
          <div class="desc-footer">
          </div>

        </div>
      </div>
    </section>
    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Seja Parceiro</h2>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import CallToAction from "@/components/CallToAction";
import ApiClient from "@/utils/apiClient";

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
    CallToAction: CallToAction,
    ProductCard: ProductCard
  }
};
</script>

<style scoped>

.about-title-wrapper, .desc-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 30px !important;
}

.about-upper, .desc-upper {
  display: flex;
  justify-content: center;
}

.about-title, .desc-title{
  padding: 0 2rem;
  text-align: left;
}

.about-title, .about-img, .desc-title, .desc-img {
  width: 125px;
  height: 150px;
  margin: 1rem;
  border-radius: 25px;
  background: #15bfc1;
}

.desc-title, .desc-img{ 
  width: 150px;
  height: 210px;
}

.about-img, .desc-img {
  margin-left: 0;
}

.about-title, .desc-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-footer, .desc-footer {
  background:#15bfc1;
  width: 266px;
  height: 100px;
  border-radius: 25px;
}
.desc-footer {
  width: 316px;
  height: 115px;
}
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

.descricao {
  display: flex;
  justify-content: center;
}
.descricao .box-2{
    display: flex;
    justify-content: space-around;
    padding: 15px;
    width: 1039.2px;
    
}
.descricao .box-2 img {
    width: 300px;
    height: 300px;
    border-radius: 10px;
}
.descricao .box-2 .texto {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    padding-top: 80px;
}

.descricao .box-2 .texto h2 {
    font-size: 2rem;
    flex-wrap: wrap;
    text-align: left;
    padding-bottom: 0;
}
.descricao .box-2 .texto p {
    max-width: 450px;
    padding-left: 50px;
    text-align: justify;
    font-size: 1rem;

}
.descricao .box-2 .line{
  position: relative;
  width: 1px;
  height: 350px;
  background-color: #b3b3b3;
}

.descricao .box-2 .line::after{
  content: "";
  position: absolute;
  top: 100px;
  right: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #15bfc1
}

@media (max-width: 850px) {
    .descricao .box-2{
        flex-direction: column-reverse;
        flex-wrap: wrap;
    }
    .descricao .box-2 img{
        display: none;
    }
    .descricao .box-2 .line{
      display: none;
    }
    .descricao .box-2 .texto .line-2{
      width: 200px;
      height: 4px;
      margin-bottom: 30px;
      background-color: #15bfc1;
    }
    .descricao .box-2 .line::after{
      display: none;
    }

}
</style>
