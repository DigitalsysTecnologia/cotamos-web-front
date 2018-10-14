<template>
  <v-layout row wrap>
    <v-flex xs10 offset-xs1>
      <h1 class="subtitle text-center">Cadastre-se e seja nosso parceiro</h1>
      <v-stepper v-model="step">
        
        <v-stepper-header>
          <v-stepper-step :complete="step > 1" step="1">Dados Contato</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :complete="step > 2" step="2">Dados Bancários</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3">Finalização</v-stepper-step>
        </v-stepper-header>

        <v-layout row wrap>
          <v-flex md10 offset-md1>
            <v-stepper-items>
              <v-stepper-content step="1">
                <BasicData v-on:submit="createPartner" :partner="partner"/>
              </v-stepper-content>
              <v-stepper-content step="2">
                <BankingData v-on:submit="updatePartner" :bankingData="partner.bankingData"/>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-layout>
                  <v-flex md12>
                    <h3>Obrigado por se cadastrar como parceiro Cotamos</h3>
                   
                    <p>Você receberá um e-mail com seus dados de acesso à plataforma.</p>
                    <p>
                      Caso tenha alguma dúvida, você pode entrar em contato conosco através dos seguintes canais:

                      <ul style="margin-top:10px;">
                        <li>
                          <span>Telefone: <i class="fab fa-whatsapp-square"/> (11) 3297-3864</span>
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
                  </v-flex>
                </v-layout>
              </v-stepper-content>
            </v-stepper-items>
          </v-flex>
        </v-layout>
       </v-stepper>
    </v-flex>
  </v-layout>
</template>

<script>
import BasicData from "@/components/Forms/PartnerForm/BasicData";
import BankingData from "@/components/Forms/PartnerForm/BankingData";
import UserData from "@/components/Forms/PartnerForm/UserData";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "PartnerFlow",
  data() {
    return {
      step: 1,
      loading: true,
      partner: {
        name: "",
        email: "",
        dateOfBirth: null,
        phones: [
          {
            areaCode: "",
            number: "",
            fullNumber: ""
          }
        ],
        bankingData: {
          bankNumber: '',
          branch: '',
          account: ''
        },
        companyAddress: {
          city: "",
          complement: "",
          neighborhood: "",
          number: "",
          state: "",
          street: "",
          zipCode: ""
        }
      }
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      }
    },
    loadingMessages: {
      get() {
        return this.loadingMessage;
      }
    }
  },
  methods: {
    next: async function() {
      this.step++;
    },
    submitBasicData: async function() {
      this.next();
    },
    createPartner: async function() {
      const existingPartiner = await apiClientProvider.createPartner(this.partner);
      this.partner._id = existingPartiner._id 

      this.next();
    },
    updatePartner: async function() {
      await apiClientProvider.updatePartner(this.partner);
      this.next();
    }
  },
  async mounted() {},
  async beforeMount() {},
  components: {
    BasicData,
    BankingData,
    UserData
  }
};
</script>

<style scoped>
</style>