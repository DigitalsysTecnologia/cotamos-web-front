<template>
  <div class="sectionFim">
    <i class="fas fa-clipboard-check"></i>
    <h3>Sua proposta foi enviada com sucesso</h3>
    <p>
      Em breve seu pet já estará com o plano de saúde. </p>
    <p>
      Entraremos em contato para confirmar seus dados e agendar a primeira consulta de seu pet.
    </p>
    <p>Você receberá um link por e-mail para efetuar o primeiro pagamento.</p>
    <p>
      Caso tenha alguma dúvida, você pode entrar em contato conosco através de:
    </p>
    <ul>
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
    <p>
      Muito Obrigado - Equipe Cotamos
    </p>    
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
  .sectionFim{
    display: flex;
    flex-direction: column;
    align-items: center;

  }

  .fa-clipboard-check{
    color: #49DF79;
    font-size: 100px;
  }

  .sectionFim h3{
    margin: 20px;
    font-size: 32px;
    color: #000;
  }

  .sectionFim p{
    margin: 0;
    padding: 0;
    color: #727272;
    font-size: 14px;
  }

  .sectionFim ul{
    list-style: none;
    text-align: center;
    margin: 20px;
  }
</style>
