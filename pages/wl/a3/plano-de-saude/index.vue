<template>
  <div>
    <section class="section is-medium has-text-centered">
      <h2 class="is-size-2 subtitle has-text-centered">Em breve</h2>
    </section>
  </div>
</template>

<script>
import Loading from "@/components/molecules/Loading";
import Footer from "@/components/molecules/Footer";
import Header from "@/components/molecules/Header";
import BasicHealthInsurance from "@/components/organisms/BasicHealthInsurance";
import apiClientProvider from "@/utils/apiClient";
import validator from "@/utils/validator";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import CallToAction from "@/components/atoms/CallToAction";
import utils from "@/utils/index";

let router = null;
let queryParams = null;

export default {
  name: "PetInsurance",
  layout: "wl/a3/default",
  methods: {
    GoToForm(event) {
      let partnerId = null;

      if (queryParams) {
        partnerId = queryParams.partnerId;
      }
      router.push({
        path: "/fluxo-vendas",
        query: { product: 5, partnerId: partnerId }
      });
    },
    submitProposal(proposal) {
      router.push({ path: "/fluxo-vendas", query: { id: proposal._id } });
    }
  },
  computed: {
    availablePlans: {
      get() {
        return petInsuranceProvider.getAllPlans();
      }
    }
  },
  head() {
    return {
      title: "A3 Consultoria"
    };
  },
  data() {
    return { zipCode: "" };
  },
  async beforeMount() {
    router = this.$router;
    queryParams = this.$route.query;
    utils.saveLandingQueryParams(this.$route.query);
  },
  validators: {
    zipCode: value => validator.validateZipCode(value)
  },
  components: {
    Header,
    Footer,
    BasicHealthInsurance,
    Loading,
    CallToAction
  }
};
</script>

<style scoped>
.container {
  margin-top: 30px;
}

.container-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fff;
  -webkit-box-shadow: -1px -1px 30px 5px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: -1px -1px 30px 5px rgba(0, 0, 0, 0.32);
  box-shadow: -1px -1px 30px 5px rgba(0, 0, 0, 0.32);
}

.primary-color {
  color: #f1ac2d;
}
</style>getLandingQueryParams
