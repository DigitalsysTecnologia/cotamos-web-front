<template>
    <!-- Modal -->
    <div class="modal fade" :id="id" role="dialog">
      <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header text-center" style="border-bottom:none;padding-bottom:0;">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 style="color:rgb(5, 93, 59);font-weight: bold;">{{ title }}</h4>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer" style="border-top: none;padding-top:0;">
            <button type="submit" class="btn btn-default btn-default pull-left" data-dismiss="modal" style="color: rgb(255, 252, 252);background-color: #00643c;" v-if="closeButton">
                <span class="glyphicon glyphicon-remove"></span> 
                Fechar
            </button>
          </div>
        </div>
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
    id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    closeButton: {
      type: Boolean,
      required: false,
      default: true
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
