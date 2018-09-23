<template>
  <div >
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proposal) in proposals" :key="proposal._id">
            <th scope="row">{{proposal._id}}</th>
            <td>{{proposal.proposer.name}}</td>
            <td>{{proposal.proposer.phones[0]}}</td>
            <td>
              <router-link :to="`/painel/detalhes-proposta/${proposal._id}`" class="btn btn-primary">
                Ver Detalhes
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProposalList",
  props: {
    proposals: {
      type: Array,
      required: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
