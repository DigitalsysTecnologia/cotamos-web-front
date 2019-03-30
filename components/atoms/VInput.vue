<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div
      v-bind:class="{ 'control': true, 'has-icons-left': !!(icon), 'has-icons-right': !!(validationMessage) }"
    >
      <input
        v-bind:class="{'input': true,  'is-danger': !!(validationMessage)}"
        :type="type"
        :placeholder="placeholder"
        ref="inputValue"
        :value="value"
        :id="id"
        :name="id"
        :disabled="disabled"
        @input="updateValue()"
      >
      <span class="icon is-small is-left" v-if="!!(icon)">
        <i :class="icon"></i>
      </span>
      <span class="icon is-small is-right" v-if="!!(validationMessage)">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>
    <p class="help is-danger" v-if="!!(validationMessage)">{{ validationMessage }}</p>
  </div>
</template>

<script>
import StringMask from "string-mask";

export default {
  name: "VInput",
  props: {
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    value: {
      type: String,
      required: false,
      default: ""
    },
    id: {
      type: String,
      required: false
    },
    validationMessage: {
      type: String,
      default: "",
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: false
    },
    type: {
      type: String,
      default: "text",
      required: false
    },
    maskReverse: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    mask: {
      type: String,
      default: "",
      required: false
    },
    maxLength: {
      type: String,
      default: "",
      required: false
    },
    pattern: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {};
  },
  computed: {
    computedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.value = value;
      }
    },
    computedMaxLength: {
      get() {
        return maxLength || "";
      }
    }
  },
  methods: {
    maskString(mask, value, truncate) {
      if (!mask) {
        return value;
      }

      var formatter = new StringMask(mask, { reverse: this.maskReverse });
      value = value.replace(/[^a-z0-9]/gim, "");
      value = formatter.apply(value);

      if (truncate) {
        return value.substring(0, mask.length);
      } else {
        return value;
      }
    },
    async updateValue(truncate) {
      if (!this.$refs.inputValue) {
        return;
      }

      this.$refs.inputValue.value = this.maskString(
        this.mask,
        this.$refs.inputValue.value,
        truncate
      );

      this.$emit("input", this.$refs.inputValue.value);
      let self = this;

      if (!truncate) {
        setTimeout(function() {
          self.updateValue(true);
        }, 1000);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
