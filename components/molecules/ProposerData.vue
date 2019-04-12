<template>
  <div>
    <VInput
      label="Nome"
      id="proposer.name"
      :error="!!(validation.firstError('proposer.name'))"
      :error-messages="validation.firstError('proposer.name')"
      v-model.trim="proposer.name"
      v-if="showField['proposer.name']"
    />
    <VDateInput
      label="Data de nascimento"
      id="proposer.dateOfBirth"
      type="text"
      :validationMessage="validation.firstError('proposer.dateOfBirth')"
      v-model="proposer.dateOfBirth"
      v-if="showField['proposer.dateOfBirth']"
    />
    <VInput
      label="E-mail"
      id="proposer.email"
      :error="!!(validation.firstError('proposer.email'))"
      :error-messages="validation.firstError('proposer.email')"
      v-model.trim="proposer.email"
      v-if="showField['proposer.email']"
    />
    <VPhoneInput
      label="Celular ou Telefone"
      id="proposer.phones.0"
      maxlength="15"
      :validationMessage="validation.firstError('proposer.phones.0')"
      v-model.trim="proposer.phones[0]"
    />
    <VInput
      label="CPF"
      id="proposer.cpf"
      :validationMessage="validation.firstError('proposer.cpf')"
      mask="###.###.###-##"
      v-model.trim="proposer.cpf"
    />
  </div>
</template>

<script>
import VDateInput from "@/components/atoms/VDateInput";
import VPhoneInput from "@/components/atoms/VPhoneInput";
import VInput from "@/components/atoms/VInput";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "ProposerData",
  data() {
    return {
      showField: []
    };
  },
  props: {
    proposer: {
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
        this.$emit("onSubmit", this.proposer);
      }
    }
  },
  beforeMount() {
    if (!this.proposer.name) {
      this.proposer.name = "";
      this.showField["proposer.name"] = true;
    }

    if (!this.proposer.dateOfBirth) {
      this.proposer.dateOfBirth = "";
      this.showField["proposer.dateOfBirth"] = true;
    }

    if (!this.proposer.email) {
      this.proposer.email = "";
      this.showField["proposer.email"] = true;
    }

    if (!this.proposer.cpf) {
      this.proposer.cpf = "";
      this.showField["proposer.cpf"] = true;
    }
  },
  validators: {
    "proposer.name": value => validator.validateClientName(value),
    "proposer.dateOfBirth": value => validator.validateDateOfBirth(value),
    "proposer.email": value => validator.validateEmail(value),
    "proposer.cpf": value => validator.validateCpf(value)
  },
  components: {
    VDateInput,
    VPhoneInput,
    VInput
  }
};
</script>

<style scoped>
</style>
