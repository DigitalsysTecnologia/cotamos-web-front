<template>
  <v-container fluid>
    <v-layout row wrap>
      
      <v-flex md6>
        <v-combobox
              v-model="partnerType"
              :items="[
                        {value: 0, text: 'Sou uma pessoa física'}, 
                        {value: 1, text: 'Sou uma pessoa jurídica'}
                        ]"
              label="Tipo de Parceiro" />
      </v-flex>

      <v-flex md12 v-if="partnerType">
        <v-text-field 
                :label="partnerType.value ? 'Razão Social' : 'Nome'"
                icon="fa-user" 
                id="partner.name"
                :error="!!(validation.firstError('partner.name'))"
                :error-messages="validation.firstError('partner.name')"
                v-model="partner.name"/>        
      </v-flex>

      <v-flex md12 v-if="partnerType">
        <v-text-field 
                :label="partnerType.value ? 'CNPJ' : 'CPF'"
                :mask="partnerType.value ? '##.###.###/####-##' : '###.###.###-##'"
                id="partner.document"
                type="text"
                :error="!!(validation.firstError('partner.document'))"
                :error-messages="validation.firstError('partner.document')"
                v-model="partner.document" />
      </v-flex>

      <v-flex md12 v-if="partnerType">
        <v-text-field  label="E-mail" 
                id="partner.email"
                type="text"
                :error="!!(validation.firstError('partner.email'))"
                :error-messages="validation.firstError('partner.email')"
                v-model="partner.email" />
      </v-flex>

      <v-flex md12 v-if="partnerType">
        <v-checkbox 
                    color="primary" 
                    v-model="agreeTermsAndConditions" 
                    :error-messages="validation.firstError('agreeTermsAndConditions')" >
           <span slot="label">Li os <a href="/docs/contrato_parceria_v1.pdf">Termos e condições de uso</a> e estou ciente.</span>
        </v-checkbox>
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
  props: {
    partner: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      partnerType: null,
      agreeTermsAndConditions: null,
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
      if (self.partnerType.value) return validator.validateCnpj(value);

      return validator.validateCpf(value);
    },
    "partner.email": value => validator.validateEmail(value),
    "agreeTermsAndConditions": value => validator.validateTermsAndConditions(value)
  },
  beforeMount() {
    self = this;
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
