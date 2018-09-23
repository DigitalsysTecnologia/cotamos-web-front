<template>
  <div >
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Produto</th>
            <th>Cliente</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(proposal) in proposals" :key="proposal._id">
            <td class="td-info">
             <span>
                {{ formatDate(proposal.updatedAt) }}
              </span>
            </td>

            <td class="td-info">
              <span style="font-weight:bold">{{ translateProduct(proposal.product) }}</span>
              <span>({{ translateState(proposal.state) }})</span>
            </td>
            
            <td class="td-info">
              <span>Nome: {{ proposal.proposer.name || "-" }} </span>
              <span>CPF: {{ proposal.proposer.cpf || "-"}} </span>
            </td>

            <td class="td-info">
              <span> {{ proposal.proposer.email }}</span>
              <span>{{ formatPhone(proposal.proposer.phones[0]) }}</span>
            </td>
            
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
import translator from "@/utils/translator";
import moment from "moment";
export default {
  name: "ProposalList",
  methods: {
    formatPhone(phone) {
      if (!phone) {
        return "-";
      }

      return `(${phone.areaCode}) ${phone.number}`;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },
    translateState(state) {
      return translator.translateState(state);
    },
    translateProduct(product) {
      return translator.translateProduct(product);
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
.td-info span {
  display: block;
}
</style>
