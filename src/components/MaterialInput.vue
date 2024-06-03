<template>
  <div class="input-grup">
    <label :class="variant"> </label>
    <input
      :id="id"
      :type="type"
      class="form-control"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :required="isRequired"
      :disabled="disabled"
    />
  </div>
</template>
<script>
import { setMaterialInput } from "@/assets/js/material-input.js";
export default {
  name: "MaterialInput",
  props: {
    variant: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
    succes: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
  },
  mouted() {
    setMaterialInput();
  },
  methods: {
    getClases: (size) => {
      let sizeValue;
      sizeValue = size ? `form-control-${size}` : null;
      return sizeValue;
    },
    getStatus: (error, success)=>{
        let isValidValue;

      if (success) {
        isValidValue = "is-valid";
      } else if (error) {
        isValidValue = "is-invalid";
      } else {
        isValidValue = null;
      }

      return isValidValue;
    }
  },
};
</script>
