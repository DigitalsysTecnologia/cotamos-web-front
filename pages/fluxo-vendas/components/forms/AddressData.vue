<template>
    <v-layout row wrap>
        <v-flex sm12>
            <v-text-field label="CEP" type="text" id="address.zipCode" :error="!!(validation.firstError('address.zipCode'))" :error-messages="validation.firstError('address.zipCode')" mask="#####-###" v-model.trim="address.zipCode" />
            <v-text-field label="UF" id="address.state" :error="!!(validation.firstError('address.state'))" :error-messages="validation.firstError('address.state')" v-model="address.state" />
            <v-text-field label="Cidade" id="address.city" :error="!!(validation.firstError('address.city'))" :error-messages="validation.firstError('address.city')" v-model.trim.lazy="address.city" />
            <v-text-field label="Logradouro" id="address.street" :error="!!(validation.firstError('address.street'))" :error-messages="validation.firstError('address.street')" v-model.trim.lazy="address.street" />
            <v-text-field label="Número" id="address.number" :error="!!(validation.firstError('address.number'))" :error-messages="validation.firstError('address.number')" v-model.trim.lazy="address.number" />
            <v-btn color="primary" @click="onSubmit">{{ submitButtonText }}</v-btn>
            <v-btn flat @click="onCancel" v-if="showCancelButton"> {{ cancelButtonText }}</v-btn>
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
        name: "AddressData",
        data() {
            return {};
        },
        props: {
            address: {
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
        watch: {
            "address.zipCode": function(value) {
                this.getAddressByZipCode(value);
            }
        },
        methods: {
            getAddressByZipCode: function(zipCode) {
                if (!zipCode || zipCode.length < 8) {
                    return;
                }
                
                apiClientProvider
                    .getAddressByZipCode(zipCode)
                    .then(address => {
                        this.address.street = address.street;
                        this.address.complement = address.complement;
                        this.address.neighborhood = address.neighborhood;
                        this.address.city = address.city;
                        this.address.state = address.state;
                    })
                    .catch(err => {});
            },
            onCancel: async function() {
                this.$emit("onCancel");
            },
            onSubmit: async function() {
                console.log('onSubmit')
                const isValid = await this.$validate();

                console.log('this.address', this.address)
                if (isValid) {
                    this.$emit("onSubmit", this.address);
                }
            }
        },
        validators: {
            "address.street": value =>
                validator.validateHomeAddressStreet(value),
            "address.number": value =>
                validator.validateHomeAddressNumber(value),
            "address.zipCode": value =>
                validator.validateZipCode(value),
            "address.state": value =>
                validator.validateHomeAddressState(value),
            "address.city": value =>
                validator.validateHomeAddressCity(value),
        },
        components: {
            DateInput: DateInput,
            PhoneInput: PhoneInput,
        }
    };
</script>

<style scoped>
    
</style>
