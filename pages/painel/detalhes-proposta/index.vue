<template>
  <div>
    <div v-if="!proposal">
      <Loading />
    </div>
    <div v-else>
      <section class="section">
        <h2 class="is-size-2 subtitle has-text-centered">Detalhes da Proposta</h2>
        <h2 class="is-size-2 subtitle has-text-centered">Dados Gerais</h2>
        <custom-label :label="'Id da Proposta'" :value="proposal._id" :sameLine="true" />
        <custom-label :label="'Situação da Proposta'" :value="stateName" :sameLine="true" />
        <custom-label :label="'Plano Escolhido'" :value="proposal.petInsuranceData.selectedPlan.code" :sameLine="true" v-if="proposal.product==5 && proposal.petInsuranceData && proposal.petInsuranceData.selectedPlan && proposal.petInsuranceData.selectedPlan.code" />
        <custom-label :label="'Data de Criação'" :value="formatDate(proposal.createdAt)" :sameLine="true" />
        <custom-label :label="'Data de Atualização'" :value="formatDate(proposal.updatedAt)" :sameLine="true" />
      </section>

      <section class="section">
        <h2 class="is-size-2 subtitle has-text-centered">Proponente</h2>
        <custom-label :label="'Nome'" :value="proposal.proposer.name" :sameLine="true" />
        <custom-label :label="'E-mail'" :value="proposal.proposer.email" :sameLine="true" />
        <custom-label :label="'Telefone(s)'" :value="formatPhones(proposal.proposer.phones)" :sameLine="true" />
        <custom-label :label="'Data de Nascimento'" :value="getAge(proposal.proposer.dateOfBirth)" :sameLine="true" />
        <custom-label :label="'CPF'" :value="proposal.proposer.cpf" :sameLine="true" />
        <div v-if="proposal.proposer.homeAddress">
          <custom-label :label="'Endereço Residencial'" :value="formatAddress(proposal.proposer.homeAddress)" />
        </div>
        <div v-if="proposal.proposer.dependents && proposal.proposer.dependents.length > 0" class="mt-4">
          <h2 class="form-subtitle">Dependentes:</h2>
          <div v-for="(dependent, idx) in proposal.proposer.dependents" :key="idx">
            <custom-label :label="'Nome'" :value="dependent.name" :sameLine="true" />
            <custom-label :label="'Idade'" :value="getAge(dependent.dateOfBirth)" :sameLine="true" />
          </div>
        </div>
      </section>
      <section class="section">
        <h2 class="is-size-2 subtitle has-text-centered">PET</h2>
        <custom-label :label="'Nome'" :value="proposal.petInsuranceData.name" :sameLine="true" v-if="proposal.petInsuranceData.name" />
        <custom-label :label="'Data de Nascimento'" :value="getAge(proposal.petInsuranceData.dateOfBirth)" :sameLine="true" v-if="proposal.petInsuranceData.dateOfBirth" />
        <custom-label :label="'Idade'" :value="proposal.petInsuranceData.age + ' anos'" :sameLine="true" v-else/>
        <custom-label :label="'Sexo'" :value="proposal.petInsuranceData.gender" :sameLine="true" />
        <custom-label :label="'Tipo'" :value="proposal.petInsuranceData.specie" :sameLine="true" />
      </section>
      <section class="section">
        <h2 class="is-size-2 subtitle has-text-centered">PAGAMENTO</h2>
        <custom-label :label="'Método de Pagamento'" :value="translatePaymentMethod(proposal.paymentData.method)" :sameLine="true" v-if="proposal.paymentData.method" />
        <custom-label :label="'Valor'" :value="formatAmount(proposal.paymentData.amount)" :sameLine="true" v-if="proposal.paymentData.amount" />
      </section>
    </div>
  </div>



  <!-- <div class="container-fluid">
    <h2 class="subtitle text-center">Detalhes da Proposta</h2>

    <v-tabs v-model="currentTab" color="primary" dark slider-color="white" v-if="proposal" fixed-tabs>
      <v-tab ripple>
        <span style="font-weight:bold;">Dados da Proposta</span>
      </v-tab>

      <v-tab ripple>
        <span style="font-weight:bold;">Histórico</span>
      </v-tab>

      <v-tab ripple>
        <span style="font-weight:bold;">Ofertas</span>
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>




            <custom-card title="Proponente">

            </custom-card>



          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text>

            <custom-card title="Inserir Histórico">
              <v-layout align-start align-center row fill-height wrap pa-3>
                <v-flex xs12>
                  <v-radio-group v-model="doStateTransition">
                    <v-radio :label="'Inserir histórico'" :value="false"></v-radio>
                    <v-radio :label="'Inserir histórico e mudar situação da proposta'" :value="true"></v-radio>
                  </v-radio-group>
                  <v-textarea name="input-7-1" label="Insira aqui o texto da ocorrência" v-model="eventText"></v-textarea>
                  <v-combobox label="Alterar Situação da Proposta" v-model="nextState" :items="filterStates" v-if="doStateTransition" chips deletable-chips/>
                  <v-btn color="primary" :block="true" @click="addEvent" :loading="loadingEvents" :disabled="!eventText" >Adicionar</v-btn>
                </v-flex>
              </v-layout>
            </custom-card>

            <custom-card title="Histórico">
              <v-layout row wrap pa-3>
                <v-flex sm12 v-for="(event,idx) in proposalEvents" :key="idx">
                  <EventCard :event="event" />
                </v-flex>
              </v-layout>
            </custom-card>

          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <custom-card title="Ofertas" v-if="proposal.state == 11">
          <span>Sem ofertas disponíveis para o cliente.</span>
        </custom-card>
        <Offers :proposal="proposal" v-else/>
      </v-tab-item>

    </v-tabs>
  </div> -->
