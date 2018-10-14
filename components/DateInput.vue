<template>
  <v-text-field  :label="label" 
              :icon="icon" 
              :id="id"
              mask="##/##/####"
              :return-masked-value="true"
              maxLength=10
              type="text"
              @input="updateValue()"
              :error="!!(validation.firstError('dateInputValue') || validationMessage)"
              :error-messages="validation.firstError('dateInputValue') || validationMessage"
              v-model="dateInputValue" />
</template>

<script>
import StringMask from "string-mask";
import FormInput from "@/components/FormInput";
import moment from "moment-timezone";
import validator from "@/utils/validator";

export default {
  name: "DateInput",
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

    // Caso seja a data inicial da API, não mostra isso
    if (this.value === "0001-01-01T00:00:00Z") {
      return;
    }

    const isValidDate = this.isValidDate(this.value);

    if (!isValidDate) {
      return this.dateInputValue;
    }

    const parsedDate = this.parseDate(this.value);
    const result = parsedDate.format("DD/MM/YYYY");

    this.dateInputValue = result;
  },
  validators: {
    dateInputValue: value => {
      return validator.validateDate(value)
    }
  },
  data() {
    return {
      dateInputValue: ""
    };
  },
  computed: {
    formattedDate: {
      get() {
        if (!this.dateInputValue) {
          return this.dateInputValue;
        }

        const isValidDate = this.isValidDate(this.dateInputValue);

        if (!isValidDate) {
          return this.dateInputValue;
        }

        const parsedDate = this.parseDate(this.dateInputValue);
        const result = parsedDate.format("DD/MM/YYYY");

        return result;
      }
    }
  },
  components: {
    FormInput: FormInput
  },
  methods: {
    async updateValue(truncate) {
      let result;

      if (this.dateInputValue.length !== 10) {
        result = this.dateInputValue;
      } else {
        let parsedDate = moment.tz(
          this.dateInputValue,
          "DD/MM/YYYY",
          "America/Sao_Paulo"
        );
        result = parsedDate.format();
      }

      this.$emit("input", result);
    },
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
