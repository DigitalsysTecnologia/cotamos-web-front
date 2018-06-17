<template>
  <div>
    <NavBar />
      <main class="container-fluid">
          <div class="row">
            <div class="col-xs-12 color-background" style="height:80px;">
            </div>
          </div>

          <section class="container-fluid" style="margin-bottom:0px;">
            <div class="row">
              <div class="col-sm-12 text-center">
                  <h2 class="subtitle">O que é Plano de Saúde PET?</h2>
              </div>
              
              <div class="row section">
                <div class="col-md-offset-2 col-md-4 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center">
                  <img src="/static/img/cao_cofrinho.png" class="img-responsive center-block" />
                </div>
                <div class="col-md-4 col-md-12 col-md-offset-0 col-xs-12 col-xs-offset-0" style="padding-top:50px;padding-bottom:15px;">
                  <p>
                    É a oportunidade de passar as despesas com vacinas, consultas, internações e cirurgias do seu pet para uma seguradora.
                  </p>

                  <p>
                    Em resumo, plano de saúde pet é uma forma  inteligente para proporcionar: 
                    <ul>
                      <li><span style="font-weight:bold;">Economia</span>;</li>
                      <li><span style="font-weight:bold;">Segurança</span>;</li>
                      <li><span style="font-weight:bold;">Tranquilidade</span>.</li>
                    </ul>
                  </p>

                </div>
              </div>
            </div>
          </section>   

          <div class="row color-background text-center" style="padding-bottom:15px;padding-top:15px;">
              <div class="col-sm-12">
                <h2> Como funciona a contratação? </h2>
                <div class="row proposal-flow">
                  <div class="col-md-offset-2 col-md-8">

                    <div class="flow-step">
                      <i class="fa fa-laptop flow-icon"></i>
                      <p>
                        1. Preencha seu cadastro em nosso site
                      </p>
                    </div>

                    <!-- <div class="flow-step-next">
                      <i class="fa fa-arrow-right"></i>
                    </div> -->

                    <div class="flow-step">
                      <i class="fa fas fa-file-alt  flow-icon"></i>
                      <p>2. Escolha o plano para seu pet</p>
                    </div>

                    <!-- <div class="flow-step-next">
                      <i class="fa fa-arrow-right"></i>
                    </div> -->

                    <div class="flow-step">
                      <i class="far fa-clock flow-icon"></i>
                      <p>3. Agende o check-up do seu pet.</p>
                    </div>
                    
                  </div>
                </div>
              </div>
          </div>

          <section class="container-fluid" style="margin-bottom:0px;">
            <div class="row">
              <div class="col-sm-12 text-center">
                <h2 class="subtitle">Verifique on-line os planos disponíveis</h2>
              </div>
              <div class="col-sm-6">
                <img class="img-responsive center-block hidden-xs" src="/static/img/cao_olhando.jpg"/>
                <img class="img-responsive center-block hidden-sm hidden-md hidden-lg hidden-xl" src="/static/img/cao_olhando_pra_baixo.jpg"/>
              </div>
              <div class="col-sm-6 form-container">
                  <div v-if="loading" class="text-center">
                    <p></p>
                    <img src="/static/img/loading.gif" class="img-responsive center-block"/>
                    <p class="loadingMessage">{{this.loadingMessage}}</p>
                  </div>
                  <form class="form" v-else v-on:submit.prevent="submitProposal" novalidate>
                    <div class="col-xs-12">
                      <FormInput  label="Nome"
                                  icon="fa-user" 
                                  id="proposal.proposer.name"
                                  :validationMessage="validation.firstError('proposal.proposer.name')"
                                  v-model.trim="proposal.proposer.name" />
                    </div>
                    <div class="col-xs-12">
                      <FormInput  label="E-mail" 
                                  icon="fa-at" 
                                  id="proposal.proposer.email"
                                  :validationMessage="validation.firstError('proposal.proposer.email')"
                                  v-model.trim="proposal.proposer.email" />
                    </div>
                    <div class="col-xs-12">
                      <FormInput  label="CEP" 
                                  icon="fa-map-marker" 
                                  type="text"
                                  id="proposal.proposer.homeAddress.zipCode"
                                  :validationMessage="validation.firstError('proposal.proposer.homeAddress.zipCode')"
                                  mask="#####-###"
                                  v-model.trim="proposal.proposer.homeAddress.zipCode" />
                    </div>

                    <div class="col-xs-12">
                      <FormSelect label="Idade do pet" 
                                  icon="fa-hourglass " 
                                  id="proposal.petInsuranceData.ageRange"
                                  :validationMessage="validation.firstError('proposal.petInsuranceData.ageRange')"
                                  v-model="proposal.petInsuranceData.ageRange" 
                                  :options="ageRange" />
                    </div>

                    <div class="col-xs-12">
                      <button class="btn call-to-action pull-left" title="Enviar" type="submit">
                        Solicitar Proposta
                      </button>
                    </div>

                  </form>
              </div>
            </div>
          </section>

          <div class="row color-background text-center" style="padding-bottom:15px;padding-top:15px;">
          </div>

          <section class="container-fluid" style="margin-bottom:20px;">
            <div class="row">
              <div class="col-sm-12 text-center">
                <h2 class="subtitle">O plano de saúde pet é um produto da Cotamos?</h2>
              </div>
            </div>
            

            <div class="row section hidden-xs hidden-sm" style="padding-top:50px;">
                <div class="col-md-offset-2 col-md-4 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center" style="padding-top:15px;">
                  <img src="/static/img/pet-insurance/health_for_pet_logo.png" class="img-responsive" />
                </div>
                <div class="col-md-4 col-md-12 col-md-offset-0 col-xs-12 col-xs-offset-0" style="padding-top:15px;">
                  <p>
                    Não, a Cotamos atua como corretora, ou seja, apenas realiza as vendas do plano de saúde.
                  </p>

                  <p>
                    Atualmente, os planos de saúde oferecidos pela Cotamos são geridos pela <span style="font-weight:bold;">Health4Pet</span>, uma empresa da <span style="font-weight:bold;">Porto Seguro</span>
                  </p>
                </div>
              </div>

              <div class="row section hidden-md hidden-lg hidden-xl" style="padding-top:50px;">
                <div class="col-md-offset-2 col-md-4 col-sm-12 col-sm-offset-0 col-xs-12 col-xs-offset-0 text-center" style="padding-top:15px;">
                  <p>
                    Não, a Cotamos atua como corretora, ou seja, apenas realiza as vendas do plano de saúde.
                  </p>

                  <p>
                    Atualmente, os planos de saúde oferecidos pela Cotamos são geridos pela <span style="font-weight:bold;">Health4Pet</span>, uma empresa da <span style="font-weight:bold;">Porto Seguro</span>
                  </p>
                </div>
                <div class="col-md-4 col-md-12 col-md-offset-0 col-xs-12 col-xs-offset-0" style="padding-top:15px;">
                  <img src="/static/img/pet-insurance/health_for_pet_logo.png" class="img-responsive center-block" />
                </div>
              </div>
          </section>

      </main>
    <Footer/>
  </div>
