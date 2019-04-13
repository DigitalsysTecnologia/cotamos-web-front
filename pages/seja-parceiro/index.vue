<template>
  <v-container>
    <v-layout row wrap align-center justify-center>
      <v-flex xs12>
        <h1 class="subtitle text-center">Seja um parceiro Cotamos</h1>
        <p>Com a Cotamos, você pode ter uma renda extra com a venda conjugada de plano de saúde PET.</p>

        <p>
          Através da nossa plataforma, você pode vender PLANO DE SAÚDE PET para seus amigos, vizinhos ou mesmo os clientes de seu negócio.
          <br>Oferecemos todo o suporte para que você possa realizar a venda com tranquilidade, segurança, seriedade e um produto de alta qualidade.
        </p>
      </v-flex>

      <v-flex xs12 class="section">
        <h2 class="subtitle text-center">Tipos de parceria</h2>

        <section class="section">
          <h3 class="headline mb-0 mt-0 section-title">Para Pessoa Física</h3>
          <div class="section-body">
            <p>Caso você criador não possua CNPJ, podemos firmar a parceira sem problemas, emitiremos um cartão pré-pago e você controlará todas as transações pela plataforma Cotamos.com e os pagamentos serão automaticamente debitados no seu cartão pré-pago.</p>
          </div>
        </section>

        <section class="section">
          <h3 class="headline mb-0 mt-0 section-title">Para Pessoa Jurídica</h3>
          <div class="section-body">
            <p>
              Basta cadastrar sua empresa na plataforma cotamos.com que terá todas as transações efetuadas com o total acompanhamento e controle de todas as etapas evolutiva da venda.
              <br>Desde o cadastramento da proposta até pagamento das comissões na conta corrente da empresa.
            </p>
          </div>
        </section>
      </v-flex>

      <v-flex xs12 class="section" style="border-radius:15px;">
        <h1 class="subtitle text-center">Como funciona?</h1>

        <v-carousel :hide-controls="true" :height="350" style="border-radius:15px;">
          <v-carousel-item
            v-for="(item, idx) in carouselItems"
            :key="idx"
            style="background-color: #00899c;"
          >
            <InfoCard :name="item.title" :imgUrl="item.imgUrl" :description="item.description"/>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

      <v-flex xs12 class="section">
        <h2 class="subtitle text-center">Seja Parceiro</h2>
        <p class="text-center">Cadastre-se e comece a realizar as vendas (totalmente grátis)</p>

        <v-btn color="primary" dark round block href="/fluxo-parceria">Cadastre-se grátis</v-btn>
        <v-btn color="primary" dark round block href="/painel/login" outline>Já tenho cadastro</v-btn>
      </v-flex>

      <v-flex xs12 class="section">
        <h2 class="subtitle text-center">Possíveis Dúvidas</h2>
        <Faq :items="faqs"/>
      </v-flex>

      <v-flex xs12 class="section">
        <h2 class="subtitle text-center">Seja Parceiro</h2>
        <p class="text-center">Cadastre-se e comece a realizar as vendas (totalmente grátis)</p>

        <v-btn color="primary" dark round block href="/fluxo-parceria">Cadastre-se grátis</v-btn>
        <v-btn color="primary" dark round block href="/painel/login" outline>Já tenho cadastro</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";
import NavBar from "@/components/organisms/NavBar";
import Faq from "@/components/molecules/Faq";
import InfoCard from "@/components/molecules/InfoCard";
import CallToAction from "@/components/atoms/CallToAction";
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
      ],
      carouselItems: [
        {
          title: "Fale com seus clientes sobre nossos produtos",
          description: "Será bom para ele e bom para você",
          imgUrl: "/img/icons/business.png"
        },
        {
          title: "Simule o plano para seu cliente",
          description: "Através de nossa plataforma automatizada",
          imgUrl: "/img/icons/simulation.png"
        },

        {
          title: "Seja comissionado",
          description:
            "Você recebe sua comissão em até 45 dias após a confirmação de pagamento do seu cliente",
          imgUrl: "/img/icons/payment.png"
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
    InfoCard: InfoCard
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  margin-top: 20px;
}

.section-body {
  margin-top: 20px;
}

.section-title {
  color: #00899c;
  font-weight: bold;
}
</style>
