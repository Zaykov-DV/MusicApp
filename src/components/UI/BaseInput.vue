<template>
  <div class="base-input">
    <label v-if="label">{{ label }}</label>
    <input class="base-input__input" type="text"
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           v-bind="$attrs">
    <div class="base-input__icon" v-if="withIcon">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  label: {
    type: [String, Boolean],
    default: false
  },
  modelValue: {
    type: String,
    default: ''
  },
  withIcon: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>

.base-input {
  position: relative;

  &__input {
    width: 100%;
    background-color: transparent;
    padding: 4px 4px 4px 30px;
    height: 40px;
    border-radius: 8px;
    border: 1px solid #51C4D3;
    color: #fff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
    }
  }

  &__icon {
    position: absolute;
    right: 15px;
    top: 10px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #51C4D3;
  }
}



</style>