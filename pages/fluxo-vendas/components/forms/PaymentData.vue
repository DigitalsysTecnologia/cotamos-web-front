<template>
    <v-layout row wrap>
        <v-flex sm6 xs12>
            <div class="wrapper">
                <div class="payment-wrapper">
                    <div class="upper-box">
                        <div class="title">
                            <span>Healt4Pet</span><br />
                            <span>{{selectedPlan.name}}</span><br />
                        </div>
                        <div class="plan-details">
                            <span>Tipo de Cobertura:</span><br />
                            <span>Ambulatorial</span>
                            <div class="ref">
                            <span> Ver rede referênciada </span>
                            </div>
                        </div>
                    </div>
                    <div class="lower-box">
                        
                        <span> {{formatCurrency(planPrice).split(",")[0]}}</span><span>,{{formatCurrency(planPrice).split(",")[1]}}</span><br />
                        <span class="month">/mês</span>
                    </div>
                </div>
                <v-flex xs12 style="margin-top: 2rem">
                    <v-radio-group label="" v-model="proposal.paymentData.method" :error="!!(validation.firstError('proposal.paymentData.method'))" :error-messages="validation.firstError('proposal.paymentData.method')" row>
                        <v-radio key="Boleto" label="Boleto" value="1" color="primary" />
                        <v-radio key="Cartão de Crédito" label="Cartão de Crédito" value="2" color="primary" />
                        <v-radio key="Débito em Conta" label="Débito em Conta" value="3" color="primary" />
                    </v-radio-group>
                    <button class="btn call-to-action large" :class="className" :style="{ 'color': textColor}" v-on:click="onSubmit"> {{ submitButtonText }} </button>
                    <button class="btn call-to-action-white large" :class="className" :style="{ 'color': textColor}" v-on:click="onCancel"> {{ cancelButtonText }} </button>
                </v-flex>
            </div>
        </v-flex>
        <v-flex xs12 style="margin-top: 2rem"></v-flex>
    </v-layout>
</template>

<script>
    import validator from "@/utils/validator";
    import factory from "@/utils/factory";
    import petInsuranceProvider from "@/utils/petInsuranceProvider";
    import apiClientProvider from "@/utils/apiClient";
    import CallToAction from '@/components/CallToAction' 
    
    export default {
        name: "PaymentData",
        components: {
            CallToAction
        },
        data() {
            return {
                plans: null
            };
        },
        computed: {
            planCode: {
                get() {
                    return this.proposal.petInsuranceData.selectedPlan.code;
                }
            },
            planPrice: {
                get() {
                    const paymentMethod = parseInt(this.proposal.paymentData.method);
                    let value = null;
    
                    switch (paymentMethod) {
                        case 1:
                            value = this.selectedPlan.value.bankSlip;
                            break;
                        case 2:
                            value = this.selectedPlan.value.creditCard;
                            break;
                        case 3:
                            value = this.selectedPlan.value.automaticDebit;
                            break;
                        default:
                            return "";
                    }
    
                    return value;
                }
            }
        },
        props: {
            proposal: {
                type: Object,
                required: true
            },
            showCancelButton: {
                type: Boolean,
                required: false,
                default: false
            },
            cancelButtonText: {
                type: String,
                required: false,
                default: "Cancelar"
            },
            submitButtonText: {
                type: String,
                required: false,
                default: "Continuar"
            }
        },
        methods: {
            onCancel: async function() {
                this.$emit("onCancel");
            },
            onSubmit: async function() {
                const isValid = await this.$validate();
                if (isValid) {
                    let cloneObj = JSON.parse(JSON.stringify(this.proposal.paymentData))
                    cloneObj.amount = this.planPrice;
                    cloneObj.method = parseInt(cloneObj.method);
                    this.$emit("onSubmit", cloneObj);
                }
            },
            formatCurrency(value) {
                value = value.toFixed(2);
                value = value.replace(".", ",");
                return `R$ ${value}`;
            }
        },
        validators: {},
        components: {},
        beforeMount() {
            this.plans = petInsuranceProvider.getPlansByPetAge(
                this.proposal.petInsuranceData.age
            );
    
            const plans = this.plans.filter(plan => plan.code == this.planCode);
            this.selectedPlan = plans[0];
            console.log("this.selectedPlan", this.selectedPlan);
    
            if (!this.proposal.paymentData) {
                this.proposal.paymentData = {};
            }

            if(this.proposal.paymentData.method) {
                this.proposal.paymentData.method = this.proposal.paymentData.method.toString();
            }
        }
    };
</script>

<style scoped>
    .payment-wrapper {
        background: #e57373;
        width: 22rem;
        height: auto;
        color: #FFF;
        font-family: 'Roboto', sans-serif;
        -webkit-box-shadow: 0px 0px 30px 2px rgba(89,89,89,0.2);
        -moz-box-shadow: 0px 0px 30px 2px rgba(89,89,89,0.2);
        box-shadow: 0px 0px 30px 2px rgba(89,89,89,0.2);
    }
    .title {
        text-align: center;
        padding: .5rem;
        background: #b71c1c;
        font-weight: 900;
        font-size: 2rem !important;
    }
    .plan-details {
      margin: 2rem 0 0 1rem;
      font-size: 1.2rem !important;
    }
    .plan-details span:first-child {
      font-weight: 900;
    }
    .ref {
      margin: 1rem 0 0 0;
    }
    .uper-box {
        background: #e57373;
        position: absolute;
    }
    .lower-box {
        margin: 0 auto;
        top: 2rem;
        position: relative;
        background: #b71c1c;
        width: 15rem;
        border: .5rem solid #fff;
        text-align: center;
        font-weight: bolder;   
        padding: .5rem;
    }
    .month {
      font-size: 1.2rem !important; 
    }
    .lower-box span:first-child {
        font-size: 2.5rem !important;    
    }
    .call-to-action, .call-to-action-white {
    vertical-align: middle;
    font-family: 'Roboto', sans-serif;
    letter-spacing: -0.5px;
    border-radius: 100px;
    padding: 10px 30px;
    font-size: 16;
    color: #FFF;    
    cursor: pointer;
    text-align: center;
    background-color: #ff9e1b;
    transition: all .6s ease-out;
    margin: 0 .2rem
    }
    .large {
    padding: 10px 30px;
    font-size: 20px;
    }

    .small {
    padding: 5px 30px;
    font-size: 14px;
    }

    .call-to-action:hover, .call-to-action-white {
    background-color: #ff8400;
    }
    .call-to-action-white {
        color: #969699;
        background-color: #FFF;
        border: 1px solid #969699
    }
</style>
