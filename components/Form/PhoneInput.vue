<template>
  <Input :label="label"
                :icon="icon"
                :id="id"
                :mask="getFullPhoneMask(phoneValue)"
                :maxLength="maxLength || '15'"
                type="text"
                @input="updateValue()"
                ref="input"
                :validationMessage="validation.firstError('phoneValue') || validationMessage"
                v-model="phoneValue" />
</template>

<script>
import StringMask from "string-mask";
import Input from "@/components/Form/Input";
import validator from "@/utils/validator";

export default {
  name: "PhoneInput",
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
      type: Object,
      required: false
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
    type: {
      type: String,
      default: "text",
      required: false
    },
    maskReverse: {
      type: Boolean,
      default: false,
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
    },
    pattern: {
      type: String,
      default: "",
      required: false
    }
  },
  created() {
    if (!this.value) {
      return;
    }

    this.phoneValue = "";
  },
  data() {
    return {
      phoneValue: ""
    };
  },
  validators: {
    'phoneValue': value => {
      return validator.validateFullPhoneNumber(value);
    }
  },
  components: {
    Input
  },
  methods: {
    async updateValue() {
      let cleanValue = this.phoneValue.replace(/\D+/g, "");

      this.$emit("input", {
        areaCode: cleanValue.substring(0, 2),
        number: cleanValue.substring(2)
      });
    },
    getFullPhoneMask: function(phone) {
      let phoneNumber = null;

      if (phone) {
        phoneNumber = phone.replace(/\D/g, "");
      } else {
        phoneNumber = "";
      }

      if (phoneNumber.length <= 9) {
        return "(##) ####-####";
      } else {
        return "(##) #####-####";
      }
    },
    validatePhoneNumber: function(value) {
      return validator.validateFullPhoneNumber(value);
    }
  }
};
</script>

<style scoped>
</style>
