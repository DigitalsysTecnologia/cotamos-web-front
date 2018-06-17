<template>
  <div>
    <NavBar />
      <main class="container-fluid">
          <div class="row">
            <div class="col-xs-12 color-background" style="height:80px;"/>
          </div>
          <div v-if="loading">
            <div class="text-center loading-container">
              <img src="/static/img/loading.gif" class="img-responsive center-block" />
            </div>
          </div>
          <div v-else-if="proposalIsDenied">
            <section class="container-fluid" >
              <div class="row">
                <div class="col-sm-12 text-center">
                  <h2 style="color: red">Ops...</h2>
                </div>
                <div class="row">
                  <div class="col-sm-12 text-center">
                    <h2>
                      Infelizmente, sua região ainda não é atendida.
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div v-else>
            <section class="container-fluid" >
              <div class="row">
                <div class="col-sm-12 text-center">
                  <h2>Planos Disponíveis</h2>
                </div>
                <div class="row" v-for="plan in availablePlans" :key="plan.logo">
                  <div class="plan-card col-sm-offset-2 col-sm-8">
                    <div class="row">
                      <div class="col-md-2 text-center">
                        <img class="img-responsive center-block" :src="plan.logo" width="43" height="41" />
                        <p :style="{color: plan.color, marginTop: '10px'}" class="hidden-xs hidden-sm">{{plan.name}}</p>
                      </div>
                      <div class="col-md-10">
                        <p :style="{color: plan.color}" class="text-center hidden-md hidden-lg">{{plan.name}}</p>
                        <p>{{plan.description}}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-offset-2 col-md-8 text-center">
                        <div class="col-xs-12 col-sm-4">
                          <span class="plan-value">
                            {{ formatCurrency(plan.value) }}
                          </span>
                        </div>

                        <div class="col-xs-12 col-xs-offset-0 col-sm-4 col-sm-offset-2">
                          <div>
                            <button class="btn call-to-action" v-on:click="finishProposal(proposal, plan)"> Tenho Interesse</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="container-fluid">
              <div class="row">
                <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
                   <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapseCoverage" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span class="hidden-xs">REDE CREDENCIADA</span>
                    <span class="hidden-sm hidden-md hidden-lg hidden-xl">REDE CREDENCIADA</span>
                  </a>
                </div>
              </div>
              <div class="collapse" id="collapseCoverage" style="padding-top:10px;">
                <div class="row">
                  <div class="col-sm-offset-2 col-sm-8">
                    <div style="max-height: 300px; overflow-y: scroll;">
                      <div v-for="(map, idx) in places" :key="idx">
                        <div class="place-card">
                          <p>
                            <span style="font-weight: bold;"> Nome: </span> 
                            <span> {{map.name}}</span>
                            <br/>
                            <span style="font-weight: bold;"> Bairro: </span> 
                            <span v-if="map.neighborhood">{{map.neighborhood}} </span>
                            <br/>
                            <span style="font-weight: bold;"> Cidade: </span> 
                            <span v-if="map.neighborhood">{{map.city}} </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="container-fluid">
              <div class="row">
                <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
                   <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapseMap" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span class="hidden-xs">MAPA COBERTURA</span>
                    <span class="hidden-sm hidden-md hidden-lg hidden-xl">MAPA COBERTURA</span>
                  </a>
                </div>
              </div>
              <div class="collapse" id="collapseMap">
                <div class="row">
                  <div class="col-sm-12 text-center">
                    <h2>Mapa da Região</h2>
                  </div>
                  <div class="col-sm-offset-2 col-sm-8 text-center">
                    <googleMap :center="mapCenter" :zoom="10" style="width: 100%; height: 500px" v-if="mapData">
                      <googleMarker v-for="(m,idx) in mapMarkers" 
                                    :key="idx" 
                                    :position="m.position" 
                                    :clickable="false" 
                                    :draggable="false"
                                    @click="center=m.position">
                        </googleMarker>
                    </googleMap>
                  </div>
                </div>
              </div>
            </section>
            <section class="container-fluid">
              <div class="row">
                <div class="col-sm-8 col-sm-offset-2 col-xs-12 text-center">
                   <a class="btn btn-primary btn-lg btn-block" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <span class="hidden-xs">QUERO CONHECER AS COBERTURAS</span>
                    <span class="hidden-sm hidden-md hidden-lg hidden-xl">VER COBERTURAS</span>
                  </a>
                </div>
              </div>
              <div class="collapse" id="collapseExample">
                <div class="row">
                  <div class="col-sm-12 text-center">
                    <h2>Coberturas</h2>
                  </div>
                  <div class="col-md-8 col-md-offset-2">
                    <table class="table table-hover">
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
                      <tbody v-for="(coverageItem,idx) in coverage" :key="idx">
                        <tr>
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
            </section>
          </div>
      </main>
    <Footer/>
  </div>
