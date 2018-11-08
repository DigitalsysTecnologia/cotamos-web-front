<template>
  <div class="container-fluid">
    <h2 class="subtitle text-center">Detalhes da Proposta</h2>
    
    <v-tabs v-model="currentTab" color="primary" dark slider-color="white" v-if="proposal" fixed-tabs>
      <v-tab ripple>
        <span style="font-weight:bold;">Dados da Proposta</span>
      </v-tab>

      <v-tab ripple>
        <span style="font-weight:bold;">Ofertas</span>
      </v-tab>
  
      <v-tab-item>
        <v-card flat>
          <v-card-text>
  
            <custom-card title="Dados Gerais">
              <custom-label :label="'Id da Proposta'" :value="proposal._id" :sameLine="true" />
              <custom-label :label="'Situação da Proposta'" :value="stateName" :sameLine="true" />
              <custom-label :label="'Plano Escolhido'" :value="proposal.petInsuranceData.selectedPlan.code" :sameLine="true" v-if="proposal.product==5 && proposal.petInsuranceData && proposal.petInsuranceData.selectedPlan && proposal.petInsuranceData.selectedPlan.code"
              />
              <custom-label :label="'Data de Criação'" :value="formatDate(proposal.createdAt)" :sameLine="true" />
              <custom-label :label="'Data de Atualização'" :value="formatDate(proposal.updatedAt)" :sameLine="true" />
            </custom-card>
  
  
            <custom-card title="Proponente">
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
            </custom-card>
  
            <custom-card title="PET">
              <custom-label :label="'Nome'" :value="proposal.petInsuranceData.name" :sameLine="true" v-if="proposal.petInsuranceData.name" />
              <custom-label :label="'Data de Nascimento'" :value="getAge(proposal.petInsuranceData.dateOfBirth)" :sameLine="true" v-if="proposal.petInsuranceData.dateOfBirth" />
              <custom-label :label="'Idade'" :value="proposal.petInsuranceData.age + ' anos'" :sameLine="true" v-else/>
              <custom-label :label="'Sexo'" :value="proposal.petInsuranceData.gender" :sameLine="true" />
              <custom-label :label="'Tipo'" :value="proposal.petInsuranceData.specie" :sameLine="true" />
            </custom-card>
  
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <Offers :proposal="proposal" />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import apiClient from "@/utils/apiClient";
  import CustomLabel from "./components/CustomLabel";
  import CustomCard from "./components/CustomCard";
  import moment from "moment";
  import translator from "@/utils/translator";
  import sessionHelper from "@/utils/sessionHelper";
  import Offers from "@/components/Offers";
  import Loading from "@/components/Loading"
  
  export default {
    layout: "panel",
    name: "ProposalDetails",
    data() {
      return {
        existingProposal: null,
        currentTab: 0      };
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
      }      
    },
    methods: {
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
      }
    },
    components: {
      "custom-label": CustomLabel,
      "custom-card": CustomCard,
      Offers: Offers,
      Loading: Loading
    },
    async beforeMount() {
      const {
        id
      } = this.$route.query;
      this.existingProposal = await apiClient.getProposalById(id);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>