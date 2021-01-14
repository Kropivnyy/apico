<template>
  <form @submit.prevent="onSubmit">
    <h2 class="title">Register</h2>
    <div class="input-group text-group">
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
    <div class="input-group text-group">
      <label>
        <span class="input-label" :class="{ invalid: isInvalidFullName }"
          >Full name</span
        >
        <div class="input-text-field" :class="{ invalid: isInvalidFullName }">
          <input
            v-model.trim="fullName"
            class="input"
            type="text"
            placeholder="Tony Stark"
            autocomplete="off"
          />
        </div>
        <small class="input-error-text" :class="{ visible: isInvalidFullName }"
          >Enter your actual full name</small
        >
      </label>
    </div>
    <div class="input-group text-group">
      <label>
        <span class="input-label" :class="{ invalid: isInvalidPassword }"
          >Password</span
        >
        <div class="input-text-field" :class="{ invalid: isInvalidPassword }">
          <input
            v-model.trim="password"
            class="input"
            :type="showPass ? 'text' : 'password'"
          />
          <ShowPassIconBtn
            :on-mousedown="() => showPasswordInput({ showPass })"
            :on-mouseup="() => hidePasswordInput({ showPass })"
          />
        </div>
        <small class="input-error-text" :class="{ visible: isInvalidPassword }"
          >Password must have at least
          {{ $v.password.$params.minLength.min }} characters. Now it's
          {{ password.length }}</small
        >
      </label>
    </div>
    <div class="input-group text-group">
      <label>
        <span class="input-label" :class="{ invalid: isInvalidPasswordConfirm }"
          >Password again</span
        >
        <div
          class="input-text-field"
          :class="{ invalid: isInvalidPasswordConfirm }"
        >
          <input
            v-model.trim="passwordConfirm"
            class="input"
            :type="showPassConfirm ? 'text' : 'password'"
          />
          <ShowPassIconBtn
            :on-mousedown="() => showPasswordInput({ showPassConfirm })"
            :on-mouseup="() => hidePasswordInput({ showPassConfirm })"
          />
        </div>
        <small
          class="input-error-text"
          :class="{ visible: isInvalidPasswordConfirm }"
          >Password mismatch</small
        >
      </label>
    </div>
    <button class="submit-btn" :class="{ disabled: $v.$invalid }" type="submit">
      {{ isLoading ? 'Loading...' : 'Register' }}
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
import { HOME } from '~/utils/constants/routes'

export default {
  layout: 'auth',
  middleware: ['restricted-route-middleware'],
  mixins: [validationMixin],
  data: () => ({
    email: '',
    fullName: '',
    password: '',
    passwordConfirm: '',
    showPass: false,
    showPassConfirm: false,
  }),
  validations: {
    fullName: {
      required,
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  computed: {
    ...mapGetters({
      isLoading: 'auth-store/isLoading',
    }),
    isInvalidEmail() {
      const { $dirty, required, email } = this.$v.email
      return ($dirty && !required) || ($dirty && !email)
    },
    isInvalidFullName() {
      const { $dirty, required, minLength } = this.$v.fullName
      return ($dirty && !required) || ($dirty && !minLength)
    },
    isInvalidPassword() {
      const { $dirty, required, minLength } = this.$v.password
      return ($dirty && !required) || ($dirty && !minLength)
    },
    isInvalidPasswordConfirm() {
      const { $dirty, required, sameAsPassword } = this.$v.passwordConfirm
      return ($dirty && !required) || ($dirty && !sameAsPassword)
    },
  },
  methods: {
    showPasswordInput(dataObj) {
      this[Object.keys(dataObj)[0]] = true
    },
    hidePasswordInput(dataObj) {
      this[Object.keys(dataObj)[0]] = false
    },
    async onSubmit() {
      if (this?.$v?.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const post = {
          fullName: this.fullName,
          email: this.email,
          password: this.password,
        }

        await this.$store.dispatch('auth-store/registerUser', post)
        this.$router.push(HOME)
      } catch (error) {}
    },
  },
}
</script>
