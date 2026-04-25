<template>
  <nav class="app-nav">
    <RouterLink to="/" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Home</span>
    </RouterLink>

    <div class="nav-dropdown">
      <RouterLink to="/explore" v-slot="{ isActive }">
        <button :class="['nav-link nav-dropdown__button', { active: isActive }]">
          Explore
          <span class="nav-dropdown__chevron">⌄</span>
        </button>
      </RouterLink>

      <div class="nav-dropdown__menu">
        <button v-for="section in sections" :key="section.id" type="button" class="nav-dropdown__item"
          @click="goToExploreSection(section.id)">
          {{ section.label }}
        </button>
      </div>
    </div>

    <RouterLink to="/reflection" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Reflection</span>
    </RouterLink>

    <RouterLink to="/credits" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Credits</span>
    </RouterLink>

    <RouterLink to="/quiz" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Quiz</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const sections = [
  { id: 'co-creation', label: 'Co-Creation' },
  { id: 'how-artists-use-ai', label: 'Artists & AI' },
  { id: 'branding-consistency', label: 'Branding' },
  { id: 'ai-inside-photoshop', label: 'Photoshop AI' },
  { id: 'ai-inside-krita', label: 'Krita AI' },
  { id: 'ai-tools-clip-studio', label: 'Clip Studio AI' },
  { id: 'ethics-ai-art', label: 'Ethics' },
];

async function goToExploreSection(id: string) {
  await router.push('/explore');

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 90;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }, 150);
}
</script>

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

.nav-explore {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link {
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.95rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.nav-link:hover {
  background: rgba(255, 186, 47, 0.2);
  color: #ffba2f;
  transform: translateY(-1px);
}

.nav-link.active {
  background: #ffba2f;
  color: #081724;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(255, 186, 47, 0.4);
}

.nav-link.active:hover {
  transform: none;
  background: #ffba2f;
}

.nav-module-select {
  max-width: 150px;
  border: 1px solid rgba(255, 186, 47, 0.5);
  border-radius: 999px;
  background: #081724;
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.85rem;
  padding: 0.45rem 0.75rem;
  outline: none;
  cursor: pointer;
}

.nav-module-select:focus {
  border-color: #ffba2f;
  box-shadow: 0 0 0 3px rgba(255, 186, 47, 0.2);
}

.nav-dropdown {
  position: relative;
}

.nav-dropdown__button {
  border: none;
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-dropdown__chevron {
  font-size: 0.9rem;
}

.nav-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 50%;
  min-width: 220px;
  padding: 0.5rem;
  border-radius: 18px;
  background: rgba(8, 23, 36, 0.96);
  border: 1px solid rgba(255, 186, 47, 0.35);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
  transform: translateX(-50%) translateY(8px);
  opacity: 0;
  pointer-events: none;
  transition: 0.2s ease;
}

.nav-dropdown:hover .nav-dropdown__menu,
.nav-dropdown:focus-within .nav-dropdown__menu {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.nav-dropdown__item {
  width: 100%;
  border: none;
  background: transparent;
  color: #ffffff;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.9rem;
  text-align: left;
  cursor: pointer;
}

.nav-dropdown__item:hover {
  background: rgba(255, 186, 47, 0.18);
  color: #ffba2f;
}

@media (max-width: 640px) {
  .nav-dropdown__menu {
    left: 0;
    right: auto;
    transform: translateY(8px);
  }

  .nav-dropdown:hover .nav-dropdown__menu,
  .nav-dropdown:focus-within .nav-dropdown__menu {
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .app-nav {
    flex-wrap: wrap;
  }

  .nav-explore {
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-module-select {
    max-width: 135px;
  }
}
</style>