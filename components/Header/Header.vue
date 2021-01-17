<template>
  <header class="header" :class="{ 'dark-header': !isAuthLayout }">
    <div class="header-inner" :class="{ 'visible-search': isVisibleSearch }">
      <div class="header-content">
        <Logo :dark="isAuthLayout" />
        <nav v-if="isAuthenticated" class="navigation">
          <NavigationTextBtn
            v-for="btn in authNav"
            :key="btn.text"
            class="navigation-btn"
            :text="btn.text"
            :action="btn.action"
            :accent="btn.accent"
            :dark="btn.dark"
          />
          <NavigationIconBtn
            v-for="btn in authNavIcons"
            :key="btn.text"
            class="navigation-btn"
            :route="btn.route"
            :inactive-icon-src="btn.inactiveIconSrc"
            :active-icon-src="btn.activeIconSrc"
          />
          <UserMenu class="navigation-btn" />
        </nav>
        <nav v-if="!isAuthenticated" class="navigation">
          <NavigationTextBtn
            v-for="btn in unauthNav"
            :key="btn.text"
            class="navigation-btn"
            :text="btn.text"
            :action="btn.action"
            :accent="btn.accent"
            :dark="btn.dark"
            :is-auth-layout="isAuthLayout"
          />
        </nav>
        <MenuBtn :dark="isAuthLayout" />
      </div>
      <SearchFields v-if="isVisibleSearch" class="search-fields" />
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import navigationMixin from '~/mixins/navigation-mixin'

export default {
  name: 'Header',
  mixins: [navigationMixin],
  props: {
    isAuthLayout: {
      type: Boolean,
      default: false,
      required: false,
    },
    isVisibleSearch: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      isVisibleModal: false,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth-store/isAuthenticated',
    }),
  },
}
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: transparent;
}

.dark-header {
  background: linear-gradient(180deg, #090810 0%, #171236 100%);
}

.header-inner {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 1 100%;
  min-height: var(--header-height);
}

.search-fields {
  max-width: 855px;
  margin: 0 auto;
  flex: 1 1 100%;
  min-height: calc(var(--header-extra-height) - var(--header-height));
}

.navigation {
  display: none;
}

@media screen and (min-width: 768px) {
  .navigation {
    display: flex;
    align-items: center;
  }

  .navigation-btn:not(:last-child) {
    margin-right: 16px;
  }
}

@media screen and (min-width: 1024px) {
  .header-inner {
    padding: 0 48px;
  }
}
</style>
