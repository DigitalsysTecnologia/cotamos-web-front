<template>
    <div>
        <main class='container-fluid grey-background'>
            <div class='row'>
                    <header class='col-xs-12 banner-pgs'
                            style='backgroundImage: url(/static/img/bg_outros.jpg)'>
                        <div class='container'>
                            <h1>Suas opções estão aqui</h1>
                            <h2>Veja aqui as suas ofertas.</h2>
                        </div>
                    </header>
                </div>
                <div class='row'>
                    <article class='col-xs-12'>
                            <section class='col-md-10 col-md-offset-1 col-xs-12 resultados-mg'>
                                <Loading v-if='isLoading' />
                                <HealthInsuranceOffer v-else v-for="(offer, index) in offers" :key="`health-insurance-offer-${index}`" v-bind:offer="offer" />
                            </section>
                    </article>
                </div>
        </main>
        <Footer />
    </div>
</template>


<script>
import Footer from '../../components/Footer'
import Loading from '../../components/Loading'
import HealthInsuranceOffer from '../../components/HealthInsuranceOffer'
import apiClientProvider from '../../providers/apiClientProvider';
import SimpleVueValidation from 'simple-vue-validator';
import moment from 'moment';
import _ from 'lodash'
const Validator = SimpleVueValidation.Validator;
export default {
  name: 'HealthInsuranceOffers',
  data() {
    return {
        isLoading: false,
        offers: [
            {
                name:"MAPFRE",
                companyLogo: "https://cotamos-files.nyc3.digitaloceanspaces.com/site/img/mapfre.png",
                description: "Descrição do seguro Mapfre",
                additionalInfos: [
                    "Destaque 1",
                    "Destaque 2"
                ],
                price: 65
            },
            {
                name:"ALLIANZ",
                companyLogo: "/static/img/empresas/mapfre.png",
                description: "Descrição do seguro Allianz",
                additionalInfos: [
                    "Destaque 1",
                    "Destaque 2"
                ],
                price: 35.20
            },
            {
                name:"ALLIANZ",
                companyLogo: "/static/img/empresas/mapfre.png",
                description: "Descrição do seguro Allianz",
                additionalInfos: [
                    "Destaque 1",
                    "Destaque 2"
                ]
            },
            {
                name:"ALLIANZ",
                companyLogo: "/static/img/empresas/mapfre.png",
                description: "Descrição do seguro Allianz",
                additionalInfos: [
                    "Destaque 1",
                    "Destaque 2"
                ]
            },
            {
                name:"ALLIANZ",
                companyLogo: "/static/img/empresas/mapfre.png",
                description: "Descrição do seguro Allianz",
                additionalInfos: [
                    "Destaque 1",
                    "Destaque 2"
                ]
            }
        ]
    };
  },
  beforeMount() {
    
  },
  components: {
    Footer: Footer,
    Loading:Loading,
    HealthInsuranceOffer:HealthInsuranceOffer
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.grey-background {
    background-color: rgb(236, 236, 238);
}

.resultados-mg {
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>
