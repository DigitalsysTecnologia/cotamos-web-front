<template>
    <section class="col-md-3 col-sm-4 col-xs-12 box-ancora">
        <div class="product-container">
            <div class="product-info">
                <div class="product-img">
                    <img :src="imgUrl" alt="Enviar" class="img-responsive center-block"/>
                </div>
                <h3 class="card-title">{{name}}</h3>
                <p class="card-description">{{description}}</p>
            </div>
            <CallToAction :targetUrl="callToActionUrl">{{callToActionText}}</CallToAction>
        </div>
    </section>
</template>

<script>
import CallToAction from "@/components/CallToAction";
export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    callToActionText: {
      type: String,
      required: true
    },
    callToActionUrl: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    GoToUrl(path) {
      this.$router.push({
        path: path
      });
    }
  },
  components: {
    CallToAction: CallToAction
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-title {
    text-align: left;
    width: 85%;
    color: black;
    padding-left: 8%;
    font-weight: 500;
    font-size: 20px;
}
.card-description {
    width: 200px;
    text-decoration-style: none;
    height: 120px;
    text-align: left;
    padding-left: 15%;
    padding-right: 25%;
    color: #b3b3b3;
}
.product-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 30px;
    width: 250px;
    height: 300px;
    background-color: #fff;
    box-shadow: 0px 4px 8px 0 #dadada86;
    margin: auto;
}

.box-ancora {
  margin-top: 25px;
  margin-bottom: 25px;
}

.box-ancora > .product-info > p {
  margin-bottom: 5px;

}

.box-ancora > .product-info > h3 {
  margin-bottom: 0px;
  margin-top: 5px;
}

.product-info {
  min-height: 120px !important;
}

.product-img {
  min-height: 70px;
  position: relative;
}

.product-img > img {
  width: 90px;
   position: absolute;
   bottom: 0;
   right: 0;
   left: 0;
   margin-right: auto;
   margin-left:auto;
}
@media (min-width: 1000px) and (max-width: 1600px){
  .product-container{
    width: 175px;
  }
}
</style>
