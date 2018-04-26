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
                                                    id="proposal.proposer.homeAddress.zipCode"
                                                    :validationMessage="validation.firstError('proposal.proposer.homeAddress.zipCode')"
                                                    mask="#####-###"
                                                    v-model.trim="proposal.proposer.homeAddress.zipCode" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-3 col-xs-12">
                                        <FormInput  label="UF" 
                                                    icon="fa-map-marker" 
                                                    id="proposal.proposer.homeAddress.state"
                                                    maxLength="2"
                                                    :validationMessage="validation.firstError('proposal.proposer.homeAddress.state')"
                                                    v-model.trim="proposal.proposer.homeAddress.state" />
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
                                        <FormInput  label="Profissão" 
                                                    icon="fa-cogs" 
                                                    type="text"
                                                    id="proposal.proposer.profession.name"
                                                    :validationMessage="validation.firstError('proposal.proposer.profession.name')"
                                                    v-model="proposal.proposer.profession.name" />
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-md-12">
                                        <FormInput  label="Data de nascimento" 
                                                    icon="fa-calendar" 
                                                    type="text"
                                                    id="proposal.proposer.dateOfBirth"
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
                                                    maxLength="2"
                                                    :validationMessage="validation.firstError('proposal.proposer.phones.0.areaCode')"
                                                    v-model.trim="proposal.proposer.phones[0].areaCode" />
                                    </div>

                                    <div class="offset-md-1 offset-sm-1 col-md-10 col-sm-9 col-xs-12">
                                        <FormInput label="Celular ou Telefone" 
                                                   icon="fa-phone" 
                                                   type="text"
                                                   id="proposal.proposer.phones.0.number"
                                                   maxLength="15"
                                                   mask="#####-####"
                                                   :validationMessage="validation.firstError('proposal.proposer.phones.0.number')"
                                                   v-model.trim="proposal.proposer.phones[0].number" />
                                    </div>
                                </div>

                                <p class="dependente-p" style="display:block">Caso necessário inclua dependentes abaixo</p>

                                <div v-for="(dependent, index) in proposal.proposer.dependents" :key="`dependent-${index}`" class="row" style="margin-left:  0px; margin-bottom:25px;">
                                    <div class="col-sm-4 col-xs-12 pd-r">
                                        <FormInput  label="Nome"
                                                    icon="fa-user" 
                                                    id="dependent.name"
                                                    v-model="dependent.name" />
                                    </div>

                                    <div class="col-sm-4 col-xs-12 pd-l">
                                        <FormInput  label="Data de nascimento"
                                                    icon="fa-calendar" 
                                                    id="dependent.dateOfBirth"
                                                    v-model="dependent.dateOfBirth" 
                                                    v-mask="'##/##/####'"/>
                                    </div>

                                    <div class="col-sm-4 col-xs-12 pd-l">
                                        <button v-on:click="removeDependent(index)" class="btn btn-danger btn-block" >Remover</button>
                                    </div>
                                </div>

                                <div class="input_fields_wrap">
                                    <button class="add_field_button btn btn-default" v-on:click="addDependent">
                                        <i class="fa fa-plus" aria-hidden="true"/> Adicionar dependentes
                                    </button>
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
import apiClientProvider from "../../providers/apiClientProvider";
import SimpleVueValidation from "simple-vue-validator";
import moment from "moment";

const Validator = SimpleVueValidation.Validator;

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
      this.proposal.proposer.dependents.push({});
    },
    removeDependent: function(index) {
      this.proposal.proposer.dependents.splice(index, 1);
    },
    updateProposal: async function() {
      try {
        console.log("validando..");
        const success = await this.$validate();
        console.log("validado.");

        console.log("Validação realizada com sucesso?", success);
        if (!success) {
          return;
        }
      } catch (err) {
        console.error(err);
        return;
      }

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
      this.loadingMessages = ["Enviando para páginaproposal de resultados..."];

      await sleep(5000);
      this.loadingCompletePercent = 100;
      this.$router.push("/plano-de-saude/opcoes");
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
          profession: {
            name: ""
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
    "proposal.proposer.name": function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe o seu nome.")
        .minLength(5, "Por favor, nos informe o seu nome.");
    },
    "proposal.proposer.email": function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe o seu e-mail.")
        .email("E-mail inválido");
    },
    "proposal.proposer.profession.name": function(value) {
      return Validator.value(value).required(
        "Por favor, nos informe sua profissão"
      );
    },
    "proposal.proposer.homeAddress.zipCode": function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe o seu CEP")
        .custom(function() {
          if (!value) {
            return null;
          }
          const num = value.replace(/\D/g, "");
          if (num.length < 8) {
            return "CEP inválido.";
          }
        });
    },
    "proposal.proposer.homeAddress.state": function(value) {
      console.log("proposal.proposer.homeAddress.state");
      return Validator.value(value)
        .required("Por favor, nos informe o seu estado.")
        .minLength(2, "Inválido");
    },
    "proposal.proposer.homeAddress.city": function(value) {
      console.log("proposal.proposer.homeAddress.city");
      return Validator.value(value).required(
        "Por favor, nos informe a sua cidade."
      );
    },
    "proposal.proposer.dateOfBirth": function(value) {
      console.log("proposal.proposer.dateOfBirth");
      console.log("proposal.proposer.dateOfBirth", "value", value);
      return Validator.value(value)
        .required("Por favor, nos informe a sua data de nascimento.")
        .custom(function() {
          console.log("checking custom value dateOfBirth");
          if (value == null) {
            return null;
          }

          if (value.length !== 10) {
            return "Data inválida";
          }

          if (!moment(value, "DD/MM/YYYY").isValid()) {
            return "Data inválida";
          }
          return null;
        });
    },
    "proposal.proposer.phones.0.areaCode": function(value) {
      console.log("proposal.proposer.phones.0.areaCode");
      return Validator.value(value)
        .required("Por favor, nos informe seu DDD.")
        .minLength(2, "Favor Informar o DDD com 2 dígitos");
    },
    "proposal.proposer.phones.0.number": function(value) {
      console.log("proposal.proposer.phones.0.number");
      const val = value.replace(/\D/g, "");
      return Validator.value(val)
        .required("Por favor, nos informe seu telefone.")
        .minLength(8, "Favor Informar o telefone completo");
    }
  },
  async beforeMount() {
    this.existingProposal = await apiClientProvider.generateProposal(2);
    console.log(`beforeMount`);
  },
  async mounted() {},
  components: {
    Footer: Footer,
    Loading: Loading,
    FormInput: FormInput
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-line {
  margin-left: 0px;
}
</style>
