<template>
  <div>
    <div class="row text-center">
      <div class="col-md-12">
        <h2 class="subtitle">Painel de Propostas</h2>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-12">
        <div class="form-container">
          <ProposalFilter v-on:searchProposals="searchProposals" v-on:loading="loadingProposals"/>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 result-table" >
        <Loading :messages="['Submetendo proposta,', 'Aguarde um instante por favor...']" v-if="isLoading" />
        <ProposalList :proposals="Proposals" v-else />
      </div>
    </div>
  </div>
</template>

<script>
import apiClient from "@/utils/apiClient";
import ProposalList from "../components/ProposalList";
import ProposalFilter from "../components/ProposalFilter";
import sessionHelper from "@/utils/sessionHelper";
import Loading from "@/components/Loading";
export default {
  name: "Proposals",
  layout: "logged-area",
  async mounted() {
  },
  data() {
    return {
      proposalList: [],
      loading: false
    };
  },
  methods: {
    searchProposals(proposals) {
      this.proposalList = proposals;
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
    Proposals:{
      get(){
        return this.proposalList;
      }
    }
  },
  components: {
    ProposalList: ProposalList,
    ProposalFilter: ProposalFilter,
    Loading:Loading
  },
  async created() {
    const payload = {
      limit: 50
    };
    this.proposalList = await apiClient.getProposalsByFilter(payload);
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
