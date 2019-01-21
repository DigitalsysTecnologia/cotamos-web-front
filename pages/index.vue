<template>
  <div>
    <section id="home">
      <div class="imgMob">
        <div></div>
      </div>
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
        <h3>Lorem ipsum dolor sit amet, adipiscing elit.</h3>
        <a>
          <h5>Simule Grátis</h5>
          <span>
            <i class="fas fa-caret-right"></i>
          </span>
        </a>
      </div>
    </section>
    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Conheça Nossos Produtos</h2>
      </div>

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
  color: #b3b3b3;
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
</style>
