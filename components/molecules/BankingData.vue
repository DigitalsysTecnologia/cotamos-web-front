 <template>
  <div class="columns">
    <div class="column is-one-third">
      <VDropDown
        :items="[{text:'Itaú', value: '341'}, {text:'Santander', value: '33'}]"
        label="Banco"
        id="proposal.proposer.bankingData.bankNumber"
        v-model="proposal.proposer.bankingData.bankNumber"
        :validationMessage="validation.firstError('proposal.proposer.bankingData.bankNumber')"
        item-text="text"
        item-value="value"
      />
    </div>

    <div class="column is-one-third">
      <VInput
        label="Agência (Sem Dígito)"
        id="proposal.proposer.bankingData.branch"
        :validationMessage="validation.firstError('proposal.proposer.bankingData.branch')"
        mask="######"
        v-model="proposal.proposer.bankingData.branch"
      />
    </div>

    <div class="column is-one-third">
      <VInput
        label="Conta-Corrente (Com Dígito)"
        mask="###########"
        id="proposal.proposer.bankingData.account"
        :validationMessage="validation.firstError('proposal.proposer.bankingData.account')"
        v-model="proposal.proposer.bankingData.account"
      />
    </div>
  </div>
</template>

<script>
import VDropDown from "@/components/atoms/VDropDown";
import VInput from "@/components/atoms/VInput";
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
  },
  components: {
    VDropDown,
    VInput
  }
};
</script>

<style scoped>
</style>
