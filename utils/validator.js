import SimpleVueValidation from "simple-vue-validator";
import moment from "moment";
const Validator = SimpleVueValidation.Validator;
const CPF = require("cpf_cnpj").CPF;
const CNPJ = require("cpf_cnpj").CNPJ;

export default {
    validatePage: async (page) => {
        let result = true;

        // Valida os elementos da página
        result &= await page.$validate()

        // Valida os elementos filhos da página
        for (let i = 0; i < page.$children.length; i++) {
            const item = page.$children[i];
            try {
                result &= await item.$validate()
            } catch (err) {
                // Caso o elemento tenha validação, um erro irá explodir, nesse caso, ignoramos o problema e vamos ao próximo elemento a ser validado.
            }
        }

        return result;
    },
    validatePetDateOfBirth: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a data de nascimento do pet.")
            .custom(function () {
                if (value == null) {
                    return null;
                }

                if (value.length !== 25) {
                    return "Data inválida";
                }

                const dateOfBirth = moment(value, "YYYY-MM-DDTHH:mm:ss-Z");
                if (!dateOfBirth.isValid()) {
                    return "Data inválida";
                }

                const now = moment();
                const duration = moment.duration(now.diff(dateOfBirth));
                const ageInYears = duration.asYears();

                if (ageInYears <= 0) {
                    return "Data inválida";
                }

                if (ageInYears > 14) {
                    return "Data inválida (Acima de 14 anos)";
                }

                return null;
            });
    },
    validateTermsAndConditions: (value) => {
        return Validator.value(value)
            .required("Campo obrigatório")
            .custom(function () {
                if(!value) {
                    return "Campo obrigatório"
                }
            })
    },
    validateDateOfBirth: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a sua data de nascimento.")
            .custom(function () {
                if (value == null) {
                    return null;
                }

                if (value.length !== 25) {
                    return "Data inválida";
                }

                const dateOfBirth = moment(value, "YYYY-MM-DDTHH:mm:ss-Z");
                if (!dateOfBirth.isValid()) {
                    return "Data inválida";
                }

                const now = moment();
                const duration = moment.duration(now.diff(dateOfBirth));
                const ageInYears = duration.asYears();
                if (ageInYears <= 0) {
                    return "Data inválida";
                }

                if (ageInYears < 18) {
                    return "Idade inferior a 18 anos";
                }

                if (ageInYears > 90) {
                    return "Data inválida";
                }

                return null;
            });
    },
    validateDate: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a sua data de nascimento.")
            .custom(function () {
                if (value == null) {
                    return null;
                }

                if (value.length !== 25 && value.length !== 10) {
                    return "Data inválida";
                }

                const dateInISO = moment(value, "YYYY-MM-DDTHH:mm:ss-Z");
                const dateInPtBR = moment(value, "DD/MM/YYYY");
                if (!dateInISO.isValid() && !dateInPtBR.isValid()) {
                    return "Data inválida";
                }

                return null;
            });
    },
    validatePaymentMethod: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a forma de pagamento.")
    },
    validatePetGender: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o sexo do seu pet")
    },
    validatePetSpecie: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a espécie do seu pet")
    },
    validateZipCode: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o seu CEP")
            .custom(function () {
                if (!value) {
                    return null;
                }
                const num = value.replace(/\D/g, "");
                if (num.length < 8) {
                    return "CEP inválido.";
                }
            });
    },
    validatePetName: (value) => {
        return Validator.value(value)
            .required("Nome é obrigatório.")
    },
    validatePetAge: (value) => {
        return Validator.value(value)
            .required("Idade do pet é obrigatória.")
            .custom(function () {
                const petAge = parseInt(value);

                if (isNaN(petAge)) {
                    return "Idade inválida";
                }

                if (petAge < 0) {
                    return "Idade inválida";
                }

                if (petAge >= 13) {
                    return "Idade inválida";
                }

                return null;
            });
    },
    validatePetAgeRange: (value) => {
        return Validator.value(value)
            .required("Idade é obrigatória.");
    },
    validateClientName: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o seu nome completo.")
            .minLength(5, "Por favor, nos informe o seu nome completo.")
            .custom(function () {
                if (value.split(" ").length - 1 < 1) {
                    return "Por favor, nos informe o seu nome completo.";
                }
            });
    },
    validateBankNumber: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o seu banco.")
            .minLength(3, "Por favor, nos informe o seu banco.")
    },
    validateBankAccount: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a conta bancária.")
            .minLength(4, "Por favor, nos informe a conta bancária.")
    },
    validateBankBranch: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe a agência bancária.")
            .minLength(4, "Por favor, nos informe a agência bancária.")
    },
    validateEmail: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o seu e-mail.")
            .email("E-mail inválido");
    },
    validateHomeAddressStreet: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o seu logradouro.")
    },
    validateHomeAddressNumber: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o número.")
    },
    validateHomeAddressState: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe o seu estado.")
            .minLength(2, "Estado Inválido");
    },
    validatePetType: (value) => {
        return Validator.value(value).required(
            "Tipo do pet é obrigatório."
        );
    },
    validatePetGender: (value) => {
        return Validator.value(value).required(
            "Sexo do pet é obrigatório."
        );
    },
    validateHomeAddressCity: (value) => {
        return Validator.value(value).required(
            "Por favor, nos informe a sua cidade."
        );
    },
    validatePhoneAreaCode: (value) => {
        return Validator.value(value)
            .required("Por favor, nos informe seu DDD.")
            .digit("DDD com valor não-numérico")
            .minLength(2, "Favor Informar o DDD com 2 dígitos")
            .custom(function () {
                const validAreaCodes = [
                    11,
                    12,
                    13,
                    14,
                    15,
                    16,
                    17,
                    18,
                    19,
                    21,
                    22,
                    24,
                    27,
                    28,
                    31,
                    32,
                    33,
                    34,
                    35,
                    37,
                    38,
                    41,
                    42,
                    43,
                    44,
                    45,
                    46,
                    47,
                    48,
                    49,
                    51,
                    53,
                    54,
                    55,
                    61,
                    62,
                    63,
                    64,
                    65,
                    66,
                    67,
                    68,
                    69,
                    71,
                    73,
                    74,
                    75,
                    77,
                    79,
                    81,
                    82,
                    83,
                    84,
                    85,
                    86,
                    87,
                    88,
                    89,
                    91,
                    92,
                    93,
                    94,
                    95,
                    96,
                    97,
                    98,
                    99
                ];
                const ddd = parseInt(value);
                if (!validAreaCodes.includes(ddd)) {
                    return "DDD inválido";
                }

                return null;
            });
    },
    validatePhoneNumber: (value) => {
        const val = value.replace(/\D/g, "");

        return Validator.value(val)
            .required("Por favor, nos informe seu telefone.")
            .minLength(8, "Favor Informar o telefone completo");
    },
    validateFullPhoneNumber: (value) => {
        const val = value.replace(/\D/g, "");
        return Validator.value(val)
            .required("Por favor, nos informe seu telefone.")
            .minLength(10, "Favor Informar o telefone completo");
    },
    validateCpf: (value) => {
        return Validator.value(value)
            .custom(function () {

                if (!value) {
                    return "CPF é obrigatório";
                }

                if (!CPF.isValid(value)) {
                    return "CPF inválido";
                }
            });
    },
    validateCnpj: (value) => {
        return Validator.value(value)
            .custom(function () {

                if (!value) {
                    return "CNPJ é obrigatório";
                }

                if (!CNPJ.isValid(value)) {
                    return "CNPJ inválido";
                }
            });
    },
    validateProfession: (value) => {
        return Validator.value(value)
            .custom(function () {

                if (!value) {
                    return "Profissão é obrigatória";
                }
            });
    },
    validateRequired: (value, msg) => {
        return Validator.value(value).required(msg);
    },
}