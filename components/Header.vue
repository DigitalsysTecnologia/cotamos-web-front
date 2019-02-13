<template>
  <div class="topHeader">
    <a class="brand" :href="homeLink">
      <div class="imgLogo"></div><!-- <img class="logoHeader" src="/img/logo_nome_branco.png" alt="Cotamos.com"> -->
    </a>
    <div class="topnav" id="myTopnav">
      <a href="javascript:void(0);" class="icon" v-on:click="menuMob">
        <i class="fa fa-bars"></i>
      </a>
      <a href="/" class="menuItem">Home</a>
      <a href="#sobre" class="menuItem">Sobre</a>
      <a href="#servicos" class="menuItem">Serviços</a>
      <a href="#sejaParceiro" class="menuItem">Seja Parceiro</a>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {};
  },
  props: {
    links: {
      type: Array,
      required: false,
      default: null
    },
    homeLink: {
      type: String,
      required: false,
      default: "/"
    }
  },
  methods: {
    menuMob: function() {
      let e = document.getElementById("myTopnav");
      if (e.className === "topnav") {
        e.className += " responsive";
      } else {
        e.className = "topnav";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.topHeader {
  display: flex;
  position: relative;
  align-items: center;
  height: 100px;
  z-index: 1;
}

.brand {
  margin-left: 18%;
}

.imgLogo {
  background-image: url('../static/img/logo_nome_azul.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  height: 60px;
  width: 200px;
}

.topnav {
  overflow: hidden;
  margin-left: 18%;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  display: block;
  color: #00456a;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  padding: 15px;
  text-decoration: none;
}

/* Change the color of links on hover */
.topnav a:hover {
  color: #dadada;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
  margin-right: 15px;
}

@media screen and (max-width: 768px) {
  .topnav a {
    display: none;
    padding: 10px;
  }

  .topnav a.icon {
    font-size: 24px;
    float: right;
    display: block;
    color: #fff
  }

  .topnav.responsive {
    position: absolute;
    right: 0;
    top: 17px;
    width: 100%;
  }
  .topnav.responsive a.icon {
    float: none;
    display: block;
    text-align: right;
    margin-bottom: 15px;
    right: 0;
    top: 0;
  }
  .topnav.responsive a.menuItem {
    float: none;
    display: block;
    text-align: center;
    top: 0;
    color: #00456a;
    background-color: #fff;
  }

  .topHeader {
    height: 100px;
    justify-content: space-between;
    background-color: hsla(0, 0%, 13%, 0.663);
  }
  .brand {
    margin-left: 0;
  }
  .imgLogo {
    background-image: url('../static/img/logo_nome_branco.png');
    margin-left: 15px;
    height: 50px;
  }
}
</style>