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

import LandingPetInsuranceV1 from '@/scenes/pet-insurance/v1/Index';
import LandingPetInsuranceV1Result from '@/scenes/pet-insurance/v1/Result';
import LandingPetInsuranceV1Finish from '@/scenes/pet-insurance/v1/Finish';

import LandingPetInsuranceV2 from '@/scenes/pet-insurance/v2/Index';
import LandingPetInsuranceV3 from '@/scenes/pet-insurance/v3/Index';
import ProposalRegister from '@/scenes/proposal-register/Index';

import VueScrollTo from 'vue-scrollto';
import * as VueGoogleMaps from "vue2-google-maps";
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw"
  },
  // Demonstrating how we can customize the name of the components
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
      path: '/lp/saude-pet',
      name: 'LandingPetInsurance',
      component: LandingPetInsuranceV3
    }
    , {
      path: '/plano-de-saude-pet',
      name: 'PetInsurance',
      component: LandingPetInsuranceV3
    }
    ///////////////////// Default Landings /////////////////////

    ///////////////////// V1 /////////////////////
    , {
      path: '/lp/saude-pet/v1',
      name: 'LandingPetInsuranceV1',
      component: LandingPetInsuranceV1
    }
    , {
      path: '/lp/saude-pet/v1/resultado/:proposalId',
      name: 'LandingPetInsuranceV1Result',
      component: LandingPetInsuranceV1Result
    }
    , {
      path: '/lp/saude-pet/v1/ok',
      name: 'PetInsuranceLandingV1Finish',
      component: LandingPetInsuranceV1Finish
    }

    ///////////////////// V2 /////////////////////
    , {
      path: '/lp/saude-pet/v2',
      name: 'LandingPetInsuranceV2',
      component: LandingPetInsuranceV2
    }
    ///////////////////// V2 /////////////////////

    ///////////////////// V3 /////////////////////
    , {
      path: '/lp/saude-pet/v3',
      name: 'LandingPetInsuranceV3',
      component: LandingPetInsuranceV3
    }
    ///////////////////// V3 /////////////////////

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
      path: '/seguro-vida',
      name: 'LifeInsurance',
      component: LifeInsurance
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
    }
  );

  importPetInsuranceLandings(routes)

  return routes;
}

export default new Router({
  mode: 'history',
  routes: importDefaultRoutes()
})
