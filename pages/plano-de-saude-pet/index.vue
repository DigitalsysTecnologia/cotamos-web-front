<template>
    <div  class="container-fluid">
      <section class="container-fluid section">
        <div class="row">
          <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
            <v-card :tile="true">
              <v-card-title primary-title>
                <v-layout align-center justify-center row fill-height>
                  <h2 class="subtitle">Faça uma cotação On-line </h2>
                </v-layout>
              </v-card-title>
            <BasicForm v-on:submitProposal="submitProposal"/>
            </v-card>
          </div>
        </div>
      </section>        

      <section class="descricao">
        <div class="box-2">
            <div class="grid-image">
                  <div class="img hole-1"></div>
                  <div class="img hole-2"></div>
                  <div class="img hole-3"></div>
           </div>
            <div class="texto">
                <h2>POR QUE EU DEVERIA CONTRATAR <br> UM PLANO DE SAÚDE PET?</h2>
                <div class="line-2"></div>
                <p> Assim como os humanos, os pets também tem necessidades de cuidados com a saúde.
                    Com os planos de saúde, você tem acesso a uma série de clínicas para tratamento veterinário.
                </p>
            </div>
            <div class="line">
            </div>
        </div>
    </section>

      <section class="planos">
        <div class="cards">
          <div class="card-pet MarRight">
                <img src="/img/pet-dog-filhotes.png" alt="Filhotes">
                <h3>Para os Filhotes</h3>
                <div class="text">
                <p>Quando um filhote canino ou felino passa por fases delicadas, 
                  ele pode ficar mais predisposto à instabilidades gastrointestinais 
                  e algumas alergias, gerando mais idas ao veterinário. 
                  A descoberta do mundo e de sua nova casa também podem expor 
                  seu pet a riscos bastante comuns. Esses incidentes ocorrem em 
                  1 a cada 3 pets por ano.</p>
                </div>
            <CallToAction v-on:click="GoToForm">
              &nbsp; PLANOS DISPONÍVEIS
            </CallToAction>
          </div>
        <div class="card-pet MarRight">
                <img src="img/pet-dog-adultos.png" alt="Adultos">
                <h3>Para os Adultos</h3>
                <div class="text">
                <p>Ainda que o seu pet se mostre saudável, nunca se dê por satisfeito.
                   É importante que você o observe periodicamente e com atenção e, 
                   diante de qualquer indício de que algo não anda bem, leve-o de imediato 
                   ao veterinário. Um pet adulto tem que ser revacinado a cada ano, 
                   durante toda sua vida. E a desparasitação deve ser periódica, 
                   já que ele se expõe constantemente ao risco de contrair parasitas. 
                   Por isso, um plano de saúde é muito importante nessa fase da vida. </p>
                </div>
            <CallToAction v-on:click="GoToForm">
              &nbsp; PLANOS DISPONÍVEIS
            </CallToAction>
          </div>
        <div class="card-pet">
                <img src="img/pet-dog-seniores.png" alt="Seniores">
                <h3>Para os Seniores</h3>
                <div class="text">
                <p>O tempo de vida dos pets varia muito dependendo da raça, do porte
                   do animal e dos cuidados que ele recebe durante a vida. Porém, a 
                   expectativa é que os cães vivam em média 15 anos, enquanto os gatos
                    podem chegar a 20. Mas o importante mesmo é que sempre se tenha atenção 
                    com a saúde e o bem-estar dos bichinhos, principalmente quando eles estiverem 
                    idosos e precisando ainda mais do nosso amor e cuidado.</p>
                </div>
            <CallToAction v-on:click="GoToForm">
              &nbsp; PLANOS DISPONÍVEIS
            </CallToAction>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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

      if(queryParams) {
        partnerId = queryParams.partnerId
      }
      router.push({ path: "/fluxo-vendas", query: { product: 5, partnerId: partnerId } });
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
      title: 'Cotamos.com - Plano de Saúde PET'
    }
  },
  data() {
    return {};
  },
  async beforeMount() {
    router = this.$router;
    queryParams = this.$route.query
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

.theme--light.v-card {
  border-radius: 20px;
  border: 1px solid rgba(89,89,89,0.20);
  -webkit-box-shadow: 0px 0px 30px 2px rgba(89,89,89,0.2);
  -moz-box-shadow: 0px 0px 30px 2px rgba(89,89,89,0.2);
  box-shadow: 0px 0px 30px 2px rgba(89,89,89,0.2);
}

.subtitle {
  font-family: 'Roboto', sans-serif;
  letter-spacing: .2px;
  font-size: 40px;
  text-transform: capitalize;
  font-weight: 400;
  color: #00456a;
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

.form-container {
  border: 2px solid rgb(5, 62, 66);
  border-radius: 5px; 
  background-color: white; 
}

/* Pet e Flor*/

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
.descricao .box-2 .grid-image {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 300px;
    height: 300px;
}
.descricao .box-2 .grid-image .img{
    background-image: url("/img/pet-dog-flor.png");
    background-repeat: no-repeat;
    /* border: 1px solid #ccc; */
}
.descricao .box-2 .grid-image .hole-1{
    background-position: 40% 30%;
    border-radius: 15px;
    width:45%;
    height: 50%;
}
.descricao .box-2 .grid-image .hole-2{
    background-position: 70% 38%;
    border-radius: 15px;
    width: 45%;
    height: 50%;
}
.descricao .box-2 .grid-image .hole-3{
    background-position:  55% 99%;
    border-radius: 15px;
    width: 95%;
    height: 40%;
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
    .descricao .box-2 .grid-image{
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
/* Planos */
.planos {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 80px 50px;
}
.planos .cards {
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px;
    flex-basis: 50%;
}
.planos .cards .card-pet {
  display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 8px 0 #dadada86;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
}
.planos .cards .MarRight {
  margin-right: 5px;
}
.planos .cards img {
    padding: 15px;
}
.planos .cards h3 {
    text-align: center;
    padding: 5px;
}
.planos .cards p{
    font-size: 1rem;
    text-align: justify;
    color: #b3b3b3;
    padding: 30px;
    height: 330px;
}
@media (min-width: 850px) {
  .planos .cards .card-pet:hover {
        box-shadow: 0px 4px 8px 0 #a0a0a086;
        margin-right: 25px;
        margin-left: 25px;
        -webkit-transform: scale(1.1);
        -ms-transform: scale(1.1);
        transform: scale(1.1);
        transition-duration: 0.3s;
    }
}
@media (max-width: 850px) {
    .planos .cards {
        flex-direction: column;
    }
    .planos .cards .MarRight{
      margin-right: 0;
      margin-bottom: 30px;
    }
    .planos .cards .card-pet{
        margin-right: 0;
        margin-bottom: 50px;
        border-radius: 15px;
    }
}
</style>getLandingQueryParams
