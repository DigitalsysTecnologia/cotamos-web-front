<template>
    <div>
        <!-- <section class="container-fluid bg-outros" style="backgroundColor:red;">
          <h1>Teste</h1>
        </section> -->

        <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
            <div class="row">
              <div class="col-md-offset-2 col-md-8 text-center">
                <h2 class="subtitle">O que é plano de saúde pet?</h2>
              </div>
            </div>
            
            <div class="row" style="padding-top:15px;">
              <div class="col-md-offset-2 col-md-2 col-sm-12 col-sm-offset-0">
                <img class="img-responsive center-block" src="/static/img/dr_cao.png" style="max-height: 200px;"/>
              </div>

              <div class="col-md-6 col-sm-12 col-sm-offset-0">
                <p>
                  O plano de saúde pet <span style="font-weight:bold;">para cães e gatos</span> é a oportunidade de passar as despesas com vacinas, consultas, internações e cirurgias do seu pet para uma seguradora.
                </p>

                <p>
                  Em resumo, plano de saúde pet é uma forma  inteligente para proporcionar: 
                  <ul style="margin-top:10px;">
                    <li><span style="font-weight:bold;">Economia</span>;</li>
                    <li><span style="font-weight:bold;">Segurança</span>;</li>
                    <li><span style="font-weight:bold;">Tranquilidade</span>.</li>
                  </ul>
                </p>
              </div>

            </div>

        </section>

        <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
            <div class="row">
              <div class="col-md-offset-2 col-md-8 text-center">
                <h2 class="subtitle">Por que eu deveria contratar um plano de saúde pet?</h2>
              </div>
            </div>
            
            <div class="row" style="padding-top:15px;">
              <div class="col-md-offset-2 col-md-8 col-sm-12">
                <p>
                  Assim como os humanos, os pets também tem necessidades de cuidados com a saúde. 
                  Com os planos de saúde, você tem acesso a uma série de clínicas para tratamento veterinário.
                </p>
              </div>

            </div>

        </section>

        <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
          <div class="row">
            <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 text-center">
              <h3>PARA OS FILHOTES</h3>
              <p>
                Quando um filhote canino ou felino passa por fases delicadas, como a construção da imunidade e adaptação à sua nova alimentação, ele epode ficar mais predisposto à instabilidades gastrointestinais e algumas alergias, gerando mais idas ao veterinário. 
                A descoberta do mundo e de sua nova casa também podem expor seu pet a riscos bastante comuns, como acidentes ou a ingestão de corpos estranhos. Esses incidentes ocorrem em 1 a cada 3 pets por ano.
              </p>
            </div>
          </div>
        </section>

        <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
              <h2 class="subtitle">FAÇA UMA COTAÇÃO ON-LINE</h2>
              <BasicForm v-on:submitProposal="submitProposal"/>
            </div>
          </div>
        </section>

        <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
              <button class="btn btn-lg btn-block call-to-action" v-on:click="GoToForm">PLANOS DISPONÍVEIS</button>
            </div>
          </div>
        </section>

        <!-- <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
                <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapsePlans" role="button" aria-expanded="false" aria-controls="collapseExample">
                <span class="hidden-xs">QUERO CONHECER OS PLANOS</span>
                <span class="hidden-sm hidden-md hidden-lg hidden-xl">VER PLANOS</span>
              </a>
            </div>
          </div>
          
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
              <div class="collapse coverage-container" id="collapsePlans" style="padding-top:10px;">
                <div v-for="plan in availablePlans" :key="plan.logo" class="col-md-12 plan-card">
                  <div class="row">
                    <div class="col-md-2 text-center">
                      <img class="img-responsive center-block" :src="plan.logo" width="43" height="41" />
                      <p :style="{color: plan.color, marginTop: '10px'}" class="hidden-xs hidden-sm">{{plan.name}}</p>
                    </div>

                    <div class="col-md-10" >
                      <p :style="{color: plan.color}" class="text-center hidden-md hidden-lg">{{plan.name}}</p>
                      <p>{{plan.description}}</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-xs-12 col-md-2">
                      <span class="plan-value">
                        {{ formatCurrency(plan.value) }}
                      </span>
                    </div>

                    <div class="col-xs-12 col-xs-offset-0 col-md-10">
                        <button class="btn call-to-action" v-on:click="GoToForm"> Saiba Mais</button>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>

        </section>

        <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
          <div class="row">
            <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
                <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapseCoverage" role="button" aria-expanded="false" aria-controls="collapseExample">
                <span class="hidden-xs">QUERO CONHECER AS COBERTURAS</span>
                <span class="hidden-sm hidden-md hidden-lg hidden-xl">VER COBERTURAS</span>
              </a>
            </div>
          </div>
          <div class="collapse" id="collapseCoverage">
            <div class="row">
              <div class="col-md-8 col-md-offset-2">
                <div class="coverage-container" style="backgroundColor:white;">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>COBERTURA</th>
                        <th class="hidden-xs">PET BASIC</th>
                        <th class="hidden-xs">PET LIGHT</th>
                        <th class="hidden-xs">PET PLUS</th>
                        <th class="hidden-xs">PET TOTAL</th>
                        <th class="hidden-xs">PET PREMIUM</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(coverageItem,idx) in coverage" :key="idx">
                        <td>
                          {{coverageItem.name}}
                          <p class="logo-plan-miniatures hidden-sm hidden-md hidden-lg hidden-xl">
                            <img src="/static/img/pet-insurance/icon_pet_basic.png" class="img-responsive" width="22" height="21" v-if="coverageItem.pet_basic" />
                            <img src="/static/img/pet-insurance/icon_pet_light.png" class="img-responsive" width="22" height="21" v-if="coverageItem.pet_light" />
                            <img src="/static/img/pet-insurance/icon_pet_plus.png" class="img-responsive" width="22" height="21" v-if="coverageItem.pet_plus" />
                            <img src="/static/img/pet-insurance/icon_pet_total.png" class="img-responsive" width="22" height="21" v-if="coverageItem.pet_total" />
                            <img src="/static/img/pet-insurance/icon_pet_premium.png" class="img-responsive" width="22" height="21" v-if="coverageItem.pet_premium" />
                          </p>
                        </td>
                        <td class="hidden-xs">
                          <img src="/static/img/pet-insurance/icon_pet_basic.png" class="img-responsive center-block" width="22" height="21" v-if="coverageItem.pet_basic" />
                        </td>
                        <td class="hidden-xs"> 
                          <img src="/static/img/pet-insurance/icon_pet_light.png" class="img-responsive center-block" width="22" height="21" v-if="coverageItem.pet_light" />
                        </td>
                        <td class="hidden-xs"> 
                          <img src="/static/img/pet-insurance/icon_pet_plus.png" class="img-responsive center-block" width="22" height="21" v-if="coverageItem.pet_plus" />
                        </td>
                        <td class="hidden-xs">
                          <img src="/static/img/pet-insurance/icon_pet_total.png" class="img-responsive center-block" width="22" height="21" v-if="coverageItem.pet_total" />
                        </td>
                        <td class="hidden-xs">
                          <img src="/static/img/pet-insurance/icon_pet_premium.png" class="img-responsive center-block" width="22" height="21" v-if="coverageItem.pet_premium" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section> -->

        <!-- <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
            <div class="row">
              <div class="col-md-offset-2 col-md-8 text-center">
                <h2 class="subtitle">O plano de saúde pet é um produto da Cotamos?</h2>
              </div>
            </div>
            
            <div class="row" style="margin-top:15px;">
              <div class="col-md-offset-2 col-md-4 col-sm-12 col-sm-offset-0">
                <p>
                  Não, a Cotamos atua como corretora, ou seja, apenas realiza as vendas do plano de saúde.
                </p>

                <p>
                  Atualmente, os planos de saúde oferecidos pela Cotamos são geridos pela 
                  <span style="font-weight:bold;">Health4Pet</span>, uma empresa da 
                  <span style="font-weight:bold;">Porto Seguro</span>
                </p>
              </div>
              <div class="col-md-4">
                <img src="/static/img/pet-insurance/health_for_pet_logo.png" class="img-responsive" />
              </div>
            </div>

        </section> -->

        <!-- <section class="container-fluid bg-outros" style="padding-top:15px;padding-bottom:25px;">
            <div class="row">
              <div class="col-md-offset-2 col-md-8 text-center">
                <h2 class="subtitle">Atendimento</h2>
              </div>
            </div>
            
            <div class="row text-center" style="margin-top:15px;">
              <div class="col-md-offset-2 col-md-2">
                <p style="display:inline-block">
                  Telefone:
                  <i class="fas fa-phone-square"/>
                   (11) 3297-3864
                </p>
              </div>
              <div class="col-md-2">
                <p>
                  WhatsApp: 
                  <i class="fab fa-whatsapp-square"/>
                  (11) 96374-1287
                </p>
              </div>
              <div class="col-md-2">
                <p>
                  WhatsApp: 
                  <i class="fab fa-whatsapp-square"/>
                  (11) 94783-1054
                </p>
              </div>
              <div class="col-md-2">
                <p>
                  E-mail: 
                  <i class="fas fa-envelope-square"/>
                  contato@cotamos.com
                </p>
              </div>
              
            </div>

        </section> -->

        <Footer/>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import BasicForm from "@/scenes/pet-insurance/components/Basic Form.vue"
