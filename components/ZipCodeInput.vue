<template>
          <FormInput  :label="label" 
                      :icon="icon" 
                      :id="id"
                      mask="#####-###"
                      maxLength=9
                      type="text"
                      :validationMessage="validation.firstError('zipCodeValue') || validationMessage"
                      v-model="zipCodeValue" />
</template>

<script>
import StringMask from "string-mask";
import FormInput from "@/components/FormInput";
import apiClientProvider from "@/utils/apiClient";
import moment from "moment-timezone";
import validator from "@/utils/validator";

export default {
  name: "ZipCodeInput",
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: ""
    },
    id: {
      type: String,
      required: false
    },
    validationMessage: {
      type: String,
      default: "",
      required: false
    },
    mask: {
      type: String,
      default: "",
      required: false
    },
    maxLength: {
      type: String,
      default: "",
      required: false
    }
  },
  watch: {
    zipCodeValue: async function(newValue, oldValue) {
      this.$emit("input", newValue);

      let cleanZipCode = this.zipCodeValue.replace(/\D+/g, "");

      if (cleanZipCode.length == 0) {
        this.$emit("onReceived", {
          city: "",
          complement: "",
          neighborhood: "",
          number: "",
          state: "",
          street: "",
        });
      }

      if (cleanZipCode.length != 8) {
        return;
      }

      this.$emit("onWaiting", null);
      const address = await apiClientProvider.getAddressByZipCode(cleanZipCode);
      this.$emit("onReceived", address);
    }
  },
  created() {
    this.zipCodeValue = this.value;
  },
  validators: {
    zipCodeValue: value => {
      return validator.validateZipCode(value);
    }
  },
  data() {
    return {
      zipCodeValue: ""
    };
  },
  components: {
    FormInput: FormInput
  },
  methods: {
    // async updateValue(value) {
    //   if (value == this.zipCodeValue) {
    //     return;
    //   }

    //   console.log("value", value);

    //   //  this.$emit("input", this.zipCodeValue);

    //   let cleanZipCode = this.zipCodeValue.replace(/\D+/g, "");

    //   if (cleanZipCode.length != 8) {
    //     return;
    //   }

    //   // if (this.dateInputValue.length !== 10) {
    //   //   result = this.dateInputValue;
    //   // } else {
    //   //   let parsedDate = moment.tz(
    //   //     this.dateInputValue,
    //   //     "DD/MM/YYYY",
    //   //     "America/Sao_Paulo"
    //   //   );
    //   //   result = parsedDate.format();
    //   // }
    // },
    isValidDate(date) {
      const isDateValid =
        moment(date).isValid() || moment(date, "DD/MM/YYYY").isValid();
      return isDateValid;
    },
    parseDate(date) {
      let parsedDate = moment.tz(date, "America/Sao_Paulo");

      if (parsedDate.isValid()) {
        return parsedDate;
      }

      parsedDate = moment.tz(date, "DD/MM/YYYY", "America/Sao_Paulo");
      if (parsedDate.isValid()) {
        return parsedDate;
      }

      return null;
    }
  }
};
</script>

<style scoped>
</style>
