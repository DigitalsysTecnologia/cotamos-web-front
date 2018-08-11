<template>
    <div>
      <Header />

      <section class="container-fluid section">
          <div class="row">
            <div class="col-md-offset-2 col-md-8 text-center">
              <h2 class="subtitle">O que é plano de saúde pet?</h2>
            </div>
          </div>
          
          <div class="row" style="padding-top:15px;">
            <div class="col-md-offset-2 col-md-2 col-sm-12 col-sm-offset-0">
              <img class="img-responsive center-block" src="/static/img/dr_cao.png" style="max-height: 200px;"/>
            </div>

            <div class="col-md-6 col-sm-12 col-sm-offset-0">
              <p>
                O plano de saúde pet <span style="font-weight:bold;">para cães e gatos</span> é a oportunidade de passar as despesas com vacinas, consultas, internações e cirurgias do seu pet para uma seguradora.
              </p>

              <p>
                Em resumo, plano de saúde pet é uma forma  inteligente para proporcionar: 
                <ul style="margin-top:10px;">
                  <li><span style="font-weight:bold;">Economia</span>;</li>
                  <li><span style="font-weight:bold;">Segurança</span>;</li>
                  <li><span style="font-weight:bold;">Tranquilidade</span>.</li>
                </ul>
              </p>
            </div>

          </div>

      </section>

      <section class="container-fluid section">
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
            <h2 class="subtitle">FAÇA UMA COTAÇÃO ON-LINE</h2>
            <BasicForm v-on:submitProposal="submitProposal"/>
          </div>
        </div>
      </section>        

      <section class="container-fluid section">
          <div class="row">
            <div class="col-md-offset-2 col-md-8 text-center">
              <h2 class="subtitle">Por que eu deveria contratar um plano de saúde pet?</h2>
            </div>
          </div>
          
          <div class="row" style="padding-top:15px;">
            <div class="col-md-offset-2 col-md-8 col-sm-12">
              <p>
                Assim como os humanos, os pets também tem necessidades de cuidados com a saúde. 
                Com os planos de saúde, você tem acesso a uma série de clínicas para tratamento veterinário.
              </p>
            </div>

          </div>

      </section>

      <section class="container-fluid section">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 text-center">
            <h3>PARA OS FILHOTES</h3>
          </div>
          <div class="col-md-offset-2 col-md-2 col-sm-6 col-xs-12">
            <img src="/static/img/filhote_cao_gato.jpg" class="img-responsive center-block" />
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 text-center">
            <p class="section-text">
              Quando um filhote canino ou felino passa por fases delicadas, como a construção da imunidade e adaptação à sua nova alimentação, ele epode ficar mais predisposto à instabilidades gastrointestinais e algumas alergias, gerando mais idas ao veterinário. 
              A descoberta do mundo e de sua nova casa também podem expor seu pet a riscos bastante comuns, como acidentes ou a ingestão de corpos estranhos. Esses incidentes ocorrem em 1 a cada 3 pets por ano.
            </p>
            <CallToAction v-on:click="GoToForm">
              &nbsp; CONHEÇA OS PLANOS DISPONÍVEIS
            </CallToAction>
          </div>
        </div>
      </section>

      <section class="container-fluid section">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 text-center">
            <h3>PARA OS ADULTOS</h3>
          </div>
          <div class="col-md-offset-2 col-md-2 col-sm-6 col-xs-12">
            <img src="/static/img/adulto_cao_gato.jpg" class="img-responsive center-block" />
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 text-center">
            <p class="section-text">
              Ainda que o seu pet se mostre saudável, nunca se dê por satisfeito.
              É importante que você o observe periodicamente e com atenção e, diante de qualquer indício de que algo não anda bem, leve-o de imediato ao veterinário.
              Um pet adulto tem que ser revacinado a cada ano, durante toda sua vida. E a desparasitação deve ser periódica, já que ele se expõe constantemente ao risco de contrair parasitas.
              Por isso, um plano de saúde é muito importante nessa fase da vida.
            </p>
            <CallToAction v-on:click="GoToForm">
              &nbsp; CONHEÇA OS PLANOS DISPONÍVEIS
            </CallToAction>
          </div>
        </div>
      </section>

      <section class="container-fluid section">
        <div class="row">
          <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 text-center">
            <h3>PARA OS ADULTOS+</h3>
          </div>
          <div class="col-md-offset-2 col-md-2 col-sm-6 col-xs-12">
            <img src="/static/img/velho_cao_gato.jpg" class="img-responsive center-block" />
          </div>
          <div class="col-md-6 col-sm-6 col-xs-12 text-center">
            <p class="section-text">
              O tempo de vida dos pets varia muito dependendo da raça, do porte do animal e dos cuidados que ele recebe durante a vida. Porém, a expectativa é que os cães vivam em média 15 anos, enquanto os gatos podem chegar a 20. Mas o importante mesmo é que sempre se tenha atenção com a saúde e o bem-estar dos bichinhos, principalmente quando eles estiverem idosos e precisando ainda mais do nosso amor e cuidado.
            </p>
            <CallToAction v-on:click="GoToForm">
              &nbsp; CONHEÇA OS PLANOS DISPONÍVEIS
            </CallToAction>
          </div>
        </div>
      </section>

      <Footer :hideLogo="true"/>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BasicForm from "../components/BasicForm.vue";
import apiClientProvider from "@/providers/apiClientProvider";
import validator from "@/utils/validator";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/CallToAction";
import utils from "@/utils/index";

let router = null;

export default {
  name: "PetInsuranceV3",
  methods: {
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    },
    GoToForm(event) {
      router.push({ name: "SalesFlow", query: { product: 5 } });
    },
    submitProposal(proposal) {
      console.log("submitProposal", JSON.stringify(proposal));
      router.push({ name: "SalesFlow", query: { id: proposal._id } });
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
    return {};
  },
  async beforeMount() {
    router = this.$router;
    utils.saveLandingQueryParams(this.$route.query);
  },
  components: {
    Header: Header,
    Footer: Footer,
    BasicForm: BasicForm,
    Loading: Loading,
    CallToAction: CallToAction
  }
};
</script>

<style scoped>
h3 {
  color: #00899c;
}
.subtitle {
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 800;
  color: #00899c;
  margin-bottom: 20px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
}
.section {
  padding-top: 15px;
  padding-bottom: 25px;
}
.section-text {
  margin-top: 15px;
  text-align: justify;
}
</style>
