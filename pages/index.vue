
<template>
  <div>
    <section class="section primary-color-background has-text-light">
      <h2 class="is-size-2 subtitle has-text-centered">Digital, para sua comodidade</h2>
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-half has-text-centered">
              <img class="is-rounded" src="/img/white_logo.png">
            </div>
            <div class="column is-half">
              <p>A Cotamos tem como objetivo facilitar a sua vida, através de tecnologia, fazemos a venda de maneira on-line.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section has-text-dark">
      <h2 class="is-size-2 subtitle has-text-centered">Nossos produtos</h2>
      <div class="columns is-multiline">
        <div
          v-for="(card, idx) in cards"
          :key="`card_${idx}`"
          class="column is-full-mobile is-half-tablet is-one-quarter-widescreen is-one-quarter-fullhd"
        >
          <ProductCard
            :name="card.name"
            :description="card.description"
            :callToActionText="card.callToActionText"
            :callToActionUrl="card.callToActionUrl"
            :imgUrl="card.imgUrl"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import ApiClient from "@/utils/apiClient";

export default {
  name: "Home",
  data() {
    return {
      cards: [
        {
          name: "Plano de Saúde Pet",
          description:
            "Segurança para o seu pet, com um plano de saúde sob medida",
          callToActionText: "Saiba Mais",
          callToActionUrl: "/plano-de-saude-pet",
          imgUrl: "/img/pet-accident-icon.png"
        },
        {
          name: "Carro Por Assinatura",
          description: "Seu carro por assinatura, sob medida",
          callToActionText: "Saiba Mais",
          callToActionUrl: "/wl/carro-facil",
          imgUrl: "/img/icons/carro-facil.png"
        },
        {
          name: "Seguro de Vida",
          description: "Proteção para quem você mais ama",
          callToActionText: "Saiba Mais",
          callToActionUrl: "/wl/seguro-vida",
          imgUrl: "/img/icons/seguro-vida.png"
        },
        {
          name: "Seguro Viagem",
          description: "Viaje com tranquilidade",
          callToActionText: "Saiba Mais",
          callToActionUrl: "/wl/seguro-viagem",
          imgUrl: "/img/icons/travel.png"
        }
      ]
    };
  },
  computed: {},
  methods: {},
  components: {
    ProductCard
  }
};
</script>

<style scoped>
</style>
