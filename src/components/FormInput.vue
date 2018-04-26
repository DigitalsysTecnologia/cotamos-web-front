<template>
    <div :class="{'form-group': true, 'error': validationMessage}">
        <div class="input-group">
            <div class="input-group-addon">
                <i :class="`fa ${icon}`" aria-hidden="true"/>
            </div>
            <input  type="type" 
                    class="form-control"
                    :id="id"
                    :name="id"
                    :placeholder="label"
                    @input="updateValue()"
                    :maxLength="maxLength"
                    xstyle="border-right-color: red"
                    ref="inputValue"/>
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
    mask: {
      type: String,
      default: "",
      required: false
    },
    maxLength: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    23;
    return {};
  },
  computed: {
    computedMask: {
      get() {
        return mask || "";
      }
    },
    computedMaxLength: {
      get() {
        return maxLength || "";
      }
    }
  },
  methods: {
    maskString(mask, value) {
      var formatter = new StringMask(mask);
      value = value.replace(/[^a-z0-9]/gim, "");
      value = formatter.apply(value);
      value = value.substring(0, mask.length);
      return value;
    },
    updateValue() {
      if (this.mask) {
        this.$refs.inputValue.value = this.maskString(
          this.mask,
          this.$refs.inputValue.value
        );
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
.form-group.error input {
  border-right-color: red;
  border-bottom-color: red;
  border-top-color: red;
  color: red;
}
.message {
  color: red;
}
</style>
