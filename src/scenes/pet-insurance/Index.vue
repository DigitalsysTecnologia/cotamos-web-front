<template>
    <div>
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
        <section class="container-fluid" style="margin-bottom:50px;">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <section class="col-xs-12 formulario-cotacao">
                          <div class="col-sm-12 col-xs-12 box-cotacao" v-if="loading">
                              <Loading  :messages="this.loadingMessages" :completePercent="this.loadingCompletePercent"/>
                          </div>
                        
                        <div class="col-sm-12 col-xs-12 box-cotacao" v-else>
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
        
        <Section :id="'info1'" :textColor="'#00899C'">
          <div>
            <h1>Plano de saúde para cão ou gato? Por quê?</h1>
            <div style="margin-top:40px;" class="body">
              <span class="text" style="display:block;margin-bottom:10px;">
                Os bichinhos de estimação já são parte da família, né? 
              </span>
              <span style="display:block;margin-bottom:10px;">
                Tem quem use apelidos carinhosos para falar com eles, quem chame de filho ou filha... é muito amor envolvido! E, como diz a música, quem ama cuida! 
              </span>

              <span style="display:block;margin-bottom:10px;">
                É aqui que entra a Health for Pet, desenvolvida por especialistas em planos de saúde de medicina veterinária. 
              </span>

              <span style="display:block;margin-bottom:10px;">
                Oferecemos toda a estrutura para deixar seu cachorro ou gato mais feliz e saudável. Com o acompanhamento veterinário adequado, ele pode viver muito mais aventuras ao seu lado.
              </span>
            </div>
          </div>
        </Section>

        <Section :id="'info2'" :backgroundColor="'#00899C'">
          <div>
            <h1>O que está incluso nos planos:</h1>
            <div style="margin-top:60px;" class="included-on-plans">
              <span>
                Rede referenciada : Consultas em uma rede de clínicas, hospitais, diagnósticos e profissionais veterinários especializados
              </span>
              <span>
                Cobertura a: Exames, internações, tratamentos complexos e aplicação das principais vacinas
              </span>
              <br/>
              <span>
                PetHome: Atendimento veterinário em sua residência
              </span>
              <br/>
              <span>
                PetPhone Serviço de teleatendimento com veterinários de plantão (24h por dia)
              </span>
              <br/>
              <span>
                DigiPet Prontuário eletrônico que dá fácil acesso ao histórico de vacinas, procedimentos e exames
              </span>
              <br/>
              <span>
                PetClub Clube de vantagens que oferece diversos descontos em produtos e serviços veterinários
              </span>

            </div>
          </div>
        </Section>

        <Section :id="'info3'" :textColor="'#00899C'">
          <div>
            <h1 class="text-center">Dúvidas Frequentes</h1>
            <div style="margin-top:40px;" class="body">
              
              <div class="faq">
                <span class="faq-question">
                  Quanto custa?
                </span>
                <span class="faq-answer">
                  - Ihhh... então né.. vai depender da idade do seu bichinho e também da cobertura desejada, mas se você quiser, pode fazer uma simulação e te damos o valor na hora e sem compromisso.
                </span>
              </div>

              <div class="faq">
                <span class="faq-question">
                  Qualquer animal pode ter um plano de saúde?
                </span>
                <span class="faq-answer">
                  - Atualmente, apenas cães e gatos são aceitos para plano de saúde
                </span>
              </div>

              <div class="faq">
                <span class="faq-question">
                  Meu animal idoso pode ter um plano de saúde?
                </span>
                <span class="faq-answer">
                  - Sim, animais idosos (com mais de 9 anos) também podem ter um plano de saúde, entretanto, as coberturas mais abrangentes são para os pets entre 1 e 8 anos.
                </span>
              </div>

              <div class="faq">
                <span class="faq-question">
                  Então, quando meu animal ficar idoso, perderei os benefícios?
                </span>
                <span class="faq-answer">
                  - Não não, pode se tranquilizar! O seu bichinho continua com os mesmos benefícios após completar os 9 anos, por isso é muito importante fazer o plano de saúde do seu bichinho o quanto antes.
                </span>
              </div>

            </div>
          </div>
        </Section>

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

function sleep(time) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

export default {
  name: "PetInsurance",
  methods: {
    updateProposal: async function() {
      
      const validations = [];
      validations.push(this.$validate());

      const validationResults = await Promise.all(validations);

      const hasValidationErrors = validationResults.some(function(validation) {
        return validation === false;
      });
      console.log('validationResults', JSON.stringify(validationResults))
      console.log('hasValidationErrors',hasValidationErrors)
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

    'proposal.petInsuranceData.petType': value => validator.validatePetType(value),
    'proposal.petInsuranceData.gender': value => validator.validatePetGender(value),
  },
  async beforeMount() {},
  components: {
    Footer: Footer,
    Loading: Loading,
    FormInput: FormInput,
    FormSelect: FormSelect,
    Section: Section
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-line {
  margin-left: 0px;
}
.box-cotacao {
  padding-bottom: 15px;
}
.banner-pgs {
  background-color: #000;
  padding-top: 100px;
  padding-bottom: 100px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.faq {
  margin-top: 20px;
  margin-bottom: 20px;
}
.faq-question {
  display: block;
  font-weight: bold;
}
.included-on-plans span {
  display: block;
}
</style>
