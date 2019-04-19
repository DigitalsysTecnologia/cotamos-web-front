<template>
  <div>
    <section class="section has-text-dark">
      <h2 class="is-size-2 subtitle has-text-centered">Cote conosco sem compromisso</h2>
      <div class="columns">
        <div
          class="column is-half-desktop is-hidden-touch"
          style="margin-left:-24px;margin-top: auto;"
        >
          <img src="/img/medico_apontando.jpg" style="margin-top: 0px;">
        </div>
        <div class="column is-half-desktop" style="margin-top: auto;">
          <div class="container-form">
            <BasicHealthInsurance v-on:submitProposal="submitProposal"/>
          </div>
        </div>
      </div>
    </section>

    <section class="section is-medium has-text-centered">
      <h2 class="is-size-2 subtitle has-text-centered">Faça sua cotação de plano de saúde</h2>
      <p
        class="has-text-justified"
      >O plano de saúde pet para cães e gatos é a oportunidade de passar as despesas com vacinas, consultas, internações e cirurgias do seu pet para uma seguradora.</p>
      <p
        class="has-text-justified"
      >Em resumo, plano de saúde pet é uma forma inteligente para proporcionar Economia, Segurança e Tranquilidade</p>
    </section>
  </div>
</template>

<script>
import Loading from "@/components/molecules/Loading";
import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import BasicHealthInsurance from "@/components/organisms/BasicHealthInsurance";
import apiClientProvider from "@/utils/apiClient";
import validator from "@/utils/validator";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/atoms/CallToAction";
import utils from "@/utils/index";

let router = null;
let queryParams = null;

export default {
  name: "PetInsurance",
  layout: "wl/a3/default",
  methods: {
    GoToForm(event) {
      let partnerId = null;

      if (queryParams) {
        partnerId = queryParams.partnerId;
      }
      router.push({
        path: "/fluxo-vendas",
        query: { product: 5, partnerId: partnerId }
      });
    },
    submitProposal(proposal) {
      router.push({ path: "/fluxo-vendas", query: { id: proposal._id } });
    }
  },
  computed: {
    availablePlans: {
      get() {
        return petInsuranceProvider.getAllPlans();
      }
    }
  },
  data() {
    return { zipCode: "" };
  },
  async beforeMount() {
    router = this.$router;
    queryParams = this.$route.query;
    utils.saveLandingQueryParams(this.$route.query);
  },
  validators: {
    zipCode: value => validator.validateZipCode(value)
  },
  components: {
    Header,
    Footer,
    BasicHealthInsurance,
    Loading,
    CallToAction
  }
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.container-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fff;
  -webkit-box-shadow: -1px -1px 30px 5px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: -1px -1px 30px 5px rgba(0, 0, 0, 0.32);
  box-shadow: -1px -1px 30px 5px rgba(0, 0, 0, 0.32);
}

.primary-color {
  color: #f1ac2d;
}

h2 {
  color: #ff8900;
}
</style>getLandingQueryParams
