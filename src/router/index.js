import Vue from 'vue';
import Router from 'vue-router';
import VueMask from 'v-mask';
import SimpleVueValidation from 'simple-vue-validator';
import VueLocalStorage from 'vue-localstorage';
import VueScrollTo from 'vue-scrollto';
import * as VueGoogleMaps from "vue2-google-maps";

import Main from '@/scenes/home/Index';
import HealthInsurance from '@/scenes/product-landings/health-insurance/Index';
import ProposalResult from '@/scenes/proposal-result/Index';
import LifeInsurance from '@/scenes/product-landings/life-insurance/Index';
import TravelInsurance from '@/scenes/product-landings/travel-insurance/Index'
import PortoCarroFacil from '@/scenes/product-landings/porto-carro-facil/Index'
import LandingPetInsuranceV4 from '@/scenes/product-landings/pet-insurance/v4/Index'
import SalesFlow from '@/scenes/sales-flow/Index';


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
      component: LandingPetInsuranceV4
    }
    , {
      path: '/pet',
      name: 'PetInsuranceAbbrev',
      component: LandingPetInsuranceV4
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
      path: '/carro-facil',
      name: 'PortoCarroFacil',
      component: PortoCarroFacil
    },
    {
      path: '/ofertas',
      name: 'InsuranceOffers',
      component: SalesFlow
    },
    {
      path: '/ofertas/:proposalId',
      name: 'ProposalResult',
      component: ProposalResult
    },
    {
      path: '/ofertas-pet',
      name: 'PetInsuranceOffers',
      component: SalesFlow
    }
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