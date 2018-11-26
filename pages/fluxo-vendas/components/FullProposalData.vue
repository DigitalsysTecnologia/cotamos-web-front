<template>
  <v-layout justify-top>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex sm12>
          <h3 class="subtitle">Vamos obter os dados finais para finalizar sua proposta</h3>
  
          <v-stepper v-model="currentStep" vertical>
            <v-stepper-step :complete="currentStep > 1" step="1">Forma de Pagamento</v-stepper-step>
            <v-stepper-content step="1">
              <PaymentData :proposal="proposal" v-on:onSubmit="updatePaymentData" />
            </v-stepper-content>
  
            <v-stepper-step :complete="currentStep > 2" step="2">Dados Pessoais</v-stepper-step>
            <v-stepper-content step="2">
              <ProposerData :proposer="proposal.proposer" v-on:onSubmit="updateProposer" />
            </v-stepper-content>
  
            <v-stepper-step :complete="currentStep > 3" step="3">Endereço</v-stepper-step>
            <v-stepper-content step="3">
              <AddressData :address="proposal.proposer.homeAddress" cancelButtonText="Voltar" v-on:onSubmit="updateAddress" v-on:onCancel="currentStep--" />
            </v-stepper-content>
  
            <v-stepper-step step="4">Dados do PET</v-stepper-step>
            <v-stepper-content step="4">
              <PetInsuranceData :petInsuranceData="proposal.petInsuranceData" cancelButtonText="Voltar" v-on:onSubmit="finishProposal" v-on:onCancel="currentStep--" />
            </v-stepper-content>
          </v-stepper>
  
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import apiClientProvider from "@/utils/apiClient";
import ProposerData from "./forms/ProposerData";
import AddressData from "./forms/AddressData";
import PetInsuranceData from "./forms/PetInsuranceData";
import PaymentData from "./forms/PaymentData";

export default {
  name: "FullProposalData",
  data() {
    return {
      currentStep: 1
    };
  },
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  methods: {
    nextStep: function() {
      this.currentStep++;
    },

    updatePaymentData: async function(paymentData) {
      this.proposal.paymentData = paymentData;
      // apiClientProvider.updateProposal(this.proposal);
      this.nextStep();
    },
    updateProposer: async function(proposer) {
      console.log("proposer", proposer);
      this.proposal.proposer = proposer;
      // apiClientProvider.updateProposal(this.proposal);
      this.nextStep();
    },
    updateProposal: async function(proposal) {},
    updateAddress: async function(address) {
      this.proposal.proposer.homeAddress = address;
      // apiClientProvider.updateProposal(this.proposal);
      this.nextStep();
    },
    finishProposal: async function() {
      await apiClientProvider.updateProposal(this.proposal);
      this.$emit("submitProposal");
    }
  },
  async beforeMount() {
    if (!this.proposal.proposer.name) {
      this.proposal.proposer.name = "";
    }

    if (!this.proposal.proposer.email) {
      this.proposal.proposer.email = "";
    }

    if (!this.proposal.proposer.cpf) {
      this.proposal.proposer.cpf = "";
    }

    if (!this.proposal.proposer.homeAddress.street) {
      this.proposal.proposer.homeAddress.street = "";
    }

    if (!this.proposal.proposer.homeAddress.number) {
      this.proposal.proposer.homeAddress.number = "";
    }

    if (!this.proposal.proposer.homeAddress.zipCode) {
      this.proposal.proposer.homeAddress.zipCode = "";
    }

    if (!this.proposal.proposer.homeAddress.state) {
      this.proposal.proposer.homeAddress.state = "";
    }

    if (!this.proposal.proposer.homeAddress.city) {
      this.proposal.proposer.homeAddress.city = "";
    }

    if (!this.proposal.proposer.phones[0].areaCode) {
      this.proposal.proposer.phones[0].areaCode = "";
    }

    if (!this.proposal.proposer.phones[0].number) {
      this.proposal.proposer.phones[0].number = "";
    }

    if (!this.proposal.petInsuranceData.gender) {
      this.proposal.petInsuranceData.gender = "";
    }

    if (!this.proposal.petInsuranceData.specie) {
      this.proposal.petInsuranceData.specie = "";
    }

    if (!this.proposal.paymentData.method) {
      this.proposal.paymentData.method = "2"
    }
  },
  components: {
    ProposerData: ProposerData,
    AddressData: AddressData,
    PetInsuranceData: PetInsuranceData,
    PaymentData: PaymentData,
    Header: Header,
    Footer: Footer
  }
};
</script>

<style scoped>
</style>
