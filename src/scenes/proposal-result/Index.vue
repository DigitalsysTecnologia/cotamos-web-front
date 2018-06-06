<template>
    <div>
        <main class='container-fluid grey-background'>
            <div class='row'>
                    <header class='col-xs-12 banner-pgs'
                            style='backgroundImage: url(/static/img/bg_outros.jpg)'>
                        <div class='container'>
                            <h1>Cotamos</h1>
                            <h2>Em breve, mais detalhes sobre sua proposta.</h2>
                        </div>
                    </header>
                </div>
                <div class='row'>
                    <article class='col-xs-12'>
                            <section class='col-md-10 col-md-offset-1 col-xs-12 resultados-mg'>
                                <div class="col-sm-12 col-xs-12 box-cotacao" v-if="isLoading">
                                    <Loading :messages="this.loadingMessages" :completePercent="this.loadingCompletePercent"/>
                                </div>                                
                                <div v-else style="margin-top:15px;" class="col-sm-12 col-xs-12 box-cotacao" >
                                    <!-- <HealthInsuranceOffer  v-for="(offer, index) in offers" :key="`health-insurance-offer-${index}`" v-bind:offer="offer" /> -->
                                    <div class="col-md-8 col-md-offset-2 col-xs-12">
                                        <div class="text-center" style="paddingTop:25px; paddingBottom:25px">
                                            <p style="color: #00899C">
                                                Muito obrigado!
                                            </p>
                                            <p>
                                                Em breve entraremos em contato para mais detalhes do seu pedido.
                                            </p>
                                            <p>
                                                Não se preocupe, o processo é sem compromisso e você só .
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                    </article>
                </div>
        </main>
        <Footer />
    </div>
</template>

<script>
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import HealthInsuranceOffer from "../../components/HealthInsuranceOffer";
import apiClientProvider from "../../providers/apiClientProvider";
import SimpleVueValidation from "simple-vue-validator";
import moment from "moment";
import utils from "../../utils/index";
import _ from "lodash";
const Validator = SimpleVueValidation.Validator;

export default {
  name: "ProposalResult",
  data() {
    return {
      isLoading: true,
      loadingMessages: [],
      loadingCompletePercent: 0,
      offers: [ ],
      loadingInteractions: [
        {
          messages: ["Validando as informações de proposta, aguarde..."],
          percent: 1,
          timeToWait: 5000
        },
        {
          messages: ["Salvando as informações em nosso banco de dados..."],
          percent: 33,
          timeToWait: 4000
        },
        {
          messages: ["Obtendo resultados..."],
          percent: 100,
          timeToWait: 1000
        }
      ]
    };
  },
  beforeMount() {},
  async mounted() {
    if (this.isLoading) {
      this.isLoading = true;
      for (let idx = 0; idx < this.loadingInteractions.length; idx++) {
        const loadingInteraction = this.loadingInteractions[idx];

        this.loadingMessages = loadingInteraction.messages;
        this.loadingCompletePercent = loadingInteraction.percent;
        await utils.sleep(loadingInteraction.timeToWait);
      }
      this.isLoading = false;
    }
  },
  components: {
    Footer: Footer,
    Loading: Loading,
    HealthInsuranceOffer: HealthInsuranceOffer
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.grey-background {
  background-color: rgb(236, 236, 238);
}

.resultados-mg {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
