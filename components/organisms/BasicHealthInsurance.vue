<template>
  <div>
    <div class="row form-container" v-if="isLoading">
      <Loading :messages="['Submetendo proposta,', 'Aguarde um instante por favor...']"/>
    </div>

    <div v-else>
      <div class="columns is-multiline">
        <div class="column is-full-desktop">
          <VInput
            label="Nome"
            id="proposal.proposer.name"
            :validationMessage="validation.firstError('proposal.proposer.name')"
            v-model="proposal.proposer.name"
          />
        </div>
        <div class="column is-full-desktop">
          <VDateInput
            label="Data de nascimento"
            id="proposal.proposer.dateOfBirth"
            type="text"
            :validationMessage="validation.firstError('proposal.proposer.dateOfBirth')"
            v-model="proposal.proposer.dateOfBirth"
          />
        </div>
        <div class="column is-full-desktop">
          <VInput
            label="E-mail"
            id="proposal.proposer.email"
            :error="!!(validation.firstError('proposal.proposer.email'))"
            :validationMessage="validation.firstError('proposal.proposer.email')"
            v-model.trim="proposal.proposer.email"
          />
        </div>
        <div class="column is-full-desktop">
          <VPhoneInput
            label="Celular ou Telefone"
            id="proposer.phones.0"
            maxlength="15"
            :validationMessage="validation.firstError('proposal.proposer.phones.0')"
            v-model.trim="proposal.proposer.phones[0]"
          />
        </div>
        <div class="column is-full-desktop">
          <VDropDown
            :items="hasLegalEntityOptions"
            label="Possui CNPJ"
            item-text="text"
            item-value="value"
          />
        </div>
      </div>
      <CallToAction class="pull-right" @click="submitProposal">SIMULE AGORA</CallToAction>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/molecules/Loading";
import VPhoneInput from "@/components/atoms/VPhoneInput.vue";
import VInput from "@/components/atoms/VInput";
import VDateInput from "@/components/atoms/VDateInput";
import VDropDown from "@/components/atoms/VDropDown";
import validator from "@/utils/validator";
import CallToAction from "@/components/atoms/CallToAction";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "BasicHealthInsuranceData",
  data() {
    return {
      loading: false,
      hasIndication: null,
      hasLegalEntityOptions: [
        { text: "Sim", value: true },
        { text: "Não", value: false }
      ],
      partners: [],
      disableParner: false,
      proposal: {
        proposer: {
          name: "",
          email: "",
          phones: [
            {
              areaCode: "",
              number: ""
            }
          ],
          homeAddress: {
            zipCode: ""
          }
        }
      }
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      }
    }
  },
  props: {
    isSimulation: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  async mounted() {
    this.partners = await apiClientProvider.listPartner();
    const { partnerId } = this.$route.query;
    if (partnerId) {
      this.proposal.partnerId = partnerId;
      this.disableParner = true;
    }
  },
  methods: {
    submitProposal: async function() {
      const isValid = await validator.validatePage(this);

      if (!isValid) {
        return;
      }

      this.loading = true;

      if (!this.proposal._id) {
        let newProposal = await apiClientProvider.generateProposal(
          2,
          this.isSimulation
        );
        this.proposal = Object.assign(newProposal, this.proposal);
      }

      if (this.proposal.partnerId) {
        this.proposal.partnerId = this.proposal.partnerId.toString();
      }

      await apiClientProvider.updateProposal(this.proposal);
      this.proposal = await apiClientProvider.setNextState(this.proposal, 3);

      this.$emit("submitProposal", this.proposal);
    }
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
    "proposal.proposer.dateOfBirth": value =>
      validator.validateDateOfBirth(value, true)
  },
  components: {
    VPhoneInput,
    CallToAction,
    Loading,
    VInput,
    VDateInput,
    VDropDown
  }
};
</script>

<style scoped>
.form-line {
  margin-left: 0px;
}

.form-container {
  margin-left: 1px;
  margin-right: 1px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
