export default {
    getCoverage: () => {
        return [
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
                pet_total:true,
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
    },
    getPlansByPetAge: (petAge) => {
        let petAgeRange = 0;

        if (petAge < 1) {
            petAgeRange = 1;
        }
        else if (petAge < 8) {
            petAgeRange = 2;
        }
        else {
            petAgeRange = 3;
        }

        switch (parseInt(petAgeRange)) {
            case 1:
                return [
                    {
                        code: 'pet_basic',
                        logo: "/img/pet-insurance/icon_pet_basic.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET BASIC",
                        coverage: "Ambulatorial",
                        color: "rgb(241, 218, 0)",
                        description:
                            "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental.",
                        value: {
                            bankSlip: 73.64,
                            creditCard: 66.28,
                            automaticDebit: 66.28
                        }
                    },
                    {
                        code: 'pet_light',
                        logo: "/img/pet-insurance/icon_pet_light.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET LIGHT",
                        coverage: "Ambulatorial",
                        color: "rgb(141, 198, 63)",
                        description:
                            "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames laboratoriais, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
                        value: {
                            bankSlip: 108.37,
                            creditCard: 86.70,
                            automaticDebit: 97.53
                        }
                    },
                    {
                        code: 'pet_plus',
                        logo: "/img/pet-insurance/icon_pet_plus.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET PLUS",
                        coverage: "Ambulatorial + Hospitalar",
                        color: "rgb(133, 96, 168)",
                        description:
                            "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
                        value: {
                            bankSlip: 162.56,
                            creditCard: 130.05,
                            automaticDebit: 146.30
                        }
                    },
                    {
                        code: 'pet_total',
                        logo: "/img/pet-insurance/icon_pet_total.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET TOTAL",
                        coverage: "Completo",
                        color: "rgb(247, 148, 29)",
                        description:
                            "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
                        value: {
                            bankSlip: 238.05,
                            creditCard: 190.44,
                            automaticDebit: 214.25
                        }
                    },
                    {
                        code: 'pet_premium',
                        logo: "/img/pet-insurance/icon_pet_premium.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET PREMIUM",
                        coverage: "Completo + Reembolso",
                        color: "rgb(67, 132, 193)",
                        description:
                            "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada.",
                        value: {
                            bankSlip: 491.83,
                            creditCard: 442.65,
                            automaticDebit: 442.65
                        }
                    }
                ];
            case 2:
                return [
                    {
                        code: 'pet_basic',
                        logo: "/img/pet-insurance/icon_pet_basic.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET BASIC",
                        coverage: "Ambulatorial",
                        color: "rgb(241, 218, 0)",
                        description:
                            "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental.",
                        value: {
                            bankSlip: 61.86,
                            creditCard: 55.67,
                            automaticDebit: 55.67
                        }
                    },
                    {
                        code: 'pet_light',
                        logo: "/img/pet-insurance/icon_pet_light.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET LIGHT",
                        coverage: "Ambulatorial",
                        color: "rgb(141, 198, 63)",
                        description:
                            "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames laboratoriais, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
                        value: {
                            bankSlip: 91.93,
                            creditCard: 73.54,
                            automaticDebit: 82.74
                        }
                    },
                    {
                        code: 'pet_plus',
                        logo: "/img/pet-insurance/icon_pet_plus.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET PLUS",
                        coverage: "Ambulatorial + Hospitalar",
                        color: "rgb(133, 96, 168)",
                        description:
                            "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
                        value: {
                            bankSlip: 136.56,
                            creditCard: 109.25,
                            automaticDebit: 122.90
                        }
                    },
                    {
                        code: 'pet_total',
                        logo: "/img/pet-insurance/icon_pet_total.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET TOTAL",
                        coverage: "Completo",
                        color: "rgb(247, 148, 29)",
                        description:
                            "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
                        value: {
                            bankSlip: 199.98,
                            creditCard: 159.98,
                            automaticDebit: 179.98
                        }
                    },
                    {
                        code: 'pet_premium',
                        logo: "/img/pet-insurance/icon_pet_premium.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET PREMIUM",
                        coverage: "Completo + Reembolso",
                        color: "rgb(67, 132, 193)",
                        description:
                            "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada.",
                        value: {
                            bankSlip: 413.14,
                            creditCard: 371.83,
                            automaticDebit: 371.83
                        }
                    }
                ];
            case 3:
                return [
                    {
                        code: 'pet_senior',
                        logo: "/img/pet-insurance/icon_pet_senior.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET SENIOR",
                        color: "rgb(174, 143, 68)",
                        description:
                            "Este plano inclui os serviços Pet Phone, DigiPet, Pet Club, vacinas anuais (carência de 180 dias) e a primeira visita Pet Home para colocação do microchip.",
                        value: {
                            bankSlip: 46,
                            creditCard: 41.40,
                            automaticDebit: 41.40
                        }
                    }
                ];
            default:
                return [
                    {
                        logo: "/img/pet-insurance/icon_pet_senior.png",
                        insurancerLogo: "/img/porto_seguro_logo.png",
                        name: "PET SENIOR",
                        color: "rgb(174, 143, 68)",
                        description:
                            "Este plano inclui os serviços Pet Phone, DigiPet, Pet Club, vacinas anuais (carência de 180 dias) e a primeira visita Pet Home para colocação do microchip.",
                        value: 46
                    }
                ];

        };
    },
    getAllPlans: () => {
        return [
            {
                logo: "/img/pet-insurance/icon_pet_basic.png",
                name: "PET BASIC (Ambulatorial)",
                color: "rgb(241, 218, 0)",
                description:
                    "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental.",
                value: 61.86
            },
            {
                logo: "/img/pet-insurance/icon_pet_light.png",
                name: "PET LIGHT (Ambulatorial)",
                color: "rgb(141, 198, 63)",
                description:
                    "Enfermidades corriqueiras ou pequenos acidentes podem acontecer a qualquer momento. Nessas horas, contar com um cuidado rápido e qualificado é fundamental. O PET LIGHT cobre consultas, exames laboratoriais, vacinas, procedimentos ambulatoriais, incluindo urgências e emergências.",
                value: 91.93
            },
            {
                logo: "/img/pet-insurance/icon_pet_plus.png",
                name: "PET PLUS (Ambulatorial + Hospitalar)",
                color: "rgb(133, 96, 168)",
                description:
                    "Riscos maiores demandam mais cuidados. O PET PLUS cobre consultas em clínico geral eletivas, urgência, emergência, exames laboratoriais e internação do seu pet. Pareceres e Consultas de especialistas, exames de Imagem e cirurgias somente são cobertos quando em internação.",
                value: 136.56
            },
            {
                logo: "/img/pet-insurance/icon_pet_total.png",
                name: "PET TOTAL (Completo)",
                color: "rgb(247, 148, 29)",
                description:
                    "Para quem procura tranquilidade, esta é a escolha certa. O PET TOTAL oferece cobertura completa (ambulatorial + hospitalar), dando acesso a todos os serviços e procedimentos disponíveis nos planos PET LIGHT e PET PLUS, além de exames por imagem.",
                value: 199.98
            },
            {
                logo: "/img/pet-insurance/icon_pet_premium.png",
                name: "PET PREMIUM (Completo + Reembolso)",
                color: "rgb(67, 132, 193)",
                description:
                    "Versatilidade, conveniência e exclusividade. O PET PREMIUM é mais do que completo: prevê todas as coberturas do PET TOTAL e reembolso para serviços realizados fora de nossa rede credenciada.",
                value: 413.14
            }
        ];
    }
}