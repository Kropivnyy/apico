<template>
  <form @submit.prevent="onSubmit">
    <h2 class="title">Login</h2>
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
    <div class="forgot-password-wrapper">
      <span class="forgot-password">Don’t remember password?</span>
    </div>
    <button class="submit-btn" :class="{ disabled: $v.$invalid }" type="submit">
      {{ isLoading ? 'Loading...' : 'Login' }}
    </button>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'
import { HOME } from '~/utils/constants/routes'

export default {
  layout: 'auth',
  transition: 'main-fade',
  middleware: ['fetch-user-middleware', 'restricted-route-middleware'],
  mixins: [validationMixin],
  data: () => ({
    email: '',
    password: '',
    showPass: false,
    showPassConfirm: false,
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
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
    isInvalidPassword() {
      const { $dirty, required, minLength } = this.$v.password
      return ($dirty && !required) || ($dirty && !minLength)
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
          email: this.email,
          password: this.password,
        }

        this.$store.commit('user-store/setUserFetched', false)
        await this.$store.dispatch('auth-store/login', post)
        this.$router.push(HOME)
      } catch (error) {}
    },
  },
}
</script>

<style scoped>
.forgot-password-wrapper {
  text-align: right;
  margin-bottom: 16px;
  font-size: 14px;
  letter-spacing: 0.4px;
  color: var(--grey-500);
}

.forgot-password {
  user-select: none;
  cursor: pointer;
}
</style>
