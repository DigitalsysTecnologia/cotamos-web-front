<template>
  <div>
    <Input
      label="CEP"
      type="text"
      id="address.zipCode"
      :validationMessage="validation.firstError('address.zipCode')"
      mask="#####-###"
      v-model.trim="address.zipCode"
    />
    <Input
      label="UF"
      id="address.state"
      :validationMessage="validation.firstError('address.state')"
      v-model="address.state"
    />
    <Input
      label="Cidade"
      id="address.city"
      :validationMessage="validation.firstError('address.city')"
      v-model.trim.lazy="address.city"
    />
    <Input
      label="Logradouro"
      id="address.street"
      :validationMessage="validation.firstError('address.street')"
      v-model.trim.lazy="address.street"
    />
    <Input
      label="Número"
      id="address.number"
      :validationMessage="validation.firstError('address.number')"
      v-model.trim.lazy="address.number"
    />

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
import Input from "@/components/Form/Input";
import Button from "@/components/Form/Button";
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "AddressData",
  data() {
    return {};
  },
  props: {
    address: {
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
  watch: {
    "address.zipCode": function(value) {
      this.getAddressByZipCode(value);
    }
  },
  methods: {
    getAddressByZipCode: function(zipCode) {
      if (!zipCode || zipCode.length < 8) {
        return;
      }

      apiClientProvider
        .getAddressByZipCode(zipCode)
        .then(address => {
          this.address.street = address.street;
          this.address.complement = address.complement;
          this.address.neighborhood = address.neighborhood;
          this.address.city = address.city;
          this.address.state = address.state;
        })
        .catch(err => {});
    },
    onCancel: async function() {
      this.$emit("onCancel");
    },
    onSubmit: async function() {
      console.log("onSubmit");
      const isValid = await this.$validate();

      console.log("this.address", this.address);
      if (isValid) {
        this.$emit("onSubmit", this.address);
      }
    }
  },
  validators: {
    "address.street": value => validator.validateHomeAddressStreet(value),
    "address.number": value => validator.validateHomeAddressNumber(value),
    "address.zipCode": value => validator.validateZipCode(value),
    "address.state": value => validator.validateHomeAddressState(value),
    "address.city": value => validator.validateHomeAddressCity(value)
  },
  components: {
    Input,
    Button
  }
};
</script>

<style scoped>
</style>
