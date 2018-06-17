export default {
    generateEmptyProposal: () => {
        return {
            proposer: {
                dateOfBirth: "",
                name: "",
                email: "",
                homeAddress: {
                    zipCode: "",
                    state: "",
                    city: ""
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
            }
        }
    }
}