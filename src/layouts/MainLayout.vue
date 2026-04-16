<template>
  <div class="main-layout">
    <AppNavbar />
    <main class="main-layout__content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/AppNavbar.vue';
import AppFooter from '@/components/AppFooter.vue';
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  background: #c89b40;
}

.main-layout__content {
  min-height: calc(100vh - 180px);
}
</style>