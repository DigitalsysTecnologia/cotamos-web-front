<template>
  <div class="container-fluid" >
    <div class="row" style="margin-top:30px;">
      <div class="col-sm-12 col-xs-12">
        <h3>Vamos obter os dados finais para finalizar sua proposta</h3>
      </div>

      <div class="col-sm-6 col-xs-12">
          <FormInput  label="Nome"
                      icon="fa-user" 
                      id="proposal.proposer.name"
                      :validationMessage="validation.firstError('proposal.proposer.name')"
                      v-model.trim="proposal.proposer.name" />
      </div>
      <div class="col-sm-6 col-xs-12">
          <FormInput  label="Data de nascimento" 
                      icon="fa-calendar" 
                      id="proposal.proposer.dateOfBirth"
                      mask="##/##/####"
                      type="text"
                      :validationMessage="validation.firstError('proposal.proposer.dateOfBirth')"
                      v-model="proposal.proposer.dateOfBirth" />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-6 col-xs-12">
          <FormInput  label="E-mail" 
                      icon="fa-at" 
                      id="proposal.proposer.email"
                      :validationMessage="validation.firstError('proposal.proposer.email')"
                      v-model.trim="proposal.proposer.email" />
      </div>

      <div class="col-sm-6 col-xs-12">
          <FormInput  label="CPF" 
                      icon="far fa-id-card"
                      id="proposal.proposer.cpf"
                      :validationMessage="validation.firstError('proposal.proposer.cpf')"
                      mask="###.###.###-##"
                      v-model.trim="proposal.proposer.cpf" />
      </div>
    </div>
    
    <div class="row">
      <div class="col-sm-4 col-xs-12">
          <FormInput  label="CEP" 
                      icon="fa-map-marker" 
                      type="text"
                      id="proposal.proposer.homeAddress.zipCode"
                      :validationMessage="validation.firstError('proposal.proposer.homeAddress.zipCode')"
                      mask="#####-###"
                      v-model.trim="proposal.proposer.homeAddress.zipCode" />
      </div>

      <div class="col-sm-2 col-xs-12">
        <FormInput  label="UF" 
                      icon="fa-map-marker" 
                      id="proposal.proposer.homeAddress.state"
                      :validationMessage="validation.firstError('proposal.proposer.homeAddress.state')"
                      v-model="proposal.proposer.homeAddress.state" />
      </div>

      <div class="col-sm-6 col-xs-12">
          <FormInput  label="Cidade" 
                      icon="fa-map-marker" 
                      id="proposal.proposer.homeAddress.city"
                      :validationMessage="validation.firstError('proposal.proposer.homeAddress.city')"
                      v-model.trim.lazy="proposal.proposer.homeAddress.city" />
      </div>
    </div>
    
    <div class="row">
      <div class="col-sm-8 col-xs-12">
          <FormInput  label="Logradouro" 
                      icon="fa-map-marker" 
                      id="proposal.proposer.homeAddress.street"
                      :validationMessage="validation.firstError('proposal.proposer.homeAddress.street')"
                      v-model.trim.lazy="proposal.proposer.homeAddress.street" />
      </div>

      <div class="col-sm-4 col-xs-12">
          <FormInput  label="Número" 
                      icon="fa-map-marker" 
                      id="proposal.proposer.homeAddress.number"
                      :validationMessage="validation.firstError('proposal.proposer.homeAddress.number')"
                      v-model.trim.lazy="proposal.proposer.homeAddress.number" />
      </div>
    </div>

    <div class="row">
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
    </div>

    <div class="row" style="margin-top:30px;">
      <div class="col-xs-12">
        <h3>Dados de seu Pet:</h3>
      </div>
      <div class="col-sm-4 col-xs-12">
          <FormInput  label="Data de nascimento do Pet" 
                      icon="fa-calendar" 
                      id="proposal.petInsuranceData.dateOfBirth"
                      mask="##/##/####"
                      type="text"
                      :validationMessage="validation.firstError('proposal.petInsuranceData.dateOfBirth')"
                      v-model="proposal.petInsuranceData.dateOfBirth" />
      </div>
      <div class="col-sm-4 col-xs-12">
        <FormSelect  label="Sexo do Pet" 
                    icon="fa-transgender" 
                    id="proposal.petInsuranceData.gender"
                    :validationMessage="validation.firstError('proposal.petInsuranceData.gender')"
                    v-model="proposal.petInsuranceData.gender" 
                    :options="['Macho', 'Fêmea']" />
      </div>
      <div class="col-sm-4 col-xs-12">
        <FormSelect  label="Espécie do Pet" 
                    icon="fa-paw" 
                    id="proposal.petInsuranceData.specie"
                    :validationMessage="validation.firstError('proposal.petInsuranceData.specie')"
                    v-model="proposal.petInsuranceData.specie" 
                    :options="['Canino', 'Felino']" />
      </div>

    </div>

    <div class="row" style="margin-bottom:15px;">
      <div class="col-xs-12">
        <h3>Pagamento:</h3>
      </div>

      <div class="col-sm-4 col-xs-12">
        <FormSelect  label="Forma de Pagamento" 
                    icon="fa-money-bill" 
                    id="proposal.petInsuranceData.paymentMethod"
                    :validationMessage="validation.firstError('proposal.petInsuranceData.paymentMethod')"
                    v-model="proposal.petInsuranceData.paymentMethod" 
                    :options="['Boleto', 'Cartão de Crédito', 'Débito em Conta']" />
      </div>
    </div>

    <div class="row" style="margin-bottom:15px;">
      <div class="col-xs-12">
        <CallToAction className='pull-right' v-on:click="submitProposal">
          <i class="fas fa-flag-checkered"/>
          &nbsp; Finalizar
        </CallToAction>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect.vue";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import CallToAction from "@/components/CallToAction.vue";
