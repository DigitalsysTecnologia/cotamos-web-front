<template>
  <div>
    <section class="section is-medium has-text-centered">
      <img src="/img/pets_looking_down.jpg" />
      <h2 class="is-size-2 subtitle has-text-centered">O que é plano de saúde pet?</h2>
      <p class="has-text-justified">
O plano de saúde pet para cães e gatos é a oportunidade de passar as despesas com vacinas, consultas, internações e cirurgias do seu pet para uma seguradora.
      </p>
      <p class="has-text-justified">
        Em resumo, plano de saúde pet é uma forma inteligente para proporcionar Economia, Segurança e Tranquilidade
      </p>
    </section>

    <section class="section is-medium primary-color-background has-text-light">
      <h2 class="is-size-2 subtitle has-text-centered">Como funciona o plano de saúde pet?</h2>
      <p>O plano de saúde pet é muito semelhante a um plano de saúde para seres humanos.</p>
      <p>Por um pagamento mensal, seu pet tem acesso a uma rede credenciada com diversas clínicas veterinárias para atendimento.</p>
      <p>De acordo com o plano escolhido, existem coberturas e carências diferenciadas, por isso, é importante prestar atenção aos serviços oferecidos em cada plano</p>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <img src="/img/filhote_cao.jpg">
          </div>
          <div class="column is-half has-text-justified">
            <article class="message is-primary">
              <div class="message-header">
                <p>Qualquer pet pode ter um plano de saúde?</p>
              </div>
              <div class="message-body">
                Atualmente, os planos de saúde pet estão disponíveis apenas para
                <span
                  class="strong"
                >cães</span> e
                <span class="strong">gatos</span>.
              </div>
            </article>

            <article class="message is-primary">
              <div class="message-header">
                <p>Pets de qualquer idade podem aderir ao plano?</p>
              </div>
              <div class="message-body">
                <p>
                  Podem existir restrições de cobertura dependendo da idade em que o pet
                  <span
                    class="strong"
                  >aderir</span> ao plano.
                </p>
                <p>Entretanto, após a adesão ao plano de saúde, a cobertura do plano é válida por toda a vida do seu pet.</p>
                <p>Ou seja, quanto mais cedo for feito o plano de saúde do pet, mais tranquilidade você terá com relação aos cuidados veterinários dele.</p>
              </div>
            </article>

            <article class="message is-primary">
              <div class="message-header">
                <p>O plano de saúde pet tem cobertura nacional?</p>
              </div>
              <div class="message-body">
                <p>Não, o plano de saúde está disponível em apenas alguns locais do Brasil.</p>
                <p>Devido à isso, precisamos de algumas informações para verificar a disponibilidade do plano para você e informações sobre o seu pet para lhe informar os valores.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section is-medium primary-color-background has-text-light">
      <h2 class="is-size-2 subtitle has-text-centered">O plano de saúde é um produto da Cotamos?</h2>
      <p class="is-size-3">Não, a Cotamos é uma corretora e como tal, apenas realiza o intermédio da venda de plano saúde pet.</p>
    </section>

    <section class="section is-medium has-text-dark">
      <h2 class="is-size-2 subtitle has-text-centered">Faça sua cotação on-line</h2>
      <div class="columns">
        <div class="column is-half is-hidden-touch" style="margin-left:-24px;">
          <img src="/img/dog_on_pc.png" style="margin-top: 50px;">
        </div>
        <div class="column is-half-desktop">
          <div class="container-form">
            <BasicForm v-on:submitProposal="submitProposal"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FormInput from "@/components/Form/Input";
import BasicForm from "@/components/Forms/BasicPetInsuranceData";
import apiClientProvider from "@/utils/apiClient";
import validator from "@/utils/validator";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
import utils from "@/utils/index";

let router = null;
let queryParams = null;

export default {
  name: "PetInsurance",
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
  head() {
    return {
      title: "Cotamos.com - Plano de Saúde PET"
    };
  },
  data() {
    return {zipCode: ""};
  },
  async beforeMount() {
    router = this.$router;
    queryParams = this.$route.query;
    utils.saveLandingQueryParams(this.$route.query);
  },
    validators: {
    "zipCode": value =>
      validator.validateZipCode(value)
  },
  components: {
    Header,
    Footer,
    BasicForm,
    Loading,
    CallToAction,
    FormInput
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
  border: 1px solid #FFF;
  -webkit-box-shadow: -1px -1px 30px 5px rgba(0,0,0,0.32);
  -moz-box-shadow: -1px -1px 30px 5px rgba(0,0,0,0.32);
  box-shadow: -1px -1px 30px 5px rgba(0,0,0,0.32);
}

</style>getLandingQueryParams
