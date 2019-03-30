<template>
  <v-container fluid>
    <v-layout row wrap>
      
      <v-flex sm12>
        <v-combobox
              v-model="partnerType"
              :items="[
                        {value: 0, text: 'Sou uma pessoa física'}, 
                        {value: 1, text: 'Sou uma pessoa jurídica'}
                        ]"
              label="Tipo de Parceiro" />
      </v-flex>

      <v-flex sm12 v-if="partnerType">
        <v-text-field 
                :label="partnerType.value ? 'Razão Social' : 'Nome'"
                icon="fa-user" 
                id="partner.name"
                :error="!!(validation.firstError('partner.name'))"
                :error-messages="validation.firstError('partner.name')"
                v-model="partner.name"/>        
      </v-flex>

      <v-flex sm12 v-if="partnerType">
        <v-text-field 
                :label="partnerType.value ? 'CNPJ' : 'CPF'"
                :mask="partnerType.value ? '##.###.###/####-##' : '###.###.###-##'"
                id="partner.document"
                type="text"
                :error="!!(validation.firstError('partner.document'))"
                :error-messages="validation.firstError('partner.document')"
                v-model="partner.document" />
      </v-flex>

      <v-flex sm12 v-if="partnerType">
        <v-text-field  label="E-mail" 
                id="partner.email"
                type="text"
                :error="!!(validation.firstError('partner.email'))"
                :error-messages="validation.firstError('partner.email')"
                v-model="partner.email" />
      </v-flex>

      <!-- <v-flex sm12 v-if="partnerType">
        <v-checkbox 
                    color="primary" 
                    v-model="agreeTermsAndConditions" 
                    :error-messages="validation.firstError('agreeTermsAndConditions')" >
           <span slot="label">Li os <a href="/docs/contrato_parceria_v1.pdf">Termos e condições de uso</a> e estou ciente.</span>
        </v-checkbox>
      </v-flex> -->

      <v-dialog v-model="showTerms" scrollable max-width="900px">
        <v-card>
          <v-card-title class="headline" style="background-color: #00899c; color:white;">Termos e Condições de Uso</v-card-title>
          <v-card-text style="height: 300px;"> 
            <v-layout column align-left justify-center>
              <p>Por este instrumento particular, de um lado a COTAMOS.com CORRETORA DE SEGUROS, CNPJ 30.249.014/0001-04, Empresa Individual de Responsabilidade Limitada de Natureza Empresarial, registrada na SUSEP, sob o no 20.2021.328.0, sito à rua Dom Érico Ferrari, 388 – Chácara Inglesa – Pirituba, São Paulo – Capital, CEP 05141-160, para atuar na atividade de corretagem de seguros referentes aos ramos de SEGURO PESSOAS, CAPITALIZAÇÃO, PREVIDÊNCIA COMPLEMENTAR ABERTA, E PLANOS DE SAÚDE, doravante denominada simplesmente COTAMOS.com, e o PARCEIRO, protocolam entre si a estipulação de uma parceria empresarial, sob risco recíproco, visando oferecer negócios de comum proveito, na indicação e agenciamento de seguros de vida individual e em grupo; planos de previdência complementar; e planos de saúde pessoas e pet.</p>
              <p>1. A COTAMOS.com efetuará, sob suas custas e supervisão, as seguintes atividades, em prol da parceria proposta:</p>
              <p>a) manutenção da plataforma tecnológica web quer em infraestrutura, programação, inovação e integração com as plataformas das seguradoras e operadoras seguros e de planos de saúde. </p>
              <p>b) manutenção dos materiais eletrônicos para orientar e suportar as atuações dos PARCEIROS, de forma a apresentar as ofertas dentro da mais alta relação de transparência, lisura e boa fé.</p>
              <p>c) aquisição e atualizações das ferramentas tecnológicas necessárias para obtenção dos bons resultados tanto da parceria como ao atendimento aos clientes beneficiários dos serviços registrados nas propostas pelos PARCEIROS.</p>
              <p>d) os pagamentos das comissões pertencentes ao PARCEIRO oriundas dos clientes com pagamentos efetuados no produto, na Seguradora escolhida, conforme cláusula 6 (seis), deste termo de aceite.</p>
              <p>e) total sigilo e favorecimento quanto as informações cadastrais confiadas à COTAMOS.com pelos PARCEIROS. Sendo que qualquer nova oferta futura serão assegurados comissionamento ao PARCEIRO, mesmo que tenha sido efetivada diretamente pelo seu cliente, salvo apenas quando da livre escolha deste último. (CDC – lei n.º 8.078/90 inc. I, art. 6.º).</p>
              <p>f) cada PARCEIRO será comissionado conforme os percentuais definidos na cláusula 6 deste termo de aceite, sendo totalizados e pagos em uma data no mês, conforme os critérios de pagamentos das comissões definidos pelas Seguradoras.</p>
              <p>2. O PARCEIRO efetuará, sob suas custas e supervisão, as seguintes atividades, em prol da parceria proposta:</p>
              <p>a) indicação e registro na plataforma COTAMOS.com.</p>
              <p>b) impressão de materiais promocionais caso necessite e esclarecimentos pré-venda aos seus clientes indicados sobre os benefícios e restrições de cada produto, ou serviço efetivados a eles pelo PARCEIRO. Os materiais citados neste item serão disponibilizados na página de cadastro do PARCEIRO.</p>
              <p>c) manter atualizadas junto a COTAMOS.com as informações cadastrais, principalmente as bancárias, pois as comissões pelas indicações serão debitadas automaticamente nesta conta-corrente do PARCEIRO, conforme citado no item “1f” deste termo de aceite.</p>
              <p>d) na hipótese de necessidade descontinuidade do negócio do PARCEIRO, e haja valores pendentes de comissionamento, ele poderá receber as comissões aludidas na “cláusula 6”, mediante a informação de outra conta bancária, ou na impossibilidade, a COTAMOS.com poderá, em situações especiais (ex. descontinuidade do negócio do PARCEIRO), efetuar os pagamentos pendentes, mediante um cartão pré-pago enviado ao endereço cadastrado pelo PARCEIRO na plataforma COTAMOS.com.</p>
              <p>3. A parceria será por período indeterminado, contados a partir da data de aceite do presente instrumento, enquanto o cliente  do PARCEIRO permanecer adimplente no produto junto a Seguradora, e enquanto houver capacidade de administração do cadastro do PARCEIRO na plataforma COTAMOS.com. </p>
              <p>4. As informações confidenciais a que os PARCEIROS tiverem acesso em decorrência do ora termo de aceite de uso da plataforma COTAMOS. com não poderão, em qualquer hipótese, serem reveladas a terceiros, salvo aquelas intrinsecamente relacionadas aos negócios objetos da parceria.</p>
              <p>5. O descumprimento de qualquer das cláusulas ora previstas dará à parte inocente o direito de considerar rescindido o presente termo de aceite, independentemente de notificação judicial ou extrajudicial.</p>
              <p>6. A remuneração por comissão será de 2 (dois) pagamentos mensais de 50% cada, do valor pago pelo cliente (prêmio), conforme ilustrado abaixo:</p>
              <p>A) 50% da PRIMEIRA parcela paga pelo cliente, no primeiro mês subsequente ao pagamento, tão logo liberado pela Seguradora;</p>
              <p>B) 50% da SEGUNDA parcela paga pelo cliente, no segundo mês subsequente ao pagamento, tão logo liberado pela Seguradora;</p>
              <p>C) Ou seja: ainda a título de entendimento: imaginemos que a Seguradora pague à COTAMOS.com pelo termo de aceite indicado pelo PARCEIRO R$ 400,00. A COTAMOS.com, depositará automaticamente na conta do PARCEIRO R$ 200,00 (ou seja: 50% de comissão), pelo período de 2 (dois) meses subsequentes a liberação dos valores pela Seguradora.</p>
              <p>D) A COTAMOS.com efetuará os pagamentos automaticamente na conta-corrente do PARCEIRO. Portanto não haverá represamento de valores do PARCEIRO na corretora. Tão logo liberados pela Seguradora serão repassados de imediato na conta-corrente do PARCEIRO.</p>
              <p>E) No caso de atraso de pagamentos pelo cliente e posterior acordo e aceite pela Seguradora, tão logo os valores sejam quitados, serão repassados, de igual forma, imediatamente na conta-corrente do PARCEIRO.</p>
              <p>F) O PARCEIRO poderá realizar os acompanhamentos de todos os lançamentos e status de todos os contratos firmados entre seus clientes e a Seguradora na PÁGINA DO PARCEIRO da página da COTAMOS.com.</p>
              <p>7. A eventual inexistência de receita que alude a cláusula 6 fará com que NÃO seja devida qualquer comissão, já que este termo de aceite é de parceria, assumindo cada parte os seus respectivos riscos, custos e despesas, sem ressarcimento de qualquer espécie.</p>
              <p>8. A qualquer momento, a parceria poderá ser desfeita por parte do PARCEIRO, se aviso prévio à COTAMOS.com. No entanto, a COTAMOS.com se compromete a honrar com os valores aludidos na cláusula 6 (seis) deste termo de aceite, salvo, lesada a cláusula 9 (nove) deste mesmo instrumento ou ainda, por motivação de política interna das seguradoras.</p>
              <p>9. A COTAMOS.com convida o PARCEIRO para uma coparticipação pautada na luz da integridade de caráter; honestidade nas ações; receitas lícitas; trabalho digno e honesto; uma receita extra para o seu negócio; mantida pela retidão de conduta de ambos os lados. Portanto, qualquer ato que viole o princípio da boa fé, clamará imediato rompimento dos acordos, acarretando com o descadastramento instantâneo do PARCEIRO dos acessos à base de informações confiadas pela COTAMOS.com.</p>
              <p>10. Para dirimir eventuais conflitos, as partes elegem o Foro Central da Comarca de São Paulo e excluem qualquer outro, por mais privilegiado que seja.</p>
              <p>11. E por estarem assim justos e parceiros, assinamos virtualmente o presente instrumento o qual será gerado automaticamente em extensão PDF e ficará disponível junto com as demais informações cadastrais, na página do PARCEIRO, na plataforma digital COTAMOS.com.</p>
            </v-layout>
          </v-card-text>
          
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click.native="onSubmit">Aceito e Concordo com os termos</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout> 

    <v-layout align-start justify-end row fill-height v-if="partnerType">
        <CallToAction v-on:click="onShowTerms">Próximo</CallToAction>
    </v-layout>

  </v-container>
