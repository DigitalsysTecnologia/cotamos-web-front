<template>
<div>
  <NavBar />
  <main class="container-fluid">
      <div class="row">
          <header class="col-xs-12 banner-pgs"
                  style="backgroundImage: url(../static/img/bg_pet_2.jpg)">
              <div class="container">
                  <h1>Plano de Saúde Pet</h1>
              </div>
          </header>
      </div>
  </main>

  <section class="container-fluid">
    <div class="row">
        <div class="container">
            <div class="row">
              <section class="col-xs-12 formulario-cotacao">
                  <div class="col-sm-12 col-xs-12 box-cotacao" v-if="loading">
                      <Loading :messages="this.loadingMessages" :completePercent="this.loadingCompletePercent"/>
                  </div>
                
                 <div class="col-sm-12 col-xs-12 box-cotacao" id="form-proposal" v-else>
                    <h3>Qual a idade de seu pet?</h3>
          
                    <div class="row">
                        <div class="col-sm-12 col-xs-12">
                          <FormSelect label="IDADE" 
                                      icon="fa-hourglass" 
                                      id="petAge"
                                      v-model="petAge" 
                                      :options="ageRange" />
                        </div>
                    </div>

                    <div class="card col-xs-12" v-if="availablePlans && availablePlans.length > 0" v-for="(plan) in availablePlans" :key="plan.id">

                      <div class="row">
                        <div class="col-sm-12 col-xs-12">
                          <h3>Health 4 Pet - {{plan.text}}</h3>
                        </div>
                      </div>
                          
                       <div class="row">
                        <div class="col-sm-12 col-xs-12">
                          <p style="font-weight:bold;">
                            {{plan.description}}
                          </p>
                          <p v-if="plan.details">* {{plan.details}}</p>
                        </div>
                      </div>

                      <div class="row">
                          <div class="col-sm-6 col-xs-12">
                            <h3>Valor: R$ {{plan.value}} / Mês</h3>
                            
                          </div>
                          <div class="col-sm-12 col-xs-12 text-center">
                            <router-link  class="btn btn-default btn-1-s" :to="{name: 'PetInsuranceForm', query: {planId: plan.internalId}}">Quero saber mais</router-link>
                        </div>
                      </div>
 
                    </div>

                </div>
              </section>

            </div>
        </div>
    </div>
  </section>        

  <Footer/>
</div>
</template>

<script>
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import Section from "../../components/Section";
import apiClientProvider from "../../providers/apiClientProvider";
import validator from "../../utils/validator";
import NavBar from "../../components/NavBar";

export default {
  name: "PetInsuranceSimulator",
  methods: {},
  computed: {},
  watch: {
    petPlan: function(newValue, oldValue) {
      this.selectedPlan = this.availablePlans.find(function(item) {
        return item.id == newValue;
      });
    },
    petAge: function(newValue, oldValue) {
      switch (newValue) {
        case "1":
          this.availablePlans = [
            {
              id: 1,
              internalId: 0,
              text: "Pet Basic",
              description:
                "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET BASIC cobre consultas clínicas, exames laboratoriais (exceto hormonais), vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
              value: 73.64
            },
            {
              id: 2,
              internalId: 2,
              text: "Pet Light",
              description:
                "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
              value: 108.37
            },
            {
              id: 3,
              internalId: 3,
              text: "Pet Plus",
              description:
                "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
              value: 162.56
            },
            {
              id: 4,
              internalId: 4,
              text: "Pet Total",
              description:
                "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
              value: 238.05
            },
            {
              id: 5,
              internalId: 5,
              text: "Pet Premium",
              description:
                "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada. Para baixar a tabela de reembolso.",
              value: 491.83
            }
          ];
          break;
        case "2":
          this.availablePlans = [
            {
              id: 1,
              internalId: 6,
              text: "Pet Basic",
              description:
                "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET BASIC cobre consultas clínicas, exames laboratoriais (exceto hormonais), vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
              value: 61.86
            },
            {
              id: 2,
              internalId: 7,
              text: "Pet Light",
              description:
                "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
              value: 91.93
            },
            {
              id: 3,
              internalId: 8,
              text: "Pet Plus",
              description:
                "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
              value: 136.56
            },
            {
              id: 4,
              internalId: 9,
              text: "Pet Total",
              description:
                "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
              value: 199.98
            },
            {
              id: 5,
              internalId: 10,
              text: "Pet Premium",
              description:
                "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada. Para baixar a tabela de reembolso.",
              value: 413.14
            }
          ];
          break;

        case "3":
          this.availablePlans = [
            {
              id: 4,
              internalId: 11,
              text: "Pet Senior",
              description:"Este plano inclui os serviços Pet Phone, DigiPet, Pet Club, vacinas anuais (carência de 180 dias) e a primeira visita Pet Home para colocação do microchip.",
              details: "O PET SENIOR não cobre os atendimentos veterinários, mas oferece preços especiais para consultas na rede PETZ e no Pet Home",
              value: 46
            }
          ];
          break;
        default:
          return [];
      }
    }
  },
  computed: {},
  data() {
    return {
      ageRange: [
        {
          id: 1,
          text: "Menos de 1 ano"
        },
        {
          id: 2,
          text: "Entre 1 e 8 anos"
        },
        {
          id: 3,
          text: "9 anos ou mais"
        }
      ],
      petAge: null,
      petPlan: [],
      availablePlans: [],
      selectedPlan: {},
      loading: false
    };
  },
  async beforeMount() {},
  components: {
    Footer: Footer,
    Loading: Loading,
    FormInput: FormInput,
    FormSelect: FormSelect,
    NavBar: NavBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: "Raleway", sans-serif;
}
.form-line {
  margin-left: 0px;
}
.banner-pgs {
  background-color: #000;
  padding-top: 100px;
  padding-bottom: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.section-body {
  margin-top: 30px;
}
.section-white {
  padding-top: 30px;
  background-color: #fff;
  color: rgb(0, 137, 156);
}
.section-color {
  padding-top: 30px;
  background-color: rgb(0, 137, 156);
  color: #fff;
}
.background-linear {
  background-color: rgb(0, 137, 156);
  color: #fff;
}
section {
  padding-bottom: 30px;
}
.formulario-cotacao {
  padding-bottom: 0px;
}
.faq-question {
  display: block;
  font-weight: bold;
}
.faq-answer {
  margin-bottom: 10px;
}
.card {
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #00899c;
  border-radius: 10px;
}
</style>
