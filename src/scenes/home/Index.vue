<template>
    <div style="display:unset">
        <NavBar/>

        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>
                <li data-target="#carousel-example-generic" data-slide-to="1"/>
            </ol>

            <div class="carousel-inner" role="listbox">
                <div class="item active" style="backgroundImage: url(static/img/bg1.jpg)">
                    <div class="carousel-caption">
                        <h1>VOCÊ! SEGURADO TODOS OS DIAS, O DIA TODO.</h1>
                        <h2>Adquira, acompanhe e solicite seu seguro, totalmente online, na hora que você precisar.</h2>
                    </div>
                </div>

                <div class="item" style="backgroundImage: url(static/img/bg2.jpg)">
                    <div class="carousel-caption">
                        <h1>A COTAMOS.COM É DIGITAL, MAS A SUA PROTEÇÃO É REAL!</h1>
                        <h2>A melhor maneira de aproveitar a vida sem medos.</h2>
                    </div>
                </div>
            </div>
        </div>
        <section class="container">
            <div class="row">
                <section class="col-xs-12 formulario-hp">
                    <form action="">
                        <div class="col-sm-11 col-xs-10 box-formulario">
                            <h3>Faça uma cotação</h3>
                            <p>O que você quer assegurar? Selecione abaixo o que você precisa</p>
                            <select class="form-control" v-model="product">
                                <option value='0'>Quero um plano de saúde para minha Familia</option>
                                <option value='3'>Quero um seguro de vida para mim</option>
                                <option value="5">Quero um plano de saúde para meu pet</option>
                                <option disabled="disabled">Quero uma previdência para mim - EM BREVE</option>
                                <option disabled="disabled">Quero uma previdência para meu/minha filho(a) - EM BREVE</option>
                                <option disabled="disabled">Quero um seguro para o meu carro - EM BREVE</option>
                            </select>
                        </div>
                        <button class="btn-envio btn btn-default col-sm-1 col-xs-2" @click="GoToInsuranceFormPage">
                            <img src="/static/img/envio_icone.png" alt="Enviar" class="img-responsive center-block"/>
                        </button>
                    </form>
                </section>

                <article class="col-xs-12 bloco-ancoras">
                    <section class="col-md-4 col-xs-12 box-ancora">
                        <img src="/static/img/icone_1.png" alt="Enviar" class="img-responsive center-block"/>
                            <h3>Totalmente digital</h3>
                            <p>Acompanhe todas as informações na palma da mão sempre que desejar.</p>
                    </section>

                    <section class="col-md-4 col-xs-12 box-ancora">
                        <img src="/static/img/icone_2.png" alt="Enviar" class="img-responsive center-block"/>
                            <h3>Feito para você</h3>
                            <p>Propostas feitas sob medida para a sua necessidade, sem nenhuma letra pequena.</p>
                    </section>

                    <section class="col-md-4 col-xs-12 box-ancora">
                        <img src="/static/img/icone_3.png" alt="Enviar" class="img-responsive center-block"/>
                            <h3>Suas informações seguras</h3>
                            <p>Sua informações estarão totalmente seguras em nossos servidores</p>
                    </section>
                </article>
            </div>
        </section>

        <section class="header" id="o-que-fazemos" style="backgroundImage: url(static/img/banner_1.jpg)">
            <div class="header-content">
                <div class="header-content-inner">
                    <h2>
                        Totalmente digital<br/>
                    </h2>
                    <p>Fique longe das horas ao telefone, inúmeros emails e burocracias, tudo é feito a qualquer hora e em qualquer lugar para que proteger suas conquistas não te tragam nenhuma dor de cabeça, somente o sossego e tranquilidade, antes, durante e depois de todo seu processo!</p>
                    <ul>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Facilidade</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Mobilidade</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>No computador ou celular</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>A qualquer hora</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Sem buracracia</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Longe de stress</li>
                    </ul>
                    <router-link title="Quero um seguro" to="/plano-de-saude" class="btn btn-default btn-1-s">Quer o seu seguro? Clique aqui</router-link>
                </div>
            </div>
        </section>

        <section class="header" id="o-que-fazemos" style="backgroundImage: url(static/img/banner_2.jpg)">
            <div class="header-content">
                <div class="header-content-inner">
                    <h2>
                        Feito para
                        <br/>
                        você
                    </h2>
                    <p>
                        Selecionaremos os melhores planos e pacotes para o que você precisa, para que você não perca tempo pesquisando durante dias sua melhor oportinudade, e possa aproveitar suas conquistas com segurança de maneira rápida e prática!
                    </p>
                    <ul>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>As melhores propostas para a sua necessidade.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Tudo em um só site.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Com diversas empresas e opções.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Sem longas pesquisas.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Com a certeza do melhor negócio.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>De maneira fácil e rápida.</li>
                    </ul>
                    <router-link title="Quer o seu seguro?" to="/plano-de-saude" class="btn btn-default btn-1-s">Quer o seu seguro?</router-link>
                </div>
            </div>
        </section>

        <section class="header" id="o-que-fazemos" style="backgroundImage: url(static/img/banner_3.jpg)">
            <div class="header-content">
                <div class="header-content-inner-e">
                    <h2>
                        Suas informações seguras
                    </h2>
                    <p>
                        Nosso sistema foi feito para te proteger em todos os aspectos, inclusive mantendo todas as suas informações seguras, onde apenas você terá acesso a cada uma delas.
                        <br/>
                        Um sistema completamente automatizado te dá a segurança necessária para informar cada necessidade sua!
                    </p>
                    <ul>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Mais tranquilidade.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Certeza da confidêncialidade.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Confiança e segurança.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Informações criptografadas.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Processos automatizados.</li>
                        <li><i class="fa fa-check-square-o" aria-hidden="true"/>Acesso exclusivo do cliente.</li>
                    </ul>
                    <router-link title="Quer o seu seguro?" to="/plano-de-saude" class="btn btn-default btn-1-s">Quer o seu seguro?</router-link>
                </div>
            </div>
        </section>

        <Footer/>
  </div>

</template>

<script>
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
export default {
  name: "Home",
  data() {
    return {
      product: null
    };
  },
  watch: {
    product: function() {
      console.log(`passei por aqui e estou com o valor ${this.product}`);
      switch (this.product) {
        case "0":
          this.$router.push({ name: "HealthInsurance" });
          break;
        case "3":
          this.$router.push({ name: "LifeInsurance" });
          break;
        case "5":
          this.$router.push({ name: "PetInsurance" });
          break;
      }
    }
  },
  methods: {
    GoToInsuranceFormPage(e) {
      e.preventDefault();
      switch (this.product) {
        case "0":
          this.$router.push({ name: "HealthInsurance" });
          break;
        case "3":
          this.$router.push({ name: "LifeInsurance" });
          break;
        case "5":
          this.$router.push({ name: "PetInsurance" });
          break;
      }
    }
  },
  components: {
    Footer: Footer,
    NavBar: NavBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
