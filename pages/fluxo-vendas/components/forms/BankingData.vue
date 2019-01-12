 <template>
  <v-layout row wrap style="margin: initial;">
    <v-flex sm12 xs12>
      <v-select
        :items="[{text:'Itaú', value: '341'}, {text:'Santander', value: '033'}]"
        label="Banco"
        id="proposal.proposer.bankingData.bankNumber"
        v-model="proposal.proposer.bankingData.bankNumber"
        :error="!!(validation.firstError('proposal.proposer.bankingData.bankNumber'))" 
        :error-messages="validation.firstError('proposal.proposer.bankingData.bankNumber')"
        item-text="text"
        item-value="value"
      />
    </v-flex>
    <v-flex sm6 xs12>
      <v-text-field
        label="Agência (Sem Dígito)"
        id="proposal.proposer.bankingData.branch"
        :error="!!(validation.firstError('proposal.proposer.bankingData.branch'))" 
        :error-messages="validation.firstError('proposal.proposer.bankingData.branch')"
        mask="######"
        v-model="proposal.proposer.bankingData.branch"
      />
    </v-flex>
    <v-flex sm6 xs12>
      <v-text-field
        label="Conta-Corrente (Com Dígito)"
        mask="###########"
        id="proposal.proposer.bankingData.account"
        :error="!!(validation.firstError('proposal.proposer.bankingData.account'))" 
        :error-messages="validation.firstError('proposal.proposer.bankingData.account')"
        v-model="proposal.proposer.bankingData.account"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "BankingData",
  data() {
    return {
      plans: null
    };
  },
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  methods: {},
  validators: {
    "proposal.proposer.bankingData.bankNumber": value =>
      validator.validateBankNumber(value),
    "proposal.proposer.bankingData.branch": value =>
      validator.validateBankBranch(value),
    "proposal.proposer.bankingData.account": value =>
      validator.validateBankAccount(value)
  }
};
</script>

<style scoped>
</style>
