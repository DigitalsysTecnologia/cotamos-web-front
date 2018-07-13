<template>
  <div>
    <div class="col-xs-12">
      <h3>Infelizmente, sua região ainda não é atendida. Gostaria de ser avisado quando houver disponibilidade?</h3>
    </div>
    <div>
      <div class="col-sm-12 col-xs-12">
        <FormInput  label="Nome"
                    icon="fa-user" 
                    id="proposal.proposer.name"
                    :validationMessage="validation.firstError('proposal.proposer.name')"
                    v-model.trim="proposal.proposer.name" />
      </div>
      <div class="col-sm-12 col-xs-12">
        <FormInput  label="E-mail" 
                    icon="fa-at" 
                    id="proposal.proposer.email"
                    :validationMessage="validation.firstError('proposal.proposer.email')"
                    v-model.trim="proposal.proposer.email" />
      </div>
      <div class="col-xs-12">
        <CallToAction className='pull-left' v-on:click="previousStep">
          <i class="fas fa-backward"/>
          &nbsp; Testar com outro CEP
        </CallToAction>
        <CallToAction className='pull-right' v-on:click="nextStep">
          Quero ser avisado &nbsp;
          <i class="fas fa-forward"/>
        </CallToAction>
      </div>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect.vue";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import CallToAction from "@/components/CallToAction.vue";

export default {
  name: "DeniedProposal",
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  methods: {
    nextStep: async function() {
      const isValid = await this.$validate();
      if (isValid) {
        this.$emit("nextStep", null);
      }
    },
    previousStep: async function() {
      this.$emit("previousStep", null);
    }
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
  },
  components: {
    FormInput: FormInput,
    FormSelect: FormSelect,
    CallToAction: CallToAction
  }
};
</script>

<style scoped>

</style>
