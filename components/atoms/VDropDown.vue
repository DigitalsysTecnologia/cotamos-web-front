<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div v-bind:class="{ 'control': true,'has-icons-left': !!(validationMessage) }">
      <div
        v-bind:class="{ 'select': true, 'is-fullwidth': true, 'is-danger': !!(validationMessage) }"
      >
        <select @input="updateValue()" ref="inputValue">
          <option selected="true" disabled="disabled"></option>
          <option
            v-for="(option) in items"
            :key="getItemValue(option)"
            :value="getItemValue(option)"
          >{{ getItemText(option)}}</option>
        </select>
        <span class="icon is-small is-left" v-if="!!(validationMessage)">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p class="help is-danger" v-if="!!(validationMessage)">{{ validationMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VDropDown",
  props: {
    items: {
      type: Array,
      required: true
    },
    "item-text": {
      type: String,
      required: false
    },
    "item-value": {
      type: String,
      required: false
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
    getItemValue(option) {
      const property = this.itemValue || "value";
      let result = null;
      if (option[property] != null) {
        result = option[property];
      } else {
        result = option;
      }
      return result;
    },
    getItemText(option) {
      const property = this.itemText || "text";
      let result = null;
      if (option[property] != null) {
        result = option[property];
      } else {
        result = option;
      }
      return result;
    },
    async updateValue(truncate) {
      if (!this.$refs.inputValue) {
        return;
      }

      let value = this.$refs.inputValue.value;
      let result = null;
      if (!isNaN(parseInt(value))) {
        result = parseInt(value);
      } else {
        result = value;
      }

      this.$emit("input", result);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .form-group.error i {
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
.label-error {
  color: red !important;
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
.input-group-addon {
  border-radius: 0px;
  color: #00899c;
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
.input-label {
  margin-left: 5px;
  margin-bottom: 0px;
  color: #017787;
} */
</style>
