<template>
        <div class="col-md-8 col-md-offset-2 col-xs-12">
            <div class="text-center" style="paddingTop:25px; paddingBottom:25px">
                    <img src="/static/img/loading.gif" style="height:60px; marginBottom:25px"/>
                    <div class="progress" v-if="completePercent">
                        <div class="progress-bar progress-bar-striped active" 
                             role="progressbar" 
                             v-bind:style="{ 'width': completePercent + '%', 'background-color': '#00899C' }" />
                   </div>
                    <p v-for="(message) in messages" :key="message">
                        {{ message }}
                    </p>
            </div>
        </div>
</template>

<script>
export default {
  name: "Loading",
  props: ["messages", "completePercent"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