import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect.vue";
import apiClientProvider from "@/providers/apiClientProvider";
import validator from "@/utils/validator";
import petInsuranceProvider from "@/utils/petInsuranceProvider";
import utils from "@/utils/index";

let router = null;

export default {
  name: "PetInsuranceV3",
  methods: {
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    },
    GoToForm(event) {
      router.push({ name: "ProposalRegister", query: { product: 5 } });
    },
    submitProposal(proposal) {
      console.log('proposal', proposal)
    }
  },
  computed: {
    availablePlans: {
      get() {
        return petInsuranceProvider.getAllPlans();
      }
    }
  },
  data() {
    return {
      coverage: petInsuranceProvider.getCoverage()
    };
  },
  async beforeMount() {
    router = this.$router;
    utils.saveLandingQueryParams(this.$route.query);
  },
  components: {
    NavBar: NavBar,
    Footer: Footer,
    Loading: Loading,
    FormInput: FormInput,
    FormSelect: FormSelect,
    BasicForm:BasicForm
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-line {
  margin-left: 0px;
}
.subtitle {
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
}
.logo-plan-miniatures {
  margin-top: 10px;
}

.logo-plan-miniatures img {
  display: inline-block;
}
.call-to-action {
  border: 1px solid transparent;
  vertical-align: middle;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: -0.5px;
  border-radius: 100px;
  cursor: pointer;
  padding: 15px 30px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to bottom, orange, #ff8400);
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}
.coverage-container {
  overflow-x: scroll;
}
.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: white;
}
.plan-value {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}
@media (max-height: 700px) {
  .coverage-container {
    max-height: 300px;
  }
}
@media (min-height: 701px) {
  .coverage-container {
    max-height: 500px;
  }
}
</style>
