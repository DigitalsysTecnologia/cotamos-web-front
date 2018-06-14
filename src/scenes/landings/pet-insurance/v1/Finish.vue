<template>
  <div>
    <NavBar />
      <main class="container-fluid">
          <div class="row">
            <div class="col-xs-12 color-background" style="height:80px;">
            </div>
          </div>


          <div>
            <section class="container-fluid" >
              <div class="row">
                <div class="col-sm-12 text-center">
                  <h2 style="color: #00d886">Muito obrigado</h2>
                </div>
                <div class="row">
                  <div class="col-sm-12 text-center">
                    <h2>
                      Em breve, vamos te ligar para confirmar os dados e, caso você deseje, fechar contrato, ok? 
                      Após isso, agendaremos uma data para você levar o seu pet à primeira consulta.
                    </h2>
                  </div>
                </div>
              </div>
            </section>
          </div>
      </main>
    <Footer/>
  </div>
</template>

<script>
import FormInput from "../../../../components/FormInput";
import FormSelect from "../../../../components/FormSelect";
import Footer from "../../../../components/Footer";
import NavBar from "../../../../components/NavBar";

export default {
  name: "PetInsuranceLandingV1Finish",
  data() {
    return {}
  },

  components: {
    Footer: Footer,
    NavBar: NavBar,
    FormInput: FormInput,
    FormSelect: FormSelect,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  margin-top: 50px;
  margin-bottom: 50px;
}
header {
  background-color: #000;
  padding-top: 100px;
  padding-bottom: 100px;
  background-position: center;
  background-repeat: no-repeat;
}

.color-background {
  color: white;
  background: #00d886;
  background: -moz-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: -webkit-linear-gradient(left, #00d886 0%, #00d6e7 100%);
  background: linear-gradient(to right, #00d886 0%, #00d6e7 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00d886', endColorstr='#00d6e7',GradientType=1 );
}

header h1 {
  font-size: 50px;
  text-transform: uppercase;
  font-weight: 800;
  color: #fff;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(0, 0, 0, 0.8);
}
.call-to-action {
  border: 1px solid transparent;
  vertical-align: middle;
  font-size: 14px;
  letter-spacing: -0.5px;
  border-radius: 100px;
  cursor: pointer;
  padding: 5px 30px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to bottom, orange, #ff8400);
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.1);
}

.plan-card {
  border: solid 1px #148892;
  border-radius: 5px;
  margin-bottom: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.plan-value {
  font-size: 20px;
  color: #148892;
  font-family: "Titillium Web";
}

.logo-plan-miniatures {
  margin-top: 10px;
}

.logo-plan-miniatures img {
  display: inline-block;
}

.section {
  color: #148892;
  font-size: 24px;
  text-align: justify;
}
.flow-icon {
  font-size: 34px;
}
.flow-step-next {
  display: inline-block;
  font-size: 42px;
  margin-right: 20px;
  margin-left: 20px;
}

.flow-step {
  max-width: 150px;
  height: 150px;
  border: solid 5px #fff;
  display: inline-block;
  border-radius: 70px;
  padding: 20px;
  margin-right: 40px;
  margin-bottom: 20px;
}

.flow-step p {
  margin-top: 5px;
}

.subtitle {
  font-size: 50px;
  text-transform: uppercase;
  font-weight: 800;
  color: #000;
  margin-bottom: 0px;
  margin-top: 0px;
  text-shadow: 0 1px 7px rgba(255, 255, 255, 0.8);
}
.form-container {
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 00px;
  background: rgba(214, 213, 213, 0.835);
  border: solid 1px rgb(196, 196, 246);
  min-height: 300px;
  margin-bottom: 15px;
}
.loadingMessage {
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.loading-container {
  margin-top: 20px;
  margin-bottom: 20px;
}
.place-card {
  border: solid 1px #d3d3d3;
  background-color: #e6e6e6;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  margin-right: 10px;
}
</style>
