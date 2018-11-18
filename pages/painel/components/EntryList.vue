<template>
  <div >
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th class="text-center">Data</th>
            <th class="text-center">Qtd. Clientes</th>
            <th class="text-center">Comissão</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry) in entries" :key="entry._id" class="text-center">
            <td class="td-info">
             <span>
               {{ formatDate(entry.date) }}
              </span>
            </td>

            <td class="td-info">
             <span>
               {{ entry.clients }}
              </span>
            </td>

            <td class="td-info">
             <span>
               {{ formatAmount(entry.salesComissionValue) }}
              </span>
            </td>


            
            <td>
              <!-- <router-link :to="`/painel/detalhes-proposta/${proposal._id}`" class="btn btn-primary">
                Ver Detalhes
              </router-link> -->
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
      return moment(date).format("MM/YYYY");
    },
    formatAmount(amount){
      return 'R$ 0,00'
    },
    async translateState(state) {
      return await translator.translateState(state);
    },
    translateProduct(product) {
      return translator.translateProduct(product);
    }
  },
  props: {
    entries: {
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