</template>

<script>
import apiClientProvider from "../../../providers/apiClientProvider";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import Footer from "../../../components/Footer";
import validator from "../../../utils/validator";
import NavBar from "../../../components/NavBar";

export default {
  name: "PetInsuranceLandingV1",
  data() {
    return {
      existingProposal: {},
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
      proposal: {
        proposer: {
          dateOfBirth: "",
          name: "",
          email: "",
          homeAddress: {
            zipCode: "",
            state: "",
            city: ""
          },
          phones: {
            0: {
              areaCode: "",
              number: ""
            }
          },
          dependents: []
        },
        petInsuranceData: {
          name: "",
          age: "",
          petType: "",
          gender: ""
        }
      },
      loading: false,
      loadingMessage: "Enviando Proposta...",
      loadingCompletePercent: 0,
      plans: [
        {
          logo: "/static/img/pet-insurance/icon_pet_basic.png",
          name: "PET BASIC (Ambulatorial)",
          color: "rgb(241, 218, 0)",
          description:
            "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET BASIC cobre consultas clínicas (exceto consultas com especialista), exames laboratoriais (exceto hormonais), vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
          value: 61.86
        },
        {
          logo: "/static/img/pet-insurance/icon_pet_light.png",
          name: "PET LIGHT (Ambulatorial)",
          color: "rgb(141, 198, 63)",
          description:
            "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames laboratoriais, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
          value: 91.93
        },
        {
          logo: "/static/img/pet-insurance/icon_pet_plus.png",
          name: "PET PLUS (Ambulatorial + Hospitalar)",
          color: "rgb(133, 96, 168)",
          description:
            "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
          value: 136.56
        },
        {
          logo: "/static/img/pet-insurance/icon_pet_total.png",
          name: "PET TOTAL (Completo)",
          color: "rgb(247, 148, 29)",
          description:
            "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
          value: 199.98
        },
        {
          logo: "/static/img/pet-insurance/icon_pet_premium.png",
          name: "PET PREMIUM (Completo + Reembolso)",
          color: "rgb(67, 132, 193)",
          description:
            "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada.",
          value: 413.14
        }
      ],
      coverage: [
        {
          name: "Urgência e emergência (48h após chipagem)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Atendimento Ambulatorial (Carência de 30 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Vacinas¹ (Carência de 180 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Implantação do Microchip",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "PetHome – atendimento domiciliar (Carência de 30 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "PetPhone – teleatendimento com veterinários de plantão 24h",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "PetNutri",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Passaporte eletrônico",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Exames laboratoriais (Carência de 30 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Consulta com especialistas (Carência de 60 dias)",
          pet_basic: false,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Atendimento Hospitalar (Carência de 30 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Internação (Carência de 60 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Cirurgia (Carência de 60 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Exames por Imagem (Carência de 60 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Castração (Carência de 360 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Farma4Pet",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Reembolso - Livre escolha³",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: false,
          pet_premium: true
        },
        {
          name: "Limpeza de Tártaro (Carência de 360 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: false,
          pet_premium: true
        },
        {
          name: "Concierge",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: false,
          pet_premium: true
        }
      ]
    };
  },
  methods: {
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    },
    submitProposal: async function(e) {
      const validations = [];
      validations.push(this.$validate());

      const validationResults = await Promise.all(validations);

      const hasValidationErrors = validationResults.some(function(validation) {
        return validation === false;
      });

      if (hasValidationErrors) {
        return;
      }

      if (this.loading) {
        true;
      }

      try {
        this.loading = true;
        this.existingProposal = await apiClientProvider.generateProposal(5);
        const proposal = Object.assign(this.existingProposal, this.proposal);
        await apiClientProvider.updateProposal(proposal);
        await apiClientProvider.setNextState(proposal, 10);

        this.$router.push({
          name: "LandingPetInsuranceV1Result",
          params: { proposalId: proposal._id }
        });
      } finally {
        this.loading = false;
      }
    }
  },
  async beforeMount() {
    this.$localStorage.set("url_query", JSON.stringify(this.$route.query));
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.petInsuranceData.ageRange": value =>
      validator.validatePetAgeRange(value)
  },
  components: {
    Footer: Footer,
    NavBar: NavBar,
    FormInput: FormInput,
    FormSelect: FormSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  margin-top: 50px;
  margin-bottom: 50px;
}
header {
  background-color: #000;
  padding-top: 100px;
  padding-bottom: 100px;
  background-position: center;
  background-repeat: no-repeat;
}

.color-background {
  color: white;
  background: #00d886;
  background: -moz-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: -webkit-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: linear-gradient(to right, #00d886 0%, #00d6e7 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
}

header h1 {
  font-size: 50px;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(0, 0, 0, 0.8);
}
.call-to-action {
  border: 1px solid transparent;
  vertical-align: middle;
  font-size: 14px;
  letter-spacing: -0.5px;
  border-radius: 100px;
  cursor: pointer;
  padding: 5px 30px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to bottom, orange, #ff8400);
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}

.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.plan-value {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}
.logo-plan-miniatures {
  margin-top: 10px;
}
.logo-plan-miniatures img {
  display: inline-block;
}
.section {
  color: #148892;
  font-size: 24px;
  text-align: justify;
}
.flow-icon {
  font-size: 34px;
}
.flow-step-next {
  display: inline-block;
  font-size: 42px;
  margin-right: 20px;
  margin-left: 20px;
}
.flow-step {
  max-width: 150px;
  height: 150px;
  border: solid 5px #fff;
  display: inline-block;
  border-radius: 70px;
  padding: 20px;
  margin-right: 40px;
  margin-bottom: 20px;
}
.flow-step p {
  margin-top: 5px;
}
.subtitle {
  /* font-size: 50px; */
  text-transform: uppercase;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
}
.form-container {
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 00px;
  background: rgba(214, 213, 213, 0.835);
  border: solid 1px rgb(196, 196, 246);
  min-height: 300px;
  margin-bottom: 15px;
}
.loadingMessage {
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
