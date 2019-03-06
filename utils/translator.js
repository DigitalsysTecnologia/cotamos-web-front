export default {
  translateProduct: value => {
    switch (parseInt(value)) {
      case 2:
        return "Seguro Saúde";
      case 5:
        return "Plano de Saúde PET";
      default:
        return `Desconhecido (${value})`;
    }
  },

  translateState: value => {
    console.log('translateState', value)
    switch (parseInt(value)) {
      case 0:
        return "Proposta Gerada";
      case 1:
        return "Cadastro Básico";
      case 2:
        return "Cadastro Completo";
      case 3:
        return "Ofertas Visualizadas";
      case 4:
        return "Plano Escolhido";
      case 10:
        return "Pronto para Integração";
      case 11:
        return "Aguardando disponibilidade de Área";
      case 12:
        return "Aguardando Pagamento";
      case 20:
        return "Aprovada";
      case 21:
        return "Sem Oferta";
      case 23:
        return "Proposta Negada";
      case 24:
        return "Proposta Paga";
      default:
        return "Desconhecido";
    }
  },

  translatePaymentMethod: value => {
    switch (parseInt(value)) {
      case 1:
        return "Boleto";
      case 2:
        return "Cartão de Crédito";
      case 3:
        return "Débito em Conta";
      default:
        return "(Desconhecido)";
    }
  }
};
