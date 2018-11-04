<template>
  <v-layout row wrap>
    <v-flex xs12 class="text-center">
      <v-data-table :headers="headers" :items="rowItems" hide-actions class="elevation-1" :loading="loading">
        <template slot="items" slot-scope="props">
            <td class="text-xs-right">{{ props.item.updatedAt }}</td>
            <td class="text-xs-right">{{ props.item.product }}</td>
            <td class="text-xs-left">
               {{ props.item.name }}
               <span v-if="props.item.cpf" style="font-size:10px;">
               <br />
               CPF: {{ props.item.cpf }}
               </span>
               </td>
            <td class="text-xs-left">
              {{ props.item.phone }}
              <span v-if="props.item.email">
                <br />
                {{ props.item.email }}
              </span>
              
              </td>
            <td class="text-xs-center">
              <v-btn icon alt="Ver detalhes" color="primary" :to="`/painel/detalhes-proposta?id=${props.item._id}`" :nuxt="true">
                  <v-icon>visibility</v-icon>
                </v-btn>
            </td>
</template>
      </v-data-table>
      <v-pagination v-model="filterResult.pageIndex" :length="filterResult.pageCount" color="primary" :total-visible="10" style="margin-top:20px;"></v-pagination>
  </v-flex>
</v-layout>
  <!-- <div>
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
          <tr v-for="(proposal) in filterResult.proposals" :key="proposal._id">
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
              <router-link :to="`/painel/detalhes-proposta?id=${proposal._id}`" class="btn btn-primary">
                Ver Detalhes
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      
    </div>
  </div> -->
</template>

<script>
  import translator from "@/utils/translator";
  import moment from "moment";
  export default {
    name: "ProposalList",
    data() {
      return {
        headers: [{
            text: 'Data',
            align: 'center',
            value: 'updatedAt'
          },
          {
            text: 'Produto',
            align: 'center',
            value: 'product'
          },
          {
            text: 'Cliente',
            align: 'center',
            value: 'name'
          },
          {
            text: 'Contato',
            align: 'center',
            value: 'phone'
          },
          {
            text: 'Ações',
            align: 'center',
            value: ''
          },
        ]
      }
    },
    computed: {
      rowItems: {
        get() {
          return this.filterResult.proposals.map(item => {
            return {
              _id: item._id,
              updatedAt: this.formatDate(item.updatedAt),
              product: this.translateProduct(item.product),
              state: this.translateState(item.state),
              name: item.proposer.name,
              cpf: item.proposer.cpf,
              email: item.proposer.email,
              phone: this.formatPhone(item.proposer.phones[0])
            }
          });
        }
      }
    },
    watch: {
      "filterResult.pageIndex": function(pageNumber) {
        this.$emit('onChangePagination', pageNumber);
      }
    },
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
</style>
