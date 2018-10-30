<template>
    <v-layout justify-top>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex sm12>
            <h3 class="subtitle">Vamos obter os dados finais para finalizar sua proposta</h3>

            <v-text-field 
                    label="Nome"
                    id="proposal.proposer.name"
                    :error="!!(validation.firstError('proposal.proposer.name'))"
                    :error-messages="validation.firstError('proposal.proposer.name')"
                    v-model.trim="proposal.proposer.name" />
            <DateInput  label="Data de nascimento" 
                icon="fa-calendar" 
                id="proposal.proposer.dateOfBirth"
                type="text"
                :validationMessage="validation.firstError('proposal.proposer.dateOfBirth')"
                v-model="proposal.proposer.dateOfBirth" />
            <v-text-field 
                    label="E-mail" 
                    id="proposal.proposer.email"
                    :error="!!(validation.firstError('proposal.proposer.email'))"
                    :error-messages="validation.firstError('proposal.proposer.email')"
                    v-model.trim="proposal.proposer.email" />
            <PhoneInput label="Celular ou Telefone" 
                        id="proposal.proposer.phones.0"
                        maxLength="15"
                        :validationMessage="validation.firstError('proposal.proposer.phones.0')"
                        v-model.trim="proposal.proposer.phones[0]" />                        
            <v-text-field 
                    label="CPF" 
                    id="proposal.proposer.cpf"
                    :error="!!(validation.firstError('proposal.proposer.cpf'))"
                    :error-messages="validation.firstError('proposal.proposer.cpf')"
                    mask="###.###.###-##"
                    v-model.trim="proposal.proposer.cpf"/>
            <v-text-field
                      label="CEP" 
                      type="text"
                      id="proposal.proposer.homeAddress.zipCode"
                      :error="!!(validation.firstError('proposal.proposer.homeAddress.zipCode'))"
                      :error-messages="validation.firstError('proposal.proposer.homeAddress.zipCode')"
                      mask="#####-###"
                      v-model.trim="proposal.proposer.homeAddress.zipCode" />
            <v-text-field  label="UF" 
                      id="proposal.proposer.homeAddress.state"
                      :error="!!(validation.firstError('proposal.proposer.homeAddress.state'))"
                      :error-messages="validation.firstError('proposal.proposer.homeAddress.state')"
                      v-model="proposal.proposer.homeAddress.state" />
            <v-text-field
                      label="Cidade" 
                      id="proposal.proposer.homeAddress.city"
                      :error="!!(validation.firstError('proposal.proposer.homeAddress.city'))"
                      :error-messages="validation.firstError('proposal.proposer.homeAddress.city')"
                      v-model.trim.lazy="proposal.proposer.homeAddress.city" />
            <v-text-field
                      label="Logradouro" 
                      id="proposal.proposer.homeAddress.street"
                      :error="!!(validation.firstError('proposal.proposer.homeAddress.street'))"
                      :error-messages="validation.firstError('proposal.proposer.homeAddress.street')"
                      v-model.trim.lazy="proposal.proposer.homeAddress.street" />
            <v-text-field  label="Número" 
                      id="proposal.proposer.homeAddress.number"
                      :error="!!(validation.firstError('proposal.proposer.homeAddress.number'))"
                      :error-messages="validation.firstError('proposal.proposer.homeAddress.number')"
                      v-model.trim.lazy="proposal.proposer.homeAddress.number" />
            <h3 class="subtitle">Dados de seu Pet:</h3>
            <v-text-field 
                      label="Nome do PET"
                      id="proposal.petInsuranceData.name"
                      :error="!!(validation.firstError('proposal.petInsuranceData.name'))"
                      :error-messages="validation.firstError('proposal.petInsuranceData.name')"
                      v-model="proposal.petInsuranceData.name" />
          <DateInput label="Data de nascimento do Pet" 
                      icon="fa-calendar" 
                      id="proposal.petInsuranceData.dateOfBirth"
                      type="text"
                      :validationMessage="validation.firstError('proposal.petInsuranceData.dateOfBirth')"
                      v-model="proposal.petInsuranceData.dateOfBirth" />
          <v-radio-group v-model="proposal.petInsuranceData.gender" label="Sexo do Pet" 
                    :error="!!(validation.firstError('proposal.petInsuranceData.specie'))"
                    :error-messages="validation.firstError('proposal.petInsuranceData.specie')">
                    <v-radio key="Macho" label="Macho" value="Macho" color="primary" />
                    <v-radio key="Fêmea" label="Fêmea" value="Fêmea" color="primary" />
          </v-radio-group>
          <v-radio-group label="Espécie do Pet" v-model="proposal.petInsuranceData.specie"
                    :error="!!(validation.firstError('proposal.petInsuranceData.specie'))"
                    :error-messages="validation.firstError('proposal.petInsuranceData.specie')">
                  <v-radio key="Canino" label="Canino" value="Canino" color="primary" />
                  <v-radio key="Felino" label="Felino" value="Felino" color="primary"/>
          </v-radio-group>
          <v-radio-group label="Forma de Pagamento"  v-model="proposal.petInsuranceData.specie"
                  :error="!!(validation.firstError('proposal.petInsuranceData.paymentMethod'))"
                  :error-messages="validation.firstError('proposal.petInsuranceData.paymentMethod')">
                <v-radio key="Boleto" label="Boleto" value="Boleto" color="primary" />
                <v-radio key="Cartão de Crédito" label="Cartão de Crédito" value="Cartão de Crédito" color="primary"/>
                <v-radio key="Débito em Conta" label="Débito em Conta" value="Débito em Conta" color="primary"/>
          </v-radio-group>                    
        <CallToAction className='pull-right' v-on:click="submitProposal">
          <i class="fas fa-flag-checkered"/>
          &nbsp; Finalizar
        </CallToAction>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FormInput from "@/components/FormInput";
import DateInput from "@/components/DateInput";
import PhoneInput from "@/components/PhoneInput.vue";
import FormSelect from "@/components/FormSelect.vue";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import CallToAction from "@/components/CallToAction.vue";
import apiClientProvider from "@/utils/apiClient";

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
        .catch(err => {});
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

    // if (!this.proposal.proposer.dateOfBirth) {
    //   this.proposal.proposer.dateOfBirth = null;
    // }

    // if (!this.proposal.petInsuranceData.dateOfBirth) {
    //   this.proposal.petInsuranceData.dateOfBirth = null;
    // }

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
    DateInput: DateInput,
    PhoneInput: PhoneInput,
    FormSelect: FormSelect,
    CallToAction: CallToAction,
    Header: Header,
    Footer: Footer
  }
};
</script>

<style scoped>
</style>
