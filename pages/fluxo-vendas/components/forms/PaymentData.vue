<template>
    <v-layout row wrap>
        <v-flex sm6 xs12>
            <v-layout align-center justify-center row fill-height>
                <v-flex xs12 style="margin-left:20px;">
                    <img class="plan-logo" :src="selectedPlan.logo" />
                    <p>
                        <span class="plan-name"> {{selectedPlan.name}}</span>
                        <span class="plan-value" v-if="proposal.paymentData.method"> {{ formatCurrency(planPrice)}} </span>
                    </p>
                </v-flex>
            </v-layout>
        </v-flex>
    
        <v-flex sm6 xs12>
            <v-radio-group label="" v-model="proposal.paymentData.method" :error="!!(validation.firstError('proposal.paymentData.method'))" :error-messages="validation.firstError('proposal.paymentData.method')">
                <v-radio key="Boleto" label="Boleto" value="1" color="primary" />
                <v-radio key="Cartão de Crédito" label="Cartão de Crédito" value="2" color="primary" />
                <v-radio key="Débito em Conta" label="Débito em Conta" value="3" color="primary" />
            </v-radio-group>
        </v-flex>
        <v-flex xs12>
            <v-btn color="primary" @click="onSubmit">{{ submitButtonText }}</v-btn>
            <v-btn flat @click="onCancel" v-if="showCancelButton"> {{ cancelButtonText }}</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    import validator from "@/utils/validator";
    import factory from "@/utils/factory";
    import petInsuranceProvider from "@/utils/petInsuranceProvider";
    import apiClientProvider from "@/utils/apiClient";
    
    export default {
        name: "PaymentData",
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
    .plan-logo {
        display: block;
        margin-top: 20px;
        height: 50px;
        font-weight: bold;
    }
    
    .plan-name {
        display: block;
        padding-top: 10px;
        font-size: 16px;
        font-weight: bold;
        color: rgb(0, 137, 156);
    }
    
    .plan-value {
        font-weight: bold;
        font-family: Roboto;
        font-size: 24px;
    }
</style>
