<template>
  <footer class="footer">
    <span class="footer-inner"
      >Copyright &copy; {{ new Date().getFullYear() }}. Privacy Policy.</span
    >
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  min-height: var(--footer-height);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--grey-low-opacity);
}

.footer-inner {
  font-size: 14.4px;
  color: var(--grey-700);
}
</style>
