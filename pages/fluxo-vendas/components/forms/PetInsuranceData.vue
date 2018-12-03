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
            <v-btn color="primary" @click="onSubmit">{{ submitButtonText }}</v-btn>
            <v-btn flat @click="onCancel" v-if="showCancelButton"  outline color="primary"> {{ cancelButtonText }}</v-btn>
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
    
</style>
