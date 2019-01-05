<template>
  <div class="container-fluid" >

    <div class="row">
      <div class="col-xs-12">
        <h3>Sua proposta foi enviada com sucesso</h3>
        <p>
          Em breve seu pet já estará com o plano de saúde. </p>
        <p>
          Entraremos em contato para confirmar seus dados e agendar a primeira consulta de seu pet.
        </p>
        <p>Você receberá um link por e-mail para efetuar o primeiro pagamento.</p>
        <p>
          Caso tenha alguma dúvida, você pode entrar em contato conosco através de:

          <ul style="margin-top:10px;">
            <li>
              <span>Telefone: <i class="fab fa-whatsapp-square"/> (11) 3297-3864</span>
            </li>
            <li>
              <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 94060-1680</span>
            </li>
            <li>
              <span>E-mail: <i class="fas fa-envelope-square"/> contato@cotamos.com</span>
            </li>
          </ul>
        </p>
        <p>
          Muito Obrigado - Equipe Cotamos
        </p>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Finish",
  data() {
    return {};
  },

  components: {
    Header: Header,
    Footer: Footer
  }
};
</script>

<style scoped>
</style>
