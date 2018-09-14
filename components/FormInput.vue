<template>
    <div :class="{'form-group': true, 'error': validationMessage}">
        <label :class="{'input-label': true, 'label-error': validationMessage}">{{label}}:</label>
        <div class="input-group">
            <div class="input-group-addon">
                <i :class="`fa ${icon}`" aria-hidden="true"/>
            </div>
            <input  :type="type" 
                    class="form-control"
                    :id="id"
                    :name="id"
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
.label-error {
  color: red !important;
}
.message {
  color: red;
}
.input-group {
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
}
</style>
