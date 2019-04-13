<template>
  <div class="container-fluid" >

    <div class="row">
      <div class="col-xs-12">
        <h3>Infelizmente, sua região ainda não é atendida por nossos planos de saúde pet. Assim que houver disponibilidade para a sua região, entraremos em contato.</h3>

        <p>
          Caso tenha alguma dúvida, você pode entrar em contato conosco através de:

          <ul style="margin-top:10px;">
            <li>
              <span>Telefone: <i class="fab fa-whatsapp-square"/> (11) 3297-3864</span>
            </li>
            <li>
              <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 94783-1054</span>
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
import Header from "@/components/molecules/Header";
import Footer from "@/components/molecules/Footer";

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
