<template>
  <div>
    <section class="section has-text-dark" style="
    padding-top: 0px;
    padding-bottom: 0px;
">
      <h2 class="subtitle has-text-centered">Contratar Plano</h2>

      <div>
        <PaymentData
          :proposal="proposal"
          v-on:onSubmit="updatePaymentData"
          :showCancelButton="true"
          cancelButtonText="Voltar"
          v-on:onCancel="goBack"
        />
        <ProposerData
          :proposer="proposal.proposer"
          v-on:onSubmit="updateProposer"
          v-on:onCancel="currentStep--"
          cancelButtonText="Voltar"
          :showCancelButton="true"
        />
        <AddressData
          :address="proposal.proposer.homeAddress"
          cancelButtonText="Voltar"
          :showCancelButton="true"
          v-on:onSubmit="updateAddress"
          v-on:onCancel="currentStep--"
        />
        <PetInsuranceData
          :petInsuranceData="proposal.petInsuranceData"
          v-on:onSubmit="finishProposal"
          v-on:onCancel="currentStep--"
          cancelButtonText="Voltar"
          :showCancelButton="true"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import apiClientProvider from "@/utils/apiClient";
import ProposerData from "@/components/molecules/ProposerData";
import AddressData from "@/components/molecules/AddressData";
import PetInsuranceData from "@/components/molecules/PetInsuranceData";
import PaymentData from "@/components/molecules/PaymentData";

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
    goBack: function() {
      this.$emit("goBack");
    },
    updatePaymentData: async function(paymentData) {
      this.proposal.paymentData = paymentData;
      this.nextStep();
    },
    updateProposer: async function(proposer) {
      console.log("proposer", proposer);
      this.proposal.proposer = proposer;
      this.nextStep();
    },
    updateProposal: async function(proposal) {},
    updateAddress: async function(address) {
      this.proposal.proposer.homeAddress = address;
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
    ProposerData,
    AddressData,
    PetInsuranceData,
    PaymentData,
    Header,
    Footer
  }
};
</script>

<style scoped>
</style>
