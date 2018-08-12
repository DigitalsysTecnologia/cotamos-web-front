<template>
    <div class="col-xs-12 col-md-3">

        <!-- <div class="bloco-resultado">
            <div class="row">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <img :src="offer.companyLogo" alt="Plano de saúde" class="img-responsive"/>
                    </div>
                </div>
                <div class="col-xs-12">
                    <hr/>
                    <p class="desc-resultado">
                        {{offer.description}}
                    </p>
                    <hr/>
                    <ul class="lista-resultado">
                      <li v-for="(additionalInfo, index) in offer.additionalInfos" :key="`dependent-${index}`">
                        - {{additionalInfo}}
                      </li>
                    </ul>
                    
                    <p class="calor-resultado">{{ formattedOfferPrice }} à vista</p>
                    <p class="calor-resultado parcelamento">12x de {{ formattedOfferPrice }}</p>
                    <p class="links-resultado">
                        <a href="#" class="btn-default btn btn-1" title="">TENHO INTERESSE</a><br/>
                        <a href="#" class="link-saibamais" title="">+ detalhes</a>
                    </p>
                </div>
            </div>
        </div> -->


        <div class="bloco-carregando">
            <div class="row">
                <div class="row">
                    <div class="col-sm-12 col-xs-12">
                        <img :src="offer.companyLogo" alt="Plano de saúde" class="img-responsive"/>
                    </div>
                </div>
                <div class="col-xs-12">
                    <p class="calor-resultado">Aguardando resposta...</p>
                    <!-- <hr/>
                    <p class="desc-resultado">
                        {{offer.description}}
                    </p>
                    <hr/>
                    <ul class="lista-resultado">
                      <li v-for="(additionalInfo, index) in offer.additionalInfos" :key="`dependent-${index}`">
                        - {{additionalInfo}}
                      </li>
                    </ul>
                    
                    <p class="calor-resultado">{{ formattedOfferPrice }} à vista</p>
                    <p class="calor-resultado parcelamento">12x de {{ formattedOfferPrice }}</p>
                    <p class="links-resultado">
                        <a href="#" class="btn-default btn btn-1" title="">TENHO INTERESSE</a><br/>
                        <a href="#" class="link-saibamais" title="">+ detalhes</a>
                    </p> -->
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
  name: "LifeInsuranceOffer",
  props: ["offer"],
  computed: {
    formattedOfferPrice: function() {
      let value = this.offer.price;

      if (!value) {
        value = 0;
      }

      return value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bloco-resultado {
  background-color: #fff;
  height: 350px;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24);
  margin-bottom: 10px;
  padding-right: 10px;
}

.bloco-carregando {
  background-color: #fff;
  xheight: 100px;
  padding: 15px;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.24);
  margin-bottom: 10px;
  padding-right: 10px;
}

.bloco-carregando img {
  width: 120px;
  margin-top: 15px;
  padding-left: 15px;
}

.bloco-carregando .calor-resultado {
  text-align: center;
  color: #1997c6;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
}

.desc-resultado {
  margin-top: 19px;
}

.parcelamento {
  font-size: 20px !important;
}

.bloco-resultado img {
  width: 120px;
  margin-top: 15px;
  padding-left: 15px;
}

.bloco-resultado h3 {
  margin: 0px;
  margin-top: 17px;
  font-size: 16px;
  font-weight: 500;
  padding-right: 15px;
}

.bloco-resultado .calor-resultado {
  text-align: center;
  color: #1997c6;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
}

.bloco-resultado .links-resultado {
  text-align: center;
}

.bloco-resultado .links-resultado {
  text-align: center;
}

.bloco-resultado .lista-resultado {
  -webkit-padding-start: 15px;
  list-style-type: none;
  margin: 0px;
}
</style>
