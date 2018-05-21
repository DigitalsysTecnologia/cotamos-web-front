<template>
    <section class="header" :id="id" style="backgroundImage: url(static/img/banner_1.jpg)">
        <div class="header-content">
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
