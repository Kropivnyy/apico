<template>
  <div>
    <FormCard class="form-card">
      <form @submit.prevent="onSubmit">
        <FormCardTitle title="Login" />
        <InputWrapper
          label="Email"
          error-text="Enter your actual email"
          :is-invalid-value="isInvalidEmail"
        >
          <input
            v-model.trim="email"
            class="input"
            type="email"
            placeholder="example@gmail.com"
            autocomplete="off"
            autofocus
          />
        </InputWrapper>
        <InputWrapper
          label="Password"
          :error-text="`Password must have at least ${$v.password.$params.minLength.min} characters. Now it's ${password.length}`"
          :is-invalid-value="isInvalidPassword"
        >
          <input
            v-model.trim="password"
            class="input"
            :type="showPass ? 'text' : 'password'"
          />
          <ShowPassIconBtn
            :on-mousedown="() => showPasswordInput({ showPass })"
            :on-mouseup="() => hidePasswordInput({ showPass })"
          />
        </InputWrapper>
        <div class="forgot-password-wrapper">
          <span class="forgot-password">Don’t remember password?</span>
        </div>
        <SubmitBtn
          submit-text="Login"
          :disabled="$v.$invalid"
          :is-submit-loading="isLoading"
        />
      </form>
    </FormCard>
    <FormCard class="form-card">
      <AuthSubcard />
    </FormCard>
  </div>
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
.form-card {
  max-width: 425px;
  padding: 12px;
}

.form-card:not(:last-child) {
  margin-bottom: 24px;
}

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

@media screen and (min-width: 768px) {
  .form-card {
    padding: 24px;
  }
}
</style>