import apiClientProvider from "@/providers/apiClientProvider";

export default {
  name: "FullProposalData",
  data() {
    return {};
  },
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  watch: {
    "proposal.proposer.homeAddress.zipCode": function(value) {
      console.log("value", value);
      this.getAddressByZipCode(value);
    }
  },
  methods: {
    getAddressByZipCode: function(zipCode) {
      apiClientProvider
        .getAddressByZipCode(zipCode)
        .then(address => {
          this.proposal.proposer.homeAddress.street = address.street;
          this.proposal.proposer.homeAddress.complement = address.complement;
          this.proposal.proposer.homeAddress.neighborhood =
            address.neighborhood;
          this.proposal.proposer.homeAddress.city = address.city;
          this.proposal.proposer.homeAddress.state = address.state;
        })
        .catch(err => {
          console.error(err);
        });
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
    submitProposal: async function() {
      const isValid = await this.$validate();
      if (isValid) {
        this.$emit("submitProposal", this.proposal);
      }
    }
  },
  validators: {
    "proposal.proposer.name": value => validator.validateClientName(value),
    "proposal.proposer.email": value => validator.validateEmail(value),
    "proposal.proposer.cpf": value => validator.validateCpf(value),
    "proposal.proposer.homeAddress.street": value =>
      validator.validateHomeAddressStreet(value),
    "proposal.proposer.homeAddress.number": value =>
      validator.validateHomeAddressNumber(value),
    "proposal.proposer.homeAddress.zipCode": value =>
      validator.validateZipCode(value),
    "proposal.proposer.homeAddress.state": value =>
      validator.validateHomeAddressState(value),
    "proposal.proposer.homeAddress.city": value =>
      validator.validateHomeAddressCity(value),
    "proposal.proposer.dateOfBirth": value =>
      validator.validateDateOfBirth(value),
    "proposal.petInsuranceData.dateOfBirth": value =>
      validator.validatePetDateOfBirth(value),
    "proposal.proposer.phones.0.areaCode": value =>
      validator.validatePhoneAreaCode(value),
    "proposal.proposer.phones.0.number": value =>
      validator.validatePhoneNumber(value),
    "proposal.petInsuranceData.gender": value =>
      validator.validatePetGender(value),
    "proposal.petInsuranceData.specie": value =>
      validator.validatePetSpecie(value)
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

    if (!this.proposal.proposer.dateOfBirth) {
      this.proposal.proposer.dateOfBirth = "";
    }

    if (!this.proposal.petInsuranceData.dateOfBirth) {
      this.proposal.petInsuranceData.dateOfBirth = "";
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

    this.getAddressByZipCode(this.proposal.proposer.homeAddress.zipCode);
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
