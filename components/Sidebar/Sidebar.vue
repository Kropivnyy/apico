<template>
  <transition name="sidebar-slide">
    <aside v-if="isVisibleSidebar" class="sidebar">
      <nav>
        <ul v-if="isAuthenticated" class="sidebar-list">
          <SidebarItem>
            <div class="user-info-wrapper">
              <div class="user-avatar">{{ getUserShortName(user.name) }}</div>
              <div class="user-name text-overflow-ellipsis">
                {{ user.name }}
              </div>
            </div>
          </SidebarItem>
          <SidebarItem
            v-for="item in sidebarAuthNav"
            :key="item.text"
            :item="item"
          />
          <SidebarItem
            :item="{
              text: 'Logout',
              action: onLogout,
            }"
          />
        </ul>
        <ul v-if="!isAuthenticated" class="sidebar-list">
          <SidebarItem
            v-for="item in unauthNav"
            :key="item.text"
            :item="item"
          />
        </ul>
      </nav>
    </aside>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import navigationMixin from '~/mixins/navigation-mixin'
import { getUserShortName } from '~/utils/helpers/get-user-short-name'
import { NAVIGATION } from '~/utils/constants/navigation'
import { LOGIN } from '~/utils/constants/routes'

export default {
  name: 'Sidebar',
  mixins: [navigationMixin],
  data: () => ({
    getUserShortName,
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth-store/isAuthenticated',
      user: 'user-store/user',
      isVisibleSidebar: 'sidebar-store/isVisibleSidebar',
    }),
    sidebarAuthNav() {
      return [...this.authNav, NAVIGATION.call(this)[0], ...this.authNavIcons]
    },
  },
  watch: {
    isVisibleSidebar(value) {
      if (value) {
        document.body.classList.add('body-disable-scroll')
      } else {
        document.body.classList.remove('body-disable-scroll')
      }
    },
  },
  methods: {
    async onLogout() {
      try {
        await this.$store.dispatch('auth-store/logout')
        this.$router.push(LOGIN)
      } catch (error) {}
    },
  },
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--header-height);
  right: 0;
  height: calc(100vh - var(--header-height));
  width: 100vw;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--white);
  color: var(--dark-grey-300);
  font-size: 22px;
  z-index: var(--sidebar-z-index);
}

.sidebar-list {
  padding: 0;
  list-style: none;
}

.user-info-wrapper {
  display: flex;
  align-items: center;
}

.user-avatar {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 50%;
  background-color: var(--primary-yellow);
  font-size: 14px;
  letter-spacing: 1px;
  color: var(--dark-grey-hign-opacity);
}

.user-name {
  font-size: 18px;
}

.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform var(--route-transition), opacity var(--route-transition);
}

.sidebar-slide-enter,
.sidebar-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media screen and (min-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
