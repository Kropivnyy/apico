<template>
  <portal selector="#modal-root">
    <div class="overlay">
      <Header />
      <FormCard class="form-card">
        <form class="form" @submit.prevent="onSubmit">
          <FormCardTitle title="Add product" />
          <InputWrapper
            label="Title"
            is-required-field
            :error-text="`Title must have at least ${$v.title.$params.minLength.min} characters. Now it's ${title.length}`"
            :is-invalid-value="isInvalidTitle"
          >
            <input
              v-model.trim="title"
              class="input"
              type="text"
              placeholder="For example: Iron man suit"
              autocomplete="off"
              autofocus
            />
          </InputWrapper>
          <InputWrapper
            label="Location"
            is-required-field
            :error-text="`Location must have at least ${$v.location.$params.minLength.min} characters. Now it's ${location.length}`"
            :is-invalid-value="isInvalidLocation"
          >
            <input
              v-model.trim="location"
              class="input"
              type="text"
              placeholder="For example: Los Angeles, CA"
              autocomplete="off"
            />
          </InputWrapper>
          <InputWrapper label="Description">
            <textarea
              v-model.trim="description"
              class="input textarea"
              rows="9"
              placeholder="For example: Iron man suit"
              autocomplete="off"
            />
          </InputWrapper>
          <InputWrapper
            label="Photo"
            :click-handler="() => $refs.fileInput.click()"
          >
            <div class="photo-container">
              <UploadingFile :file="selectedFile" :on-remove="onRemoveFile" />
              <input
                ref="fileInput"
                class="file-input"
                type="file"
                accept=".png, .jpg, .jpeg"
                @change="onSelectFiles"
              />
            </div>
          </InputWrapper>
          <InputWrapper
            label="Price"
            is-required-field
            error-text="Price must be a number"
            :is-invalid-value="isInvalidPrice"
          >
            <input
              v-model.trim="price"
              class="input number-input"
              type="number"
              min="1"
              placeholder="$"
              autocomplete="off"
            />
          </InputWrapper>
          <SubmitBtn
            class="submit-btn"
            submit-text="Submit"
            :disabled="$v.$invalid"
            :is-submit-loading="submitLoading"
          />
        </form>
        <button class="close-btn" @click="toggleModal">
          <span class="close-btn-content">+</span>
        </button>
      </FormCard>
    </div>
  </portal>
</template>

<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, minLength, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'ModalAddProduct',
  mixins: [validationMixin],
  data: () => ({
    title: '',
    location: '',
    description: '',
    selectedFile: null,
    price: '',
    submitLoading: false,
  }),
  validations: {
    title: {
      required,
      minLength: minLength(3),
    },
    location: {
      required,
      minLength: minLength(3),
    },
    price: {
      required,
      numeric,
    },
  },
  computed: {
    isInvalidTitle() {
      const { $dirty, required, minLength } = this.$v.title
      return ($dirty && !required) || ($dirty && !minLength)
    },
    isInvalidLocation() {
      const { $dirty, required, minLength } = this.$v.location
      return ($dirty && !required) || ($dirty && !minLength)
    },
    isInvalidPrice() {
      const { $dirty, required, numeric } = this.$v.price
      return ($dirty && !required) || ($dirty && !numeric)
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keyDownHandler)
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDownHandler)
  },

  methods: {
    ...mapActions({
      addProduct: 'products-store/addProduct',
    }),
    toggleModal() {
      this.resetForm()
      this.$store.commit('products-store/toggleAddProductModal')
    },
    keyDownHandler({ code }) {
      if (code === 'Escape') {
        this.toggleModal()
      }
    },
    onSelectFiles({ target }) {
      if (target) {
        this.selectedFile = target.files[0]
      }
    },
    onRemoveFile() {
      this.selectedFile = null
    },

    resetForm() {
      this.title = ''
      this.location = ''
      this.description = ''
      this.selectedFile = null
      this.price = 1
      this.$refs.fileInput.value = null
      this.$v.$reset()
    },

    async onSubmit() {
      if (this.submitLoading) return
      if (this?.$v?.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        this.submitLoading = true
        const product = {
          title: this.title,
          location: this.location,
          description: this.description,
          photo: this.selectedFile,
          price: this.price,
        }
        await this.addProduct(product)
        this.toggleModal()
      } catch (error) {}
      this.submitLoading = false
    },
  },
}
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: calc(var(--header-height) + 16px);
  padding-right: 16px;
  padding-bottom: 16px;
  padding-left: 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--star-white);
  overflow-y: auto;
  z-index: var(--modal-z-index);
}

.form-card {
  position: relative;
  max-width: 1136px;
  padding: 20px;
}

.form {
  max-width: 664px;
  margin: 0 auto;
}

.file-input {
  display: none;
}

.textarea {
  resize: none;
}

.photo-container {
  width: calc(100% + 24px);
  margin-left: -12px;
  margin-right: -12px;
  padding: 16px;
  cursor: pointer;
}

.submit-btn {
  margin: 0 auto;
  max-width: 377px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: transparent;
  color: var(--black);
  font-size: 36px;
  transform: rotate(45deg);
}

.close-btn-content {
  display: block;
  margin-top: 2px;
}

@media screen and (min-width: 768px) {
  .overlay {
    padding-top: calc(var(--header-height) + 34px);
    padding-right: 34px;
    padding-bottom: 34px;
    padding-left: 34px;
  }

  .form-card {
    padding: 36px;
  }

  .close-btn {
    top: 34px;
    right: 34px;
  }
}
</style>
