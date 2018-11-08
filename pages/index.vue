<template>
    <div>
        <!-- <div class="row">
            <div class="carousel-container">
              <no-ssr>
              <v-carousel hide-delimiters hide-controls>
                <v-carousel-item
                  v-for="(item,i) in carouselItems"
                  :key="i"
                  :src="item.src"
                ></v-carousel-item>
              </v-carousel>
              </no-ssr>
            </div>
        </div> -->

        <div class="row section">
            <div class="col-xs-12 text-center">
                <h2 class="subtitle">Quem Somos</h2>
            </div>

            <article class="col-sm-6 text-right">
                <img class="responsive-img img-rounded" src="/img/corretor.jpg" />
            </article>

            <article class="col-sm-6 text-left article-text">
            <p> 
                A Cotamos é uma corretora de seguros, especializada nos ramos de vida e previdência.
            </p>
            <p> 
                Também oferecemos produtos inovadores como o <span class="featured-text">Carro Fácil</span> e <span class="featured-text">Health For Pet</span>.
            </p>
            </article>
        </div>

        <div class="row section">
            <div class="col-xs-12 text-center">
                <h2 class="subtitle">Conheça Nossos Produtos</h2>
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
            src: "/img/carousel-img-2.png",
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
</style>
