<template>
  <div>
    <FormCard class="form-card">
      <form @submit.prevent="onSubmit">
        <FormCardTitle title="Register" />
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
          label="Full name"
          error-text="Enter your actual full name"
          :is-invalid-value="isInvalidFullName"
        >
          <input
            v-model.trim="fullName"
            class="input"
            type="text"
            placeholder="Tony Stark"
            autocomplete="off"
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
        <InputWrapper
          label="Password again"
          error-text="Password mismatch"
          :is-invalid-value="isInvalidPasswordConfirm"
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
        </InputWrapper>
        <SubmitBtn
          submit-text="Register"
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
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators'
import { HOME } from '~/utils/constants/routes'

export default {
  layout: 'auth',
  transition: 'main-fade',
  middleware: ['fetch-user-middleware', 'restricted-route-middleware'],
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

        this.$store.commit('user-store/setUserFetched', false)
        await this.$store.dispatch('auth-store/registerUser', post)
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

@media screen and (min-width: 768px) {
  .form-card {
    padding: 24px;
  }
}
</style>
