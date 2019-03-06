<template>
  <section class="section">
    <div class="columns has-text-centered">
      <div class="column is-half">
        <img :src="selectedPlan.logo">
        <span class="plan-name">{{selectedPlan.name}}</span>
        <span class="plan-value" v-if="proposal.paymentData.method">{{ formatCurrency(planPrice)}}</span>
      </div>
      <div class="column is-half">

        <div class="field">
          <label class="label">Forma de Pagamento</label>
          <div class="control">
            <label class="radio">
              <input type="radio" name="answer" value="1" v-model="proposal.paymentData.method">
              Boleto
            </label>
            <br>
            <label class="radio">
              <input type="radio" name="answer" value="2" v-model="proposal.paymentData.method">
              Cartão de Crédito
            </label>
            <br>
            <label class="radio">
              <input type="radio" name="answer" value="3" v-model="proposal.paymentData.method">
              Débito em Conta (somente para Itaú e Santander)
            </label>
          </div>
        </div>
      </div>
    </div>
    <BankingData :proposal="proposal" v-if="proposal.paymentData.method == '3'"/>

    <div class="columns">
      <div class="column">
        <Button textColor="black" backgroundColor="rgb(0, 216, 137)" :isFullWidth="true" @click="onSubmit">{{ submitButtonText }}</Button>
      </div>
      <div class="column">
        <Button @click="onCancel" :isFullWidth="true" v-if="showCancelButton">{{ cancelButtonText }}</Button>
      </div>
    </div>
  </section>
</template>

<script>
import validator from "@/utils/validator";
import factory from "@/utils/factory";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import Button from "@/components/Form/Button";
import apiClientProvider from "@/utils/apiClient";
import BankingData from "./BankingData";

export default {
  name: "PaymentData",
  data() {
    return {
      plans: null
    };
  },
  computed: {
    planCode: {
      get() {
        return this.proposal.petInsuranceData.selectedPlan.code;
      }
    },
    planPrice: {
      get() {
        const paymentMethod = parseInt(this.proposal.paymentData.method);
        let value = null;

        switch (paymentMethod) {
          case 1:
            value = this.selectedPlan.value.bankSlip;
            break;
          case 2:
            value = this.selectedPlan.value.creditCard;
            break;
          case 3:
            value = this.selectedPlan.value.automaticDebit;
            break;
          default:
            return "";
        }

        return value;
      }
    }
  },
  props: {
    proposal: {
      type: Object,
      required: true
    },
    showCancelButton: {
      type: Boolean,
      required: false,
      default: false
    },
    cancelButtonText: {
      type: String,
      required: false,
      default: "Cancelar"
    },
    submitButtonText: {
      type: String,
      required: false,
      default: "Continuar"
    }
  },
  methods: {
    onCancel: async function() {
      this.$emit("onCancel");
    },
    onSubmit: async function() {
      const isValid = await validator.validatePage(this);
      if (isValid) {
        let cloneObj = JSON.parse(JSON.stringify(this.proposal.paymentData));
        cloneObj.amount = this.planPrice;
        cloneObj.method = parseInt(cloneObj.method);
        this.$emit("onSubmit", cloneObj);
      }
    },
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    }
  },
  validators: {},
  components: {
    BankingData,
    Button
  },
  beforeMount() {
    this.plans = petInsuranceProvider.getPlansByPetAge(
      this.proposal.petInsuranceData.age
    );

    const plans = this.plans.filter(plan => plan.code == this.planCode);
    this.selectedPlan = plans[0];
    console.log("this.selectedPlan", this.selectedPlan);

    if (!this.proposal.paymentData) {
      this.proposal.paymentData = {};
    }

    if (this.proposal.paymentData.method) {
      this.proposal.paymentData.method = this.proposal.paymentData.method.toString();
    }
  }
};
</script>

<style scoped>
.plan-logo {
  display: block;
  margin-top: 20px;
  height: 50px;
  font-weight: bold;
}

.plan-name {
  display: block;
  padding-top: 10px;
  font-size: 16px;
  font-weight: bold;
  color: rgb(0, 137, 156);
}

.plan-value {
  font-weight: bold;
  font-family: Roboto;
  font-size: 24px;
}
</style>
