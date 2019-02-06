<template>
    <v-layout row wrap>
        <v-flex sm12>
            <v-text-field label="Nome" id="proposer.name" :error="!!(validation.firstError('proposer.name'))" :error-messages="validation.firstError('proposer.name')" v-model.trim="proposer.name" v-if="showField['proposer.name']" />
            <DateInput label="Data de nascimento" icon="fa-calendar" id="proposer.dateOfBirth" type="text" :validationMessage="validation.firstError('proposer.dateOfBirth')" v-model="proposer.dateOfBirth" v-if="showField['proposer.dateOfBirth']" />
            <v-text-field label="E-mail" id="proposer.email" :error="!!(validation.firstError('proposer.email'))" :error-messages="validation.firstError('proposer.email')" v-model.trim="proposer.email" v-if="showField['proposer.email']" />
            <PhoneInput label="Celular ou Telefone" id="proposer.phones.0" maxLength="15" :validationMessage="validation.firstError('proposer.phones.0')" v-model.trim="proposer.phones[0]" />
            <v-text-field label="CPF" id="proposer.cpf" :error="!!(validation.firstError('proposer.cpf'))" :error-messages="validation.firstError('proposer.cpf')" mask="###.###.###-##" v-model.trim="proposer.cpf" />
            <button class="btn call-to-action large"  v-on:click="onSubmit"> {{ submitButtonText }} </button>
            <button class="btn call-to-action-white large"  v-on:click="onCancel"> {{ cancelButtonText }} </button>
        </v-flex>
    </v-layout>
</template>

<script>
    import DateInput from "@/components/DateInput";
    import PhoneInput from "@/components/PhoneInput.vue";
    import validator from "@/utils/validator";
    import factory from "@/utils/factory";
    import apiClientProvider from "@/utils/apiClient";
    
    export default {
        name: "ProposerData",
        data() {
            return {
                showField: []
            };
        },
        props: {
            proposer: {
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
                    this.$emit("onSubmit", this.proposer);
                }
            }
        },
        beforeMount() {
            console.log("ProposerData - beforeMount");
            console.log("this.proposer", this.proposer);
    
    
            if (!this.proposer.name) {
                this.proposer.name = "";
                this.showField['proposer.name'] = true;
            }
    
            if (!this.proposer.dateOfBirth) {
                this.proposer.dateOfBirth = "";
                this.showField['proposer.dateOfBirth'] = true;
            }
    
            if (!this.proposer.email) {
                this.proposer.email = "";
                this.showField['proposer.email'] = true;
            }
    
            if (!this.proposer.cpf) {
                this.proposer.cpf = "";
                this.showField['proposer.cpf'] = true;
            }
        },
        validators: {
            "proposer.name": value => validator.validateClientName(value),
            "proposer.dateOfBirth": value => validator.validateDateOfBirth(value),
            "proposer.email": value => validator.validateEmail(value),
            "proposer.cpf": value => validator.validateCpf(value)
        },
        components: {
            DateInput: DateInput,
            PhoneInput: PhoneInput
        }
    };
</script>

<style scoped>
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
