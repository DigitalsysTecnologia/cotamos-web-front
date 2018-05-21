<template>
    <div>
        <main class="container-fluid">
            <div class="row">
                <header class="col-xs-12 banner-pgs"
                        style="backgroundImage: url(../static/img/bg_outros.jpg)">
                    <div class="container">
                        <h1>Seguro de Vida</h1>
                        <h2>Faça sua simulação e veja na hora as melhores ofertas para você.</h2>
                    </div>
                </header>
            </div>
        </main>
        <section class="container-fluid bg-outros">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <section class="col-xs-12 formulario-cotacao">

                            <div class="col-sm-12 col-xs-12 box-cotacao" v-if="loading">
                                <Loading  :messages="this.loadingMessages" :completePercent="this.loadingCompletePercent"/>
                            </div>
                            
                            <div class="col-sm-12 col-xs-12 box-cotacao" v-else>
                                <h3>Simule aqui</h3>

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

                                <div class="row">
                                    <div class="col-sm-6 col-xs-12">
                                      <FormSelect  label="Profissão" 
                                                    icon="fa-briefcase " 
                                                    id="proposal.proposer.profession"
                                                    :validationMessage="validation.firstError('proposal.proposer.profession')"
                                                    v-model="proposal.proposer.profession" 
                                                    :options="computedProfessions" />
                                    </div>
                                    <div class="col-sm-6 col-xs-12">
                                        <FormInput  label="Renda Mensal" 
                                                    icon="fa-dollar" 
                                                    id="proposal.proposer.monthlyIncome"
                                                    type="text"
                                                    v-model="proposal.proposer.monthlyIncome" />
                                    </div>                                    
                                </div>

                                <button @click="updateProposal" class="btn-envio btn btn-default pull-right"
                                        title="Enviar">
                                    <img src="/static/img/envio_icone.png" alt="Enviar"
                                            class="img-responsive center-block"/>
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
import FormSelect from "../../components/FormSelect.vue";
import apiClientProvider from "../../providers/apiClientProvider";
import validator from "../../utils/validator";

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

export default {
  name: "HealthInsurance",
  methods: {
    updateProposal: async function() {
      try {
        
        const validations = [];
        validations.push(this.$validate());

        const validationResults = await Promise.all(validations);

        console.log('validationResults', JSON.stringify(validationResults));

        const hasValidationErrors = validationResults.some(function(
          validation
        ) {
          return validation === false;
        });

        if (hasValidationErrors) {
          console.log('hasValidationErrors', hasValidationErrors)
          return;
        }
      } catch (err) {
        return;
      }

      console.log('teste');
      this.loading = true;
      const proposal = Object.assign(this.existingProposal, this.proposal);

      this.loadingMessages = ["Enviando informações de proposta, aguarde..."];
      this.loadingCompletePercent = 1;
      await apiClientProvider.updateProposal(proposal);

      this.loadingMessages = ["Enviando proposta para nossos parceiros..."];
      this.loadingCompletePercent = 25;
      await apiClientProvider.setNextState(proposal, 10);

      this.loadingMessages = ["Aguardando resposta dos parceiros..."];
      this.loadingCompletePercent = 50;

      await sleep(5000);
      this.loadingMessages = ["Enviando para página de resultados..."];

      await sleep(5000);
      this.loadingCompletePercent = 100;
      this.$router.push({
        name: "HealthInsuranceResult",
        params: { proposalId: proposal._id }
      });
    }
  },
  computed: {
    isLoading: function() {
      return this.loading;
    },
    loadingMessageCollection: function() {
      return this.loadingMessages;
    },
    computedProfessions: function() {
      return this.professionList.map(profession => {
        return {
          id: profession.id,
          text: profession.name
        };
      });
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
        }
      },
      loading: false,
      loadingMessages: "",
      loadingCompletePercent: 0,
      professionList: []
    };
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    
    "proposal.proposer.email": value => validator.validateEmail(value),
    
    "proposal.proposer.cpf": value => validator.validateCpf(value),

    "proposal.proposer.dateOfBirth": value => validator.validateDateOfBirth(value),

    "proposal.proposer.profession": value => validator.validateProfession(value)
  },
  async beforeMount() {
    this.existingProposal = await apiClientProvider.generateProposal(3);
    this.professionList = await apiClientProvider.getAllProfessions();
  },
  components: {
    Footer: Footer,
    Loading: Loading,
    FormInput: FormInput,
    FormSelect: FormSelect
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-line {
  margin-left: 0px;
}
</style>
