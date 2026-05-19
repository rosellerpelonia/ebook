<template>
  <nav class="app-nav">
    <RouterLink to="/" v-slot="{ isActive }">
      <span :class="['nav-link', { active: isActive }]">Home</span>
    </RouterLink>

    <div class="nav-dropdown" @keydown.esc="closeDropdown">
      <button type="button" :class="['nav-link nav-dropdown__button', { active: isExploreActive }]"
        @click.stop="handleExploreClick">
        Explore
        <span v-if="isExploreActive" :class="['nav-dropdown__chevron', { open: isDropdownOpen }]">
          ⌄
        </span>
      </button>

      <div v-if="isExploreActive && isDropdownOpen" class="nav-dropdown__menu">
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
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isDropdownOpen = ref(false);

const isExploreActive = computed(() => route.path.startsWith('/explore'));

const sections = [
  { id: 'co-creation', label: 'What Is Co-Creation?' },
  { id: 'brand-identity', label: 'Brand Identity' },
  { id: 'ai-workflow', label: 'AI Workflow' },
  { id: 'ethical-co-creation', label: 'Ethical Co-Creation' },
  { id: 'photoshop-ai-tutorials', label: 'Photoshop AI Tutorials' },
  { id: 'tutorial-1', label: 'Adding Realistic Subjects' },
  { id: 'generative-fill', label: 'Generative Fill' },
  { id: 'tutorial-2', label: 'Object Replacement' },
  { id: 'tutorial-3', label: 'Generative Expand' },
  { id: 'tutorial-4', label: 'Lighting & Harmonization' },
];

async function handleExploreClick() {
  if (!isExploreActive.value) {
    closeDropdown();

    await router.push('/explore');

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 120);

    return;
  }

  toggleDropdown();
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function closeDropdown() {
  isDropdownOpen.value = false;
}

function closeDropdownOnOutsideClick() {
  closeDropdown();
}

async function goToExploreSection(id: string) {
  closeDropdown();

  if (route.path !== '/explore') {
    await router.push('/explore');
  }

  setTimeout(() => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 95;

    window.scrollTo({
      top: y,
      behavior: 'smooth',
    });
  }, 120);
}

watch(
  () => route.path,
  () => {
    closeDropdown();
  }
);

onMounted(() => {
  window.addEventListener('click', closeDropdownOnOutsideClick);
});

onUnmounted(() => {
  window.removeEventListener('click', closeDropdownOnOutsideClick);
});
</script>

<style scoped>
.app-nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.7rem;
  padding: 0.8rem 1rem;
  background:
    linear-gradient(135deg, rgba(8, 23, 36, 0.96), rgba(12, 33, 50, 0.92)),
    rgba(8, 23, 36, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
}

.nav-link {
  position: relative;
  isolation: isolate;
  color: #ffffff;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 0.58rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
  transform: translateY(0) scale(1);
  transition:
    color 0.25s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.nav-link::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: rgba(255, 186, 47, 0.16);
  opacity: 0;
  transform: scale(0.82);
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0.28rem;
  width: 34%;
  height: 2px;
  border-radius: 999px;
  background: #ffba2f;
  opacity: 0;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.nav-link:hover {
  color: #ffba2f;
  transform: translateY(-1px);
  box-shadow: none;
}

.nav-link:hover::before {
  opacity: 1;
  transform: scale(1);
}

.nav-link:hover::after {
  opacity: 1;
  transform: translateX(-50%) scaleX(1);
}

.nav-link.active {
  background: #ffba2f;
  color: #081724;
  font-weight: 800;
  box-shadow:
    0 10px 28px rgba(255, 186, 47, 0.32),
    0 0 18px rgba(255, 186, 47, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.nav-link.active:hover {
  background: #ffba2f;
  color: #081724;
  transform: translateY(-1px) scale(1.02);
}

.nav-link.active::before,
.nav-link.active::after {
  display: none;
}

.nav-dropdown {
  position: relative;
}

.nav-dropdown__button {
  border: none;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.nav-dropdown__chevron {
  font-size: 0.9rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.nav-dropdown__chevron.open {
  transform: rotate(180deg);
}

.nav-dropdown__menu {
  position: absolute;
  top: calc(100% + 0.7rem);
  left: 50%;
  z-index: 1001;
  width: min(280px, calc(100vw - 2rem));
  max-height: min(68vh, 520px);
  overflow-y: auto;
  padding: 0.55rem;
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(12, 33, 50, 0.98), rgba(8, 23, 36, 0.98));
  border: 1px solid rgba(255, 186, 47, 0.34);
  box-shadow:
    0 26px 70px rgba(0, 0, 0, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
  transform: translateX(-50%);
  animation: dropdownIn 0.18s ease both;
}

.nav-dropdown__item {
  width: 100%;
  border: none;
  background: transparent;
  color: #ffffff;
  padding: 0.78rem 0.95rem;
  border-radius: 15px;
  font-family: 'Rethink Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.35;
  text-align: left;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.nav-dropdown__item:hover {
  background: rgba(255, 186, 47, 0.16);
  color: #ffba2f;
  transform: translateX(2px);
}

@keyframes dropdownIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(8px) scale(0.98);
  }

  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes activePulse {

  0%,
  100% {
    box-shadow:
      0 10px 28px rgba(255, 186, 47, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.35);
  }

  50% {
    box-shadow:
      0 12px 34px rgba(255, 186, 47, 0.46),
      0 0 18px rgba(255, 186, 47, 0.18),
      inset 0 1px 0 rgba(255, 255, 255, 0.42);
  }
}

@media (max-width: 768px) {
  .app-nav {
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 0.7rem;
  }

  .nav-link {
    font-size: 0.86rem;
    padding: 0.5rem 0.78rem;
  }

  .nav-dropdown__menu {
    position: fixed;
    top: 5.7rem;
    left: 50%;
    right: auto;
    width: min(360px, calc(100vw - 2rem));
    max-height: min(68vh, 520px);
    transform: translateX(-50%);
    border-radius: 24px;
  }
}

@media (min-width: 1440px) {
  .app-nav {
    gap: 1rem;
    padding: 0.95rem 1.25rem;
  }

  .nav-link {
    font-size: 1rem;
  }
}
</style>