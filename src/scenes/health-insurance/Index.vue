<template>
    <div>
        <main class="container-fluid">
            <div class="row">
                <header class="col-xs-12 banner-pgs"
                        style="backgroundImage: url(../static/img/bg_outros.jpg)">
                    <div class="container">
                        <h1>Plano de saúde</h1>
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
                                    <div class="col-sm-12 col-xs-12">
                                        <FormInput  label="CEP" 
                                                    icon="fa-map-marker" 
                                                    type="text"
                                                    id="proposal.proposer.homeAddress.zipCode"
                                                    :validationMessage="validation.firstError('proposal.proposer.homeAddress.zipCode')"
                                                    mask="#####-###"
                                                    v-model.trim="proposal.proposer.homeAddress.zipCode" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-3 col-xs-12">
                                      <FormSelect  label="UF" 
                                                    icon="fa-map-marker" 
                                                    id="proposal.proposer.homeAddress.state"
                                                    :validationMessage="validation.firstError('proposal.proposer.homeAddress.state')"
                                                    v-model="proposal.proposer.homeAddress.state" 
                                                    :options="['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']" />
                                    </div>
                                    <div class="col-sm-9 col-xs-12">
                                        <FormInput  label="Cidade" 
                                                    icon="fa-map-marker" 
                                                    id="proposal.proposer.homeAddress.city"
                                                    :validationMessage="validation.firstError('proposal.proposer.homeAddress.city')"
                                                    v-model.trim.lazy="proposal.proposer.homeAddress.city" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
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
                                    <div class="col-md-2 col-sm-3 col-xs-12">
                                        <FormInput  label="DDD" 
                                                    icon="fa-phone" 
                                                    type="text"
                                                    id="proposal.proposer.phones.0.areaCode"
                                                    mask="##"
                                                    :validationMessage="validation.firstError('proposal.proposer.phones.0.areaCode')"
                                                    v-model.trim="proposal.proposer.phones[0].areaCode" />
                                    </div>

                                    <div class="offset-md-1 offset-sm-1 col-md-10 col-sm-9 col-xs-12">
                                        <FormInput label="Celular ou Telefone" 
                                                   icon="fa-phone" 
                                                   id="proposal.proposer.phones.0.number"
                                                   maxLength="15"
                                                   :mask="getPhoneMask(proposal.proposer.phones[0].number)"
                                                   type="text"
                                                   :validationMessage="validation.firstError('proposal.proposer.phones.0.number')"
                                                   v-model.trim="proposal.proposer.phones[0].number" />
                                    </div>
                                </div>

                                <p class="dependente-p" style="display:block">Caso necessário inclua dependentes abaixo</p>

                                <div v-for="(dependent, index) in proposal.proposer.dependents" :key="`dependent-${index}`" style="margin-left:  0px; margin-bottom:25px;">
                                   <Dependent :value="dependent" ref="childs" @onRemove="removeDependent(index)"/>
                                </div>

                                <div class="input_fields_wrap">
                                    <button class="add_field_button btn btn-default" v-on:click="addDependent">
                                        <i class="fa fa-plus" aria-hidden="true"/> Adicionar dependentes
                                    </button>
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
import FormSelect from "../../components/FormSelect.vue";
import Dependent from "./components/Dependent";
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
    getPhoneMask: function(phone) {
      let phoneNumber = null;
      if (phone) {
        phoneNumber = phone.replace(/\D/g, "");
      } else {
        phoneNumber = "";
      }

      if (phoneNumber.length <= 8) {
        return "####-####";
      } else {
        return "#####-####";
      }
    },
    addDependent: function() {
      this.proposal.proposer.dependents.push({
        name: "",
        dateOfBirth: ""
      });
    },
    removeDependent: function(index) {
      this.proposal.proposer.dependents.splice(index, 1);
    },
    updateProposal: async function() {
      try {
        const validations = [];
        validations.push(this.$validate());

        // Se tiver componentes-filho (como dependentes), faz a validação também nos componentes-filho
        if (this.$refs.childs) {
          this.$refs.childs.forEach(child => {
            validations.push(child.validate());
          });
        }

        const validationResults = await Promise.all(validations);

        const hasValidationErrors = validationResults.some(function(
          validation
        ) {
          return validation === false;
        });

        if (hasValidationErrors) {
          return;
        }
      } catch (err) {
        return;
      }

      this.loading = true;
      const proposal = Object.assign(this.existingProposal, this.proposal);
      await apiClientProvider.updateProposal(proposal);
      await apiClientProvider.setNextState(proposal, 10);

      this.$router.push({
        name: "ProposalResult",
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
      loadingCompletePercent: 0
    };
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.proposer.homeAddress.state": value =>
      validator.validateHomeAddressState(value),
    "proposal.proposer.homeAddress.city": value =>
      validator.validateHomeAddressCity(value),
    "proposal.proposer.dateOfBirth": value =>
      validator.validateDateOfBirth(value),
    "proposal.proposer.phones.0.areaCode": value =>
      validator.validatePhoneAreaCode(value),
    "proposal.proposer.phones.0.number": value =>
      validator.validatePhoneNumber(value)
  },
  async beforeMount() {
    this.existingProposal = await apiClientProvider.generateProposal(2);
  },
  async mounted() {},
  components: {
    Footer: Footer,
    Loading: Loading,
    FormInput: FormInput,
    Dependent: Dependent,
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
