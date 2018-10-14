<template>
  <div>
    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Seja Nosso Parceiro</h2>
        
      </div>
    </div>


    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Preencha o seu cadastro</h2>
        <p>
1. O que significa essa parceria?
R:  É uma forma de ampliar o ganho financeiro da agência, realizando a atividade de realizar as contratações de seguro viagem pela página da corretora COTAMOS.com.

2. Quais as seguradoras que a corretora COTAMOS.com é credenciada?
R:  A corretora COTAMOS.com está credenciada nas maiores seguradoras do país, e caso necessidade poderá solicitar credenciamento a qualquer seguradora do país. Possui plataforma tecnológica integrada com as principais seguradoras para oferecer em tempo real via web, todas as cotações disponíveis de seguros dos clientes.

3. Como faço o meu cadastro como PARCEIRO?
R:  Na página da corretora COTAMOS.com existe um botão “SEJA PARCEIRO”.
Efetuando o cadastro, receberá um login e senha para efetuar as cotações de seguro dos clientes.

4. Como saber quais as regras envolvidas nesta parceria?
R:  Para ter acesso à página do PARCEIRO, é necessário ler e assinar virtualmente o contrato de parceria, no qual constarão todas as regras que caberão a cada parte.

5. Como cotar o melhor seguro para meu cliente?
R:  Ao cadastrar algumas informações básicas e necessárias do seu cliente na plataforma tecnológica, o sistema fará em tempo real uma cotação nas melhores seguradoras e apresentará as opções de preços para escolha do cliente. 
	
6. Como recebo minha comissão?
R:  Através de deposito automático feitos na conta bancária cadastrada na página do Parceiro. O parceiro receberá 50% da primeira parcela paga pelo cliente e mais 50% do valor pago pelo cliente na segunda parcela.   Exemplo: Um plano que custa R$400,00. O parceiro receberá como comissão: R$200,00 no primeiro pagamento quitado pelo cliente, e mais R$200,00 no segundo pagamento pago pelo cliente.
 
7. Quando recebo minha comissão?
R:  Tão logo liberadas pela Seguradora, são automaticamente remetidas para a conta corrente cadastrada.

8. Como posso acompanhar os seguros contratados pela minha empresa?
R:  Na página do PARCEIRO, existe painel de propostas do PARCEIRO, que constará todos os seguros e seus respectivos status para acompanhamento.

9. O cliente pode comprar esse seguro mais barato por outra corretora?
R:  Não. Os preços são tabelados, sob a fiscalização da SUSEP. 
        </p>

        <CallToAction targetUrl="/fluxo-parceria"> Seja Um Parceiro Cotamos </CallToAction>

      </div>
    </div>
    
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "Home",
  methods: {
    createPartner: async function(partner) {
      
    }
  },
  components: {
    Footer: Footer,
    Header: Header,
    NavBar: NavBar,
    CallToAction: CallToAction,
    ProductCard: ProductCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  padding-top: 20px;
  padding-bottom: 20px;
}

.carousel-inner {
  background: #00d886;
  background: -moz-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: -webkit-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: linear-gradient(to right, #00d886 0%, #00d6e7 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
}

.form-container {
  border: 2px solid rgb(5, 62, 66);
  border-radius: 5px;
  background-color: white;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
}
</style>
