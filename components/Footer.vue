<template>
  <div class="bottomFooter">
    <a class="brand" :href="homeLink">
      <img class="logoFooter" src="/img/favicon.png" alt="Cotamos.com">
    </a>
    <div class="footerInfo">
      <div class="containerIcons">
        <v-btn v-for="icon in icons" :key="icon.icon" class="iconFooter" icon :href="icon.url">
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </div>

      <span class="footer-item">CNPJ 30.249.014/0001-04</span>
      <span class="footer-item">SUSEP 20.2021328.0</span>
      <span class="footer-item">
        Copyright &copy; 2018 -
        <strong>Cotamos.com</strong> - Todos os direitos resevados
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      icons: [
        {
          icon: "fab fa-facebook",
          url: "https://www.facebook.com/cotamoscorretora"
        },
        /*{ icon: "fab fa-twitter" }
        { icon: "fab fa-google-plus" },
        { icon: "fab fa-linkedin" },
        { icon: "fab fa-instagram" } */
      ]
    };
  },
  props: {
    hideLogo: {
      type: Boolean,
      default: false,
      required: false
    },
    homeLink: {
      type: String,
      required: false,
      default: "/"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bottomFooter {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 150px;
  width: 70%;
}

.bottomFooter::before {
  position: absolute;
  content: "";
  height: 2px;
  width: 100%;
  top: 0;
  background-color: #dadada;
}

.footerInfo {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  font-size: 16px;
  color: #4d4d4d;
}

.brand {
  position: absolute;
  left: 0;
}

.logoFooter {
  height: 70px;
}

.containerIcons{
  display: flex;
}

.iconFooter {
  color: #00456a;
}

@media screen and (max-width: 1000px) {
  .bottomFooter {
    background-color: #4d4d4d;
    height: 150px;
    width: 100%;
    align-items: center;
  }
  .brand {
    position: relative;
  }
  .logoFooter {
    display: flex;
    flex-direction: row;
    height: 55px;
  }
  .bottomFooter::before {
    display: none;
  }
  .footerInfo {
    color: #fff;
    width: 60%;
    font-size: 13px;
    text-align: center;
    margin-left: 8%;
  }
  .iconFooter{
    color: #fff;
  }
}
</style>
