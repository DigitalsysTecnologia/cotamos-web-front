<template>
    <section  v-if="this.data === '1'" class="about-container">
        <div class="title-mobile">
          <span>Sobre nós </span>
        </div>
        <div class="about-title-wrapper"> 
          <div class="about-upper">
            <div class="about-title">
              Sobre nós
            </div>
            <div class="about-img">
            </div>
          </div>
          <div class="about-footer">
          </div>

        </div>
        <div class="about-text-wrapper">
            <h2 class="text"> Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit </h2>
            <p class="p">  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            </p>
        </div>
        <div class="line"></div>
    </section>
    <section v-else class="desc-container" id="section-2">
          <div class="text-wrapper">
            <h2 class="text"> Seja Parceiro </h2>
            <p class="p"> Seja parceiro da Cotamos, tenha uma renda extra vendendo nossos produtos.</p>
            <div class="bt-wrapper">
              <CallToAction targetUrl="/seja-parceiro" > Seja Parceiro </CallToAction>
            </div>
          </div>
          <div class="line"></div>
          <div class="desc-wrapper"> 
            
            <div class="desc-upper">
              <div class="desc-title">
              </div>
              <div class="desc-img">
              </div>
            </div>
            <div class="desc-footer">
            </div>
          </div>
      </section>
</template>
<script>
import CallToAction from '@/components/CallToAction'
export default {
  name: 'Description',
  components: {
    CallToAction
  },
  props: {
    data: {
      required: true,
      type: String
    }
  }
}
</script>
>
<style scoped>
.about-container, .desc-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.text-wrapper, .about-text-wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 50%;
}

.text {
  font-family: 'Raleway' sans-serif;
  font-size: 2rem;
}
.p {
  font-family: 'Raleway' sans-serif;
  font-size: 1.2rem;
  padding-left: 3rem;
  margin: 1rem;
  margin-right: 3rem;
  color: #b3b3b3;
}

.bt-wrapper {
  padding-left: 4rem;
}

.line {
  position: relative;
  width: 1px;
  height: 450px;
  background-color: #b3b3b3;
}

.line::after {
  content: "";
  position: absolute;
  top: 100px;
  right: -4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #15bfc1;
}
.about-title-wrapper {
  height: 600px;
}
.about-title-wrapper, .desc-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  font-size: 30px !important;
}

.about-upper, .desc-upper {
  display: flex;
  justify-content: center;
}

.about-title, .desc-title{
  padding: 0 2rem;
  text-align: left;
}

.about-img {
  background: url("../static/img/home-sobre-nos.png");
  background-position: 96% 20%;
  width: 125px;
  height: 150px;
  margin: 1rem;
  border-radius: 25px;
}
.about-footer {
  background: url("../static/img/home-sobre-nos.png");
  background-position: 95% 93%;
  width: 266px;
  height: 100px;
  border-radius: 25px;
}
.about-title, .desc-title, .desc-img {
  width: 125px;
  height: 150px;
  margin: 1rem;
  border-radius: 25px;
  background: #15bfc1;
}

.desc-title, .desc-img{ 
  width: 150px;
  height: 210px;
}

.about-img, .desc-img {
  margin-left: 0;
}

.about-title, .desc-title {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-mobile {
  display: none;
}

@media (max-width: 840px) {

  .about-container,.desc-container {
    flex-flow: column nowrap;
    margin-top: 10rem;
    align-items: unset;
  }

  .desc-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0;
  }

  .line {
    display: none;
  }
  .text-wrapper {
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  .about-text-wrapper {
    width: unset;
    border: 1px solid rgba(224, 224, 224, 0.67);
    border-radius: 15px;
    border-left: none;
    margin-top: -1.3rem;
    margin-left: 4px;
  }

  .text {
    display: none;
  }
  .p {
    margin: 0;
    padding: 0;
    margin: 3rem;
  }
  .bt-wrapper {
    margin: 0;
    padding: 0;
  }
  .title-mobile {
    z-index: 999;
    display: flex !important;
  }
  .title-mobile span {
    padding: .5rem 2rem .5rem 2rem;
    background-color: #15bfc1;
    font-size: 15px;
    color: #fff;
    font-family: Roboto,sans-serif;
    font-weight: bold;
    line-height: 1.5;
    border-radius: 5px;
    
  }
  .about-title-wrapper {
    display: none !important;
  }
  .desc-wrapper {
    display: none !important;
  }

  #mobile {
    display: none;
  }
}
.desc-wrapper {
  margin: 3rem;
  height: 470px;
}
.desc-title {
  background: url("../static/img/home-graph.png");
  background-position: 53% 5%;
}
.desc-img {
  background: url("../static/img/home-graph.png");
  background-position: 93% 5%;
}
.desc-footer {
  background: url("../static/img/home-graph.png");
  background-position: 87% 85%;
  width: 266px;
  height: 100px;
  border-radius: 25px;
}
.desc-footer {
  width: 316px;
  height: 115px;
}
</style>
