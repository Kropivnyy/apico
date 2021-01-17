<template>
  <li class="sidebar-item" :class="{ inactive: !item.text }" @click="onClick">
    <span v-if="item.text">{{ item.text }}</span>
    <slot></slot>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      default: () => ({}),
      required: false,
    },
  },
  methods: {
    onClick() {
      if (this.item?.action) {
        this.item.action()
        this.$store.commit('sidebar-store/toggleIsVisibleSidebar')
      }
    },
  },
}
</script>

<style scoped>
.sidebar-item {
  min-height: 60px;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background-color: var(--white);
  border-bottom: 1px solid var(--grey-half-opacity);
  transition: background-color var(--main-transition);
}

.sidebar-item:not(.inactive):hover {
  background-color: var(--grey-700);
}
</style>
