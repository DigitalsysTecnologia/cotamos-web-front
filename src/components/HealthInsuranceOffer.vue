<template>
    <div class="col-xs-12 col-md-3">
        <div class="bloco-resultado">
            <div class="row">
                <div class="col-sm-4 col-xs-12">
                    <img :src="offer.companyLogo" alt="Plano de saúde" class="img-responsive"/>
                </div>
                <div class="col-sm-8 col-xs-12">
                    <h3>{{offer.name}}</h3>
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
                    
                    <p class="calor-resultado">{{ formattedOfferPrice }}</p>
                    <p class="links-resultado">
                        <a href="#" class="btn-default btn btn-1" title="">TENHO INTERESSE</a><br/>
                        <a href="#" class="link-saibamais" title="">+ saiba mais</a>
                    </p>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
  name: 'HealthInsuranceOffer',
  props: ['offer'],
  computed: {
    formattedOfferPrice: function() {
      let value = this.offer.price
      
      if(!value) {
          value = 0
      }

      return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bloco-resultado {
    background-color: #fff;
    height: 350px;
    padding: 15px;
    -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.24);
    -moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.24);
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.24);
    margin-bottom: 10px;
    padding-right: 10px;
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
