<template>
  <portal selector="#modal-root">
    <div class="overlay">
      <Header />
      <div class="content">
        <div class="form-card">
          <form class="form" @submit.prevent="onSubmit">
            <h2 class="title">Add product</h2>
            <div class="input-group text-group">
              <label>
                <span class="input-label" :class="{ invalid: isInvalidPrice }"
                  >Title<span class="required-star">*</span></span
                >
                <div
                  class="input-text-field"
                  :class="{ invalid: isInvalidTitle }"
                >
                  <input
                    v-model.trim="title"
                    class="input"
                    type="text"
                    placeholder="For example: Iron man suit"
                    autocomplete="off"
                    autofocus
                  />
                </div>
                <small
                  class="input-error-text"
                  :class="{ visible: isInvalidTitle }"
                  >Enter actual name of product</small
                >
              </label>
            </div>
            <div class="input-group text-group">
              <label>
                <span class="input-label" :class="{ invalid: isInvalidPrice }"
                  >Location<span class="required-star">*</span></span
                >
                <div
                  class="input-text-field"
                  :class="{ invalid: isInvalidLocation }"
                >
                  <input
                    v-model.trim="location"
                    class="input"
                    type="text"
                    placeholder="For example: Los Angeles, CA"
                    autocomplete="off"
                  />
                </div>
                <small
                  class="input-error-text"
                  :class="{ visible: isInvalidLocation }"
                  >Location must have at least
                  {{ $v.location.$params.minLength.min }} characters. Now it's
                  {{ location.length }}</small
                >
              </label>
            </div>
            <div class="input-group textarea-group">
              <label>
                <span class="input-label">Description</span>
                <div class="input-text-field">
                  <textarea
                    v-model.trim="description"
                    class="input textarea"
                    rows="8"
                    placeholder="For example: Iron man suit"
                    autocomplete="off"
                  />
                </div>
              </label>
            </div>
            <div class="input-group photo-group">
              <span class="input-label">Photo</span>
              <div
                class="input-text-field photo-container"
                @click="() => $refs.fileInput.click()"
              >
                <UploadingFile :file="selectedFile" :on-remove="onRemoveFile" />
              </div>
              <input
                ref="fileInput"
                class="file-input"
                type="file"
                accept=".png, .jpg, .jpeg"
                @change="onSelectFiles"
              />
            </div>
            <div class="input-group text-group">
              <label>
                <span class="input-label" :class="{ invalid: isInvalidPrice }"
                  >Price<span class="required-star">*</span></span
                >
                <div
                  class="input-text-field"
                  :class="{ invalid: isInvalidPrice }"
                >
                  <input
                    v-model.trim="price"
                    class="input number-input"
                    type="number"
                    min="1"
                    autocomplete="off"
                  />
                </div>
                <small
                  class="input-error-text"
                  :class="{ visible: isInvalidPrice }"
                  >Price must be a number</small
                >
              </label>
            </div>
            <button
              class="submit-btn"
              :class="{ disabled: $v.$invalid }"
              type="submit"
            >
              {{ submitLoading ? 'Loading...' : 'Submit' }}
            </button>
          </form>
          <button class="close-btn" @click="toggleModal">
            <span class="close-btn-content">+</span>
          </button>
        </div>
      </div>
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  padding-top: var(--header-height);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--star-white);
  z-index: 200;
}

.content {
  width: 100%;
  max-width: 1136px;
  margin: 0 auto;
  padding: 34px;
}

.form-card {
  position: relative;
  padding: 20px;
}

.form {
  max-width: 664px;
  margin: 0 auto;
}

.file-input {
  display: none;
}

.submit-btn {
  margin: 0 auto;
  max-width: 377px;
}

.close-btn {
  position: absolute;
  top: 34px;
  right: 34px;
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
  .form-card {
    padding: 36px;
  }
}
</style>
