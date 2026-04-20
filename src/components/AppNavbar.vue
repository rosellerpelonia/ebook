<template>
  <nav class="app-nav">
    <RouterLink to="/" class="app-nav__link" active-class="app-nav__link--active">
      Home
    </RouterLink>
    <RouterLink to="/explore" class="app-nav__link" active-class="app-nav__link--active">
      Explore
    </RouterLink>
    <RouterLink to="/reflection" class="app-nav__link" active-class="app-nav__link--active">
      Reflection
    </RouterLink>
    <RouterLink to="/credits" class="app-nav__link" active-class="app-nav__link--active">
      Credits
    </RouterLink>
    <RouterLink to="/quiz" class="app-nav__link" active-class="app-nav__link--active">
      Quiz
    </RouterLink>
    <RouterLink to="/add-quiz" class="app-nav__link" active-class="app-nav__link--active">
      Add Quiz
    </RouterLink>
  </nav>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 2rem);
  padding: 1rem clamp(1rem, 4vw, 2rem);
  background: #081724;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #e7e2d8;
}

.app-nav__link {
  color: #ffffff;
  text-decoration: none;
  font-family: 'Rethink Sans', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.15rem);
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  transition: 0.25s ease;
}

.app-nav__link:hover {
  background: rgba(0, 0, 0, 0.06);
}

.app-nav__link--active {
  background: rgba(0, 0, 0, 0.1);
  font-weight: 600;
}

@media (max-width: 640px) {
  .app-nav {
    flex-wrap: wrap;
  }
}
</style>