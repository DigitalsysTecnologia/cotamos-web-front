<template>
          <FormInput  :label="label" 
                      :icon="icon" 
                      :id="id"
                      mask="##/##/####"
                      maxLength=10
                      type="text"
                      @input="updateValue()"
                      ref="inputValue"
                      :validationMessage="validationMessage"
                      v-model="dateInputValue" />
</template>

<script>
import StringMask from "string-mask";
import FormInput from "@/components/FormInput";
import moment from "moment-timezone";

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

    const isValidDate = this.isValidDate(this.value);

    if (!isValidDate) {
      return this.dateInputValue;
    }

    const parsedDate = this.parseDate(this.value);
    const result = parsedDate.format("DD/MM/YYYY");

    this.dateInputValue = result;
  },
  data() {
    return {
      dateInputValue: ""
    };
  },
  computed: {
    formattedDate: {
      get() {
        console.log("this.dateInputValue", this.dateInputValue);
        if (!this.dateInputValue) {
          return this.dateInputValue;
        }

        const isValidDate = this.isValidDate(this.dateInputValue);

        if (!isValidDate) {
          return this.dateInputValue;
        }

        const parsedDate = this.parseDate(this.dateInputValue);
        const result = parsedDate.format("DD/MM/YYYY");

        console.log("get()", result);
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
      } 
      else {
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
