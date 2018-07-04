<template>
    <div>
        <NavBar />
        <main class="container-fluid">
            <div class="row">
                <header class="col-xs-12 banner-pgs banner"
                        style="backgroundImage: url(../static/img/bg_outros.jpg)">
                    <div class="container">
                        <h1>Saúde PET</h1>
                    </div>
                </header>
            </div>
        </main>
        <section class="container-fluid bg-outros">
            <div class="row">
                <div class="container">
                    <div class="row">
                        <section class="col-xs-12 formulario-cotacao">
                            <div class="col-sm-12 col-xs-12 box-cotacao">
                                      <div class="row">
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
                <span>WhatsApp: <i class="fab fa-whatsapp-square"/> (11) 96374-1287</span>
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
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
    </div>
</template>

<script>
import Loading from "@/components/Loading";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer.vue";
import factory from "@/utils/factory";
import utils from "@/utils/index";

export default {
  name: "PetInsuranceOffersSuccess",
  computed: {
    isLoading: {
      get: function() {
        return this.loading;
      }
    },
    loadingMessages: {
      get: function() {
        return this.internalLoadingMessages;
      }
    },
    currentStep: {
      get: function() {
        return this.step;
      }
    },
    isDenied: {
      get: function() {
        return this.denied;
      }
    }
  },
  components: {
    NavBar: NavBar,
    Footer: Footer,
    Loading: Loading
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.formulario-cotacao {
  margin-bottom: 20px;
}
.box-cotacao {
  padding-bottom: 20px;
}
@media (max-width: 500px) {
  .banner {
    background-position-x: -1000px;
    background-position-y: 0px;
  }
}
</style>
