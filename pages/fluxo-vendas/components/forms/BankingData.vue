 <template>
  <div class="columns">
    <div class="column is-one-third">
      <DropDown
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
      <Input
        label="Agência (Sem Dígito)"
        id="proposal.proposer.bankingData.branch"
        :validationMessage="validation.firstError('proposal.proposer.bankingData.branch')"
        mask="######"
        v-model="proposal.proposer.bankingData.branch"
      />
    </div>

    <div class="column is-one-third">
      <Input
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
import DropDown from "@/components/Form/DropDown";
import Input from "@/components/Form/Input";
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
    DropDown,
    Input
  }
};
</script>

<style scoped>
</style>
