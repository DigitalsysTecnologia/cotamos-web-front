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

        <div class="row section">
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
        </div>
        
        <Footer :hideLogo="true"/>
        </div>
  </div>

</template>

<script>
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import NavBar from "../../components/NavBar";
export default {
  name: "Home",
  components: {
    Footer: Footer,
    Header: Header,
    NavBar: NavBar
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.section {
    padding-top: 20px;
    padding-bottom: 20px;
}
</style>
