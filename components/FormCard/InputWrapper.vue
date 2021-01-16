<template>
  <div class="input-wrapper text-group">
    <label>
      <span class="input-label" :class="{ invalid: isInvalidEmail }"
        >Email</span
      >
      <div class="input-text-field" :class="{ invalid: isInvalidEmail }">
        <input
          v-model.trim="email"
          class="input"
          type="email"
          placeholder="example@gmail.com"
          autocomplete="off"
          autofocus
        />
      </div>
      <small class="input-error-text" :class="{ visible: isInvalidEmail }"
        >Enter your actual email</small
      >
    </label>
  </div>
</template>

<script>
export default {
  name: 'InputWrapper',
}
</script>
