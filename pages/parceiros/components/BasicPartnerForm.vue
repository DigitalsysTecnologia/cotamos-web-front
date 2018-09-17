<template>
    <div class="row form-container text-left">

      <div class="row">
        <div class="col-sm-4">
          <FormSelect  label="Pessoa Física ou Jurídica" 
                      icon="fa-briefcase" 
                      id="partner.partnerType"
                      :validationMessage="validation.firstError('partner.partnerType')"
                      v-model="partner.partnerType" 
                      :options="[
                      {id: 0, text: 'Pessoa Física'}, 
                      {id: 1, text: 'Pessoa Jurídica'}
                      ]" />
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
      </div>

      <div class="row">
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
          <PhoneInput label="Telefone Comercial" 
                icon="fa-phone" 
                id="partner.phones.0"
                maxLength="14"
                type="text"
                :validationMessage="validation.firstError('partner.phones.0')"
                v-model="partner.phones[0]" />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <PhoneInput label="Telefone Celular" 
                icon="fa-phone" 
                id="partner.phones.1"
                type="text"
                :validationMessage="validation.firstError('partner.phones.1')"
                v-model="partner.phones[1]" />
        </div>
      </div>


      <div class="row">
        <div class="col-sm-4">
          <ZipCodeInput label="CEP" 
                icon="fa-map-marker" 
                id="partner.companyAddress.zipCode"
                type="text"
                @onReceived="onReceivedAddress"
                @onWaiting="onWaitingAddress"
                :validationMessage="validation.firstError('partner.companyAddress.zipCode')"
                v-model="partner.companyAddress.zipCode" />
        </div>

        <div class="col-sm-6">
          <FormInput label="Logradouro" 
                id="partner.companyAddress.street"
                :disabled="disabledInput.street"
                icon="fa-home"
                type="text"
                :validationMessage="validation.firstError('partner.companyAddress.street')"
                v-model="partner.companyAddress.street" />
        </div>

        <div class="col-sm-2">
          <FormInput label="Número" 
                id="partner.companyAddress.number"
                :disabled="disabledInput.number"
                icon="fa-map-pin"
                type="text"
                :validationMessage="validation.firstError('partner.companyAddress.number')"
                v-model="partner.companyAddress.number" />
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <FormInput label="Cidade" 
                id="partner.companyAddress.city"
                :disabled="disabledInput.city"
                icon="fa-home"
                type="text"
                maxLength="2"
                :validationMessage="validation.firstError('partner.companyAddress.city')"
                v-model="partner.companyAddress.city" />
        </div>

        <div class="col-sm-2">
          <FormInput label="Estado" 
                id="partner.companyAddress.state"
                :disabled="disabledInput.state"
                type="text"
                icon="fa-home"
                maxLength="2"
                :validationMessage="validation.firstError('partner.companyAddress.state')"
                v-model="partner.companyAddress.state" />
        </div>

        <div class="col-sm-4">
          <FormInput label="Bairro" 
                id="partner.companyAddress.neighborhood"
                :disabled="disabledInput.neighborhood"
                icon="fa-home"
                type="text"
                :validationMessage="validation.firstError('partner.companyAddress.neighborhood')"
                v-model="partner.companyAddress.neighborhood" />
        </div>

      </div>

      <div class="row">
        <div class="col-xs-12">
          <CallToAction className='pull-right' @click="createPartner">
            Cadastrar &nbsp;
          </CallToAction>
        </div>
      </div>
      
    </div>

</template>

<script>
import Loading from "@/components/Loading";
import FormInput from "@/components/FormInput";
import ZipCodeInput from "@/components/ZipCodeInput";
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
        dateOfBirth: "",
        phones: [
          {
            areaCode: "",
            number: "",
            fullNumber: ""
          }
        ],
        companyAddress: {
          city: "",
          complement: "",
          neighborhood: "",
          number: "",
          state: "",
          street: "",
          zipCode: ""
        }
      },
      disabledInput: {
        city: true,
        neighborhood: true,
        number: true,
        state: true,
        street: true
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
    onReceivedAddress: async function(address) {
      this.partner.companyAddress.state = address.state;
      this.disabledInput.state = this.partner.companyAddress.state != '';

      this.partner.companyAddress.city = address.city;
      this.disabledInput.city = this.partner.companyAddress.city != '';

      this.partner.companyAddress.complement = address.complement;

      this.partner.companyAddress.neighborhood = address.neighborhood;
      this.disabledInput.neighborhood = this.partner.companyAddress.neighborhood != '';

      this.partner.companyAddress.street = address.street;
      this.disabledInput.street = this.partner.companyAddress.street != '';

      this.partner.companyAddress.number = address.number;
      this.disabledInput.number = false;
    },
    onWaitingAddress: async function() {
      console.log("onWaitingAddress");
    },
    createPartner: async function() {
      const isValid = await validator.validatePage(this);

      if (!isValid) {
        return;
      }

      this.$emit("onSubmitPartner", this.partner);
    }
  },
  validators: {
    "partner.name": value => validator.validateClientName(value),
    // "partner.phones.0": phone => {
    //   console.log('phone.number', phone.number)
    //   return validator.validatePhoneNumber(phone.number)
    // }
    "partner.dateOfBirth": value => validator.validateDateOfBirth(value),
    // "proposal.petInsuranceData.name": value => validator.validatePetName(value),
    // "proposal.proposer.homeAddress.zipCode": value =>
    //   validator.validateZipCode(value),
    // "proposal.petInsuranceData.age": value => validator.validatePetAge(value),
    "partner.email": value => validator.validateEmail(value)
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
    ZipCodeInput: ZipCodeInput,
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
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 1px;
  margin-right: 1px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
