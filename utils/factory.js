export default {
    generateEmptyProposal: () => {
        return {
            proposer: {
                dateOfBirth: null,
                name: "",
                email: "",
                homeAddress: {
                    zipCode: "",
                    state: "",
                    city: "",
                    number: ""
                },
                phones: {
                    0: {
                        areaCode: "",
                        number: ""
                    }
                },
                dependents: []
            },
            petInsuranceData: {
                name: "",
                age: "",
                petType: "",
                gender: ""
            },
            state: 0
        }
    },
    getBankList: () => {
        return [
            { value: '001', text: 'Banco do Brasil S.A.' },
            { value: '341', text: 'Banco Itaú S.A.' },
            { value: '033', text: 'Banco Santander (Brasil) S.A.' },
            { value: '356', text: 'Banco Real S.A. (antigo)' },
            { value: '652', text: 'Itaú Unibanco Holding S.A.' },
            { value: '237', text: 'Banco Bradesco S.A.' },
            { value: '745', text: 'Banco Citibank S.A.' },
            { value: '399', text: 'HSBC Bank Brasil S.A.' },
            { value: '104', text: 'Caixa Econômica Federal' },
            { value: '389', text: 'Banco Mercantil do Brasil S.A.' },
            { value: '453', text: 'Banco Rural S.A.' },
            { value: '422', text: 'Banco Safra S.A.' },
            { value: '633', text: 'Banco Rendimento S.A.' },
        ]
    },
    getProposalStateList: () => {
        return [

            { text: 'Proposta Gerada', value: 0 },
            { text: 'Dados Básicos', value: 1 },
            { text: 'Cadastro Completo', value: 2 },
            { text: 'Ofertas Visualizadas', value: 3 },
            { text: 'Plano Escolhido', value: 4 },
            { text: 'Aguardando Disponibilidade', value: 11 },
            { text: 'Proposta Aprovada', value: 20 },
            { text: 'Proposta Negada', value: 21 },
            { text: 'Erro de Integração', value: 23 }
        ]

    }
}