<template>
    <div :class="{'form-group': true, 'error': validationMessage}">
        <div class="input-group">
            <div class="input-group-addon">
                <i :class="`fa ${icon}`" aria-hidden="true"/>
            </div>
            <input  :type="type" 
                    class="form-control"
                    :id="id"
                    :name="id"
                    :placeholder="label"
                    @input="updateValue()"
                    :maxLength="maxLength"
                    ref="inputValue"
                    :pattern="pattern" 
                    novalidate
                    :value="value"
                    />
        </div>
        <div class="message"> {{ validationMessage  }}</div>
    </div>
</template>

<script>
import StringMask from "string-mask";

export default {
  name: "FormInput",
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

      setTimeout(function() {
        self.updateValue(true);
      }, 1000);
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
.form-group.error input {
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

.input-group input {
  height: 42px;
}
</style>
