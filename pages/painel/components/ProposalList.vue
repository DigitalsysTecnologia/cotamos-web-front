<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-center">
      <v-data-table :headers="headers" :items="rowItems" hide-actions class="elevation-1" :loading="loading" no-data-text="Nenhuma proposta encontrada" :disable-initial-sort="true">
        <template slot="items" slot-scope="props">
          <tr :class="{'proposal-to-integrate': props.item.state == 2 }">
            <td class="text-xs-left" >{{ props.item.updatedAt }}</td>
            <td class="text-xs-left" >
              {{ translateProduct(props.item.product) }}
              <span v-if="props.item.state" style="font-size:12px;font-weight:bold;">
                <br />
                <span>({{ translateState(props.item.state) }}) </span>
              </span>
            </td>
            <td class="text-xs-left" >
              {{ props.item.name }}
              <span v-if="props.item.cpf" style="font-size:12px;font-weight:bold;">
              <br />
              CPF: {{ props.item.cpf }}
              </span>
            </td>
            <td class="text-xs-left" >
              {{ props.item.phone }}
              <span v-if="props.item.email">
                <br />
                {{ props.item.email }}
              </span>
            </td>

            <td class="text-xs-center" >
              <v-btn icon alt="Ver detalhes" color="primary" :to="`/painel/detalhes-proposta?id=${props.item._id}`" :nuxt="true">
                <v-icon>visibility</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-pagination v-model="filterResult.pageIndex" :length="filterResult.pageCount" color="primary" :total-visible="5" style="margin-top:20px;" v-if="filterResult.pageCount"></v-pagination>
  </v-flex>
</v-layout>
</template>

<script>
import translator from "@/utils/translator";
import moment from "moment";
export default {
  name: "ProposalList",
  data() {
    return {
      headers: [
        {
          text: "Data",
          align: "left",
          value: "updatedAt"
        },
        {
          text: "Produto/Situação",
          align: "left",
          value: "product"
        },
        {
          text: "Cliente",
          align: "left",
          value: "name"
        },
        {
          text: "Contato",
          align: "left",
          value: "phone"
        },
        {
          text: "Ações",
          align: "center",
          value: ""
        }
      ]
    };
  },
  computed: {
    rowItems: {
      get() {
        if (!this.filterResult.proposals) {
          return [];
        }

        return this.filterResult.proposals.map(item => {
          return {
            _id: item._id,
            updatedAt: this.formatDate(item.updatedAt),
            product: item.product,
            rawState: item.state,
            state: item.state,
            name: item.proposer.name,
            cpf: item.proposer.cpf,
            email: item.proposer.email,
            phone: this.formatPhone(item.proposer.phones[0])
          };
        });
      }
    }
  },
  watch: {
    "filterResult.pageIndex": function(pageNumber) {
      this.$emit("onChangePagination", pageNumber);
    }
  },
  methods: {
    formatPhone(phone) {
      if (!phone) {
        return "";
      }

      if (!phone.areaCode) {
        return "";
      }

      if (!phone.number) {
        return "";
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
    filterResult: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.td-info span {
  display: block;
}

.proposal-to-integrate {
  color: black;
  background-color: #58bfd3;
}
</style>