</template>

<script>
import validator from "@/utils/validator";
import CallToAction from "@/components/atoms/CallToAction";
import apiClientProvider from "@/utils/apiClient";

let self = null;

export default {
  name: "BasicPartnerForm",
  props: {
    partner: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showTerms: false,
      loading: false,
      partnerType: null,
      offsetTop: 0,
      disabledInput: {
        city: true,
        neighborhood: true,
        number: true,
        state: true,
        street: true
      }
    };
  },
  computed: {
    isLoading: {
      get() {
        return this.loading;
      }
    },
    partnerNameLabel: {
      get() {
        if (!this.partnerType) {
          return "";
        }
        if (this.partnerType.value) {
          return "Razão Social";
        } else {
          return "Nome";
        }
      }
    }
  },
  methods: {
    onShowTerms: async function() {
      console.log("onShowTerms");
      const isValid = await validator.validatePage(this);
      if (!isValid) {
        return;
      }
      this.showTerms = true;
    },
    onSubmit: async function() {
      this.showTerms = false;
      this.$emit("submit", null);
    }
  },
  validators: {
    "partner.name": value => validator.validateClientName(value),
    "partner.document": value => {
      if (self.partnerType.value) return validator.validateCnpj(value);

      return validator.validateCpf(value);
    },
    "partner.email": value => validator.validateEmail(value)
  },
  beforeMount() {
    self = this;
  },
  components: {
    CallToAction: CallToAction
  }
};
</script>

<style scoped>
.form-line {
  margin-left: 0px;
}
</style>
