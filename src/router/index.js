import Vue from 'vue'
import Router from 'vue-router'
import VueMask from 'v-mask'
import SimpleVueValidation from 'simple-vue-validator'
import VueLocalStorage from 'vue-localstorage'
import Main from '@/scenes/home/Index'
import HealthInsurance from '@/scenes/health-insurance/Index'
import ProposalResult from '@/scenes/proposal-result/Index'
import LifeInsurance from '@/scenes/life-insurance/Index'
import PetInsurance from '../scenes/pet-insurance/Index'
import PetInsuranceForm from '../scenes/pet-insurance/Form'
import PetInsuranceSimulator from '../scenes/pet-insurance/Simulator'
import LandingPetInsuranceV1 from '../scenes/landings/pet-insurance/v1/Index'
import LandingPetInsuranceV1Result from '../scenes/landings/pet-insurance/v1/Result'
import PetInsuranceLandingV1Finish from '../scenes/landings/pet-insurance/v1/Finish'
import ProductSelector from '@/scenes/product-selector/Index'

Vue.use(VueLocalStorage)
Vue.use(SimpleVueValidation)
Vue.use(Router)
Vue.use(VueMask)

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/plano-de-saude-pet',
      // name: 'PetInsurance',
      // component: PetInsurance
      name: 'LandingPetInsuranceV1',
      component: LandingPetInsuranceV1
    },
    {
      path: '/plano-de-saude-pet/simulador',
      name: 'PetInsuranceSimulator',
      component: PetInsuranceSimulator
    },
    {
      path: '/plano-de-saude-pet/proposta',
      name: 'PetInsuranceForm',
      component: PetInsuranceForm
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
      path: '/lp/saude-pet/v1',
      name: 'LandingPetInsuranceV1',
      component: LandingPetInsuranceV1
    },
    {
      path: '/lp/saude-pet/v1/resultado/:proposalId',
      name: 'LandingPetInsuranceV1Result',
      component: LandingPetInsuranceV1Result
    },
    {
      path: '/lp/saude-pet/v1/ok',
      name: 'PetInsuranceLandingV1Finish',
      component: PetInsuranceLandingV1Finish
    }
    
  ]
})
