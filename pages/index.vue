<template>
  <div>
    <section id="home">
      <div class="imgMob"></div>
      <svg viewBox="0 0 221.39262 179.24785" class="svgImg">
        <defs>
          <clipPath id="imgClip">
            <path
              d="m -110.75224,47.206092 23.578883,-24.265358 188.798637,-0.01704 -0.0204,96.188776 -69.621579,72.03584 c -12.432351,12.86346 -27.8210914,15.91982 -42.0106,1.31754 L -111.7884,87.744419 c -8.98224,-9.243531 -12.56902,-26.537036 1.03616,-40.538327 z"
            ></path>
          </clipPath>
        </defs>
        <g transform="translate(119.76774,-22.923693)">
          <image
            y="22.590771"
            x="-132.53722"
            xlink:href="/img/home_navbar.png"
            height="178.51721"
            width="267.81406"
            clip-path="url(#imgClip)"
          ></image>
        </g>
      </svg>

      <div class="descHome">
        <h1>Seguro sem Complicações</h1>
        <h3>Proteção para que você ama.</h3>
        <a href="/plano-de-saude-pet">
          <h5>Simule Grátis</h5>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
        </a>
      </div>
    </section>

    <section>
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
#home {
  height: 750px;
}

.imgMob {
  display: none;
}

.svgImg {
  position: absolute;
  right: -30px;
  top: -125px;
  width: 65%;
}

.descHome {
  margin: 25vh 0 0 19vw;
  width: 30%;
  padding-left: 20px;
  border-left: 1px solid #dadada;
}

.descHome h1 {
  position: relative;
  font-size: 3.2vw;
  font-weight: 700;
}

.descHome h1::after {
  position: absolute;
  bottom: -15px;
  left: 0;
  content: "";
  width: 25%;
  height: 5px;
  background-color: #4d4d4d;
}

.descHome h3 {
  margin-top: 3vw;
  font-size: 1.7vw;
  width: 80%;
  color: #525252;
}

.descHome a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 65%;
  height: 6vh;
  margin-top: 40px;
  border-radius: 40px;
  box-shadow: 0px 0px 1px #b3b3b3;
}

.descHome a h5 {
  font-size: 1.5vw;
  font-weight: 500;
  color: #4d4d4d;
  margin-left: 20px;
}

.descHome a span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vh;
  height: 6vh;
  font-size: 20px;
  border-radius: 50%;
  color: #ffffff;
  background-color: #15bfc1;
}

@media screen and (max-width: 768px) {
  .svgImg {
    display: none;
  }

  .imgMob {
    display: block;
    position: absolute;
    top: -100px;
    margin: -16px 0 0 -16px;
    width: calc(100% + 48px);
    height: 640px;
    background-image: url(/img/home_navbar.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 0;
  }

  .imgMob div {
    width: 100%;
    height: 540px;
    margin-top: 100px;
    background-color: #222222a9;
  }

  .descHome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: -116px;
    margin: 0;
    padding: 0 30px;
    width: 100%;
    height: 640px;
    border: none;
    color: #fff;
  }

  .descHome h1 {
    font-size: 12vw;
    margin: 0;
  }

  .descHome h1::before {
    position: absolute;
    left: -25px;
    top: 30px;
    content: "";
    width: 3px;
    height: 20vh;
    background-color: #fff;
  }

  .descHome h1::after {
    background-color: #27e694;
  }

  .descHome h3 {
    margin-top: 30px;
    font-size: 6vw;
    width: 80%;
    color: #d9d9d9;
  }

  .descHome a {
    position: absolute;
    top: 520px;
    justify-content: center;
    width: calc(100% - 60px);
    box-shadow: none;
    background-color: #15bfc1;
  }

  .descHome a h5 {
    font-size: 5vw;
    font-weight: 700;
    color: #fff;
    margin-left: 0;
  }

  .descHome a span {
    position: absolute;
    right: 0;
  }
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

.productCard {
  display: flex;
}
.cards {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.productCard .rotulo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  width: 15vh;
  background-color: #15bfc1;
  margin-top: 30px;
  height: 20vh;
  z-index: 1;
}
.productCard span {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.productCard::before {
  content: "";
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #e0e0e0ad;
  position: absolute;
  z-index: 0;
  margin-top: 70px;
}
.circulos {
  display: none;
}
.productCard span {
  color: #fff;
  font-size: 20px;
}
.productCard::before {
  height: 90px;
}
@media (max-width: 700px) {
  .productCard {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .cards {
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;
  }
  .card {
    flex-grow: 1;
  }
  .productCard .rotulo {
    width: 120px;
    height: 30px;
    border-radius: 5px;
    left: 0;
  }
  .productCard .rotulo span {
    font-size: 15px;
  }
  .productCard::before {
    width: 1px;
    height: 1320px;
    top: 740px;
    left: 5px;
  }
  .circulos {
    display: block;
    position: absolute;
    height: 1120px;
    width: 200px;
    left: 0;
  }
  .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #15bfc1;
    margin-bottom: 350px;
  }
}
@media (max-width: 840px) {
  .cards {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }
  .card {
    display: flex;
    flex-basis: 40%;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
