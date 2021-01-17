<template>
  <div class="input-wrapper">
    <InputLabel
      v-if="label"
      :label="label"
      :is-required-field="isRequiredField"
      :is-invalid-value="isInvalidValue"
    />
    <div
      class="input-inner"
      :class="{ invalid: isInvalidValue }"
      @click="clickHandler"
    >
      <slot></slot>
    </div>
    <InputErrorText
      v-if="errorText"
      :error-text="errorText"
      :is-invalid-value="isInvalidValue"
    />
  </div>
</template>

<script>
export default {
  name: 'InputWrapper',
  props: {
    label: {
      type: String,
      default: '',
      required: false,
    },
    isRequiredField: {
      type: Boolean,
      default: false,
      required: false,
    },
    errorText: {
      type: String,
      default: '',
      required: false,
    },
    isInvalidValue: {
      type: Boolean,
      default: false,
      required: false,
    },
    clickHandler: {
      type: Function,
      default: () => null,
      required: false,
    },
  },
}
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 8px;
}

.input-inner {
  min-height: 45px;
  display: flex;
  align-items: stretch;
  margin-bottom: 4px;
  padding: 0 12px;
  background-color: var(--grey-1000);
  border: 1px solid var(--grey-800);
  border-radius: 5px;
  transition: border-color var(--main-transition);
}

.input-inner.invalid {
  border-color: var(--error);
}

@media screen and (min-width: 768px) {
  .input-inner {
    min-height: 58px;
  }
}
</style>
