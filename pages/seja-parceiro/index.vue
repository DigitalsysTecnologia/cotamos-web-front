<template>
  <div>
    <div class="row section">
      <div class="col-xs-12 text-center">
        <h3 class="subtitle">Você sabe o que é plano de saúde pet?</h3>

        <h3
          class="subtitle"
        >É a oportunidade de passar as despesas com vacinas, consultas, internações e cirurgias do seu pet para uma seguradora</h3>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Você sabe quanto pode custar a saúde do seu amigo?</h2>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Conhece o plano de saúde pet?</h2>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Como funciona a parceria?</h2>

        <CallToAction targetUrl="/fluxo-parceria">Seja Parceiro</CallToAction>
        <CallToAction targetUrl="/painel/login">Já sou Parceiro</CallToAction>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Vídeos</h2>

        <!-- <Faq :items="faqs"/> -->
        <CallToAction targetUrl="/fluxo-parceria">Seja Um Parceiro Cotamos</CallToAction>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Dùvidas Comuns</h2>

        <!-- <Faq :items="faqs"/> -->
        <CallToAction targetUrl="/fluxo-parceria">Seja Um Parceiro Cotamos</CallToAction>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Depoimento</h2>

        <iframe
          src="https://player.vimeo.com/video/289486967"
          width="640"
          height="360"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
        ></iframe>
        <p>
          <a href="https://vimeo.com/289486967">DEPOIMENTO LUCINEIDE - HEALTH FOR PET</a> from
          <a href="https://vimeo.com/user87672817">Bravoz Produ&ccedil;&otilde;es</a> on
          <a href="https://vimeo.com">Vimeo</a>.
        </p>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <h2 class="subtitle">Se o meu pet falasse!</h2>

        <p>Nossos News letters</p>
      </div>
    </div>

    <div class="row section">
      <div class="col-xs-12 text-center">
        <CallToAction targetUrl="/fluxo-parceria">Seja Parceiro</CallToAction>
        <CallToAction targetUrl="/painel/login">Já sou Parceiro</CallToAction>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Faq from "@/components/Faq";
import ProductCard from "@/components/ProductCard";
import CallToAction from "@/components/CallToAction";
import apiClientProvider from "@/utils/apiClient";

export default {
  name: "Home",
  data() {
    return {
      faqs: [
        {
          question: "Esse plano de saúde para pet (cão e gato) é idôneo?",
          answer:
            "Sim, 100% idôneo. Esse plano é assegurado pelo Porto Seguro heath4pet. Uma das maiores seguradoras do Brasil."
        },
        {
          question: "Como cadastro meu canil/gatil como parceiro?",
          answer:
            "No e-mail enviado pela Cotamos.com existe um link que o levará para a página do Parceiro. Lá poderá efetuar o cadastro de seu canil/gatil e receber um login de acesso para efetuar os cadastramentos das indicações. "
        },
        {
          question: "Como saber quais os planos de saúde eu negociei?",
          answer:
            "Na página do Parceiro também será possível acompanhar o conta corrente de suas comissões."
        },
        {
          question: "Como recebo minha comissão?",
          answer:
            "Através de deposito automático feitos na conta bancária cadastrada na página do Parceiro. O parceiro receberá 50% da primeira parcela paga pelo cliente e mais 50% do valor pago pelo cliente na segunda parcela.   Exemplo: Um plano que custa R$100,00. O parceiro receberá como comissão: R$50,00 no primeiro pagamento quitado pelo cliente, e mais R$50,00 no segundo pagamento pago pelo cliente."
        },
        {
          question: "Quando recebo minha comissão?",
          answer:
            "Tão logo liberadas pela Seguradora, são automaticamente remetidas para a conta corrente cadastrada."
        },
        {
          question:
            "Como recebo minhas comissões caso eu não possua conta bancária?",
          answer:
            "Caso não possua conta corrente, poderá ser providenciado um cartão pré pago, ao qual vincularemos as comissões do parceiro, as quais poderão ser acompanhadas no conta corrente das comissões do parceiro normalmente."
        },
        {
          question:
            "O cliente pode comprar esse plano de saúde mais barato na heath4pet?",
          answer:
            "Não. Os preços são tabelados para qualquer corretora. No entanto, os valores de comissões são apenas para os parceiros da Cotamos.com."
        },
        {
          question:
            "Qualquer cliente do meu canil pode comprar esse plano de saúde pet?",
          answer:
            "Sim. Porém, caso compre em outro corretor. Obviamente, a Cotamos.com não recebe e nem paga comissão."
        },
        {
          question: "Qualquer animal é aceito nesse plano de saúde pet?",
          answer:
            "Não. Os planos de saúde são apenas para PETs ( Cães e Gatos). Portanto, NÃO atende outras espécies de animais, inclusive silvestres."
        },
        {
          question: "Qualquer cão/gato é aceito nesse plano de saúde pet?",
          answer:
            "Não, os pets são aceitos após a consulta inicial, que ocorre logo após o cadastramento realizado no sistema pelo parceiro."
        },
        {
          question:
            "Que vantagem esses planos de saúde oferece a um cão com mais de 9 anos de idade?",
          answer:
            "Vacinas anuais (carência de 180 dias) e a primeira visita Pet Home para 		colocação do microchip. O PET SENIOR não cobre os atendimentos veterinários, 	mas oferece preços especiais para consultas no Pet Home."
        },
        {
          question:
            "Um cão/gato já segurado poderá perder a garantia do plano quando fizer 9 anos?",
          answer:
            "Não, desde que em dia com os pagamentos do plano é garantido para toda a vida do pet."
        },
        {
          question: "Quem adquirir mais de um plano tem desconto?",
          answer: "A partir de 5 vidas os valores são diferenciados. "
        },
        {
          question: "Parcelar no cartão de crédito tem desconto?",
          answer:
            "Sim, e para débito em conta, também possui descontos nas mensalidades."
        },
        {
          question:
            "Como criador, tenho desconto se adquirir um plano de saúde para meus pets?",
          answer:
            "Criadores também possuem condições especiais desde que plano coletivo."
        },
        {
          question:
            "O porte do animal influência no valor do plano de heath4pet?",
          answer:
            "Não, os planos são classificados pela idade do animal e não pelo porte. "
        },
        {
          question: "O plano de saúde de um cão e um gato tem preço diferente?",
          answer:
            "Não, as classificações dos planos são para pet que compreende cães e gatos."
        },
        {
          question:
            "Pessoa jurídica pode adquirir esse plano de saúde para seu(s) pet(s)?",
          answer: "Sim, normalmente."
        },
        {
          question:
            "Cão ou gato com doenças preexistentes são aceitos no plano de saúde heath4pet?",
          answer:
            "Os pets serão aceitos somente após avaliação da consulta de admissão pelo 	médico veterinário."
        },
        {
          question:
            "Que garantia a corretora de seguros ’COTAMOS.com‘ oferece?",
          answer:
            "A garantia é da própria Seguradora Porto Seguro, empresa renomada e respeitada no ramo Brasil no ramo de seguros. A Cotamos.com é uma corretora credenciada pela Porto Seguro e certificada pela SUSEP."
        }
      ]
    };
  },
  methods: {
    createPartner: async function(partner) {}
  },
  components: {
    Faq: Faq,
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
