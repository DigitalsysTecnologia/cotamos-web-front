<template>
  <div>
    <h3>Primeiro, vamos verificar a disponibilidade para sua região, tá bom?</h3>
    <h3>Para isso, vamos precisar de algumas informações</h3>
    <div class="col-xs-12 col-sm-6">
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

    <div class="col-xs-12">
      <CallToAction className='pull-left' v-on:click="submitProposal">
        Próximo &nbsp;
        <i class="fas fa-forward"/>
      </CallToAction>
    </div>

  </div>
</template>

<script>
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect.vue";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import CallToAction from "@/components/CallToAction.vue"

export default {
  name: "BasicPetInsuranceForm",
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  methods: {
    submitProposal: async function() {
      const isValid = await this.$validate();
      if (isValid) {
        this.$emit("next", null);
      }
    }
  },
  validators: {
    "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    "proposal.proposer.homeAddress.zipCode": value =>  validator.validateZipCode(value),
    "proposal.petInsuranceData.age": value => validator.validatePetAge(value)
  },
  components: {
    FormInput: FormInput,
    FormSelect: FormSelect,
    CallToAction:CallToAction
  }
};
</script>

<style scoped>
.form-line {
  margin-left: 0px;
}
</style>
