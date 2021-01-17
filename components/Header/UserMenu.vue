<template>
  <div class="user-menu">
    <button
      :ref="`chosenOption-${excludeRefId}`"
      class="user-menu-button"
      @click="toggleMenuVisibility"
    >
      {{ getUserShortName(user.name) }}
    </button>
    <ul
      v-if="isVisibleMenu"
      v-click-outside="{
        exclude: [`chosenOption-${excludeRefId}`],
        handler: 'toggleMenuVisibility',
      }"
      class="user-menu-list"
    >
      <li class="user-menu-item user-name inactive">
        <span class="text-overflow-ellipsis">{{ user.name }}</span>
      </li>
      <div class="divider"></div>
      <li class="user-menu-item" @click="onLogout">
        <span>Logout</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserShortName } from '~/utils/helpers/get-user-short-name'
import { LOGIN } from '~/utils/constants/routes'
export default {
  name: 'UserMenu',
  data: () => ({
    isVisibleMenu: false,
    excludeRefId: Date.now(),
    getUserShortName,
  }),
  computed: {
    ...mapGetters({
      user: 'user-store/user',
    }),
  },
  methods: {
    toggleMenuVisibility() {
      this.isVisibleMenu = !this.isVisibleMenu
    },
    async onLogout() {
      try {
        await this.$store.dispatch('auth-store/logout')
        this.$router.push(LOGIN)
      } catch (error) {}
    },
  },
}
</script>

.
<style scoped>
.user-menu {
  position: relative;
}

.user-menu-button {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: var(--primary-yellow);
  font-size: 14px;
  letter-spacing: 1px;
  color: var(--dark-grey-hign-opacity);
}

.user-menu-list {
  position: absolute;
  z-index: var(--filter-category-list-z-index);
  top: 75%;
  right: 0;
  max-width: 200px;
  padding: 0;
  border-radius: 5px;
  list-style: none;
}

.user-menu-item {
  min-height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: var(--grey-900);
}

.user-menu-item:not(.inactive) {
  transition: background-color var(--main-transition);
  cursor: pointer;
}

.user-name {
  padding: 0 20px;
  font-size: 12px;
  justify-content: center;
  cursor: default;
}

.user-menu-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.user-menu-item:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.user-menu-item:not(.inactive):hover {
  background-color: var(--grey-700);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--grey-500);
}
</style>
