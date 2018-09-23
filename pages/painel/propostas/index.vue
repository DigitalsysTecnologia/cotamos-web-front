<template>
  <div>
    <div class="row text-center">
      <div class="col-md-12">
        <h1>Painel de Propostas</h1>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <label>Buscar (Por nome, email ou telefone):</label>
        <input type="text" id="name" v-model="searchField"/>
      </div>
    </div>

    <ProposalList :proposals="proposalList"/>
  </div>
</template>

<script>
import apiClient from "@/utils/apiClient";
import ProposalList from "../components/ProposalList.vue";
import sessionHelper from "@/utils/sessionHelper"
export default {
  name: "Proposals",
  layout: "panel",
  async mounted() {
    await sessionHelper.checkSession(this)
  },
  data() {
    return {
      proposalList: [],
      searchField: ''
    };
  },
  components: {
    ProposalList: ProposalList
  },
  async beforeMount() {
    const payload = {};
    this.proposalList = await apiClient.getProposalByFilter(payload);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
