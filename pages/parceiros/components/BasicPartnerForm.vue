<template>
    <div class="row form-container text-left">

      <div class="col-sm-4 col-xs-12 col-md-3 col-lg-2">
        <FormSelect  label="Pessoa Física ou Jurídica" 
                    icon="fa-briefcase" 
                    id="partner.type"
                    :validationMessage="validation.firstError('partner.type')"
                    v-model="partner.type" 
                    :options="['Pessoa Física', 'Pessoa Jurídica']" />
      </div>

      <div class="col-sm-4">
        <FormInput label="Seu Nome"
                   icon="fa-user" 
                   id="partner.name"
                   :validationMessage="validation.firstError('partner.name')"
                   v-model="partner.name"/>
      </div>

      <div class="col-sm-4">
        <FormInput  label="CPF/CNPJ" 
              mask="###.###.###-##"
              id="partner.document"
              type="text"
              :validationMessage="validation.firstError('partner.document')"
              v-model="partner.document" />
      </div>

      <div class="col-sm-4">
        <FormInput  label="E-mail" 
              id="partner.email"
              type="text"
              :validationMessage="validation.firstError('partner.email')"
              v-model="partner.email" />
      </div>

      <div class="col-sm-4">
        <DateInput label="Data de nascimento" 
              icon="fa-calendar" 
              id="partner.dateOfBirth"
              type="text"
              :validationMessage="validation.firstError('partner.dateOfBirth')"
              v-model="partner.dateOfBirth" />
      </div>

      <div class="col-sm-4">
        <PhoneInput label="Telefone" 
              icon="fa-phone" 
              id="partner.phones.0"
              type="text"
              :validationMessage="validation.firstError('partner.phones.0')"
              v-model="partner.phones[0]" />
      </div>

      <div class="col-sm-4">
        <PhoneInput label="Telefone" 
              icon="fa-phone" 
              id="partner.phones.1"
              type="text"
              :validationMessage="validation.firstError('partner.phones.1')"
              v-model="partner.phones[1]" />
      </div>

      <div class="col-xs-12">
        <CallToAction className='pull-right' v-on:click="submitProposal">
          Cadastrar &nbsp;
        </CallToAction>

      </div>
      
    </div>
  
  <!-- <div>
    <div class="row form-container text-left">

      <div class="col-sm-4 col-xs-12 col-md-3 col-lg-2">
        <FormSelect  label="Pessoa Física ou Jurídica" 
                    icon="fa-briefcase" 
                    id="partner.type"
                    :validationMessage="validation.firstError('partner.type')"
                    v-model="partner.type" 
                    :options="['Pessoa Física', 'Pessoa Jurídica']" />
      </div>


      <div class="col-sm-4">
        <FormInput label="Seu Nome"
                   icon="fa-user" 
                   id="partner.name"
                   :validationMessage="validation.firstError('partner.name')"
                   v-model="partner.name"/>
      </div>

      <div class="col-sm-4">
        <FormInput  label="CPF/CNPJ" 
              mask="###.###.###-##"
              id="partner.document"
              type="text"
              :validationMessage="validation.firstError('partner.document')"
              v-model="partner.document" />
      </div>

      <div class="col-sm-4">
        <FormInput  label="E-mail" 
              id="partner.email"
              type="text"
              :validationMessage="validation.firstError('partner.email')"
              v-model="partner.email" />
      </div>

      <div class="col-sm-4">
        <DateInput label="Data de nascimento" 
              icon="fa-calendar" 
              id="partner.dateOfBirth"
              type="text"
              :validationMessage="validation.firstError('partner.dateOfBirth')"
              v-model="partner.dateOfBirth" />
      </div>

      <div class="col-sm-4">
        <PhoneInput label="Telefone" 
              icon="fa-phone" 
              id="partner.phones.0"
              type="text"
              :validationMessage="validation.firstError('partner.phones.0')"
              v-model="partner.phones[0]" />
      </div>

      <div class="col-xs-12">
        <CallToAction className='pull-right' v-on:click="submitProposal">
          Cadastrar &nbsp;
        </CallToAction>
      </div>
    </div>
  </div> -->
</template>

<script>
import Loading from "@/components/Loading";
import FormInput from "@/components/FormInput";

import DateInput from "@/components/DateInput";
import PhoneInput from "@/components/PhoneInput";
import FormSelect from "@/components/FormSelect";
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/providers/apiClientProvider";

export default {
  name: "BasicPetInsuranceForm",
  data() {
    return {
      loading: false,
      partner: {
        name: "",
        email: "",
        phones: [
          {
            areaCode: "",
            number: "",
            fullNumber: ""
          }
        ]
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
      const isValid = await validator.validatePage(this);

      if (!isValid) {
        return;
      }
    }
  },
  validators: {
    "partner.name": value => validator.validateClientName(value),
    // "partner.phones.0": phone => {
    //   console.log('phone.number', phone.number)
    //   return validator.validatePhoneNumber(phone.number)
    // }
    "partner.dateOfBirth": value =>
      validator.validateDateOfBirth(value),
    // "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    // "proposal.proposer.homeAddress.zipCode": value =>
    //   validator.validateZipCode(value),
    // "proposal.petInsuranceData.age": value => validator.validatePetAge(value),
    // "proposal.proposer.email": value => validator.validateEmail(value),
    // "proposal.proposer.phones.0.areaCode": value =>
    //   validator.validatePhoneAreaCode(value),
    // "proposal.proposer.phones.0.number": value =>
    //   validator.validatePhoneNumber(value)
    // "proposal.proposer.phones.0.fullNumber": value =>
    //   validator.validateFullPhoneNumber(value)
  },
  components: {
    FormInput: FormInput,
    DateInput: DateInput,
    PhoneInput: PhoneInput,
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
