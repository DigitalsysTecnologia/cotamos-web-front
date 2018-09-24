<template>
  <div>
    <div class="row form-container text-left">
      <div class="col-xs-12 col-sm-6">
        <FormInput label="Nome do Cliente"
                   icon="fa-user" 
                   id="proposalFilter.proposer.name"
                   v-model="proposalFilter.proposer.name"/>
      </div>

      <div class="col-xs-12 col-sm-6">
        <FormInput label="CPF"
                   icon="fa-user" 
                   id="proposalFilter.proposer.cpf"
                   mask="###.###.###-##"
                   v-model="proposalFilter.proposer.cpf"/>
      </div>
      
      <div class="col-xs-12 col-sm-6">
        <FormInput label="E-mail"
                   icon="fa-at" 
                   id="proposalFilter.proposer.email"
                   v-model="proposalFilter.proposer.email"/>
      </div>
     

      <div class="col-xs-12">
        <CallToAction className='pull-left' v-on:click="searchProposals">
          Buscar Propostas
        </CallToAction>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import FormInput from "@/components/FormInput";
import DateInput from "@/components/DateInput";
import FormSelect from "@/components/FormSelect";
import PhoneInput from "@/components/PhoneInput.vue";
import validator from "@/utils/validator";
import CallToAction from "@/components/CallToAction";
import apiClient from "@/utils/apiClient";
export default {
  name: "ProposalFilter",
  data() {
    return {
      proposalFilter: {
        proposer: {
          name: "",
          cpf: "",
          email: ""
        }
      }
    };
  },
  methods: {
    searchProposals: async function() {
      this.loading = true;
      
      this.$emit("loading");
      const proposals = await apiClient.getProposalsByFilter(this.proposalFilter);

      this.$emit("searchProposals", proposals);
      this.loading = false;
    }
  },
  components: {
    FormInput: FormInput,
    PhoneInput: PhoneInput,
    DateInput: DateInput,
    FormSelect: FormSelect,
    CallToAction: CallToAction,
    Loading: Loading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-line {
  margin-left: 0px;
}
.form-container {
  margin-left: 1px;
  margin-right: 1px;
  padding-top: 10px;
  padding-bottom: 20px;
}
</style>
