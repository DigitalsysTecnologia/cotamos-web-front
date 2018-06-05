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
                            <h3>Simule aqui</h3>
                            
                            <h3>Suas Informações</h3>

                            <div class="row">
                                <div class="col-sm-12 col-xs-12">
                                    <FormInput  label="Nome"
                                                icon="fa-user" 
                                                id="proposal.proposer.name"
                                                :validationMessage="validation.firstError('proposal.proposer.name')"
                                                v-model.trim="proposal.proposer.name" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-12 col-xs-12">
                                    <FormInput  label="E-mail" 
                                                icon="fa-at" 
                                                id="proposal.proposer.email"
                                                :validationMessage="validation.firstError('proposal.proposer.email')"
                                                v-model.trim="proposal.proposer.email" />
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6 col-xs-12">
                                    <FormInput  label="CPF" 
                                                icon="fa-address-card " 
                                                id="proposal.proposer.cpf"
                                                mask="###.###.###-##"
                                                :validationMessage="validation.firstError('proposal.proposer.cpf')"
                                                v-model.trim="proposal.proposer.cpf" />
                                </div>
                                <div class="col-sm-6 col-xs-12">
                                    <FormInput  label="Data de nascimento" 
                                                icon="fa-calendar" 
                                                id="proposal.proposer.dateOfBirth"
                                                mask="##/##/####"
                                                type="text"
                                                :validationMessage="validation.firstError('proposal.proposer.dateOfBirth')"
                                                v-model="proposal.proposer.dateOfBirth" />
                                </div>
                            </div>

                            <h3>Sobre seu bichinho</h3>

                            <div class="row">
                                <div class="col-sm-6 col-xs-12">
                                    <FormInput  label="Nome"
                                                icon="fa-user" 
                                                id="proposal.petInsuranceData.name"
                                                :validationMessage="validation.firstError('proposal.petInsuranceData.name')"
                                                v-model.trim="proposal.petInsuranceData.name" />
                                </div>
                                <div class="col-sm-6 col-xs-12">
                                  <FormSelect label="Idade (em anos)" 
                                              icon="fa-hourglass " 
                                              id="proposal.petInsuranceData.age"
                                              :validationMessage="validation.firstError('proposal.petInsuranceData.age')"
                                              v-model="proposal.petInsuranceData.age" 
                                              :options="[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]" />
                                </div>
                            </div>

                            

                            <div class="row">
                              <div class="col-sm-6 col-xs-12">
                                        <FormSelect  label="Tipo" 
                                                      icon="fa-paw " 
                                                      id="proposal.petInsuranceData.petType"
                                                      :validationMessage="validation.firstError('proposal.petInsuranceData.petType')"
                                                      v-model="proposal.petInsuranceData.petType" 
                                                      :options="['Cão','Gato']" />
                              </div>
                              <div class="col-sm-6 col-xs-12">
                                        <FormSelect  label="Sexo" 
                                                      icon="fa-transgender-alt " 
                                                      id="proposal.petInsuranceData.gender"
                                                      :validationMessage="validation.firstError('proposal.petInsuranceData.gender')"
                                                      v-model="proposal.petInsuranceData.gender" 
                                                      :options="['Macho','Fêmea']" />
                              </div>
                            </div>
                        
                            <button @click="updateProposal" class="btn-envio btn btn-default pull-right" title="Enviar">
                              <img src="/static/img/envio_icone.png" alt="Enviar" class="img-responsive center-block"/>
                            </button>
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

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

export default {
  name: "PetInsuranceForm",
  methods: {
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

.faq-question {
  display: block;
  font-weight: bold;
}
.faq-answer {
  margin-bottom: 10px;
}
</style>
