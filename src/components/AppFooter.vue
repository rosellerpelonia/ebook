<template>
  <footer class="app-footer">
    <div class="app-footer__top">
      <div class="app-footer__brand">Co-Creation Human X Ai</div>

      <div class="app-footer__contact">
        <div>STI College</div>
        <div>Santa Rosa Laguna</div>
        <div>0977-783-2784 <br>
             0938-573-4511 <br>
             (049) 534-2719 <br>
             (02) 8668-4784</div>
      </div>
    </div>

    <div class="app-footer__bottom">
      STI College Santa Rosa @ 2026
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-footer {
  background: #081724;
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