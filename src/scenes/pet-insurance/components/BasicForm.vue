<template>
  <div>
    <div class="row form-container" v-if="isLoading">
      <Loading :messages="['Submetendo proposta,', 'Aguarde um instante por favor...']"/>
    </div>

    <div class="row form-container" v-else>
      <div class="col-xs-12 col-sm-12">
        <FormInput label="Nome do seu pet"
                    icon="fa-paw" 
                    id="proposal.petInsuranceData.name"
                    :validationMessage="validation.firstError('proposal.petInsuranceData.name')"
                    v-model="proposal.petInsuranceData.name"/>
      </div>
      
      <div class="col-sm-6 col-xs-12">
        <FormInput label="Idade do pet (em anos)" 
                    icon="fa-hourglass " 
                    id="proposal.petInsuranceData.age"
                    mask="##"
                    :validationMessage="validation.firstError('proposal.petInsuranceData.age')"
                    v-model="proposal.petInsuranceData.age"/>
      </div>

      <div class="col-sm-6 col-xs-12">
        <FormInput  label="CEP da sua residência"
                    icon="fa-map-marker" 
                    type="text"
                    id="proposal.proposer.homeAddress.zipCode"
                    :validationMessage="validation.firstError('proposal.proposer.homeAddress.zipCode')"
                    mask="#####-###"
                    v-model.trim="proposal.proposer.homeAddress.zipCode" />
      </div>

      <div class="col-sm-12 col-xs-12">
        <FormInput  label="E-mail" 
                    icon="fa-at" 
                    id="proposal.proposer.email"
                    :validationMessage="validation.firstError('proposal.proposer.email')"
                    v-model.trim="proposal.proposer.email" />
      </div>

      <div class="col-md-2 col-sm-3 col-xs-12">
          <FormInput  label="DDD" 
                      icon="fa-phone" 
                      type="text"
                      id="proposal.proposer.phones.0.areaCode"
                      mask="##"
                      :validationMessage="validation.firstError('proposal.proposer.phones.0.areaCode')"
                      v-model.trim="proposal.proposer.phones[0].areaCode" />
      </div>

      <div class="col-sm-9 col-md-10 col-xs-12 offset-md-1 offset-sm-1">
          <FormInput label="Celular ou Telefone" 
                      icon="fa-phone" 
                      id="proposal.proposer.phones.0.number"
                      maxLength="15"
                      :mask="getPhoneMask(proposal.proposer.phones[0].number)"
                      type="text"
                      :validationMessage="validation.firstError('proposal.proposer.phones.0.number')"
                      v-model.trim="proposal.proposer.phones[0].number" />
      </div>

      <div class="col-xs-12">
        <CallToAction className='pull-right' v-on:click="submitProposal">
          Ver Ofertas &nbsp;
          <i class="fas fa-forward"/>
        </CallToAction>
      </div>
    </div>

  </div>
</template>

<script>
import Loading from "@/components/Loading";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/providers/apiClientProvider";

export default {
  name: "BasicPetInsuranceForm",
  data() {
    return {
      loading: false,
      proposal: {
        petInsuranceData: {
          name: "",
          age: ""
        },
        proposer: {
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
  methods: {
    submitProposal: async function() {
      const isValid = await this.$validate();

      if (!isValid) {
        return;
      }

      this.loading = true;

      if (!this.proposal._id) {
        let newProposal = await apiClientProvider.generateProposal(5);
        this.proposal = Object.assign(newProposal, this.proposal);
      }

      await apiClientProvider.updateProposal(this.proposal);
      const product = await apiClientProvider.checkAvailabilityForProduct(
        5,
        this.proposal.proposer.homeAddress.zipCode
      );

      if (!product.isAvailable) {
        await apiClientProvider.setNextState(this.proposal, 21);
        this.proposal.state = 21;
      } else {
        await apiClientProvider.setNextState(this.proposal, 3);
        this.proposal.state = 3;
      }

      this.$emit("submitProposal", this.proposal);
    },
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
    }
  },
  validators: {
    "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.petInsuranceData.age": value => validator.validatePetAge(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
    "proposal.proposer.phones.0.areaCode": value =>
      validator.validatePhoneAreaCode(value),
    "proposal.proposer.phones.0.number": value =>
      validator.validatePhoneNumber(value)
  },
  components: {
    FormInput: FormInput,
    FormSelect: FormSelect,
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
  border: 2px solid rgb(5, 62, 66);
  border-radius: 20px;
  background-color: white;
  margin-left: 1px;
  margin-right: 1px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
