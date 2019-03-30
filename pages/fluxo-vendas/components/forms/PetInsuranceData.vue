<template>
  <div>
    <VInput
      label="Nome do PET"
      id="petInsuranceData.name"
      :validationMessage="validation.firstError('petInsuranceData.name')"
      v-model="petInsuranceData.name"
    />
    <VDateInput
      label="Data de nascimento do Pet"
      id="petInsuranceData.dateOfBirth"
      type="text"
      :validationMessage="validation.firstError('petInsuranceData.dateOfBirth')"
      v-model="petInsuranceData.dateOfBirth"
    />

    <div class="columns">
      <div class="column is-half">
        <VRadio
          groupName="petInsuranceData.gender"
          :items="[{text:'Macho', value: 'Macho'}, {text:'Fêmea', value: 'Fêmea'}]"
          label="Sexo do Pet"
          v-model="petInsuranceData.gender"
          :validationMessage="validation.firstError('petInsuranceData.gender')"
          :sameLine="true"
        />
      </div>
      <div class="column is-half">
        <VRadio
          groupName="petInsuranceData.specie"
          :items="[{text:'Canino', value: 'Canino'}, {text:'Felino', value: 'Felino'}]"
          label="Espécie do Pet"
          :validationMessage="validation.firstError('petInsuranceData.specie')"
          v-model="petInsuranceData.specie"
          :sameLine="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import VDateInput from "@/components/atoms/VDateInput";
import VRadio from "@/components/atoms/VRadio";
import VPhoneInput from "@/components/atoms/VPhoneInput.vue";
import VInput from "@/components/atoms/VInput";
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
    VDateInput,
    VPhoneInput,
    VInput,
    VRadio
  }
};
</script>

<style scoped>
</style>
