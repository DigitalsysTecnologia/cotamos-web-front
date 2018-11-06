<template>
  <v-container>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12>
        <h2 class="subtitle text-center">Painel de Propostas</h2>
      </v-flex>
      <v-flex xs12>
        <v-btn color="primary" :block="true" @click="toggleShowFilter">
          {{ showFilter ? "Ocultar Filtro de Propostas" : "Exibir Filtro de Propostas" }}
        </v-btn>
        <ProposalFilter v-on:searchProposals="searchProposals" :proposalFilter="proposalFilter" v-if="showFilter"/>
      </v-flex>
      <v-flex xs12 mt-4>
        <ProposalList :filterResult="proposalFilterResult" v-if="proposalFilterResult" v-on:onChangePagination="onChangePagination" :loading="isLoading" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import apiClient from "@/utils/apiClient";
  import ProposalList from "../components/ProposalList";
  import ProposalFilter from "../components/ProposalFilter";
  import sessionHelper from "@/utils/sessionHelper";
  import Loading from "@/components/Loading";
  export default {
    layout: "panel",
    name: "Proposals",
    async mounted() {},
    data() {
      return {
        proposalFilter: {
          proposer: {
            name: "",
            cpf: "",
            email: ""
          },
          pageIndex: 1,
          pageSize: 5
        },
        proposalFilterResult: null,
        showFilter: false,
        loading: false
      };
    },
    methods: {
      toggleShowFilter() {
        this.showFilter = !this.showFilter;
      },
      async onChangePagination(pageNumber) {
        this.proposalFilter.pageIndex = pageNumber;
        this.loading = true;
        this.proposalFilterResult = await apiClient.getProposalsByFilter(this.proposalFilter);
        this.loading = false;
      },
      async searchProposals(proposalFilter) {
        this.loading = true;
        this.proposalFilter = proposalFilter;
        this.proposalFilterResult = await apiClient.getProposalsByFilter(this.proposalFilter);
        this.loading = false;
      },
      loadingProposals() {
        this.loading = true;
      }
    },
    computed: {
      isLoading: {
        get() {
          return this.loading;
        }
      },
      Proposals: {
        get() {
          return this.proposalFilterResponse.proposals;
        }
      }
    },
    components: {
      ProposalList: ProposalList,
      ProposalFilter: ProposalFilter,
      Loading: Loading
    },
    async created() {
      this.proposalFilterResult = await apiClient.getProposalsByFilter(this.proposalFilter);
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .subtitle {
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 800;
    color: #00899c;
    margin-top: 0px;
    text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
  }
  
  .form-container {
    border: 2px solid rgb(5, 62, 66);
    border-radius: 20px;
    background-color: white;
  }
  
  .result-table {
    margin-top: 15px;
  }
</style>
