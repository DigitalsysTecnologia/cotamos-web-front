<template>
  <div v-bind:class="{ 'field': true, 'with-error': !!(validationMessage)  }">
    <label class="label">{{ label }}</label>
    <div class="control">
      <label v-for="(option,idx) in items" :key="getItemValue(option)">
        <input
          type="radio"
          :name="groupName"
          :value="getItemValue(option)"
          @input="updateValue(`${idx}_${getItemValue(option)}`)"
          :ref="`${idx}_${getItemValue(option)}`"
        >
        {{ getItemText(option)}}
        <br v-if="!sameLine">
      </label>
      <p class="help is-danger" v-if="!!(validationMessage)">{{ validationMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "VRadio",

  props: {
    items: {
      type: Array,
      required: true
    },
    sameLine: {
      type: Boolean,
      required: false,
      default: false
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
    groupName: {
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
    async updateValue(refName) {
      if (!this.$refs[refName]) {
        return;
      }
      const value = this.$refs[refName][0].value;
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
.control label {
  margin-right: 10px;
}
.control input {
  margin-right: 3px;
}
.with-error label {
  color: red;
}
.with-error .label {
  color: red;
}
</style>
