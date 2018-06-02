import Vue from 'vue'
import Router from 'vue-router'
import VueMask from 'v-mask'
import SimpleVueValidation from 'simple-vue-validator'
import Main from '@/scenes/home/Index'
import HealthInsurance from '@/scenes/health-insurance/Index'
import ProposalResult from '@/scenes/proposal-result/Index'
import LifeInsurance from '@/scenes/life-insurance/Index'
import PetInsurance from '../scenes/pet-insurance/Index'
import ProductSelector from '@/scenes/product-selector/Index'

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
      name: 'PetInsurance',
      component: PetInsurance
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

  ]
})
