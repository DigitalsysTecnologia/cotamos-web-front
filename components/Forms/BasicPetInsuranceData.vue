<template>
  <div>
    <div class="row form-container" v-if="isLoading">
      <Loading :messages="['Submetendo proposta,', 'Aguarde um instante por favor...']"/>
    </div>

    <div class="row form-container text-left" v-else>
      <div class="col-xs-12 col-sm-12">
        <v-text-field
          :label="isSimulation ? 'Nome do Cliente' :'Seu Nome'"
          id="proposal.proposer.name"
          :error="!!(validation.firstError('proposal.proposer.name'))"
          :error-messages="validation.firstError('proposal.proposer.name')"
          v-model="proposal.proposer.name"
        />
      </div>

      <div class="col-xs-12 col-sm-12">
        <v-text-field
          label="Nome do PET"
          id="proposal.petInsuranceData.name"
          :error="!!(validation.firstError('proposal.petInsuranceData.name'))"
          :error-messages="validation.firstError('proposal.petInsuranceData.name')"
          v-model="proposal.petInsuranceData.name"
        />
      </div>

      <div class="col-sm-6 col-xs-12">
        <v-select
          :items="petAges"
          label="Idade do pet"
          item-text="text"
          item-value="value"
          :error="!!(validation.firstError('proposal.petInsuranceData.age'))"
          :error-messages="validation.firstError('proposal.petInsuranceData.age')"
          v-model="proposal.petInsuranceData.age"
        />
      </div>

      <div class="col-sm-6 col-xs-12">
        <v-text-field
          :label="isSimulation ? 'CEP do cliente' : 'CEP da sua residência'"
          id="proposal.proposer.homeAddress.zipCode"
          :error="!!(validation.firstError('proposal.proposer.homeAddress.zipCode'))"
          :error-messages="validation.firstError('proposal.proposer.homeAddress.zipCode')"
          mask="#####-###"
          v-model.trim="proposal.proposer.homeAddress.zipCode"
        />
      </div>

      <div class="col-sm-12 col-xs-12">
        <v-text-field
          :label="isSimulation ? 'E-mail do cliente' :'E-mail'"
          id="proposal.proposer.email"
          :error="!!(validation.firstError('proposal.proposer.email'))"
          :error-messages="validation.firstError('proposal.proposer.email')"
          v-model.trim="proposal.proposer.email"
        />
      </div>

      <div class="col-sm-12 col-xs-12">
        <v-select
          :items="hasIndicationItems"
          label="Você foi indicado por alguém?"
          item-text="text"
          item-value="value"
          v-model="hasIndication"
        />
      </div>

      <div class="col-sm-12 col-xs-12" v-if="hasIndication">
        <v-select
          :items="partners"
          label="Quem te indicou?"
          item-text="name"
          item-value="_id"
          no-data-text="Sem parceiros disponíveis"
          v-model="proposal.partnerId"
        />
      </div>

      <div class="col-xs-12">
        <CallToAction class="pull-right" v-on:click="submitProposal">
          Ver Opções &nbsp;
          <i class="fas fa-forward"/>
        </CallToAction>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import DateInput from "@/components/DateInput";
import PhoneInput from "@/components/PhoneInput.vue";
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "BasicPetInsuranceData",
  data() {
    return {
      loading: false,
      hasIndication: false,
      hasIndicationItems: [{ "text": "Sim", "value": true}, { "text": "Não", "value": false}],
      partners: [],
      petAges: [
        {
          text: "Menos de 1 ano",
          value: 0
        },
        {
          text: "Entre 1 e 8 anos",
          value: 3
        },
        {
          text: "Acima de 8 anos",
          value: 10
        }
      ],
      disableParner: false,
      proposal: {
        petInsuranceData: {
          name: "",
          age: ""
        },
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
          5,
          this.isSimulation
        );
        this.proposal = Object.assign(newProposal, this.proposal);
      }

      this.proposal.petInsuranceData.age = parseInt(
        this.proposal.petInsuranceData.age
      );

      await apiClientProvider.updateProposal(this.proposal);
      const product = await apiClientProvider.checkAvailabilityForProduct(
        5,
        this.proposal.proposer.homeAddress.zipCode
      );

      if (!product.isAvailable) {
        this.proposal = await apiClientProvider.setNextState(this.proposal, 11);
        alert("Infelizmente, sua região ainda não é atendida.");
        this.loading = false;
        return;
      } else {
        this.proposal = await apiClientProvider.setNextState(this.proposal, 3);
      }

      this.$emit("submitProposal", this.proposal);
    }
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.petInsuranceData.age": value => validator.validatePetAge(value),
    "proposal.proposer.email": value => validator.validateEmail(value)
  },
  components: {
    PhoneInput: PhoneInput,
    DateInput: DateInput,
    CallToAction: CallToAction,
    Loading: Loading
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
