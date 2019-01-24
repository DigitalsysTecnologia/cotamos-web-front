<template>
    <v-layout row wrap>
        <v-flex sm12>
            <v-text-field label="Nome do PET" id="petInsuranceData.name" :error="!!(validation.firstError('petInsuranceData.name'))" :error-messages="validation.firstError('petInsuranceData.name')" v-model="petInsuranceData.name" />
            <DateInput label="Data de nascimento do Pet" icon="fa-calendar" id="petInsuranceData.dateOfBirth" type="text" :validationMessage="validation.firstError('petInsuranceData.dateOfBirth')" v-model="petInsuranceData.dateOfBirth" />
        </v-flex>
        <v-flex sm6 xs12>
            <v-radio-group v-model="petInsuranceData.gender" label="Sexo do Pet" :error="!!(validation.firstError('petInsuranceData.gender'))" :error-messages="validation.firstError('petInsuranceData.gender')">
                <v-radio key="Macho" label="Macho" value="Macho" color="primary" />
                <v-radio key="Fêmea" label="Fêmea" value="Fêmea" color="primary" />
            </v-radio-group>
        </v-flex>
        <v-flex sm6 xs12>
            <v-radio-group label="Espécie do Pet" v-model="petInsuranceData.specie" :error="!!(validation.firstError('petInsuranceData.specie'))" :error-messages="validation.firstError('petInsuranceData.specie')">
                <v-radio key="Canino" label="Canino" value="Canino" color="primary" />
                <v-radio key="Felino" label="Felino" value="Felino" color="primary" />
            </v-radio-group>    
        </v-flex>
        <v-flex sm12>
            <button class="btn call-to-action large" :class="className" :style="{ 'color': textColor}" v-on:click="onSubmit"> {{ submitButtonText }} </button>
            <button class="btn call-to-action-white large" :class="className" :style="{ 'color': textColor}" v-on:click="onCancel"> {{ cancelButtonText }} </button>

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
        name: "PetInsuranceData",
        data() {
            return {};
        },
        props: {
            petInsuranceData: {
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
                default: 'Cancelar'
            },
            submitButtonText: {
                type: String,
                required: false,
                default: 'Continuar'
            }
        },
        methods: {
            onCancel: async function() {
                this.$emit("onCancel");
            },
            onSubmit: async function() {
                const isValid = await this.$validate();
                if (isValid) {
                    this.$emit("onSubmit", this.proposal);
                }
            }
        },
        validators: {
            "petInsuranceData.gender": value => validator.validatePetGender(value),
            "petInsuranceData.specie": value => validator.validatePetSpecie(value)
        },
        components: {
            DateInput: DateInput,
            PhoneInput: PhoneInput,
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
