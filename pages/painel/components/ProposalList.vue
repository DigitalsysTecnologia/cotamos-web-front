<template>
  <div >
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Telefone</th>
            <th>E-Mail</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proposal) in proposals" :key="proposal._id">
            <td>{{proposal.proposer.name}}</td>
            <td>{{ formatPhone(proposal.proposer.phones[0]) }}</td>
            <td>{{proposal.proposer.email}}</td>
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
  methods: {
    formatPhone(phone) {

      if(!phone) {
        return "-"
      }

      return `(${phone.areaCode}) ${phone.number}`

    }
  },
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
