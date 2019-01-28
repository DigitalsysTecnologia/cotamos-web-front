<style scoped>
.proposal-wrapper {
  margin-top: 7.8rem;
  margin-left: 3rem;
  width: 50%;
}

@media screen and (max-width: 845px) {
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
  }
  .proposal-wrapper {
    margin: 0;
    margin: 1rem 0 7rem 0; 
  }
}
</style>
<template>
  <v-layout justify-top class="wrapper">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex sm12>
          <h3 class="subtitle">Vamos obter os dados finais para finalizar sua proposta</h3>
          <v-stepper v-model="currentStep">
            <v-stepper-header>
              <v-stepper-step :complete="currentStep > 1" step="1">Forma de Pagamento</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="currentStep > 2" step="2">Dados Pessoais</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="currentStep > 3" step="3">Endereço</v-stepper-step>

              <v-divider></v-divider>
              <v-stepper-step step="4">Dados do PET</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <PaymentData
                  :proposal="proposal"
                  v-on:onSubmit="updatePaymentData"
                  :showCancelButton="true"
                  cancelButtonText="Voltar"
                  v-on:onCancel="goBack"
                />
              </v-stepper-content>
              <v-stepper-content step="2">
                <ProposerData 
                    :proposer="proposal.proposer" 
                    v-on:onSubmit="updateProposer"
                    v-on:onCancel="currentStep--"
                    cancelButtonText="Voltar"
                    :showCancelButton="true"
                />
              </v-stepper-content>
              <v-stepper-content step="3">
                <AddressData
                  :address="proposal.proposer.homeAddress"
                  cancelButtonText="Voltar"
                  :showCancelButton="true"
                  v-on:onSubmit="updateAddress"
                  v-on:onCancel="currentStep--"
                />
              </v-stepper-content>
              <v-stepper-content step="4">
                <PetInsuranceData
                  :petInsuranceData="proposal.petInsuranceData"
                  v-on:onSubmit="finishProposal"
                  v-on:onCancel="currentStep--"
                  cancelButtonText="Voltar"
                  :showCancelButton="true"
                />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
    <div class="proposal-wrapper">
      <ProposalCard 
        :proposal="proposal"
        v-on:onSubmit="updatePaymentData"
       />
    </div>
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
import ProposalCard from './ProposalCard'
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
  computed: {
    get() {
      console.log(proposal.proposer)
      return true;
    }
  },
  methods: {
    nextStep: function() {
      this.currentStep++;
    },
    goBack: function() {
      console.log('Voltar')
      this.$emit("goBack");
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
      this.proposal.paymentData.method = "2";
    }
  },
  components: {
    ProposalCard: ProposalCard,
    ProposerData: ProposerData,
    AddressData: AddressData,
    PetInsuranceData: PetInsuranceData,
    PaymentData: PaymentData,
    Header: Header,
    Footer: Footer
  }
};
</script>


    