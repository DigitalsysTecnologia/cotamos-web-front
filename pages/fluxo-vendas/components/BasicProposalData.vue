<template>
    <div class="proposal-form">
        <h3 style="padding-left:5px;">Primeiro, vamos verificar a disponibilidade para sua região, tá bom?</h3>
        <h3 style="padding-left:5px;">Para isso, vamos precisar de algumas informações</h3>
        
        <div class="col-xs-12 col-sm-12">
          <FormInput label="Seu Nome"
                      icon="fa-user" 
                      id="proposal.proposer.name"
                      :validationMessage="validation.firstError('proposal.proposer.name')"
                      v-model="proposal.proposer.name"/>
        </div>

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

        <!-- <div class="col-sm-12 col-xs-12">
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
        </div> -->

        <div class="col-xs-12">
          <FormInput label="Celular ou Telefone" 
                    icon="fa-phone" 
                    id="proposal.proposer.phones.0.fullNumber"
                    maxLength="15"
                    :mask="getFullPhoneMask(proposal.proposer.phones[0].fullNumber)"
                    type="text"
                    :validationMessage="validation.firstError('proposal.proposer.phones.0.fullNumber')"
                    v-model.trim="proposal.proposer.phones[0].fullNumber" />
        </div>

        <!-- <div class="col-sm-9 col-md-10 col-xs-12 offset-md-1 offset-sm-1">
            <FormInput label="Celular ou Telefone" 
                        icon="fa-phone" 
                        id="proposal.proposer.phones.0.number"
                        maxLength="15"
                        :mask="getPhoneMask(proposal.proposer.phones[0].number)"
                        type="text"
                        :validationMessage="validation.firstError('proposal.proposer.phones.0.number')"
                        v-model.trim="proposal.proposer.phones[0].number" />
        </div> -->

        <div class="col-xs-12">
          <CallToAction className='pull-left' v-on:click="submitProposal">
            Próximo &nbsp;
            <i class="fas fa-forward"/>
          </CallToAction>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect.vue";
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction.vue";
import apiClientProvider from "@/providers/apiClientProvider";

export default {
  name: "BasicProposalData",
  data() {
    return {};
  },
  props: {
    proposal: {
      required: true,
      type: Object
    }
  },
  methods: {
    submitProposal: async function() {
      const isValid = await this.$validate();
      if (isValid) {
        this.$emit("submitProposal", this.proposal);
      }
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
    },
    getFullPhoneMask: function(phone) {
      let phoneNumber = null;
      
      if (phone) {
        phoneNumber = phone.replace(/\D/g, "");
      } else {
        phoneNumber = "";
      }

      if (phoneNumber.length <= 10) {
        return "(##) ####-####";
      } else {
        return "(##) #####-####";
      }
    }
  },
  mounted: function() {},
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.petInsuranceData.age": value => validator.validatePetAge(value),
    // "proposal.proposer.email": value => validator.validateEmail(value),
    // "proposal.proposer.phones.0.areaCode": value =>
    //   validator.validatePhoneAreaCode(value),
    // "proposal.proposer.phones.0.number": value =>
    //   validator.validatePhoneNumber(value)
    "proposal.proposer.phones.0.fullNumber": value =>
      validator.validateFullPhoneNumber(value)
  },
  components: {
    FormInput: FormInput,
    FormSelect: FormSelect,
    CallToAction: CallToAction,
    Header: Header,
    Footer: Footer
  }
};
</script>

<style scoped>
</style>