</template>

<script>
import apiClientProvider from "../../../providers/apiClientProvider";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import Footer from "../../../components/Footer";
import validator from "../../../utils/validator";
import NavBar from "../../../components/NavBar";
import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

let router = {};

export default {
  name: "PetInsuranceLandingV1_Result",
  data() {
    return {
      proposal: {},
      loading: true,
      loadingMessage: "Enviando Proposta...",
      loadingCompletePercent: 0,
      plans: [],
      serviceArea: null,
      coverage: [
        {
          name: "Urgência e emergência (48h após chipagem)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Atendimento Ambulatorial (Carência de 30 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Vacinas¹ (Carência de 180 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Implantação do Microchip",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "PetHome – atendimento domiciliar (Carência de 30 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "PetPhone – teleatendimento com veterinários de plantão 24h",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "PetNutri",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Passaporte eletrônico",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Exames laboratoriais (Carência de 30 dias)",
          pet_basic: true,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Consulta com especialistas (Carência de 60 dias)",
          pet_basic: false,
          pet_light: true,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Atendimento Hospitalar (Carência de 30 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Internação (Carência de 60 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Cirurgia (Carência de 60 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Exames por Imagem (Carência de 60 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: true,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Castração (Carência de 360 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Farma4Pet",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: true,
          pet_premium: true
        },
        {
          name: "Reembolso - Livre escolha³",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: false,
          pet_premium: true
        },
        {
          name: "Limpeza de Tártaro (Carência de 360 dias)",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: false,
          pet_premium: true
        },
        {
          name: "Concierge",
          pet_basic: false,
          pet_light: false,
          pet_plus: false,
          pet_total: false,
          pet_premium: true
        }
      ]
    };
  },
  computed: {
    availablePlans: {
      get() {
        return this.plans;
      }
    },
    mapData: {
      get() {
        return this.serviceArea;
      }
    },
    places: {
      get() {
        if (!this.serviceArea || !this.serviceArea.plans) {
          return [];
        }

        return this.serviceArea.plans[0].places;
      }
    },
    mapMarkers: {
      get() {
        if (!this.serviceArea) {
          return [];
        }
        return this.serviceArea.plans[0].places.map(function(place) {
          return {
            position: {
              lat: place.location.coordinates[1],
              lng: place.location.coordinates[0]
            }
          };
        });
      }
    },
    mapCenter: {
      get() {
        const location = this.serviceArea.homeLocation;
        return {
          lat: location.latitude,
          lng: location.longitude
        };
      }
    },
    proposalIsDenied: {
      get() {
        return this.proposal.state == 21;
      }
    }
  },
  methods: {
    finishProposal: async (proposal, plan) => {
      proposal.petInsuranceData.desiredPlan = plan;
      await apiClientProvider.updateProposal(proposal);
      await apiClientProvider.setNextState(proposal, 20);
      router.push({
        name: "PetInsuranceLandingV1Finish"
      });
    },
    formatCurrency(value) {
      value = value.toFixed(2);
      value = value.replace(".", ",");
      return `R$ ${value}`;
    }
  },
  async beforeMount() {
    const proposalId = this.$route.params.proposalId;
    this.proposal = await apiClientProvider.getProposalById(proposalId);

    apiClientProvider.getServiceArea(this.proposal._id).then(area => {
      this.serviceArea = area;
    });

    // TODO: Tira essa gambeta.
    router = this.$router;

    if (!this.proposal.petInsuranceData.ageRange) {
      this.proposal.petInsuranceData.ageRange = 2;
    }

    switch (parseInt(this.proposal.petInsuranceData.ageRange)) {
      case 1:
        console.log("case 1");
        this.plans = [
          {
            logo: "/static/img/pet-insurance/icon_pet_basic.png",
            name: "PET BASIC (Ambulatorial)",
            color: "rgb(241, 218, 0)",
            description:
              "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET BASIC cobre consultas clínicas (exceto consultas com especialista), exames laboratoriais (exceto hormonais), vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
            value: 73.64
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_light.png",
            name: "PET LIGHT (Ambulatorial)",
            color: "rgb(141, 198, 63)",
            description:
              "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames laboratoriais, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
            value: 108.37
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_plus.png",
            name: "PET PLUS (Ambulatorial + Hospitalar)",
            color: "rgb(133, 96, 168)",
            description:
              "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
            value: 162.56
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_total.png",
            name: "PET TOTAL (Completo)",
            color: "rgb(247, 148, 29)",
            description:
              "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
            value: 238.05
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_premium.png",
            name: "PET PREMIUM (Completo + Reembolso)",
            color: "rgb(67, 132, 193)",
            description:
              "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada.",
            value: 491.83
          }
        ];
        break;
      case 2:
        console.log("case 2");
        this.plans = [
          {
            logo: "/static/img/pet-insurance/icon_pet_basic.png",
            name: "PET BASIC (Ambulatorial)",
            color: "rgb(241, 218, 0)",
            description:
              "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET BASIC cobre consultas clínicas (exceto consultas com especialista), exames laboratoriais (exceto hormonais), vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
            value: 61.86
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_light.png",
            name: "PET LIGHT (Ambulatorial)",
            color: "rgb(141, 198, 63)",
            description:
              "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames laboratoriais, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
            value: 91.93
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_plus.png",
            name: "PET PLUS (Ambulatorial + Hospitalar)",
            color: "rgb(133, 96, 168)",
            description:
              "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
            value: 136.56
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_total.png",
            name: "PET TOTAL (Completo)",
            color: "rgb(247, 148, 29)",
            description:
              "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
            value: 199.98
          },
          {
            logo: "/static/img/pet-insurance/icon_pet_premium.png",
            name: "PET PREMIUM (Completo + Reembolso)",
            color: "rgb(67, 132, 193)",
            description:
              "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada.",
            value: 413.14
          }
        ];
        break;
      case 3:
        console.log("case 3");
        this.plans = [
          {
            logo: "/static/img/pet-insurance/icon_pet_senior.png",
            name: "PET SENIOR",
            color: "rgb(174, 143, 68)",
            description:
              "Este plano inclui os serviços Pet Phone, DigiPet, Pet Club, vacinas anuais (carência de 180 dias) e a primeira visita Pet Home para colocação do microchip.",
            value: 46
          }
        ];
        break;
      default:
        console.log("deu merda");
    }
    console.log("this.plans", this.plans);
    this.loading = false;
  },
  components: {
    Footer: Footer,
    NavBar: NavBar,
    FormInput: FormInput,
    FormSelect: FormSelect,
    googleMap: VueGoogleMaps.Map,
    googleMarker: VueGoogleMaps.Marker
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  margin-top: 50px;
  margin-bottom: 50px;
}
header {
  background-color: #000;
  padding-top: 100px;
  padding-bottom: 100px;
  background-position: center;
  background-repeat: no-repeat;
}

.color-background {
  color: white;
  background: #00d886;
  background: -moz-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: -webkit-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: linear-gradient(to right, #00d886 0%, #00d6e7 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
}

header h1 {
  font-size: 50px;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(0, 0, 0, 0.8);
}
.call-to-action {
  border: 1px solid transparent;
  vertical-align: middle;
  font-size: 14px;
  letter-spacing: -0.5px;
  border-radius: 100px;
  cursor: pointer;
  padding: 5px 30px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to bottom, orange, #ff8400);
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}

.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.plan-value {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}

.logo-plan-miniatures {
  margin-top: 10px;
}

.logo-plan-miniatures img {
  display: inline-block;
}

.section {
  color: #148892;
  font-size: 24px;
  text-align: justify;
}
.flow-icon {
  font-size: 34px;
}
.flow-step-next {
  display: inline-block;
  font-size: 42px;
  margin-right: 20px;
  margin-left: 20px;
}

.flow-step {
  max-width: 150px;
  height: 150px;
  border: solid 5px #fff;
  display: inline-block;
  border-radius: 70px;
  padding: 20px;
  margin-right: 40px;
  margin-bottom: 20px;
}

.flow-step p {
  margin-top: 5px;
}

.subtitle {
  font-size: 50px;
  text-transform: uppercase;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
}
.form-container {
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 00px;
  background: rgba(214, 213, 213, 0.835);
  border: solid 1px rgb(196, 196, 246);
  min-height: 300px;
  margin-bottom: 15px;
}
.loadingMessage {
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.loading-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
.place-card {
  border: solid 1px #d3d3d3;
  background-color: #e6e6e6;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
