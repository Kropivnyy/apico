<template>
  <button class="menu-button" @click="onClickMenu">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:v="https://vecta.io/nano"
      width="22"
      height="15"
      viewBox="0 0 22 15"
      :fill="dark ? 'var(--dark-grey-200)' : 'var(--white)'"
    >
      <g clip-path="url(#A)">
        <path
          fill-rule="evenodd"
          d="M0 14.667h22v-2.444H0v2.444zm0-6.111h22V6.111H0v2.444zM0 0v2.444h22V0H0z"
        />
      </g>
      <defs>
        <clipPath id="A"><path d="M0 0h22v14.667H0z" /></clipPath>
      </defs>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'MenuBtn',
  props: {
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    menuIconSrc: require('~/assets/icons/menu-icon.svg'),
  }),
  methods: {
    onClickMenu() {
      this.$store.commit('sidebar-store/toggleIsVisibleSidebar')
    },
  },
}
</script>

<style scoped>
.menu-button {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  background-color: transparent;
  color: var(--white);
}

.menu-icon {
  width: 22px;
}

@media screen and (min-width: 768px) {
  .menu-button {
    display: none;
  }
}
</style>
