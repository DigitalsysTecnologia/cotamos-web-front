<template>
    <div v-if="!redirect">
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

        <section class="container-fluid section-white">
          <div class="row section-header">
            <div class="col-sm-12 text-center">
                <h1>Plano de saúde para cão ou gato? Por quê?</h1>
            </div>
          </div>
          
          <div class="row section-body">
            <div class="col-sm-offset-2 col-sm-8 col-xs-12">
              <p>
                Os bichinhos de estimação já são parte da família, né? 
              </p>
              <p>
                Tem quem use apelidos carinhosos para falar com eles, quem chame de filho ou filha... é muito amor envolvido! E, como diz a música, quem ama cuida! 
              </p>
              <p>
                É aqui que entra a Health for Pet, desenvolvida por especialistas em planos de saúde de medicina veterinária. 
              </p>
              <p style="display:block;margin-bottom:10px;">
                Oferecemos toda a estrutura para deixar seu cachorro ou gato mais feliz e saudável. Com o acompanhamento veterinário adequado, ele pode viver muito mais aventuras ao seu lado.
              </p>
            </div>
          </div>

          <div class="row center" style="margin-top:20px;">
            <div class="col-sm-12 center text-center">
              <a href="#" v-on:click="openForm" class="btn btn-default btn-1-s" title="Quero um seguro">Quero fazer uma simulação </a>
            </div>
          </div>

        </section>

        <section class="container-fluid section-color">
          <div class="row section-header">
            <div class="col-sm-12 text-center">
                <h1>Dúvidas? Veja nosso vídeo explicativo</h1>
            </div>
          </div>
          
          <div class="row section-body">
            <div class="col-sm-offset-2 col-sm-8 col-xs-12">
              <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/rfdywIq45gU?ecver=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
              </div>
            </div>
          </div>

          <div class="row center" style="margin-top:20px;">
            <div class="col-sm-12 center text-center">
              <a href="#" v-on:click="openForm" class="btn btn-default btn-1-s" title="Quero um seguro">Quero fazer uma simulação </a>
            </div>
          </div>

        </section>

        <section class="container-fluid section-white">
          <div class="row section-header">
            <div class="col-sm-12 text-center">
                <h1>O que está incluso nos planos:</h1>
            </div>
          </div>

          <div class="row section-body">
            <div class="col-sm-offset-2 col-sm-8 col-xs-12">
              <p>
                <span style="display:block;font-weight:bold;">
                  Rede referenciada : 
                </span>
                <span  style="display:block;">
                  Consultas em uma rede de clínicas, hospitais, diagnósticos e profissionais veterinários especializados
                </span>
              </p>
              
              <p>
                <span style="display:block;font-weight:bold;">
                  Cobertura a: 
                </span>
                <span  style="display:block;">
                  Exames, internações, tratamentos complexos e aplicação das principais vacinas
                </span>
              </p>

              <p>
                <span style="display:block;font-weight:bold;">
                  PetHome: 
                </span>
                <span  style="display:block;">
                  Atendimento veterinário em sua residência
                </span>
              </p>
                            
              <p>
                <span style="display:block;font-weight:bold;">
                  PetPhone: 
                </span>
                <span  style="display:block;">
                  Serviço de teleatendimento com veterinários de plantão (24h por dia)
                </span>
              </p>

              <p>
                <span style="display:block;font-weight:bold;">
                  DigiPet: 
                </span>
                <span  style="display:block;">
                  Prontuário eletrônico que dá fácil acesso ao histórico de vacinas, procedimentos e exames
                </span>
              </p>
              
              <p>
                <span style="display:block;font-weight:bold;">
                  PetClub: 
                </span>
                <span  style="display:block;">
                  Clube de vantagens que oferece diversos descontos em produtos e serviços veterinários
                </span>
              </p>

            </div>
          </div>

          <div class="row center" style="margin-top:20px;">
            <div class="col-sm-12 center text-center">
              <a href="#" v-on:click="openForm" class="btn btn-default btn-1-s" title="Quero um seguro">Quero fazer uma simulação </a>
            </div>
          </div>

        </section>

        <section class="container-fluid section-color">
          <div class="row section-header">
            <div class="col-sm-12 text-center">
                <h1>Dúvidas Frequentes</h1>
            </div>
          </div>
          
          <div class="row">
            <div class="col-sm-offset-2 col-sm-8 col-xs-12">
             <p class="faq">
                <span class="faq-question">
                  Quanto custa?
                </span>
                <span class="faq-answer">
                  - Ihhh... então né.. vai depender da idade do seu bichinho e também da cobertura desejada, mas se você quiser, pode fazer uma simulação e te damos o valor na hora e sem compromisso.
                </span>
              </p>

              <p class="faq">
                <span class="faq-question">
                  Qualquer animal pode ter um plano de saúde?
                </span>
                <span class="faq-answer">
                  - Atualmente, apenas cães e gatos são aceitos para plano de saúde
                </span>
              </p>

              <p class="faq">
                <span class="faq-question">
                  Meu animal idoso pode ter um plano de saúde?
                </span>
                <span class="faq-answer">
                  - Sim, animais idosos (com mais de 9 anos) também podem ter um plano de saúde, entretanto, as coberturas mais abrangentes são para os pets entre 1 e 8 anos.
                </span>
              </p>

              <p class="faq">
                <span class="faq-question">
                  Então, quando meu animal ficar idoso, perderei os benefícios?
                </span>
                <span class="faq-answer">
                  - Não não, pode se tranquilizar! O seu bichinho continua com os mesmos benefícios após completar os 9 anos, por isso é muito importante fazer o plano de saúde do seu bichinho o quanto antes.
                </span>
              </p>

            </div>
          </div>

          <div class="row center" style="margin-top:20px;">
            <div class="col-sm-12 center text-center">
              <a href="#" v-on:click="openForm" class="btn btn-default btn-1-s" title="Quero um seguro">Quero fazer uma simulação </a>
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

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

export default {
  name: "PetInsuranceIndex",
  methods: {
    openForm: function(event) {
      event.preventDefault();
      //window.location = "http://bit.ly/cotamos-health-for-pet";
      this.$router.push({ name: "PetInsuranceSimulator" });
    },
    updateProposal: async function() {
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
          name: "ProposalResult",
          params: { proposalId: proposal._id }
        });
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    isLoading: function() {
      return this.loading;
    }
  },
  data() {
    return {
      existingProposal: {},
      redirect: false,
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
      loadingMessages: "",
      loadingCompletePercent: 0
    };
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
    "proposal.proposer.cpf": value => validator.validateCpf(value),
    "proposal.proposer.dateOfBirth": value =>
      validator.validateDateOfBirth(value),
    "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    "proposal.petInsuranceData.age": value => validator.validatePetAge(value),
    "proposal.petInsuranceData.petType": value =>
      validator.validatePetType(value),
    "proposal.petInsuranceData.gender": value =>
      validator.validatePetGender(value)
  },
  async beforeMount() {
    this.$localStorage.set('url_query',  JSON.stringify(this.$route.query));
  },
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

.faq-question {
  display: block;
  font-weight: bold;
}
.faq-answer {
  margin-bottom: 10px;
}
</style>
