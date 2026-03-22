<template>
  <footer class="app-footer">
    <div class="app-footer__top">
      <div class="app-footer__brand">Debate It. Don't Hate It.</div>

      <div class="app-footer__contact">
        <div>hello@figma.com</div>
        <div>1750 Candyland Lane,<br />Portland, OR 97205</div>
        <div>(646) 555-4567</div>
      </div>
    </div>

    <div class="app-footer__bottom">
      Lincoln High School © 2025 All Rights Reserved
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-footer {
  background: #545454;
  color: #fcfaf6;
  padding: clamp(2rem, 5vw, 3rem) clamp(1rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.app-footer__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
}

.app-footer__brand {
  font-size: clamp(1.1rem, 2.4vw, 1.5rem);
}

.app-footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: 'Rethink Sans', sans-serif;
}

.app-footer__bottom {
  color: #e4e4e4;
  font-size: 0.9rem;
  font-family: 'Rethink Sans', sans-serif;
}
</style>