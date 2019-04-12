<template>
  <nav class="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" :href="homeLink">
        <img :src="logoImage" width="112" height="28" class="logo-image">
      </a>

      <a
        role="button"
        :class="{'navbar-burger': true, 'burger': true, 'is-active': isActive}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        v-on:click="toggleMenu"
        v-if="links"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" :class="{'navbar-menu': true, 'is-active': isActive}">
      <div class="navbar-start">
        <a
          v-for="(link,idx) in links"
          class="navbar-item navbar-item-text"
          :href="link.url"
          :key="idx"
        >{{ link.text }}</a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons"></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isActive: false
    };
  },
  props: {
    links: {
      type: Array,
      required: false,
      default: null
    },
    logoImage: {
      type: String,
      required: false,
      default: "/img/logo_cor.png"
    },
    homeLink: {
      type: String,
      required: false,
      default: "/"
    }
  },
  methods: {
    toggleMenu() {
      console.log("toggleMenu");
      this.isActive = !this.isActive;
    },
    getClassIcon(linkIcon) {
      return [linkIcon];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-item-text {
  font-weight: bold;
}
.logo-image {
  margin-left: 20px;
}
</style>
