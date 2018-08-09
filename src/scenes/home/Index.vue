<template>
    <div style="display:unset" >
        <!-- <Header /> -->
        <div class="container-fluid">
        <Header />

        <div class="row" style="display:block;">
            <div class="col-xs-12" style="padding-left:0px;padding-right:0px;">
                <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"/>
                        <li data-target="#carousel-example-generic" data-slide-to="1"/>
                    </ol>

                    <div class="carousel-inner" role="listbox">
                        <div class="item active" style="backgroundImage: url(static/img/bg1.jpg)">
                            <div class="carousel-caption">
                                <h1>COTAMOS.COM</h1>
                                <h2>VOCÊ! SEGURADO TODOS OS DIAS, O DIA TODO.</h2>
                            </div>
                        </div>

                        <div class="item" style="backgroundImage: url(static/img/bg2.jpg)">
                            <div class="carousel-caption">
                                <h1></h1>
                                <h2>A COTAMOS.COM é digital, mas a sua proteção é real!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="row section">
            <article class="col-xs-12">
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
        </div> -->

        <div class="row section">
            <div class="col-xs-12 text-center">
            <h2>Conheça Nossos Produtos</h2>
            </div>
            <article class="col-xs-12 text-center">
                <section class="col-md-4 col-xs-12 box-ancora">
                    <div class="product-info">
                        <div class="product-img">
                            <img src="/static/img/icons/health-for-pet.png" alt="Enviar" class="img-responsive center-block"/>
                        </div>
                        <h3>Plano de Saúde Pet</h3>
                        <p>Segurança para o seu pet, com um plano de saúde sob medida</p>
                    </div>
                    <CallToAction v-on:click="GoToUrl('/plano-de-saude-pet')">Saber Mais</CallToAction>
                </section>

                <section class="col-md-4 col-xs-12 box-ancora">
                    <div class="product-info">
                        <div class="product-img">
                            <img src="/static/img/icons/carro-facil.png" alt="Enviar" class="img-responsive center-block"/>
                        </div>
                        <h3>Carro Fácil</h3>
                        <p>Seu carro por assinatura, sob medida.</p>
                    </div>
                    <CallToAction v-on:click="GoToUrl('/carro-facil')">Saber Mais</CallToAction>
                </section>

                <section class="col-md-4 col-xs-12 box-ancora">
                    <div class="product-info">
                        <div class="product-img">
                            <img src="/static/img/icons/seguro-vida.png" alt="Enviar" class="img-responsive center-block"/>
                        </div>
                        <h3>Seguro de Vida</h3>
                        <p>Proteção para quem você mais ama</p>
                    </div>
                    <CallToAction v-on:click="GoToUrl('/seguro-vida')">Saber Mais</CallToAction>
                </section>

                <!-- <section class="col-md-4 col-xs-12 box-ancora">
                    <div class="product-info">
                        <img src="/static/img/icons/seguro-vida-3.png" alt="Enviar" class="img-responsive center-block"/>
                        <h3>Seguro de Vida</h3>
                        <p>Proteção para quem você mais ama</p>
                    </div>
                    <CallToAction>Saber Mais</CallToAction>
                </section> -->
            </article>
        </div>
        
        <Footer :hideLogo="true"/>
        </div>
  </div>

</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import CallToAction from "../../components/CallToAction";
export default {
  name: "Home",
  methods: {
    GoToUrl(path) {
      this.$router.push({
        path: path
      });
    }
  },
  components: {
    Footer: Footer,
    Header: Header,
    NavBar: NavBar,
    CallToAction: CallToAction
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.section {
  padding-top: 20px;
  padding-bottom: 20px;
}

.item {
  background-size: cover;
}

.box-ancora {
  margin-top: 25px;
  margin-bottom: 25px;
}

.product-info {
  min-height: 120px !important;
}

.box-ancora > .product-info > p {
  margin-bottom: 5px;
}

.box-ancora > .product-info > h3 {
  margin-bottom: 0px;
  margin-top: 5px;
}

.product-img {
  /* width: 90px; */
  min-height: 70px;
}

.product-img > img {
  width: 90px;
}
</style>
