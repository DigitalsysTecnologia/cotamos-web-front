<template>
  <div>
    <Input
      label="Nome do PET"
      id="petInsuranceData.name"
      :validationMessage="validation.firstError('petInsuranceData.name')"
      v-model="petInsuranceData.name"
    />
    <DateInput
      label="Data de nascimento do Pet"
      id="petInsuranceData.dateOfBirth"
      type="text"
      :validationMessage="validation.firstError('petInsuranceData.dateOfBirth')"
      v-model="petInsuranceData.dateOfBirth"
    />

    <div class="columns">
      <div class="column is-half">
        <Radio 
          groupName="petInsuranceData.gender" 
          :items="[{text:'Macho', value: 'Macho'}, {text:'Fêmea', value: 'Fêmea'}]" 
          label="Sexo do Pet" 
          v-model="petInsuranceData.gender" 
          :validationMessage="validation.firstError('petInsuranceData.gender')"
          :sameLine="true" />
      </div>
      <div class="column is-half">
        <Radio 
          groupName="petInsuranceData.specie" 
          :items="[{text:'Canino', value: 'Canino'}, {text:'Felino', value: 'Felino'}]" 
          label="Espécie do Pet" 
          :validationMessage="validation.firstError('petInsuranceData.specie')"
          v-model="petInsuranceData.specie" 
          :sameLine="true"/>      
      </div>
    </div>

    <div class="columns">
      <div class="column is-narrow">
        <Button textColor="white" backgroundColor="#00899c" @click="onSubmit">{{ submitButtonText }}</Button>
      </div>
      <div class="column is-narrow">
        <Button @click="onCancel" v-if="showCancelButton">{{ cancelButtonText }}</Button>
      </div>
    </div>
  </div>
</template>

<script>
import DateInput from "@/components/Form/DateInput";
import Radio from "@/components/Form/Radio";
import PhoneInput from "@/components/Form/PhoneInput.vue";
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "PetInsuranceData",
  data() {
    return {};
  },
  props: {
    petInsuranceData: {
      type: Object,
      required: true
    },
    showCancelButton: {
      type: Boolean,
      required: false,
      default: false
    },
    cancelButtonText: {
      type: String,
      required: false,
      default: "Cancelar"
    },
    submitButtonText: {
      type: String,
      required: false,
      default: "Continuar"
    }
  },
  methods: {
    onCancel: async function() {
      this.$emit("onCancel");
    },
    onSubmit: async function() {
      const isValid = await this.$validate();
      if (isValid) {
        this.$emit("onSubmit", this.proposal);
      }
    }
  },
  validators: {
    "petInsuranceData.gender": value => validator.validatePetGender(value),
    "petInsuranceData.specie": value => validator.validatePetSpecie(value)
  },
  components: {
    DateInput,
    PhoneInput,
    Button,
    Input,
    Radio
  }
};
</script>

<style scoped>
</style>
