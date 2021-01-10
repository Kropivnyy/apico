<template>
  <form @submit.prevent="onSubmit">
    <h2 class="title">Home</h2>
    <ModalAddProduct v-if="isVisibleAddProductModal" />
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { validationMixin } from 'vuelidate'
import { email, required, minLength } from 'vuelidate/lib/validators'
// import { HOME } from '~/utils/constants/routes'

export default {
  layout: 'auth',
  mixins: [validationMixin],
  data: () => ({
    email: '',
    password: '',
    showPass: false,
    showPassConfirm: false,
    isVisibleModal: false,
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
      isVisibleAddProductModal: 'products-store/isVisibleAddProductModal',
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
    onSubmit() {
      if (this?.$v?.$invalid) {
        this.$v.$touch()
      }

      //   try {
      //     const post = {
      //       email: this.email,
      //       password: this.password,
      //     }

      //     await this.$store.dispatch('auth-store/login', post)
      //     this.$router.push(HOME)
      //   } catch (error) {}
      // },
    },
  },
}
</script>
