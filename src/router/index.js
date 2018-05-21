import Vue from 'vue'
import Router from 'vue-router'
import VueMask from 'v-mask'
import SimpleVueValidation from 'simple-vue-validator'
import Main from '@/scenes/home/Index'
import HealthInsurance from '@/scenes/health-insurance/Index'
import HealthInsuranceOffers from '@/scenes/health-insurance/Offers'
import LifeInsurance from '@/scenes/life-insurance/Index'

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
      path: '/seguro-vida',
      name: 'LifeInsurance',
      component: LifeInsurance
    },
    {
      path: '/plano-de-saude/opcoes/:proposalId',
      name: 'HealthInsuranceResult',
      component: HealthInsuranceOffers
    }
  ]
})
