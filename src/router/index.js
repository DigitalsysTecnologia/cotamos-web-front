import Vue from 'vue'
import Router from 'vue-router'
import VueMask from 'v-mask'
import SimpleVueValidation from 'simple-vue-validator'
import Main from '@/scenes/Main'
import HealthInsurance from '@/scenes/health-insurance/Index'
import HealthInsuranceOffers from '@/scenes/health-insurance/Offers'

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
      path: '/plano-de-saude/opcoes',
      name: 'HealthInsuranceResult',
      component: HealthInsuranceOffers
    }
  ]
})
