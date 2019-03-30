<template>
    <section class="box-ancora">
        <div class="product-container" style="background-color:white">
            <div class="product-info">
                <div class="product-img">
                    <img :src="imgUrl" alt="Enviar" class="img-responsive center-block"/>
                </div>
                <h3 class="card-title">{{name}}</h3>
                <p class="card-description">{{description}}</p>
            </div>
        </div>
    </section>
</template>

<script>
import CallToAction from "@/components/atoms/CallToAction";
export default {
  name: "InfoCard",
  props: {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    imgUrl: {
      type: String,
      required: true
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
    color: #00899c;
}
.card-description {
    min-height: 50px;
}
.product-container {
    padding-top: 30px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    border: 1px solid;
    border-radius: 10px;
    border-color: #00899c;
    min-height: 200px;
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
  height: 90px;
   bottom: 0;
   right: 0;
   left: 0;
   margin-right: auto;
   margin-left:auto;
}
</style>
