<template>
  <div>
    <div
      :class="{'proposal-card': true, 'proposal-to-integrate': rowItem.state == 2 }"
      v-for="(rowItem) in rowItems"
      :key="rowItem._id">
      <div class="columns is-multiline">
        <div class="column is-half">
          <CustomLabel label="Produto" :value="translateProduct(rowItem.product)" :sameLine="true"/>
          <CustomLabel
            label="Situação"
            :value="translateState(rowItem.state)"
            :sameLine="true"
            v-if="rowItem.state"
          />
          <CustomLabel label="Id da Proposta" :value="rowItem._id" :sameLine="true"/>
          <CustomLabel label="Atualização" :value="rowItem.updatedAt" :sameLine="true"/>
        </div>
        <div class="column is-half">
          <CustomLabel label="Cliente" :value="rowItem.name" :sameLine="true"/>
          <CustomLabel label="E-Mail" :value="rowItem.email" :sameLine="true"/>
          <CustomLabel label="CPF" :value="rowItem.cpf" :sameLine="true"/>
        </div>
      </div>
      <div>
            <Button
              textColor="white"
              backgroundColor="rgb(0, 216, 134)"
              :targetUrl="`/painel/detalhes-proposta?id=${rowItem._id}`"
              :isFullWidth="true"
            >Ver detalhes</Button>
      </div>
      <!-- <Pagination 
          v-model="filterResult.pageIndex" 
          :length="filterResult.pageCount" 
          color="primary" 
          :total-visible="5" 
          style="margin-top:20px;" 
          v-if="filterResult.pageCount"></v-pagination> -->
    </div>
    <Pagination 
            :total="filterResult.pageCount"
            :current.sync="filterResult.pageIndex"
            :order="'is-centered'"
            :rounded="true"
            :per-page="5">
    </Pagination>

  </div>
</template>

<script>
import Button from "@/components/Form/Button";
import Pagination from "@/components/Pagination"
import CustomLabel from "../components/CustomLabel";
import translator from "@/utils/translator";
import moment from "moment";
export default {
  name: "ProposalList",
  data() {
    return {};
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
  components: {
    Button,
    CustomLabel,
    Pagination
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
  background-color: #d6f8ff;
}

.proposal-card {
  margin: 10px;
  padding: 14px;
  border:2px solid rgb(0, 216, 134);
  border-radius: 10px;
}
</style>