</template>

<script>
import apiClient from "@/utils/apiClient";
import CustomLabel from "../components/CustomLabel";
import CustomCard from "./components/CustomCard";
import EventCard from "./components/EventCard";
import factory from "@/utils/factory";
import moment from "moment";
import translator from "@/utils/translator";
import sessionHelper from "@/utils/sessionHelper";
import Offers from "@/components/organisms/Offers";
import Loading from "@/components/molecules/Loading";

export default {
  layout: "panel",
  name: "ProposalDetails",
  data() {
    return {
      existingProposal: null,
      currentTab: 0,
      eventText: "",
      proposalEvents: [],
      states: [],
      nextState: null,
      loadingEvents: null,
      showEvent: false,
      doStateTransition: false
    };
  },
  computed: {
    loading: {
      get() {
        let isLoading = this.existingProposal != null;
        return isLoading;
      }
    },
    product: {
      get() {
        return translator.translateProduct(this.proposal.product);
      }
    },
    stateName: {
      get() {
        return translator.translateState(this.proposal.state);
      }
    },
    proposal: {
      get() {
        return this.existingProposal;
      }
    },
    filterStates: {
      get() {
        return this.states.map(state => {
          return {
            text: state.name,
            value: state.value
          };
        });
      }
    }
  },
  methods: {
    formatAmount(amount){
      return 'R$ ' + amount.toString().replace('.', ',')
    },
    formatAddress(address) {
      let result = "";

      if (address.street) {
        result += address.street;
      }
      if (address.number) {
        result += `, ${address.number}`;
      }

      if (address.neighborhood) {
        result += `, ${address.neighborhood}`;
      }

      if (address.city) {
        result += `, ${address.city}`;
      }

      if (address.state) {
        result += ` - ${address.state}`;
      }

      if (address.zipCode) {
        result += ` - CEP: ${address.zipCode}`;
      }

      return result;
    },
    formatDate(value) {
      const date = moment(value);
      return date.format("DD/MM/YYYY HH:mm:ss");
    },
    formatPhones(phones) {
      if (!phones) {
        return null;
      }

      let result = [];
      for (let idx in phones) {
        let currentPhone = phones[idx];

        if (currentPhone.fullNumber) {
          result.push(`(${currentPhone.fullNumber})`);
        } else if (currentPhone.areaCode || currentPhone.number) {
          result.push(`(${currentPhone.areaCode}) ${currentPhone.number}`);
        }
      }

      return result.join(" / ");
    },
    getAge(dateOfBirth) {
      if (!dateOfBirth || dateOfBirth == "0001-01-01T00:00:00Z") {
        return "";
      }

      dateOfBirth = moment(dateOfBirth);
      const now = moment();
      const duration = moment.duration(now.diff(dateOfBirth));
      const ageInYears = duration.asYears();

      return `${dateOfBirth.format("DD/MM/YYYY")} (${Math.floor(
        ageInYears
      )} anos)`;
    },
    async cancelEvent() {
      this.showEvent = false;
    },
    async addEvent() {
      this.loadingEvents = true;

      if (this.doStateTransition) {
        if (!this.nextState) {
          alert("Favor escolher uma nova situação para a proposta");
          this.loadingEvents = false;
          return;
        }

        this.existingProposal = await apiClient.setNextState(
          this.existingProposal,
          this.nextState.value
        );
        this.nextState = null;
      }

      const event = {
        date: new Date(),
        proposalId: this.existingProposal._id,
        text: this.eventText,
        state: this.existingProposal.state
      };

      await apiClient.addProposalEvent(event);
      this.proposalEvents = await apiClient.getEventsByProposal(
        this.existingProposal._id
      );
      this.eventText = "";
      this.loadingEvents = false;

      this.showEvent = false;
    },
    translatePaymentMethod(method) {
      return translator.translatePaymentMethod(method);
    }
  },
  components: {
    "custom-label": CustomLabel,
    "custom-card": CustomCard,
    Offers: Offers,
    Loading: Loading,
    EventCard: EventCard
  },
  async beforeMount() {
    const { id } = this.$route.query;

    const apiResults = await Promise.all([
      apiClient.getProposalById(id),
      apiClient.getEventsByProposal(id),
      apiClient.getAllStates()
    ]);

    this.existingProposal = apiResults[0];
    this.proposalEvents = apiResults[1];
    this.states = apiResults[2];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
