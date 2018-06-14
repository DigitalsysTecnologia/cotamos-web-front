<template>
    <div :class="{'form-group': true, 'error': validationMessage}">
        <div class="input-group">
            <div class="input-group-addon">
                <i :class="`fa ${icon}`" aria-hidden="true"/>
            </div>
            <select class="form-control custom-select" :id="id" @input="updateValue()" ref="inputValue" >
              <option selected="true" disabled="disabled">{{ label }}</option>
              <option v-for="(option) in options" 
                      :key="option.id || option" 
                      :value="option.id || option"> 
                {{ option.text || option}} 
              </option>
            </select>
        </div>
        <div class="message"> {{ validationMessage  }}</div>
    </div>
</template>

<script>
export default {
  name: "FormSelect",
  props: {
    options: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
    validationMessage: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    async updateValue(truncate) {
      if (!this.$refs.inputValue) {
        return;
      }

      this.$emit("input", this.$refs.inputValue.value);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-group.error i {
  color: red;
}
.form-group.error .input-group-addon {
  border-left-color: red;
  border-top-color: red;
  border-bottom-color: red;
}
.form-group.error select {
  border-right-color: red;
  border-bottom-color: red;
  border-top-color: red;
  color: red;
}
.message {
  color: red;
}
.input-group {
  height: 42px;
}
.input-group select {
  height: 42px;
}
.input-group {
  position: relative;
display: table;
border-collapse: separate;
}
.input-group input {
  height: 42px;
}
.input-group-addon{
  border-radius: 0px;
  color: #00899C;
  border-right: 0px;
  border-right-color: currentcolor;
  background-color: #fff;
  padding-left: 20px;
  padding-right: 4px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-color: rgb(166, 166, 166);
  width: 1%;
  white-space: nowrap;
  vertical-align: middle;
}
.form-control {
  border-left: 0px;
  box-shadow: none;
  color: #000;
  border-radius: 0px;
  border-color: rgb(166, 166, 166);
}
</style>
