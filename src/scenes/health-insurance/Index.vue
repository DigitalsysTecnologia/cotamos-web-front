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
                            <div class="col-sm-12 col-xs-12 box-cotacao">
                                <h3>Simule aqui</h3>

                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-user" aria-hidden="true"/>
                                        </div>
                                        <input type="text"
                                                class="form-control"
                                                id="proposal.proposer.name"
                                                v-model.trim="proposal.proposer.name"
                                                name="proposal.proposer.name"
                                                placeholder="Nome"/>
                                    </div>
                                    <div class="message">{{ validation.firstError('proposal.proposer.name') }}</div>
                                </div>

                                                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-at" aria-hidden="true"/>
                                        </div>
                                        <input type="email" 
                                               class="form-control"
                                               v-model.trim="proposal.proposer.email"
                                               id="proposal.proposer.email" 
                                               name="proposal.proposer.email"
                                               placeholder="E-mail" 
                                               required/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-map-marker" aria-hidden="true"/>
                                        </div>
                                        <input type="text"
                                                class="form-control"
                                                id="proposal.proposer.homeAddress.zipCode"
                                                v-model.trim="proposal.proposer.homeAddress.zipCode"
                                                name="proposal.proposer.homeAddress.zipCode"
                                                v-mask="'#####-###'"
                                                placeholder="CEP" required/>
                                    </div>
                                    <div class="message">{{ validation.firstError('proposal.proposer.homeAddress.zipCode') }}</div>
                                </div>

                                <div class="col-sm-3 col-xs-12 pd-r">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-map-marker" aria-hidden="true"/>
                                            </div>
                                            <input type="text"
                                                    maxLength="2"
                                                    class="form-control"
                                                    v-model.trim.lazy="proposal.proposer.homeAddress.state"
                                                    id="proposal.proposer.homeAddress.state"
                                                    name="proposal.proposer.homeAddress.state"
                                                    placeholder="UF"
                                                    required/>
                                        </div>
                                        <div class="message">{{ validation.firstError('proposal.proposer.homeAddress.state') }}</div>
                                    </div>
                                </div>

                                <div class="col-sm-9 col-xs-12 pd-l">
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-addon">
                                                <i class="fa fa-map-marker" aria-hidden="true"/>
                                            </div>
                                            <input type="text"
                                                    class="form-control"
                                                    v-model.trim.lazy="proposal.proposer.homeAddress.city"
                                                    id="proposal.proposer.homeAddress.city"
                                                    name="proposal.proposer.homeAddress.city"
                                                    placeholder="Cidade"
                                                    required/>
                                        </div>
                                        <div class="message">{{ validation.firstError('proposal.proposer.homeAddress.city') }}</div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-cogs" aria-hidden="true"/>
                                        </div>
                                        <input type="text" class="form-control" 
                                                id=""
                                                name=""
                                                v-model.trim="proposal.proposer.profession.name"
                                                placeholder="Profissão"/>
                                    </div>
                                    <div class="message">{{ validation.firstError('proposal.proposer.profession.name') }}</div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-calendar" aria-hidden="true"/>
                                        </div>
                                        <input type="text"
                                                class="form-control date"
                                                id="proposal.proposer.dateOfBirth"
                                                name="proposal.proposer.dateOfBirth"
                                                v-model.trim="proposal.proposer.dateOfBirth"
                                                v-mask="'##/##/####'"
                                                placeholder="Data de nascimento"
                                                required/>
                                    </div>
                                    <div class="message">{{ validation.firstError('proposal.proposer.dateOfBirth') }}</div>
                                </div>

                                <div class="form-group">
                                    <div class="input-group">
                                        <div class="input-group-addon">
                                            <i class="fa fa-phone" aria-hidden="true"/></div>
                                        <input type="text"
                                                class="form-control sp_celphones"
                                                maxLength="15"
                                                id="proposal.proposer.phones[0].number"
                                                name="proposal.proposer.phones[0].number"
                                                v-model.trim.lazy="proposal.proposer.phones[0].number"
                                                v-mask="'(##) #####-####'"
                                                placeholder="Celular ou Telefone (Com DDD)"/>

                                    </div>
                                    <div class="message">{{ validation.firstError('proposal.proposer.phones[0].number') }}</div>
                                </div>

                                <p class="dependente-p">Caso necessário inclua dependentes abaixo</p>

                                <div v-for="(dependent, index) in proposal.proposer.dependents" :key="`dependent-${index}`" class="row" style="margin-left:  0px; margin-bottom:25px;">
                                    <div class="col-sm-4 col-xs-12 pd-r">
                                        <div class="form-group" style="margin-bottom: 0px;">
                                            <div class="input-group">
                                                <div class="input-group-addon">
                                                    <i class="fa fa-user" aria-hidden="true"/>
                                                </div>
                                                <input type="text"
                                                        class="form-control"
                                                        id="dependent.name"
                                                        v-model="dependent.name"
                                                        name="dependent.name"
                                                        placeholder="Nome"
                                                        required/>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-sm-4 col-xs-12 pd-l">
                                        <div class="form-group" style="margin-bottom: 0px;">
                                            <div class="input-group">
                                                <div class="input-group-addon">
                                                    <i class="fa fa-calendar" aria-hidden="true"/>
                                                </div>
                                                <input type="text"
                                                        class="form-control date"
                                                        id="dependent.dateOfBirth"
                                                        name="dependent.dateOfBirth"
                                                        v-model="dependent.dateOfBirth"
                                                        v-mask="'##/##/####'"
                                                        placeholder="Data de nascimento"
                                                        required/>
                                            </div>
                                        </div>
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

                                <button v-on:click="updateProposal" class="btn-envio btn btn-default pull-right"
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
import Footer from "../../components/Footer";
import apiClientProvider from "../../providers/apiClientProvider";
import SimpleVueValidation from "simple-vue-validator";
import moment from "moment";

const Validator = SimpleVueValidation.Validator;
export default {
  name: "HealthInsurance",
  methods: {
    addDependent: function() {
      this.proposal.proposer.dependents.push({});
    },
    removeDependent: function(index) {
        this.proposal.proposer.dependents.splice(index, 1);
    },
    updateProposal: async function() {
        await apiClientProvider.updateProposal(this.proposal)
        this.$router.push('/plano-de-saude/opcoes')
    }
  },
  data() {
    return {
      proposal: {
        proposer: {
          name: "",
          homeAddress: {},
          phones: [{}],
          profession: {},
          dependents: []
        }
      }
    };
  },
  validators: {
    'proposal.proposer.name': function(value) {
      return Validator.value(value).required(
        "Por favor, nos informe o seu nome."
      );
    },
    'proposal.proposer.homeAddress.zipCode': function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe o seu CEP")
        .custom(function() {});
    },
    'proposal.proposer.homeAddress.state': function(value) {
      return Validator.value(value).required(
        "Por favor, nos informe o seu estado."
      );
    },
    'proposal.proposer.homeAddress.city': function(value) {
      return Validator.value(value).required(
        "Por favor, nos informe a sua cidade."
      );
    },
    'proposal.proposer.dateOfBirth': function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe a sua data de nascimento.")
        .custom(function() {
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
    }
  },
  beforeMount() {
    console.log(`beforeMount`);
  },
  async mounted() {
    const existingProposal = await apiClientProvider.generateProposal(2);
    this.proposal._id = existingProposal._id
  },
  components: {
    Footer: Footer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
