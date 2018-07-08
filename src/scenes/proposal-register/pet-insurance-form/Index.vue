<template>
  <div>
    <div class="row" v-if="isLoading">
      <Loading  :messages="loadingMessages"/>
    </div>
    <div class="row" v-else-if="isDenied">
      <DeniedProposalForm :proposal="proposal" v-on:previousStep="undoDenyProposal" v-on:nextStep="finishDeniedProposal" />
    </div>
    <div class="row" v-else-if="currentStep == 0">
      <BasicForm :proposal="proposal" v-on:next="nextStep"/>
    </div>
    <div class="row" v-else-if="currentStep == 1">
      <PetInsuranceOffers :proposal="proposal" v-on:selectPlan="selectPlan" v-on:previousStep="previousStep"/>
    </div>
    <div class="row" v-else-if="currentStep == 2">
      <ProposerDataForm :proposal="proposal" v-on:submitProposal="submitProposal"/>
    </div>
    <div class="row" v-else-if="currentStep == 3">
      <div class="row">
        <div class="col-xs-12">
          <h3>Sua proposta foi enviada com sucesso</h3>
          <p>
            Em breve seu pet já estará com o plano de saúde. </p>
          <p>
            Entraremos em contato para confirmar seus dados e agendar a primeira consulta de seu pet.
          </p>
          <p>Você receberá um link por e-mail para efetuar o primeiro pagamento.</p>
          <p>
            Caso tenha alguma dúvida, você pode entrar em contato conosco através de:

            <ul style="margin-top:10px;">
              <li>
                <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 96374-1287</span>
              </li>
              <li>
                <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 94783-1054</span>
              </li>
              <li>
                <span>E-mail: <i class="fas fa-envelope-square"/> contato@cotamos.com</span>
              </li>
            </ul>
          </p>
          <p>
            Muito Obrigado - Equipe Cotamos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import BasicForm from "./components/BasicForm";
import PetInsuranceOffers from "./components/PetInsuranceOffers";
import DeniedProposalForm from "./components/DeniedProposalForm";
import ProposerDataForm from "./components/ProposerDataForm";
import apiClientProvider from "@/providers/apiClientProvider";
import factory from "@/utils/factory";
import utils from "@/utils/index";

export default {
  name: "PetInsuranceForm",
  computed: {
    isLoading: {
      get: function() {
        return this.loading;
      }
    },
    loadingMessages: {
      get: function() {
        return this.internalLoadingMessages;
      }
    },
    currentStep: {
      get: function() {
        return this.step;
      }
    },
    isDenied: {
      get: function() {
        return this.denied;
      }
    }
  },
  methods: {
    updateProposal: async function() {
      try {
        const validations = [];
        validations.push(this.$validate());

        const validationResults = await Promise.all(validations);

        const hasValidationErrors = validationResults.some(function(
          validation
        ) {
          return validation === false;
        });

        if (hasValidationErrors) {
          return;
        }
      } catch (err) {
        return;
      }

      if (this.loading) {
        return;
      }

      try {
        this.loading = true;
        this.existingProposal = await apiClientProvider.generateProposal(3);
        const proposal = Object.assign(this.existingProposal, this.proposal);
        await apiClientProvider.updateProposal(proposal);
        await apiClientProvider.setNextState(proposal, 10);

        this.$router.push({
          name: "ProposalResult",
          params: { proposalId: proposal._id }
        });
      } finally {
        this.loading = false;
      }
    },
    nextStep: async function() {
      switch (this.step) {
        case 0:
          this.loading = true;

          this.internalLoadingMessages = [
            "Verificando sua área de cobertura",
            "Aguarde um instante por favor..."
          ];

          if (!this.proposal._id) {
            const existingProposal = await apiClientProvider.generateProposal(
              5
            );
            this.proposal = Object.assign(existingProposal, this.proposal);
            this.proposal.queryParams = utils.getLandingQueryParams();
          }

          await apiClientProvider.updateProposal(this.proposal);

          const availability = await apiClientProvider.checkAvailabilityForProduct(
            this.product,
            this.proposal.proposer.homeAddress.zipCode
          );

          if (availability.isAvailable) {
            await apiClientProvider.setNextState(this.proposal, 10);
            this.$router.push({path: '/ofertas', query: { id: this.proposal._id }});
            
          } else {
            await apiClientProvider.setNextState(this.proposal, 21);
            this.denied = true;
          }

          this.loading = false;
          break;

        case 1:
          this.step++;
          break;

        case 2:
          this.step++;
          break;
      }
    },
    undoDenyProposal: function() {
      this.denied = false;
    },
    finishDeniedProposal: async function() {
      await apiClientProvider.updateProposal(this.proposal);
      await apiClientProvider.setNextState(this.proposal, 10);
    },
    previousStep: async function(event) {
      this.step--;
    },
    selectPlan: function(plan) {
      this.proposal.petInsuranceData.selectedPlan = plan;
      this.nextStep();
    },
    submitProposal: async function() {
      this.loading = true;

      this.internalLoadingMessages = [
        "Enviando sua proposta para Health 4 Pet",
        "Aguarde um instante por favor..."
      ];

      await apiClientProvider.updateProposal(this.proposal);
      await apiClientProvider.setNextState(this.proposal, 10);
      await apiClientProvider.setNextState(this.proposal, 20);

      this.loading = false;
      this.nextStep();
    }
  },
  data() {
    return {
      step: 0,
      internalLoadingMessages: [],
      denied: false,
      loading: false,
      product: 0,
      proposal: factory.generateEmptyProposal(),
      ageRange: [
        {
          id: 1,
          text: "Menos de 1 ano"
        },
        {
          id: 2,
          text: "Entre 1 e 8 anos"
        },
        {
          id: 3,
          text: "9 anos ou mais"
        }
      ]
    };
  },
  async beforeMount() {
    this.product = this.$route.query.product;
  },
  components: {
    Footer: Footer,
    Loading: Loading,
    BasicForm: BasicForm,
    DeniedProposalForm: DeniedProposalForm,
    PetInsuranceOffers: PetInsuranceOffers,
    ProposerDataForm: ProposerDataForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
