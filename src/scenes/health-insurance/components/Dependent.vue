<template>
  <div class="row" style="margin-left:  0px; margin-bottom:25px;">
    <div class="col-sm-4 col-xs-12 pd-r">
        <FormInput  label="Nome"
                    icon="fa-user" 
                    id="value.name"
                    v-model="value.name" />
    </div>

    <div class="col-sm-4 col-xs-12 pd-l">
        <FormInput  label="Data de nascimento"
                    icon="fa-calendar" 
                    id="value.dateOfBirth"
                    type="text"
                    v-model="value.dateOfBirth" 
                    :validationMessage="validation.firstError('value.dateOfBirth')"
                    mask="##/##/####"/>
    </div>

    <div class="col-sm-4 col-xs-12 pd-l">
        <button v-on:click="$emit('onRemove')" class="btn btn-danger btn-block" >Remover</button>
    </div>
  </div>
</template>

<script>
import FormInput from "../../../components/FormInput";
import SimpleVueValidation from "simple-vue-validator";
import moment from "moment";

const Validator = SimpleVueValidation.Validator;

export default {
  name: "Dependent",
  methods: {},
  computed: {},
  data() {
    return {};
  },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  validators: {
    "value.name": function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe o seu nome.")
        .minLength(5, "Por favor, nos informe o seu nome.");
    },
    "value.dateOfBirth": function(value) {
      return Validator.value(value)
        .required("Por favor, nos informe a sua data de nascimento.")
        .custom(function() {
          if (value == null) {
            return null;
          }

          if (value.length !== 10) {
            return "Data inválida";
          }

          const dateOfBirth = moment(value, "DD/MM/YYYY");
          if (!dateOfBirth.isValid()) {
            return "Data inválida";
          }

          const now = moment();
          const duration = moment.duration(now.diff(dateOfBirth));
          const ageInYears = duration.asYears();

          if (ageInYears <= 0) {
            return "Data inválida";
          }

          if (ageInYears > 90) {
            return "Data inválida";
          }

          return null;
        });
    }
  },
  components: {
    FormInput
  },
  methods: {
    validate: async function() {
      return this.$validate();
    },
    reset: function() {
      this.validation.reset();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
