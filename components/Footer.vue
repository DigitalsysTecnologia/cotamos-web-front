<template>
  <div class="footerBottom">
    <div class="containerAling wrapper">
      <img src="/img/logo_nome_branco.png" alt class="imgFooter">
    </div>

    <div class="wrapper">
      <div class="itemContatos">
        <span class="iconFooter">
          <i class="fas fa-map-marker-alt"></i>
        </span>
        <span>Rua Dom Érico Ferrari, São Paulo</span>
      </div>
      <div class="itemContatos">
        <span class="iconFooter">
          <i class="fas fa-phone"></i>
        </span>
        <span>(11) 3297-3864</span>
      </div>
      <div class="itemContatos">
        <span class="iconFooter">
          <i class="fas fa-envelope"></i>
        </span>
        <span>
          <a href="www.cotamos.com">www.cotamos.com</a>
        </span>
      </div>
    </div>

    <div class="wrapper containerAling">
      <div class="infoItem">
        <h2>Dados da Empresa</h2>
        <span>CNPJ 30.249.014/0001-04</span>
        <span>SUSEP 20.2021328.0</span>
        <div class="infoItemRedes">
          <v-btn v-for="icon in icons" :key="icon.icon" class="iconRedes" icon :href="icon.url">
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </v-btn>
        </div>
      </div>
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
        { icon: "fab fa-twitter" },
        { icon: "fab fa-linkedin" },
        { icon: "fab fa-instagram" },
        { icon: "fab fa-google-plus" }, 
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
.footerBottom {
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #222;
}

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 350px;
  width: 34%;
  background-color: #222;
}

.containerAling {
  align-items: center;
}
.imgFooter {
  width: 80%;
}

.itemContatos {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
}

.iconFooter {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3d3d3d;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 20px;
}

.infoItem {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.infoItem h2 {
  margin: 0 0 20px 0;
  padding: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

.infoItem span {
  color: #6e6e6e;
  font-size: 14px;
}

.iconRedes {
  color: #fff;
  margin: 20px 20px 0 -7px;
}

@media screen and (max-width: 768px) {
  .footerBottom {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    width: 100%;
    align-items: center;
  }
  .imgFooter {
    width: 80%;
  }
  .itemContatos {
    flex-direction: column;
  }
  .iconFooter {
    margin: 0;
  }
  .infoItem {
    align-items: center;
  }
  .infoItemRedes {
    padding-left: 20px;
  }
}
</style>