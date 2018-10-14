<template>
  <v-container fluid>
    
    <v-layout row wrap>
      <v-flex md6>
        <v-combobox
              v-model="computedBankNumber"
              :items="bankList"
              :error="!!(validation.firstError('bankingData.bankNumber'))"
              :error-messages="validation.firstError('bankingData.bankNumber')"
              label="Banco" />
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex md3>
        <v-text-field 
                label="Agência"
                id="bankingData.branch"
                :error="!!(validation.firstError('bankingData.branch'))"
                :error-messages="validation.firstError('bankingData.branch')"
                mask="####"
                v-model="bankingData.branch"/>
      </v-flex>

      <v-flex md6 offset-md1>
        <v-text-field 
                label="Conta-Corrente"
                id="bankingData.account"
                :error="!!(validation.firstError('bankingData.account'))"
                :error-messages="validation.firstError('bankingData.account')"
                mask="########"
                v-model="bankingData.account"/>
      </v-flex>
    </v-layout> 

    <v-layout align-start justify-end row fill-height >
        <CallToAction v-on:click="submitData">Finalizar Cadastro</CallToAction>
    </v-layout>

  </v-container>
</template>

<script>
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction";
import factory from "@/utils/factory";

export default {
  name: "BankingData",
  data() {
    return {
      currentBank: null
    };
  },
  props: {
    bankingData: {
      type: Object,
      required: true
    }
  },
  computed: {
    computedBankNumber: {
      get() {
        return this.currentBank;
      },
      set(comboValue) {
        this.bankingData.bankNumber = comboValue.value;
        this.currentBank = comboValue;
      }
    },
    bankList: {
      get() {
        return factory.getBankList();
      }
    }
  },
  methods: {
    submitData: async function() {
      const isValid = await validator.validatePage(this);

      if (!isValid) {
        return;
      }
      this.$emit("submit", null);
    }
  },
  validators: {
    "bankingData.bankNumber": value => validator.validateBankNumber(value),
    "bankingData.branch": value => validator.validateBankBranch(value),
    "bankingData.account": value => validator.validateBankAccount(value)
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
