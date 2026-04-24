<template>
  <nav class="app-nav">
    <RouterLink to="/" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Home</span>
    </RouterLink>

    <RouterLink to="/explore" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Explore</span>
    </RouterLink>

    <RouterLink to="/reflection" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Reflection</span>
    </RouterLink>

    <RouterLink to="/credits" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Credits</span>
    </RouterLink>

    <RouterLink to="/quiz" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Quiz</span>
    </RouterLink>

    <!-- <RouterLink to="/add-quiz" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Add Quiz</span>
    </RouterLink> -->
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
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: rgba(8, 23, 36, 0.9);
  backdrop-filter: blur(10px);
}

/* base */
.nav-link {
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* hover (modern soft glow) */
.nav-link:hover {
  background: rgba(255, 186, 47, 0.2);
  color: #ffba2f;
  transform: translateY(-1px);
}

/* active (clicked/current page) */
.nav-link.active {
  background: #ffba2f;
  color: #081724;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(255, 186, 47, 0.4);
}

/* optional: active + hover */
.nav-link.active:hover {
  transform: none;
  background: #ffba2f;
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