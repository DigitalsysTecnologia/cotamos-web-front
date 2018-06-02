<template>
    <section class="header" :id="id" :style="headerStyle">
        <div class="header-content" :style="contentStyle">
            <div class="header-content-inner">
                <slot/>
            </div>
        </div>
    </section>
</template>

<script>
export default {
  name: "Section",
  data() {
    return {};
  },
  props: {
    id: {
      type: String,
      required: true
    },
    backgroundImage: {
      type: String,
      required: false
    },
    backgroundColor: {
      type: String,
      required: false
    },
    textColor: {
      type: String,
      required: false
    }    
  },
  computed: {
    headerStyle: {
      get() {
        let obj = {};

        if (this.backgroundImage) {
          obj.backgroundImage = `url(${this.backgroundImage})`;
        }

        if (this.backgroundColor) {
          obj.backgroundColor = this.backgroundColor;
        }

        return obj;
      }
    },
    contentStyle: {
      get() {
        let obj = {};
        
        if (this.textColor) {
          obj.color = this.textColor;
        }

        return obj;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
