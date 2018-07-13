import Vue from 'vue';
import Router from 'vue-router';
import VueMask from 'v-mask';
import SimpleVueValidation from 'simple-vue-validator';
import VueLocalStorage from 'vue-localstorage';
import Main from '@/scenes/home/Index';
import HealthInsurance from '@/scenes/health-insurance/Index';
import ProposalResult from '@/scenes/proposal-result/Index';
import LifeInsurance from '@/scenes/life-insurance/Index';
import ProductSelector from '@/scenes/product-selector/Index';
import TravelInsurance from '@/scenes/proposal-register/travel-insurance/Index'
import InsuranceOffers from '@/scenes/insurance-offers/Index.vue'
import LandingPetInsuranceV3 from '@/scenes/pet-insurance/v3/Index';
import ProposalRegister from '@/scenes/proposal-register/Index';
import PetInsuranceOffersSuccess from '@/scenes/pet-insurance-offers/Success'
import VueScrollTo from 'vue-scrollto';
import FillInsuranceProposal from '@/scenes/fill-insurance-proposal/Index.vue';
// import BasicProposalData from '@/scenes/sales-flow/BasicProposalData';
// import ProposalOffers from '@/scenes/sales-flow/Offers';
// import FullProposalData from '@/scenes/sales-flow/FullProposalData'
// import FinishSalesFlow from '@/scenes/sales-flow/Finish'
import SalesFlow from '@/scenes/sales-flow/Index';
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw"
  },
  installComponents: false
});

Vue.use(VueScrollTo)
Vue.use(VueLocalStorage)
Vue.use(SimpleVueValidation)
Vue.use(Router)
Vue.use(VueMask)


function importPetInsuranceLandings(routes) {
  routes.push(
    ///////////////////// Default Landings /////////////////////
    {
      path: '/plano-de-saude-pet',
      name: 'PetInsurance',
      component: LandingPetInsuranceV3
    }
    , {
      path: '/pet',
      name: 'PetInsuranceAbbrev',
      component: LandingPetInsuranceV3
    }
    ///////////////////// Default Landings /////////////////////
  );
}

function importDefaultRoutes() {
  const routes = [];

  routes.push(
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/plano-de-saude',
      name: 'HealthInsurance',
      component: HealthInsurance
    },
    {
      path: '/seguro-viagem',
      name: 'TravelInsurance',
      component: TravelInsurance
    },
    {
      path: '/seguro-vida',
      name: 'LifeInsurance',
      component: LifeInsurance
    },
    {
      path: '/fluxo-vendas',
      name: 'SalesFlow',
      component: SalesFlow
    },
    {
      path: '/ofertas',
      name: 'InsuranceOffers',
      component: SalesFlow
    },
    {
      path: '/completar-cadastro',
      name: 'FillInsuranceProposal',
      component: FillInsuranceProposal
    },
    {
      path: '/ofertas/:proposalId',
      name: 'ProposalResult',
      component: ProposalResult
    },
    {
      path: '/escolha-produto',
      name: 'ProductSelector',
      component: ProductSelector
    },
    {
      path: '/cadastro-completo',
      name: 'ProposalRegister',
      component: ProposalRegister
    },
    {
      path: '/ofertas-pet',
      name: 'PetInsuranceOffers',
      component: SalesFlow
    },
    {
      path: '/ofertas-pet/sucesso',
      name: 'PetInsuranceOffersSuccess',
      component: PetInsuranceOffersSuccess
    },   
    // {
    //   path: '/fluxo-vendas/cadastro-basico',
    //   name: 'BasicProposalData',
    //   component: BasicProposalData
    // },
    // {
    //   path: '/fluxo-vendas/ofertas',
    //   name: 'ProposalOffers',
    //   component: ProposalOffers
    // },
    // {
    //   path: '/fluxo-vendas/cadastro-completo',
    //   name: 'FullProposalData',
    //   component: FullProposalData
    // },
    // {
    //   path: '/fluxo-vendas/finalizacao',
    //   name: 'FinishSalesFlow',
    //   component: FinishSalesFlow
    // },
    
    // 
  );

  importPetInsuranceLandings(routes)

  return routes;
}

const router = new Router({
  mode: 'history',
  routes: importDefaultRoutes()
});

router.beforeEach(function (to, from, next) {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
  next();
});

export default router