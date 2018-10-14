<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex md12>
        <v-text-field 
                label="Usuário"
                id="partner.name"
                :error="!!(validation.firstError('partner.name'))"
                :error-messages="validation.firstError('partner.name')"
                mask="####"
                v-model="partner.name"/>   
      </v-flex>

    </v-layout> 

    <v-layout align-start justify-end row fill-height v-if="partnerType">
        <CallToAction v-on:click="Submit">Próximo</CallToAction>
    </v-layout>

  </v-container>
</template>

<script>
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/utils/apiClient";

let self = null;

export default {
  name: "BasicPartnerForm",
  data() {
    return {
      loading: false,
      partnerType: null,
      partner: {
        name: "",
        email: "",
        dateOfBirth: "",
        phones: [
          {
            areaCode: "",
            number: "",
            fullNumber: ""
          }
        ],
        companyAddress: {
          city: "",
          complement: "",
          neighborhood: "",
          number: "",
          state: "",
          street: "",
          zipCode: ""
        }
      },
      disabledInput: {
        city: true,
        neighborhood: true,
        number: true,
        state: true,
        street: true
      }
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      }
    },
    partnerNameLabel: {
      get() {
        if (!this.partnerType) {
          return "";
        }
        if (this.partnerType.value) {
          return "Razão Social";
        } else {
          return "Nome";
        }
      }
    }
  },
  methods: {
    Submit: async function() {
      const isValid = await validator.validatePage(this);
      if (!isValid) {
        return;
      }
      this.$emit("submit", null);
    }
  },
  validators: {
    "partner.name": value => validator.validateClientName(value),
    "partner.document": value => {
      if (self.partnerType.value) 
        return validator.validateCnpj(value);
      
      return validator.validateCpf(value);
    },
    "partner.email": value => validator.validateEmail(value)
  },
  beforeMount() {
    self = this
  },
  components: {
    CallToAction: CallToAction
  }
};
</script>

<style scoped>
.form-line {
  margin-left: 0px;
}
</style>
