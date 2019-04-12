<template>
  <div>
    <VInput
      label="CEP"
      type="text"
      id="address.zipCode"
      :validationMessage="validation.firstError('address.zipCode')"
      mask="#####-###"
      v-model.trim="address.zipCode"
    />
    <VInput
      label="UF"
      id="address.state"
      :validationMessage="validation.firstError('address.state')"
      v-model="address.state"
    />
    <VInput
      label="Cidade"
      id="address.city"
      :validationMessage="validation.firstError('address.city')"
      v-model.trim.lazy="address.city"
    />
    <VInput
      label="Logradouro"
      id="address.street"
      :validationMessage="validation.firstError('address.street')"
      v-model.trim.lazy="address.street"
    />
    <VInput
      label="Número"
      id="address.number"
      :validationMessage="validation.firstError('address.number')"
      v-model.trim.lazy="address.number"
    />
  </div>
</template>

<script>
import VInput from "@/components/atoms/VInput";
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
    VInput
  }
};
</script>

<style scoped>
</style>
