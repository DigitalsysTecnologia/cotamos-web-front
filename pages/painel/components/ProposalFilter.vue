<template>
  <v-layout row wrap>
    <v-flex sm12 xs12>
      <v-card>
        <div style="padding:20px;">
          <v-text-field label="Nome do Cliente" id="proposalFilter.proposer.name" v-model.trim="proposalFilter.proposer.name" />
          <v-text-field label="CPF do Cliente" mask="###.###.###-##" id="proposalFilter.proposer.cpf" v-model.trim="proposalFilter.proposer.cpf" />
          <v-text-field label="E-Mail do Cliente" id="proposalFilter.proposer.email" v-model.trim="proposalFilter.proposer.email" />
          <v-text-field label="Propostas por Página" id="proposalFilter.pageSize" type="number"  v-model="proposalFilter.pageSize" />
          <v-btn color="primary" @click="searchProposals"> Buscar Propostas</v-btn>
        </div>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import apiClient from "@/utils/apiClient";
  export default {
    name: "ProposalFilter",
    data() {
      return {}
    },
    props: {
      proposalFilter: {
        type: Object,
        required: true
      }
    },
    methods: {
      searchProposals: async function() {
        let objClone = JSON.parse(JSON.stringify(this.proposalFilter));
        objClone.pageIndex = 1;
        objClone.pageSize = parseInt(objClone.pageSize);

        console.log('objClone', objClone);
        this.$emit("searchProposals", objClone);
      }
    },
    components: {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
