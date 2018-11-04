<template>
  <div class="box">
    <label style="font-weight: bold; display:inline">
      {{label}}:
    </label>
    <br v-if="!sameLine"/>
    <label style="display:inline; font-weight:normal;">
      <span v-if="value">
        {{value}}   
      </span>
      <span v-else>
        (Não informado)
      </span>
    </label>
  </div>
</template>
<script>

export default {
  name: "CustomLabel",
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required:false,
      default: null
    },
    sameLine: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style scoped>
.box {
  text-align: left;
  margin-top:5px;
  margin-bottom:5px;
}
</style>
